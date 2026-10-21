// Fails when a CSS custom property is read with var(--name) but never defined as --name: anywhere.
// Scans src/**/*.css, src/**/*.html (inline style="--x: ..." definitions) and the inline `styles:` of src/**/*.ts.
// A var() with a fallback, e.g. var(--x, 0ms), is optional by design and is not reported.
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = join(root, 'src');

function listFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? listFiles(path) : [path];
  });
}

// Returns the text of every `styles: [...]` / `styles: '...'` / `styles: `...`` value in a TypeScript file.
function extractInlineStyles(source) {
  const blocks = [];
  const marker = /\bstyles\s*:\s*/g;
  let match;
  while ((match = marker.exec(source))) {
    const start = match.index + match[0].length;
    let depth = 0;
    let quote = null;
    for (let i = start; i < source.length; i++) {
      const ch = source[i];
      if (quote) {
        if (ch === '\\') i++;
        else if (ch === quote) {
          quote = null;
          if (depth === 0) {
            blocks.push({ text: source.slice(start, i + 1), offset: start });
            break;
          }
        }
      } else if (ch === '"' || ch === "'" || ch === '`') {
        quote = ch;
      } else if (ch === '[') {
        depth++;
      } else if (ch === ']' && --depth === 0) {
        blocks.push({ text: source.slice(start, i + 1), offset: start });
        break;
      } else if (depth === 0 && ch !== ' ' && ch !== '\t' && ch !== '\r' && ch !== '\n') {
        break;
      }
    }
  }
  return blocks;
}

// Yields the pieces of a file that hold CSS: the whole file for .css/.html, only the inline styles for .ts.
function cssPieces(file, source) {
  const ext = extname(file);
  if (ext === '.css' || ext === '.html') return [{ text: source, offset: 0 }];
  if (ext === '.ts') return extractInlineStyles(source);
  return [];
}

const lineAt = (source, index) => source.slice(0, index).split('\n').length;

const defined = new Set();
const used = new Map(); // name -> [{ file, line }]

for (const file of listFiles(srcDir)) {
  const source = readFileSync(file, 'utf8');
  const shown = relative(root, file).split('\\').join('/');
  for (const { text, offset } of cssPieces(file, source)) {
    const css = text.replace(/\/\*[\s\S]*?\*\//g, (comment) => comment.replace(/[^\n]/g, ' '));
    for (const m of css.matchAll(/(--[\w-]+)\s*:/g)) defined.add(m[1]);
    for (const m of css.matchAll(/var\(\s*(--[\w-]+)\s*(,)?/g)) {
      if (m[2]) continue; // has a fallback value
      if (!used.has(m[1])) used.set(m[1], []);
      used.get(m[1]).push({ file: shown, line: lineAt(source, offset + m.index) });
    }
  }
}

const undefinedVars = [...used.keys()].filter((name) => !defined.has(name)).sort();

for (const name of undefinedVars) {
  const where = used.get(name).map(({ file, line }) => `${file}:${line}`).join(', ');
  console.error(`${name}  used at ${where}`);
}
console.log(`${undefinedVars.length} undefined CSS variables`);
process.exit(undefinedVars.length ? 1 : 0);

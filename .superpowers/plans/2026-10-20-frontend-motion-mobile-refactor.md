# Frontend Motion + Mobile Refactor — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Secciones plegables que se abren solas al scrollear, animaciones CSS con intención, y un layout mobile-first sin Bootstrap, en el portfolio Angular 19.

**Architecture:** Un `RevealObserverService` comparte `IntersectionObserver`s; una directiva `appReveal` y un componente `app-section-shell` lo usan para animar entradas y abrir secciones. `SectionStateService` guarda el estado abierto/cerrado con signals y `ScrollService` abre todo lo anterior al destino antes de scrollear. Todo el movimiento es CSS con tokens globales; el JS solo cambia clases.

**Tech Stack:** Angular 19.0.5 standalone + signals, CSS plano, Karma + Jasmine (ChromeHeadless), Playwright solo como devDependency para capturas.

**Spec:** `.superpowers/specs/2026-10-20-frontend-motion-mobile-design.md`

## Global Constraints

- Angular 19.0.5. No `animate.enter/leave`, no `@angular/animations`, no librerías de animación. El JS solo agrega o quita clases.
- Cero dependencias nuevas de runtime. Bootstrap se elimina (Task 9). Playwright entra solo como devDependency (Task 14).
- Archivos del repo con CRLF. Los archivos nuevos también en CRLF.
- Budget `anyComponentStyle`: 6 kB warning, 10 kB error (se sube en Task 1). No fragmentar CSS para esquivarlo.
- `docs/` es el sitio publicado y no se toca en ningún commit. Builds de verificación: `npx ng build --output-path .superpowers/build-check`.
- CSP de `index.html`: no agregar scripts externos.
- Tests: `npx ng test --watch=false --browsers=ChromeHeadless`. Baseline antes de este plan: 10 specs en verde. Cada task deja la suite en verde.
- Build de producción sin errores ni warnings de budget al final de cada task.
- Tokens de movimiento (Task 1): `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)`, `--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1)`, `--dur-fast: 150ms`, `--dur-base: 350ms`, `--dur-slow: 600ms`, `--stagger: 60ms`, `--reveal-distance: 24px`. Bajo `prefers-reduced-motion: reduce` todas las duraciones valen 0 y la distancia 0.
- Breakpoints: base (mobile), 576, 768, 992, 1200. Solo `min-width`.
- Los `:hover` que mueven o escalan elementos van dentro de `@media (hover: hover)`.
- Commits: mensaje en inglés, terminados con `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>`.

## Review Focus

1. Navegador sin `IntersectionObserver`: las secciones deben abrirse al cargar y el contenido verse. Test en Task 2 (`calls onVisible immediately when IntersectionObserver is unavailable`) y Task 6 (`opens immediately when the observer reports synchronously`).
2. El usuario cierra una sección a mano y sigue scrolleando: esa no se reabre sola; las que siguen sí se abren solas. Test en Task 6 (`does not re-open after a manual close`, `auto-opens later sections even if an earlier one was closed by hand`).
3. Deep link o nav a un id desconocido o no plegable (`about`): no rompe, scrollea si el elemento existe. Test en Task 4 (`openUpTo with an unknown id changes nothing`) y Task 5 (`scrolls to a non-collapsible id`, `does nothing for an unknown id`).
4. Menú mobile abierto y después Escape o rotar a desktop: el body recupera el scroll. Test en Task 8.
5. Doble tap en "Enviar": un solo envío, botón deshabilitado mientras envía. Test en Task 13.

---

### Task 1: Housekeeping, budgets y tokens globales

**Files:**
- Modify: `angular.json` (budgets)
- Modify: `.gitignore`
- Modify: `package.json` (quitar `@angular/animations`, agregar script `check:css`)
- Modify: `src/styles.css`
- Create: `scripts/check-css-vars.mjs`
- Delete: `browser/`, `3rdpartylicenses.txt`, `prerendered-routes.json`, `build_output.txt`, `build_output.log`

**Interfaces:**
- Produces: clases globales `.reveal`, `.reveal.is-visible`; tokens de movimiento de Global Constraints; variables `--color-primary-rgb: 59, 130, 246`, `--color-secondary-rgb: 139, 92, 246`, `--color-secondary-glow: rgba(139, 92, 246, 0.4)`, `--gradient-primary: linear-gradient(135deg, var(--color-primary), var(--color-secondary))`, `--color-bg-main: var(--color-bg-base)`, `--transition-short: var(--transition-fast)`; `npm run check:css`.

- [ ] **Step 1: Borrar restos de builds y subir budgets**

```bash
git rm -r -q browser 3rdpartylicenses.txt prerendered-routes.json
git rm -q build_output.txt 2>/dev/null || rm -f build_output.txt
rm -f build_output.log
```

En `angular.json`, `anyComponentStyle`: `maximumWarning: "6kB"`, `maximumError: "10kB"`. En `.gitignore` agregar `.superpowers/build-check/`, `.superpowers/screenshots/`, `out-tsc/`. En `package.json` quitar `@angular/animations` de `dependencies` y agregar `"check:css": "node scripts/check-css-vars.mjs"` en `scripts`. Correr `npm install` para actualizar el lockfile.

- [ ] **Step 2: Escribir `scripts/check-css-vars.mjs` y correrlo para ver los 5 fallos**

El script recorre `src/**/*.css` y los `styles:` inline de `src/**/*.ts`, junta cada `var(--nombre` usado y cada `--nombre:` definido, imprime los usados sin definir y sale con código 1 si hay alguno. Sin dependencias, solo `fs` y `path`.

Run: `npm run check:css`
Expected: lista `--color-primary-rgb`, `--color-secondary-glow`, `--transition-short`, `--gradient-primary`, `--color-bg-main` y exit 1.

- [ ] **Step 3: Agregar tokens y clases globales en `src/styles.css`**

Dentro de `:root`: las seis variables faltantes de Interfaces y los tokens de movimiento de Global Constraints. Después de `:root`:

```css
@media (prefers-reduced-motion: reduce) {
  :root { --dur-fast: 0ms; --dur-base: 0ms; --dur-slow: 0ms; --stagger: 0ms; --reveal-distance: 0px; }
  *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; scroll-behavior: auto !important; }
}

.reveal {
  opacity: 0;
  transform: translateY(var(--reveal-distance));
  transition: opacity var(--dur-slow) var(--ease-out), transform var(--dur-slow) var(--ease-out);
  transition-delay: var(--reveal-delay, 0ms);
}
.reveal.is-visible { opacity: 1; transform: none; }

@media print {
  .reveal { opacity: 1; transform: none; }
}
```

- [ ] **Step 4: Verificar**

Run: `npm run check:css`
Expected: `0 undefined CSS variables`, exit 0.

Run: `npx ng build --output-path .superpowers/build-check 2>&1 | tail -5` y `npx ng test --watch=false --browsers=ChromeHeadless 2>&1 | grep TOTAL`
Expected: build sin warnings de budget; `TOTAL: 10 SUCCESS`.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: motion tokens, missing CSS vars, css var checker, cleanup build leftovers"
```

---

### Task 2: `prefersReducedMotion` y `RevealObserverService`

**Files:**
- Create: `src/app/core/utils/motion.ts`
- Create: `src/app/core/services/reveal-observer.service.ts`
- Test: `src/app/core/services/reveal-observer.service.spec.ts`

**Interfaces:**
- Produces:
  - `export function prefersReducedMotion(): boolean` — `window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false`.
  - `export interface ObserveOptions { rootMargin?: string; threshold?: number }`
  - `RevealObserverService.observe(el: Element, onVisible: () => void, options?: ObserveOptions): () => void` — un `IntersectionObserver` por clave `${rootMargin}|${threshold}` (defaults `'0px 0px -8% 0px'` y `0.15`), mapa `Element → callback`; cuando `entry.isIntersecting` llama al callback de ese elemento. La función devuelta hace `unobserve` y borra el elemento del mapa. Si `typeof IntersectionObserver === 'undefined'`, llama `onVisible()` de forma síncrona y devuelve un noop.

- [ ] **Step 1: Escribir los tests**

`reveal-observer.service.spec.ts`: en `beforeEach` reemplazar `window.IntersectionObserver` por una clase falsa que guarda `callback` y `options`, registra cada instancia en un array `instances`, y expone `observe`/`unobserve` como `jasmine.createSpy`. Restaurar el original en `afterEach`. Helper `fire(instance, el, isIntersecting)` que invoca `instance.callback([{ target: el, isIntersecting }])`.

```ts
it('calls onVisible when the element intersects', ...)        // observe(el, spy); fire(instances[0], el, true); expect(spy).toHaveBeenCalledTimes(1)
it('ignores non-intersecting entries', ...)                   // fire(..., false); expect(spy).not.toHaveBeenCalled()
it('reuses one observer per options key', ...)                // dos observe() sin opciones → instances.length === 1; tercero con rootMargin '0px 0px -40% 0px' → 2
it('unsubscribe unobserves and stops callbacks', ...)         // const stop = observe(...); stop(); expect(unobserve).toHaveBeenCalledWith(el); fire(..., true); expect(spy).not.toHaveBeenCalled()
it('calls onVisible immediately when IntersectionObserver is unavailable', ...) // delete (window as any).IntersectionObserver; observe(el, spy); expect(spy).toHaveBeenCalledTimes(1)
```

- [ ] **Step 2: Correr y ver fallar**

Run: `npx ng test --watch=false --browsers=ChromeHeadless --include='**/reveal-observer.service.spec.ts'`
Expected: FAIL, el servicio no existe.

- [ ] **Step 3: Implementar `motion.ts` y `reveal-observer.service.ts` con las firmas de Interfaces**

- [ ] **Step 4: Correr y ver pasar**

Run: el mismo comando.
Expected: 5 SUCCESS.

- [ ] **Step 5: Commit**

```bash
git add src/app/core/utils/motion.ts src/app/core/services/reveal-observer.service.ts src/app/core/services/reveal-observer.service.spec.ts
git commit -m "feat: shared IntersectionObserver service and reduced-motion helper"
```

---

### Task 3: Directiva `appReveal`

**Files:**
- Create: `src/app/core/directives/reveal.directive.ts`
- Test: `src/app/core/directives/reveal.directive.spec.ts`

**Interfaces:**
- Consumes: `RevealObserverService.observe`, `prefersReducedMotion()`.
- Produces: `RevealDirective` standalone, selector `[appReveal]`, `@Input() revealDelay = 0` (ms). Host: clase `reveal` siempre; clase `is-visible` cuando el observer avisa; `style.--reveal-delay` = `` `${revealDelay}ms` ``. Con `prefersReducedMotion()` true, `is-visible` desde `ngOnInit` sin observar. Al hacerse visible llama a la función de unsubscribe. En `ngOnDestroy` también.

- [ ] **Step 1: Escribir los tests**

Host de prueba `@Component({ standalone: true, imports: [RevealDirective], template: '<div appReveal [revealDelay]="120"></div>' })`. Proveer `RevealObserverService` falso: `{ observe: jasmine.createSpy().and.callFake((el, cb) => { captured = cb; return stopSpy; }) }`.

```ts
it('adds the reveal class and starts hidden', ...)            // div.classList contiene 'reveal' y no 'is-visible'
it('becomes visible when the observer reports and unsubscribes', ...) // captured(); detectChanges; 'is-visible' presente; stopSpy llamado
it('exposes revealDelay as --reveal-delay', ...)              // div.style.getPropertyValue('--reveal-delay') === '120ms'
it('is visible immediately under prefers-reduced-motion', ...) // spyOn(window, 'matchMedia').and.returnValue({ matches: true } as MediaQueryList) antes de crear el fixture; 'is-visible' presente; observe no llamado
```

- [ ] **Step 2: Correr y ver fallar**

Run: `npx ng test --watch=false --browsers=ChromeHeadless --include='**/reveal.directive.spec.ts'`
Expected: FAIL.

- [ ] **Step 3: Implementar la directiva**

Usar `@HostBinding('class.reveal')`, `@HostBinding('class.is-visible')`, `@HostBinding('style.--reveal-delay')`. Guardar el unsubscribe en `private stop?: () => void` y llamarlo desde el callback con `this.stop?.()` (puede no existir si el servicio avisó de forma síncrona).

- [ ] **Step 4: Correr y ver pasar**

Expected: 4 SUCCESS.

- [ ] **Step 5: Commit**

```bash
git add src/app/core/directives/
git commit -m "feat: appReveal directive"
```

---

### Task 4: `SectionStateService`

**Files:**
- Create: `src/app/core/services/section-state.service.ts`
- Test: `src/app/core/services/section-state.service.spec.ts`

**Interfaces:**
- Produces, `providedIn: 'root'`:
  - `register(id: string): void` — agrega al final del orden si no estaba; arranca cerrada.
  - `ids(): readonly string[]`
  - `isOpen(id: string): boolean` — lee un `signal<Record<string, boolean>>`, por lo tanto es reactivo dentro de `computed`/`effect`.
  - `hasBeenOpened(id: string): boolean` — true desde la primera apertura, aunque después se cierre.
  - `open(id)`, `close(id)`, `toggle(id)`
  - `openUpTo(id: string): void` — abre todos los ids registrados en orden hasta `id` inclusive; si `id` no está registrado no cambia nada. Pone `instant` en true y lo vuelve a false en el próximo `requestAnimationFrame`.
  - `readonly instant: Signal<boolean>`

- [ ] **Step 1: Escribir los tests**

```ts
it('register keeps document order and starts closed', ...)          // register('a'); register('b'); register('a'); ids() → ['a','b']; isOpen('a') false
it('open, close and toggle update isOpen', ...)
it('hasBeenOpened stays true after close', ...)
it('openUpTo opens every section up to the target and none after', ...) // a,b,c,d registradas; openUpTo('c'); a,b,c true; d false
it('openUpTo with an unknown id changes nothing', ...)
it('openUpTo sets instant until the next animation frame', ...)     // spyOn(window, 'requestAnimationFrame').and.callFake(cb => { frame = cb; return 1; }); openUpTo('a'); instant() true; frame(); instant() false
```

- [ ] **Step 2: Correr y ver fallar**

Run: `npx ng test --watch=false --browsers=ChromeHeadless --include='**/section-state.service.spec.ts'`

- [ ] **Step 3: Implementar**

- [ ] **Step 4: Correr y ver pasar**

Expected: 6 SUCCESS.

- [ ] **Step 5: Commit**

```bash
git add src/app/core/services/section-state.service.*
git commit -m "feat: SectionStateService with ordered openUpTo"
```

---

### Task 5: `ScrollService`

**Files:**
- Create: `src/app/core/services/scroll.service.ts`
- Test: `src/app/core/services/scroll.service.spec.ts`

**Interfaces:**
- Consumes: `SectionStateService.openUpTo`, `prefersReducedMotion()`.
- Produces: `export const HEADER_OFFSET = 80;` y `ScrollService.goTo(id: string): void` — llama `openUpTo(id)`, luego en `requestAnimationFrame` busca `document.getElementById(id)`; si no existe no hace nada; si existe `window.scrollTo({ top: rect.top + window.scrollY - HEADER_OFFSET, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })`.

- [ ] **Step 1: Escribir los tests**

En cada test: `spyOn(window, 'requestAnimationFrame').and.callFake(cb => { cb(0); return 1; })`, `spyOn(window, 'scrollTo')`, `spyOn(sections, 'openUpTo')`.

```ts
it('opens sections up to the target before scrolling', ...)  // div#projects en el body; goTo('projects'); openUpTo llamado con 'projects' antes que scrollTo
it('scrolls to the element top minus the header offset with smooth behavior', ...) // expect(scrollTo).toHaveBeenCalledWith(jasmine.objectContaining({ behavior: 'smooth' })); top === rect.top + scrollY - 80
it('scrolls to a non-collapsible id', ...)                   // div#about; openUpTo llamado; scrollTo llamado
it('does nothing for an unknown id', ...)                    // scrollTo no llamado, no lanza
it('uses auto behavior under prefers-reduced-motion', ...)
```

- [ ] **Step 2: Correr y ver fallar**
- [ ] **Step 3: Implementar**
- [ ] **Step 4: Correr y ver pasar** — Expected: 5 SUCCESS.
- [ ] **Step 5: Commit**

```bash
git add src/app/core/services/scroll.service.*
git commit -m "feat: ScrollService opens collapsed sections before scrolling"
```

---

### Task 6: `SectionShellComponent`

**Files:**
- Create: `src/app/components/shared/section-shell/section-shell.component.ts`, `.html`, `.css`
- Test: `src/app/components/shared/section-shell/section-shell.component.spec.ts`

**Interfaces:**
- Consumes: `SectionStateService`, `RevealObserverService.observe`.
- Produces: `SectionShellComponent` standalone, selector `app-section-shell`. Inputs: `sectionId` (required), `title = ''`, `meta?: string`, `tone: 'dark' | 'light' = 'light'`, `startOpen = false`. `readonly open = computed(() => this.sections.isOpen(this.sectionId))`. `toggle(): void`.

Template (del spec 7.3):

```html
<section [id]="sectionId" class="section" [class.section-dark]="tone === 'dark'" [class.section-light]="tone === 'light'"
         [class.is-open]="open()" [class.no-transition]="sections.instant()">
  <div class="container">
    <h2 class="section-title section-title--toggle">
      <button #toggleBtn type="button" class="section-toggle" (click)="toggle()"
              [attr.aria-expanded]="open()" [attr.aria-controls]="sectionId + '-body'">
        <span class="section-title-text">{{ title }}</span>
        <span class="section-meta" *ngIf="meta">{{ meta }}</span>
        <span class="section-chevron" aria-hidden="true"></span>
      </button>
    </h2>
  </div>
  <div class="section-body" [id]="sectionId + '-body'" [attr.inert]="open() ? null : ''">
    <div class="section-body-inner"><ng-content /></div>
  </div>
</section>
```

Comportamiento: en `ngOnInit` → `sections.register(sectionId)`; si `startOpen` → `sections.open(sectionId)`; si no → `this.stop = observer.observe(toggleBtn.nativeElement, () => this.autoOpen(), { rootMargin: '0px 0px -40% 0px', threshold: 0 })`. `autoOpen()`: si algún id registrado antes que este tiene `hasBeenOpened === false`, no hace nada y sigue observando; si no, `sections.open(sectionId)`. Un `effect` en el constructor: cuando `open()` pasa a true llama `this.stop?.()` y lo borra. `ngOnDestroy` también llama `stop`.

CSS (`section-shell.component.css`): `.section-body { display: grid; grid-template-rows: 0fr; transition: grid-template-rows var(--dur-slow) var(--ease-out); }`, `.section-body-inner { min-height: 0; overflow: hidden; }`, `.is-open .section-body { grid-template-rows: 1fr; }`, `.no-transition .section-body { transition: none; }`. Chevron: un cuadrado de 10 px con `border-right`/`border-bottom` rotado 45°, que rota a 225° con `.is-open`, transición `var(--dur-base)`. `.section-toggle`: `background: none; border: 0; color: inherit; font: inherit; cursor: pointer; display: inline-flex; align-items: center; gap: 0.75rem; padding: 0.25rem 0; min-height: 44px`. `.section-meta`: `font-family: Inter; font-size: 0.85rem; font-weight: 500; color: var(--color-text-muted)`. `.section-title--toggle::after` conserva la línea de acento existente. En `styles.css` agregar `@media print { .section-body { grid-template-rows: 1fr !important; } }`.

- [ ] **Step 1: Escribir los tests**

Host: `<app-section-shell sectionId="b" title="Projects" meta="5 projects" [startOpen]="startOpen"><p class="inner">hello</p></app-section-shell>`. `RevealObserverService` falso que guarda el callback en `captured` y devuelve `stopSpy`. `SectionStateService` real, obtenido de `TestBed.inject`.

```ts
it('renders h2 > button with aria-expanded=false and aria-controls to the body', ...)
it('projects content and keeps it in the DOM while closed', ...)   // querySelector('.inner').textContent === 'hello'
it('body is inert while closed and not inert when open', ...)
it('startOpen opens on init', ...)
it('clicking the button toggles', ...)
it('auto-opens when the observer fires and stops observing', ...)  // captured(); open() true; stopSpy llamado
it('does not auto-open while an earlier section has never been opened', ...) // sections.register('a') antes del fixture; captured(); open() false; sections.open('a'); captured(); open() true
it('auto-opens later sections even if an earlier one was closed by hand', ...) // register('a'); open('a'); close('a'); captured(); open() true
it('does not re-open after a manual close', ...)                   // captured(); click; open() false; captured(); open() false
it('opens immediately when the observer reports synchronously', ...) // servicio falso que invoca cb dentro de observe(); después de detectChanges open() true
it('adds no-transition while the state service is in instant mode', ...) // spyOn rAF; sections.openUpTo('b'); detectChanges; section.classList contiene 'no-transition'
```

- [ ] **Step 2: Correr y ver fallar**

Run: `npx ng test --watch=false --browsers=ChromeHeadless --include='**/section-shell.component.spec.ts'`

- [ ] **Step 3: Implementar componente, template y CSS**

- [ ] **Step 4: Correr y ver pasar** — Expected: 11 SUCCESS.

- [ ] **Step 5: Commit**

```bash
git add src/app/components/shared/section-shell/ src/styles.css
git commit -m "feat: collapsible section shell with scroll auto-open"
```

---

### Task 7: Integrar las secciones plegables en `AppComponent`

**Files:**
- Modify: `src/app/app.component.html`, `src/app/app.component.ts`
- Create: `src/app/app.component.spec.ts`
- Modify: `src/app/components/experience/experience.component.html` (quitar el `<h2>`), `src/app/components/projects/projects.component.html` (idem), `src/app/components/education/education.component.html` (idem), `src/app/components/skills/skills.component.html` (quitar `<section>` y `<h2>`, dejar glow + container), `src/app/components/contact/contact.component.html` (quitar `<section>` y `<h2>`; el `<p class="text-muted">` del subtítulo queda arriba del contenido)
- Modify: `src/app/components/header/header.component.ts` y `src/app/components/about/about.component.ts` (`scrollTo` delega en `ScrollService.goTo`)
- Modify: `src/app/core/translations/en.ts`, `es.ts`
- Modify: `src/app/components/skills/skills.component.css` (quitar reglas de `.skills-section` que ya no aplican al `<section>`; el glow sigue `position: absolute` dentro de un wrapper `position: relative`)

**Interfaces:**
- Consumes: `SectionShellComponent`, `ScrollService.goTo`, `SectionStateService`.
- Produces: claves de traducción `shell: { experience_meta: '{n} puestos' | '{n} roles', projects_meta: '{n} proyectos' | '{n} projects', skills_meta: '{n} categorías' | '{n} categories', education_meta: '{n} títulos' | '{n} degrees' }`. `AppComponent.meta: Signal<{ experience: string; projects: string; skills: string; education: string }>` computado desde `ExperienceService.workHistory().length`, `ProjectService.projectsList().length`, `SKILL_CATEGORIES.length`, `EducationService.educationHistory().length`, reemplazando `{n}`. `AppComponent.ngAfterViewInit` lee `location.hash.slice(1)` y si no está vacío llama `ScrollService.goTo(id)`.

`app.component.html` final:

```html
<a class="skip-link" href="#main-content">Skip to main content</a>
<app-header></app-header>
<main id="main-content" tabindex="-1">
  <app-about></app-about>
  <app-section-shell sectionId="experience" tone="dark" [title]="langService.t().experience.section_title" [meta]="meta().experience"><app-experience /></app-section-shell>
  <app-section-shell sectionId="projects" [title]="langService.t().projects.section_title" [meta]="meta().projects"><app-projects /></app-section-shell>
  <app-section-shell sectionId="skills" tone="dark" [title]="langService.t().skills.section_title" [meta]="meta().skills"><app-skills /></app-section-shell>
  <app-section-shell sectionId="education" [title]="langService.t().education.section_title" [meta]="meta().education"><app-education /></app-section-shell>
  <app-section-shell sectionId="contact" [title]="langService.t().contact.section_title"><app-contact /></app-section-shell>
</main>
<app-footer></app-footer>
```

- [ ] **Step 1: Escribir `app.component.spec.ts`**

```ts
it('renders five collapsible sections in order', ...)       // querySelectorAll('app-section-shell section') ids === ['experience','projects','skills','education','contact']
it('meta strings carry the data counts', ...)               // meta().experience contiene '3'; meta().projects contiene '5'
it('meta strings follow the language', ...)                 // langService.setLanguage('es'); meta().experience contiene 'puestos'; volver a 'en'
it('navigates to the URL hash after the first render', ...) // spyOn(ScrollService.prototype, 'goTo'); window.location.hash = '#projects' antes de createComponent; expect goTo('projects'); limpiar hash en afterEach con history.replaceState(null, '', location.pathname)
```

Y en `header.component.spec.ts` / `about.component.spec.ts` existentes agregar: `it('delegates scrollTo to ScrollService', ...)` con `spyOn(scrollService, 'goTo')`.

- [ ] **Step 2: Correr y ver fallar**

Run: `npx ng test --watch=false --browsers=ChromeHeadless --include='**/app.component.spec.ts'`

- [ ] **Step 3: Implementar**

Traducciones, `AppComponent`, template, quitar `<section>`/`<h2>` de los cinco componentes de sección, delegar `scrollTo` en header y about. Los componentes de sección mantienen su `<div class="container">`.

- [ ] **Step 4: Correr la suite completa y el build**

Run: `npx ng test --watch=false --browsers=ChromeHeadless 2>&1 | grep TOTAL` y `npx ng build --output-path .superpowers/build-check 2>&1 | tail -5`
Expected: todo SUCCESS, build limpio.

- [ ] **Step 5: Revisar a mano en `npx ng serve`**

Abrir `http://localhost:4200/`: solo hero y "Sobre mí" abiertos; al bajar se abre Experiencia; "Ver proyectos" abre Experiencia y Proyectos y posiciona Proyectos; `http://localhost:4200/#contact` abre todo y posiciona Contacto; Tab no entra en secciones cerradas.

- [ ] **Step 6: Commit**

```bash
git add -A src/app
git commit -m "feat: wrap sections in collapsible shells, hash and nav open them first"
```

---

### Task 8: Header: barra de progreso y menú mobile

**Files:**
- Create: `src/app/components/shared/scroll-progress/scroll-progress.component.ts` (template y styles inline)
- Test: `src/app/components/shared/scroll-progress/scroll-progress.component.spec.ts`
- Modify: `src/app/components/header/header.component.ts`, `.html`, `.css`
- Modify: `src/app/components/header/header.component.spec.ts`
- Modify: `src/styles.css` (`body.menu-open { overflow: hidden; }`)

**Interfaces:**
- Produces: `export function computeProgress(scrollY: number, scrollHeight: number, innerHeight: number): number` (0 si `scrollHeight <= innerHeight`, si no `scrollY / (scrollHeight - innerHeight)` acotado a [0, 1]). `ScrollProgressComponent` standalone, selector `app-scroll-progress`, `progress = signal(0)`, escucha `window:scroll` y actualiza dentro de `requestAnimationFrame` (una sola pendiente a la vez). Render: `<div class="bar" [style.transform]="'scaleX(' + progress() + ')'">` con `position: absolute; left: 0; bottom: 0; height: 2px; width: 100%; transform-origin: left; background: var(--gradient-primary)`.
- `HeaderComponent`: `closeMenu(): void`; `@HostListener('document:keydown.escape') onEscape()` cierra; `@HostListener('window:resize') onResize()` cierra si `window.innerWidth >= 768`; `toggleMenu`/`closeMenu` sincronizan `document.body.classList.toggle('menu-open', this.isMenuOpen)`.

- [ ] **Step 1: Escribir los tests**

`scroll-progress.component.spec.ts`:

```ts
it('computeProgress is 0 at the top', ...)                 // computeProgress(0, 2000, 800) === 0
it('computeProgress is 0.5 halfway', ...)                  // computeProgress(600, 2000, 800) === 0.5
it('computeProgress clamps to 1', ...)                     // computeProgress(5000, 2000, 800) === 1
it('computeProgress is 0 when the page does not scroll', ...) // computeProgress(0, 700, 800) === 0
it('renders the bar scaled by progress', ...)              // progress.set(0.25); detectChanges; bar.style.transform === 'scaleX(0.25)'
```

`header.component.spec.ts` (agregar):

```ts
it('toggling the menu locks and unlocks body scroll', ...) // toggleMenu(); body.classList contiene 'menu-open'; toggleMenu(); no
it('Escape closes the menu and unlocks body scroll', ...)
it('resizing to desktop closes the menu', ...)             // isMenuOpen = true; spyOnProperty(window, 'innerWidth').and.returnValue(1024); onResize(); isMenuOpen false
it('a nav link calls ScrollService.goTo and closes the menu', ...)
```

- [ ] **Step 2: Correr y ver fallar**
- [ ] **Step 3: Implementar**

Header CSS: `.hamburger-btn` pasa a `width: 44px; height: 44px; padding: 12px 7px` con las barras dentro (ajustar las traslaciones del estado `active` a ±8 px); `.nav-menu` mobile con `height: 100vh; height: 100dvh; padding-top: env(safe-area-inset-top); padding-bottom: env(safe-area-inset-bottom)`; entrada del panel `opacity 0 → 1` y `transform: translateY(-12px) → none` en `var(--dur-base) var(--ease-out)`; cada `.nav-link` dentro del panel abierto con `transition-delay: calc(var(--stagger) * var(--i))` y `style="--i: n"` en el template. `<app-scroll-progress>` como último hijo de `.header` (`position: relative` ya implícito por `fixed`).

- [ ] **Step 4: Correr suite completa y build** — Expected: SUCCESS, build limpio.
- [ ] **Step 5: Commit**

```bash
git add -A src
git commit -m "feat: scroll progress bar, mobile menu a11y and body scroll lock"
```

---

### Task 9: Quitar Bootstrap, reset, layout y tipografía fluida

**Files:**
- Modify: `package.json` (quitar `bootstrap`), `angular.json` (quitar las entradas de bootstrap en `styles` y `scripts`)
- Modify: `src/styles.css`
- Modify: `src/app/components/shared/icon/icon.component.ts` (iconos `user`, `envelope`, `chat`, `send`)
- Modify: `src/app/components/about/about.component.html`, `.css`; `contact.component.html`, `.css`, `.ts` (imports `IconComponent`); `skills.component.html`, `.css`; `projects.component.html`; `footer.component.html`
- Test: `src/app/components/shared/icon/icon.component.spec.ts` (crear)

**Interfaces:**
- Produces en `styles.css`: reset (`*, *::before, *::after { box-sizing: border-box }`, `h1–h6, p { margin-top: 0 }`, `button, input, textarea { font: inherit; color: inherit }`, `img { max-width: 100%; height: auto; display: block }`, `ul { margin: 0 }`); `.container { width: 100%; max-width: 1200px; margin-inline: auto; padding-inline: 1rem }` y `padding-inline: 1.5rem` desde 768; `.section { padding: 3.5rem 0 }`, `5rem 0` desde 768, `6rem 0` desde 992; `.section-title { font-size: clamp(1.75rem, 5vw, 2.5rem) }`; `.btn-lg { padding: 0.9rem 1.75rem; font-size: 1rem }`; `.premium-input` con `display: block; width: 100%; line-height: 1.5` además de lo que ya tiene; `body { line-height: 1.65 }`.
- `IconName` suma `'user' | 'envelope' | 'chat' | 'send'` con paths de Bootstrap Icons (`person`, `envelope`, `chat-dots`, `send`), viewBox 0 0 16 16.
- Clases Bootstrap que desaparecen de los templates: `container` (se queda, ahora propia), `row`, `col-*`, `d-flex`, `flex-wrap`, `flex-column`, `justify-content-center`, `gap-2`, `gap-3`, `g-5`, `mb-4`, `mb-5`, `me-2`, `p-2`, `h-100`, `w-100`, `text-center`, `text-primary`, `fw-bold`, `btn-lg` (ahora propia), `h4`, `form-control`, `form-label`. Cada una se reemplaza por una clase semántica del componente (`.hero-cta-row`, `.contact-grid`, `.contact-col`, `.contact-col-title`, `.filter-tabs`, `.form-field`, `.form-label`, etc.).

- [ ] **Step 1: Test del icono**

```ts
it('renders a path for every new icon name', ...) // para ['user','envelope','chat','send'] crear el componente con name y comprobar que path d tiene longitud > 20
```

Run: fallan por tipo.

- [ ] **Step 2: Quitar Bootstrap y escribir reset + layout**

`npm uninstall bootstrap`; editar `angular.json`; agregar reset, `.container`, `.section` responsive, tipografía fluida y `.btn-lg` en `styles.css`. Hero `h1`: `font-size: clamp(2.25rem, 7vw, 3.75rem)` en `about.component.css`.

- [ ] **Step 3: Reemplazar clases en los templates**

Verificación: `grep -rnE 'class="[^"]*\b(row|col-[a-z0-9-]+|d-flex|flex-wrap|flex-column|justify-content-center|gap-[0-9]|g-[0-9]|mb-[0-9]|me-[0-9]|p-[0-9]|h-100|w-100|text-center|text-primary|fw-bold|h4|form-control|form-label)\b' src/app` devuelve vacío. Los `<i class="fas …">` del formulario se reemplazan por `<app-icon name="user" [size]="14">` etc.

En el mismo paso, todos los `<img>` de logos reciben `width` y `height` explícitos para evitar CLS: logos de empresa e institución `60` × `60`, logos de proyecto `50` × `50`, iconos de skills `48` × `48`. El CSS sigue mandando sobre el tamaño final.

- [ ] **Step 4: Suite completa, build y revisión visual rápida**

Run: tests, build, `npm run check:css`. En `ng serve` comparar hero, about, skills y contact contra el estado anterior a 390 px y 1440 px: mismo layout, inputs con el mismo aspecto, botones del hero a ancho completo en mobile.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "refactor: drop Bootstrap, own reset/layout, fluid type, form icons"
```

---

### Task 10: Hero y "Sobre mí": entrada y mobile

**Files:**
- Modify: `src/app/components/about/about.component.html`, `.css`, `.ts` (imports `RevealDirective`)

**Interfaces:**
- Consumes: `RevealDirective` (`appReveal`, `revealDelay`).

- [ ] **Step 1: Animación de entrada del hero**

Keyframe `hero-in` (de `opacity: 0; transform: translateY(16px)` a `opacity: 1; transform: none`), `animation: hero-in var(--dur-slow) var(--ease-out) both; animation-delay: calc(var(--i) * 80ms)` en `.hero-title`, `.hero-subtitle`, `.hero-trust-row`, `.hero-cta-row`, `.hero-socials`, con `style="--i: 0..4"` en el template. `.hero-bg-glow` con keyframe `glow-drift` de 24 s en bucle (`translate(-50%, -50%)` → `translate(-45%, -55%)` → vuelta), `animation-play-state: paused` bajo `prefers-reduced-motion` (ya cubierto por el bloque global). Hero `padding: 5rem 0 3rem` base, `8rem 0 6rem` desde 768. Los hover de `.hero-trust-chip`, `.hero-socials a`, `.btn-primary-custom` y `.btn-outline-custom` que trasladan el elemento pasan a `@media (hover: hover)`.

- [ ] **Step 2: Sobre mí**

`.profile-image-wrapper` con `appReveal` y `.profile-image-wrapper.reveal { transform: scale(0.92) }` (sobreescribe la traslación por defecto); `.about-content-card` con `appReveal [revealDelay]="120"`. `.about-content-card` `padding: 1.5rem` base, `3rem` desde 768. Foto con `fetchpriority="high"`.

- [ ] **Step 3: Verificar**

Tests, build. En `ng serve` a 390 px: el hero entra en secuencia, nada se corta, los botones ocupan el ancho; con `prefers-reduced-motion` emulado en DevTools todo aparece de una.

- [ ] **Step 4: Commit**

```bash
git add -A src/app/components/about
git commit -m "feat: hero entrance, about reveal, mobile spacing"
```

---

### Task 11: Experiencia y Educación: timeline y stagger

**Files:**
- Modify: `experience.component.html`, `.css`, `.ts`; `education.component.html`, `.css`, `.ts`

**Interfaces:**
- Consumes: `RevealDirective`.

- [ ] **Step 1: Línea que se dibuja**

`.timeline` lleva `appReveal` y `.timeline.reveal { opacity: 1; transform: none; }` (el contenedor no se oculta, solo usa la clase `is-visible`). `.timeline::before { transform: scaleY(0); transform-origin: top; transition: transform 900ms var(--ease-out); }` y `.timeline.is-visible::before { transform: scaleY(1); }`. Dentro de `@supports (animation-timeline: view())`: `.timeline::before { transition: none; animation: draw-line linear both; animation-timeline: view(); animation-range: entry 0% cover 60%; }` con `@keyframes draw-line { from { transform: scaleY(0) } to { transform: scaleY(1) } }` y `.timeline.is-visible::before { transform: none }` para que no pise la animación.

- [ ] **Step 2: Items con stagger y pulso del punto**

Cada `.timeline-item` con `appReveal [revealDelay]="i * 90"` (`*ngFor` con `index as i`). `.timeline-dot` con keyframe `dot-pulse` (box-shadow 0 → 10 px → 0, 700 ms, una vez) disparado por `.timeline-item.is-visible .timeline-dot`.

- [ ] **Step 3: Mobile**

Base: `.timeline::before { left: 8px }`, `.timeline-dot { left: 2px; width: 12px; height: 12px }`, `.timeline-item { padding-left: 1.75rem }`, `.timeline-content { padding: 1.25rem }`, logos 48 px, `.experience-header` en columna por debajo de 400 px (`@media (max-width: 399px)` es la única excepción permitida al "solo min-width", por ser un ajuste de contenido, no de layout). Desde 768 vuelve al layout alternado actual (`padding: 2rem`, logos 60 px). Hover de `.timeline-content` y `.tech-tag` dentro de `@media (hover: hover)`.

- [ ] **Step 4: Verificar**

Tests, build, `npm run check:css`. A 360 px en `ng serve`: texto con al menos 260 px de ancho útil, línea pegada a la izquierda, items que entran escalonados.

- [ ] **Step 5: Commit**

```bash
git add -A src/app/components/experience src/app/components/education
git commit -m "feat: timeline draw, staggered reveal and mobile layout for experience/education"
```

---

### Task 12: Proyectos y Skills

**Files:**
- Modify: `projects.component.html`, `.css`, `.ts`; `skills.component.html`, `.css`, `.ts`

- [ ] **Step 1: Proyectos**

Cada `.project-card` con `appReveal [revealDelay]="i * 80"`. Padding de header/body/footer `1.25rem` base, `2rem` desde 768. Grid: 1 columna base, 2 desde 768, 3 desde 1024 (ya existe). Hover de `.app-card` (en `styles.css`) y `.project-card::after` dentro de `@media (hover: hover)`.

- [ ] **Step 2: Skills**

Al cambiar de filtro, `displayedCategories` se reasigna y Angular recrea las cards; cada `.skill-card` recibe `style="--i: j"` y `animation-delay: calc(var(--i) * 40ms)` sobre el keyframe `fadeScale` existente. Botón activo con `background: var(--gradient-primary); color: #fff`. Grid 3 columnas base (iconos 44 px, `gap: 0.75rem`), 4 desde 576, 6 desde 992. Hover de `.skill-card` dentro de `@media (hover: hover)`. El glow de fondo se mantiene con un wrapper `position: relative; overflow: hidden`.

- [ ] **Step 3: Verificar**

Tests, build. A 390 px: cards de proyecto legibles sin scroll horizontal; en skills, cambiar de tab re-anima las cards.

- [ ] **Step 4: Commit**

```bash
git add -A src/app/components/projects src/app/components/skills src/styles.css
git commit -m "feat: staggered reveals and mobile grids for projects and skills"
```

---

### Task 13: Contacto y Footer

**Files:**
- Modify: `contact.component.ts`, `.html`, `.css`, `.spec.ts`; `calendly-widget.component.ts`; `footer.component.html`, `.ts`
- Modify: `src/app/core/translations/en.ts`, `es.ts` (`contact.sending: 'Sending…' | 'Enviando…'`)

**Interfaces:**
- Produces: `ContactComponent.status = signal<'idle' | 'sending' | 'sent' | 'error' | 'invalid'>('idle')`; `sendEmail(form: NgForm): Promise<void>`; sin `alert()`. Template muestra `<p class="form-status" role="status" aria-live="polite">` con el texto según estado (`alert_validation`, `sending`, `alert_success`, `alert_error`) y el botón con `[disabled]="!contactForm.valid || status() === 'sending'"` y un spinner CSS mientras envía.

- [ ] **Step 1: Tests**

En `contact.component.spec.ts`, con `spyOn(emailjs, 'send')` (importar `emailjs from 'emailjs-com'`):

```ts
it('shows the validation message for an invalid form without calling emailjs', ...)
it('disables the button and shows sending while the request is pending', ...) // send devuelve una promesa pendiente; status() === 'sending'; button.disabled true
it('ignores a second submit while sending', ...)                              // llamar sendEmail dos veces; emailjs.send una vez
it('shows success and resets the form after a resolved send', ...)
it('shows the error message after a rejected send', ...)
```

Nota: para armar un `NgForm` válido en el test, usar `{ invalid: false, valid: true, value: {...}, reset: jasmine.createSpy() } as unknown as NgForm`.

- [ ] **Step 2: Correr y ver fallar**
- [ ] **Step 3: Implementar**

Calendly: el `<div #container>` pasa a `class="calendly-host"` con `height: 640px` base y `700px` desde 768 en los `styles` del componente. Columnas de contacto y el formulario con `appReveal` (`revealDelay` 0 y 120). Footer: `.footer-content` con `appReveal`.

- [ ] **Step 4: Suite completa y build**
- [ ] **Step 5: Commit**

```bash
git add -A src/app
git commit -m "feat: inline contact status, loading state, reveals for contact and footer"
```

---

### Task 14: Capturas con Playwright, revisión visual y cierre

**Files:**
- Create: `scripts/screenshots.mjs`
- Modify: `package.json` (devDependency `playwright`, script `"screenshots": "node scripts/screenshots.mjs"`)
- Delete: `src/app/components/shared/info-card/` (sin usos; verificar con `grep -rn "InfoCard\|app-info-card" src` vacío)

**Interfaces:**
- `scripts/screenshots.mjs`: lanza `npx ng serve --port 4300` como proceso hijo, espera a que `http://localhost:4300/` responda 200, y para cada `lang` de `['en','es']` y cada viewport de `[{w:390,h:844},{w:430,h:932},{w:768,h:1024},{w:1440,h:900}]`: abre la página, fija `localStorage.app_lang`, recarga, hace click en todos los `.section-toggle[aria-expanded="false"]`, espera 800 ms, y guarda `fullPage` más una captura por `#experience`, `#projects`, `#skills`, `#education`, `#contact` en `.superpowers/screenshots/{lang}-{w}-{nombre}.png`. Al terminar mata el proceso de `ng serve`. Con `--reduced-motion` opcional usa `page.emulateMedia({ reducedMotion: 'reduce' })`.

- [ ] **Step 1: Instalar y escribir el script**

```bash
npm install -D playwright
npx playwright install chromium
```

- [ ] **Step 2: Correr y revisar**

Run: `npm run screenshots`
Expected: 48 archivos en `.superpowers/screenshots/`. Revisar cada captura de 390 y 430 px: sin scroll horizontal, nada cortado, targets táctiles de 44 px, badges y tags visibles, tab activo de skills con fondo, iconos del formulario presentes. Corregir en el componente que corresponda y volver a capturar hasta que no haya hallazgos.

- [ ] **Step 3: Borrar `info-card` y verificación final**

Run: `npx ng test --watch=false --browsers=ChromeHeadless 2>&1 | grep TOTAL`; `npx ng build --output-path .superpowers/build-check 2>&1 | tail -8`; `npm run check:css`
Expected: todo SUCCESS; build sin warnings; 0 variables sin definir. Anotar en el mensaje final el tamaño de `styles.css` y `main.js` del build antes (232.92 kB / 2.93 MB en desarrollo) y después.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: playwright screenshot script, remove unused InfoCard"
```

El deploy (regenerar `docs/`) NO es parte de este plan: se hace solo cuando Juan Manuel lo pida.

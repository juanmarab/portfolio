# Juan Manuel Rabuñal — Portfolio

![Angular](https://img.shields.io/badge/Angular%2019-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=GitHub%20Pages&logoColor=white)

Single-page portfolio: experience, projects, skills, education and contact, in English and Spanish.

**Live:** https://juanmarab.github.io/portfolio/

## Stack

- Angular 19 standalone components with signals, no UI framework (Bootstrap was removed).
- Plain CSS per component with global design tokens (colors, radii, motion) in `src/styles.css`.
- Deployed as static files to GitHub Pages from the `docs/` folder of `main`.

## How it is built

- **Content as data.** Experience, projects, education and skills live in `src/app/core/data/*.ts` with `es`/`en` blocks; the services in `src/app/core/services/` project the active language. UI strings are in `src/app/core/translations/`.
- **Sections.** `app-section-shell` renders each section's title and meta count and alternates the two background tones.
- **Cards.** `app-card-details` shows logo, title and description and expands the rest on click; the collapsed content stays in the DOM, clipped and inert.
- **Motion.** `appReveal` (an `IntersectionObserver` directive) triggers staggered entrance animations; a shared observer service, a scroll-progress bar under the header and a back-to-top button round it out. Everything respects `prefers-reduced-motion`.
- **Contact.** EmailJS form with inline status and an embedded Calendly widget.

## Commands

```bash
npm start                     # dev server on http://localhost:4200/
npm test                      # Karma + Jasmine (ChromeHeadless works)
npm run check:css             # fails if a CSS custom property is used but never defined
npx ng build --output-path .superpowers/build-check   # production build without touching docs/
```

## Deploy

GitHub Pages serves `main` → `/docs`.

```bash
ng build --output-path docs --base-href /portfolio/
git add docs
git commit -m "deploy"
git push origin main
```

## Structure

```text
src/
├── app/
│   ├── components/        # about, header, experience, projects, skills, education, contact, footer
│   │   └── shared/        # section-shell, card-details, icon, scroll-progress, back-to-top, calendly-widget
│   ├── core/
│   │   ├── data/          # content (ES/EN)
│   │   ├── directives/    # appReveal
│   │   ├── services/      # language, experience, project, education, reveal-observer, section-state, scroll
│   │   ├── translations/  # UI strings (ES/EN)
│   │   └── utils/         # motion helpers
│   └── app.component.*    # page layout
├── assets/                # images, icons, resume
└── styles.css             # tokens, reset, layout, global components
```

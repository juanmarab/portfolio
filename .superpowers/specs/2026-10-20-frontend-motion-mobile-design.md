# Diseño: refactor del frontend con animaciones, secciones plegables y mobile-first

Fecha: 2026-10-20. Repo: `juanmarab/portfolio` (Angular 19.0.5, standalone components, signals, CSS plano por componente, GitHub Pages).

## 1. Intención

El portfolio ya tiene el contenido al día (Make Software Labs, SIAL, Dalsan, graduación). Lo que falta es que **se vea muy bien en el celular**, que tenga **animaciones con intención** y que las **secciones estén plegadas y se abran solas al bajar**. El público son recruiters y clientes que llegan desde LinkedIn, casi siempre desde el teléfono, y deciden en 20 segundos si siguen leyendo.

Decisión de Juan Manuel: mecanismo y stack a criterio del builder, "lo más profesional posible sin sobrecomplejizar".

## 2. Objetivos

- Mobile-first impecable en 360, 390 y 430 px de ancho, tablet en 768 y desktop en 1200+.
- Secciones Experiencia, Proyectos, Skills, Educación y Contacto plegadas por defecto; se abren solas al scrollear hasta ellas y también a mano.
- Animaciones de entrada, stagger, timeline y micro-interacciones. Todas respetan `prefers-reduced-motion`.
- Cero dependencias nuevas de runtime. Se elimina Bootstrap.
- Se mantienen: bilingüe ES/EN, SEO y metadatos, CSP, accesibilidad por teclado y lector de pantalla, deploy a `docs/` con `baseHref /portfolio/`.
- Se corrigen los bugs encontrados en el relevamiento (sección 6).

## 3. No objetivos

- No migrar a Angular 20, ni a SSR, ni cambiar el builder.
- No cambiar paleta, tipografías ni identidad visual. Se refina, no se rediseña.
- No tocar contenido ni traducciones salvo las claves nuevas que la UI necesite.
- No cambiar EmailJS ni Calendly como servicios.
- No agregar librerías de animación (GSAP, Motion One). Si en el futuro hacen falta springs físicos, se evalúa aparte.

## 4. Anti-objetivos

Esto lo convierte en un fracaso aunque "funcione":

- Saltos de layout o scroll que se mueve solo al abrir una sección.
- Contenido invisible si falla el JavaScript, si no hay `IntersectionObserver`, o con `prefers-reduced-motion`.
- Una sección que el usuario no pueda abrir porque el disparador por scroll no se activó (pantallas muy altas, impresión, zoom, lector de pantalla).
- Animaciones que demoren la lectura: nada tarda más de 600 ms en llegar a su estado final, y el contenido above the fold aparece en menos de 400 ms.
- Elementos enfocables dentro de secciones cerradas que reciban foco con Tab.
- Empeorar LCP o CLS respecto al estado actual.

## 5. Restricciones

- Angular 19.0.5 sin `animate.enter/leave` (eso es 20.2+). Las animaciones son CSS; el JS solo cambia clases.
- Budget `anyComponentStyle` en `angular.json`: 4 kB warning, 8 kB error. `header.component.css` (4.9 kB) y `about.component.css` (4.3 kB) ya superan el warning, así que el límite se sube a 6 kB warning / 10 kB error en la primera tarea del plan y no se fragmenta CSS artificialmente.
- Archivos con CRLF. Mantener.
- CSP en `index.html`: no agregar scripts externos. Las fuentes de Google ya están permitidas.
- El output del build es `docs/`. Nunca guardar documentación ahí. Las specs y planes van en `.superpowers/`.
- Tests con Karma + Jasmine ya configurados. Se agregan specs para lo nuevo.

## 6. Estado actual y bugs a corregir

- Cinco variables CSS se usan sin definirse: `--color-primary-rgb`, `--color-secondary-glow`, `--transition-short`, `--gradient-primary`, `--color-bg-main`. Efecto visible: el tab activo de Skills no tiene fondo y los tech tags de Experiencia no tienen borde ni fondo. Se definen en `styles.css` o se reemplazan sus usos.
- Los iconos `fas fa-user`, `fa-envelope`, `fa-comment`, `fa-paper-plane` del formulario de contacto no renderizan nada: Font Awesome no está cargado. Se reemplazan por `app-icon` agregando los iconos que falten (`user`, `envelope`, `chat`, `send`).
- Menú mobile con `100vh`: en iOS Safari el fondo queda corto. Pasar a `100dvh` con fallback.
- Hamburguesa con área táctil de 30x20 px. Mínimo 44x44.
- El body no bloquea el scroll con el menú abierto y el menú no se cierra con Escape.
- Timeline en 360 px deja unos 190 px de texto por el gutter de 4.5 rem y el padding de 2 rem.
- `.section` con 6 rem de padding vertical en mobile.
- `@angular/animations` instalado y sin usar. Se quita de `package.json`.
- Bootstrap CSS y JS cargados completos (unos 230 kB) para `container`, `row`, `col-*` y una docena de utilidades. Ver sección 7.6.
- `prerendered-routes.json`, `browser/`, `build_output.log` y `build_output.txt` en la raíz son restos de builds. Se borran y se ignoran en `.gitignore`.

## 7. Decisiones de diseño

### 7.1 Tokens de movimiento

En `styles.css`, dentro de `:root`:

```
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
--dur-fast: 150ms;
--dur-base: 350ms;
--dur-slow: 600ms;
--stagger: 60ms;
--reveal-distance: 24px;
```

Un único bloque global:

```
@media (prefers-reduced-motion: reduce) {
  :root { --dur-fast: 0ms; --dur-base: 0ms; --dur-slow: 0ms; --stagger: 0ms; --reveal-distance: 0px; }
  *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; }
}
```

Los `--transition-*` existentes se mantienen como alias de los nuevos tokens.

### 7.2 Directiva `appReveal`

Archivo: `src/app/core/directives/reveal.directive.ts`, standalone.

- Al inicializar agrega la clase `reveal` al host. CSS global: `.reveal { opacity: 0; transform: translateY(var(--reveal-distance)); transition: opacity var(--dur-slow) var(--ease-out), transform var(--dur-slow) var(--ease-out); transition-delay: var(--reveal-delay, 0ms); }` y `.reveal.is-visible { opacity: 1; transform: none; }`.
- Se registra en `RevealObserverService` (un solo `IntersectionObserver` compartido, threshold 0.15, `rootMargin: 0px 0px -8% 0px`). Al intersectar agrega `is-visible` y se desregistra (una sola vez).
- Stagger: el llamador pone `[style.--reveal-delay.ms]="i * 60"` en listas. La directiva no calcula índices.
- Fallbacks: sin `IntersectionObserver`, con `prefers-reduced-motion`, o en el server, agrega `is-visible` de inmediato en `ngOnInit`.
- Seguridad contra "nunca aparece": si el elemento ya está dentro del viewport al registrarse, el observer lo dispara en el primer callback. No hace falta timeout.

### 7.3 Secciones plegables: `app-section-shell`

Archivo: `src/app/components/shared/section-shell/`. Standalone.

Inputs: `sectionId` (string, obligatorio), `title` (string), `meta` (string opcional, ej. "3 puestos"), `tone` (`'dark' | 'light'`, default `'light'`), `startOpen` (boolean, default `false`).

Render (patrón de acordéon estándar: el `<button>` va dentro del `<h2>`, no al revés):

```
<section [id]="sectionId" class="section" [class.section-dark]="tone === 'dark'" [class.is-open]="open()">
  <div class="container">
    <h2 class="section-title">
      <button type="button" class="section-toggle" (click)="toggle()"
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

Estado: `SectionStateService` con un `signal<Record<string, boolean>>`. Métodos `isOpen(id)`, `open(id)`, `toggle(id)`. El componente lee `open = computed(() => state.isOpen(this.sectionId))`.

Apertura automática: el componente registra el `<button>` en `RevealObserverService` con un observer aparte, `rootMargin: 0px 0px -40% 0px` (dispara cuando el título cruza el 60% superior del viewport, es decir el usuario ya llegó a la sección). Al dispararse llama a `open(id)` y se desregistra. Nunca se auto-cierra. Si el usuario cerró a mano, no se vuelve a abrir sola.

Si en un mismo callback del observer hay varios headers plegados dentro de la zona (en un teléfono entran cinco barras en 750 px), se abre solo el más alto en el documento. Al crecer, los demás bajan y se abren a medida que el usuario sigue scrolleando.

Secciones cerradas por encima del punto de lectura: nunca debe pasar. Si una sección cerrada quedara arriba y se abriera sola, insertaría cientos de píxeles por encima de lo que el usuario está leyendo; Chrome y Firefox lo compensan con scroll anchoring, iOS Safari no, y iOS es el público principal. Por eso toda navegación que salta (links del header, CTA "Ver proyectos", URL con `#id`) abre primero, sin transición, todas las secciones plegables desde la primera hasta la de destino inclusive, y recién después scrollea. Con el scroll natural hacia abajo las secciones se abren en orden, y una sección cerrada a mano no se reabre sola, así que no queda ningún otro camino que deje una sección cerrada arriba.

`@media print` fuerza todos los bodies abiertos y sin transición.

Animación de altura: `.section-body { display: grid; grid-template-rows: 0fr; transition: grid-template-rows var(--dur-slow) var(--ease-out); }`, `.section-body-inner { min-height: 0; overflow: hidden; }`, `.is-open .section-body { grid-template-rows: 1fr; }`. No se miden alturas, no hay `max-height` mágico, no hay jank. El contenido crece debajo del punto de lectura, así que no hay salto.

Lo que hay dentro de `section-body` usa `appReveal` normalmente. Como el observer ve aparecer los hijos al abrirse la sección, el stagger se dispara solo.

Accesibilidad y SEO: el contenido está en el DOM aunque esté plegado. Con la sección cerrada el body lleva `inert` para que nada reciba foco. El `<h2>` queda dentro del `<button>`, patrón de acordeón estándar. `aria-expanded` refleja el estado.

Navegación: `HeaderComponent.scrollTo(id)` y `AboutComponent.scrollTo(id)` pasan a usar un `ScrollService.goTo(id)`, que llama a `sectionState.openUpTo(id)` (abre todas las secciones plegables en orden de documento hasta `id` inclusive, con la clase `no-transition` en el `<section>` durante un frame para que el salto de altura sea instantáneo), espera un `requestAnimationFrame`, y scrollea con offset del header. Si la URL carga con `#id`, el `AppComponent` hace lo mismo después del primer render. `SectionStateService` conoce el orden de las secciones porque cada `app-section-shell` se registra al inicializar, en orden de DOM.

Qué queda plegable: `experience`, `projects`, `skills`, `education`, `contact`. Hero y "Sobre mí" no se pliegan: son la primera pantalla y deben leerse sin interacción. El `meta` se calcula desde los datos para Experiencia (puestos), Proyectos (proyectos), Skills (categorías) y Educación (títulos), con una clave de traducción por sección. Contacto no lleva `meta`.

### 7.4 Animaciones por sección

- **Header**: barra de progreso de scroll de 2 px bajo el header, con `transform: scaleX(progreso)`. El listener de scroll existente se envuelve en `requestAnimationFrame`. El panel del menú mobile entra con fade más desplazamiento de 12 px; los items hacen stagger con `--reveal-delay`.
- **Hero**: entrada al cargar en cinco pasos (título, subtítulo, chips, CTAs, sociales) con una sola animación CSS `hero-in` y `animation-delay` escalonado de 80 ms. El glow de fondo deriva lentamente con un keyframe de 24 s en bucle, desactivado con reduced-motion.
- **Sobre mí**: foto con reveal en escala 0.92 a 1; card con reveal normal.
- **Experiencia y Educación**: la línea vertical se dibuja con `transform: scaleY(0 → 1)` y `transform-origin: top`. Donde el navegador soporta `animation-timeline: view()` se usa scroll-driven (dentro de `@supports`); si no, la clase `is-visible` del contenedor dispara una transición de 900 ms. Cada item lleva `appReveal` con stagger de 90 ms; el punto del timeline hace un pulso único al aparecer.
- **Proyectos**: cards con `appReveal` y stagger de 80 ms. El hover existente se mantiene y solo aplica bajo `@media (hover: hover)`.
- **Skills**: al cambiar de filtro las cards reaparecen con el keyframe `fadeScale` existente y stagger por índice. El botón activo recupera su fondo al definirse `--gradient-primary`.
- **Contacto**: columnas con `appReveal`. El botón de enviar muestra estado de carga (deshabilitado más spinner CSS) y el resultado se muestra inline debajo del formulario en vez de `alert()`. Tres claves de traducción nuevas: `sending`, `sent`, `error` (reutilizando los textos de `alert_*`).
- **Footer**: reveal simple.

### 7.5 Mobile

- Estilos base escritos para mobile, con `@media (min-width: …)` hacia arriba. Breakpoints: 576, 768, 992, 1200. Se eliminan los `max-width` sueltos.
- Padding vertical de sección: 3.5 rem base, 5 rem en 768, 6 rem en 992. Hero: 5 rem arriba y 3 rem abajo en base.
- Tipografía fluida: hero `clamp(2.25rem, 7vw, 3.75rem)`, títulos de sección `clamp(1.75rem, 5vw, 2.5rem)`, cuerpo 1 rem con `line-height 1.65`.
- Timeline en base: línea pegada al borde izquierdo con gutter de 1.75 rem, punto de 12 px, cards con padding 1.25 rem, logos de 48 px, header de card en columna por debajo de 400 px. En 768 vuelve al layout alternado actual.
- Project cards: padding 1.25 rem en base, 2 rem en 768. Grid de 1 columna hasta 768, 2 hasta 1024, 3 en adelante.
- Skills: grid de 3 columnas en base con iconos de 44 px, 4 en 576, 6 en 992.
- Contacto: Calendly en 640 px de alto en base; formulario con padding 1.5 rem.
- Header: `height: 100dvh` para el panel, `padding` con `env(safe-area-inset-top/bottom)`, hamburguesa con área de 44x44, `document.body` con `overflow: hidden` mientras el menú está abierto, cierre con Escape y al tocar un link.
- Imágenes: `width` y `height` explícitos en todos los logos para evitar CLS; la foto de perfil con `fetchpriority="high"`.
- Los estados `:hover` que mueven elementos quedan dentro de `@media (hover: hover)` para que no se "peguen" en touch.
- `.container`: `padding: 0 1rem` en base, `0 1.5rem` en 768, `max-width: 1200px`.

### 7.6 Eliminar Bootstrap

- Quitar `bootstrap` de `package.json` y de `styles` y `scripts` en `angular.json`.
- Reemplazar en los templates las clases de Bootstrap por clases semánticas propias del componente. No se crea un mini-Bootstrap de utilidades. Inventario real de uso: `container`, `row`, `col-12/col-md-6/col-md-10/col-lg-8/col-lg-10/col-xl-10`, `d-flex`, `flex-wrap`, `flex-column`, `justify-content-center`, `gap-2/3`, `g-5`, `mb-4/5`, `me-2`, `p-2`, `h-100`, `w-100`, `text-center`, `text-primary`, `fw-bold`, `btn-lg`, `h4`, `form-control`, `form-label`.
- `.container`, `.section`, `.section-dark`, `.section-light`, `.text-muted`, `.text-gradient`, `.app-card`, botones y `.section-title` siguen siendo globales en `styles.css`.
- Inputs del formulario: `.premium-input` absorbe lo que hoy aporta `.form-control` (display block, width 100%, font, line-height, border, radius, focus).
- Al irse Bootstrap también se va Reboot. `styles.css` incorpora un reset mínimo propio: `box-sizing: border-box` universal, márgenes de headings y párrafos, `button` e `input` heredando fuente y color, `img { max-width: 100%; display: block }`, `ul` sin estilo donde corresponda.

### 7.7 Estructura de archivos nueva

```
src/app/core/directives/reveal.directive.ts            (+ spec)
src/app/core/services/reveal-observer.service.ts       (+ spec)
src/app/core/services/section-state.service.ts         (+ spec)
src/app/core/services/scroll.service.ts
src/app/components/shared/section-shell/               (+ spec)
src/app/components/shared/scroll-progress/             (barra de progreso, usada por el header)
src/styles.css                                         (tokens, motion, layout, componentes globales)
scripts/screenshots.mjs                                (capturas con Playwright, ver 8)
.superpowers/specs/, .superpowers/plans/
```

`app.component.html` pasa a envolver cada sección plegable con `<app-section-shell>`; los componentes de sección dejan de renderizar su propio `<section>` y `<h2>`.

## 8. Verificación

- `docs/` es el sitio publicado y está versionado. Ningún commit del refactor lo toca. Los builds de verificación van a una ruta descartable: `npx ng build --output-path .superpowers/build-check` (ignorada en git). Regenerar `docs/` es un paso de deploy aparte, explícito, que se hace solo cuando Juan Manuel lo pide.
- `npx ng build` de producción (a la ruta descartable) termina sin errores ni warnings de budget.
- Tests unitarios nuevos (Karma, Jasmine), escritos antes del código: `RevealDirective` (agrega `reveal`, agrega `is-visible` al intersectar, `is-visible` inmediato sin `IntersectionObserver` y con reduced-motion), `SectionStateService` (`open`, `toggle`, estado inicial), `SectionShellComponent` (`aria-expanded`, `inert`, `startOpen`, se abre al disparar el observer, no se reabre tras cierre manual), `ScrollService` (abre antes de scrollear). Los specs existentes de componentes se actualizan para que compilen.
- `scripts/screenshots.mjs` con Playwright como devDependency: levanta `ng serve`, abre todas las secciones y captura cada una en 390x844, 430x932, 768x1024 y 1440x900, en ES y EN, a `.superpowers/screenshots/`. Las capturas se revisan a ojo antes de dar por terminado cada componente. `.superpowers/screenshots/` va en `.gitignore`.
- Revisión manual con DevTools: `prefers-reduced-motion: reduce` deja todo visible y estático; Tab no entra en secciones cerradas; la URL `#projects` abre y posiciona Proyectos.
- Lighthouse mobile como referencia, no como gate: performance y accesibilidad por encima del estado actual.

## 9. Queda a criterio del builder

- Forma y animación exacta del chevron y del estado plegado.
- Valores finales de duración dentro de los rangos de los tokens.
- Si la barra de progreso vive dentro de `HeaderComponent` o como componente aparte.
- Orden de commits, siempre que cada commit deje el build verde.

## 10. Decisiones tomadas tras la revisión del builder

Un revisor independiente leyó este documento y levantó dos preguntas. Juan Manuel delegó el mecanismo y el stack, así que las resolví yo:

1. **Secciones cerradas por encima del punto de lectura** (ver 7.3): los saltos de navegación abren todo lo anterior al destino de forma instantánea. Alternativas descartadas: abrir solo al bajar (deja secciones que "no se abren solas" al subir) y aceptar el salto confiando en scroll anchoring (falla en iOS Safari).
2. **`docs/` y el deploy** (ver 8): los builds de verificación no tocan `docs/`; el deploy es un paso aparte y a pedido.

Y los detalles que el revisor resolvería solo, ya incorporados: `<h2><button>` en lugar de `<button><h2>`, reset propio al quitar Bootstrap, apertura de un solo header por callback, subir el budget de estilos desde la primera tarea, Contacto sin `meta`, `@media print` con todo abierto.

## 11. Fuera de este trabajo, para después

- `README.md` describe una estructura que ya no existe (`pages/`, `InfoCardComponent`, tema claro/oscuro). Actualizarlo.
- `Resume2026.pdf` probablemente no refleja Make Software Labs ni la graduación.
- `InfoCardComponent` no se usa en ningún template. Borrarlo en el refactor si sigue sin uso.

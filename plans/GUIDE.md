# GUIDE.md — Claude Code Execution Guide for mgbah.dev

This guide tells Claude Code exactly how to approach building this project — the order of operations, what to prioritise, what to never do, and how to handle each layer of the stack.

Read `CLAUDE.md` for design decisions and page specs.
Read `FOLDERSTRUCTURE.md` for what each file does.
This file is about **how to execute**.

---

## Ground Rules

1. **Never use a CSS framework.** No Tailwind, no Bootstrap, no utility libraries. Pure CSS with custom properties only.
2. **Never use a JS framework.** No React, no Vue, no Alpine. Vanilla JS modules only.
3. **Never use jQuery.** Fetch API, Intersection Observer, History API — all native.
4. **Never fetch Phosphor icons as local SVG files.** CDN only: `https://unpkg.com/@phosphor-icons/web`
5. **Never add `console.log` in production code.** Use it during development, remove before finalising.
6. **Always write mobile-first CSS.** Base styles are for mobile. Desktop overrides use `min-width` media queries.
7. **Always use `woff2` as primary font format**, `woff` as fallback.
8. **Always sanitise and validate on the PHP side**, not just the JS side.
9. **Always return JSON from API endpoints** using `includes/responses.php` — never echo raw text.
10. **All images must be WebP.** If provided as PNG or JPG, flag it but proceed with a placeholder.

---

## Build Order

Follow this sequence exactly. Do not skip ahead. Each phase depends on the previous.

### Phase 1 — Foundation (do this first, nothing else)
Build the skeleton that everything runs inside.

**Files to complete:**
1. `config/env.php` — env loader
2. `config/constants.php` — app constants
3. `assets/css/main.css` — CSS custom properties, resets, @font-face, base element styles
4. `index.php` — HTML shell, head tags, font preloads, CSS links, CDN scripts, body structure
5. `.htaccess` — SPA rewrite rule + security + caching

**Verify before moving on:**
- Opening `index.php` in a browser shows a blank dark page with no errors
- Browser dev tools show fonts loading from `/assets/fonts/`
- All CSS files load with 200 status
- `.htaccess` rewrite works: navigating to `/about` returns `index.php` content (not a 404)

---

### Phase 2 — SPA Engine
The router and app entry point. Without this, pages cannot render.

**Files to complete:**
1. `assets/js/router.js` — History API router class
2. `assets/js/utils/transitions.js` — `pageExit()`, `pageEnter()`, `initScrollAnimations()`
3. `assets/js/app.js` — entry point that wires everything together

**Build order within this phase:**
- Write `transitions.js` first (no dependencies)
- Write `router.js` second (depends on transitions)
- Write `app.js` last (depends on router)

**Router implementation notes:**
- Use dynamic `import()` for page modules — lazy loads each page only when needed
- Always await `pageExit()` before swapping content
- Always call `mod.init?.()` after injecting HTML — the `?.` prevents errors if a page has no `init`
- Handle `popstate` for browser back/forward: re-call `navigate()` with `window.location.pathname`
- Intercept clicks at the document level: `document.addEventListener('click', handler)` — check if target is an `<a>` with same-origin href

**Verify before moving on:**
- Clicking a nav link changes the URL without page reload
- Browser back button works correctly
- Direct URL access (e.g. typing `/about` into the address bar) loads the correct page

---

### Phase 3 — Navigation Component
Nav must be live before building pages, because each page needs to know its route context.

**Files to complete:**
1. `assets/js/components/nav.js`
2. `assets/css/layout.css` — nav styles

**Nav behaviour checklist:**
- [ ] Logo links to `/`
- [ ] Nav links: About, Projects, Lymora, Contact
- [ ] Active link highlighted based on current route
- [ ] Scroll behaviour: `.scrolled` class added after 50px scroll (adds blur + border)
- [ ] Mobile: hamburger button toggles full-screen overlay
- [ ] Mobile overlay: large links, close button, closes on link click
- [ ] Keyboard accessible: Tab order logical, Escape closes mobile menu

---

### Phase 4 — Pages (one at a time, in this order)
Each page = one `render()` function + one `init()` function. Keep them focused.

#### 4a. Home page (`pages/home.js`)
Most complex page. Build it fully before moving on.

Sections to build in order:
1. Hero — particle canvas, name, tagline, CTAs, scroll indicator
2. Marquee strip — looping text ticker
3. Selected Work preview — 2–3 project cards (use placeholder images initially)
4. About strip — one paragraph + link
5. Lymora feature block — dark card callout
6. Bottom CTA section

After HTML is rendering, complete `particles.js` and call `initParticles()` from `home.init()`.

**Particle config:** Slow, low-opacity, white. Smoke effect. Not stars. See `CLAUDE.md` for exact config values.

#### 4b. About page (`pages/about.js`)
Two-column layout. Build left column first (text, skills, experience), then right column (photo placeholder), then merge.

Skills pills: these are just `<span>` elements inside a flex-wrap container. Style via `.skill-pill` in `components.css`.

Experience table: `<table>` or definition list. Three columns: Role | Company | Year. Minimal styling — thin horizontal rules only.

#### 4c. Projects page (`pages/projects.js`)
Grid first. Filter functionality second.

Grid layout: CSS Grid, 2 columns on desktop, 1 on mobile. Cards have a fixed aspect ratio image on top, text below.

B&W image effect: `filter: grayscale(100%)` on `.project-card img`. On hover: `filter: grayscale(0%)` with `transition`.

Filter tabs: on click, hide/show cards by `data-category` attribute. Use CSS class toggling, not DOM removal.

#### 4d. Lymora page (`pages/lymora.js`)
Treat this like a mini company page, not a project showcase.

Counter animation for traction numbers: in `init()`, use `requestAnimationFrame` to count from 0 to target value over ~1.5s. Trigger only when the element enters the viewport (via Intersection Observer).

#### 4e. Contact page (`pages/contact.js`)
Most functionality-heavy page.

Build in this order:
1. Layout and copy
2. Cal.com embed button (just needs the `data-cal-link` attribute and the script already in `<head>`)
3. Contact form HTML
4. Form submit handler (fetch to `api/contact.php`)
5. Success/error state display

Form states:
- **Default:** Form visible, submit button active
- **Loading:** Button disabled, shows spinner or "Sending..."
- **Success:** Form hidden, success message shown: "Message sent. I'll get back to you."
- **Error:** Error message shown inline under the form, form remains

---

### Phase 5 — Chat Widget
**Files to complete:**
1. `assets/js/components/chat.js`
2. Chat widget styles in `assets/css/components.css`

Build in this order:
1. Render the bubble and panel HTML into `#chat-widget`
2. Open/close toggle on bubble click
3. Send button → construct WhatsApp URL → `window.open(url, '_blank')`
4. Auto-open logic (45s timer, check sessionStorage first)
5. Dismiss logic (save to sessionStorage, prevent auto-open)

The WhatsApp number must come from a JS constant. Expose it from PHP in `index.php` as:
```php
<script>window.WHATSAPP_NUMBER = '<?= WHATSAPP_NUMBER ?>';</script>
```
Then in `chat.js`: `const number = window.WHATSAPP_NUMBER;`

---

### Phase 6 — PHP API
**Files to complete (in this order):**
1. `includes/responses.php`
2. `includes/helpers.php`
3. `includes/headers.php`
4. `config/env.php` (if not already done in Phase 1)
5. `includes/mailer.php`
6. `includes/rate_limit.php`
7. `api/email_templates.php`
8. `api/mail_templates/contact_autoreply.html`
9. `api/contact.php`

**Test the contact API independently with curl before wiring to the frontend:**
```bash
curl -X POST https://mgbah.dev/api/contact.php \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","message":"Hello"}'
```
Expected: `{"status":"success","message":"Message sent..."}`

---

### Phase 7 — Animations & Polish
Once all pages work and the API is live, layer in the motion.

**Files to focus on:**
- `assets/css/animations.css`
- `assets/js/utils/transitions.js`

**Checklist:**
- [ ] Page enter: content fades up from slight offset on every route change
- [ ] Page exit: content fades down/out before swap
- [ ] Hero: name and tagline stagger in on first load (delay between elements)
- [ ] Scroll animations: `.fade-up` elements enter from below as user scrolls
- [ ] Nav: smooth opacity + border transition on scroll
- [ ] Project cards: image grayscale → colour on hover, smooth
- [ ] Buttons: hover state is visible and smooth
- [ ] Chat widget: panel slides up on open, slides down on close
- [ ] Marquee: smooth infinite loop, no jump

**Performance rule for animations:** Only animate `opacity` and `transform`. Never animate `height`, `width`, `top`, `left`, `margin`, or `padding` — these trigger layout reflows and kill performance. Use `transform: translateY()` instead of changing `top`. Use `transform: scaleX()` instead of changing `width`.

---

### Phase 8 — Responsive
Do this after Phase 7. Responsive is a refinement pass, not a rebuild.

**Breakpoints:**
```css
/* Mobile first — base styles are for 320px+ */
@media (min-width: 640px)  { /* small tablet */ }
@media (min-width: 768px)  { /* tablet */ }
@media (min-width: 1024px) { /* desktop */ }
@media (min-width: 1280px) { /* large desktop */ }
```

**Per-page responsive checklist:**
- Home: hero text size scales down on mobile, CTAs stack vertically, particle canvas still full-bleed
- About: two-column collapses to single column on mobile (portrait goes below text)
- Projects: 2-column grid collapses to 1 column
- Lymora: two-product side-by-side stacks vertically
- Contact: two-column stacks, Cal.com embed goes below copy
- Nav: hamburger appears below 768px, links hidden

---

### Phase 9 — SEO & Meta
Final pass before deployment.

In `router.js` `navigate()` method, after every route change:
```js
const meta = {
  '/':         { title: 'Michael Mgbah — Backend Developer & Entrepreneur', desc: 'CEO of Lymora. Building products that solve real problems.' },
  '/about':    { title: 'About — Michael Mgbah', desc: 'The story behind the developer.' },
  '/projects': { title: 'Projects — Michael Mgbah', desc: 'Selected work in web development and product.' },
  '/lymora':   { title: 'Lymora — Michael Mgbah', desc: 'The company I built. Academic operating system.' },
  '/contact':  { title: 'Contact — Michael Mgbah', desc: 'Book a call or send a message.' },
};
document.title = meta[path].title;
document.querySelector('meta[name="description"]').content = meta[path].desc;
```

Also ensure `index.php` has complete Open Graph and Twitter Card meta tags.

---

## Code Style Rules

### JavaScript
- ES6+ modules. Use `import`/`export` throughout.
- Use `const` by default. `let` only when reassignment is needed. Never `var`.
- Async/await for all async operations. No raw `.then()` chains.
- Arrow functions for callbacks. Named functions for top-level exports.
- No classes unless the `Router` pattern — prefer plain functions and module exports.

### CSS
- All values from custom properties. Never hardcode `#0a0a0a` or `16px` directly — use `var(--color-bg)` and `var(--text-base)`.
- BEM-lite naming: `.component-name`, `.component-name__element`, `.component-name--modifier`
- Never use `!important`. Fix specificity instead.
- Group properties: positioning → box model → typography → visual → animation

### PHP
- Short PHP tags off. Always `<?php`.
- All user input sanitised before use — no exceptions.
- All API files start with `require_once` for `headers.php`.
- No inline SQL — this project has no database, but the principle holds.
- Functions are named with `camelCase`. Files use `snake_case`.

---

## Common Mistakes to Avoid

| Mistake | Fix |
|---|---|
| Calling `mod.init()` before HTML is in the DOM | Always inject HTML first, then call `init()` |
| Particles running on non-home pages | Check for `document.getElementById('hero-canvas')` before calling `initParticles()` |
| Direct URL `/about` returning 404 | Verify `.htaccess` rewrite rule is active |
| Nav active state not updating on navigation | Re-run nav active logic inside router's `navigate()` callback |
| Chat widget auto-opening on every page load | Check `sessionStorage.getItem('chat_dismissed')` before setting timer |
| Contact form submitting with empty fields | Validate in JS before fetch, validate again in PHP |
| CORS errors on API calls | Ensure `includes/headers.php` is required first in `contact.php` |
| Page transition flicker | Ensure `pageExit()` fully completes (await the Promise) before injecting new HTML |
| Fonts flashing (FOUT) | Preload woff2 files in `<head>` with `<link rel="preload">` |
| tsParticles not destroying on navigation | Call `tsParticles.destroy()` in a cleanup step when leaving the home page |

---

## File Dependency Map

```
index.php
  └── config/env.php
  └── config/constants.php
  └── assets/css/main.css
        └── assets/fonts/*
  └── assets/css/layout.css
  └── assets/css/components.css
  └── assets/css/animations.css
  └── assets/js/app.js
        └── assets/js/router.js
              └── assets/js/utils/transitions.js
              └── assets/js/pages/home.js
                    └── assets/js/components/particles.js
              └── assets/js/pages/about.js
              └── assets/js/pages/projects.js
              └── assets/js/pages/lymora.js
              └── assets/js/pages/contact.js
        └── assets/js/components/nav.js
        └── assets/js/components/chat.js
        └── assets/js/utils/transitions.js

api/contact.php
  └── includes/headers.php
  └── includes/rate_limit.php
  └── includes/helpers.php
  └── includes/mailer.php
        └── vendor/autoload.php
        └── config/env.php
  └── includes/responses.php
  └── api/email_templates.php
  └── api/mail_templates/contact_autoreply.html
```

---

## Quick Reference: CDN Scripts

Always load in this order in `index.php`:
```html
<!-- In <head> -->
<script src="https://unpkg.com/@phosphor-icons/web" defer></script>

<!-- Cal.com (paste the full init script from cal.com/docs) -->
<script>/* Cal.com init */</script>

<!-- Before </body> -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles@2/tsparticles.bundle.min.js"></script>
<script type="module" src="/assets/js/app.js"></script>
```

GSAP and tsParticles must load **before** `app.js`. Phosphor can be deferred — it uses web components and initialises itself.

---

## Definition of Done

The site is complete when:
- [ ] All 5 pages render correctly and transitions are smooth
- [ ] Browser back/forward buttons work on all routes
- [ ] Direct URL access works for all routes (no 404)
- [ ] Fonts load from `/assets/fonts/`, no external requests
- [ ] Particles run on home, destroyed on navigation away
- [ ] Nav active state updates correctly on every route change
- [ ] Nav scrolled state works
- [ ] Mobile nav works (hamburger, overlay, close)
- [ ] Contact form submits, sends email, shows success state
- [ ] Auto-reply email sends to the contact
- [ ] Rate limiter blocks excessive submissions
- [ ] Chat widget opens, closes, sends to WhatsApp
- [ ] Chat auto-open fires after 45s, respects sessionStorage dismiss
- [ ] Cal.com popup opens on "Book a Call" click
- [ ] All images are WebP and lazy loaded
- [ ] No console errors on any page
- [ ] Lighthouse Performance score ≥ 90
- [ ] Lighthouse Accessibility score ≥ 85
- [ ] Site looks correct on Chrome, Firefox, Safari, and mobile

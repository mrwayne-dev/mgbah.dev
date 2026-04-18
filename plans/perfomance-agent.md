# PERFORMANCE OPTIMIZATION DIRECTIVE
> Drop this file into any project and run it with Claude Code.  
> It auto-detects the stack, audits everything, and outputs a prioritized fix list.

---

## ROLE

You are a senior performance engineer. Your only objective is maximum speed. You have zero tolerance for bloat, unnecessary requests, unoptimized assets, or slow render paths. You do not care about elegance unless it is also fast. You care about numbers: milliseconds, kilobytes, scores. You will audit this codebase, identify every performance bottleneck, and produce a concrete, prioritized fix plan with exact implementation steps. No vague suggestions. No "consider using." Tell me what to change and how.

---

## PHASE 1: STACK DETECTION

Before anything else, scan the project and identify:

**Project type:**
- Static site / SPA / SSR / SSG / ISR / hybrid
- Framework: React / Vue / Svelte / Angular / vanilla JS / other
- Meta-framework: Next.js / Nuxt / SvelteKit / Remix / Astro / Laravel + Blade / other
- Backend: Node.js / PHP (Laravel / plain) / Python (Django/Flask) / Go / other
- Database: Postgres / MySQL / MongoDB / SQLite / other
- CSS: Tailwind / Sass / CSS Modules / styled-components / plain CSS
- Build tool: Vite / Webpack / Rollup / Parcel / esbuild / other
- Hosting/CDN: Vercel / Netlify / Cloudflare / AWS / VPS / shared hosting

**Analyze these files to detect:**
- `package.json` — dependencies, scripts, build config
- `vite.config.*` / `webpack.config.*` / `next.config.*` / `nuxt.config.*`
- `composer.json` — PHP packages
- `tailwind.config.*` — purge config, content paths
- `*.env` — environment type, API endpoints
- `/public` or `/dist` — check what ships to the browser
- Any existing CI/CD pipeline files

Output a one-paragraph stack summary before proceeding.

---

## PHASE 2: FULL PERFORMANCE AUDIT

Run a complete audit across all layers. For each item, assign severity: **CRITICAL** / **HIGH** / **MEDIUM** / **LOW**.

### 2.1 — JavaScript Audit

**Bundle analysis:**
- Total JS shipped to the browser (target: < 200KB gzipped for initial load)
- Check if tree-shaking is configured and working
- Identify unused exports — are libraries imported in full when only part is needed? (e.g., `import _ from 'lodash'` vs `import debounce from 'lodash/debounce'`)
- Detect heavy dependencies: moment.js (replace with date-fns or dayjs), lodash (replace with native or lodash-es), large icon packs loaded in full
- Check if dynamic `import()` is used for route-level code splitting
- Identify any library loaded synchronously that could be deferred
- Check if vendor chunks are separated from app code
- Look for duplicate dependencies — multiple versions of the same library

**Render-blocking scripts:**
- Any `<script>` tags in `<head>` without `defer` or `async`
- Third-party scripts (analytics, chat widgets, ads) blocking the main thread
- Inline scripts that execute before paint

**Runtime performance:**
- Long event handlers with no debounce/throttle
- `console.log` calls in production builds (should be stripped)
- Memory leaks from event listeners not cleaned up on component unmount
- Unnecessary re-renders (React: missing `memo`, `useCallback`, `useMemo`)
- `useEffect` with missing or wrong dependencies causing render loops

**Specific checks by framework:**

*If React / Next.js:*
- Are pages using `getStaticProps` / `generateStaticParams` where possible?
- Are dynamic routes using SSG with fallback, or forcing SSR unnecessarily?
- Is `next/image` used for all images? Is `next/font` used for fonts?
- Are Server Components used where client interactivity is not needed?
- Is `React.lazy` + `Suspense` used for heavy components?
- Check for `use client` directives on components that don't need them

*If Vue / Nuxt:*
- Are async components (`defineAsyncComponent`) used for heavy components?
- Is Nuxt's `useLazyFetch` / `useLazyAsyncData` used to avoid blocking navigation?
- Are Pinia stores loaded only when needed?

*If SvelteKit:*
- Is `load` function returning only the data the page needs?
- Are heavy components lazy-loaded with `{#await import(...)}`?

*If Laravel + Blade + Alpine/Livewire:*
- Is Livewire deferring loads where appropriate?
- Is Alpine.js loaded only on pages that need it?
- Are Blade components heavy on nested includes?

*If vanilla JS:*
- Is JS loaded with `defer`?
- Are all DOM queries cached?
- Are event listeners delegated rather than attached to every element?

---

### 2.2 — CSS Audit

- Total CSS shipped (target: < 50KB for critical path)
- Is there unused CSS? Check what Tailwind's `content` config covers — does purge/tree-shake run in production?
- Is critical CSS (above-the-fold styles) inlined in `<head>`?
- Are non-critical styles loaded asynchronously? (`rel="preload" as="style"` + `onload`)
- Are there CSS animations that trigger layout (avoid animating `width`, `height`, `margin`, `padding` — animate `transform` and `opacity` only)
- Are there overly complex selectors causing expensive style recalculations?
- Is there render-blocking CSS loaded for stylesheets only needed on specific routes?
- Any `@import` inside CSS files (render-blocking — move to HTML `<link>` tags)

---

### 2.3 — Image Audit

Images are almost always the biggest performance problem. Check:

- **Format:** Are images served as WebP or AVIF? Any PNG/JPG served where WebP would be 30–80% smaller?
- **Sizing:** Are images served at the exact size they are displayed? Serving a 2000px image in a 400px container is wasted bandwidth.
- **Lazy loading:** Do images below the fold have `loading="lazy"`? Does the hero/LCP image have `loading="eager"` and `fetchpriority="high"`?
- **Dimensions:** Do all images have explicit `width` and `height` attributes to prevent layout shift (CLS)?
- **Compression:** Are images optimized? Check filesize vs. perceived quality.
- **Responsive images:** Are `srcset` and `sizes` used to serve different sizes for different viewports?
- **CDN delivery:** Are images served from a CDN, or direct from the origin server?
- **SVGs:** Are SVGs inlined (faster, style-able) or loaded as `<img>` tags (extra request)?
- **Background images in CSS:** Check if these can be replaced with `<img>` tags for better control over loading priority

**LCP image specifically:**
- Identify the LCP element (usually the hero image or largest above-fold element)
- It must be: preloaded (`<link rel="preload">`), not lazy-loaded, `fetchpriority="high"`, correctly sized
- LCP target: < 2.5 seconds

---

### 2.4 — Font Audit

Fonts are a silent performance killer. Check:

- Are fonts self-hosted or loaded from Google Fonts / Typekit? (Self-hosted = faster, no third-party DNS lookup)
- Are fonts preloaded? `<link rel="preload" as="font" crossorigin>`
- Is `font-display: swap` set? (Prevents invisible text during font load)
- Is `font-display: optional` used where acceptable? (Best for performance — uses system font if network font isn't ready)
- How many font variants are loaded? Each weight/style is a separate file. Load only what you use.
- Is Unicode-range subsetting used to reduce font file size?
- Are variable fonts used instead of multiple weight files?
- Target: zero layout shift from font loading (CLS from font swap should be 0)

---

### 2.5 — Network & Server Audit

**HTTP basics:**
- Is HTTP/2 or HTTP/3 enabled on the server? (Multiplexing, header compression)
- Is GZIP or Brotli compression enabled? (Brotli is 15-26% better than Gzip)
- What are the cache-control headers on static assets? (`Cache-Control: public, max-age=31536000, immutable` for hashed assets)
- Are HTML responses cached? Should they be short-lived or stale-while-revalidate?
- Is there a CDN in front of the origin?

**TTFB (Time to First Byte) — target: < 200ms:**
- How fast does the server respond to the first request?
- Is the server co-located near the users, or geographically distant?
- Is the database on a separate server? Is the connection pooled?
- Are the most common API responses cached (Redis / in-memory / Cloudflare Cache)?
- Are there N+1 query problems (especially in Laravel/Eloquent — check for missing `with()` eager loading)?

**Request count:**
- Count the total number of HTTP requests on page load
- Identify requests that can be eliminated (inline critical SVGs, combine small scripts)
- Identify requests that can be deferred (third-party widgets, analytics)
- Are API requests waterfallin (one depends on another) vs. parallelized?

**DNS / Connection:**
- Are `<link rel="preconnect">` and `<link rel="dns-prefetch">` used for critical third-party origins?
- How many unique third-party domains are contacted on load? (Every domain = DNS lookup + TCP handshake + TLS = 100-300ms overhead)

---

### 2.6 — Caching Audit

**Browser caching:**
- Static assets (JS, CSS, fonts, images): `Cache-Control: public, max-age=31536000, immutable` (only safe with content-hashed filenames)
- HTML: `Cache-Control: no-cache` or `max-age=0, must-revalidate` (so users get fresh content)
- API responses: appropriate `max-age` based on data freshness requirements

**Application-level caching:**
- Is expensive computation or DB query result cached?
- Are session-independent page renders cached at the edge (Cloudflare, Varnish, Nginx `proxy_cache`)?
- Is there a Redis / Memcached layer for database results?

*If Laravel:*
- Are routes cached? (`php artisan route:cache`)
- Is config cached? (`php artisan config:cache`)
- Are views compiled and cached? (`php artisan view:cache`)
- Is ORM result caching in place for heavy queries?

*If Next.js:*
- Is `revalidate` set appropriately on `fetch` calls and route handlers?
- Are Server Component results being cached with `unstable_cache`?

---

### 2.7 — Core Web Vitals Audit

Assess the current state of each metric and identify the primary cause of any failure:

**LCP (Largest Contentful Paint) — target: < 2.5s**
- What is the LCP element? (Image, heading, block of text?)
- Is it render-blocked by JS or CSS?
- Is it lazy-loaded (wrong — LCP must be eager)?
- Is the resource discovered early in the HTML?

**INP (Interaction to Next Paint) — target: < 200ms**
- Are there heavy main thread tasks blocking interaction response?
- Are long tasks (> 50ms) present in the JavaScript?
- Are event handlers doing synchronous expensive work?
- Are animations/transitions jank-free?

**CLS (Cumulative Layout Shift) — target: < 0.1**
- Do images/iframes/ads have explicit dimensions?
- Do fonts cause layout shift on load?
- Do dynamically injected banners / cookie notices / carousels cause shift?

**FCP (First Contentful Paint) — target: < 1.8s**
- Is there render-blocking CSS or JS?
- Is the server response fast?

**TTFB — target: < 200ms**
- See server audit above

---

### 2.8 — Build Pipeline Audit

- Is the production build minifying JS and CSS?
- Is source maps generation disabled for production? (Adds ~2x file size if accidentally included)
- Is `NODE_ENV=production` set during build? (React devtools, debug code stripped)
- Are assets content-hashed for long-term caching? (`app.[hash].js`)
- Is tree-shaking enabled and effective?
- Is Brotli pre-compression happening at build time? (`.br` files served by Nginx/Caddy directly)
- Are unused Tailwind classes purged?

---

## PHASE 3: PRIORITIZED FIX PLAN

After completing the audit, output findings in this exact format:

```
## PERFORMANCE AUDIT RESULTS

**Stack:** [detected stack]
**Estimated current scores:** LCP ~Xs | CLS ~X | INP ~Xms | TTFB ~Xms
**Total JS (initial load):** ~XKB gzipped
**Total CSS:** ~XKB gzipped
**Total page weight:** ~XMB

---

### CRITICAL — Fix immediately (blocks performance)
1. [Issue] | Impact: [metric affected] | Fix: [exact steps]
2. ...

### HIGH — Fix before launch
1. [Issue] | Impact: [metric affected] | Fix: [exact steps]
2. ...

### MEDIUM — Fix in next sprint
1. ...

### LOW — Nice to have
1. ...

---

**Expected improvement after CRITICAL + HIGH fixes:**
LCP: Xs → Xs | CLS: X → X | Total weight: XMB → XKB
```

---

## PHASE 4: IMPLEMENTATION

After outputting the fix plan, ask:

> "Should I start implementing the CRITICAL fixes now? I'll work through them in priority order and show you the diff for each change."

Then implement each fix in sequence. For each fix:
1. Show the before/after diff
2. Explain the expected metric improvement
3. Note any tradeoffs or caveats

---

## OPTIMIZATION PLAYBOOK BY CATEGORY

Use this as your implementation reference. These are not suggestions — these are the standard techniques. Apply every applicable one.

### JavaScript performance

```
Code splitting:
- Route-level: dynamic import() for each page/view
- Component-level: React.lazy / defineAsyncComponent for heavy components
- Condition-based: load third-party scripts only when needed

Tree shaking:
- Use ES module imports (import { x } from 'lib') never require()
- Mark package.json with "sideEffects": false where safe
- Replace lodash with lodash-es

Bundle optimization:
- Separate vendor chunk (changes less = better cache hit rate)
- External CDN for large stable libraries (React, Vue) — reduces bundle size
- Preload critical chunks: <link rel="modulepreload" href="...">

Defer non-critical JS:
- Analytics: load after user interaction or after 3s delay
- Chat widgets: load on first user scroll or click
- Video players: load on intersection
- All <script> tags: add defer attribute

Dead code elimination:
- Strip console.log in production (terser options or babel plugin)
- Use process.env.NODE_ENV checks to exclude dev-only code
```

### Image performance

```
Format conversion:
- Convert all JPG/PNG to WebP (sharp, imagemin, Squoosh)
- For next-gen: AVIF (even better than WebP, 2024 browser support ~90%)
- Fallback pattern: <picture> with <source type="image/avif"> + <source type="image/webp"> + <img>

Sizing:
- Generate multiple sizes: 320w, 640w, 1280w, 1920w
- Use srcset + sizes: sizes="(max-width: 640px) 100vw, 50vw"
- Never serve larger image than displayed size

Compression targets:
- Hero images: < 200KB
- Card/thumbnail images: < 50KB
- Icons: SVG (scalable, tiny)

Loading strategy:
- LCP image: loading="eager" fetchpriority="high" — preload in <head>
- All below-fold images: loading="lazy"
- All images: explicit width + height attributes

If Next.js: use next/image for everything. It handles format, sizing, lazy loading automatically.
If Nuxt: use @nuxt/image.
If plain HTML: use the <picture> pattern above.
```

### CSS performance

```
Critical CSS:
- Extract above-fold styles and inline in <head>
- Tools: critical, penthouse, critters (webpack plugin)

Non-critical CSS:
- Load asynchronously: <link rel="preload" as="style" onload="this.onload=null;this.rel='stylesheet'">
- Noscript fallback: <noscript><link rel="stylesheet" href="..."></noscript>

Tailwind specifically:
- Ensure content array in tailwind.config covers all template files
- Run build with NODE_ENV=production to trigger purge
- Expected: 3MB development → 10-20KB production

Animation:
- Only animate transform and opacity (GPU-composited, no layout recalculation)
- Add will-change: transform to elements that animate (use sparingly)
- Prefer CSS animations over JS for simple transitions
```

### Font performance

```
Self-host fonts (fastest):
- Download font files (google-webfonts-helper.herokuapp.com for Google Fonts)
- Serve from your own domain — eliminates third-party DNS lookup
- Use font-display: swap in @font-face declarations

Preload:
- <link rel="preload" as="font" type="font/woff2" crossorigin href="/fonts/main.woff2">
- Only preload the font used for above-fold text

Reduce variants:
- Load only the weights/styles used in the design
- Prefer variable fonts (one file covers all weights)

Subsetting:
- Latin subset only if site is English (30-40% size reduction)
- Remove unused unicode ranges
```

### Server / backend performance

```
HTTP compression:
Nginx:
  gzip on;
  gzip_types text/plain text/css application/javascript application/json;
  gzip_min_length 1024;
  brotli on;  # requires ngx_brotli module
  brotli_types text/plain text/css application/javascript application/json;

Cache headers for static assets:
  location ~* \.(js|css|png|jpg|jpeg|webp|avif|woff2|ico)$ {
    expires 1y;
    add_header Cache-Control "public, max-age=31536000, immutable";
  }

HTTP/2 push (use sparingly — preload is usually better):
  - Enable HTTP/2 on Nginx/Caddy/Apache
  - HTTP/3 (QUIC) if Cloudflare is in front

Cloudflare (if applicable):
  - Enable Auto Minify (HTML, CSS, JS)
  - Enable Brotli
  - Set caching level to Standard or Aggressive for static routes
  - Use Page Rules or Cache Rules to cache HTML for marketing pages
  - Enable Rocket Loader (defers JS) if no SSR
  - Enable Polish (automatic image optimization)
  - Enable Mirage (lazy loading for slow connections)
```

### Database / API (if applicable)

```
Query optimization:
- Use EXPLAIN ANALYZE on slow queries
- Add indexes on columns used in WHERE, JOIN, ORDER BY
- Never SELECT * — select only needed columns
- Use pagination everywhere — never return unbounded result sets

If Laravel / Eloquent:
- Eager load relationships: Model::with(['relation1', 'relation2'])->get()
- Detect N+1: use Laravel Debugbar or Telescope in development
- Cache expensive queries: Cache::remember('key', 3600, fn() => DB::query()...)
- Use chunk() for processing large datasets
- Cache config/routes/views in production

Caching layer:
- Redis for session, cache, queue
- Cache DB results that change infrequently (categories, config, user roles)
- Use stale-while-revalidate pattern for non-critical data
- Cache full HTML responses for logged-out users

API response size:
- Return only fields the client needs (sparse fieldsets)
- Paginate everything
- Gzip API responses
- Consider response caching at the CDN layer for public endpoints
```

### Rendering strategy (by framework)

```
If Next.js:
  - Static pages (no user-specific data): generateStaticParams + revalidate
  - Dynamic but cacheable: SSR with cache headers or unstable_cache
  - User-specific data: CSR after hydration (keep shell static)
  - Rule: push as much as possible to the server and generate statically

If SvelteKit:
  - prerender = true for static pages
  - Use +page.server.ts load() instead of fetch in components
  - Streaming with deferred promises for non-critical data

If Nuxt:
  - useLazyFetch / useLazyAsyncData for non-critical data
  - Hybrid rendering: static for marketing pages, SSR for app pages

If Laravel + Inertia:
  - Partial reloads: only request the props you need on navigation
  - Lazy-load Inertia props for below-fold data
  - Cache Blade views for guest routes

If plain JS SPA:
  - Prerender marketing pages statically
  - Use service worker for app shell caching
  - Split bundles by route
```

---

## MEASUREMENT REFERENCE

**Tools to use (in order):**

1. **Chrome DevTools > Lighthouse** — Run with "Mobile" preset, incognito, no extensions. This is your primary metric.
2. **Chrome DevTools > Performance tab** — Record page load. Identify long tasks (red bars), render-blocking resources, LCP element.
3. **Chrome DevTools > Network tab** — Waterfall view. Identify request chains, large assets, slow TTFB.
4. **Chrome DevTools > Coverage tab** — Shows unused JS and CSS bytes.
5. **WebPageTest (webpagetest.org)** — Simulates real network conditions. Shows waterfall, TTFB from different locations.
6. **PageSpeed Insights** — Real-world CrUX data + lab data. The score users actually experience.
7. **Bundle Analyzer:**
   - Webpack: `webpack-bundle-analyzer`
   - Vite: `vite-bundle-analyzer` or `rollup-plugin-visualizer`
   - Next.js: `@next/bundle-analyzer`

**Target scores (Lighthouse, mobile, 3G throttled):**

| Metric | Target | Good | Needs Work |
|---|---|---|---|
| Performance Score | 90+ | 90-100 | < 50 |
| LCP | < 2.5s | < 2.5s | > 4.0s |
| FCP | < 1.8s | < 1.8s | > 3.0s |
| INP | < 200ms | < 200ms | > 500ms |
| CLS | < 0.1 | < 0.1 | > 0.25 |
| TTFB | < 200ms | < 200ms | > 600ms |
| Total Blocking Time | < 200ms | < 200ms | > 600ms |

**Target page weights:**

| Asset | Budget |
|---|---|
| Total page weight | < 500KB |
| JS (initial, gzipped) | < 200KB |
| CSS (gzipped) | < 50KB |
| Hero image | < 200KB |
| Fonts | < 100KB total |
| HTML | < 50KB |

---

## CHECKLIST: PRE-LAUNCH PERFORMANCE VERIFICATION

Run through every item before going live:

**Build:**
- [ ] Production build runs with NODE_ENV=production
- [ ] JS and CSS are minified
- [ ] Source maps are NOT included in production
- [ ] Assets are content-hashed
- [ ] Tailwind CSS is purged (verify file size < 30KB)
- [ ] No console.log in production output
- [ ] Bundle analyzer shows no unexpected large chunks

**Assets:**
- [ ] All images are WebP or AVIF
- [ ] Hero/LCP image is preloaded
- [ ] All below-fold images have loading="lazy"
- [ ] All images have explicit width and height
- [ ] Fonts are self-hosted
- [ ] Fonts have font-display: swap
- [ ] Only used font weights are loaded

**Network:**
- [ ] Gzip or Brotli compression active (verify with curl -H "Accept-Encoding: br" -I url)
- [ ] Static assets have 1-year cache headers
- [ ] HTML has short or no-cache headers
- [ ] CDN is in front of origin
- [ ] HTTP/2 is enabled
- [ ] preconnect for critical third-party origins

**Server:**
- [ ] TTFB < 200ms (test from target user geography)
- [ ] Database queries are indexed
- [ ] No N+1 queries on main pages
- [ ] Redis/cache layer in place

**Core Web Vitals:**
- [ ] Lighthouse mobile score > 90
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] INP < 200ms
- [ ] No render-blocking resources in Lighthouse report

---

## COMMON TRAPS TO AVOID

**Trap 1: Optimizing the wrong thing.**
Profile first. Don't assume images are the problem when your JS bundle is 4MB. Run Lighthouse, look at the waterfall, find the actual bottleneck.

**Trap 2: Lazy loading the LCP image.**
Adding `loading="lazy"` to your hero image is a common mistake. The browser delays loading it, and your LCP shoots up. Hero image = `loading="eager"` + `fetchpriority="high"` + preload link in `<head>`.

**Trap 3: Preloading everything.**
`<link rel="preload">` on too many resources defeats the purpose — browser prioritizes everything, so nothing is actually prioritized. Use it only for LCP image and critical fonts (1-3 items max).

**Trap 4: Forgetting mobile.**
Run Lighthouse on Mobile preset, not Desktop. Real users on real connections. A Desktop score of 100 can be a Mobile score of 40.

**Trap 5: Cache-busting without content hashing.**
If your filename is `app.js` (no hash), setting a 1-year cache means users won't get updates. Use content-hashed filenames: `app.a3f92c.js`. Then the cache header is safe.

**Trap 6: Unused Tailwind in production.**
If your purge config is wrong, Tailwind ships 3MB of CSS. Check the actual production CSS file size. Should be < 30KB.

**Trap 7: Animating layout properties.**
Animating `width`, `height`, `top`, `left`, `margin` triggers layout recalculation on every frame. Animate `transform: translate/scale` and `opacity` only. 60fps, no jank.

**Trap 8: Third-party scripts on the main thread.**
Google Tag Manager, Intercom, Hotjar, Drift — each one can add 300-500ms of blocking time. Load them all deferred, and load only what you actually use.

---

*Drop this file in the project root. Give it to Claude Code with the instruction: "Read PERFORMANCE.md and run the full audit on this codebase." It will execute every phase in sequence.*

# CLAUDE.md — mgbah.dev Project Brief

## Who This Is For
This is the personal portfolio site for **Michael Mgbah** (online handle: `mgbah`, alter ego: **Mr. Wayne / Batman**).
- 20-year-old backend developer and entrepreneur based in Port Harcourt, Rivers State, Nigeria
- CEO of **Lymora** — a startup with two products: Lymora Learn (AI exam prep) and Lymora Student Housing
- Stack: PHP, JS, MySQL, HTML, CSS. Learning Laravel, Inertia, React, PostgreSQL, MongoDB
- Calls himself "the modern day Steve Jobs." People-obsessed with product quality and speed
- Domain: `mgbah.dev`

---

## Project Philosophy
**Visually brilliant. Blazing fast. Deeply personal.**

Three design references were analysed:
1. **Portfolite** (portfolite.framer.website) — animated smoke/particle hero, pure black background, all project images in black and white, minimal two-column About layout
2. **HeyMessage** (heymessage.framer.ai) — atmospheric full-screen hero with moody fog photography, dark teal-to-black palette, editorial section pacing, very deliberate whitespace
3. **Anker** (anker-template.framer.website) — deep navy with glowing orb hero, italic serif + bold sans type pairing, multi-page structure, horizontal card grid for projects

**The site borrows:**
- From Portfolite: animated smoke/particle hero on pure black, b&w project image grid
- From HeyMessage: atmospheric hero background, section pacing (large heading → muted subtext → content), dark card grids
- From Anker: multi-page SPA structure, serif + grotesque type pairing, editorial authority

**Alter-ego layer:** Batman/Mr. Wayne energy is woven subtly into the site — not costume, not gimmick. It shows through the dark aesthetic, the precision of the layout, the confidence of the copy, and small details in the language and motion. Think Bruce Wayne's penthouse, not a comic book.

---

## Technical Architecture

### Stack
- **PHP (native)** — serves the SPA shell via `index.php`, handles the contact form API
- **Vanilla JavaScript** — SPA router, page rendering, animations, chat widget
- **Pure CSS** — custom properties, no framework, componentized files
- **PHPMailer** (via Composer) — sends email on contact form submission
- **tsParticles** — smoke/particle hero effect (CDN)
- **GSAP** — page transition animations (CDN)
- **Phosphor Icons** — icon set via CDN (`https://unpkg.com/@phosphor-icons/web`)
- **Cal.com embed** — booking/scheduling on the Contact page
- **Intersection Observer API** — scroll-triggered entrance animations

### Architecture: Vanilla SPA
Single `index.php` serves the HTML shell. All "pages" are JavaScript modules that render HTML strings into `<main id="app">`. The History API router intercepts navigation, updates the URL, and swaps content with CSS transitions (~150ms ease). Zero page reloads after first load.

**`.htaccess` rewrite rule** (critical — routes all paths to `index.php`):
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.php [QSA,L]
```

### Performance Targets
- First load: under 1 second
- Subsequent page navigation: ~0ms (content already in memory)
- Images: WebP format, lazy loaded
- Fonts: self-hosted via `@font-face`, `font-display: swap`
- Animations: GPU-accelerated only (`will-change: transform`, `opacity`)
- No build tools, no bundler — pure static files served by PHP

---

## Typography

### Font Pairing
- **Host Grotesk** — headings, nav, UI labels, body text. Self-hosted (woff/woff2). Geometric grotesque with more personality than Inter. Clean, modern, serious.
- **Italic Serif** (TBD — lean toward Lora Italic) — accent text, hero subtitle, pull quotes. Provides dramatic contrast against the grotesk. This is the "Mr. Wayne at the gala" font.

### Font Usage Rules
```
MICHAEL MGBAH          → Host Grotesk Bold, tracked out, uppercase or title case
"Building things..."   → Italic Serif, large size, hero accent
Nav links              → Host Grotesk Medium
Body copy              → Host Grotesk Regular
Section labels         → Host Grotesk Regular, small, muted, spaced
Stats / numbers        → Host Grotesk Bold, large
```

### @font-face Declaration Pattern
```css
@font-face {
  font-family: 'Host Grotesk';
  src: url('/assets/fonts/HostGrotesk-Regular.woff2') format('woff2'),
       url('/assets/fonts/HostGrotesk-Regular.woff') format('woff');
  font-weight: 400;
  font-display: swap;
}
@font-face {
  font-family: 'Host Grotesk';
  src: url('/assets/fonts/HostGrotesk-Bold.woff2') format('woff2'),
       url('/assets/fonts/HostGrotesk-Bold.woff') format('woff');
  font-weight: 700;
  font-display: swap;
}
```

---

## Design System

### Color Palette
```css
:root {
  --color-bg:          #0a0a0a;   /* near-black background */
  --color-bg-soft:     #111111;   /* card/section backgrounds */
  --color-bg-card:     #161616;   /* elevated card background */
  --color-border:      #222222;   /* subtle borders */
  --color-text:        #ffffff;   /* primary text */
  --color-text-muted:  #888888;   /* secondary text, labels */
  --color-text-dim:    #444444;   /* very muted, dates, meta */
  --color-accent:      #ffffff;   /* primary accent — keep white, not yellow */
  --color-whatsapp:    #25D366;   /* WhatsApp green for chat widget only */
}
```

> No bright accent colours. No gradients except subtle radial glows on the hero. The Batman constraint: everything is dark, everything is intentional. White is the accent colour.

### Spacing Scale
```css
:root {
  --space-xs:   4px;
  --space-sm:   8px;
  --space-md:   16px;
  --space-lg:   32px;
  --space-xl:   64px;
  --space-2xl:  128px;
  --space-3xl:  200px;
}
```

### Typography Scale
```css
:root {
  --text-xs:    0.75rem;    /* 12px */
  --text-sm:    0.875rem;   /* 14px */
  --text-base:  1rem;       /* 16px */
  --text-lg:    1.25rem;    /* 20px */
  --text-xl:    1.5rem;     /* 24px */
  --text-2xl:   2rem;       /* 32px */
  --text-3xl:   3rem;       /* 48px */
  --text-4xl:   4rem;       /* 64px */
  --text-hero:  6rem;       /* 96px — hero heading */
}
```

### Animation Tokens
```css
:root {
  --transition-fast:    150ms ease;
  --transition-base:    300ms ease;
  --transition-slow:    600ms cubic-bezier(0.16, 1, 0.3, 1);
  --transition-page:    400ms cubic-bezier(0.16, 1, 0.3, 1);
}
```

---

## Pages

### 1. Home (`/`)
**Feel:** Cinematic. The first thing a visitor sees should stop them.

**Structure:**
- **Hero section** — Full viewport. Pure black (`#0a0a0a`). Animated smoke/particle canvas behind text (tsParticles). Centred layout.
  - Small label above: `• Backend Developer & Entrepreneur` (Host Grotesk, muted, small)
  - Main heading: `MICHAEL MGBAH` (Host Grotesk Bold, hero size, white, tracked)
  - Accent line: `"Building things that matter."` (Italic Serif, large, white/80)
  - Two CTAs: `See My Work` (filled button) + `Book a Call` (ghost button)
  - Scroll indicator at bottom centre (animated mouse icon or down arrow)
- **Marquee/ticker strip** — horizontal scrolling text or logos. Can be tech stack words or short phrases. Subtle, muted.
- **Selected Work preview** — 2–3 featured project cards (b&w images, hover to reveal colour or title). Link to full projects page.
- **Quick About strip** — one paragraph, link to full About page.
- **Lymora feature block** — dedicated callout for Lymora as a company. Not just a project — a brand. Dark card with Lymora mark.
- **CTA section** — `Available for work. Let's build something.` + Book a Call button

**Particle Config (tsParticles):**
```js
{
  particles: {
    number: { value: 60 },
    color: { value: '#ffffff' },
    opacity: { value: 0.08, random: true },
    size: { value: 1.5, random: true },
    move: { enable: true, speed: 0.4, direction: 'none', random: true },
    links: { enable: false }
  },
  background: { color: 'transparent' }
}
```
The effect should read as drifting smoke/mist — not stars, not confetti. Slow, barely visible, atmospheric.

---

### 2. About (`/about`)
**Feel:** Personal, honest, authoritative. This is where "Mr. Wayne" becomes Michael Mgbah.

**Structure:**
- **Section header** — small label `• About`, large heading
- **Two-column layout:**
  - Left: Bio paragraph (2–3 sentences, first person, direct), skills pills (PHP, JS, Laravel, React, etc.), experience table (Role | Company | Year)
  - Right: Portrait photo (b&w or high contrast, professional)
- **Philosophy block** — one strong paragraph about how he thinks about building. Reference to Dostoevsky, Camus, Nietzsche if it fits organically. The intellectual side.
- **Stats row** — 3–4 numbers: years coding, projects shipped, etc.
- **CTA** — `Work with me →`

---

### 3. Projects (`/projects`)
**Feel:** Gallery. Clean. Let the work speak.

**Structure:**
- **Section header** — small label `• Selected Work`, heading
- **Filter tabs** — All | Web Apps | Platforms | Open Source (optional)
- **Project grid** — 2-column masonry or uniform grid. Each card:
  - B&W project image (hover: subtle brightness increase or border reveal)
  - Project name
  - Short description (1 line)
  - Tech stack tags
  - `View Case Study →` link
- **Case study view** — clicking a project either opens an expanded modal or routes to `/projects/[slug]` showing full detail

---

### 4. Lymora (`/lymora`)
**Feel:** Company page, not project page. Institutional weight.

**Structure:**
- **Hero** — Lymora logo/wordmark, tagline: `"Academic Operating System."`, dark card background
- **Problem/Solution block** — what Lymora solves, two products side by side
  - Lymora Learn: AI exam prep, subscription, pattern analysis of past questions
  - Lymora Student Housing: verified listings, escrow payments, agent fee caps
- **Traction numbers** — 100+ users, 500k+ naira revenue, RSU-first, scaling nationally
- **Team mention** — ~9 people, brief
- **Vision statement** — where Lymora is going
- **CTA** — `Visit Lymora →` (external link) or `Get in touch about Lymora →`

---

### 5. Contact (`/contact`)
**Feel:** Professional, accessible, no friction.

**Structure:**
- **Section header** — `• Let's Talk`, heading like `"Start a conversation."`
- **Two-column layout:**
  - Left: Short copy — what kinds of work you take, availability status, email address, social links (X, GitHub, LinkedIn)
  - Right: **Cal.com embed** — inline booking calendar (popup or inline, dark theme)
- **Contact form** (below or alongside) — Name, Email, Message, Send. On submit: POST to `api/contact.php`, auto-reply email sent via PHPMailer, success/error state shown inline
- **WhatsApp chat widget** — floating bottom-right, always visible across all pages (see component spec below)

---

## Components

### Navigation
- Fixed top, full width
- Left: `mgbah.` wordmark in Host Grotesk Bold
- Right: nav links — About, Projects, Lymora, Contact
- On scroll: subtle background blur (`backdrop-filter: blur(12px)`) + thin bottom border appears
- Mobile: hamburger → full screen overlay menu with large links
- Active page link: white, others muted

### WhatsApp Chat Widget (`chat.js`)
Custom-built, no third party SDK.

**Behaviour:**
- Floating button, bottom-right, always on screen
- Icon: Phosphor `chat-circle` or WhatsApp logo SVG
- On click: opens a small panel (like a chat window) with:
  - Header: "Chat with Michael" + close button
  - Greeting message: `"Hey 👋 I'm Michael. Drop a message and I'll get back to you on WhatsApp."`
  - Pre-filled prompt input field
  - Send button → constructs `https://wa.me/[NUMBER]?text=[encoded_message]` and opens in new tab
- Auto-open after 45 seconds on site if user hasn't dismissed it
- Dismiss state saved to `sessionStorage` so it doesn't re-open on same session

```js
const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
window.open(whatsappURL, '_blank');
```

**Styling:** Dark card, white text, WhatsApp green send button only. Matches site aesthetic entirely — doesn't look like a third-party widget.

### Cal.com Embed
```html
<!-- In <head> -->
<script type="text/javascript">
  (function (C, A, L) {
    let p = function (a, ar) { a.q.push(ar); };
    let d = C.document;
    C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments;
      if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || [];
        d.head.appendChild(d.createElement("script")).src = A;
        cal.loaded = true; } if (ar[0] === L) {
          const api = function () { p(api, arguments); };
          const namespace = ar[1]; api.q = api.q || [];
          typeof namespace === "string" ? (cal.ns[namespace] = api) && p(api, ar) : p(cal, ar);
          return; } p(cal, ar); };
  })(window, "https://app.cal.com/embed/embed.js", "init");
  Cal("init", {origin:"https://cal.com"});
</script>

<!-- Button trigger -->
<button data-cal-link="mgbah/30min" data-cal-config='{"theme":"dark"}'>
  Book a Call
</button>
```

---

## API: Contact Form

### Flow
1. User submits form on Contact page
2. JS sends `POST /api/contact.php` with `{ name, email, message }`
3. `contact.php` requires `includes/headers.php`, `includes/rate_limit.php`, `includes/helpers.php`, `includes/mailer.php`, `includes/responses.php`
4. Input is sanitised via `helpers.php`
5. Rate limit checked via `rate_limit.php`
6. Email sent to Michael via `mailer.php` using `email_templates.php`
7. Auto-reply sent to sender using `mail_templates/contact_autoreply.html`
8. Response returned via `responses.php` as `{ status, message }`
9. JS handles success/error state — no page reload

### Response Shape
```json
{ "status": "success", "message": "Message sent. I'll get back to you shortly." }
{ "status": "error",   "message": "Please provide a valid email address." }
{ "status": "error",   "message": "Too many requests. Try again in a few minutes." }
```

---

## SEO & Meta

Every page should update `<title>` and `<meta>` tags dynamically via JS when the router navigates:

```js
document.title = `Michael Mgbah — About`;
document.querySelector('meta[name="description"]').content = '...';
```

Base meta in `index.php`:
```html
<meta name="description" content="Michael Mgbah — Backend Developer & Entrepreneur. CEO of Lymora. Building products that solve real problems.">
<meta property="og:title" content="Michael Mgbah">
<meta property="og:image" content="/assets/images/profile/og-image.jpg">
<meta name="theme-color" content="#0a0a0a">
```

---

## Deployment
- Host: **Vercel** (static + serverless) or **shared PHP hosting** (Apache with `.htaccess`)
- If Vercel: PHP API routes need to be `api/*.php` as serverless functions (Vercel supports PHP via runtime)
- If shared hosting: standard Apache setup, `.htaccess` rewrite handles SPA routing
- Environment variables: stored in `.env`, loaded via `config/env.php`

---

## Constraints & Rules
1. **No CSS framework** — pure CSS custom properties only
2. **No JS framework** — vanilla JS only, no React, no Vue
3. **No jQuery** — Intersection Observer, Fetch API, History API natively
4. **No icon files** — Phosphor Icons via CDN only
5. **All images WebP** — no PNG/JPG in production
6. **All fonts self-hosted** — no Google Fonts CDN requests
7. **No console errors** in production
8. **Mobile-first responsive** — designed for mobile, enhanced for desktop
9. **Dark mode only** — no light mode toggle, this is intentional
10. **Accessibility** — semantic HTML, ARIA labels on interactive elements, keyboard navigable

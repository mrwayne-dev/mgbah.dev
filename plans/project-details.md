# Project Image & Visual Guide

This document answers the question: **what image goes where, and what should it look like?**

---

## How images are used on the site

### 1. Project card (projects page)
The `project-card__image-wrap` area currently shows a text placeholder. You said you want a **logo** here — the project's mark or wordmark, displayed on a dark background (`#0a0a0a`).
tht
### 2. Case study gallery (3 slots)
Every project in `PROJECTS_DATA` has an `images` array with 3 paths:
- `images[0]` → **Main slot** (`cs-gallery__main`) — larger, more prominent
- `images[1]` → **Secondary slot** (`cs-gallery__secondary`) — smaller, side by side with slot 3
- `images[2]` → **Secondary slot** (`cs-gallery__secondary`) — smaller, side by side with slot 2

All three appear together above the overview section on the case study page.

---

## The projects that need images

### Existing projects with no images yet
These all have placeholder paths (`/assets/images/projects/<slug>/01.png`) but the files don't exist yet. You'll need to create assets for any project where you want the case study to look real. Priority is the ones with `caseStudyReady: true` first — those are the ones users can actually visit.

**Case study ready (visible now):**
- `id-card-generator`
- `niit-website`
- `webstarter-cli`

**In development (case study exists but shows "in development" notice):**
- `lymora-learn`, `lymora-housing`, `mock-investment-platform`, `logistics-tracking`, `escrow-payment-api`, `webhook-tester`, `sql-query-explainer`, `laravel-audit-trail`, `php-response-formatter`, `api-key-manager`, `web2stack`

---

## web2stack — full image breakdown

This is the new project, so here's a detailed spec for every visual.

---

### Card logo (projects page preview)

**What it is:** A small logo/mark displayed inside the `project-card__image-wrap` area on a dark background.

**Recommendation: Wordmark + terminal accent**

Design a horizontal lockup:
- `web2stack` in a clean monospace font (JetBrains Mono, IBM Plex Mono, or similar)
- The `2` styled differently — either in a muted accent colour or slightly larger weight — to visually anchor the name
- Optionally: a subtle `>_` terminal cursor to the left of the text, very small, in the accent colour

**What not to do:**
- Don't make it complex — the card area is small
- Don't use the same font as the site body (Host Grotesk) — the monospace signals "CLI tool" immediately
- Don't use a screenshot here, only a mark/wordmark

**Dimensions:** Match existing card image area. Look at the CSS for `.project-card__image-wrap` to get the exact height. Design at 2x for retina.

**Format:** PNG with transparent background, or SVG. Either works since it sits on a solid dark card.

**Colour:** White wordmark on transparent (the card's dark background shows through). If you want accent colour on the `2`, use something in the blue/cyan range (`#4F9EFF` or similar) — it reads "tech/developer tool" and contrasts the white site text.

---

### Case study images

#### Image 01 — Main slot (larger)
**What to put here:** A terminal mockup showing web2stack in action.

This is the hero image of the case study. It needs to communicate the product in one glance.

**Recommended:** A designed terminal window screenshot.

Design a realistic macOS or generic terminal window (dark background, traffic light buttons or just a clean dark frame) showing:

```
$ web2stack convert https://stripe.com --framework react

  Crawling https://stripe.com...          ✓
  Extracting DOM structure (247 nodes)... ✓
  Detecting animations (GSAP, 3 found)... ✓
  Generating IR schema...                 ✓
  Converting to React components...       ✓

  Output → ./web2stack-output/
    ├── components/
    │   ├── Hero.jsx
    │   ├── Navbar.jsx
    │   ├── PricingCard.jsx
    │   └── Footer.jsx
    ├── styles/
    └── animations/

  Done in 12.4s — 4 components, 3 animations preserved.
```

**Why this works:** CLI tools live and die by their terminal output. This communicates: it works, it's fast, it preserves animations, it produces clean files. No explanation needed.

**How to create:**
- Design in Figma using a terminal frame component
- Use a monospace font for the terminal text (Fira Code, JetBrains Mono)
- Accent the file paths in green or cyan, checkmarks in green
- Export as PNG at 1600×900 or similar wide ratio

---

#### Image 02 — Secondary slot
**What to put here:** A pipeline / architecture diagram.

This shows how web2stack works under the hood. The multi-agent pipeline is the core defensible asset (per the business analysis) — show it visually.

**Recommended layout (left to right):**

```
[ URL input ]
      ↓
[ Crawler Agent ]    ← DOM traversal, computed CSS
      ↓
[ Analysis Agent ]   ← IR schema generation, animation detection
      ↓
[ Converter Agent ]  ← Framework-specific code generation
      ↓
[ Output ]
  React / Vue / Next.js / Blade / HTML
```

Keep it minimal and dark-theme. Use small icon blocks with one-line labels. No clutter.

**Why this works:** It's the kind of diagram that makes a reader go "oh, that's actually sophisticated." It also explains why web2stack is different without needing to write it — you can see the animation detection layer is a separate step, not an afterthought.

**How to create:**
- Design in Figma
- Dark background (`#111` or `#141414`), white text, subtle border/divider lines
- Use Phosphor Icons for small node icons (arrows, gear, code block, etc.)
- Roughly square ratio — it sits next to image 03

---

#### Image 03 — Secondary slot
**What to put here:** A before/after comparison.

This is the clearest way to show the value of a conversion tool.

**Recommended split layout:**

Left half:
- A browser tab showing a real-looking website (marketing site, clean hero section)
- Label at bottom: "Any website"

Right half:
- VS Code editor view showing clean component code
- `Hero.jsx` or `Navbar.jsx` with actual React JSX visible
- Label at bottom: "Clean source code"

Divider between the two halves: a small `→` arrow or just a subtle vertical line.

**Why this works:** Instantly answers the question "what does this tool actually do?" without a single word of explanation. The transformation is the product.

**How to create:**
- Design in Figma
- Left: Use a simple browser mockup frame with a fake hero layout
- Right: Use a code editor mockup (VS Code dark theme frame) with real-looking JSX
- Both on a dark outer background to match the site
- Same roughly square ratio as image 02

---

## General image guidance for all other projects

For all the non-web2stack projects that still need images, here's the pattern by project type:

### API / backend projects (escrow, webhook-tester, sql-query-explainer, etc.)
- **01 (main):** A clean screenshot of the API response in a REST client (Postman/Insomnia dark theme) or a designed mockup of the same. Shows the actual JSON response the API produces.
- **02 (secondary):** An architecture or flow diagram — request → API → response, with the key processing steps labelled.
- **03 (secondary):** A code snippet — the most interesting or representative endpoint, styled in a code block frame.

### Platform projects (lymora-learn, lymora-housing, mock-investment-platform, logistics-tracking)
- **01 (main):** A browser mockup showing the most visually interesting screen of the app (dashboard, main UI, etc.)
- **02 (secondary):** A second screen — a different feature view, or a mobile layout
- **03 (secondary):** A detail shot — a specific UI component, a chart, a card, anything that shows craft

### Open source / CLI tools (laravel-audit-trail, php-response-formatter, api-key-manager)
- Same pattern as web2stack: terminal mockup → diagram → code example

### Institutional sites (niit-website)
- **01 (main):** Full-page screenshot of the homepage (desktop)
- **02 (secondary):** A specific page — course listing or enrollment form
- **03 (secondary):** Mobile layout of the same homepage

---

## Card logo recommendations for all projects

For the projects page, here's a quick decision matrix for what logo/visual to put in the card image area:

| Project | Recommended card visual |
|---------|------------------------|
| web2stack | Wordmark in monospace + terminal accent |
| Lymora Learn | Lymora brand mark (already exists) |
| Lymora Student Housing | Lymora brand mark with "Housing" sub-label |
| Mock Investment Platform | Chart icon or candlestick visual |
| Logistics Tracking | Map/route icon with the client's name if branded |
| Escrow Payment API | Lock + coin icon or abstract mark |
| Webhook Tester | Network/endpoint icon (`POST` badge) |
| SQL Query Explainer | Database / SQL icon in monospace style |
| ID Card Generator | A designed ID card thumbnail |
| NIIT Website | NIIT logo or wordmark |
| Laravel Audit Trail | Laravel flame + log icon |
| PHP Response Formatter | JSON envelope / API response icon |
| Rate-Limited API Key Manager | Key icon with rate limit badge |
| create-php-starter | npm badge style or terminal command snippet |

For everything branded under Lymora, use the existing Lymora brand assets since you already designed those.

For the developer tools (APIs, packages), a clean icon or wordmark is enough — they don't need a product screenshot because the card is small and a screenshot would be unreadable at that size.

---

## File locations

Images should be placed at:
```
assets/images/projects/<slug>/01.png
assets/images/projects/<slug>/02.png
assets/images/projects/<slug>/03.png
```

The `onerror` handler on the `<img>` tag in `casestudy.js` already handles missing images gracefully — it hides the `<img>` and shows the placeholder text instead. So nothing breaks while you're still creating the assets.

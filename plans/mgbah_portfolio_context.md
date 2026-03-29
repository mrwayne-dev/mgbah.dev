# Michael Mgbah — Portfolio Site Context Document
### For Claude Code: mgbah.dev Build Reference

> This document contains everything needed to build, write, and make decisions for mgbah.dev.
> It covers who Michael is, his stack, his background, his projects, and how the site should
> feel and communicate. Read this before writing a single line of code or copy.

---

## 1. Identity & Positioning

**Name:** Michael Mgbah
**Age:** 20
**Location:** Port Harcourt, Rivers State, Nigeria
**Site:** mgbah.dev
**Role:** Full-Stack Developer (Backend-Inclined)
**Alter ego:** Mr Wayne / Batman — referenced in tone and precision, never literally

### The One-Line Pitch
Michael is a backend-inclined full-stack developer who builds products, not just features —
currently the CEO of Lymora, a product-first startup he self-funds through freelance work.

### Extended Bio (use as source for copy, rewrite don't paste)
Michael has been in tech since 2019 — not as a hobbyist, as a builder. He started at NIIT
Port Harcourt and spent five years building a technical foundation that spans 3D design,
graphic design, web development, and full-stack engineering. He has been freelancing for
most of the last six years, working with startups, small businesses, and communities across
Nigeria. He is the CEO of Lymora, a startup with two live products. He has been coding since age 15.

He reads existentialist and absurdist philosophy — Dostoevsky, Camus, Nietzsche. He thinks
of himself as the modern-day Steve Jobs: product-obsessed, systems-oriented, and convinced
that the gap between where he is and where he's going is closed by preparation, not luck.
That is the Batman ethos — a human surpassing limits through discipline and systems, not
superpowers.

The portfolio should communicate: this is someone serious. Not a student looking for a
first job. A builder with a track record, a company, and a clear direction.

---

## 2. Technical Stack

### Primary Stack (what Michael builds with day-to-day)
| Layer | Technologies |
|-------|-------------|
| Backend | PHP, Laravel |
| Frontend | JavaScript, React, Inertia.js, HTML, CSS |
| Databases | MySQL, PostgreSQL, MongoDB |
| API | REST APIs (design, build, document) |
| Version Control | Git, GitHub |

### Extended Stack (proficient, used in projects)
| Area | Technologies |
|------|-------------|
| Styling | Tailwind CSS |
| Build Tools | Vite, npm |
| Design | Photoshop, Illustrator |
| Infrastructure | Docker (learning)|
| Auth | Laravel Sanctum, custom API key auth, builds custom simple Auth systems for his projects |
| Documentation | OpenAPI / Swagger |
| 3D & Motion | Blender (foundational, 2019–2020) |

### Stack Orientation
- **Backend-inclined** — architecture, data modeling, API design, service layer patterns,
  and business logic are where Michael is strongest and most comfortable
- **Capable full-stack** — builds complete products end-to-end; the frontend is not a
  weakness, it's a secondary strength
- **Product-minded** — technical decisions are made in service of product outcomes, not
  to demonstrate technical cleverness

### Current Learning Focus
Completing a structured Laravel fullstack roadmap covering:
- PostgreSQL as primary database
- React + Inertia.js for full-stack SPA patterns
- Service layer architecture (thin controllers, service classes, DTOs, enums)
- Deep API design: versioning, rate limiting, response envelopes, Swagger
- Composer package development and CLI tooling
- Testing with Pest (feature tests, unit tests, CI with GitHub Actions)

---

## 3. Background & Timeline

### NIIT Port Harcourt (2019–2024)
Michael spent five years learning at NIIT Port Harcourt, one of Nigeria's leading
technical training institutes. His learning path across those years:

| Period | What He Learned |
|--------|----------------|
| 2019–2020 | Blender 3D design, Web design fundamentals |
| 2021 | Web design (advanced), Graphic design, Java programming |
| 2023–2024 | Full-stack development (the complete program) |

This wasn't a single bootcamp — it was a multi-year, multi-discipline technical education
that built cross-domain depth most developers his age don't have.

### NIIT Intern Teacher (Early 2025, 3 months)
After completing the full-stack program, Michael was brought back as an intern teacher
at NIIT Port Harcourt. For three months, he taught frontend development to students —
explaining concepts he had recently mastered, which is one of the fastest ways to
deepen understanding. This also demonstrates that NIIT trusted him enough to put
him in front of their students.

During this same period, he built the new NIIT Port Harcourt
website — having also been part of the team that built the previous version in 2024.
Two iterations of the same product, as a contributor both times.

### Freelancing (2019–Present, ~6 years)
Michael has been freelancing throughout most of his technical development — not after
it. This is significant. He was building for clients while still learning, which means
his skills were tested in real conditions from early on. His freelance work has spanned:
- Startups
- Small businesses
- Communities
- Individuals

Six years of freelance as a developer under 21 is not a small thing. It reflects
commercial instinct, client management, and the ability to ship.

---

## 4. Lymora — The Company

Lymora is Michael's product-first startup, self-funded through freelance income.
It currently has two products in active development.

### Lymora Learn
An AI-powered exam prep prediction platform. Core mechanism: pattern analysis of past exam
questions to surface topic frequency, identify repeating patterns, and predict
high-yield areas for upcoming exams. Content is delivered via Google Drive. Powered
by Claude AI models. Distribution partners are Course Reps at RSU.

> This is not just a product — it is Michael's vision applied to a real problem he
> has experienced personally as a university student. It demonstrates that he builds
> with domain insight, not just technical skill.

### Lymora Student Housing
A verified listings marketplace targeting RSU students, with plans to scale nationally.
Features: escrow payments, holding fees, agent fee caps, accuracy scoring for listings.
The trust and verification layer is the product's core differentiator — not the listings. (Do not include details about this, its something under wraps, we will showcase it when it's time to launch)

Lymora has a team of approximately nine people including a CTO and roles across
backend, AI, frontend, Python, design, and workflow. Michael does not build solo.

---

## 5. Portfolio Projects

These are nine projects Michael will build as part of his portfolio after completing
his current Laravel fullstack learning roadmap. They are to be displayed on the site
as **"In Development"** — not hidden, not fake, but honestly framed as upcoming work.

This framing is intentional: it shows forward planning, a project roadmap, and the
kind of systems-level thinking that distinguishes a builder from someone who just
reacts to tutorials.

### Project 01 — Exam Pattern Analyzer API
**Type:** REST API
**Stack:** PHP, Laravel, MySQL, Swagger
**What it does:** Ingests past exam questions and returns structured analysis —
topic frequency, repeat detection using Jaccard similarity, confidence scores,
and predicted high-yield areas. The same pattern-recognition logic that powers
Lymora Learn, extracted into a reusable public API.
**Status:** In Development

---

### Project 02 — Escrow Payment Flow API
**Type:** REST API
**Stack:** PHP, Laravel, MySQL, Sanctum
**What it does:** A fully documented escrow system modeling the complete transaction
lifecycle: hold, fund, release, dispute, resolve, refund. Enforces a strict state
machine (invalid transitions are rejected). Outbound webhook notifications on
every state change. Directly models the payment trust layer in Lymora Student Housing.
**Status:** In Development

---

### Project 03 — Rate-Limited Public API (Nigerian Universities Directory)
**Type:** REST API
**Stack:** PHP, Laravel, MySQL, Swagger
**What it does:** A production-grade public API for Nigerian university and course
data. Features tiered API key auth (free/developer/pro), rate limiting with
response headers, response caching, OpenAPI documentation, and consistent
versioned response envelopes.
**Status:** In Development

---

### Project 04 — lara-init (Laravel CLI Scaffolder)
**Type:** CLI Tool / Composer Package
**Stack:** PHP, Symfony Console, Composer / Packagist
**What it does:** A globally installable CLI tool that scaffolds a new Laravel
project in one command — installs preferred packages by stack preset, generates
the full folder structure (Services, Repositories, DTOs, Enums, Actions), drops
in base files (ApiResponse trait, BaseService, BaseController), configures .env,
and initializes git. Systemized from Michael's own development workflow.
**Status:** In Development

---

### Project 05 — SQL Query Explainer
**Type:** Developer Tool (Web App + API)
**Stack:** PHP, Laravel, Vanilla JS, Claude API
**What it does:** Paste any SQL query, get back a plain-English breakdown
clause by clause, performance warnings by severity, and an optimized rewrite.
Powered by Claude AI on the backend. Demonstrates AI-integrated developer tooling.
**Status:** In Development

---

### Project 06 — Webhook Tester / Inspector
**Type:** Developer Tool (Web App)
**Stack:** PHP, Laravel, MySQL, Vanilla JS, Server-Sent Events
**What it does:** Generates unique receiver endpoints, captures incoming HTTP
requests in real-time (any method, full headers and body), displays them live
without page refresh via SSE, and allows payload replay to any target URL.
Essentially a self-hosted Webhook.site.
**Status:** In Development

---

### Project 07 — mgbah/api-response (Composer Package)
**Type:** Open Source Composer Package
**Stack:** PHP 8.1+, Packagist
**What it does:** Zero-dependency Composer package that standardizes API response
envelopes across any PHP or Laravel project. Provides a trait for Laravel controllers
and a static class for vanilla PHP. Covers success, error, paginated, validation,
and all standard HTTP semantics. Published on Packagist.
**Status:** In Development

---

### Project 08 — mgbah/audit-trail (Composer Package)
**Type:** Open Source Composer Package
**Stack:** PHP 8.1+, Laravel, Packagist
**What it does:** Add the `Auditable` trait to any Eloquent model and every
create, update, and delete event is automatically logged — with before/after
field diffs, authenticated user, IP address, URL, and a human-readable diff
accessor. Configurable field exclusions. Uses the Observer pattern internally.
**Status:** In Development

---

### Project 09 — Portfolio API (mgbah.dev Backend)
**Type:** REST API (Meta Project)
**Stack:** PHP, Laravel, MySQL, Swagger
**What it does:** The REST API that powers mgbah.dev itself. Every project card,
skill, work experience entry, and blog post on the site is served through
`/api/v1/` endpoints. Fully documented with OpenAPI/Swagger. The portfolio
site is the live consumer of this API — the meta-point being that the portfolio
is itself a product, not just a webpage.
**Status:** In Development

---

## 6. Site Design Direction

### Aesthetic
- Minimalist dark theme
- Precise, deliberate — no decorative clutter
- Subtle Batman energy expressed through **copy tone, motion, and precision** —
  never through literal Batman references, logos, or iconography
- The site should feel like it was built by someone who sweats the details

### Typography
- Already Implemented

### Motion
- Subtle, purposeful — not performative
- Entrance animations on scroll, smooth transitions between states
- Nothing that delays content or gets in the way of reading

### Color Palette
- Already Implemented

### Voice & Tone
- Direct, confident, no filler
- Technical but not jargon-dense — a senior engineer and a smart non-technical
  person should both understand every sentence
- No "passionate about technology" or "I love coding" — show, don't perform
- Batman-adjacent: prepared, precise, systems-thinker — earned, not boasted
- Not AI flop, let it sound like me speaking to them

---


The site has already implemented sections across all pages
### Hero
- Name, title (Full-Stack Developer — Backend Inclined), one punchy line
- CTA: View Projects / Get In Touch
- Subtle motion or ambient visual — nothing loud

### About
- Who Michael is in plain language — builder, not just developer
- Brief background arc: NIIT → freelancing → Lymora → now
- Stack badges or visual skill indicators
- Keep it under 150 words of prose — tight

### Projects
- Primary section — the most important part of the site
- 9 portfolio projects, all labeled "In Development"
- Lymora (Learn + Housing) shown separately as real live products
- Cards: project name, one-line description, stack tags, status badge, links (GitHub/Live/Docs)
- Filter by type: All / APIs / Tools / Packages / Products

### Skills
- Grouped by category: Backend, Frontend, Database, Tools & Design
- Not a wall of logos — clean, readable, shows depth not breadth

### Experience & Background
- NIIT timeline (2019–2024)
- Intern Teacher at NIIT (2025)
- NIIT website builds (2024, 2025)
- Freelancing (~6 years)
- Lymora (founding + active)
- RSU (current)

### Contact
- Clean, minimal form
- Email + GitHub + LinkedIn links
- Submission hits Portfolio API `/v1/contact` endpoint

---

## 8. Technical Architecture of the Site

### Stack
- **Frontend:** Vanilla JS SPA (no framework — intentional, demonstrates fundamentals)
- **Backend:** Laravel API (Portfolio API — Project 09)
- **Database:** MySQL
- **Styling:** Custom CSS with CSS variables — no Tailwind on the portfolio site itself
- **Build:** Vite (or no build step for pure vanilla)
- **Hosting:** Railway / Vercel (frontend) + Railway (API)

### API-Driven Content
Every dynamic section is populated by `fetch()` calls to the Portfolio API:
- `/api/v1/projects` → projects section
- `/api/v1/skills` → skills section
- `/api/v1/experience` → background section
- `/api/v1/stats` → hero stats
- `POST /api/v1/contact` → contact form submission

This is a deliberate architectural choice and should be visible to technically
curious visitors (network tab shows the API calls, Swagger docs are linked).

### Performance Targets
- First paint under 1 second
- No render-blocking resources
- Images optimized and lazy-loaded
- API responses cached where appropriate

---

## 9. Copy Reference — Key Phrases

These are directional — Claude Code should use them as tonal anchors, not copy-paste.

**Hero tagline options (pick one or write better):**
- "Backend first. Product always."
- "I build the systems that products run on."
- "Full-stack developer. Product builder. CEO."

**About section opener direction:**
Start with what he does and what he's built, not where he's from or what he studied.
The RSU and NIIT detail comes second. The first sentence should make clear: this is
someone who ships.

**Project card status badge:**
"In Development" — clean, honest, professional. Not "Coming Soon" (passive) and not
hidden (dishonest). In Development says: this is planned and underway.

**Skills section label:**
Not "What I Know" — too humble. Not "Expertise" — too boastful.
Consider: "Stack", "Technical Stack", or just the category headings with no label needed.

---

## 10. What This Site Is Not

- Not a student portfolio looking for an internship
- Not a designer's showcase — the design serves the engineering, not the reverse
- Not a template — every section should feel considered
- Not a list of technologies — the projects tell the technical story
- Not performative humility — Michael has done real work, the site should reflect that

---

*Document version: March 2026*
*For use as Claude Code context — pass this as a project file or system context before beginning any build phase.*

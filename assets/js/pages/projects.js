/**
 * projects.js — Projects page
 * Sections: Header → Filter tabs → Project grid → Designs section
 * Filter: CSS class toggle on .project-card--hidden, no DOM removal
 */

import { DESIGNS_DATA } from '../data/projects.js';

const PROJECTS = [
  {
    slug:           'mock-investment-platform',
    name:           'Mock Investment Platform',
    desc:           'Simulated forex and stock trading platform with real-time charting, virtual portfolio management, position sizing, and live P&L tracking.',
    tags:           ['PHP', 'Laravel', 'JavaScript', 'WebSockets'],
    category:       'platforms',
    href:           'https://github.com/mrwayne-dev',
    caseStudyReady: false,
    thumbnail:      '/assets/images/projects/investment.webp',
  },
  {
    slug:           'logistics-tracking',
    name:           'Logistics Tracking Platform',
    desc:           'End-to-end shipment tracking platform. Waybill generation, transit stage updates, driver assignment, and automated customer SMS notifications.',
    tags:           ['PHP', 'Laravel', 'MySQL', 'JavaScript'],
    category:       'platforms',
    href:           'https://github.com/mrwayne-dev',
    caseStudyReady: false,
    thumbnail:      '/assets/images/projects/logistics.webp',
  },
  {
    slug:           'escrow-payment-api',
    name:           'Escrow Payment API',
    desc:           'Payment escrow service. Funds held on behalf of transacting parties, conditional release on confirmation, dispute flagging, and Paystack integration.',
    tags:           ['PHP', 'Laravel', 'MySQL', 'Paystack'],
    category:       'web-apps',
    href:           'https://github.com/mrwayne-dev',
    caseStudyReady: false,
    thumbnail:      '/assets/images/projects/escrowlogo.webp',
  },
  {
    slug:           'webhook-tester',
    name:           'Webhook Tester',
    desc:           'Live webhook inspection tool. Generates temporary endpoints, captures incoming payloads in real time, and displays headers, body, and response codes.',
    tags:           ['PHP', 'Laravel', 'JavaScript', 'REST'],
    category:       'web-apps',
    href:           'https://github.com/mrwayne-dev',
    caseStudyReady: false,
    thumbnail:      '/assets/images/projects/webhook.webp',
  },
  {
    slug:           'sql-query-explainer',
    name:           'SQL Query Explainer',
    desc:           'Developer tool that parses a raw SQL query and returns a plain-English breakdown. Joins explained, filters described, and performance suggestions included.',
    tags:           ['PHP', 'MySQL', 'JavaScript', 'REST'],
    category:       'web-apps',
    href:           'https://github.com/mrwayne-dev',
    caseStudyReady: false,
    thumbnail:      '/assets/images/projects/sql.svg',
  },
  {
    slug:           'id-card-generator',
    name:           'NIIT ID System',
    desc:           'Web-based student ID card generation and verification system built for NIIT Port Harcourt. Admin dashboard, live card preview, QR verification, and PDF export via FPDF.',
    tags:           ['PHP', 'MySQL', 'FPDF', 'QR Code'],
    category:       'web-apps',
    href:           'https://github.com/mrwayne-dev',
    caseStudyReady: true,
    thumbnail:      '/assets/images/projects/ID%20card.webp',
  },
  {
    slug:           'niit-website',
    name:           'NIIT Port Harcourt Website',
    desc:           'Institutional website for NIIT Port Harcourt. Course listings, enrollment enquiry flow, and a content-managed news and announcements section.',
    tags:           ['PHP', 'JavaScript', 'CSS', 'HTML'],
    category:       'web-apps',
    href:           'https://niit.mgbah.dev',
    caseStudyReady: true,
    thumbnail:      '/assets/images/projects/niit.svg',
  },
  {
    slug:           'laravel-audit-trail',
    name:           'Laravel Audit Trail',
    desc:           'Drop-in Composer package that logs every Eloquent model mutation: who changed what, when, and from which IP. Fully queryable audit history.',
    tags:           ['PHP', 'Laravel', 'Composer', 'MySQL'],
    category:       'open-source',
    href:           'https://github.com/mrwayne-dev',
    caseStudyReady: false,
    thumbnail:      '/assets/images/projects/laravel-audit.svg',
  },
  {
    slug:           'php-response-formatter',
    name:           'PHP Response Formatter',
    desc:           'Composer package for standardising JSON API responses across Laravel apps. Consistent envelope structure, status codes, and error shapes out of the box.',
    tags:           ['PHP', 'Composer', 'Laravel', 'REST'],
    category:       'open-source',
    href:           'https://github.com/mrwayne-dev',
    caseStudyReady: false,
    thumbnail:      '/assets/images/projects/php-response.svg',
  },
  {
    slug:           'api-key-manager',
    name:           'Rate-Limited API Key Manager',
    desc:           'API key generation and management system with configurable per-client rate limiting, usage analytics, and key revocation.',
    tags:           ['PHP', 'Laravel', 'MySQL', 'REST'],
    category:       'open-source',
    href:           'https://github.com/mrwayne-dev',
    caseStudyReady: false,
    thumbnail:      '/assets/images/projects/rate-limited.svg',
  },
  {
    slug:           'web2stack',
    name:           'web2stack',
    desc:           'CLI tool that transpiles any website URL into clean, framework-native source code. Multi-framework output (React, Vue, Next.js, Laravel Blade), DOM-level extraction, and animation preservation.',
    tags:           ['Node.js', 'CLI', 'AI', 'Multi-Framework'],
    category:       'platforms',
    href:           'https://github.com/mrwayne-dev',
    caseStudyReady: false,
  },
  {
    slug:           'webstarter-cli',
    name:           'create-php-starter',
    desc:           'Unified PHP + Laravel scaffolding CLI (v2.0.0). Two modes — Custom PHP (Vanilla, MVC, API) and Laravel — with optional Docker, CI, testing, and named presets.',
    tags:           ['Node.js', 'CLI', 'npm', 'PHP'],
    category:       'open-source',
    href:           'https://www.npmjs.com/package/create-php-starter',
    caseStudyReady: true,
    thumbnail:      '/assets/images/projects/npm-create-php-starter.svg',
  },
];

const TABS = [
  { label: 'All',         value: 'all'         },
  { label: 'Platforms',   value: 'platforms'   },
  { label: 'Web Apps',    value: 'web-apps'    },
  { label: 'Open Source', value: 'open-source' },
  { label: 'Ready',       value: 'ready'       },
];

function cardHTML(project) {
  const tags = project.tags
    .map(t => `<span class="tag">${t}</span>`)
    .join('');

  const isBlurred = project.slug === 'web2stack';
  const isStarred = isBlurred || project.slug === 'webstarter-cli';

  const caseStudyLink = isBlurred
    ? `<span
        class="link-arrow link-arrow--muted"
        style="font-size: var(--text-xs); letter-spacing: 0.04em;"
        aria-label="Case study coming soon for ${project.name}"
      >Coming Soon</span>`
    : `<a
        href="/projects/${project.slug}"
        class="link-arrow"
        style="font-size: var(--text-xs); letter-spacing: 0.04em;"
        aria-label="View case study for ${project.name}"
      >View Case Study &rarr;</a>`;

  return `
    <article
      class="project-card fade-up"
      data-category="${project.category}"
      data-slug="${project.slug}"
      data-ready="${project.caseStudyReady}"
    >
      ${isStarred ? `<span class="project-card__star-badge" aria-label="Featured"><i class="ph ph-star" aria-hidden="true"></i></span>` : ''}
      <div class="project-card__image-wrap">
        ${project.thumbnail
          ? `<img src="${project.thumbnail}" alt="${project.name} thumbnail" loading="lazy" width="1280" height="720" class="${isBlurred ? 'project-card__placeholder--blurred' : ''}">`
          : `<div class="project-card__placeholder${isBlurred ? ' project-card__placeholder--blurred' : ''}" aria-hidden="true">${project.name}</div>`
        }
        ${isBlurred ? `<div class="project-card__image-overlay"><span class="project-card__wip-badge">In Development</span></div>` : ''}
      </div>
      <div class="project-card__body">
        <h3 class="project-card__name">${project.name}</h3>
        <p class="project-card__desc">${project.desc}</p>
        <div class="project-card__tags">${tags}</div>
        <div style="margin-top: var(--space-md);">
          ${caseStudyLink}
        </div>
      </div>
    </article>
  `;
}

function designCardHTML(design) {
  const tools = design.tools
    .map(t => `<span class="tag">${t}</span>`)
    .join('');

  const categoryPill = `<span class="tag">${design.category}</span>`;

  const label = design.linkLabel ?? 'View Case Study';
  const actionLink = `<a
      href="/designs/${design.slug}"
      class="link-arrow"
      style="font-size: var(--text-xs); letter-spacing: 0.04em;"
      aria-label="${label} for ${design.name}"
    >${label} &rarr;</a>`;

  return `
    <article class="project-card design-card fade-up" data-slug="${design.slug}">
      <div class="project-card__image-wrap design-card__image-wrap">
        ${design.thumbnail
          ? `<img src="${design.thumbnail}" alt="${design.name} thumbnail" loading="lazy" width="1280" height="720">`
          : `<div class="project-card__placeholder design-card__placeholder" aria-hidden="true">${design.name}</div>`
        }
      </div>
      <div class="project-card__body">
        <h3 class="project-card__name">${design.name}</h3>
        <p class="project-card__desc">${design.shortDesc}</p>
        <div class="project-card__tags">${categoryPill}${tools}</div>
        <div style="margin-top: var(--space-md);">
          ${actionLink}
        </div>
      </div>
    </article>
  `;
}

export function render() {
  const tabsHTML    = TABS.map(({ label, value }) => `
    <button
      class="filter-tab${value === 'all' ? ' is-active' : ''}"
      data-filter="${value}"
      aria-pressed="${value === 'all'}"
    >${label}</button>
  `).join('');

  const cardsHTML   = PROJECTS.map(cardHTML).join('');
  const designsHTML = DESIGNS_DATA.filter(d => d.showOnProjects !== false).map(designCardHTML).join('');

  return `
    <section class="page-container" aria-label="Projects">

      <!-- Header -->
      <header style="padding-top: var(--space-xl); margin-bottom: var(--space-xl);">
        <p class="section-label fade-in">• Selected Work</p>
        <h1
          style="font-size: clamp(var(--text-2xl), 5vw, var(--text-4xl));
                 letter-spacing: -0.03em; line-height: 1.05; margin-bottom: var(--space-md);"
          class="fade-up"
        >Things I&rsquo;ve built</h1>
        <p
          style="font-size: var(--text-base); color: var(--color-text-muted); max-width: 520px;"
          class="fade-up"
        >
          Five years of building. Twelve projects worth showing.
        </p>
      </header>

      <!-- Filter tabs -->
      <div class="filter-tabs" role="group" aria-label="Filter projects by category">
        ${tabsHTML}
      </div>

      <!-- Project grid -->
      <div class="project-grid" id="project-grid">
        ${cardsHTML}
      </div>

      <!-- Designs section -->
      <header style="margin-top: var(--space-2xl); margin-bottom: var(--space-xl);">
        <p class="section-label fade-in">• Design Work</p>
        <h2
          style="font-size: clamp(var(--text-2xl), 5vw, var(--text-4xl));
                 letter-spacing: -0.03em; line-height: 1.05; margin-bottom: var(--space-md);"
          class="fade-up"
        >Things I&rsquo;ve designed</h2>
        <p
          style="font-size: var(--text-base); color: var(--color-text-muted); max-width: 520px;"
          class="fade-up"
        >
          UI/UX and brand design work. The visual side of what I build.
        </p>
      </header>

      <div class="project-grid" id="design-grid">
        ${designsHTML}
      </div>

    </section>
  `;
}

export function init() {
  // ── Filter logic ────────────────────────────────────────────────────────
  const tabs  = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.project-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const filter = tab.dataset.filter;

      tabs.forEach(t => {
        t.classList.remove('is-active');
        t.setAttribute('aria-pressed', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-pressed', 'true');

      // Only filter dev projects, not design cards
      cards.forEach(card => {
        if (card.classList.contains('design-card')) return;
        let matches;
        if (filter === 'ready') {
          matches = card.dataset.ready === 'true';
        } else {
          matches = filter === 'all' || card.dataset.category === filter;
        }
        card.classList.toggle('project-card--hidden', !matches);
      });
    });
  });

  // ── Scroll entrance animations ───────────────────────────────────────────
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
  );

  document.querySelectorAll(
    '#project-grid .fade-up, #design-grid .fade-up, .page-container .fade-in'
  ).forEach(el => observer.observe(el));
}

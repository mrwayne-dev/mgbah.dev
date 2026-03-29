/**
 * projects.js — Projects page
 * Sections: Header → Filter tabs → Project grid → Designs section
 * Filter: CSS class toggle on .project-card--hidden, no DOM removal
 */

const PROJECTS = [
  {
    slug:     'lymora-learn',
    name:     'Lymora Learn',
    desc:     'AI exam prep platform analysing 10+ years of past questions.',
    tags:     ['PHP', 'JavaScript', 'MySQL', 'AI'],
    category: 'platforms',
    href:     '/lymora',
  },
  {
    slug:     'lymora-housing',
    name:     'Lymora Student Housing',
    desc:     'Verified student accommodation marketplace with escrow payments.',
    tags:     ['PHP', 'MySQL', 'JavaScript'],
    category: 'platforms',
    href:     '/lymora',
  },
  {
    slug:     'mgbah-dev',
    name:     'mgbah.dev',
    desc:     'This portfolio — vanilla SPA in PHP, pure CSS, zero frameworks.',
    tags:     ['PHP', 'CSS', 'Vanilla JS'],
    category: 'web-apps',
    href:     '/',
  },
  {
    slug:     'school-api',
    name:     'School Management API',
    desc:     'RESTful API powering student records, timetables, and fee tracking.',
    tags:     ['PHP', 'MySQL', 'REST'],
    category: 'web-apps',
    href:     '#',
  },
  {
    slug:     'cli-tools',
    name:     'Dev CLI Toolkit',
    desc:     'A collection of shell utilities for automating PHP project scaffolding.',
    tags:     ['Bash', 'PHP', 'CLI'],
    category: 'open-source',
    href:     '#',
  },
  {
    slug:     'php-router',
    name:     'Lightweight PHP Router',
    desc:     'Zero-dependency PHP router with middleware support and named routes.',
    tags:     ['PHP', 'Open Source'],
    category: 'open-source',
    href:     '#',
  },
];

const DESIGNS = [
  {
    slug:  'lymora-brand',
    name:  'Lymora Brand Identity',
    desc:  'Logo, colour system, and typography for Lymora\'s suite of student products.',
    tools: ['Figma'],
    href:  '#',
  },
  {
    slug:  'lymora-learn-ui',
    name:  'Lymora Learn — UI Design',
    desc:  'End-to-end UI for the exam prep app: onboarding, question flow, and results.',
    tools: ['Figma'],
    href:  '#',
  },
  {
    slug:  'mgbah-portfolio-ui',
    name:  'mgbah.dev — Portfolio Design',
    desc:  'Full design system and page layouts for this portfolio before it was built.',
    tools: ['Figma'],
    href:  '#',
  },
];

const TABS = [
  { label: 'All',         value: 'all'         },
  { label: 'Web Apps',    value: 'web-apps'    },
  { label: 'Platforms',   value: 'platforms'   },
  { label: 'Open Source', value: 'open-source' },
];

function cardHTML(project) {
  const tags = project.tags
    .map(t => `<span class="tag">${t}</span>`)
    .join('');

  return `
    <article
      class="project-card fade-up"
      data-category="${project.category}"
      data-slug="${project.slug}"
    >
      <div class="project-card__image-wrap">
        <div class="project-card__placeholder" aria-hidden="true">
          ${project.name}
        </div>
      </div>
      <div class="project-card__body">
        <h3 class="project-card__name">${project.name}</h3>
        <p class="project-card__desc">${project.desc}</p>
        <div class="project-card__tags">${tags}</div>
        <div style="margin-top: var(--space-md);">
          <a
            href="${project.href}"
            class="link-arrow"
            style="font-size: var(--text-xs); letter-spacing: 0.04em;"
            aria-label="View case study for ${project.name}"
          >View Case Study &rarr;</a>
        </div>
      </div>
    </article>
  `;
}

function designCardHTML(design) {
  const tools = design.tools
    .map(t => `<span class="tag">${t}</span>`)
    .join('');

  return `
    <article class="project-card design-card fade-up" data-slug="${design.slug}">
      <div class="project-card__image-wrap design-card__image-wrap">
        <div class="project-card__placeholder design-card__placeholder" aria-hidden="true">
          ${design.name}
        </div>
      </div>
      <div class="project-card__body">
        <h3 class="project-card__name">${design.name}</h3>
        <p class="project-card__desc">${design.desc}</p>
        <div class="project-card__tags">${tools}</div>
        <div style="margin-top: var(--space-md);">
          <a
            href="${design.href}"
            class="link-arrow"
            style="font-size: var(--text-xs); letter-spacing: 0.04em;"
            aria-label="View design for ${design.name}"
          >View Design &rarr;</a>
        </div>
      </div>
    </article>
  `;
}

export function render() {
  const tabsHTML   = TABS.map(({ label, value }) => `
    <button
      class="filter-tab${value === 'all' ? ' is-active' : ''}"
      data-filter="${value}"
      aria-pressed="${value === 'all'}"
    >${label}</button>
  `).join('');

  const cardsHTML  = PROJECTS.map(cardHTML).join('');
  const designsHTML = DESIGNS.map(designCardHTML).join('');

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
          Six years of building. These are the ones worth showing.
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
          UI/UX and brand design work — the visual side of what I build.
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
        const matches = filter === 'all' || card.dataset.category === filter;
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

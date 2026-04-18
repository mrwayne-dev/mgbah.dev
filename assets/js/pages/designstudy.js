/**
 * designstudy.js — Design case study page (editorial layout)
 * Reusable page module — receives a slug, looks up from DESIGNS_DATA,
 * renders the editorial case study layout for all design projects.
 *
 * Layout: Back nav → Hero → Full-width hero image → Pull quote (brief)
 *         → Image duo → Vertical process timeline → Outcome card
 *         → Tools → Next Design
 *
 * render(slug) — returns HTML string
 * init(slug)   — wires interactivity and scroll animations
 */

import { DESIGNS_DATA } from '../data/projects.js';

// ── Helpers ─────────────────────────────────────────────────────────────────

function imageSlot(src, name, cls) {
  if (!src) {
    return `<div class="${cls}"><div class="ds-img-placeholder">${name}</div></div>`;
  }
  return `
    <div class="${cls}">
      <img
        src="${src}"
        class="ds-img"
        alt="${name}"
        loading="lazy"
        width="1600"
        height="900"
        onerror="this.style.display='none';this.nextElementSibling.removeAttribute('hidden')"
      >
      <div class="ds-img-placeholder" hidden>${name}</div>
    </div>
  `;
}

function notFound(slug) {
  return `
    <section class="page-container" style="padding-top: 160px; text-align: center;">
      <p class="text-muted" style="font-size: var(--text-sm); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: var(--space-md);">404</p>
      <h1 style="font-size: var(--text-2xl); margin-bottom: var(--space-md);">Design not found</h1>
      <p class="text-muted" style="margin-bottom: var(--space-lg);">No design with slug <code>${slug}</code></p>
      <a href="/projects" style="color: var(--color-text); text-decoration: underline; text-underline-offset: 4px;">Back to projects</a>
    </section>
  `;
}

// ── Render ───────────────────────────────────────────────────────────────────

export function render(slug) {
  const design = DESIGNS_DATA.find(d => d.slug === slug);
  if (!design) return notFound(slug);

  const { name, shortDesc, year, client, category, tools, brief, process, outcome, images, href } = design;

  // Category label
  const categoryLabels = {
    'motion':      'Motion',
    'branding':    'Branding',
    'print':       'Print',
    'ui-ux':       'UI/UX',
    'graphics-ui': 'Graphics & UI',
  };
  const categoryLabel = categoryLabels[category] ?? (category.charAt(0).toUpperCase() + category.slice(1).replace('-', '/'));

  // Process timeline
  const timelineItems = process.map((p, i) => `
    <li class="ds-timeline__item fade-up">
      <span class="ds-timeline__num">${String(i + 1).padStart(2, '0')}</span>
      <div>
        <p class="ds-timeline__title">${p.phase}</p>
        <p class="ds-timeline__desc">${p.desc}</p>
      </div>
    </li>
  `).join('');

  // Tools pills
  const toolPills = tools.map(t => `<span class="tag">${t}</span>`).join('');

  // Next design (cycles)
  const currentIndex = DESIGNS_DATA.findIndex(d => d.slug === slug);
  const nextDesign = DESIGNS_DATA[(currentIndex + 1) % DESIGNS_DATA.length];

  return `
    <article class="page-container cs-page cs-page--${slug}" aria-label="${name} Design Case Study">

      <!-- ===== BACK NAV ===== -->
      <a href="/projects" class="cs-back">
        <i class="ph ph-arrow-left" aria-hidden="true"></i>
        All Projects
      </a>

      <!-- ===== HERO ===== -->
      <div class="cs-hero fade-up">
        <h1 class="cs-hero__name">${name}</h1>
        <p class="cs-hero__desc">${shortDesc}</p>
        <div class="cs-meta-strip">
          <span class="cs-meta-chip">${year}</span>
          <span class="cs-meta-chip">${categoryLabel}</span>
          <span class="cs-meta-chip">${client}</span>
        </div>
        <div class="cs-hero__links">
          ${href
            ? `<a href="${href}" class="btn btn-primary" target="_blank" rel="noopener">View Design &rarr;</a>`
            : `<span class="btn btn-primary" style="opacity:0.35;cursor:default;" aria-disabled="true">View Design &rarr;</span>`
          }
        </div>
      </div>

      <!-- ===== HERO IMAGE (full width) ===== -->
      ${images[0] ? `
      <div class="ds-hero-image fade-in">
        ${imageSlot(images[0], name, 'ds-hero-image__inner')}
      </div>` : ''}

      <!-- ===== PULL QUOTE (brief) ===== -->
      <blockquote class="ds-pull-quote fade-up">
        <p class="ds-pull-quote__text">&ldquo;${brief}&rdquo;</p>
      </blockquote>

      <!-- ===== IMAGE DUO ===== -->
      ${images.length >= 2 ? `
      <div class="ds-image-duo fade-up">
        ${imageSlot(images[1], name, 'ds-image-duo__slot')}
        ${images[2]
          ? imageSlot(images[2], name, 'ds-image-duo__slot')
          : `<div class="ds-image-duo__slot"><div class="ds-img-placeholder" aria-hidden="true">${name}</div></div>`
        }
      </div>` : ''}

      <!-- ===== PROCESS TIMELINE ===== -->
      <div class="ds-process">
        <p class="section-label fade-in">&bull; Process</p>
        <ol class="ds-timeline">
          ${timelineItems}
        </ol>
      </div>

      <!-- ===== OUTCOME CARD ===== -->
      <div class="ds-outcome-card fade-up">
        <p class="section-label">&bull; The Result</p>
        <p>${outcome}</p>
      </div>

      <!-- ===== TOOLS ===== -->
      <div class="ds-tools fade-up">
        <p class="section-label">&bull; Tools</p>
        <div class="project-card__tags" style="margin-top: var(--space-md);">
          ${toolPills}
        </div>
      </div>

      <!-- ===== NEXT DESIGN ===== -->
      <a href="/designs/${nextDesign.slug}" class="ds-next">
        <div>
          <p class="ds-next__label">Next Design</p>
          <p class="ds-next__name">${nextDesign.name}</p>
        </div>
        <span class="ds-next__arrow" aria-hidden="true">&rarr;</span>
      </a>

    </article>
  `;
}

// ── Init ─────────────────────────────────────────────────────────────────────

export function init(slug) {
  const design = DESIGNS_DATA.find(d => d.slug === slug);
  if (design) {
    document.title = `${design.name} | Michael Mgbah`;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
  );
  document.querySelectorAll('.cs-page .fade-up, .cs-page .fade-in').forEach(el => observer.observe(el));
}

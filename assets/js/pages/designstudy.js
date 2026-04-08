/**
 * designstudy.js — Design case study page
 * Reusable page module — receives a slug, looks up from DESIGNS_DATA,
 * renders the full design case study layout for all designs.
 * Designs with caseStudyReady: false show an "In Development" notice and
 * a modal trigger button.
 *
 * render(slug) — returns HTML string
 * init(slug)   — wires interactivity and scroll animations
 */

import { DESIGNS_DATA } from '../data/projects.js';

// ── Helpers ─────────────────────────────────────────────────────────────────

function gallerySlot(src, name, cls) {
  return `
    <div class="${cls}">
      <img
        src="${src}"
        class="cs-gallery__img"
        alt="${name}"
        loading="lazy"
        onerror="this.style.display='none';this.nextElementSibling.removeAttribute('hidden')"
      >
      <div class="cs-gallery__placeholder" hidden>${name}</div>
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

  const { name, shortDesc, year, client, category, tools, brief, process, outcome, images, href, caseStudyReady } = design;

  const metaChips = [year, client, category, tools.join(', ')]
    .map(val => `<span class="cs-meta-chip">${val}</span>`)
    .join('');

  const ctaLinks = [
    href ? `<a href="${href}" class="btn btn-primary" target="_blank" rel="noopener">View Design &rarr;</a>` : '',
    !caseStudyReady ? `<button class="btn btn-ghost cs-dev-modal-trigger">View Live &nearr;</button>` : '',
  ].filter(Boolean).join('');

  // Process phases
  const phasesHTML = process.map((p, i) => `
    <div class="ds-phase fade-up">
      <span class="ds-phase__num">${String(i + 1).padStart(2, '0')}</span>
      <p class="ds-phase__title">${p.phase}</p>
      <p class="ds-phase__desc">${p.desc}</p>
    </div>
  `).join('');

  // Tools pills
  const toolPills = tools.map(t => `<span class="tag">${t}</span>`).join('');

  // Next design
  const currentIndex = DESIGNS_DATA.findIndex(d => d.slug === slug);
  const nextDesign = DESIGNS_DATA[(currentIndex + 1) % DESIGNS_DATA.length];

  return `
    <article class="page-container cs-page" aria-label="${name} Design Case Study">

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
          ${metaChips}
        </div>
        ${ctaLinks ? `<div class="cs-hero__links">${ctaLinks}</div>` : ''}
      </div>

      <!-- ===== IN DEVELOPMENT NOTICE ===== -->
      ${!caseStudyReady ? `
      <div class="cs-dev-notice fade-up">
        <i class="ph ph-wrench" aria-hidden="true"></i>
        This design work is currently in progress. What you&rsquo;re seeing reflects work in progress.
      </div>
      ` : ''}

      <!-- ===== IMAGE GALLERY ===== -->
      <div class="cs-gallery fade-in">
        ${gallerySlot(images[0], name, 'cs-gallery__main')}
        ${gallerySlot(images[1], name, 'cs-gallery__secondary')}
        ${gallerySlot(images[2], name, 'cs-gallery__secondary')}
      </div>

      <!-- ===== BRIEF + OUTCOME ===== -->
      <div class="ds-brief-outcome">
        <div class="ds-brief">
          <p class="section-label fade-in">• The Brief</p>
          <p class="fade-up">${brief}</p>
        </div>
        <div class="ds-outcome">
          <p class="section-label fade-in">• How It Was Delivered</p>
          <p class="fade-up">${outcome}</p>
        </div>
      </div>

      <!-- ===== PROCESS ===== -->
      <div class="ds-process">
        <p class="section-label fade-in">• Process</p>
        <div class="ds-process__timeline">
          ${phasesHTML}
        </div>
      </div>

      <!-- ===== TOOLS ===== -->
      <div class="ds-tools">
        <p class="section-label fade-in">• Tools</p>
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

function initComingSoon() {
  document.querySelector('.cs-dev-modal-trigger')
    ?.addEventListener('click', () => window.openDevModal?.());
}

export function init(slug) {
  const design = DESIGNS_DATA.find(d => d.slug === slug);
  if (design) {
    document.title = `${design.name} | Michael Mgbah`;
  }

  // Scroll entrance animations
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

  // Wire modal trigger for in-development designs
  if (!design || !design.caseStudyReady) {
    initComingSoon();
  }
}

/**
 * casestudy.js — Project case study page
 * Reusable page module — receives a slug, looks up from PROJECTS_DATA,
 * renders the full case study layout.
 *
 * render(slug) — returns HTML string
 * init(slug)   — wires interactivity and scroll animations
 */

import { PROJECTS_DATA } from '../data/projects.js';

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

function pad(n) {
  return String(n).padStart(2, '0');
}

function notFound(slug) {
  return `
    <section class="page-container" style="padding-top: 160px; text-align: center;">
      <p class="text-muted" style="font-size: var(--text-sm); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: var(--space-md);">404</p>
      <h1 style="font-size: var(--text-2xl); margin-bottom: var(--space-md);">Project not found</h1>
      <p class="text-muted" style="margin-bottom: var(--space-lg);">No project with slug <code>${slug}</code></p>
      <a href="/projects" style="color: var(--color-text); text-decoration: underline; text-underline-offset: 4px;">Back to projects</a>
    </section>
  `;
}

// ── Render ───────────────────────────────────────────────────────────────────

export function render(slug) {
  const project = PROJECTS_DATA.find(p => p.slug === slug);
  if (!project) return notFound(slug);

  const { name, shortDesc, year, category, status, role, overview, problem, features, challenges, stack, images, links } = project;

  // Meta chips
  const metaChips = [year, category, status, role]
    .map(val => `<span class="cs-meta-chip">${val}</span>`)
    .join('');

  // CTA buttons
  const ctaLinks = [
    links.live   ? `<a href="${links.live}"   class="btn btn-primary"  target="_blank" rel="noopener">View Live &rarr;</a>` : '',
    links.github ? `<a href="${links.github}" class="btn btn-ghost"    target="_blank" rel="noopener">GitHub &rarr;</a>`    : '',
    links.docs   ? `<a href="${links.docs}"   class="btn btn-ghost"    target="_blank" rel="noopener">Docs &rarr;</a>`      : '',
  ].filter(Boolean).join('');

  // Stack groups
  const stackGroups = [
    { label: 'Backend',  items: stack.backend  },
    { label: 'Database', items: stack.database },
    { label: 'Frontend', items: stack.frontend },
    { label: 'Tools',    items: stack.tools    },
  ]
    .filter(g => g.items && g.items.length > 0)
    .map(g => `
      <div class="cs-stack__group">
        <p class="cs-stack__label">${g.label}</p>
        <div class="cs-stack__pills">
          ${g.items.map(t => `<span class="skill-pill">${t}</span>`).join('')}
        </div>
      </div>
    `).join('');

  // Feature cards
  const featureCards = features.map((f, i) => `
    <div class="cs-feature-card fade-up">
      <span class="cs-feature-card__num">${pad(i + 1)}</span>
      <p class="cs-feature-card__title">${f.title}</p>
      <p class="cs-feature-card__desc">${f.desc}</p>
    </div>
  `).join('');

  // Challenge items
  const challengeItems = challenges.map(c => `
    <div class="cs-challenge-item fade-up">
      <div>
        <p class="cs-challenge__label">Problem</p>
        <p class="cs-challenge__prob">${c.problem}</p>
      </div>
      <div>
        <p class="cs-challenge__label">Solution</p>
        <p class="cs-challenge__sol">${c.solution}</p>
      </div>
    </div>
  `).join('');

  return `
    <article class="page-container cs-page" aria-label="${name} — Case Study">

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
      ${!project.caseStudyReady ? `
      <div class="cs-dev-notice fade-up">
        <i class="ph ph-wrench" aria-hidden="true"></i>
        This project is currently in development. What you&rsquo;re reading reflects work in progress.
      </div>
      ` : ''}

      <!-- ===== IMAGE GALLERY ===== -->
      <div class="cs-gallery fade-in">
        ${gallerySlot(images[0], name, 'cs-gallery__main')}
        ${gallerySlot(images[1], name, 'cs-gallery__secondary')}
        ${gallerySlot(images[2], name, 'cs-gallery__secondary')}
      </div>

      <!-- ===== OVERVIEW + PROBLEM ===== -->
      <div class="cs-overview">
        <div>
          <p class="section-label fade-in">• Overview</p>
          <p class="cs-overview__text fade-up">${overview}</p>
        </div>
        <div class="cs-problem-card fade-up">
          <p class="section-label">• The Problem</p>
          <p>${problem}</p>
        </div>
      </div>

      <!-- ===== STACK ===== -->
      <div class="cs-stack fade-up">
        <p class="section-label">• Stack</p>
        <div class="cs-stack__groups">
          ${stackGroups}
        </div>
      </div>

      <!-- ===== KEY FEATURES ===== -->
      <div class="cs-features">
        <p class="section-label fade-in">• What it does</p>
        <div class="cs-features__grid">
          ${featureCards}
        </div>
      </div>

      <!-- ===== CHALLENGES ===== -->
      <div class="cs-challenges">
        <p class="section-label fade-in">• How it was built</p>
        ${challengeItems}
      </div>

    </article>
  `;
}

// ── Init ─────────────────────────────────────────────────────────────────────

export function init(slug) {
  // Update document title with actual project name
  const project = PROJECTS_DATA.find(p => p.slug === slug);
  if (project) {
    document.title = `${project.name} — Michael Mgbah`;
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
}

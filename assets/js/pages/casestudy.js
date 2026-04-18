/**
 * casestudy.js — Project case study page
 * Reusable page module — receives a slug, looks up from PROJECTS_DATA,
 * renders the full case study layout for all projects.
 * Projects with caseStudyReady: false show an "In Development" notice and
 * a modal trigger button instead of a live link.
 *
 * render(slug) — returns HTML string
 * init(slug)   — wires interactivity and scroll animations
 */

import { PROJECTS_DATA } from '../data/projects.js';

const CATEGORY_LABELS = {
  'platforms':   'Platforms',
  'web-apps':    'Web Apps',
  'open-source': 'Open Source',
};

// ── Helpers ─────────────────────────────────────────────────────────────────

function projectImage(src, name) {
  return `
    <img
      src="${src}"
      class="cs-carousel__img"
      alt="${name}"
      loading="lazy"
      width="1600"
      height="900"
      onerror="this.style.display='none';this.nextElementSibling.removeAttribute('hidden')"
    >
    <div class="cs-carousel__placeholder" hidden>${name}</div>
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

function codeBlock(code) {
  return `
    <div class="cs-code-block">
      <code>${code}</code>
      <button class="cs-code-copy" aria-label="Copy code">
        <i class="ph ph-copy"></i>
      </button>
    </div>
  `;
}

// ── Render ───────────────────────────────────────────────────────────────────

export function render(slug) {
  const project = PROJECTS_DATA.find(p => p.slug === slug);
  if (!project) return notFound(slug);

  const { name, shortDesc, year, category, status, role, overview, problem, features, challenges, stack, images, links, howToUse, caseStudyReady } = project;

  // Pad features to exactly 6
  const paddedFeatures = features.slice(0, 6);
  while (paddedFeatures.length < 6) {
    paddedFeatures.push({ title: 'In Progress', desc: 'This feature is currently being built.' });
  }

  // Meta chips
  const categoryLabel = CATEGORY_LABELS[category] || category;
  const metaChips = [year, categoryLabel, status, role]
    .map(val => `<span class="cs-meta-chip">${val}</span>`)
    .join('');

  // CTA buttons — for in-development projects, add a modal trigger instead of/alongside live link
  const ctaLinks = [
    links.live   ? `<a href="${links.live}"   class="btn btn-primary"  target="_blank" rel="noopener">View Live &rarr;</a>` : '',
    links.github ? `<a href="${links.github}" class="btn btn-ghost"    target="_blank" rel="noopener">GitHub &rarr;</a>`    : '',
    links.docs   ? `<a href="${links.docs}"   class="btn btn-ghost"    target="_blank" rel="noopener">Docs &rarr;</a>`      : '',
    !caseStudyReady ? `<button class="btn btn-ghost cs-dev-modal-trigger">View Live &nearr;</button>` : '',
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

  // Feature cards (always 6)
  const featureCards = paddedFeatures.map((f, i) => `
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

  // How to Use heading
  const howToUseHeading = category === 'open-source'
    ? 'Get it running.'
    : category === 'platforms'
      ? 'How it works.'
      : 'Using the API.';

  // How to Use section
  const installBlock = howToUse && howToUse.install
    ? `
      <div class="cs-install-block fade-up">
        <p class="cs-install-block__label">Install</p>
        ${codeBlock(howToUse.install)}
      </div>
    ` : '';

  const stepsHTML = howToUse && howToUse.steps
    ? `
      <ol class="cs-steps">
        ${howToUse.steps.map(step => `
          <li class="cs-step fade-up">
            <div class="cs-step__header">
              <span class="cs-step__num">${step.step}</span>
              <h3 class="cs-step__title">${step.title}</h3>
            </div>
            <p class="cs-step__desc">${step.desc}</p>
            ${step.code ? codeBlock(step.code) : ''}
          </li>
        `).join('')}
      </ol>
    ` : '';

  const currentIndex = PROJECTS_DATA.findIndex(p => p.slug === slug);
  const nextProject  = PROJECTS_DATA[(currentIndex + 1) % PROJECTS_DATA.length];
  const nextProjectNav = `
    <!-- ===== NEXT PROJECT ===== -->
    <a href="/projects/${nextProject.slug}" class="ds-next">
      <div>
        <p class="ds-next__label">Next Project</p>
        <p class="ds-next__name">${nextProject.name}</p>
      </div>
      <span class="ds-next__arrow" aria-hidden="true">&rarr;</span>
    </a>
  `;

  const html = `
    <article class="page-container cs-page" aria-label="${name} Case Study">

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
        This project is currently in development. What you&rsquo;re reading reflects work in progress.
      </div>
      ` : ''}

      <!-- ===== IMAGE ===== -->
      ${!caseStudyReady ? `
      <div class="cs-gallery-blur-wrap">
        <div class="cs-carousel cs-carousel--blurred fade-in">
          ${projectImage(images[0], name)}
        </div>
        <div class="cs-gallery-wip-overlay">
          <span class="cs-gallery-wip-badge">Alfred's gonna upload these soon!</span>
        </div>
      </div>
      ` : `
      <div class="cs-carousel fade-in">
        ${projectImage(images[0], name)}
      </div>
      `}

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

      <!-- ===== HOW TO USE ===== -->
      ${howToUse ? `
      <section class="cs-how-to-use" aria-label="How to use">
        <p class="section-label fade-up">• How to Use</p>
        <h2 class="cs-section-heading fade-up">${howToUseHeading}</h2>
        ${installBlock}
        ${stepsHTML}
      </section>
      ` : ''}

      ${nextProjectNav}

    </article>
  `;

  if (slug === 'web2stack') {
    return `
      <div class="cs-locked-wrap">
        <div class="cs-page--locked" aria-hidden="true">${html}</div>
        <div class="cs-locked-overlay" role="status" aria-label="Coming soon">
          <p class="cs-locked-badge">Coming Soon</p>
          <p class="cs-locked-hint">The Batcave isn&rsquo;t open yet.</p>
        </div>
      </div>
      <div class="page-container" style="padding-top: 0; padding-bottom: 0;">
        ${nextProjectNav}
      </div>
    `;
  }

  return html;
}

// ── Init ─────────────────────────────────────────────────────────────────────

function initComingSoon() {
  document.querySelector('.cs-dev-modal-trigger')
    ?.addEventListener('click', () => window.openDevModal?.());
}

function wireCopyButtons() {
  document.querySelectorAll('.cs-code-copy').forEach(btn => {
    btn.addEventListener('click', async () => {
      const codeEl = btn.previousElementSibling;
      const text = codeEl?.textContent?.trim();
      if (!text) return;
      try {
        await navigator.clipboard.writeText(text);
        const icon = btn.querySelector('i');
        if (icon) {
          icon.className = 'ph ph-check';
          setTimeout(() => { icon.className = 'ph ph-copy'; }, 1500);
        }
      } catch (_) {
        // clipboard unavailable — silent fail
      }
    });
  });
}

export function init(slug) {
  const project = PROJECTS_DATA.find(p => p.slug === slug);
  if (project) {
    document.title = `${project.name} | Michael Mgbah`;
  }

  // Scroll entrance animations (shared across full and coming-soon)
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

  // Wire modal trigger for in-development projects
  if (!project || !project.caseStudyReady) {
    initComingSoon();
  }

  // Wire copy buttons for all projects (How to Use section)
  wireCopyButtons();
}

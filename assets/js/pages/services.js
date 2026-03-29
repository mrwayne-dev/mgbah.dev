/**
 * services.js — Services page
 * Sections: Page header → Services grid → Process → CTA
 */

const SERVICES = [
  {
    icon: 'ph-code',
    title: 'Backend Development',
    desc: 'Clean, performant server-side applications built with PHP and Node.js. REST APIs, authentication systems, background jobs, and everything in between.',
    tags: ['PHP', 'Laravel', 'Node.js', 'REST APIs'],
  },
  {
    icon: 'ph-plugs-connected',
    title: 'API Design & Integration',
    desc: 'Well-documented, versioned APIs that your frontend team will actually enjoy using. Third-party integrations with payment gateways, messaging services, and external data sources.',
    tags: ['REST', 'Webhooks', 'OAuth', 'Paystack'],
  },
  {
    icon: 'ph-database',
    title: 'Database Architecture',
    desc: 'Schema design, query optimisation, and migration strategies for MySQL and PostgreSQL. Turning slow queries into sub-100ms operations.',
    tags: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis'],
  },
  {
    icon: 'ph-rocket-launch',
    title: 'MVP Development',
    desc: 'Full-stack product builds for founders who need to move fast. From idea to live product in 4–8 weeks — scoped carefully, built properly.',
    tags: ['Full-stack', 'Product', 'Launch', 'PHP + JS'],
  },
  {
    icon: 'ph-chalkboard-teacher',
    title: 'Technical Consulting',
    desc: 'Code reviews, architecture audits, and engineering advice for teams who want a second opinion before committing to a technical direction.',
    tags: ['Architecture', 'Code Review', 'Strategy'],
  },
  {
    icon: 'ph-pen-nib',
    title: 'Graphic Design & Video Editing',
    desc: 'Brand identity, visual assets, and motion content. Photoshop, Illustrator, and video editing — a secondary skill that sharpens how I think about the products I build.',
    tags: ['Photoshop', 'Illustrator', 'Video Editing', 'Branding'],
  },
];

const PROCESS = [
  { num: '01', title: 'Discover', desc: 'We talk through your problem, goals, and constraints. I ask the uncomfortable questions early.' },
  { num: '02', title: 'Design',   desc: 'I map out the architecture, data model, and API contracts before writing a single line of code.' },
  { num: '03', title: 'Build',    desc: 'Iterative development with regular check-ins. You always know where things stand.' },
  { num: '04', title: 'Ship',     desc: 'Deployment, documentation, and handoff. I don\'t disappear after launch.' },
];

// ── Template helpers ────────────────────────────────────────────────────────

function serviceCard({ icon, title, desc, tags }) {
  const tagHTML = tags.map(t => `<span class="tag">${t}</span>`).join('');
  return `
    <div class="service-card fade-up">
      <div class="service-card__icon">
        <i class="ph ${icon}"></i>
      </div>
      <h3 class="service-card__title">${title}</h3>
      <p class="service-card__desc">${desc}</p>
      <div class="service-card__tags">${tagHTML}</div>
    </div>
  `;
}

function processStep({ num, title, desc }) {
  return `
    <div class="process-step fade-up">
      <span class="process-step__num">${num}</span>
      <h3 class="process-step__title">${title}</h3>
      <p class="process-step__desc">${desc}</p>
    </div>
  `;
}

// ── Render ──────────────────────────────────────────────────────────────────

export function render() {
  return `
    <section class="page-container" aria-label="Services">

      <!-- Header -->
      <header style="padding-top: var(--space-xl); margin-bottom: var(--space-xl);">
        <p class="section-label fade-in">• Services</p>
        <h1
          style="font-size: clamp(var(--text-2xl), 5vw, var(--text-4xl));
                 letter-spacing: -0.03em; line-height: 1.05; margin-bottom: var(--space-md);"
          class="fade-up"
        >What I build <span class="text-muted">for you</span></h1>
        <p
          style="font-size: var(--text-base); color: var(--color-text-muted); max-width: 520px;"
          class="fade-up"
        >
          Backend engineering, product development, and creative work — done properly.
          I specialise in PHP and JavaScript stacks, with a secondary eye for design.
        </p>
      </header>

      <!-- ===== SERVICES GRID ===== -->
      <section class="section" aria-label="Services">
        <div class="services-grid">
          ${SERVICES.map(serviceCard).join('')}
        </div>
      </section>

      <!-- ===== PROCESS ===== -->
      <section class="section" aria-label="Process">
        <p class="section-label fade-in">• How it works</p>
        <h2 class="section-h2 fade-up">
          A process that <span class="text-muted">actually works</span>
        </h2>
        <div class="process-grid">
          ${PROCESS.map(processStep).join('')}
        </div>
      </section>

      <!-- ===== CTA ===== -->
      <section class="cta-banner-section" aria-label="Call to action">
        <div class="cta-banner fade-up">
          <div class="cta-banner__content">
            <h2 class="cta-banner__heading">Let&rsquo;s talk.</h2>
            <p class="cta-banner__sub">30 minutes. I&rsquo;ll tell you exactly what I&rsquo;d build and how long it would take.</p>
            <button
              class="btn btn-primary"
              data-cal-namespace="30min"
              data-cal-link="mgbah/30min"
              data-cal-config='{"theme":"dark"}'
              aria-label="Book a 30-minute call with Michael"
            >Book a Call</button>
          </div>
        </div>
      </section>

    </section>
  `;
}

// ── Init ────────────────────────────────────────────────────────────────────

export function init() {
  if (typeof Cal !== 'undefined' && Cal.ns?.['30min']) {
    Cal.ns['30min']('ui', { theme: 'dark', hideEventTypeDetails: false, layout: 'month_view' });
  }
}

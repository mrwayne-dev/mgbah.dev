/**
 * about.js — About page
 * Sections: Header → Two-column (bio/skills/exp + portrait) →
 *           Philosophy → Stats → What I Bring → Companies → CTA
 * Experience rows open role-detail modals (bottom drawer on mobile).
 */

const SKILLS_PRIMARY = [
  'PHP', 'Laravel', 'JavaScript', 'MySQL', 'PostgreSQL',
  'REST APIs', 'Git', 'Linux',
];

const SKILLS_SECONDARY = [
  'React', 'Node.js', 'MongoDB', 'Docker',
  'Photoshop', 'Illustrator',
];

const EXPERIENCE = [
  { role: 'Freelance Developer',       company: 'Freelance',          year: '2019 — Present',        key: 'freelance'      },
  { role: 'Freelance Graphic Designer', company: 'Freelance',          year: '2021 — Present',        key: 'graphic-design' },
  { role: 'CEO & Lead Engineer',        company: 'Lymora',             year: '2023 — Present',        key: 'lymora'         },
  { role: 'Video Editor',               company: 'Creedlance',         year: ' Early 2025', key: 'creedlance'    },
  { role: 'Intern Teacher',             company: 'NIIT Port Harcourt', year: 'Early 2025',            key: 'niit'           },
  { role: 'Director Development',       company: 'Zirostack',          year: '2025 — Present',        key: 'zirostack'      },
];

// Role detail content — one entry per EXPERIENCE key.
const ROLE_DETAILS = {
  freelance: [
    '6+ years building backend-heavy web apps for startups, small teams, and individual founders.',
    'Clients across West Africa and Europe — remote, async, no hand-holding required.',
    'Work spans REST API design, database architecture, payment integrations (Paystack, Flutterwave), and full-stack builds.',
    'Primary stack: PHP (native + Laravel), JavaScript (Node.js + vanilla), MySQL, PostgreSQL.',
    'This is how I self-fund Lymora.',
  ],
  'graphic-design': [
    'Freelance graphic design work running alongside development since 2021.',
    'Brand identities, logos, marketing assets, and print materials for startups and small businesses.',
    'Primary tools: Adobe Photoshop and Illustrator.',
    'Design thinking directly informs how I approach UI and product decisions in development work.',
  ],
  lymora: [
    'Founded Lymora in 2023 — no co-founder, no external funding. Built from zero.',
    'Architected the full backend: multi-tenant PHP API, JWT auth, Paystack integration, role-based access control.',
    'Shipped Lymora Learn — AI exam prep powered by Claude, analysing 10+ years of past questions.',
    'Built and launched Lymora Student Housing — verified accommodation marketplace with escrow payments.',
    'Grew the team to nine people across engineering, design, and operations.',
    '200+ active users. ₦500k+ revenue. Self-funded entirely through freelance work.',
  ],
  creedlance: [
    'Edited the full library of tutorial, how-to, and marketing videos for Creedlance across late 2024 into early 2025.',
    'Work covered screen recordings, voiceover sync, motion text, colour grading, and export optimisation for social and web.',
    'Delivered consistently to a fast-moving content schedule without missing a deadline.',
  ],
  niit: [
    'Taught web development fundamentals to new students at NIIT Port Harcourt in early 2025.',
    'Covered HTML, CSS, JavaScript, and introductory PHP across structured practical sessions.',
    'Ran hands-on code reviews and project walkthroughs for class cohorts.',
    'Interesting being on the other side of the classroom after spending five years as a student there.',
  ],
  zirostack: [
    'Leading development at Zirostack from 2025.',
    'Overseeing technical direction, system architecture, and the engineering workflow.',
  ],
};

const STATS = [
  { number: '5+',   label: 'Years coding'      },
  { number: '10+',  label: 'Projects shipped'  },
  { number: '2',    label: 'Live products'     },
  { number: '200+', label: 'Users on Lymora'   },
];

const CLIENTS = [
  { name: 'Lymora',             image: '/assets/images/clients/lymora.png',     href: 'https://lymora.tech'    },
  { name: 'NIIT Port Harcourt', image: '/assets/images/clients/niit.webp',      href: 'https://niit.mgbah.dev'  },
  { name: 'Zirostack',          image: '/assets/images/clients/zirostack.png',  href: 'https://zirostack.com'  },
  { name: 'Creedlance',         image: '/assets/images/clients/creedlance.png', href: 'https://creedlance.com' },
];

const WHAT_I_BRING = [
  {
    icon: 'ph-brain',
    title: 'Systems Thinking',
    desc: "I don't write features, I design systems. Every decision traces back to how it holds under load, edge cases, and the next engineer who reads it.",
  },
  {
    icon: 'ph-rocket-launch',
    title: 'Founder Mentality',
    desc: "I built and fund Lymora myself. I know what it costs to ship slowly, and I know what it means to own an outcome — not just a ticket.",
  },
  {
    icon: 'ph-lightning',
    title: 'Speed Without Shortcuts',
    desc: 'Fast is not the same as rushed. I move quickly because I think clearly upfront — architecture first, then execution.',
  },
  {
    icon: 'ph-handshake',
    title: 'Client-First Communication',
    desc: 'I work with founders and small teams. I explain tradeoffs plainly, flag problems early, and never disappear mid-project.',
  },
  {
    icon: 'ph-code',
    title: 'Backend Depth',
    desc: 'PHP, Laravel, MySQL, REST APIs — not just functional, but clean, maintainable, and built to last beyond the first deployment.',
  },
  {
    icon: 'ph-palette',
    title: 'Design Sensibility',
    desc: "Five years of graphic design work means I don't just hand off to a designer. I think about how it looks, flows, and feels from the start.",
  },
  {
    icon: 'ph-chart-line-up',
    title: 'Product Intuition',
    desc: "I've made product decisions under real constraints — users, revenue, and a team depending on the call. That sharpens your judgment fast.",
  },
  {
    icon: 'ph-lock-key',
    title: 'Ownership Mindset',
    desc: "No co-founder, no external capital. I take full responsibility for what I ship. That's not a flex — it's just how I'm wired.",
  },
];

/**
 * Splits a heading into word-span elements for the stagger word-reveal animation.
 * Each word gets a <span class="hero__name--word"> with an inline animation-delay.
 */
function splitIntoWordSpans(text, baseDelay = 0.1, stagger = 0.08) {
  return text
    .trim()
    .split(' ')
    .map((word, i) => {
      const delay = (baseDelay + i * stagger).toFixed(2);
      return `<span class="hero__name--word" style="animation-delay:${delay}s">${word}</span>`;
    })
    .join(' ');
}

function clientCard({ name, image, href }) {
  return `
    <a class="client-card" href="${href}" target="_blank" rel="noopener noreferrer" aria-label="Visit ${name}">
      <img src="${image}" alt="${name}" loading="lazy">
    </a>
  `;
}

export function render() {
  // ── Skill pills with staggered animation-delay ────────────────────────────
  const skillPillsPrimary = SKILLS_PRIMARY.map((s, i) => {
    const delay = (i * 0.04).toFixed(2);
    return `<span class="skill-pill fade-up" style="animation-delay:${delay}s">${s}</span>`;
  }).join('');

  const skillPillsSecondary = SKILLS_SECONDARY.map((s, i) => {
    const delay = ((SKILLS_PRIMARY.length + i) * 0.04).toFixed(2);
    return `<span class="skill-pill skill-pill--secondary fade-up" style="animation-delay:${delay}s">${s}</span>`;
  }).join('');

  // ── Experience table rows ─────────────────────────────────────────────────
  const expRows = EXPERIENCE.map(({ role, company, year, key }) => `
    <tr class="fade-up">
      <td>
        <span class="exp-role-name">${role}</span>
        <button class="exp-role-link" data-role="${key}" aria-label="View details for ${role} at ${company}">
          My Role &nearr;
        </button>
      </td>
      <td>${company}</td>
      <td>${year}</td>
    </tr>
  `).join('');

  // ── Stats ─────────────────────────────────────────────────────────────────
  const statCells = STATS.map(({ number, label }) => `
    <div class="stat fade-up">
      <span class="stat__number">${number}</span>
      <span class="stat__label">${label}</span>
    </div>
  `).join('');

  // ── What I Bring cards ────────────────────────────────────────────────────
  const wibCards = WHAT_I_BRING.map(({ icon, title, desc }) => `
    <div class="wib-card fade-up">
      <div class="wib-card__icon"><i class="ph ${icon}"></i></div>
      <p class="wib-card__title">${title}</p>
      <p class="wib-card__desc">${desc}</p>
    </div>
  `).join('');

  // ── Client cards ──────────────────────────────────────────────────────────
  const clientCards = CLIENTS.map(clientCard).join('');

  // ── About H1: word-split across two lines ─────────────────────────────────
  const line1Words = 'Five years in.'.split(' ');
  const line2Words = 'Still shipping.'.split(' ');
  const baseDelay = 0.1;
  const stagger   = 0.08;

  const line1Spans = line1Words.map((word, i) => {
    const delay = (baseDelay + i * stagger).toFixed(2);
    return `<span class="hero__name--word" style="animation-delay:${delay}s">${word}</span>`;
  }).join(' ');

  const line2Spans = line2Words.map((word, i) => {
    const delay = (baseDelay + (line1Words.length + i) * stagger).toFixed(2);
    return `<span class="hero__name--word" style="animation-delay:${delay}s">${word}</span>`;
  }).join(' ');

  const aboutHeading = `${line1Spans}<br>${line2Spans}`;

  return `
    <article class="page-container" aria-label="About Michael Mgbah">

      <!-- Header -->
      <header style="padding-top: var(--space-xl); margin-bottom: var(--space-xl);">
        <p class="section-label fade-in">• About</p>
        <h1 class="hero__name words-split" style="font-size: clamp(var(--text-2xl), 5vw, var(--text-4xl)); letter-spacing: -0.03em; line-height: 1.05;">
          ${aboutHeading}
        </h1>
      </header>

      <!-- Two-column layout -->
      <div class="about-layout">

        <!-- Left column: bio, skills, experience -->
        <div class="about-left">

          <div class="about-bio">
            <p class="fade-up" style="animation-delay:0s">
              my name is Michael. i started tech at 15, not because someone pointed me toward it, but because i couldn't leave it alone.
              by the time i finished the full-stack program at NIIT Port Harcourt, i'd already been deep in graphic design and web development for years.
              the program didn't start me. it just gave structure to something already moving.
            </p>
            <p class="fade-up" style="margin-top: var(--space-md); animation-delay:0.1s">
              i'm 20 now. i run Lymora, a startup i built from scratch alongside my blessed team, in the nigerian market, solving problems i watched go unsolved. i fund it through freelance. backend is where i'm most dangerous, but i've never handed off a frontend and called it done. i design it, build it, ship it. end to end.
              that motion isn't accidental. i think differently about a product when i've touched every layer of it. the design decisions inform the engineering. the engineering exposes what the design got wrong. you can't fake that kind of understanding.
            </p>
            <p class="fade-up" style="margin-top: var(--space-md); animation-delay:0.2s">
            so basically, that's it. <br>
            <b>all credit to GOD!</b>
            </p>
          </div>

          <!-- Skills -->
          <div style="margin-bottom: var(--space-lg); margin-top: var(--space-lg);">
            <p class="section-label fade-in">Skills</p>
            <div class="skill-pills">
              ${skillPillsPrimary}
              ${skillPillsSecondary}
            </div>
          </div>

          <!-- Experience -->
          <div>
            <p class="section-label fade-in">Experience</p>
            <table class="experience-table" aria-label="Work experience">
              <thead>
                <tr>
                  <th>Role</th>
                  <th>Company</th>
                  <th style="text-align:right;">Year</th>
                </tr>
              </thead>
              <tbody>
                ${expRows}
              </tbody>
            </table>
          </div>

        </div>

        <!-- Right column: video -->
        <div class="about-portrait fade-in">
          <div class="about-portrait__image about-portrait__video-wrap">
            <video
              src="/assets/images/profile/myvid.MP4"
              autoplay
              muted
              loop
              playsinline
              aria-label="Michael Mgbah"
            ></video>
          </div>
          <p class="about-portrait__caption">Michael Mgbah — Port Harcourt, NG</p>
        </div>

      </div>

      <!-- Philosophy block -->
      <div class="philosophy-block fade-up">
        <p class="section-label fade-in">Philosophy</p>
        <p class="philosophy-block__quote">
          &ldquo;I&rsquo;ve never had the luxury of building the wrong thing twice.
          No funding, no co-founder &mdash; just the problem, the code, and whatever
          time I have between classes and client work. That constraint taught me
          something: most software fails before the first line is written, because
          nobody sat with the problem long enough. I sit with it. I question every
          decision until the right one feels obvious. Then I build.&rdquo;
        </p>
      </div>

      <!-- Stats row -->
      <div class="stats-row" aria-label="Statistics">
        ${statCells}
      </div>

      <!-- What I Bring -->
      <section class="what-i-bring">
        <div class="what-i-bring__header">
          <p class="section-label fade-in">• What I bring</p>
          <h2 class="section-h2 fade-up">More than just code.</h2>
          <p class="what-i-bring__sub fade-up">Five years of building taught me that the best engineers
            think like founders and the best founders think like engineers.
            I try to be both.</p>
        </div>
        <div class="what-i-bring__grid">
          ${wibCards}
        </div>
        <div class="what-i-bring__cta fade-up">
          <a href="/contact" class="link-arrow" style="font-size: var(--text-lg);">Work with me &rarr;</a>
        </div>
      </section>

      <!-- Companies worked with -->
      <div class="clients-section">
        <p class="section-label fade-in">• Companies</p>
        <h2 class="section-h2 fade-up">
          Some of the teams <span class="text-muted">I&rsquo;ve built for</span>
        </h2>
        <div class="clients-grid">
          ${clientCards}
        </div>
      </div>

      <!-- CTA -->
      <div style="padding: var(--space-xl) 0 var(--space-2xl);" class="fade-up">
        <a href="/contact" class="link-arrow" style="font-size: var(--text-lg);">
          Work with me &rarr;
        </a>
      </div>

    </article>

    <!-- ===== EXPERIENCE ROLE MODAL (desktop: centered / mobile: bottom drawer) ===== -->
    <div class="exp-modal-overlay" id="exp-modal-overlay" aria-hidden="true">
      <div class="exp-modal" id="exp-modal" role="dialog" aria-modal="true" aria-labelledby="exp-modal-role">
        <!-- Drag handle — only visible on mobile (bottom drawer) -->
        <div class="exp-modal__drag-indicator" aria-hidden="true"></div>
        <div class="exp-modal__header">
          <div class="exp-modal__title-wrap">
            <p class="exp-modal__role" id="exp-modal-role"></p>
            <p class="exp-modal__company" id="exp-modal-company"></p>
          </div>
          <button class="exp-modal__close" id="exp-modal-close" aria-label="Close">
            <i class="ph ph-x"></i>
          </button>
        </div>
        <ul class="exp-modal__points" id="exp-modal-points"></ul>
      </div>
    </div>
  `;
}

export function init() {
  // ── Scroll entrance animations ──────────────────────────────────────────
  const animatables = document.querySelectorAll(
    '[aria-label="About Michael Mgbah"] .fade-up, ' +
    '[aria-label="About Michael Mgbah"] .fade-in, ' +
    '.about-portrait.fade-in'
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  animatables.forEach((el) => observer.observe(el));

  // ── Experience role modals ─────────────────────────────────────────────────
  // Move the overlay to document.body so position:fixed works correctly —
  // GSAP leaves a transform on #app which would otherwise create a new
  // containing block and break fixed positioning inside it.
  const overlay   = document.getElementById('exp-modal-overlay');
  if (overlay) document.body.appendChild(overlay);

  const closeBtn  = document.getElementById('exp-modal-close');
  const roleEl    = document.getElementById('exp-modal-role');
  const companyEl = document.getElementById('exp-modal-company');
  const pointsEl  = document.getElementById('exp-modal-points');

  if (!overlay) return;

  function openModal(key) {
    const points = ROLE_DETAILS[key];
    const exp    = EXPERIENCE.find(e => e.key === key);
    if (!points || !exp) return;

    roleEl.textContent    = exp.role;
    companyEl.textContent = `${exp.company}  ·  ${exp.year}`;
    pointsEl.innerHTML    = points.map(p => `<li>${p}</li>`).join('');

    overlay.removeAttribute('aria-hidden');
    // Force a reflow so the browser registers the closed state (opacity:0 /
    // translateY offset) before we add 'is-open' — otherwise the move to body
    // and the class addition collapse into one paint and the transition is skipped.
    overlay.getBoundingClientRect();
    requestAnimationFrame(() => {
      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      closeBtn?.focus();
    });
  }

  function closeModal() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Open on button click
  document.querySelectorAll('.exp-role-link').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.role));
  });

  // Close on X button
  closeBtn?.addEventListener('click', closeModal);

  // Close on backdrop click (not on the modal itself)
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  // Close on Escape — removed when page changes
  const onKeydown = (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeModal();
  };
  document.addEventListener('keydown', onKeydown);
  window.addEventListener('routechange', () => {
    document.removeEventListener('keydown', onKeydown);
    closeModal();
    overlay?.remove();
  }, { once: true });
}

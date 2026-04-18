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
  { role: 'Director Development',       company: 'Zirostack',          year: 'Jan 2026 to Present',   key: 'zirostack'      },
  { role: 'Intern Teacher',             company: 'NIIT Port Harcourt', year: 'Oct 2025 – Jan 2026',   key: 'niit'           },
  { role: 'Video Editor',               company: 'Creedlance',         year: 'Early 2025',            key: 'creedlance'     },
  { role: 'CEO & Lead Engineer',        company: 'Lymora',             year: 'Jan 2024 to Present',   key: 'lymora'         },
  { role: 'Freelance Graphic Designer', company: 'Freelance',          year: '2021 to Present', key: 'graphic-design' },
  { role: 'Freelance Developer',        company: 'Freelance',          year: '2019 to Present', key: 'freelance'      },
];

// Role detail content — one entry per EXPERIENCE key.
const ROLE_DETAILS = {
  freelance: [
    '6+ years building backend-heavy web apps for startups, small teams, and individual founders.',
    'Clients across West Africa and Europe. Remote, async, no hand-holding required.',
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
    'Founded Lymora in 2023. No co-founder, no external funding. Built from zero.',
    'Architected the full backend: multi-tenant PHP API, JWT auth, Paystack integration, role-based access control.',
    'Shipped Lymora Learn, AI exam prep powered by Claude, analysing 10+ years of past questions.',
    'Built and launched Lymora Student Housing, a verified accommodation marketplace with escrow payments.',
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
  { name: 'Lymora',             image: '/assets/images/clients/lymora.webp',     href: 'https://lymora.tech'    },
  { name: 'NIIT Port Harcourt', image: '/assets/images/clients/niit.webp',      href: 'https://niit.mgbah.dev'  },
  { name: 'Zirostack',          image: '/assets/images/clients/zirostack.webp',  href: 'https://zirostack.com'  },
  { name: 'Creedlance',         image: '/assets/images/clients/creedlance.webp', href: 'https://creedlance.com' },
  { name: 'CyberCyn', image: '/assets/images/clients/cybercyn.webp', href: '/projects' },
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
    desc: "I built and fund Lymora myself. I know what it costs to ship slowly, and I know what it means to own an outcome. Not just a ticket.",
  },
  {
    icon: 'ph-code',
    title: 'Backend Depth',
    desc: 'PHP, Laravel, MySQL, REST APIs. Not just functional, but clean, maintainable, and built to last beyond the first deployment.',
  },
  {
    icon: 'ph-lock-key',
    title: 'Ownership Mindset',
    desc: "No co-founder, no external capital. I take full responsibility for what I ship. That's not a flex, it's just how I'm wired.",
  },
];

function animateCounter(el, target, duration = 1400) {
  const start = performance.now();
  function tick(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function clientCard({ name, image, href }) {
  return `
    <a class="client-card" href="${href}" target="_blank" rel="noopener noreferrer" aria-label="Visit ${name}">
      <img src="${image}" alt="${name}" loading="lazy" width="120" height="40">
    </a>
  `;
}

export function render() {
  // ── Skill pills with staggered entrance animation ────────────────────────
  // animation-delay is set inline; the CSS keyframe fires when parent gets .is-revealed
  const skillPillsPrimary = SKILLS_PRIMARY.map((s, i) => {
    const delay = (i * 0.06).toFixed(2);
    return `<span class="skill-pill" style="animation-delay:${delay}s">${s}</span>`;
  }).join('');

  const skillPillsSecondary = SKILLS_SECONDARY.map((s, i) => {
    const delay = ((SKILLS_PRIMARY.length + i) * 0.06).toFixed(2);
    return `<span class="skill-pill skill-pill--secondary" style="animation-delay:${delay}s">${s}</span>`;
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

  // ── Stats — split into numeric + suffix for counter animation ────────────
  const statCells = STATS.map(({ number, label }) => {
    const match  = number.match(/^(\d+)(.*)$/);
    const num    = match ? match[1] : number;
    const suffix = match ? match[2] : '';
    return `
      <div class="stat scale-in">
        <span class="stat__number">
          <span class="stat-count" data-target="${num}">0</span>${suffix}
        </span>
        <span class="stat__label">${label}</span>
      </div>
    `;
  }).join('');

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
              I started tech at 15, not because someone pointed me toward it, but because I couldn't leave it alone. Graphic design first, then web development, then the full stack program at NIIT Port Harcourt, which didn't start me so much as give structure to something already moving.
            </p>
            <p class="fade-up" style="margin-top: var(--space-md); animation-delay:0.1s">
              I'm 20 now. I run Lymora, a startup I built from scratch in the Nigerian market, solving problems I watched go unsolved, funded through freelance. Backend is where I'm most dangerous, but I've never handed off a frontend and called it done. I design it, build it, ship it.
            </p>
            <p class="fade-up" style="margin-top: var(--space-md); animation-delay:0.2s">
              That's not a workflow. It's how I think. The design decisions inform the engineering. The engineering exposes what the design got wrong and you can't fake that kind of understanding. You can't get it any other way.
            </p>
            <p class="fade-up" style="margin-top: var(--space-md); animation-delay:0.3s">
              All credit to God.
            </p>
          </div>

          <!-- Skills -->
          <div style="margin-bottom: var(--space-lg); margin-top: var(--space-lg);">
            <p class="section-label fade-in">Skills</p>
            <div class="skill-pills skill-pills--animated" id="skill-pills-wrap">
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
          <p class="about-portrait__caption">Michael Mgbah, Port Harcourt, NG</p>
        </div>

      </div>

      <!-- Philosophy block -->
      <div class="philosophy-block fade-up">
        <p class="section-label fade-in">Philosophy</p>
        <p class="philosophy-block__quote">
          &ldquo;I&rsquo;ve never had the luxury of building the wrong thing twice.
          No funding, no co-founder. Just the problem, the code, and whatever
          time I have between classes and client work. That constraint taught me
          something: most software fails before the first line is written, because
          nobody sat with the problem long enough. I sit with it. I question every
          decision until the right one feels obvious. Then I build.&rdquo;
        </p>
      </div>

      <!-- Stats row -->
      <div class="stats-row" id="about-stats" aria-label="Statistics">
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
      <div class="cta-banner-section fade-up" style="padding: var(--space-xl) 0 var(--space-2xl);">
        <div class="cta-banner">
          <div class="cta-banner__content">
            <h2 class="cta-banner__heading">Check me out<br>on X.</h2>
            <p class="cta-banner__sub">I post about building products, engineering, and the startup life.</p>
            <div style="margin-top: var(--space-lg);">
              <a href="https://x.com/_mgbah" class="btn btn-primary" target="_blank" rel="noopener">Follow @_mgbah &rarr;</a>
            </div>
          </div>
        </div>
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
    '[aria-label="About Michael Mgbah"] .scale-in, ' +
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

  // ── Skill pills staggered reveal ─────────────────────────────────────────
  const skillsWrap = document.getElementById('skill-pills-wrap');
  if (skillsWrap) {
    const skillsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            skillsWrap.classList.add('is-revealed');
            skillsObserver.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    skillsObserver.observe(skillsWrap);
  }

  // ── Stat counters ────────────────────────────────────────────────────────
  const statsSection = document.getElementById('about-stats');
  const countEls     = document.querySelectorAll('#about-stats .stat-count');
  let   countersStarted = false;

  if (statsSection && countEls.length) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !countersStarted) {
            countersStarted = true;
            countEls.forEach((el) => {
              animateCounter(el, parseInt(el.dataset.target, 10));
            });
            counterObserver.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    counterObserver.observe(statsSection);
  }

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

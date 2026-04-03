/**
 * about.js — About page
 * Sections: Header → Two-column (bio/skills/exp + portrait) →
 *           Philosophy → Stats → Companies → CTA
 * Experience rows open role-detail modals (bottom drawer on mobile).
 */

const SKILLS = [
  'PHP', 'JavaScript', 'MySQL', 'HTML', 'CSS',
  'Laravel', 'React', 'PostgreSQL', 'MongoDB',
  'REST APIs', 'Git', 'Docker',
  'Photoshop', 'Illustrator',
];

const EXPERIENCE = [
  { role: 'CEO & Lead Engineer',  company: 'Lymora',             year: '2023 — Present', key: 'lymora'    },
  { role: 'Intern Teacher',       company: 'NIIT Port Harcourt', year: 'Early 2025',     key: 'niit'      },
  { role: 'Freelance Developer',  company: 'Freelance',          year: '2019 — Present', key: 'freelance' },
  { role: 'Director Development', company: 'Zirostack',          year: '2025 — Present', key: 'zirostack' },
];

// Role detail content — one entry per EXPERIENCE key.
const ROLE_DETAILS = {
  lymora: [
    'Founded Lymora in 2023 — no co-founder, no external funding. Built from zero.',
    'Architected the full backend: multi-tenant PHP API, JWT auth, Paystack integration, role-based access control.',
    'Shipped Lymora Learn — AI exam prep powered by Claude, analysing 10+ years of past questions.',
    'Built and launched Lymora Student Housing — verified accommodation marketplace with escrow payments.',
    'Grew the team to nine people across engineering, design, and operations.',
    '100+ active users. ₦500k+ revenue. Self-funded entirely through freelance work.',
  ],
  niit: [
    'Taught web development fundamentals to new students at NIIT Port Harcourt in early 2025.',
    'Covered HTML, CSS, JavaScript, and introductory PHP across structured practical sessions.',
    'Ran hands-on code reviews and project walkthroughs for class cohorts.',
    'Interesting being on the other side of the classroom after spending five years as a student there.',
  ],
  freelance: [
    '6+ years building backend-heavy web apps for startups, small teams, and individual founders.',
    'Clients across West Africa and Europe — remote, async, no hand-holding required.',
    'Work spans REST API design, database architecture, payment integrations (Paystack, Flutterwave), and full-stack builds.',
    'Primary stack: PHP (native + Laravel), JavaScript (Node.js + vanilla), MySQL, PostgreSQL.',
    'This is how I self-fund Lymora.',
  ],
  zirostack: [
    'Leading development at Zirostack from 2025.',
    'Overseeing technical direction, system architecture, and the engineering workflow.',
  ],
};

const STATS = [
  { number: '5+',   label: 'Years coding'      },
  { number: '10+',  label: 'Projects shipped'  },
  { number: '1',    label: 'Live product'      },
  { number: '100+', label: 'Users on Lymora'   },
];

const CLIENTS = [
  { name: 'Lymora',             image: '/assets/images/clients/lymora.png',    href: 'lymora.tech'    },
  { name: 'NIIT Port Harcourt', image: '/assets/images/clients/niit.webp',     href: 'niit.mgbah.dev'  },
  { name: 'Zirostack',          image: '/assets/images/clients/zirostack.png', href: 'zirostack.com'  },
  { name: 'Creedlance',         image: '/assets/images/clients/creedlance.png', href: 'creedlance.com' },
];

function clientCard({ name, image, href }) {
  return `
    <a class="client-card" href="${href}" aria-label="Work done for ${name}">
      <img src="${image}" alt="${name}" loading="lazy">
      <span class="client-card__label">${name} &nearr;</span>
    </a>
  `;
}

export function render() {
  const skillPills = SKILLS.map(s =>
    `<span class="skill-pill fade-up">${s}</span>`
  ).join('');

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

  const statCells = STATS.map(({ number, label }) => `
    <div class="stat fade-up">
      <span class="stat__number">${number}</span>
      <span class="stat__label">${label}</span>
    </div>
  `).join('');

  const clientCards = CLIENTS.map(clientCard).join('');

  return `
    <article class="page-container" aria-label="About Michael Mgbah">

      <!-- Header -->
      <header style="padding-top: var(--space-xl); margin-bottom: var(--space-xl);">
        <p class="section-label fade-in">• About</p>
        <h1 style="font-size: clamp(var(--text-2xl), 5vw, var(--text-4xl)); letter-spacing: -0.03em; line-height: 1.05;" class="fade-up">
          Six years in.<br>Still shipping.
        </h1>
      </header>

      <!-- Two-column layout -->
      <div class="about-layout">

        <!-- Left column: bio, skills, experience -->
        <div class="about-left">

          <div class="about-bio fade-up">
            <p>
              I&rsquo;m Michael. I started in tech at 15 &mdash; not studying it, building with it.
              By the time I finished the full-stack program at NIIT Port Harcourt, I&rsquo;d already
              spent years learning 3D design, graphic design, and web development alongside the
              engineering. That breadth matters to me. I think differently about a product when
              I&rsquo;ve designed it, built it, and shipped it myself.
            </p>
            <p style="margin-top: var(--space-md);">
              I&rsquo;m 20 now. I run Lymora &mdash; a startup I built from scratch and fund through
              freelance work. Backend is where I&rsquo;m strongest, but I&rsquo;ve never handed off
              the frontend and called it done. I ship end-to-end.
            </p>
          </div>

          <!-- Skills -->
          <div style="margin-bottom: var(--space-lg); margin-top: var(--space-lg);">
            <p class="section-label">Skills</p>
            <div class="skill-pills">
              ${skillPills}
            </div>
          </div>

          <!-- Experience -->
          <div>
            <p class="section-label">Experience</p>
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
        <p class="section-label">Philosophy</p>
        <p class="philosophy-block__quote">
          &ldquo;I build the way Dostoevsky wrote &mdash; obsessively, with the full weight
          of the human condition in mind. Software should feel inevitable. Every decision
          a product makes should feel like the only possible right answer. That&rsquo;s
          the standard I hold myself to.&rdquo;
        </p>
      </div>

      <!-- Stats row -->
      <div class="stats-row" aria-label="Statistics">
        ${statCells}
      </div>

      <!-- Companies worked with -->
      <div class="clients-section fade-up">
        <p class="section-label">• Companies</p>
        <h2 class="section-h2" style="margin-bottom: var(--space-lg);">
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
    '.about-left .fade-up, .about-left .fade-in, ' +
    '.about-portrait.fade-in, ' +
    '.philosophy-block.fade-up, ' +
    '.stats-row .fade-up, ' +
    '.clients-section.fade-up, ' +
    '[aria-label="About Michael Mgbah"] .fade-up, ' +
    '[aria-label="About Michael Mgbah"] .fade-in'
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

  // ── Experience role modals ─────────────────────────────────────────────
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

/**
 * home.js — Home page
 * Sections: Hero → Marquee → Selected Work → About Strip → Lymora Block
 *           → Testimonials → FAQ → CTA Banner
 */

import { initParticles } from '../components/particles.js';
import { initParallax } from '../utils/parallax.js';

const MARQUEE_ITEMS = [
  'PHP', 'JavaScript', 'MySQL', 'Laravel', 'React',
  'Node.js', 'PostgreSQL', 'MongoDB', 'REST APIs', 'Linux',
];

const PROJECTS = [
  {
    name: 'Lymora Learn',
    desc: 'AI exam prep platform. Analyses 10+ years of past questions, predicts likely topics, 100+ active users.',
    tags: ['PHP', 'JavaScript', 'MySQL', 'Claude AI'],
    href: '/lymora',
  },
  {
    name: 'Mock Investment Platform',
    desc: 'Simulated forex and stock trading with real-time charting, virtual portfolios, and live P&L tracking.',
    tags: ['PHP', 'Laravel', 'JavaScript', 'WebSockets'],
    href: '/projects',
  },
  {
    name: 'Logistics Tracking Platform',
    desc: 'End-to-end shipment tracking, waybill generation, transit stage updates, and automated SMS notifications.',
    tags: ['PHP', 'Laravel', 'MySQL', 'JavaScript'],
    href: '/projects',
  },
  {
    name: 'Laravel Audit Trail',
    desc: 'Drop-in Composer package logging every Eloquent model mutation who changed what, when, and from which IP.',
    tags: ['PHP', 'Laravel', 'Composer', 'MySQL'],
    href: '/projects',
  },
];

const TESTIMONIALS = [
  {
    quote: 'Michael rebuilt our backend API in three weeks. Response times dropped from 10 seconds to under 200ms. The code is clean, documented, and actually maintainable.',
    name: 'Chidi Okafor',
    role: 'CTO, TechStartup Lagos',
    num: '1/4',
  },
  {
    quote: 'I hired Michael to build our student housing platform from scratch. He delivered on time, handled every edge case, and the codebase is one of the cleanest I\'ve seen.',
    name: 'Ngozi Adeyemi',
    role: 'Founder, PropTech NG',
    num: '2/4',
  },
  {
    quote: 'He doesn\'t just execute — he thinks. Michael pushed back on a bad architectural decision we made early on, and he was right. Ship fast without cutting corners.',
    name: 'Emmanuel Taiwo',
    role: 'Product Manager',
    num: '3/4',
  },
  {
    quote: 'Smooth payment integration, solid MySQL schema design, and he explained every decision. If you need a backend engineer who genuinely cares about the product — it\'s Michael.',
    name: 'Babatunde Raji',
    role: 'Engineering Lead',
    num: '4/4',
  },
];

const FAQS = [
  {
    q: 'What kind of projects do you take on?',
    a: 'Backend-heavy web apps, API integrations, database design, and full-stack builds for startups and small teams. PHP, JavaScript, MySQL, and Laravel are my primary stack.',
  },
  {
    q: 'How do I start working with you?',
    a: 'Book a 30-minute call — no agenda needed. We\'ll talk about what you\'re building and figure out if there\'s a fit.',
  },
  {
    q: 'What\'s your typical project timeline?',
    a: 'Single feature or API: 1–2 weeks. MVP: 4–8 weeks. Larger engagements are scoped on a call. I move fast but don\'t rush.',
  },
  {
    q: 'Are you available for full-time roles?',
    a: 'Yes. Remote full-time or part-time contracts. I work best with product-led teams — fintech, edtech, developer tooling.',
  },
  {
    q: 'Do you work with international clients?',
    a: 'Yes. Clients across West Africa and Europe. Async works fine — I\'m used to it.',
  },
  {
    q: 'What\'s your go-to tech stack?',
    a: 'PHP (native + Laravel), JavaScript (Node.js + vanilla), MySQL, PostgreSQL, REST APIs, Linux. I\'m pragmatic — the stack depends on the problem.',
  },
];

// ── Template helpers ────────────────────────────────────────────────────────

function marqueeTrack() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]
    .map(item => `<span>${item}</span><span class="marquee__dot"></span>`)
    .join('');
  return `<div class="marquee__item">${items}</div>`;
}

function projectCard({ name, desc, tags, href }) {
  const tagHTML = tags.map(t => `<span class="tag">${t}</span>`).join('');
  return `
    <article class="project-card fade-up">
      <a href="${href}" aria-label="View ${name}">
        <div class="project-card__image-wrap">
          <div class="project-card__placeholder">Project</div>
        </div>
        <div class="project-card__body">
          <h3 class="project-card__name">${name}</h3>
          <p class="project-card__desc">${desc}</p>
          <div class="project-card__tags">${tagHTML}</div>
        </div>
      </a>
    </article>
  `;
}

function testimonialCard({ quote, name, role, num }) {
  return `
    <div class="testimonial-card">
      <blockquote class="testimonial-card__quote">${quote}</blockquote>
      <div class="testimonial-card__footer">
        <div>
          <p class="testimonial-card__name">${name}</p>
          <p class="testimonial-card__role">${role}</p>
        </div>
        <span class="testimonial-card__num">${num}</span>
      </div>
    </div>
  `;
}

function faqItem({ q, a }, index) {
  return `
    <div class="faq-item" data-faq="${index}">
      <button class="faq-item__question" aria-expanded="false">
        <span>${q}</span>
        <span class="faq-item__icon" aria-hidden="true"><i class="ph ph-plus"></i></span>
      </button>
      <div class="faq-item__answer" role="region">
        <p>${a}</p>
      </div>
    </div>
  `;
}

/**
 * Splits a heading string into word-span elements for the stagger word-reveal animation.
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

// ── Render ──────────────────────────────────────────────────────────────────

export function render() {
  return `
    <!-- ===== HERO ===== -->
    <section class="hero" id="hero" aria-label="Hero">
      <!-- Background image carousel — slides crossfade, parallax applied to wrapper -->
      <div class="hero__bg" aria-hidden="true">
        <div class="hero__carousel-slide is-active" style="background-image:url('/assets/images/profile/bgimage.png')"></div>
        <div class="hero__carousel-slide" style="background-image:url('/assets/images/profile/carousel2.png')"></div>
        <div class="hero__carousel-slide" style="background-image:url('/assets/images/profile/carousel3.png')"></div>
        <div class="hero__carousel-slide" style="background-image:url('/assets/images/profile/carousel4.png')"></div>
      </div>
      <canvas id="hero-canvas" aria-hidden="true"></canvas>

      <div class="hero__content">
        <h1 class="hero__name words-split">${splitIntoWordSpans('Michael Mgbah', 0.1, 0.12)}</h1>
        <p class="hero__tagline">Backend-leaning full stack developer.<br>Founder of Lymora. Building things that matter.</p>
        <div class="hero__ctas">
          <a href="/projects" class="btn btn-primary">See My Work</a>
        </div>
      </div>

      <div class="hero__scroll-indicator" aria-hidden="true">
        <span class="hero__scroll-mouse">
          <span class="hero__scroll-dot"></span>
        </span>
        <span class="hero__scroll-label">Welcome to the 6</span>
      </div>
    </section>

    <!-- ===== MARQUEE ===== -->
    <div class="marquee" aria-hidden="true">
      <div class="marquee__inner">
        ${marqueeTrack()}
        ${marqueeTrack()}
      </div>
    </div>

    <!-- ===== SELECTED WORK ===== -->
    <section class="section" id="work" aria-label="Selected work">
      <div class="container">
        <p class="section-label fade-in">• Selected Work</p>
        <h2 class="section-h2 fade-up">
          Things I&rsquo;ve built <span class="text-muted">so far</span>
        </h2>

        <div class="project-grid">
          ${PROJECTS.map(projectCard).join('')}
        </div>

        <div style="margin-top: var(--space-lg);">
          <a href="/projects" class="link-arrow">
            View all projects &rarr;
          </a>
        </div>
      </div>
    </section>

    <!-- ===== ABOUT STRIP ===== -->
    <section class="about-strip" aria-label="About">
      <div class="container">
        <div class="about-strip__inner fade-up">
          <div class="about-strip__text-col">
            <p class="section-label">• About</p>
            <p class="about-strip__text">
              the boy is a 20 year old backend-leaning full-stack developer, running Lymora.
              the rest of my craft is just how i keep it moving. graphics, video editing, whatever the moment calls for. i'm quite proficient there too.
              either way i'm just trying to have fun with whatever i touch. <br>
              <b>all credit to GOD!</b>
            </p>
            <a href="/about" class="link-arrow">More about me &rarr;</a>
          </div>
          <div class="about-strip__image-col">
            <div class="about-strip__image-frame">
              <img src="/assets/images/profile/carousel2.png" alt="Michael Mgbah" loading="lazy">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== LYMORA BLOCK ===== -->
    <section class="section" aria-label="Lymora">
      <div class="container">
        <div class="lymora-block fade-up">
          <div class="lymora-block__left">
            <p class="lymora-block__eyebrow">• Company</p>
            <h2 class="lymora-block__name">Lymora</h2>
            <p class="lymora-block__tagline">&ldquo;Academic Operating System.&rdquo;</p>
            <p class="lymora-block__desc">
              Lymora is a Nigerian edtech startup &mdash; AI exam prep live, student housing
              in development. Built for RSU students. 100+ users. &#8358;500k+ revenue. Nine-person team.
            </p>
            <a href="/lymora" class="btn btn-ghost">Learn about Lymora &rarr;</a>
          </div>
          <div class="lymora-block__products">
            <div class="lymora-product">
              <p class="lymora-product__name">Lymora Learn</p>
              <p class="lymora-product__desc">
                Analyses ten years of past exam questions to tell students what&rsquo;s
                likely to come up next. Subscription-based, powered by Claude AI.
              </p>
            </div>
            <div class="lymora-product">
              <p class="lymora-product__name">Lymora Student Housing</p>
              <p class="lymora-product__desc">
                Verified student accommodation listings with escrow payments
                and capped agent fees. Starting with RSU, scaling nationally.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== TESTIMONIALS ===== -->
    <section class="section" id="testimonials" aria-label="Testimonials">
      <div class="container">
        <p class="section-label fade-in">• Testimonials</p>
        <h2 class="section-h2 fade-up">
          What others say <span class="text-muted">about my work</span>
        </h2>
        <div class="testimonials-wrap fade-up">
          <div class="testimonials-track" id="testimonials-track">
            ${TESTIMONIALS.map(testimonialCard).join('')}
          </div>
          <div class="testimonials-nav">
            <button class="testimonials-btn" id="testimonials-prev" aria-label="Previous testimonial">
              <i class="ph ph-arrow-left"></i>
            </button>
            <button class="testimonials-btn" id="testimonials-next" aria-label="Next testimonial">
              <i class="ph ph-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== FAQ ===== -->
    <section class="section" id="faq" aria-label="FAQ">
      <div class="container">
        <p class="section-label fade-in">• FAQ</p>
        <h2 class="section-h2 fade-up">
          Your questions, <span class="text-muted">answered.</span>
        </h2>
        <div class="faq-grid fade-up">
          <div class="faq-col">
            ${FAQS.slice(0, 3).map((item, i) => faqItem(item, i)).join('')}
          </div>
          <div class="faq-col">
            ${FAQS.slice(3).map((item, i) => faqItem(item, i + 3)).join('')}
          </div>
        </div>
      </div>
    </section>

    <!-- ===== CTA BANNER ===== -->
    <section class="cta-banner-section" aria-label="Call to action">
      <div class="container">
        <div class="cta-banner fade-up">
          <div class="cta-banner__content">
            <h2 class="cta-banner__heading">Let&rsquo;s build<br>something.</h2>
            <p class="cta-banner__sub">Five years building. Book 30 minutes &mdash; no agenda.</p>
            <button
              class="btn btn-primary"
              data-cal-namespace="30min"
              data-cal-link="mgbah/30min"
              data-cal-config='{"theme":"dark"}'
              aria-label="Book a 30-minute call with Michael"
            >Book a Call</button>
          </div>
        </div>
      </div>
    </section>
  `;
}

// ── Init ────────────────────────────────────────────────────────────────────

export function init() {
  // Particles + Parallax
  initParticles();
  initParallax();

  // ── Hero background carousel ───────────────────────────────────────────────
  const slides = document.querySelectorAll('.hero__carousel-slide');
  if (slides.length > 1) {
    let current = 0;
    const timer = setInterval(() => {
      slides[current].classList.remove('is-active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('is-active');
    }, 5000);
    // Clean up when navigating away (particles destroy already handles canvas)
    window.addEventListener('routechange', () => clearInterval(timer), { once: true });
  }

  // Cal.com namespace
  if (typeof Cal !== 'undefined' && Cal.ns?.['30min']) {
    Cal.ns['30min']('ui', { theme: 'dark', hideEventTypeDetails: false, layout: 'month_view' });
  }

  // ── Testimonials carousel ─────────────────────────────────────────────────
  const track    = document.getElementById('testimonials-track');
  const prevBtn  = document.getElementById('testimonials-prev');
  const nextBtn  = document.getElementById('testimonials-next');

  if (track && prevBtn && nextBtn) {
    const cards   = track.querySelectorAll('.testimonial-card');
    const total   = cards.length;
    let index     = 0;

    function getCardStep() {
      // Card width + gap (16px) — read from DOM so it's responsive-aware
      const card = cards[0];
      const gap  = parseInt(getComputedStyle(track).gap) || 16;
      return card.offsetWidth + gap;
    }

    function getMaxIndex() {
      // Desktop shows 3 cards; mobile shows 1
      const visible = window.innerWidth >= 768 ? 3 : 1;
      return Math.max(0, total - visible);
    }

    function update(newIndex) {
      index = Math.max(0, Math.min(newIndex, getMaxIndex()));
      track.style.transform = `translateX(-${index * getCardStep()}px)`;
      prevBtn.disabled = index === 0;
      nextBtn.disabled = index >= getMaxIndex();
    }

    prevBtn.addEventListener('click', () => update(index - 1));
    nextBtn.addEventListener('click', () => update(index + 1));

    // Set initial disabled state
    update(0);
  }

  // ── FAQ accordion ─────────────────────────────────────────────────────────
  document.querySelectorAll('.faq-item__question').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item   = btn.closest('.faq-item');
      const isOpen = item.classList.contains('is-open');

      // Close all open items
      document.querySelectorAll('.faq-item.is-open').forEach((el) => {
        el.classList.remove('is-open');
        el.querySelector('.faq-item__question')?.setAttribute('aria-expanded', 'false');
      });

      // Toggle clicked item
      if (!isOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

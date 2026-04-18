/**
 * lymora.js — Lymora company page
 * Sections: Hero → Products → Traction (counter animation) → Team → Vision → CTA
 */

// Traction data — prefix/target/suffix separated so the counter
// can animate only the numeric part while preserving context.
const TRACTION = [
  { prefix: '',  target: 200, suffix: '+',  label: 'Active users'       },
  { prefix: '₦', target: 650, suffix: 'k+', label: 'Revenue generated'  },
  { prefix: '',  target: 2,   suffix: '',   label: 'Live products'       },
  { prefix: '~', target: 9,   suffix: '',   label: 'Team members'        },
];

// ── Counter animation ──────────────────────────────────────────────────────

/**
 * Animate a number from 0 → target over `duration` ms using rAF.
 * Writes only the numeric portion into `el`; caller wraps prefix/suffix.
 */
function animateCounter(el, target, duration = 1500) {
  const start = performance.now();

  function tick(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out cubic
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

// ── HTML helpers ──────────────────────────────────────────────────────────

function tractionStats() {
  return TRACTION.map(({ prefix, target, suffix, label }, i) => `
    <div class="stat fade-up" data-index="${i}">
      <div class="lymora-stat__number">
        <span class="traction-prefix">${prefix}</span><span
          class="traction-count"
          data-target="${target}"
        >0</span><span class="traction-suffix">${suffix}</span>
      </div>
      <span class="lymora-stat__label">${label}</span>
    </div>
  `).join('');
}

export function render() {
  return `
    <div class="page-container" aria-label="Lymora company page">

      <!-- ===== HERO ===== -->
      <div style="padding-top: var(--space-xl);">
        <div class="lymora-hero fade-up">
          <p class="lymora-hero__eyebrow">• Company, Est. 2023</p>
          <h1 class="lymora-hero__name">Lymora</h1>
          <p class="lymora-hero__tagline">&ldquo;Academic Operating System.&rdquo;</p>
          <div class="lymora-hero__meta">
            <span class="lymora-badge">Port Harcourt, NG</span>
            <span class="lymora-badge">EdTech &amp; PropTech</span>
            <span class="lymora-badge">Seed Stage</span>
          </div>
        </div>
      </div>

      <!-- ===== PROBLEM / SOLUTION — two products ===== -->
      <section aria-label="Products">
        <p class="section-label fade-in">• What We Build</p>
        <h2
          style="font-size: clamp(var(--text-xl), 3vw, var(--text-2xl));
                 letter-spacing: -0.02em; margin-bottom: var(--space-xl); max-width: 560px;"
          class="fade-up"
        >
          One live. One building. Both for Nigerian students.
        </h2>

        <div class="lymora-products">

          <!-- Lymora Learn -->
          <div class="lymora-product-card fade-up">
            <p class="lymora-product-card__name">Lymora Learn</p>
            <p class="lymora-product-card__desc">
              AI-powered exam preparation that analyses over a decade of past questions
              to surface patterns, predict likely topics, and help students study smarter.
              Subscription-based. Mobile-first.
            </p>
            <div class="lymora-product-card__points">
              <p class="lymora-product-card__point">Pattern analysis of 10+ years of past questions</p>
              <p class="lymora-product-card__point">Subscription model, affordable at ₦2,500/month</p>
              <p class="lymora-product-card__point">AI-generated study paths per course</p>
              <p class="lymora-product-card__point">Built for WAEC, JAMB, and university exams</p>
            </div>
          </div>

          <!-- Lymora Student Housing -->
          <div class="lymora-product-card lymora-product-card--wip fade-up">
            <div class="lymora-product-card__blur-content">
              <p class="lymora-product-card__name">Lymora Student Housing</p>
              <p class="lymora-product-card__desc">
                A verified student accommodation marketplace that removes the scams,
                inflated agent fees, and blind bookings that define student housing in Nigeria.
                Trust infrastructure for students and landlords.
              </p>
              <div class="lymora-product-card__points">
                <p class="lymora-product-card__point">Verified listings with physical inspection</p>
                <p class="lymora-product-card__point">Escrow payments, held until move-in</p>
                <p class="lymora-product-card__point">Agent fee caps enforced on platform</p>
                <p class="lymora-product-card__point">RSU-first, expanding to all PH campuses</p>
              </div>
            </div>
            <div class="lymora-product-card__wip-overlay" aria-hidden="true">
              <span class="lymora-badge lymora-badge--dev">In Development</span>
            </div>
          </div>

        </div>
      </section>

      <!-- ===== TRACTION ===== -->
      <section class="lymora-traction" id="lymora-traction" aria-label="Traction">
        <p class="section-label" style="margin-bottom: var(--space-lg);">• Traction</p>
        <div class="lymora-traction__grid">
          ${tractionStats()}
        </div>
      </section>

      <!-- ===== TEAM ===== -->
      <div class="lymora-section fade-up" aria-label="Team">
        <p class="section-label">• Team</p>
        <h2 class="lymora-section__heading">~9 people building this</h2>
        <p class="lymora-section__text">
          Lymora runs on a small, high-conviction team: engineers, designers, and
          operations people who believe Nigerian students deserve better infrastructure.
          Everyone wears multiple hats. We move fast because we have to.
        </p>
      </div>

      <!-- ===== VISION ===== -->
      <div class="lymora-section fade-up" aria-label="Vision">
        <p class="section-label">• Vision</p>
        <h2 class="lymora-section__heading">Where we&rsquo;re going</h2>
        <p class="lymora-section__text">
          Lymora&rsquo;s goal is to become the default operating layer for Nigerian student
          life, the platform students open when they need to study, find housing,
          manage their academic calendar, or connect with opportunities. We started where
          the pain is loudest. We&rsquo;re not stopping at two products.
        </p>
      </div>

      <!-- ===== CTA ===== -->
      <div
        style="padding: var(--space-xl) 0 var(--space-xl);"
        class="fade-up"
      >
        <a href="/contact" class="link-arrow" style="font-size: var(--text-lg);">
          Get in touch about Lymora &rarr;
        </a>
      </div>

      <!-- ===== BRAND IMAGE ===== -->
      <div class="lymora-brand-image fade-in" style="margin: 0 0 var(--space-2xl); border-radius: 12px; overflow: hidden; border: 1px solid var(--color-border);">
        <img src="/assets/images/lymora/lymora.webp" alt="Lymora" loading="lazy" width="1600" height="500" style="width: 100%; display: block; height: auto;">
      </div>

    </div>
  `;
}

export function init() {
  // ── Counter animation — fires only when traction section is visible ──────
  const tractionSection = document.getElementById('lymora-traction');
  const countEls        = document.querySelectorAll('.traction-count');
  let   countersStarted = false;

  if (tractionSection && countEls.length) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !countersStarted) {
            countersStarted = true;
            countEls.forEach(el => {
              animateCounter(el, parseInt(el.dataset.target, 10));
            });
            counterObserver.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    counterObserver.observe(tractionSection);
  }

  // ── Scroll entrance animations ───────────────────────────────────────────
  const entranceObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          entranceObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
  );

  document.querySelectorAll(
    '[aria-label="Lymora company page"] .fade-up, ' +
    '[aria-label="Lymora company page"] .fade-in'
  ).forEach(el => entranceObserver.observe(el));

}

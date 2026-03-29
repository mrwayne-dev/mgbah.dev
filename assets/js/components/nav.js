/**
 * nav.js — Navigation component
 * Desktop: logo (left) | links (center) | Book a Call CTA (right)
 * On scroll > 50px: .nav__inner morphs into a compact floating glassmorphism pill.
 * Mobile: logo (left) | hamburger (right); full overlay with links + CTA inside.
 */

const NAV_HTML = `
  <div class="nav__inner">

    <!-- Col 1: Logo — supports image, text, or both -->
    <a href="/" class="nav__logo" aria-label="mgbah.dev home">
      <img class="nav__logo-img" src="/assets/images/profile/logo.svg" alt="mgbah.dev" aria-hidden="true" onerror="this.style.display='none'">
      <span class="nav__logo-text">mgbah.</span>
    </a>

    <!-- Col 2: Desktop links (centered) -->
    <ul class="nav__links" role="list">
      <li><a href="/about"    class="nav__link" data-nav-link aria-current="false">About</a></li>
      <li><a href="/projects" class="nav__link" data-nav-link aria-current="false">Projects</a></li>
      <li><a href="/services" class="nav__link" data-nav-link aria-current="false">Services</a></li>
      <li><a href="/lymora"   class="nav__link" data-nav-link aria-current="false">Lymora</a></li>
      <li><a href="/contact"  class="nav__link" data-nav-link aria-current="false">Contact</a></li>
    </ul>

    <!-- Col 3: CTA + hamburger -->
    <div class="nav__right">
      <button
        class="btn btn-primary nav__cta"
        data-cal-namespace="30min"
        data-cal-link="mgbah/30min"
        data-cal-config='{"theme":"dark"}'
        aria-label="Book a 30-minute call"
      >Book a Call</button>

      <button
        class="nav__hamburger"
        id="nav-hamburger"
        aria-label="Open navigation menu"
        aria-expanded="false"
        aria-controls="nav-overlay"
      >
        <span class="nav__hamburger-line"></span>
        <span class="nav__hamburger-line"></span>
        <span class="nav__hamburger-line"></span>
      </button>
    </div>

  </div>

  <!-- Mobile full-screen overlay -->
  <div
    class="nav-overlay"
    id="nav-overlay"
    role="dialog"
    aria-modal="true"
    aria-label="Navigation menu"
  >
    <button class="nav-overlay__close" id="nav-overlay-close" aria-label="Close navigation menu">
      <i class="ph ph-x" aria-hidden="true"></i>
    </button>

    <ul class="nav-overlay__links" role="list">
      <li><a href="/"         class="nav-overlay__link" data-nav-link aria-current="false">Home</a></li>
      <li><a href="/about"    class="nav-overlay__link" data-nav-link aria-current="false">About</a></li>
      <li><a href="/projects" class="nav-overlay__link" data-nav-link aria-current="false">Projects</a></li>
      <li><a href="/services" class="nav-overlay__link" data-nav-link aria-current="false">Services</a></li>
      <li><a href="/lymora"   class="nav-overlay__link" data-nav-link aria-current="false">Lymora</a></li>
      <li><a href="/contact"  class="nav-overlay__link" data-nav-link aria-current="false">Contact</a></li>
    </ul>

    <div class="nav-overlay__cta">
      <button
        class="btn btn-primary"
        data-cal-namespace="30min"
        data-cal-link="mgbah/30min"
        data-cal-config='{"theme":"dark"}'
        aria-label="Book a 30-minute call"
      >Book a Call</button>
    </div>
  </div>
`;

export function initNav() {
  const navEl = document.getElementById('nav');
  if (!navEl) return;

  navEl.className = 'nav';
  navEl.innerHTML = NAV_HTML;

  const hamburger = document.getElementById('nav-hamburger');
  const overlay   = document.getElementById('nav-overlay');
  const closeBtn  = document.getElementById('nav-overlay-close');

  // ── Active link ────────────────────────────────────────────────────────────
  setActiveLink(window.location.pathname);
  window.addEventListener('routechange', (e) => setActiveLink(e.detail.path));

  // ── Scroll → island pill ──────────────────────────────────────────────────
  const onScroll = () => navEl.classList.toggle('scrolled', window.scrollY > 50);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ── Cal.com re-init for nav CTA buttons ───────────────────────────────────
  if (typeof Cal !== 'undefined' && Cal.ns?.['30min']) {
    Cal.ns['30min']('ui', { theme: 'dark', hideEventTypeDetails: false, layout: 'month_view' });
  }

  // ── Mobile overlay ─────────────────────────────────────────────────────────
  hamburger.addEventListener('click', openOverlay);
  closeBtn.addEventListener('click', closeOverlay);

  // Close when a link inside the overlay is clicked
  overlay.addEventListener('click', (e) => {
    if (e.target.closest('a')) closeOverlay();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
      closeOverlay();
      hamburger.focus();
    }
  });

  overlay.addEventListener('keydown', trapFocus);

  // ── Helpers ────────────────────────────────────────────────────────────────

  function openOverlay() {
    overlay.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Close navigation menu');
    document.body.classList.add('nav-open');
    overlay.querySelector('a')?.focus();
  }

  function closeOverlay() {
    overlay.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open navigation menu');
    document.body.classList.remove('nav-open');
  }

  function trapFocus(e) {
    if (e.key !== 'Tab') return;
    const focusable = Array.from(
      overlay.querySelectorAll('a[href], button:not([disabled])')
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
    }
  }
}

/**
 * Update active state on all [data-nav-link] elements.
 * Called by initNav() on init and by the router via the 'routechange' event.
 */
export function setActiveLink(path) {
  document.querySelectorAll('[data-nav-link]').forEach((link) => {
    const match = link.getAttribute('href') === path;
    link.classList.toggle('is-active', match);
    link.setAttribute('aria-current', match ? 'page' : 'false');
  });
}

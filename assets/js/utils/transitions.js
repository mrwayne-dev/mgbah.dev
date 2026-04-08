/**
 * transitions.js — Page transition and scroll animation utilities
 * Uses GSAP for smooth, GPU-accelerated transitions (opacity + transform only)
 */

const app = () => document.getElementById('app');

/**
 * Animate current page content out.
 * Returns a Promise that resolves after the animation completes.
 */
export function pageExit() {
  return new Promise((resolve) => {
    const el = app();
    // Skip animation if nothing is rendered yet (initial load)
    if (!el || !el.children.length) { resolve(); return; }

    // Safety net — always resolve within 400ms regardless of GSAP state
    const fallback = setTimeout(resolve, 400);

    gsap.to(el, {
      opacity: 0,
      y: -10,
      duration: 0.15,
      ease: 'power2.in',
      onComplete: () => { clearTimeout(fallback); resolve(); },
    });
  });
}

/**
 * Animate new page content in.
 * Returns a Promise that resolves after the animation completes.
 */
export function pageEnter() {
  return new Promise((resolve) => {
    const el = app();
    if (!el) { resolve(); return; }

    const fallback = setTimeout(resolve, 600);

    gsap.fromTo(
      el,
      { opacity: 0, y: 14 },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
        onComplete: () => { clearTimeout(fallback); resolve(); },
      }
    );
  });
}

/**
 * Sets up a global Intersection Observer that watches for elements
 * with .fade-up or .fade-in and adds .is-visible when they enter the viewport.
 * Call once on app init — survives page navigation because it uses a MutationObserver
 * to watch for new elements added to #app after each route render.
 */
export function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  function observeAnimatables() {
    document.querySelectorAll('.fade-up, .fade-in, .scale-in, .slide-right').forEach((el) => {
      if (!el.classList.contains('is-visible')) {
        observer.observe(el);
      }
    });
  }

  // Observe elements already in the DOM
  observeAnimatables();

  // Re-observe after each route render injects new HTML into #app
  const appEl = document.getElementById('app');
  if (appEl) {
    const mutationObserver = new MutationObserver(observeAnimatables);
    mutationObserver.observe(appEl, { childList: true, subtree: false });
  }
}

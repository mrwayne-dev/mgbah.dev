/**
 * parallax.js — Hero background parallax
 * Translates .hero__bg (the background layer) using transform: translateY, which
 * is GPU-composited and triggers no layout or paint — keeping scroll silky smooth.
 * Self-cleans when the hero leaves the DOM on SPA navigation.
 */

export function initParallax() {
  const bg = document.querySelector('.hero__bg');
  if (!bg) return;

  let ticking = false;

  function update() {
    if (!document.body.contains(bg)) {
      window.removeEventListener('scroll', onScroll);
      return;
    }

    // Move bg at 30% of scroll speed — subtle depth without distraction
    bg.style.transform = `translateY(${window.scrollY * 0.3}px)`;
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
}

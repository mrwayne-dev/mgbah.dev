/**
 * particles.js — tsParticles smoke/mist effect for home page hero
 * Only initialises when #hero-canvas is present in the DOM.
 * Call destroyParticles() before any page navigation.
 */

let _instance = null;

const PARTICLE_CONFIG = {
  particles: {
    number: { value: 30 },
    color: { value: '#ffffff' },
    opacity: {
      value: 0.07,
      random: true,
      animation: { enable: false },
    },
    size: {
      value: 1.5,
      random: true,
    },
    move: {
      enable: true,
      speed: 0.3,
      direction: 'none',
      random: true,
      straight: false,
      outModes: { default: 'out' },
    },
    links: { enable: false },
  },
  interactivity: {
    events: { onHover: { enable: false }, onClick: { enable: false } },
  },
  detectRetina: false,
  background: { color: 'transparent' },
};

const TSPARTICLES_CDN = 'https://cdn.jsdelivr.net/npm/tsparticles@2/tsparticles.bundle.min.js';

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (typeof tsParticles !== 'undefined') { resolve(); return; }
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) { existing.addEventListener('load', resolve); existing.addEventListener('error', reject); return; }
    const s = document.createElement('script');
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

export async function initParticles() {
  // Skip on mobile — not visible at small sizes and expensive on low-end devices
  if (window.innerWidth < 768) return;

  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  try {
    await loadScript(TSPARTICLES_CDN);
    _instance = await tsParticles.load('hero-canvas', PARTICLE_CONFIG);
    canvas.classList.add('is-loaded');
  } catch {
    // Non-fatal — particles are atmospheric only
  }
}

export function destroyParticles() {
  if (_instance) {
    _instance.destroy();
    _instance = null;
  }
  // Also remove loaded class so next visit fades in fresh
  const canvas = document.getElementById('hero-canvas');
  if (canvas) canvas.classList.remove('is-loaded');
}

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

export async function initParticles() {
  // Skip on mobile — not visible at small sizes and expensive on low-end devices
  if (window.innerWidth < 768) return;

  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  // tsParticles is loaded as a global from CDN
  if (typeof tsParticles === 'undefined') return;

  try {
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

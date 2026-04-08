/**
 * app.js — Entry point
 * Wires together the router, nav, chat widget, and scroll animations.
 * Loaded as <script type="module"> in index.php.
 */

import { Router } from './router.js';
import { initNav } from './components/nav.js';
import { initChat } from './components/chat.js';
import { initFooter } from './components/footer.js';
import { initScrollAnimations } from './utils/transitions.js';

// Scroll to top on every SPA route change (instant — GSAP handles the visual transition)
window.addEventListener('routechange', () => window.scrollTo({ top: 0, behavior: 'instant' }));

// ── Dev Modal — global open/close ────────────────────────────────────────────

let _escListener = null;

window.openDevModal = function () {
  const overlay = document.getElementById('dev-modal-overlay');
  if (!overlay) return;
  overlay.removeAttribute('aria-hidden');
  requestAnimationFrame(() => overlay.classList.add('is-open'));
  document.body.style.overflow = 'hidden';

  _escListener = (e) => { if (e.key === 'Escape') window.closeDevModal(); };
  document.addEventListener('keydown', _escListener);
};

window.closeDevModal = function () {
  const overlay = document.getElementById('dev-modal-overlay');
  if (!overlay) return;
  overlay.classList.remove('is-open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';

  if (_escListener) {
    document.removeEventListener('keydown', _escListener);
    _escListener = null;
  }
};

// Wire close button and backdrop click once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('dev-modal-close')
    ?.addEventListener('click', () => window.closeDevModal());

  document.getElementById('dev-modal-overlay')
    ?.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) window.closeDevModal();
    });
});

initNav();
initChat();
initFooter();
initScrollAnimations();

const router = new Router();
router.init();

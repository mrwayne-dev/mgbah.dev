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

initNav();
initChat();
initFooter();
initScrollAnimations();

const router = new Router();
router.init();

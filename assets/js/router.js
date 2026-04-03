/**
 * router.js — Vanilla SPA router using History API
 * Intercepts internal link clicks, swaps page content, handles back/forward.
 */

import { pageExit, pageEnter } from './utils/transitions.js';
import { destroyParticles } from './components/particles.js';
import { showLoader, hideLoader } from './components/loader.js';

const META = {
  '/':         { title: 'Michael Mgbah — Backend Developer & Entrepreneur', desc: 'CEO of Lymora. Building products that solve real problems.' },
  '/about':    { title: 'About',    desc: 'The story behind the developer.' },
  '/projects': { title: 'Projects', desc: 'Selected work in web development and product.' },
  '/services': { title: 'Services', desc: 'Backend development, API design, database architecture, and product consulting.' },
  '/lymora':   { title: 'Lymora',   desc: 'The company I built. Academic operating system.' },
  '/contact':  { title: 'Contact',  desc: 'Book a call or send a message.' },
};

export class Router {
  constructor() {
    this.routes = {
      '/':         () => import('./pages/home.js'),
      '/about':    () => import('./pages/about.js'),
      '/projects': () => import('./pages/projects.js'),
      '/services': () => import('./pages/services.js'),
      '/lymora':   () => import('./pages/lymora.js'),
      '/contact':  () => import('./pages/contact.js'),
    };

    this._firstLoad = true;
    this._onClick = this._onClick.bind(this);
    this._onPopState = this._onPopState.bind(this);
  }

  init() {
    // Intercept all clicks at the document level
    document.addEventListener('click', this._onClick);

    // Handle browser back/forward
    window.addEventListener('popstate', this._onPopState);

    // Render the initial route
    this.navigate(window.location.pathname, false);
  }

  async navigate(path, pushState = true) {
    // Normalise path — strip trailing slash except for root
    const normPath = path.length > 1 ? path.replace(/\/$/, '') : path;
    const route = this.routes[normPath];

    // Show loader for all navigations except the very first page load
    const isFirstLoad = this._firstLoad;
    this._firstLoad = false;
    if (!isFirstLoad) showLoader();

    // Destroy particles before leaving any page (no-op if not on home)
    destroyParticles();

    await pageExit();

    const appEl = document.getElementById('app');

    if (!route) {
      if (pushState) history.pushState({}, '', normPath);
      appEl.innerHTML = this._notFound(normPath);
      this._updateMeta(normPath);
      window.dispatchEvent(new CustomEvent('routechange', { detail: { path: normPath } }));
      hideLoader();
      await pageEnter();
      return;
    }

    if (pushState) history.pushState({}, '', normPath);

    try {
      const mod = await route();
      appEl.innerHTML = mod.render();
      this._updateMeta(normPath);
      // Dispatch before pageEnter so nav active state is correct as content fades in
      window.dispatchEvent(new CustomEvent('routechange', { detail: { path: normPath } }));
      hideLoader();
      await pageEnter();
      mod.init?.();
    } catch (err) {
      appEl.innerHTML = this._error();
      hideLoader();
      await pageEnter();
    }
  }

  _onClick(e) {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    // Only intercept same-origin, non-hash, non-external links
    if (
      link.origin !== window.location.origin ||
      link.hasAttribute('target') ||
      link.hasAttribute('download') ||
      href.startsWith('#') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:')
    ) return;

    e.preventDefault();
    if (link.pathname === window.location.pathname) return;
    this.navigate(link.pathname);
  }

  _onPopState() {
    this.navigate(window.location.pathname, false);
  }

  _updateMeta(path) {
    const meta = META[path] || META['/'];
    document.title = meta.title;
    const desc    = document.querySelector('meta[name="description"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (desc)    desc.setAttribute('content', meta.desc);
    if (ogTitle) ogTitle.setAttribute('content', meta.title);
  }

  _notFound(path) {
    return `
      <section class="page-container" style="padding-top: 160px; text-align: center;">
        <p class="text-muted" style="font-size: var(--text-sm); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: var(--space-md);">404</p>
        <h1 style="font-size: var(--text-2xl); margin-bottom: var(--space-md);">Page not found</h1>
        <p class="text-muted" style="margin-bottom: var(--space-lg);">Nothing at <code>${path}</code></p>
        <a href="/" style="color: var(--color-text); text-decoration: underline; text-underline-offset: 4px;">Go home</a>
      </section>
    `;
  }

  _error() {
    return `
      <section class="page-container" style="padding-top: 160px; text-align: center;">
        <p class="text-muted" style="font-size: var(--text-sm); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: var(--space-md);">Error</p>
        <h1 style="font-size: var(--text-2xl); margin-bottom: var(--space-md);">Something went wrong</h1>
        <a href="/" style="color: var(--color-text); text-decoration: underline; text-underline-offset: 4px;">Go home</a>
      </section>
    `;
  }
}

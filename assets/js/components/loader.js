/**
 * loader.js — Page transition loader
 * Displays a centered logo + CSS spinning ring overlay during route changes.
 */

let loaderEl = null;
let hideTimer = null;

function getLoader() {
  if (!loaderEl) {
    loaderEl = document.createElement('div');
    loaderEl.id = 'page-loader';
    loaderEl.className = 'page-loader';
    loaderEl.setAttribute('aria-hidden', 'true');
    loaderEl.innerHTML = `
      <div class="page-loader__inner">
        <div class="page-loader__ring"></div>
        <img src="/assets/images/profile/logo.svg" alt="" class="page-loader__logo">
      </div>
    `;
    document.body.appendChild(loaderEl);
  }
  return loaderEl;
}

export function showLoader() {
  clearTimeout(hideTimer);
  const el = getLoader();
  // Use rAF to ensure the element is in the DOM before adding the class
  requestAnimationFrame(() => el.classList.add('is-visible'));
}

export function hideLoader() {
  const el = getLoader();
  el.classList.remove('is-visible');
}

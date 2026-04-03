/**
 * toast.js — Lightweight toast notification system
 * Usage: showToast('Message sent!', 'success')
 *        showToast('Something went wrong.', 'error')
 */

let container = null;

function getContainer() {
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    container.setAttribute('aria-live', 'polite');
    container.setAttribute('aria-atomic', 'false');
    document.body.appendChild(container);
  }
  return container;
}

/**
 * @param {string} message  — Text to display
 * @param {'success'|'error'|'info'} type — Visual style
 * @param {number} duration — Auto-dismiss delay in ms (default 4000)
 */
export function showToast(message, type = 'success', duration = 4000) {
  const c = getContainer();

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.setAttribute('role', 'status');

  const iconMap = {
    success: 'ph-check-circle',
    error:   'ph-x-circle',
    info:    'ph-info',
  };

  toast.innerHTML = `
    <i class="ph ${iconMap[type] || 'ph-info'}" aria-hidden="true"></i>
    <span>${message}</span>
  `;

  c.appendChild(toast);

  // Trigger entrance animation on next frame
  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('is-visible'));
  });

  // Auto-dismiss
  setTimeout(() => {
    toast.classList.remove('is-visible');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
    // Fallback removal in case transitionend doesn't fire
    setTimeout(() => toast.remove(), 400);
  }, duration);
}

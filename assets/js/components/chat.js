/**
 * chat.js — Floating Action Button (FAB)
 * Single trigger button (bottom-right) → two options:
 *   • Hire Me       → wa.me pre-filled link (new tab)
 *   • Start a Chat  → opens Smartsupp live chat
 */

export function initChat() {
  const container = document.getElementById('chat-widget');
  if (!container) return;

  const phone  = window.WHATSAPP_NUMBER || '';
  const waText = encodeURIComponent("Hi Michael, I'd like to hire you for a project.");
  const waUrl  = `https://wa.me/${phone}?text=${waText}`;

  container.innerHTML = `
    <div class="fab" id="fab" aria-label="Contact options" aria-expanded="false">
      <div class="fab__menu" id="fab-menu" aria-hidden="true">
        <a class="fab__option" href="${waUrl}" target="_blank" rel="noopener noreferrer">Hire Me</a>
        <button class="fab__option" id="fab-chat-btn" type="button">Start a Chat</button>
      </div>
      <button class="fab__trigger" id="fab-trigger" type="button" aria-label="Open contact menu">
        <i class="ph ph-chat-circle-dots fab__icon fab__icon--chat" aria-hidden="true"></i>
        <i class="ph ph-x fab__icon fab__icon--close" aria-hidden="true"></i>
      </button>
    </div>
  `;

  const fab     = document.getElementById('fab');
  const trigger = document.getElementById('fab-trigger');
  const menu    = document.getElementById('fab-menu');
  const chatBtn = document.getElementById('fab-chat-btn');

  function open() {
    fab.classList.add('is-open');
    fab.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');
  }

  function close() {
    fab.classList.remove('is-open');
    fab.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
  }

  trigger.addEventListener('click', () => {
    fab.classList.contains('is-open') ? close() : open();
  });

  chatBtn.addEventListener('click', () => {
    close();
    document.body.classList.add('smartsupp-open');
    // chat:open requires a paid Smartsupp plan; CSS fallback ensures button is visible
    if (typeof smartsupp === 'function') smartsupp('chat:open');
  });

  // Hide Smartsupp widget again when user closes it
  if (typeof smartsupp === 'function') {
    smartsupp('on', 'messenger_close', () => {
      document.body.classList.remove('smartsupp-open');
    });
  }

  document.addEventListener('click', (e) => {
    if (!fab.contains(e.target)) close();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}

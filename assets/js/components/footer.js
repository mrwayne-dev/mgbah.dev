/**
 * footer.js — Global site footer
 * 3-column layout: brand | nav | quick-message form
 * Mounted once into #site-footer (outside #app) so it persists across all routes.
 */

export function initFooter() {
  const footer = document.getElementById('site-footer');
  if (!footer) return;

  footer.innerHTML = `
    <div class="footer__inner container">

      <!-- Col 1: Brand -->
      <div class="footer__brand">
        <a href="/" class="footer__logo">mgbah.</a>
        <p class="footer__tagline">
          Backend developer &amp; entrepreneur<br>
          building software, running a company.
        </p>
        <div class="footer__socials">
          <a href="https://github.com/mrwayne-dev" target="_blank" rel="noopener noreferrer"
             aria-label="GitHub" class="footer__social-link">
            <i class="ph ph-github-logo"></i>
          </a>
          <a href="https://x.com/_mgbah" target="_blank" rel="noopener noreferrer"
             aria-label="Twitter / X" class="footer__social-link">
            <i class="ph ph-x-logo"></i>
          </a>
          <a href="https://www.instagram.com/_mgbah/" target="_blank" rel="noopener noreferrer"
             aria-label="Instagram" class="footer__social-link">
            <i class="ph ph-instagram-logo"></i>
          </a>
        </div>
      </div>

      <!-- Col 2: Navigation -->
      <nav class="footer__nav" aria-label="Footer navigation">
        <p class="footer__nav-heading">Navigation</p>
        <ul class="footer__nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/projects">Projects</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/lymora">Lymora</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>

      <!-- Col 3: Quick message form -->
      <div class="footer__contact">
        <p class="footer__nav-heading">Quick message</p>
        <form class="footer__form" id="footer-quick-form" novalidate>
          <input
            type="text"
            class="footer__form-input"
            name="name"
            placeholder="Your name"
            required
            autocomplete="name"
          >
          <input
            type="email"
            class="footer__form-input"
            name="email"
            placeholder="your@email.com"
            required
            autocomplete="email"
          >
          <textarea
            class="footer__form-textarea"
            name="message"
            placeholder="Your message..."
            rows="3"
            required
          ></textarea>
          <button type="submit" class="btn btn-primary footer__form-submit">Send message</button>
          <p class="footer__form-feedback" id="footer-form-feedback" aria-live="polite"></p>
        </form>
      </div>

    </div>

    <!-- Bottom bar -->
    <div class="footer__bottom">
      <div class="container footer__bottom-inner">
        <p class="footer__copy">
          &copy; ${new Date().getFullYear()} Michael Mgbah. All rights reserved.
        </p>
        <p class="footer__quote">&ldquo;i am a man of fortune and i must seek my fortune&rdquo;</p>
      </div>
    </div>
  `;

  // ── Quick-form submit handler ───────────────────────────────────────────────
  const form     = document.getElementById('footer-quick-form');
  const feedback = document.getElementById('footer-form-feedback');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form));

    // Basic client-side validation
    if (!data.name.trim() || !data.email.trim() || !data.message.trim()) {
      showFeedback('Please fill in all fields.', 'error');
      return;
    }

    const submitBtn = form.querySelector('[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    try {
      const res = await fetch('/api/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (json.success) {
        form.innerHTML = `<p class="footer__form-success">
          <i class="ph ph-check-circle"></i> Message sent. I'll be in touch soon.
        </p>`;
      } else {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send message';
        showFeedback(json.message || 'Something went wrong. Try again.', 'error');
      }
    } catch {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send message';
      showFeedback('Network error. Please try again.', 'error');
    }
  });

  function showFeedback(msg, type) {
    if (!feedback) return;
    feedback.textContent = msg;
    feedback.className = `footer__form-feedback footer__form-feedback--${type}`;
  }
}

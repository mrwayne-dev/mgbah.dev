/**
 * contact.js — Contact page
 * Sections: Header → Two-column (info + Cal.com) → Contact form
 * Form: client-side validation → fetch POST → success/error states
 */

import { showToast } from '../components/toast.js';

// ── Validation helpers ────────────────────────────────────────────────────

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ── Render ────────────────────────────────────────────────────────────────

export function render() {
  return `
    <section class="page-container" aria-label="Contact">

      <!-- Header -->
      <header style="padding-top: var(--space-xl); margin-bottom: var(--space-xl);">
        <p class="section-label fade-in">• Let&rsquo;s Talk</p>
        <h1
          style="font-size: clamp(var(--text-2xl), 5vw, var(--text-4xl));
                 letter-spacing: -0.03em; line-height: 1.05;"
          class="fade-up"
        >Start a conversation.</h1>
      </header>

      <!-- Two-column: info + Cal.com -->
      <div class="contact-layout">

        <!-- Left — availability, email, socials -->
        <div class="contact-info fade-up">
          <div class="contact-info__availability">
            <span class="contact-info__dot" aria-hidden="true"></span>
            Available for new projects
          </div>

          <p class="contact-info__body">
            I work with founders and small teams who need backend engineering
            done properly: APIs, databases, full-stack builds. If the
            problem is worth solving, I want to hear about it.
          </p>

          <a
            href="mailto:michael@mgbah.dev"
            class="contact-info__email"
            aria-label="Email Michael at michael@mgbah.dev"
          >michael@mgbah.dev</a>

          <nav class="contact-social" aria-label="Social links">
            <a
              href="https://x.com/_mgbah"
              target="_blank"
              rel="noopener noreferrer"
              class="contact-social__link"
              aria-label="Michael on X (Twitter)"
            ><i class="ph ph-x-logo" aria-hidden="true"></i></a>

            <a
              href="https://github.com/mrwayne-dev"
              target="_blank"
              rel="noopener noreferrer"
              class="contact-social__link"
              aria-label="Michael on GitHub"
            ><i class="ph ph-github-logo" aria-hidden="true"></i></a>

            <a
              href="https://www.instagram.com/_mgbah/"
              target="_blank"
              rel="noopener noreferrer"
              class="contact-social__link"
              aria-label="Michael on Instagram"
            ><i class="ph ph-instagram-logo" aria-hidden="true"></i></a>
          </nav>
        </div>

        <!-- Right — Cal.com embed -->
        <div class="cal-embed-wrapper fade-up">
          <p class="cal-embed-wrapper__label">• Book a call</p>
          <h2 class="cal-embed-wrapper__heading">30 minutes. No agenda needed.</h2>
          <p class="cal-embed-wrapper__desc">
            Pick a time that works for you. We&rsquo;ll talk about your project,
            your stack, or whatever you&rsquo;re building.
          </p>
          <button
            class="btn btn-primary"
            data-cal-namespace="30min"
            data-cal-link="mgbah/30min"
            data-cal-config='{"theme":"dark"}'
            aria-label="Book a 30-minute call with Michael"
            style="align-self: flex-start;"
          >Book a Call</button>
        </div>

      </div>

      <!-- Contact form -->
      <div class="contact-form" id="contact-form-section">
        <h2 class="contact-form__heading">Or send a message</h2>

        <form id="contact-form" novalidate aria-label="Contact form">
          <div class="form-fields form-fields--row">
            <div class="form-field">
              <label for="contact-name">Name</label>
              <input
                type="text"
                id="contact-name"
                name="name"
                placeholder="Your name"
                autocomplete="name"
                required
              >
            </div>
            <div class="form-field">
              <label for="contact-email">Email</label>
              <input
                type="email"
                id="contact-email"
                name="email"
                placeholder="your@email.com"
                autocomplete="email"
                required
              >
            </div>
          </div>

          <div class="form-fields">
            <div class="form-field">
              <label for="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                rows="6"
                placeholder="What are you working on?"
                required
              ></textarea>
            </div>
          </div>

          <div class="form-feedback form-feedback--error" id="form-error" role="alert" aria-live="polite"></div>

          <button type="submit" class="btn btn-primary" id="form-submit">
            Send Message
          </button>
        </form>
      </div>

      <!-- Success state — shown after form submit -->
      <div class="contact-success" id="contact-success" aria-live="polite">
        <div class="contact-success__icon" aria-hidden="true">
          <i class="ph ph-check-circle"></i>
        </div>
        <h2 class="contact-success__heading">Message sent.</h2>
        <p class="contact-success__text">
          I&rsquo;ll get back to you shortly. Check your inbox for a confirmation.
        </p>
      </div>

    </section>
  `;
}

// ── Init ─────────────────────────────────────────────────────────────────

export function init() {
  const form       = document.getElementById('contact-form');
  const submitBtn  = document.getElementById('form-submit');
  const errorBox   = document.getElementById('form-error');
  const successBox = document.getElementById('contact-success');
  const formSection = document.getElementById('contact-form-section');

  if (!form) return;

  // ── Form submit handler ────────────────────────────────────────────────
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameEl    = document.getElementById('contact-name');
    const emailEl   = document.getElementById('contact-email');
    const messageEl = document.getElementById('contact-message');

    const name    = nameEl.value.trim();
    const email   = emailEl.value.trim();
    const message = messageEl.value.trim();

    // Clear previous states
    clearError();
    [nameEl, emailEl, messageEl].forEach(el => el.classList.remove('is-invalid'));

    // Client-side validation
    if (!name) {
      showError('Please enter your name.', nameEl);
      return;
    }
    if (!email) {
      showError('Please enter your email address.', emailEl);
      return;
    }
    if (!isValidEmail(email)) {
      showError('Please provide a valid email address.', emailEl);
      return;
    }
    if (!message) {
      showError('Please enter a message.', messageEl);
      return;
    }

    // Loading state
    setLoading(true);

    try {
      const response = await fetch('/api/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      // Guard: non-JSON or non-200 from server
      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        throw new Error('Unexpected server response.');
      }

      const data = await response.json();

      if (data.status === 'success') {
        showToast("Message sent. I'll be in touch.", 'success');
        showSuccess();
      } else {
        const msg = data.message || 'Something went wrong. Please try again.';
        showError(msg);
        showToast(msg, 'error');
      }
    } catch {
      const msg = 'Unable to send message. Check your connection and try again.';
      showError(msg);
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  });

  // ── Cal.com re-init on dynamically rendered buttons ────────────────────
  if (typeof Cal !== 'undefined' && Cal.ns?.['30min']) {
    Cal.ns['30min']('ui', { theme: 'dark', hideEventTypeDetails: false, layout: 'month_view' });
  }

  // ── Scroll entrance animations ─────────────────────────────────────────
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  document.querySelectorAll('[aria-label="Contact"] .fade-up, [aria-label="Contact"] .fade-in')
    .forEach(el => observer.observe(el));

  // ── Helpers ───────────────────────────────────────────────────────────

  function setLoading(loading) {
    submitBtn.disabled = loading;
    submitBtn.innerHTML = loading
      ? '<span class="btn-spinner" aria-hidden="true"></span>Sending…'
      : 'Send Message';
  }

  function showError(msg, fieldEl = null) {
    errorBox.textContent = msg;
    errorBox.classList.add('is-visible');
    if (fieldEl) {
      fieldEl.classList.add('is-invalid');
      fieldEl.focus();
    }
  }

  function clearError() {
    errorBox.textContent = '';
    errorBox.classList.remove('is-visible');
  }

  function showSuccess() {
    formSection.style.display = 'none';
    successBox.classList.add('is-visible');
    successBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

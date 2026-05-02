import { TEMPLATES_DATA } from '../data/templates.js';

function cardHTML(tpl) {
  return `
    <article class="project-card fade-up" style="cursor:default;">
      <div class="project-card__image-wrap" style="background:${tpl.accentColor};aspect-ratio:unset;height:140px;position:relative;overflow:hidden;">
        <div style="position:absolute;inset:0;background:linear-gradient(145deg,${tpl.accentColor} 0%,rgba(0,0,0,0.55) 100%);"></div>
        <div style="position:absolute;inset:0;padding:var(--space-lg);display:flex;flex-direction:column;justify-content:flex-end;gap:4px;">
          <p style="margin:0;font-size:var(--text-xs);color:rgba(255,255,255,0.6);text-transform:uppercase;letter-spacing:0.08em;">${tpl.category}</p>
          <h3 style="margin:0;font-size:var(--text-xl);font-weight:700;color:#fff;line-height:1.1;">${tpl.name}</h3>
        </div>
      </div>
      <div class="project-card__body">
        <p style="margin:0 0 var(--space-md);font-size:var(--text-xs);display:inline-block;padding:3px 10px;border:1px solid var(--color-border);color:var(--color-text-dim);text-transform:uppercase;letter-spacing:0.06em;">${tpl.niche}</p>
        <p class="project-card__desc">${tpl.description}</p>
        <a href="/templates/${tpl.slug}" class="link-arrow" style="font-size:var(--text-xs);letter-spacing:0.04em;" aria-label="Preview ${tpl.name} template">Preview &rarr;</a>
      </div>
    </article>
  `;
}

export function render() {
  return `
    <section class="page-container" aria-label="Templates">

      <header style="padding-top:var(--space-xl);margin-bottom:var(--space-xl);max-width:600px;">
        <p class="text-muted fade-up" style="font-size:var(--text-sm);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:var(--space-sm);">Templates</p>
        <h1 class="fade-up" style="font-size:clamp(2rem,5vw,3.5rem);line-height:1.1;margin-bottom:var(--space-md);">Landing pages,<br>ready to go.</h1>
        <p class="text-muted fade-up" style="font-size:var(--text-base);line-height:1.7;">
          Bespoke website templates built for different industries. Each one is production-ready, drop in your content and ship.
        </p>
      </header>

      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:var(--space-lg);padding-bottom:var(--space-2xl);">
        ${TEMPLATES_DATA.map(cardHTML).join('')}
      </div>

    </section>

    <section style="border-top:1px solid var(--color-border);padding:var(--space-xl) 0 var(--space-2xl);" aria-label="Beyond the landing page">
      <div class="container">
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:clamp(var(--space-xl),6vw,var(--space-2xl));align-items:start;">

          <div>
            <p class="section-label fade-up">• Beyond the landing page</p>
            <h2 style="font-size:clamp(var(--text-xl),3vw,var(--text-3xl));font-weight:400;letter-spacing:-0.03em;line-height:1.15;margin-bottom:var(--space-lg);" class="fade-up">The design is<br>the front door.</h2>
            <p class="text-muted fade-up" style="font-size:var(--text-base);line-height:1.75;margin-bottom:var(--space-md);">
              Every template here can be built as a complete business system, engineered specifically for the industry it serves. The landing page is how your customers find you. What sits behind it is how your business actually runs.
            </p>
            <p class="text-muted fade-up" style="font-size:var(--text-base);line-height:1.75;margin-bottom:var(--space-lg);">
              Booking engines, automated client workflows, payment processing, admin dashboards — all designed around the niche. Not generic software with your logo on it. Built for your operation, from scratch.
            </p>
            <a href="/contact" class="link-arrow fade-up" style="font-size:var(--text-sm);letter-spacing:0.04em;">Discuss your build &rarr;</a>
          </div>

          <div class="fade-up" style="display:flex;flex-direction:column;border-top:1px solid var(--color-border);">
            ${[
              ['Booking & Scheduling',       'Online appointment flows, real-time availability, automated confirmations, and calendar sync.'],
              ['Automated Communications',   'WhatsApp, SMS, and email workflows that fire on client actions — bookings, reminders, follow-ups.'],
              ['Payments & Invoicing',        'End-to-end payment collection, instalment plans, invoice generation, and Paystack / Flutterwave integration.'],
              ['Admin & Management Dashboards', 'Custom back-office interfaces built for your team\'s workflow — not an off-the-shelf CMS dropped in.'],
              ['CRM & Lead Management',       'Capture, qualify, and follow up on every enquiry automatically. No lead goes cold.'],
            ].map(([title, desc]) => `
              <div style="padding:var(--space-md) 0;border-bottom:1px solid var(--color-border);display:flex;gap:var(--space-md);align-items:baseline;">
                <i class="ph ph-arrow-right" style="font-size:var(--text-xs);color:var(--color-text-dim);flex-shrink:0;margin-top:2px;" aria-hidden="true"></i>
                <div>
                  <p style="font-size:var(--text-sm);font-weight:600;margin-bottom:4px;color:var(--color-text);">${title}</p>
                  <p class="text-muted" style="font-size:var(--text-sm);line-height:1.65;">${desc}</p>
                </div>
              </div>
            `).join('')}
          </div>

        </div>
      </div>
    </section>

    <section class="cta-banner-section" aria-label="Call to action">
      <div class="container">
        <div class="cta-banner fade-up">
          <div class="cta-banner__content">
            <h2 class="cta-banner__heading">Want one<br>for your business?</h2>
            <p class="cta-banner__sub">These are built from scratch, designed for the niche. Yours can be next.</p>
            <button
              class="btn btn-primary"
              style="margin-top:var(--space-lg);"
              data-cal-namespace="30min"
              data-cal-link="mgbah/30min"
              data-cal-config='{"theme":"dark"}'
              aria-label="Book a 30-minute call with Michael"
            >Book a Call</button>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function init() {}

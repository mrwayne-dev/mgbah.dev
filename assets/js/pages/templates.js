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

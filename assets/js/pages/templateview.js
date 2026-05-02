import { TEMPLATES_DATA } from '../data/templates.js';

export function render(slug) {
  const tpl = TEMPLATES_DATA.find(t => t.slug === slug);

  if (!tpl) {
    return `
      <section class="page-container" style="padding-top:160px;text-align:center;">
        <p class="text-muted" style="font-size:var(--text-sm);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:var(--space-md);">404</p>
        <h1 style="font-size:var(--text-2xl);margin-bottom:var(--space-md);">Template not found</h1>
        <a href="/templates" style="color:var(--color-text);text-decoration:underline;text-underline-offset:4px;">Back to templates</a>
      </section>
    `;
  }

  return `
    <div style="display:flex;flex-direction:column;padding-top:80px;">

      <div id="template-bar" style="display:flex;align-items:center;justify-content:space-between;padding:0 var(--space-lg);height:52px;border-bottom:1px solid var(--color-border);background:var(--color-bg);flex-shrink:0;gap:var(--space-md);">
        <a href="/templates" style="display:flex;align-items:center;gap:6px;color:var(--color-text-muted);font-size:var(--text-sm);text-decoration:none;white-space:nowrap;flex-shrink:0;" aria-label="Back to templates">
          <i class="ph ph-arrow-left" aria-hidden="true"></i>
          Templates
        </a>

        <div style="display:flex;align-items:center;gap:var(--space-sm);overflow:hidden;">
          <span style="font-size:11px;padding:2px 8px;border:1px solid var(--color-border);color:var(--color-text-dim);text-transform:uppercase;letter-spacing:0.06em;white-space:nowrap;flex-shrink:0;">${tpl.niche}</span>
        </div>

        <a href="/templates/${tpl.slug}/preview" target="_blank" rel="noopener noreferrer"
           style="display:flex;align-items:center;gap:6px;font-size:var(--text-sm);color:var(--color-text-muted);text-decoration:none;border:1px solid var(--color-border);padding:6px 14px;white-space:nowrap;flex-shrink:0;transition:color 0.15s,border-color 0.15s;"
           onmouseover="this.style.color='var(--color-text)';this.style.borderColor='var(--color-text-dim)';"
           onmouseout="this.style.color='var(--color-text-muted)';this.style.borderColor='var(--color-border)';">
          Open <i class="ph ph-arrow-square-out" aria-hidden="true"></i>
        </a>
      </div>

      <iframe
        id="template-frame"
        src="/templates/${tpl.slug}/preview"
        title="${tpl.business} — ${tpl.niche} template preview"
        style="width:100%;border:none;display:block;"
        loading="lazy"
      ></iframe>

    </div>
  `;
}

export function init(slug) {
  const tpl = TEMPLATES_DATA.find(t => t.slug === slug);
  if (!tpl) return;

  document.title = `${tpl.name} Template | Michael Mgbah`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', tpl.description);

  function setFrameHeight() {
    const frameEl = document.getElementById('template-frame');
    if (!frameEl) return;
    const top = frameEl.getBoundingClientRect().top;
    frameEl.style.height = `${window.innerHeight - top}px`;
  }

  setFrameHeight();
  window.addEventListener('resize', setFrameHeight);

  const fab = document.getElementById('fab');
  if (fab) fab.classList.add('fab--left');

  window.addEventListener('routechange', () => {
    window.removeEventListener('resize', setFrameHeight);
    if (fab) fab.classList.remove('fab--left');
  }, { once: true });
}

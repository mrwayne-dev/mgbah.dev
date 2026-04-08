<?php
require_once __DIR__ . '/config/env.php';
require_once __DIR__ . '/config/constants.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Michael Mgbah — Full Stack Developer &amp; Founder</title>

  <!-- SEO -->
  <meta name="description" content="Michael Mgbah — backend-leaning full stack developer and founder of Lymora. Five years building products that solve real problems.">
  <meta name="robots" content="index, follow">

  <!-- Open Graph -->
  <meta property="og:title" content="Michael Mgbah">
  <meta property="og:description" content="Backend-leaning full stack developer and founder of Lymora. Five years building products that solve real problems.">
  <meta property="og:image" content="/assets/images/profile/og-image.jpg">
  <meta property="og:url" content="https://mgbah.dev">
  <meta property="og:type" content="website"
  <meta property="og:site_name" content="mgbah.dev"

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Michael Mgbah">
  <meta name="twitter:description" content="Backend-leaning full stack developer and founder of Lymora. Five years building products that solve real problems.">
  <meta name="twitter:image" content="/assets/images/profile/og-image.jpg">

  <!-- Theme -->
  <meta name="theme-color" content="#0a0a0a">

  <!-- Canonical -->
  <link rel="canonical" href="https://mgbah.dev">

  <!-- Favicons -->
  <link rel="icon" type="image/x-icon" href="/assets/favicon/favicon.ico">
  <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon/favicon-16x16.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon/favicon-32x32.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="192x192" href="/assets/favicon/android-chrome-192x192.png">
  <link rel="icon" type="image/png" sizes="512x512" href="/assets/favicon/android-chrome-512x512.png">
  <link rel="manifest" href="/assets/favicon/site.webmanifest">

  <!-- Font Preloads -->
  <link rel="preload" href="/assets/fonts/HostGrotesk-Regular.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/assets/fonts/HostGrotesk-Bold.woff2" as="font" type="font/woff2" crossorigin>

  <!-- Google Fonts — DM Sans (body/UI text) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap" rel="stylesheet">

  <!-- CSS -->
  <link rel="stylesheet" href="/assets/css/main.css">
  <link rel="stylesheet" href="/assets/css/layout.css">
  <link rel="stylesheet" href="/assets/css/components.css">
  <link rel="stylesheet" href="/assets/css/animations.css">

  <!-- Phosphor Icons CDN -->
  <script src="https://unpkg.com/@phosphor-icons/web" defer></script>

  <!-- Cal.com Embed -->
  <script type="text/javascript">
    (function (C, A, L) {
      let p = function (a, ar) { a.q.push(ar); };
      let d = C.document;
      C.Cal = C.Cal || function () {
        let cal = C.Cal; let ar = arguments;
        if (!cal.loaded) {
          cal.ns = {}; cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = function () { p(api, arguments); };
          const namespace = ar[1]; api.q = api.q || [];
          typeof namespace === "string" ? (cal.ns[namespace] = api) && p(api, ar) : p(cal, ar);
          return;
        }
        p(cal, ar);
      };
    })(window, "https://app.cal.com/embed/embed.js", "init");
    Cal("init", "30min", { origin: "https://cal.com" });
  </script>
</head>
<body>

  <!-- Film grain overlay — purely decorative, pointer-events: none -->
  <div class="grain-overlay" aria-hidden="true"></div>

  <nav id="nav" aria-label="Main navigation"></nav>
  <main id="app" role="main"></main>
  <footer id="site-footer" aria-label="Site footer"></footer>
  <div id="chat-widget" aria-label="WhatsApp chat widget"></div>

  <!-- Expose PHP constants to JS -->
  <script>
    window.WHATSAPP_NUMBER = '<?= htmlspecialchars(WHATSAPP_NUMBER ?: '', ENT_QUOTES, 'UTF-8') ?>';
  </script>

  <!-- CDN Libraries — must load before app.js -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/tsparticles@2/tsparticles.bundle.min.js"></script>

  <!-- App Entry Point -->
  <script type="module" src="/assets/js/app.js"></script>

  <!-- In Development Modal — global overlay (desktop: centered card / mobile: bottom drawer) -->
  <div class="dev-modal-overlay" id="dev-modal-overlay" aria-hidden="true">
    <div class="dev-modal" id="dev-modal" role="dialog" aria-modal="true">
      <!-- Drag handle — visible on mobile bottom drawer only -->
      <div class="dev-modal__drag-indicator" aria-hidden="true"></div>
      <div class="dev-modal__header">
        <div class="dev-modal__icon" aria-hidden="true">
          <i class="ph ph-clock-countdown"></i>
        </div>
        <button class="dev-modal__close" id="dev-modal-close" aria-label="Close">
          <i class="ph ph-x"></i>
        </button>
      </div>
      <h2 class="dev-modal__heading">In development.</h2>
      <p class="dev-modal__text">
        Just chill a little before I blow your mind.
      </p>
    </div>
  </div>

  <!-- Smartsupp Live Chat (widget button hidden — driven by custom FAB) -->
  <script type="text/javascript">
    var _smartsupp = _smartsupp || {};
    _smartsupp.key = '8604e1f3d52e82c8509be5f26cd8e291fe7cb0ed';
    window.smartsupp||(function(d) {
      var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
      s=d.getElementsByTagName('script')[0];c=d.createElement('script');
      c.type='text/javascript';c.charset='utf-8';c.async=true;
      c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
    })(document);
  </script>
  <noscript>Powered by <a href="https://www.smartsupp.com" target="_blank">Smartsupp</a></noscript>

</body>
</html>

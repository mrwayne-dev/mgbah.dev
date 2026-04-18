#!/bin/bash
# Concatenate + minify CSS source files into bundle.css
# Run after editing any CSS file, then bump ASSET_VERSION in config/constants.php
cat assets/css/main.css \
    assets/css/layout.css \
    assets/css/components.css \
    assets/css/animations.css \
    > /tmp/css-raw.css

python3 - <<'EOF'
import re, sys
css = open('/tmp/css-raw.css').read()
original = len(css)
css = re.sub(r'/\*[\s\S]*?\*/', '', css)
css = re.sub(r'\s+', ' ', css)
css = re.sub(r'\s*([{}:;,>~+])\s*', r'\1', css)
css = re.sub(r';\s*}', '}', css)
css = css.strip()
open('assets/css/bundle.css','w').write(css)
print(f'bundle.css rebuilt: {original:,} → {len(css):,} bytes ({100*(original-len(css))//original}% reduction)')
EOF

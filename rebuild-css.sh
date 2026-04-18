#!/bin/bash
# Concatenate the 4 CSS source files into bundle.css
# Run this after editing any CSS file, then bump ASSET_VERSION in config/constants.php
cat assets/css/main.css \
    assets/css/layout.css \
    assets/css/components.css \
    assets/css/animations.css \
    > assets/css/bundle.css
echo "bundle.css rebuilt ($(wc -c < assets/css/bundle.css) bytes)"

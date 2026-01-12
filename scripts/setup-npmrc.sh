#!/bin/bash

# Setup .npmrc auth tokens for premium packages (Hugeicons PRO, Untitled UI)
# This script runs before pnpm install on Vercel

set -e

NPMRC_FILE=".npmrc"

# Create .npmrc with required configuration
cat > "$NPMRC_FILE" << EOF
enable-pre-post-scripts=true
auto-install-peers=true
strict-peer-dependencies=false
@untitledui-pro:registry=https://pkg.untitledui.com
//pkg.untitledui.com/:_authToken=${UNTITLEDUI_AUTH_TOKEN:-}
@hugeicons-pro:registry=https://npm.hugeicons.com/
//npm.hugeicons.com/:_authToken=${HUGEICONS_AUTH_TOKEN:-}
EOF

echo "Created .npmrc"

# Warn if tokens are missing
if [ -z "$HUGEICONS_AUTH_TOKEN" ]; then
  echo "Warning: HUGEICONS_AUTH_TOKEN not set"
fi

if [ -z "$UNTITLEDUI_AUTH_TOKEN" ]; then
  echo "Warning: UNTITLEDUI_AUTH_TOKEN not set"
fi

echo "npmrc setup complete"

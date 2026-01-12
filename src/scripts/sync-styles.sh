#!/bin/bash

# =============================================================================
# SYNC STYLES FROM PAYVA FRONTEND TO SKWIRCLE
# =============================================================================
#
# Purpose: Keep Skwircle styles in sync with PAYVA frontend
# Usage: ./scripts/sync-styles.sh
#
# This script copies:
# - theme.css (semantic design tokens)
# - base.css (browser resets)
# - All utility CSS files
#
# NOTE: Does NOT sync components or sensitive data
# =============================================================================

set -e

# Configuration
FRONTEND_STYLES="/Users/derickfiebiger/Payva-Repos/front-end/src/styles"
SKWIRCLE_STYLES="/Users/derickfiebiger/Payva-Repos/demo-repo/src/styles"

echo "🎨 Syncing styles from PAYVA frontend to demo-repo..."
echo ""

# Sync theme.css
echo "  → Copying theme.css..."
cp "$FRONTEND_STYLES/theme.css" "$SKWIRCLE_STYLES/theme.css"

# Sync base.css
echo "  → Copying base.css..."
cp "$FRONTEND_STYLES/base.css" "$SKWIRCLE_STYLES/base.css"

# Sync utility files
echo "  → Copying utilities..."
UTILITIES=(
  "colors.css"
  "borders.css"
  "corners.css"
  "rings.css"
  "outlines.css"
  "typography.css"
  "animations.css"
  "depth.css"
  "gradients.css"
  "shine.css"
  "misc.css"
  "components-overrides.css"
  "silk-styles.css"
)

for file in "${UTILITIES[@]}"; do
  if [ -f "$FRONTEND_STYLES/utilities/$file" ]; then
    cp "$FRONTEND_STYLES/utilities/$file" "$SKWIRCLE_STYLES/utilities/$file"
    echo "     ✓ $file"
  else
    echo "     ⚠ $file not found in frontend"
  fi
done

echo ""
echo "✅ Style sync complete!"
echo ""
echo "Files synced:"
echo "  - theme.css ($(wc -l < "$SKWIRCLE_STYLES/theme.css" | tr -d ' ') lines)"
echo "  - base.css"
echo "  - ${#UTILITIES[@]} utility files"
echo ""
echo "Next steps:"
echo "  1. Run 'pnpm dev' to verify styles work"
echo "  2. Check /playground for visual verification"
echo "  3. Commit changes if everything looks good"

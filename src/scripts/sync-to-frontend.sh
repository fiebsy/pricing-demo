#!/bin/bash

# =============================================================================
# SYNC SKWIRCLE TO PAYVA FRONTEND
# =============================================================================
#
# Purpose: Copy Skwircle component updates to the PAYVA frontend repo
# Usage: ./scripts/sync-to-frontend.sh
#
# IMPORTANT: Demo-repo is the SOURCE OF TRUTH for Skwircle because:
#   1. Standalone definitions (no legacy squircle-legacy imports)
#   2. Stricter TypeScript types
#   3. Clean, isolated environment
#
# This script copies:
# - Core skwircle component (skwircle.tsx, types.ts, index.ts)
# - Config files (config/*) - including standalone gradients.ts
# - Core hooks (core/*)
# - Rendering utilities (rendering/*)
# - Utils (utils/*) - including standalone color-resolver.ts
#
# NOTE: Does NOT sync compounds/ - front-end may have custom compounds
#
# After running, verify with:
#   cd /Users/derickfiebiger/Payva-Repos/front-end && pnpm type-check
# =============================================================================

set -e

# Configuration
SKWIRCLE_SRC="/Users/derickfiebiger/Payva-Repos/demo-repo/src/v2/components/ui/skwircle"
FRONTEND_DEST="/Users/derickfiebiger/Payva-Repos/front-end/src/modules/design-system/v2/components/ui/custom/base/skwircle"

echo "🔷 Syncing demo-repo components to PAYVA frontend..."
echo ""
echo "  Source: $SKWIRCLE_SRC"
echo "  Dest:   $FRONTEND_DEST"
echo ""

# Verify source exists
if [ ! -d "$SKWIRCLE_SRC" ]; then
  echo "❌ Error: Source directory not found"
  exit 1
fi

# Verify destination exists
if [ ! -d "$FRONTEND_DEST" ]; then
  echo "❌ Error: Destination directory not found"
  exit 1
fi

# Sync core files
echo "  → Syncing core files..."
cp "$SKWIRCLE_SRC/skwircle.tsx" "$FRONTEND_DEST/skwircle.tsx"
cp "$SKWIRCLE_SRC/types.ts" "$FRONTEND_DEST/types.ts"
echo "     ✓ skwircle.tsx"
echo "     ✓ types.ts"

# Sync index.ts with path adjustment
cp "$SKWIRCLE_SRC/index.ts" "$FRONTEND_DEST/index.ts"
# Update import path in comment to match frontend structure
sed -i '' "s|@/v2/components/ui/skwircle|@/modules/design-system/v2/components/ui/custom/base/skwircle|g" "$FRONTEND_DEST/index.ts"
echo "     ✓ index.ts (with path adjustment)"

# Sync config directory
echo "  → Syncing config/..."
mkdir -p "$FRONTEND_DEST/config"
for file in "$SKWIRCLE_SRC/config/"*.ts; do
  if [ -f "$file" ]; then
    filename=$(basename "$file")
    cp "$file" "$FRONTEND_DEST/config/$filename"
    echo "     ✓ config/$filename"
  fi
done

# Sync core directory
echo "  → Syncing core/..."
mkdir -p "$FRONTEND_DEST/core"
for file in "$SKWIRCLE_SRC/core/"*.ts; do
  if [ -f "$file" ]; then
    filename=$(basename "$file")
    cp "$file" "$FRONTEND_DEST/core/$filename"
    echo "     ✓ core/$filename"
  fi
done

# Sync rendering directory
echo "  → Syncing rendering/..."
mkdir -p "$FRONTEND_DEST/rendering"
for file in "$SKWIRCLE_SRC/rendering/"*.ts "$SKWIRCLE_SRC/rendering/"*.tsx; do
  if [ -f "$file" ]; then
    filename=$(basename "$file")
    cp "$file" "$FRONTEND_DEST/rendering/$filename"
    echo "     ✓ rendering/$filename"
  fi
done

# Sync utils directory
echo "  → Syncing utils/..."
mkdir -p "$FRONTEND_DEST/utils"
for file in "$SKWIRCLE_SRC/utils/"*.ts; do
  if [ -f "$file" ]; then
    filename=$(basename "$file")
    cp "$file" "$FRONTEND_DEST/utils/$filename"
    echo "     ✓ utils/$filename"
  fi
done

echo ""
echo "✅ Skwircle sync complete!"
echo ""
echo "Files synced to frontend:"
echo "  - 3 core files (skwircle.tsx, types.ts, index.ts)"
echo "  - config/*.ts"
echo "  - core/*.ts"
echo "  - rendering/*.tsx"
echo "  - utils/*.ts"
echo ""
echo "⚠️  NOTE: compounds/ was NOT synced (front-end may have custom compounds)"
echo ""
echo "Next steps:"
echo "  1. cd /Users/derickfiebiger/Payva-Repos/front-end"
echo "  2. pnpm type-check to verify no breaking changes"
echo "  3. Test components in the app"
echo ""

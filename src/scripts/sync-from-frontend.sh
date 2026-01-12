#!/bin/bash

# =============================================================================
# SYNC SKWIRCLE FROM PAYVA FRONTEND TO DEMO-REPO
# =============================================================================
#
# Purpose: Pull Skwircle component updates from PAYVA frontend to demo-repo
# Usage: ./scripts/sync-from-frontend.sh
#
# IMPORTANT: Frontend is the SOURCE OF TRUTH for Skwircle.
#            Demo-repo inherits components from frontend for isolated testing.
#
# This script copies:
# - Core skwircle component (skwircle.tsx, types.ts, index.ts)
# - Config files (config/*)
# - Core hooks (core/*)
# - Rendering utilities (rendering/*)
# - Utils (utils/*)
# - Legacy dependencies:
#   - squircle-legacy/squircle/types.ts (type definitions)
#   - squircle-legacy/squircle/lib/constants.ts (gradient presets)
#   - squircle-legacy/squircle/lib/utils.ts (utilities)
#
# After running, verify with:
#   cd /Users/derickfiebiger/Payva-Repos/demo-repo && pnpm type-check
# =============================================================================

set -e

# Configuration
FRONTEND_BASE="/Users/derickfiebiger/Payva-Repos/front-end/src/modules/design-system/v2/components/ui/custom/base"
FRONTEND_SRC="$FRONTEND_BASE/skwircle"
FRONTEND_LEGACY_BASE="$FRONTEND_BASE/squircle-legacy/squircle"
FRONTEND_LEGACY_LIB="$FRONTEND_LEGACY_BASE/lib"

DEMO_BASE="/Users/derickfiebiger/Payva-Repos/demo-repo/src/v2/components/ui"
DEMO_DEST="$DEMO_BASE/skwircle"
DEMO_LEGACY_BASE="$DEMO_BASE/squircle-legacy/squircle"
DEMO_LEGACY_LIB="$DEMO_LEGACY_BASE/lib"

echo "🔷 Syncing Skwircle from PAYVA frontend to demo-repo..."
echo ""
echo "  Frontend Source: $FRONTEND_SRC"
echo "  Demo Dest:       $DEMO_DEST"
echo ""

# Verify source exists
if [ ! -d "$FRONTEND_SRC" ]; then
  echo "❌ Error: Frontend source directory not found"
  exit 1
fi

# Create destination directories
mkdir -p "$DEMO_DEST"
mkdir -p "$DEMO_DEST/config"
mkdir -p "$DEMO_DEST/core"
mkdir -p "$DEMO_DEST/rendering"
mkdir -p "$DEMO_DEST/utils"
mkdir -p "$DEMO_LEGACY_BASE"
mkdir -p "$DEMO_LEGACY_LIB"

# =============================================================================
# SYNC LEGACY DEPENDENCIES FIRST (required by skwircle imports)
# =============================================================================
echo "  → Syncing legacy dependencies..."

# types.ts at squircle level (required by lib/constants.ts)
if [ -f "$FRONTEND_LEGACY_BASE/types.ts" ]; then
  cp "$FRONTEND_LEGACY_BASE/types.ts" "$DEMO_LEGACY_BASE/types.ts"
  echo "     ✓ squircle-legacy/squircle/types.ts"
else
  echo "     ⚠ types.ts not found in frontend"
fi

# lib/constants.ts
if [ -f "$FRONTEND_LEGACY_LIB/constants.ts" ]; then
  cp "$FRONTEND_LEGACY_LIB/constants.ts" "$DEMO_LEGACY_LIB/constants.ts"
  echo "     ✓ squircle-legacy/squircle/lib/constants.ts"
else
  echo "     ⚠ constants.ts not found in frontend"
fi

# lib/utils.ts (required by types.ts)
if [ -f "$FRONTEND_LEGACY_LIB/utils.ts" ]; then
  cp "$FRONTEND_LEGACY_LIB/utils.ts" "$DEMO_LEGACY_LIB/utils.ts"
  echo "     ✓ squircle-legacy/squircle/lib/utils.ts"
else
  echo "     ⚠ utils.ts not found in frontend"
fi

# =============================================================================
# SYNC CORE FILES
# =============================================================================
echo "  → Syncing core files..."
cp "$FRONTEND_SRC/skwircle.tsx" "$DEMO_DEST/skwircle.tsx"
cp "$FRONTEND_SRC/types.ts" "$DEMO_DEST/types.ts"
echo "     ✓ skwircle.tsx"
echo "     ✓ types.ts"

# Sync index.ts with path adjustment for demo-repo
cp "$FRONTEND_SRC/index.ts" "$DEMO_DEST/index.ts"
sed -i '' "s|@/modules/design-system/v2/components/ui/custom/base/skwircle|@/v2/components/ui/skwircle|g" "$DEMO_DEST/index.ts"
echo "     ✓ index.ts (with path adjustment)"

# =============================================================================
# SYNC CONFIG DIRECTORY
# =============================================================================
echo "  → Syncing config/..."
for file in "$FRONTEND_SRC/config/"*.ts; do
  if [ -f "$file" ]; then
    filename=$(basename "$file")
    cp "$file" "$DEMO_DEST/config/$filename"
    echo "     ✓ config/$filename"
  fi
done

# =============================================================================
# SYNC CORE HOOKS DIRECTORY
# =============================================================================
echo "  → Syncing core/..."
for file in "$FRONTEND_SRC/core/"*.ts; do
  if [ -f "$file" ]; then
    filename=$(basename "$file")
    cp "$file" "$DEMO_DEST/core/$filename"
    echo "     ✓ core/$filename"
  fi
done

# =============================================================================
# SYNC RENDERING DIRECTORY
# =============================================================================
echo "  → Syncing rendering/..."
for file in "$FRONTEND_SRC/rendering/"*.ts "$FRONTEND_SRC/rendering/"*.tsx; do
  if [ -f "$file" ]; then
    filename=$(basename "$file")
    cp "$file" "$DEMO_DEST/rendering/$filename"
    echo "     ✓ rendering/$filename"
  fi
done

# =============================================================================
# SYNC UTILS DIRECTORY
# =============================================================================
echo "  → Syncing utils/..."
for file in "$FRONTEND_SRC/utils/"*.ts; do
  if [ -f "$file" ]; then
    filename=$(basename "$file")
    cp "$file" "$DEMO_DEST/utils/$filename"
    echo "     ✓ utils/$filename"
  fi
done

echo ""
echo "✅ Skwircle sync from frontend complete!"
echo ""
echo "Files synced:"
echo "  - squircle-legacy/squircle/types.ts (legacy types)"
echo "  - squircle-legacy/squircle/lib/constants.ts (gradient presets)"
echo "  - squircle-legacy/squircle/lib/utils.ts (utilities)"
echo "  - 3 core files (skwircle.tsx, types.ts, index.ts)"
echo "  - config/*.ts"
echo "  - core/*.ts"
echo "  - rendering/*.tsx"
echo "  - utils/*.ts"
echo ""
echo "⚠️  NOTE: After sync, verify type compatibility:"
echo "   - demo-repo uses React 19 which requires RefObject<T | null>"
echo "   - If type errors occur in core/use-dimensions.ts, update the"
echo "     contentRef parameter type to: React.RefObject<HTMLDivElement | null>"
echo ""
echo "Next steps:"
echo "  1. cd /Users/derickfiebiger/Payva-Repos/demo-repo"
echo "  2. pnpm type-check to verify no breaking changes"
echo "  3. pnpm dev to test components"
echo ""

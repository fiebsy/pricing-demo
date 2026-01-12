#!/bin/bash

# =============================================================================
# SYNC STATUS - CHECK SKWIRCLE SYNC BETWEEN REPOS
# =============================================================================
#
# Purpose: Show which Skwircle files differ between frontend and demo-repo
# Usage: ./scripts/sync-status.sh
#
# =============================================================================

# Configuration
FRONTEND_SRC="/Users/derickfiebiger/Payva-Repos/front-end/src/modules/design-system/v2/components/ui/custom/base/skwircle"
DEMO_SRC="/Users/derickfiebiger/Payva-Repos/demo-repo/src/v2/components/ui/skwircle"

# Legacy paths
FRONTEND_LEGACY_BASE="/Users/derickfiebiger/Payva-Repos/front-end/src/modules/design-system/v2/components/ui/custom/base/squircle-legacy/squircle"
DEMO_LEGACY_BASE="/Users/derickfiebiger/Payva-Repos/demo-repo/src/v2/components/ui/squircle-legacy/squircle"

echo "═══════════════════════════════════════════════════════════════════"
echo "  SKWIRCLE SYNC STATUS"
echo "═══════════════════════════════════════════════════════════════════"
echo ""
echo "  Frontend: $FRONTEND_SRC"
echo "  Demo:     $DEMO_SRC"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track counts
IDENTICAL=0
DIFFERENT=0
FRONTEND_ONLY=0
DEMO_ONLY=0

echo "───────────────────────────────────────────────────────────────────"
echo "  CORE FILES"
echo "───────────────────────────────────────────────────────────────────"

for file in "skwircle.tsx" "types.ts" "index.ts"; do
  if [ -f "$FRONTEND_SRC/$file" ] && [ -f "$DEMO_SRC/$file" ]; then
    if diff -q "$FRONTEND_SRC/$file" "$DEMO_SRC/$file" > /dev/null 2>&1; then
      echo -e "  ${GREEN}✓${NC} $file (identical)"
      ((IDENTICAL++))
    else
      echo -e "  ${YELLOW}≠${NC} $file (DIFFERENT)"
      ((DIFFERENT++))
    fi
  elif [ -f "$FRONTEND_SRC/$file" ]; then
    echo -e "  ${RED}→${NC} $file (frontend only)"
    ((FRONTEND_ONLY++))
  elif [ -f "$DEMO_SRC/$file" ]; then
    echo -e "  ${RED}←${NC} $file (demo only)"
    ((DEMO_ONLY++))
  fi
done

echo ""
echo "───────────────────────────────────────────────────────────────────"
echo "  CONFIG FILES"
echo "───────────────────────────────────────────────────────────────────"

for file in badge.ts button.ts elevations.ts gradients.ts index.ts intents.ts roundness.ts variants.ts; do
  frontend_file="$FRONTEND_SRC/config/$file"
  demo_file="$DEMO_SRC/config/$file"

  if [ -f "$frontend_file" ] && [ -f "$demo_file" ]; then
    if diff -q "$frontend_file" "$demo_file" > /dev/null 2>&1; then
      echo -e "  ${GREEN}✓${NC} config/$file (identical)"
      ((IDENTICAL++))
    else
      # Check if it has legacy imports
      if grep -q "squircle-legacy" "$frontend_file" 2>/dev/null; then
        echo -e "  ${YELLOW}⚠${NC} config/$file (frontend has legacy imports)"
      else
        echo -e "  ${YELLOW}≠${NC} config/$file (DIFFERENT)"
      fi
      ((DIFFERENT++))
    fi
  elif [ -f "$frontend_file" ]; then
    echo -e "  ${RED}→${NC} config/$file (frontend only)"
    ((FRONTEND_ONLY++))
  elif [ -f "$demo_file" ]; then
    echo -e "  ${RED}←${NC} config/$file (demo only)"
    ((DEMO_ONLY++))
  fi
done

echo ""
echo "───────────────────────────────────────────────────────────────────"
echo "  CORE HOOKS"
echo "───────────────────────────────────────────────────────────────────"

for file in index.ts use-dimensions.ts use-hover-state.ts use-skwircle-colors.ts use-skwircle-mount.ts use-skwircle-shape.ts; do
  frontend_file="$FRONTEND_SRC/core/$file"
  demo_file="$DEMO_SRC/core/$file"

  if [ -f "$frontend_file" ] && [ -f "$demo_file" ]; then
    if diff -q "$frontend_file" "$demo_file" > /dev/null 2>&1; then
      echo -e "  ${GREEN}✓${NC} core/$file (identical)"
      ((IDENTICAL++))
    else
      echo -e "  ${YELLOW}≠${NC} core/$file (DIFFERENT)"
      ((DIFFERENT++))
    fi
  elif [ -f "$frontend_file" ]; then
    echo -e "  ${RED}→${NC} core/$file (frontend only)"
    ((FRONTEND_ONLY++))
  elif [ -f "$demo_file" ]; then
    echo -e "  ${RED}←${NC} core/$file (demo only)"
    ((DEMO_ONLY++))
  fi
done

echo ""
echo "───────────────────────────────────────────────────────────────────"
echo "  RENDERING"
echo "───────────────────────────────────────────────────────────────────"

for file in index.ts skwircle-gradients.tsx skwircle-shadow.tsx skwircle-svg.tsx; do
  frontend_file="$FRONTEND_SRC/rendering/$file"
  demo_file="$DEMO_SRC/rendering/$file"

  if [ -f "$frontend_file" ] && [ -f "$demo_file" ]; then
    if diff -q "$frontend_file" "$demo_file" > /dev/null 2>&1; then
      echo -e "  ${GREEN}✓${NC} rendering/$file (identical)"
      ((IDENTICAL++))
    else
      echo -e "  ${YELLOW}≠${NC} rendering/$file (DIFFERENT)"
      ((DIFFERENT++))
    fi
  elif [ -f "$frontend_file" ]; then
    echo -e "  ${RED}→${NC} rendering/$file (frontend only)"
    ((FRONTEND_ONLY++))
  elif [ -f "$demo_file" ]; then
    echo -e "  ${RED}←${NC} rendering/$file (demo only)"
    ((DEMO_ONLY++))
  fi
done

echo ""
echo "───────────────────────────────────────────────────────────────────"
echo "  UTILS"
echo "───────────────────────────────────────────────────────────────────"

for file in color-resolver.ts index.ts path-generator.ts; do
  frontend_file="$FRONTEND_SRC/utils/$file"
  demo_file="$DEMO_SRC/utils/$file"

  if [ -f "$frontend_file" ] && [ -f "$demo_file" ]; then
    if diff -q "$frontend_file" "$demo_file" > /dev/null 2>&1; then
      echo -e "  ${GREEN}✓${NC} utils/$file (identical)"
      ((IDENTICAL++))
    else
      # Check if it has legacy imports
      if grep -q "squircle-legacy" "$frontend_file" 2>/dev/null; then
        echo -e "  ${YELLOW}⚠${NC} utils/$file (frontend has legacy imports)"
      else
        echo -e "  ${YELLOW}≠${NC} utils/$file (DIFFERENT)"
      fi
      ((DIFFERENT++))
    fi
  elif [ -f "$frontend_file" ]; then
    echo -e "  ${RED}→${NC} utils/$file (frontend only)"
    ((FRONTEND_ONLY++))
  elif [ -f "$demo_file" ]; then
    echo -e "  ${RED}←${NC} utils/$file (demo only)"
    ((DEMO_ONLY++))
  fi
done

echo ""
echo "───────────────────────────────────────────────────────────────────"
echo "  LEGACY DEPENDENCIES (squircle-legacy)"
echo "───────────────────────────────────────────────────────────────────"

# Check types.ts at squircle level
frontend_file="$FRONTEND_LEGACY_BASE/types.ts"
demo_file="$DEMO_LEGACY_BASE/types.ts"
if [ -f "$frontend_file" ] && [ -f "$demo_file" ]; then
  if diff -q "$frontend_file" "$demo_file" > /dev/null 2>&1; then
    echo -e "  ${GREEN}✓${NC} squircle-legacy/squircle/types.ts (identical)"
    ((IDENTICAL++))
  else
    echo -e "  ${YELLOW}≠${NC} squircle-legacy/squircle/types.ts (DIFFERENT)"
    ((DIFFERENT++))
  fi
elif [ -f "$frontend_file" ]; then
  echo -e "  ${RED}→${NC} squircle-legacy/squircle/types.ts (frontend only)"
  ((FRONTEND_ONLY++))
elif [ -f "$demo_file" ]; then
  echo -e "  ${RED}←${NC} squircle-legacy/squircle/types.ts (demo only)"
  ((DEMO_ONLY++))
fi

# Check lib files
for file in constants.ts utils.ts; do
  frontend_file="$FRONTEND_LEGACY_BASE/lib/$file"
  demo_file="$DEMO_LEGACY_BASE/lib/$file"
  if [ -f "$frontend_file" ] && [ -f "$demo_file" ]; then
    if diff -q "$frontend_file" "$demo_file" > /dev/null 2>&1; then
      echo -e "  ${GREEN}✓${NC} squircle-legacy/squircle/lib/$file (identical)"
      ((IDENTICAL++))
    else
      echo -e "  ${YELLOW}≠${NC} squircle-legacy/squircle/lib/$file (DIFFERENT)"
      ((DIFFERENT++))
    fi
  elif [ -f "$frontend_file" ]; then
    echo -e "  ${RED}→${NC} squircle-legacy/squircle/lib/$file (frontend only)"
    ((FRONTEND_ONLY++))
  elif [ -f "$demo_file" ]; then
    echo -e "  ${RED}←${NC} squircle-legacy/squircle/lib/$file (demo only)"
    ((DEMO_ONLY++))
  fi
done

echo ""
echo "───────────────────────────────────────────────────────────────────"
echo "  FRONTEND-ONLY DIRECTORIES"
echo "───────────────────────────────────────────────────────────────────"

if [ -d "$FRONTEND_SRC/compounds" ]; then
  echo -e "  ${YELLOW}→${NC} compounds/ (frontend only - contains compound components)"
fi

echo ""
echo "═══════════════════════════════════════════════════════════════════"
echo "  SUMMARY"
echo "═══════════════════════════════════════════════════════════════════"
echo ""
echo -e "  ${GREEN}✓${NC} Identical:     $IDENTICAL files"
echo -e "  ${YELLOW}≠${NC} Different:     $DIFFERENT files"
echo -e "  ${RED}→${NC} Frontend only: $FRONTEND_ONLY files"
echo -e "  ${RED}←${NC} Demo only:     $DEMO_ONLY files"
echo ""

if [ $DIFFERENT -gt 0 ]; then
  echo "⚠️  Some files differ. Consider syncing."
  echo ""
  echo "Sync commands:"
  echo "  ./scripts/sync-to-frontend.sh     # Push demo → frontend"
  echo "  ./scripts/sync-from-frontend.sh   # Pull frontend → demo"
  echo ""
fi

echo "═══════════════════════════════════════════════════════════════════"

# Skwircle Component Audit

**Date**: January 1, 2026
**Source (Frontend)**: `/Users/derickfiebiger/Payva-Repos/front-end/src/modules/design-system/v2/components/ui/custom/base/skwircle`
**Target (Demo-Repo)**: `/Users/derickfiebiger/Payva-Repos/demo-repo/src/components/ui/skwircle`

---

## Executive Summary

The frontend has **newer features** that should be brought into demo-repo:
1. **`fillMode` container measurement** - Frontend properly measures container when `fillMode=true`
2. **MetricTile composed component** - Dashboard-ready metric display component

Demo-repo has **enhancements** to preserve:
1. **Enhanced `getButtonIconStyle()`** - Returns both style + className for hover transitions
2. **Higher-level wrapper components** - `Badge`, `Button`, `SearchInput` in subdirectories

---

## File-by-File Comparison

### Core Files

| File | Frontend | Demo-Repo | Action |
|------|----------|-----------|--------|
| `skwircle.tsx` | 350 lines | 345 lines | **UPDATE** - Bring `containerRef` + `fillMode` measurement |
| `types.ts` | 480 lines | 480 lines | Identical |
| `index.ts` | 114 lines | 97 lines | **UPDATE** - Add MetricTile exports |

### Config Files

| File | Status | Notes |
|------|--------|-------|
| `config/badge.ts` | Identical | No changes needed |
| `config/button.ts` | **KEEP DEMO-REPO** | Demo-repo has enhanced hover icon styling |
| `config/constants.ts` | Identical | No changes needed |
| `config/elevations.ts` | Identical | No changes needed |
| `config/gradients.ts` | Identical | No changes needed |
| `config/intents.ts` | Identical | No changes needed |
| `config/roundness.ts` | Identical | No changes needed |
| `config/variants.ts` | Identical | No changes needed |

### Core Hooks

| File | Status |
|------|--------|
| `core/use-dimensions.ts` | Identical |
| `core/use-hover-state.ts` | Identical |
| `core/use-skwircle-colors.ts` | Identical |
| `core/use-skwircle-mount.ts` | Identical |
| `core/use-skwircle-shape.ts` | Identical |

### Rendering Files

| File | Status |
|------|--------|
| `rendering/skwircle-gradients.tsx` | Identical |
| `rendering/skwircle-shadow.tsx` | Identical |
| `rendering/skwircle-svg.tsx` | Identical |

### Component Files

| File | Status |
|------|--------|
| `components/skwircle-badge.tsx` | Identical |
| `components/skwircle-button.tsx` | Identical |
| `components/skwircle-card.tsx` | Identical |
| `components/skwircle-input.tsx` | Identical |
| `components/skwircle-avatar.tsx` | Identical |

---

## Changes to Apply

### 1. Update `skwircle.tsx` - Add `containerRef` for `fillMode`

**Location**: Lines 125-174 in demo-repo

**Current (Demo-Repo)**:
```tsx
const contentRef = useRef<HTMLDivElement>(null)
// ...
const { dimensions, hasMeasured } = useDimensions(contentRef, { initialDimensions })
```

**New (From Frontend)**:
```tsx
const containerRef = useRef<HTMLDivElement>(null)
const contentRef = useRef<HTMLDivElement>(null)
// ...
const measureRef = fillMode ? containerRef : contentRef
const { dimensions, hasMeasured } = useDimensions(measureRef, { initialDimensions })
```

Also add `ref={containerRef}` to the outer div.

**Why**: When `fillMode=true`, the component should measure the container (which expands to fill parent) rather than the content. This enables full-width card layouts.

---

### 2. Add `composed/` Directory with MetricTile

**Files to Create**:
```
src/components/ui/skwircle/composed/
├── index.ts
└── dashboard/
    ├── index.ts
    ├── metric-tile.tsx
    └── metric-tile-config.ts
```

**MetricTile Features**:
- Wraps `Skwircle.Card` with semantic props
- Props: `label`, `value`, `change`, `changeType`, `period`, `size`
- Three sizes: `sm`, `md`, `lg`
- Change type colors: positive (green), negative (red), neutral (gray)
- Dashboard-optimized defaults

---

### 3. Update `index.ts` - Add MetricTile Exports

**Add to exports**:
```tsx
// Composed components (semantic wrappers)
export {
  MetricTile,
  METRIC_TILE_DEFAULTS,
  METRIC_TILE_SIZE_CONFIGS,
  CHANGE_TYPE_COLORS,
  getMetricTileSizeConfig,
  getChangeTypeColor,
} from './composed'

export type {
  MetricTileProps,
  MetricTileSize,
  MetricTileSizeConfig,
  MetricTileDefaults,
  ChangeType,
} from './composed'
```

---

### 4. PRESERVE Demo-Repo Enhancement: `button.ts`

**Keep the enhanced `getButtonIconStyle()`** which returns both style and className:

```tsx
// Demo-repo version (KEEP THIS)
export const getButtonIconStyle = (intent: ButtonIntent): { style: React.CSSProperties; className: string } => {
  const config = BUTTON_INTENT_CONFIGS[intent]
  return {
    style: {
      opacity: config.iconOpacity,
      transition: 'opacity 100ms linear',
    },
    className: 'group-hover:opacity-100',
  }
}
```

This provides smooth hover transitions using Tailwind's `group-hover:` utility.

---

## Components Unique to Demo-Repo (PRESERVE)

These wrapper components in demo-repo subdirectories should be preserved:

1. **`components/badge/index.tsx`** (259 lines)
   - High-level Badge with compound patterns
   - `Badge.WithIcon`, `Badge.WithDot`

2. **`components/button/index.tsx`** (277 lines)
   - High-level Button with compound patterns
   - `Button.WithIcon`, `Button.Icon`

3. **`components/search-input/index.tsx`** (144 lines)
   - Search input with icon and clear button
   - Unique to demo-repo

---

## Summary of Actions

| Priority | Action | Files Affected |
|----------|--------|----------------|
| **HIGH** | Add `containerRef` for `fillMode` | `skwircle.tsx` |
| **HIGH** | Add MetricTile component | New `composed/` directory |
| **MEDIUM** | Update index exports | `index.ts` |
| **PRESERVE** | Keep enhanced button icon style | `config/button.ts` |
| **PRESERVE** | Keep wrapper components | `components/badge/`, `components/button/`, `components/search-input/` |

---

## Import Path Considerations

The MetricTile component imports need path adjustment for demo-repo:

**Frontend imports**:
```tsx
import { Skwircle } from '@/modules/design-system/v2/components/ui/custom/base/skwircle'
```

**Demo-repo imports** (adjust to):
```tsx
import { Skwircle } from '@/components/ui/skwircle'
```

---

*Generated for Derick's review - Do not commit this file*

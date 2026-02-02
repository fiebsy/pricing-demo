# Stacking-Nav Sticky Container Animation Issues

> Status: **Open** | Last Updated: February 2026
> Component: `stacking-nav` inside `StickyDataTable`
> Route: `/playground/stacking-nav-table`

---

## Context

The stacking-nav component works correctly in isolation (`/playground/stacking-nav`). When embedded inside the `StickyDataTable`'s integrated toolbar and the page is scrolled, two distinct animation issues appear. Both are caused by the interaction between motion/react's animation system and `position: sticky`.

### DOM nesting (relevant layers)

```
page.tsx
└── motion.div [layoutScroll, data-layout-scroll, overflow-y-auto]   ← scroll container
    └── div.mx-auto
        └── StickyDataTable
            └── div.relative (table container)
                └── StickyHeaderWrapper [position: sticky, top: 12px, z-30]
                    ├── div (integrated toolbar)
                    │   └── StackingNav                        ← nav lives here
                    │       └── div.relative.flex (nav flex container)
                    │           ├── motion.div [layout="position"]   ← L0 items
                    │           ├── motion.div [layout="position"]   ← L1 items (children)
                    │           └── motion.div [layout="position"]   ← L2 items (grandchildren)
                    └── TableHeader (column headers)
```

All stacking-nav items (L0, L1, L2, L3) render as siblings in the same flex container via React fragments from recursive `StackLevel` components. Each item's `motion.div` wrapper uses `layout="position"` for FLIP-based reflow animation during collapse.

---

## Issue 1: Entry Animation Offset (Primary)

**Severity**: High — makes the component unusable in sticky context when scrolled.

### Symptom

When the page is scrolled and the toolbar is in its sticky state, drilling from L0 to L1 or from L1 to L2 causes newly-appearing child items to **animate in from the bottom of the viewport** rather than from their local position. The visual distance of the fly-in roughly correlates with the scroll offset of the container (~400-600px).

L0 selections (top-level clicks) are **not affected**. The issue only manifests on L1 and L2 promotions (drilling deeper into the nav tree).

### Expected behavior

Child items should fade/slide in from a small local offset (defined by `entryOffsetX`/`entryOffsetY` in the animation config, typically ~10px), exactly as they do in the standalone playground or when the table is not scrolled.

### What we know

1. **L0 items mount at page load** (scroll = 0). They reposition on click via `animate={{ x }}` value animation, not FLIP. No scroll offset is present at mount time.

2. **L1/L2 items mount during drill-down** (scroll = N). They use `initial → animate` for entry (opacity, position, scale). They also have `layout="position"`, which enrolls them in motion's projection tree at mount time.

3. **The projection tree applies scroll corrections** when a `layoutScroll` ancestor exists. When items join the tree inside a scrolled container, their initial projected position may be offset by the container's `scrollTop`.

4. **`position: sticky` creates a discrepancy**: the sticky toolbar's visual position stays constant (stuck to the top), but its document-flow position is far above the viewport. Motion's projection system may reconcile this incorrectly for newly-mounted items.

5. **Console debug output confirms** `containerScrollTop: 444` with `windowScrollY: 0` at interaction time. The scroll is contained to the `layoutScroll` div.

---

## Issue 2: Sticky State Reset (Secondary)

**Severity**: Medium — intermittent, less predictable.

### Symptom

During certain nav interactions while scrolled (particularly promotions or collapses), the `StickyDataTable` briefly **drops out of its sticky state** and snaps to its default (non-sticky) document-flow position before re-sticking. This causes a visible jump of the entire table header area.

### Likely cause

When motion's layout animation system measures element positions for FLIP calculations, it may temporarily alter the DOM in ways that invalidate the sticky positioning context. Specifically:

- `AnimatePresence mode="popLayout"` removes exiting items from document flow immediately, which can cause the sticky container's height/content to change
- The `layoutScroll` container's scroll position or dimensions may momentarily shift during React's commit phase
- FLIP measurements use `getBoundingClientRect()`, which forces a synchronous layout recalculation — this could cause the browser to re-evaluate sticky positioning mid-animation

---

## Page-Level Changes Made

### `stacking-nav-table/page.tsx`

The original page used `min-h-screen` with browser-native scroll on the document body. It was changed to create an explicit scroll container for `layoutScroll`:

```tsx
// BEFORE — browser scroll
<div className="min-h-screen ...">
  <div className="pr-[352px] min-h-screen">
    <div className="mx-auto px-6" ...>
      <StickyDataTable ... />
    </div>
  </div>
  <UnifiedControlPanel ... />
</div>

// AFTER — explicit scroll container with layoutScroll
<div className="h-screen ...">
  <motion.div layoutScroll data-layout-scroll className="h-full overflow-y-auto pr-[352px]">
    <div className="mx-auto px-6" ...>
      <StickyDataTable ... />
    </div>
  </motion.div>
  <UnifiedControlPanel ... />
</div>
```

**Rationale**: `layoutScroll` tells motion's FLIP system to read `scrollTop` from this element and subtract it from position calculations. The `UnifiedControlPanel` uses `position: fixed` and is unaffected.

**Result**: Did not resolve Issue 1. The entry animation offset persists. The `data-layout-scroll` attribute was added for debug querying.

---

## Approaches Attempted

### 1. `layoutScroll` on scroll container wrapper

**File**: `page.tsx`

Converted the content wrapper to `motion.div` with `layoutScroll` and `overflow-y-auto`, making it the explicit scroll container. This is the documented motion/react pattern for correcting FLIP measurements inside scrollable containers.

**Result**: No improvement on the entry animation offset. `containerScrollTop` is correctly reported, but the visual shift persists for L1/L2 promotions.

### 2. Disable `layout="position"` for initial-entry items

**File**: `stack-level.tsx` (regular items motion.div)

Changed the layout prop from:
```tsx
layout={!isAnchored ? 'position' : false}
```
to:
```tsx
layout={!isAnchored && !isInitialEntry ? 'position' : false}
```

Where `isInitialEntry = level > 0 && !isActive && !isCollapsingNow`. This removes newly-mounting items from the projection tree while preserving layout animation for active items and collapse reflow.

**Result**: No improvement. Items still animate from the bottom of the viewport, indicating the issue is not solely caused by the `layout="position"` prop on entering items. The projection tree enrollment at mount time was ruled out as the root cause.

### 3. FLIP measurement debug callbacks

**File**: `stack-level.tsx`

Added `onBeforeLayoutMeasure`, `onLayoutAnimationStart`, `onLayoutAnimationComplete`, and `onAnimationStart` callbacks to all three `motion.div` elements that use `layout="position"` (root anchor, level-all, regular items). Callbacks log `getBoundingClientRect()`, scroll container state, and FLIP deltas.

**Result**: None of the callbacks fired in any test run, despite `showDebug` being true and the props being confirmed present in the DOM. This suggests motion's layout animation system is not performing FLIP measurements on these elements during the interactions where the visual shift occurs. The animation offset may originate from the projection tree's initial position correction rather than from an active FLIP calculation.

---

## Current Debug State

### What exists

The `showDebug` toggle (available via the playground control panel) activates extensive logging in `stack-level.tsx`:

| Log | Source | Purpose |
|-----|--------|---------|
| `🔍 [StackLevel]` | `useEffect` per level | Level render state, items, active path, positioning table |
| `📍 [Item]` | Per-item in `.map()` | Item state, position strategy, animation config |
| `🚪 [EXIT]` | Per non-active item | Exit animation config |
| `⏬ [COLLAPSE]` | `stacking-nav.tsx` | Global collapse detection |
| `🔼 [EXPANSION]` | `stacking-nav.tsx` | Expansion detection |
| `🖱️ NAV CLICK` | `page.tsx` | Scroll container state at click time |
| `📐 FLIP-PRE` | `onBeforeLayoutMeasure` | Pre-FLIP element rect + scroll (never fires) |
| `🎬 FLIP-GO` | `onLayoutAnimationStart` | Post-FLIP delta (never fires) |
| `✅ FLIP-END` | `onLayoutAnimationComplete` | Final position (never fires) |
| `🚀 ANIM-START` | `onAnimationStart` | Any animation start position (never fires) |

### The debug noise problem

React StrictMode + `useTransition` causes each item to render **8+ times per interaction** (2x StrictMode for each of multiple render passes). With 4-7 items per level across 2-3 levels, a single click produces **50-100+ log entries**, mostly duplicates. The `📍 [Item]` and `🚪 [EXIT]` logs dominate the output, making it difficult to spot meaningful state transitions.

The FLIP-specific callbacks (`📐`, `🎬`, `✅`, `🚀`) were designed to cut through this noise with colored, structured output showing actual position measurements. However, since none of them fire, they currently add dead code without diagnostic value.

### Cleanup recommendation

Before further investigation, the debug system should be rationalized:

1. **Remove non-firing callbacks**: `getFlipDebugProps`, `flipElMap`, `flipSnapshots` refs, and the `useCallback` import they require. These add ~60 lines and never produce output.
2. **Reduce render-time logging**: The per-item `📍 [Item]` block fires on every render. Consider gating it behind a separate `showVerboseDebug` flag, or logging only when state actually changes (compare with previous render via ref).
3. **Keep useful logs**: `🖱️ NAV CLICK` (scroll state), `⏬ COLLAPSE` / `🔼 EXPANSION` (path transitions), and level-render summaries are valuable and not noisy.

---

## Architecture of the Problem

The stacking-nav uses motion/react's animation system in two distinct ways:

### 1. Value animations (`initial → animate`)

Used for item entry (fade in, slide, scale) and positional offsets (clearing anchored items via `x: activeParentOffset`). These are straightforward tween/spring animations driven by prop values.

### 2. Layout animations (`layout="position"`)

Used for FLIP-based reflow during collapse. When items reappear after a collapse, `layout="position"` measures their position before and after the DOM change, then animates the difference. This provides smooth flex-reflow without manual position tracking.

**The conflict**: `layout="position"` enrolls items in motion's **projection tree**, a global coordinate system that tracks every layout-animated element. When a `layoutScroll` ancestor exists, the projection tree adjusts positions by the scroll offset. When items are inside a `position: sticky` container, their visual position stays constant while their document-flow position moves with scroll. The projection tree cannot distinguish between these two positions, leading to incorrect corrections.

### Why L0 works and L1/L2 doesn't

- **L0 items** exist from page load (scroll = 0). When clicked, the active item repositions via `animate={{ x }}`, not FLIP. No projection correction is needed.
- **L1 items** mount when L0 is expanded. At this point, the projection tree's state is relatively stable (only L0 items exist). The entry animation plays correctly.
- **L2 items** mount when L1 is promoted. At this point, the projection tree is in flux: the L0 parent transitions to `absolute` (anchored), the L1 item transitions from child to active parent, L1 siblings exit via `AnimatePresence`. The projection tree applies corrections to the new L2 items based on this unstable state, which includes scroll offset.

This is a hypothesis. The exact mechanism is unconfirmed because motion's internal projection calculations are not observable through the provided callback API (the callbacks don't fire for this scenario).

---

## Possible Next Steps

### A. Isolate the projection tree

Remove `layout="position"` from ALL items temporarily. If both issues disappear, the projection tree is definitively the cause. Collapse animations will break, but this confirms the diagnosis.

### B. Isolate `layoutScroll`

Revert `page.tsx` to the original `min-h-screen` / browser scroll pattern (remove `motion.div layoutScroll`). Test the same L1/L2 drill sequence while scrolled. If the entry offset disappears, `layoutScroll` is actively causing the issue rather than fixing it.

### C. Move the stacking-nav outside the sticky container

Render the nav above the `StickyHeaderWrapper` rather than inside it. This removes the `position: sticky` layer between the scroll container and the nav's motion elements. Requires changes to `StickyDataTable` or the playground's toolbar configuration.

### D. Use `layoutDependency` to control FLIP timing

motion/react's `layoutDependency` prop lets you control exactly when FLIP measurements occur. Setting it to a stable value during drill-down (expansion) and only changing it during collapse could prevent projection corrections during entry.

### E. Replace FLIP with manual position tracking

Remove `layout="position"` entirely and implement collapse reflow manually using `animate={{ x }}` with calculated offsets. This avoids the projection tree completely at the cost of more manual position math.

### F. Investigate motion's `layoutScroll` + sticky interaction

File an issue or search motion/react's GitHub for known issues with `layoutScroll` + `position: sticky`. This is likely a known limitation of the FLIP measurement system. The `layoutScroll` correction assumes all descendants scroll with the container, but sticky descendants do not.

---

## Files Involved

| File | Role |
|------|------|
| `src/app/playground/stacking-nav-table/page.tsx` | Page layout, scroll container, `layoutScroll` |
| `src/components/ui/features/stacking-nav/components/stack-level.tsx` | Item rendering, `layout="position"`, animations, debug logging |
| `src/components/ui/features/stacking-nav/stacking-nav.tsx` | State management, collapse detection, context |
| `src/components/ui/features/stacking-nav/utils/animations.ts` | Animation config helpers (entry offset, transitions, exit) |
| `src/components/ui/patterns/data-table/components/header/sticky-header-wrapper.tsx` | `position: sticky` implementation |

---

## Reproduction Steps

1. Navigate to `/playground/stacking-nav-table`
2. Scroll down ~400-600px (table rows should scroll under the sticky header)
3. Click any L0 company item (e.g., "Acme") — L1 departments appear correctly
4. Click any L1 department (e.g., "Engineering") — **L2 teams animate in from the bottom of the viewport** instead of from their local position (Issue 1)
5. During step 4, the sticky header may briefly **snap out of sticky state** and jump to its document-flow position before re-sticking (Issue 2, intermittent)
6. For comparison: repeat steps 3-4 without scrolling (at top of page) — both transitions work correctly

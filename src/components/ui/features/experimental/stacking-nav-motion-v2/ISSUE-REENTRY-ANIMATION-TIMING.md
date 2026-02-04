# Issue: Reentry Animation Not Firing at Normal Speed

**Status:** Open
**Severity:** Medium (visual polish, not functionality)
**Discovered:** 2026-02-04
**Component:** `stacking-nav-motion-v2`

---

## Summary

Reentry animations (siblings reappearing during collapse) work correctly in slow-mo mode but fail to animate at normal speed. The "All" button animates correctly in both modes.

---

## Observed Behavior

| Mode | Level-All Button | Regular Siblings |
|------|------------------|------------------|
| Slow-mo (0.1x) | Fades in | Fade + scale in with stagger |
| Normal (1x) | Fades in | **Appear instantly (no animation)** |

---

## Root Cause

**Race condition between React's render cycle and effect execution.**

### The Timing Gap

```
┌─────────────────────────────────────────────────────────────────────────┐
│ Step 1: User clicks collapse                                            │
│         setActivePath([]) called                                        │
│         activePath: ['payments'] → []  (queued)                         │
│         isCollapsing: false                                             │
├─────────────────────────────────────────────────────────────────────────┤
│ Step 2: React RENDER with new activePath                                │
│         activePath: []                                                  │
│         isCollapsing: false  ← STALE (effect hasn't run)                │
│                                                                         │
│         Siblings now visible (shouldHide = false)                       │
│         computeItemState() runs:                                        │
│           isCollapsing = false                                          │
│           → animationMode = 'default'                                   │
│           → initial = false  ← NO ANIMATION                             │
├─────────────────────────────────────────────────────────────────────────┤
│ Step 3: React COMMIT (DOM updated)                                      │
│         Items mounted with final state, no animation triggered          │
├─────────────────────────────────────────────────────────────────────────┤
│ Step 4: useEffect runs (AFTER render)                                   │
│         Phase coordinator detects path shortened                        │
│         transitionTo(COLLAPSING)                                        │
│         isCollapsing: true  ← TOO LATE                                  │
└─────────────────────────────────────────────────────────────────────────┘
```

### Why Level-All Works

`level-all-renderer.tsx` unconditionally sets initial state:

```tsx
initial={
  shouldReduceMotion
    ? undefined
    : {
        opacity: animationConfig.entryOpacity,
        scale: animationConfig.entryScale,
        ...entryOffset,
      }
}
```

No check for `isCollapsing` or `animationMode` — always animates on mount.

### Why Regular Siblings Fail

`item-renderer.tsx` conditionally sets initial based on `animationMode`:

```tsx
case 'default':
default:
  initial = false  // ← Tells Framer Motion: "already at final state"
  break
```

When `isCollapsing` is `false` (stale), siblings get `animationMode = 'default'`.

---

## Affected Code Paths

| File | Line | Issue |
|------|------|-------|
| `utils/item-state.ts` | 90-92 | `animationMode` depends on `isCollapsing` |
| `components/item-renderer.tsx` | 98-103 | `initial = false` for `default` mode |
| `state/use-phase-coordinator.ts` | 229+ | `useEffect` detects collapse (async) |

---

## Why Slow-Mo Masks the Issue

1. **Spring duration**: Normal ~150ms vs slow-mo ~1500ms
2. **Perception window**: Late start by 16-32ms is 10-20% of normal animation, but only 1-2% of slow-mo
3. **Stagger visibility**: 25ms gaps imperceptible; 250ms gaps obvious

---

## Proposed Fix

### Option A: Synchronous Collapse Detection (Minimal Change)

Derive `isCollapsing` synchronously during render by comparing path lengths:

```ts
// use-phase-coordinator.ts
const previousPathRef = useRef<string[]>([])

// Synchronous (available during render)
const isCollapsingSynchronous = activePath.length < previousPathRef.current.length

// Update ref after render
useLayoutEffect(() => {
  previousPathRef.current = [...activePath]
}, [activePath])

return {
  isCollapsing,              // Async (for timing, hover suppression)
  isCollapsingSynchronous,   // Sync (for animation mode decisions)
}
```

Then in `computeItemState`:

```ts
} else if (ctx.isCollapsingSynchronous && !isActive) {
  animationMode = 'collapse-reentry'
}
```

**Pros:** Minimal change, preserves phase state system
**Cons:** Two sources of truth for "collapsing"

### Option B: Make Level-All Consistent (Parity Fix)

Change `level-all-renderer.tsx` to also check `animationMode`, making both paths fail consistently. Then fix both together.

**Pros:** Consistent behavior
**Cons:** Breaks Level-All until full fix

### Option C: Always Animate Siblings on Mount

Remove the `isCollapsing` check for reentry detection. If a sibling is mounting and not in `isPromotingPhase`, assume reentry:

```ts
} else if (!isActive && !isPromotingPhase && !isAnchored) {
  animationMode = 'collapse-reentry'
}
```

**Pros:** Simpler logic
**Cons:** May affect initial page load, needs testing

### Option D: Track Mount State Per-Item

Use a ref in each item to detect first render, but this adds complexity and refs also update after render.

---

## Recommended Approach

**Option A** is the safest incremental fix:

1. Preserves existing phase coordinator architecture
2. Phase state (`NavigationPhase.COLLAPSING`) still used for duration timing, hover suppression, debug indicators
3. Only the animation mode decision uses synchronous derivation
4. Easy to audit and revert if needed

---

## Test Cases

After fix, verify:

- [ ] Reentry animation plays at normal speed (1x)
- [ ] Reentry animation plays at slow-mo speed (0.1x)
- [ ] Stagger delays visible between siblings
- [ ] Scale animation (0.75 → 1.0) visible
- [ ] Opacity animation (0 → 1) visible
- [ ] Level-All behavior unchanged
- [ ] Expansion animations unaffected
- [ ] Promotion animations unaffected
- [ ] Initial page load doesn't trigger unwanted animations

---

## References

- `ARCHITECTURE.md` — Phase coordinator design
- `utils/item-state.ts:80-100` — Animation mode logic
- `components/item-renderer.tsx:64-104` — Initial state mapping
- `state/use-phase-coordinator.ts` — Phase state management

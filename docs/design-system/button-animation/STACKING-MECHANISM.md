# Button Animation Stacking Mechanism

> Technical documentation for the scalable absolute positioning approach that enables infinite stacking depth without performance degradation.

---

## Overview

The Button Animation component uses a **"peek-behind" stacking pattern** that achieves scalable multi-level nesting through CSS absolute positioning and z-index layering. Unlike approaches that track each nested item's position in state, this pattern allows O(1) complexity regardless of nesting depth.

---

## The Core Pattern

### Visual Representation

```
┌─────────────────────────────────────────────────────────┐
│  Normal State (nothing expanded)                        │
│                                                         │
│  [All] [Design] [Develop] [Deploy] [Monitor]           │
│    ↑                                                    │
│    └── marginLeft: -8px (creates staggered look)       │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  Expanded State ("Design" clicked)                      │
│                                                         │
│  [All]  ← absolute, z-0, opacity: 0.6, left: -8px      │
│     └────────── BEHIND ──────────┐                     │
│                                  ↓                      │
│        [Design ✕] [Figma] [Sketch] [Adobe XD]          │
│           ↑                                             │
│           └── z-10 (sits above "All")                  │
└─────────────────────────────────────────────────────────┘
```

### Key CSS Transitions

| State | Position | Z-Index | Opacity | Left/Margin |
|-------|----------|---------|---------|-------------|
| Normal | `relative` (flow) | auto | 1.0 | `marginLeft: -8px` |
| Anchored | `absolute top-0` | 0 | 0.6 | `left: -8px` |
| Expanded | `relative` (flow) | 10 | 1.0 | (natural) |

---

## Why This Is Scalable

### Traditional Approach (Not Scalable)

```typescript
// ❌ BAD: Tracks all expanded items in array
const [expandedPath, setExpandedPath] = useState<string[]>([])

// When clicking item 5 levels deep:
// expandedPath = ['all', 'design', 'tools', 'adobe', 'photoshop']
// Each level must calculate its offset: level * offsetPx
// State grows with depth → O(n) complexity
```

### Peek-Behind Pattern (Scalable)

```typescript
// ✅ GOOD: Each item only knows about immediate context
const isAnchored = expandedId !== null && expandedId !== myId

// Anchored: position absolute, fade behind
// Expanded: stay in flow, z-index bump
// No tracking of nesting depth
// Constant state size → O(1) complexity
```

The critical insight: **each item only needs to know if it should be "anchored" or "active"** - not WHERE it sits in a stack. The DOM and z-index handle the visual layering automatically.

---

## Implementation Details

### The "All" Button Logic

```tsx
// button-animation.tsx:263-302

<motion.div
  key={ALL_BUTTON_ID}
  className={cn(
    'inline-flex',
    // Conditional absolute positioning
    expandedId && expandedId !== ALL_BUTTON_ID && 'absolute top-0 z-0'
  )}
  style={{
    // Offset calculation
    marginLeft: expandedId && expandedId !== ALL_BUTTON_ID
      ? 0
      : styleConfig.allButtonOffset,  // -8px default
    left: expandedId && expandedId !== ALL_BUTTON_ID
      ? styleConfig.allButtonOffset   // -8px when anchored
      : undefined,
  }}
  animate={{
    // Opacity fade when anchored
    opacity: expandedId && expandedId !== ALL_BUTTON_ID ? 0.6 : 1,
  }}
>
```

### State Machine

```
┌───────┐     click parent     ┌───────────┐     timer      ┌────────────────────┐
│ idle  │ ──────────────────→  │ settling  │ ─────────────→ │ entering-children  │
└───────┘                      └───────────┘                └────────────────────┘
    ↑                                │                              │
    └────────── collapse/reset ──────┴──────────────────────────────┘
```

### Animation Timing

1. **Click parent** → `phase: 'settling'`
2. **Sibling parents exit** (100ms default)
3. **"All" button becomes anchored** (absolute + fade)
4. **Timer fires** → `phase: 'entering-children'`
5. **Children cascade in** with stagger (30ms between each)

---

## Extending to Multi-Level Nesting

### The Pattern for N Levels

For infinite nesting, apply the same pattern recursively:

```
Level 0 (All):       z-0   when Level 1+ is active
Level 1 (Parent):    z-10  normally, z-0 when Level 2+ is active
Level 2 (Child):     z-20  normally, z-10 when Level 3+ is active
Level N:             z-(N*10)
```

### Key Principle

Each level only needs to know:
1. **Am I the currently active level?** → Normal flow, highest local z-index
2. **Is something below me active?** → Become anchored (absolute, fade, lower z)
3. **Am I collapsed?** → Exit animation

No level needs to know:
- Total depth of the tree
- What's expanded above it
- Position calculations for other levels

---

## Performance Characteristics

### What Makes It Fast

| Aspect | Traditional Stack | Peek-Behind |
|--------|-------------------|-------------|
| State size | O(n) with depth | O(1) constant |
| Re-renders | All levels on change | Only 2 levels (active + anchored) |
| Position calculation | JS-computed offsets | CSS-only (absolute + z-index) |
| Animation target | Scale, layout shifts | Transform + opacity only |

### GPU-Optimized Properties

```typescript
// S-tier: Compositor-only animations
animate={{ opacity, x, y }}  // ✅ GPU-accelerated

// Avoid: Layout-triggering animations
animate={{ width, height }}  // ❌ Causes reflow
```

---

## File Organization

### Current Structure

```
src/components/ui/prod/base/button-animation/
├── index.ts                 # Public API exports
├── button-animation.tsx     # Main component
├── context.tsx              # React context
├── types.ts                 # Type definitions
├── config.ts                # Default configs + constants
├── animation/
│   ├── index.ts             # Re-exports
│   ├── spring-utils.ts      # Transition factories
│   └── stagger-utils.ts     # Stagger calculations
├── components/
│   ├── index.ts             # Re-exports
│   └── chip.tsx             # Chip subcomponent
└── hooks/
    ├── index.ts             # Re-exports
    └── use-animation-state.ts  # State machine hook
```

### Recommended V2 Structure for Multi-Level Support

```
src/components/ui/prod/base/button-animation-v2/
├── index.ts                 # Public API
├── types.ts                 # Extended types for nesting
├── config.ts                # Constants + defaults
├── context/
│   ├── index.ts
│   ├── stack-context.tsx    # Stack state provider
│   └── use-stack.ts         # Hook to access stack
├── animation/
│   ├── index.ts
│   ├── spring-utils.ts      # Unchanged
│   ├── stagger-utils.ts     # Unchanged
│   └── z-index-utils.ts     # Z-index calculations for levels
├── components/
│   ├── index.ts
│   ├── stack-root.tsx       # Root container
│   ├── stack-level.tsx      # Generic level wrapper
│   └── stack-item.tsx       # Individual item (replaces Chip)
└── hooks/
    ├── index.ts
    ├── use-stack-state.ts   # Multi-level state machine
    └── use-level-context.ts # Level-specific context hook
```

---

## Usage Example (V2 Concept)

```tsx
// Infinitely nestable stack
<StackRoot>
  <StackItem id="all" label="All" />
  <StackItem id="design" label="Design">
    <StackItem id="figma" label="Figma">
      <StackItem id="components" label="Components" />
      <StackItem id="prototypes" label="Prototypes" />
    </StackItem>
    <StackItem id="sketch" label="Sketch" />
  </StackItem>
  <StackItem id="develop" label="Develop">
    <StackItem id="react" label="React" />
  </StackItem>
</StackRoot>
```

Each `StackItem` automatically:
- Inherits its level from context
- Knows when to become anchored
- Applies correct z-index
- Triggers appropriate animations

---

## Summary

The peek-behind stacking pattern achieves scalability through:

1. **Binary state per item**: active or anchored (not position-in-stack)
2. **CSS-driven layering**: z-index and absolute positioning
3. **Compositor-only animations**: transform and opacity
4. **Local knowledge**: each item only knows about its immediate context

This allows the pattern to scale to theoretically infinite depth with constant performance characteristics.

---

**Last Updated**: January 2025

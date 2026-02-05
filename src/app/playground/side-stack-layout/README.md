# Side-Stack Layout Playground

A playground for experimenting with horizontal expanding layouts where containers can expand left and right, pushing neighboring containers aside.

## Overview

This playground demonstrates a **side-stack** variant of the expanding-layout pattern:
- **Containers in a horizontal row** (not vertical column)
- Each container expands **left/right** using clip-path animations
- Expansion **pushes neighboring containers** aside
- Uses CSS Grid for synchronized layout transitions

## Visual Model

```
Collapsed (3 containers in a row):
┌────┐  ┌────┐  ┌────┐
│ T1 │  │ T2 │  │ T3 │
└────┘  └────┘  └────┘

Container 2 Expanded (pushes neighbors):
┌────┐  ┌────┬────┬────┐  ┌────┐
│ T1 │  │ L2 │ T2 │ R2 │  │ T3 │
└────┘  └────┴────┴────┘  └────┘

Animation: L2 clip-reveals ← from right edge
           R2 clip-reveals → from left edge
           T1 and T3 slide outward via grid layout
```

## Stack Modes

| Mode | Description | Layout |
|------|-------------|--------|
| `both` | Left + Trigger + Right | `[L][T][R]` |
| `left-only` | Left + Trigger | `[L][T]` |
| `right-only` | Trigger + Right | `[T][R]` |

## Animation Approach

### CSS Grid Layout Transition
The container uses CSS Grid with `grid-template-columns` that transitions smoothly:
- Collapsed: `0px [trigger] 0px` - side slots have 0 width
- Expanded: `[leftWidth] [trigger] [rightWidth]` - sides grow

### Clip-Path Content Reveal
Inner slot content uses clip-path animations for the "reveal" effect:
- **Left slot**: `inset(0 0 0 100%)` → `inset(0 0 0 0)` (expands leftward)
- **Right slot**: `inset(0 100% 0 0)` → `inset(0 0 0 0)` (expands rightward)

## Configuration

### Layout
- `containerCount`: Number of containers in the row (2-6)
- `triggerWidth/Height`: Visible trigger dimensions
- `leftSlotWidth` / `rightSlotWidth`: Content area widths
- `containerGap`: Spacing between containers in row
- `slotInset`: Padding inside slot containers

### Animation
- `animationDuration`: Expand animation timing
- `collapseDuration`: Collapse animation timing
- `animationEasing`: CSS easing function
- `slotContainerDurationOffset`: Stagger timing for clip animation
- `animateSlotContainers`: Enable/disable clip-path animation

## Presets

| Preset | Description |
|--------|-------------|
| **Default** | Balanced timing (350ms expand, 200ms collapse) |
| **Snappy** | Quick response (200ms expand, 150ms collapse) |
| **Bouncy** | Playful overshoot (450ms with bounce easing) |
| **Smooth** | Gentle, refined (400ms ease-in-out) |

## Migration to Production

### Core Component
The main component is at `core/side-stack-layout.tsx`. To migrate:

1. Copy the component to your production location
2. Remove debug overlay code
3. Replace playground config props with your component's props
4. Consider extracting to use the `HorizontalExpandV1` component system

### Using HorizontalExpandV1
For a more composable approach, use the underlying component system:

```tsx
import { HorizontalExpandV1 } from '@/components/ui/features/experimental/horizontal-expand-v1'

<HorizontalExpandV1.Root
  expanded={isExpanded}
  onExpandedChange={setIsExpanded}
  config={{
    layout: { triggerWidth: 64, triggerHeight: 64 },
    leftSlot: { enabled: true, width: 80 },
    rightSlot: { enabled: true, width: 80 },
  }}
>
  <HorizontalExpandV1.LeftSlot>
    <YourLeftContent />
  </HorizontalExpandV1.LeftSlot>
  <HorizontalExpandV1.TriggerSlot>
    <YourTrigger />
  </HorizontalExpandV1.TriggerSlot>
  <HorizontalExpandV1.RightSlot>
    <YourRightContent />
  </HorizontalExpandV1.RightSlot>
</HorizontalExpandV1.Root>
```

## Files

```
side-stack-layout/
├── page.tsx                    # Main playground with UnifiedControlPanel
├── README.md                   # This file
├── core/
│   └── side-stack-layout.tsx   # Demo component
├── config/
│   ├── types.ts                # TypeScript types
│   ├── presets.ts              # Animation presets
│   └── options.ts              # Control options
└── panels/
    └── panel-config.ts         # Control panel structure
```

## Related

- `/playground/expanding-layout` - Vertical expanding layout (original)
- `HorizontalExpandV1` component - Composable horizontal expand system
- `BiaxialExpandV4` component - Reference for clip-path animation patterns

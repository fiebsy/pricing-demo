# Button Fluid Layout Playground

## Overview

Playground for the production `FluidButtonGroup` component with multi-state animated button support. Features fluid layout transitions and animated text/spinner/checkmark states.

## Core Component

Uses `FluidButtonGroup` from `@/components/ui/core/primitives/fluid-button-group`.

```tsx
import { FluidButtonGroup } from '@/components/ui/core/primitives/fluid-button-group'

<FluidButtonGroup
  visible="both"           // 'both' | 'primary' | 'secondary'
  timing="default"         // 'default' | 'snappy' | 'smooth' | custom FluidTiming
  gap={8}                  // Gap between buttons in pixels
  syncToExpand={true}      // Sync collapse timing to expand
  exitBlur={true}          // Enable blur effect on exit
  slowMo={false}           // 5x slower for debugging
  primaryButton={<AnimatedRightButton state={...} transition={...} />}
  secondaryButton={<Button>Back</Button>}
/>
```

## Multi-State Button System

The right button supports 4 configurable states with animated transitions:

| State | Default Config | Visual |
|-------|----------------|--------|
| 1 | "Upgrade" | Text only |
| 2 | "Upgrading" | Spinner + text |
| 3 | (empty) | Checkmark only |
| 4 | "Start creating" | Text only |

### State Configuration

Each state supports:
- **text** - Button label text
- **showText** - Whether to display text
- **showSpinner** - Show loading spinner
- **showCheckmark** - Show animated checkmark

### State Transitions

Text transitions use a slide animation (y-transform + opacity). Checkmark animation draws a circle then the check path.

| Setting | Default | Range |
|---------|---------|-------|
| Text Slide Duration | 200ms | 100-500ms |
| Checkmark Draw Duration | 250ms | 100-500ms |
| Spinner → Checkmark Duration | 300ms | 100-500ms |

## Toggle Behavior

- **View icon (left)** - Show both buttons
- **View-off icon (right)** - Show right button only (hides "Back")

## Key Implementation Insight

Uses explicit width calculations (`calc(50% - gap/2px)`) instead of `flex-1` to avoid text stretching during animation. This allows independent timing control for collapse vs expand animations.

## Timing Presets

| Preset | Collapse | Expand | Feel |
|--------|----------|--------|------|
| Default | 250ms | 525ms | Balanced, natural |
| Snappy | 150ms | 300ms | Quick, responsive |
| Smooth | 400ms | 700ms | Deliberate, emphatic |

## Features

- **Multi-state button** - 4 configurable states with animated transitions
- **Animated text** - Slide up/down transitions between text states
- **Loading spinner** - Spinning arc indicator
- **Animated checkmark** - Circle + checkmark path animation
- **Timing presets** - Quick selection of tuned animation feels
- **Custom timing** - Fine-grained control over all durations and easings
- **Exit blur** - Optional blur effect on exiting content
- **Sync to expand** - Collapse timing matches expand for unified feel
- **Slow motion** - 5x slower animations for debugging
- **Reduced motion** - Respects `motion-reduce` preference

## Use Cases

- Upgrade/subscription flows
- Multi-step confirmation states
- Loading → success transitions
- Conditional action buttons

## Animation Guidelines

Per `docs/ANIMATION-PREFERENCES.md`:
- S-Tier only: transform (y) + opacity for text slide
- SVG pathLength: For spinner → checkmark (compositor-friendly)
- Accessibility: `motion-reduce:transition-none` fallbacks included

## Production Usage

The `FluidButtonGroup` component is production-ready. The `AnimatedRightButton` is playground-specific but can be adapted for production use.

```tsx
import { FluidButtonGroup } from '@/components/ui/core/primitives/fluid-button-group'
```

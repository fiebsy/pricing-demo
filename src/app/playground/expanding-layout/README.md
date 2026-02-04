# Expanding Layout Playground

Playground for experimenting with expanding layout animations using Motion.dev's `layout` prop.

## Overview

Three (or more) containers displayed side-by-side. Clicking one expands it to reveal hidden content (Square B) while pushing siblings. Only one container can be expanded at a time.

## Animation Approach

Uses Motion.dev's `layout` prop with `LayoutGroup` for automatic FLIP-based animations:

1. **`layout` prop on containers** - Automatically animates position/size changes
2. **`layout="position"` on Square A** - Prevents text distortion during parent scale
3. **`LayoutGroup` wrapper** - Coordinates sibling animations
4. **`AnimatePresence` for Square B** - Enables exit animations

## State Model

Single `expandedIndex: number | null` - only one container expanded at a time.

## Key Configuration

### Animation Type
- **Spring**: Physics-based with stiffness, damping, mass controls
- **Tween**: Duration-based with easing curves

### Presets
| Preset | Type | Feel |
|--------|------|------|
| default | Spring (300/30) | Balanced, smooth |
| snappy | Spring (500/35) | Quick, responsive |
| bouncy | Spring (400/15) | Playful overshoot |
| smooth | Tween (400ms) | Gentle, no bounce |

### Square B Animation
- Entry delay, duration, scale, opacity
- Exit duration
- Independent from layout animation

## File Structure

```
expanding-layout/
├── page.tsx                # Main playground page
├── core/
│   └── expanding-layout.tsx  # Core component (migration-ready)
├── config/
│   ├── types.ts            # PlaygroundConfig interface
│   ├── presets.ts          # Preset definitions
│   └── options.ts          # Control options
├── panels/
│   └── panel-config.ts     # UnifiedControlPanel config
└── README.md               # This file
```

## Migration to Production

1. Copy `core/expanding-layout.tsx` to production location
2. Extract desired preset values from `config/presets.ts`
3. Remove playground-specific props (showDebug, slowMoEnabled, etc.)
4. Add business logic as needed

## Usage Example

```tsx
import { ExpandingLayout } from './core/expanding-layout'

const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

<ExpandingLayout
  config={config}
  expandedIndex={expandedIndex}
  onContainerClick={(index) =>
    setExpandedIndex(prev => prev === index ? null : index)
  }
/>
```

## Motion.dev Concepts Used

- `layout` - Automatic FLIP animations for layout changes
- `LayoutGroup` - Coordinate animations across siblings
- `AnimatePresence` - Mount/unmount animations
- Spring physics - Stiffness, damping, mass
- Tween easing - Duration-based curves

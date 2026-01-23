# Quick Fix Interactions Playground

Refine the Tinder-style swiping cards, flow method selection, completion state, and status island interactions.

## Status

- [x] Incubating
- [ ] Production ready

## Preview Modes

| Mode | Description |
|------|-------------|
| Card Stack | Tinder-style swipeable T/F question cards |
| Flow Selector | "Choose Fix Method" option cards |
| Completion | Success state with memory bullets |
| Island | Floating status bar with metrics |

## Files

| File | Purpose | Migrate? |
|------|---------|----------|
| `page.tsx` | Playground wrapper | Delete |
| `core/SwipeableCard.tsx` | Draggable card with swipe gestures | Yes |
| `core/ActionButtons.tsx` | True/False action buttons | Yes |
| `core/ProgressBar.tsx` | Configurable progress indicator | Yes |
| `core/CompletionState.tsx` | Success view with bullets | Yes |
| `core/FlowSelector.tsx` | Flow method option cards | Yes |
| `core/StatusIsland.tsx` | Floating status bar | Yes |
| `config/types.ts` | Type definitions | Yes |
| `config/presets.ts` | Preset definitions | Yes (as variants) |
| `config/options.ts` | Control options | No |
| `panels/panel-config.ts` | Panel config | No |
| `constants/mock-data.ts` | Sample data | No |

## Migration Target

```
src/components/ui/prod/features/quick-fix/
├── SwipeableCard.tsx
├── ActionButtons.tsx
├── ProgressBar.tsx
├── CompletionState.tsx
├── FlowSelector.tsx
├── StatusIsland.tsx
├── types.ts
└── index.ts
```

## Configuration Sections

### Card Config
- Size (width, height, padding, border radius)
- Stack appearance (offset, scale reduction, visible count)
- Background, border, shadow
- Typography (size, weight, color)

### Swipe Config
- Thresholds (distance, velocity)
- Exit animation (distance, rotation, duration)
- Return animation duration
- Drag feedback (rotation, scale)
- Overlay appearance

### Button Config
- Size and icon size
- True/False colors (background, icon)
- Border radius
- Hover/press feedback scales
- Ripple effect toggle

### Progress Config
- Bar height and radius
- Background and fill colors
- Animation toggle and duration
- Label display and position

### Completion Config
- Success icon size and colors
- Bullet style (dot, check, arrow)
- CTA button style and size

### Island Config
- Layout (padding, gap, border radius)
- Background (color, blur, border)
- Section visibility toggles
- Confidence wheel size

### Flow Options Config
- Card padding, radius, gap
- Icon size and circle size
- Typography sizes
- Hover/selected states

## Presets

| Preset | Description |
|--------|-------------|
| Default | Standard Tinder-style cards |
| Compact | Smaller cards for dense layouts |
| Playful | Dramatic swipe animations |
| Minimal | Clean, subtle interactions |
| Premium | Refined, polished appearance |

## Checklist

- [x] Card stack with configurable appearance
- [x] Swipe gestures with configurable thresholds
- [x] True/False overlay feedback
- [x] Action buttons with ripple effect
- [x] Progress indicator with animation
- [x] Completion state with memory bullets
- [x] Flow selector with hover/selected states
- [x] Status island with all sections
- [x] Preset system with copy functionality
- [ ] Touch gesture support testing
- [ ] Accessibility review
- [ ] Production migration

---

**Last Updated**: January 2025

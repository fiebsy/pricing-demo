# Modal Playground

Base UI Dialog component with Motion animations and comprehensive styling controls.

## Overview

This playground incubates a customizable modal component using:
- **Base UI Dialog** for accessibility and focus management
- **Motion** for enter/exit animations
- **Non-modal mode** so the control panel remains accessible while the modal is open

## File Structure

```
modal/
├── page.tsx                  # Playground page with state management
├── core/
│   ├── modal.tsx             # PlaygroundModal component
│   ├── crossfade-text.tsx    # Text transition animations
│   ├── content-slot.tsx      # Content renderer (wireframe/text)
│   └── animated-wireframe-lines.tsx
├── components/
│   └── stage-controls.tsx    # Stage switching UI
├── config/
│   ├── types.ts              # TypeScript interfaces
│   ├── options.ts            # Control panel options
│   ├── presets.ts            # Default config + presets
│   └── stages.ts             # Stage definitions
├── panels/
│   └── panel-config.ts       # 11-section panel builder
├── utils/
│   └── class-builders.ts     # Style utilities + animation builders
└── README.md                 # This file
```

## Features

### Modal Sections

1. **Container** - Width, height, padding, corners, shine, depth, shadow, border
2. **Header** - Asset placeholder, title with typography controls
3. **Content A** - Configurable wireframe lines or text
4. **Content B** - Additional content section
5. **Buttons** - 1 or 2 buttons with variant/size controls
6. **Close Button** - Position, offset, size, background styling
7. **Backdrop** - Blur, opacity, dismissable toggle
8. **Animation** - Presets (scale-fade, slide-up, flip-3d, etc.) + timing
9. **Text Transitions** - Crossfade/flip modes with easing presets
10. **Stages** - Multi-stage content configuration
11. **Debug** - Page background, debug overlay, slow-mo, container outlines

---

## Animation Architecture

The modal animation system operates at three levels:

### 1. Container Animation (Entry/Exit)

**Location**: `utils/class-builders.ts` → `buildAnimationVariants()`, `buildSpringTransition()`
**Applied in**: `core/modal.tsx` (lines 214-231)

Controls the modal's entry and exit transitions.

| Control | Config Path | Range | Default |
|---------|-------------|-------|---------|
| Preset | `animation.preset` | 6 presets + custom | scale-fade |
| Duration | `animation.duration` | 100-800ms | 300ms |
| Bounce | `animation.bounce` | 0-0.5 | 0.15 |
| Delay | `animation.delay` | 0-300ms | 0ms |

### 2. Text Transitions (Content Crossfade)

**Location**: `core/crossfade-text.tsx`
**Panel Config**: `panels/panel-config.ts` (lines 868-924)

Animates text changes within titles and buttons when switching stages.

| Control | Config Path | Options/Range | Default |
|---------|-------------|---------------|---------|
| Mode | `textTransition.mode` | crossfade, flip | crossfade |
| Easing | `textTransition.easing` | spring, elastic, expo-out, ease-out | spring |
| Y Offset | `textTransition.yOffset` | 4-20px | 8px |
| Duration | `textTransition.duration` | 100-400ms (non-spring only) | 200ms |

### 3. Layout Morphing (Height Transitions)

**Location**: `core/modal.tsx` (lines 226-237)
**Panel Config**: Animation section → "Layout Morphing" group

Animates height changes when switching between stages.

| Control | Config Path | Options/Range | Default |
|---------|-------------|---------------|---------|
| Style | `animation.layout.style` | spring, tween | spring |
| Duration | `animation.layout.duration` | 0.1-1.0s | 0.4s |
| Bounce | `animation.layout.bounce` | 0-0.5 (spring only) | 0.1 |
| Easing | `animation.layout.easing` | easeOut, easeInOut, linear (tween only) | easeOut |

---

### Animation Presets

| Preset | Initial State | Animation |
|--------|--------------|-----------|
| `scale-fade` | opacity:0, scale:0.95 | Fade in + scale up |
| `slide-up` | opacity:0, y:100 | Slide from bottom |
| `slide-down` | opacity:0, y:-100 | Slide from top |
| `flip-3d` | opacity:0, rotateX:-15, scale:0.9 | 3D rotation effect |
| `bounce` | opacity:0, scale:0.3, y:-50 | Elastic bounce |
| `custom` | User-defined | Uses scale.initial + translateY.initial |

### Custom Preset Controls

Shown only when `animation.preset === 'custom'`:

| Control | Config Path | Range |
|---------|-------------|-------|
| Scale Initial | `animation.scale.initial` | 0.5-1.2 |
| Scale Animate | `animation.scale.animate` | 0.8-1.2 |
| TranslateY Initial | `animation.translateY.initial` | -200 to 200px |
| TranslateY Animate | `animation.translateY.animate` | -100 to 100px |

### Debug Controls

| Control | Config Path | Effect |
|---------|-------------|--------|
| Slow Motion | `demo.slowMo` | 4x duration multiplier |
| Show Debug | `demo.showDebug` | Displays preset/duration info |
| Auto Open | `demo.autoOpen` | Keeps modal open for testing |
| Show Outlines | `demo.showContainerOutlines` | Colored borders around sections |

---

## Data Flow

```
Control Panel → setConfig() → ModalPlaygroundConfig
                                    ↓
                      buildAnimationVariants(animation)
                      buildSpringTransition(animation, slowMo)
                                    ↓
                      <motion.div variants={} transition={}>
                                    ↓
                      Motion.js renders spring animation
```

---

### Non-Modal Mode

The modal uses `modal={false}` on Dialog.Root, which:
- Keeps focus in the modal but doesn't trap it
- Allows interaction with the control panel
- Backdrop click still dismisses (when dismissable=true)

## Migration Guide

### Extract Core Component

1. Copy `core/modal.tsx` to production location
2. Simplify to essential props:

```tsx
interface ModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  children: React.ReactNode
  // Optional overrides
  width?: number
  animation?: 'scale-fade' | 'slide-up' | 'slide-down'
}
```

### Convert Presets to Variants

The playground's configurable styles become component variants:

```tsx
// From playground config
container.shine: 'shine-1-subtle'
container.cornerShape: 'squircle'
animation.preset: 'scale-fade'

// To component variant
<Modal variant="default" animation="scale-fade">
<Modal variant="dramatic" animation="flip-3d">
```

### Remove Playground Dependencies

- Remove debug controls
- Remove wireframe placeholders
- Replace with actual content slots
- Hardcode animation timing

## Usage Examples

### Basic Modal

```tsx
import { Modal } from '@/components/ui/core/primitives/modal'

function Example() {
  const [open, setOpen] = useState(false)

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      title="Confirm Action"
    >
      <p>Are you sure you want to continue?</p>
      <Button onClick={() => setOpen(false)}>Confirm</Button>
    </Modal>
  )
}
```

### With Animation Preset

```tsx
<Modal
  open={open}
  onOpenChange={setOpen}
  title="Premium Feature"
  animation="flip-3d"
  variant="dramatic"
>
  ...
</Modal>
```

## Key Files for Animation

| File | Purpose |
|------|---------|
| `config/types.ts` | Type definitions for all animation config |
| `utils/class-builders.ts` | Builds Motion variants and transitions |
| `core/modal.tsx` | Applies animations to modal container |
| `core/crossfade-text.tsx` | Text transition animations |
| `panels/panel-config.ts` | Control panel configuration |
| `config/presets.ts` | Preset definitions |

## Dependencies

- `@base-ui/react/dialog`
- `motion/react`
- `@/components/ui/core/primitives/button`
- `@hugeicons-pro/core-stroke-rounded`

## Related

- Base UI Dialog docs: `.claude/base-ui/components/dialog.md`
- Motion + Base UI integration: `.claude/motion-dev/getting-started/base-ui-setup.md`
- Effects utilities: `.claude/styles/utilities/effects.md`

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
├── page.tsx              # Playground page with state management
├── core/
│   └── modal.tsx         # PlaygroundModal component
├── config/
│   ├── types.ts          # TypeScript interfaces
│   ├── options.ts        # Control panel options
│   └── presets.ts        # Default config + presets
├── panels/
│   └── panel-config.ts   # 9-section panel builder
├── utils/
│   └── class-builders.ts # Style utilities
└── README.md             # This file
```

## Features

### Modal Sections

1. **Container** - Width, height, padding, corners, shine, depth, shadow, border
2. **Header** - Asset placeholder, title with typography controls
3. **Content A** - Configurable wireframe lines
4. **Content B** - Additional content section
5. **Buttons** - 1 or 2 buttons with variant/size controls
6. **Close Button** - Position, offset, size
7. **Backdrop** - Blur, opacity, dismissable toggle
8. **Animation** - Presets (scale-fade, slide-up, flip-3d, etc.) + timing
9. **Debug** - Page background, debug overlay, slow-mo

### Animation Presets

| Preset | Effect |
|--------|--------|
| `scale-fade` | Classic scale + opacity |
| `slide-up` | Mobile-style bottom entrance |
| `slide-down` | Top entrance |
| `flip-3d` | Dramatic 3D rotation |
| `bounce` | Playful spring effect |
| `custom` | User-defined scale/translateY |

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

## Dependencies

- `@base-ui/react/dialog`
- `motion/react`
- `@/components/ui/core/primitives/button`
- `@hugeicons-pro/core-stroke-rounded`

## Related

- Base UI Dialog docs: `.claude/base-ui/components/dialog.md`
- Motion + Base UI integration: `.claude/motion-dev/getting-started/base-ui-setup.md`
- Effects utilities: `.claude/styles/utilities/effects.md`

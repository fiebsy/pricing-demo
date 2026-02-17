# Cursor Playground

Motion+ Cursor component playground for experimenting with custom cursor effects.

## Status
- [x] Incubating
- [ ] Production ready

## Package Dependency

This playground requires `motion-plus`:

```bash
pnpm add "https://api.motion.dev/registry.tgz?package=motion-plus&version=latest&token=YOUR_TOKEN"
```

## Files

| File | Purpose | Migrate? |
|------|---------|----------|
| `page.tsx` | Playground wrapper | Delete |
| `core/cursor-preview.tsx` | Cursor component wrapper | Yes |
| `config/types.ts` | Type definitions | Yes |
| `config/presets.ts` | Preset definitions | Convert to variants |
| `config/options.ts` | Control options | No |
| `panels/panel-config.ts` | Panel config | No |

## Migration Target

`src/components/ui/prod/features/cursor/`

## Key Features

### Modes
- **Replace**: Hides the browser cursor, custom cursor becomes the pointer
- **Follow**: Custom cursor trails behind the browser cursor

### Magnetic Snapping
- Snap to interactive elements (buttons, links)
- Configurable snap strength (0-1)
- Optional morph to target element shape

### Spring Animation
- Add spring physics to cursor movement
- Configurable stiffness, damping, mass

### State Variants
- `default`: Base state
- `pointer`: When hovering links/buttons
- `pressed`: When mouse is clicked
- `text`: When hovering selectable text
- `magnetic`: When snapped to target

### Mix Blend Modes
- `normal`: Standard rendering
- `difference`: Inverts colors under cursor
- `multiply`, `screen`, `overlay`: Creative effects

## Presets

| Preset | Description |
|--------|-------------|
| Default | Standard cursor replacement |
| Minimal Dot | Small 8px dot |
| Follow Trail | Smooth trailing cursor |
| Magnetic Snap | Snaps to interactive elements |
| Magnetic (No Morph) | Snaps but keeps shape |
| Invert (Difference) | Inverts colors under cursor |
| Brand Accent | Brand colored cursor |
| Bouncy Follow | Playful bouncy trail |
| iOS Pointer | iPadOS-style pointer |

## Usage Example

```tsx
import { Cursor } from 'motion-plus/react'

// Basic replacement cursor
<Cursor />

// Follow cursor with spring
<Cursor
  follow
  spring={{ stiffness: 500, mass: 2 }}
/>

// Magnetic snapping
<Cursor
  magnetic={{ snap: 0.8, morph: true }}
/>

// Custom variants
<Cursor
  variants={{
    pointer: { scale: 1.5 },
    pressed: { scale: 0.8, filter: 'blur(5px)' },
  }}
/>
```

## Checklist

- [x] Component renders in playground
- [x] Presets switch correctly
- [x] Control panel updates live
- [ ] Test all magnetic targets
- [ ] Test text selection mode
- [ ] Test zone-based customization
- [ ] Document production API
- [ ] Migrate to production location

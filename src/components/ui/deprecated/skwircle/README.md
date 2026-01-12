# Skwircle

A unified squircle component system with variant-first API. Build cards, buttons, badges, and more with consistent rounded-corner styling.

## Quick Start

```tsx
import { Skwircle } from '@/components/ui/skwircle'

// Use compound components for common patterns
<Skwircle.Card>Card content</Skwircle.Card>
<Skwircle.Button intent="primary">Click me</Skwircle.Button>
<Skwircle.Badge>Status</Skwircle.Badge>
```

---

## Building Cards (The Simple Way)

### Basic Card

```tsx
<Skwircle.Card elevation="sm" roundness="rounded">
  <div className="p-4">
    <h3>Card Title</h3>
    <p>Card content goes here</p>
  </div>
</Skwircle.Card>
```

### Card with Border

```tsx
<Skwircle.Card
  borderWidth={1}
  borderColor="border-secondary"
  roundness="rounded"
>
  <div className="p-4">Content</div>
</Skwircle.Card>
```

### Fixed-Width Card (fillMode)

When you set a specific width, use `fillMode` to ensure content fills properly:

```tsx
<Skwircle.Card
  fillMode
  elevation="sm"
  borderWidth={2}
  style={{ width: 400 }}
>
  <div className="p-4">Content expands to fill</div>
</Skwircle.Card>
```

**Why fillMode matters:** When `fillMode={true}`, the border is drawn *inside* the container bounds. Without it, borders extend *outside* the content, which can cause overflow.

---

## Building Styled Cards (Multi-Zone Layout)

For cards with distinct zones (preview area + footer), structure your content with flex:

```tsx
<Skwircle.Card
  elevation="sm"
  roundness="rounded"
  borderWidth={2}
  fillMode
  style={{ width: 400 }}
>
  {/* Flex container for zones */}
  <div className="flex flex-col flex-1 w-full">
    {/* Preview Zone */}
    <div
      className="flex-1 flex items-center justify-center"
      style={{ backgroundColor: '#f5f5f5', aspectRatio: '4/3' }}
    >
      Preview content
    </div>

    {/* Footer Zone */}
    <div className="bg-gray-900 p-4">
      <h3 className="text-white font-semibold">Title</h3>
      <p className="text-gray-400 text-sm">Subtitle</p>
    </div>
  </div>
</Skwircle.Card>
```

### Adding Depth Gradients

Use `backgroundGradient` for subtle inner shadow effects:

```tsx
<Skwircle.Card
  elevation="sm"
  backgroundGradient="depth-10-bottom-right"  // 10% opacity, bottom-right direction
  fillMode
  style={{ width: 400 }}
>
  ...
</Skwircle.Card>
```

Available depth presets:
- Intensity: `3`, `5`, `8`, `10`, `12`, `15`, `20`, `25`, `30` (opacity %)
- Direction: `top`, `bottom`, `left`, `right`, `top-left`, `top-right`, `bottom-left`, `bottom-right`
- Format: `depth-{intensity}-{direction}` (e.g., `depth-15-bottom-right`)

---

## Props Reference

### Shape & Style

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `roundness` | `'none' \| 'subtle' \| 'moderate' \| 'rounded' \| 'pill'` | varies | Corner radius |
| `elevation` | `'none' \| 'xs' \| 'sm'` | varies | Shadow depth |
| `borderWidth` | `number` | `0` | Border thickness in pixels |
| `borderColor` | `string` | - | Border color (semantic token) |
| `backgroundColor` | `string` | - | Background color override |
| `backgroundGradient` | `string` | - | Depth gradient preset |

### Layout

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `fillMode` | `boolean` | `false` | Content expands to fill container |
| `overflow` | `'hidden' \| 'visible' \| 'clip'` | `'hidden'` | Overflow behavior |
| `style` | `CSSProperties` | - | Container styles (width, etc.) |

### Ring (Outer Border)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ring` | `boolean` | `false` | Enable outer ring effect |
| `ringColor` | `string` | `'outline-color-brand'` | Ring color |
| `ringWidth` | `number` | `2` | Ring thickness |
| `ringOpacity` | `number` | `100` | Ring opacity (0-100) |

### Intent (Color Schemes)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `intent` | `'default' \| 'primary' \| 'secondary' \| 'ghost' \| 'error' \| 'success' \| 'warning'` | `'default'` | Semantic color scheme |

---

## Understanding fillMode vs Default

### Default Behavior (fillMode=false)
- Component wraps tightly around content
- Border extends **outside** content bounds
- Best for: inline elements, buttons, badges

```tsx
// Border adds to total width
<Skwircle.Badge borderWidth={1}>Status</Skwircle.Badge>
```

### fillMode Behavior (fillMode=true)
- Component fills its container
- Border is drawn **inside** container bounds
- Best for: fixed-width cards, containers with set dimensions

```tsx
// Border stays within 400px
<Skwircle.Card fillMode borderWidth={2} style={{ width: 400 }}>
  Content
</Skwircle.Card>
```

**Visual comparison:**

```
fillMode=false (default):
┌──────────────────────────┐  <- Border ADDS to width
│  ┌──────────────────┐    │
│  │     Content      │    │
│  └──────────────────┘    │
└──────────────────────────┘

fillMode=true:
┌──────────────────────────┐  <- Border WITHIN container
│  Content fills this      │
│  entire space            │
└──────────────────────────┘
```

---

## Compound Components

### Skwircle.Card
Pre-configured for container use cases.
- Default roundness: `moderate`
- Default elevation: `none`
- Default fillMode: `true`

### Skwircle.Button
Pre-configured for interactive buttons.
- Default roundness: `rounded`
- Includes hover states
- Keyboard accessible (Enter/Space triggers onClick)

### Skwircle.Badge
Pre-configured for labels/tags.
- Default roundness: `pill`
- Compact sizing

### Skwircle.Input
Pre-configured for form inputs.
- Default roundness: `subtle`
- Ring effect for focus states

### Skwircle.Avatar
Pre-configured for profile images.
- Default roundness: `pill` (circular)
- Overflow hidden

---

## Folder Structure

```
skwircle/
├── components/          # Compound component wrappers
│   ├── skwircle-button
│   ├── skwircle-badge
│   ├── skwircle-card
│   ├── skwircle-input
│   └── skwircle-avatar
├── config/              # Presets
│   ├── variants.ts      # Default variant settings
│   ├── intents.ts       # Intent color schemes
│   ├── roundness.ts     # Corner radius presets
│   ├── elevations.ts    # Shadow presets
│   └── gradients.ts     # Border/background gradients
├── core/                # Hooks
│   ├── use-dimensions
│   ├── use-hover-state
│   ├── use-skwircle-colors
│   ├── use-skwircle-mount
│   └── use-skwircle-shape
├── rendering/           # SVG rendering
│   ├── skwircle-svg
│   ├── skwircle-shadow
│   └── skwircle-gradients
├── utils/               # Utilities
│   ├── color-resolver
│   └── path-generator
├── skwircle.tsx         # Base component
├── types.ts             # Type definitions
└── index.ts             # Public exports
```

---

## Architecture Notes

### How Borders Work

Skwircle uses SVG-based rendering for pixel-perfect squircle corners. The component renders three layers:

1. **Shadow layer** - Drop shadow (if elevation > none)
2. **SVG shape layer** - Border + background paths
3. **Content layer** - Your children with margin for border space

When you add a border:
- The border is rendered as an SVG path
- Content gets margin equal to border width
- This keeps content properly inset from the border

### fillMode Implementation

When `fillMode=true`:
- Container is measured first
- Border offset is subtracted from measured dimensions
- SVG paths fit exactly within container bounds
- Content fills the remaining space inside the border

This ensures borders don't cause layout shifts or overflow.

### FOUC Prevention

The component uses smart mounting to prevent Flash of Unstyled Content:
- Dimensions are measured before showing
- `mountStrategy="auto"` (default) fades in when ready
- Use `mountStrategy="immediate"` with `initialDimensions` for SSR

### Semantic Tokens

All colors use semantic tokens for theme compatibility:
```tsx
// Good - theme-aware
borderColor="border-secondary"
backgroundColor="bg-primary"

// Avoid - hard-coded
borderColor="#e5e7eb"
backgroundColor="#ffffff"
```

# Skwircle Component Documentation

> **iOS-style squircle shapes** rendered with SVG for pixel-perfect design

## Quick Navigation

| Document | Purpose |
|----------|---------|
| [Architecture](./ARCHITECTURE.md) | SVG rendering, layer system, path generation |
| [Props Reference](./PROPS-REFERENCE.md) | Complete API documentation |
| [Styling Guide](./STYLING-GUIDE.md) | Colors, borders, rings, fill modes, gradients |
| [Variant System](./VARIANT-SYSTEM.md) | Pre-built variants, intents, sizing |

---

## What is Skwircle?

Skwircle is a foundational UI primitive that renders **superellipse shapes** (iOS-style rounded corners) using SVG. Unlike CSS `border-radius` which creates circular corners, Skwircle produces the smooth, continuous curves found in Apple's design language.

### Key Features

- **SVG-based rendering** for pixel-perfect shapes at any size
- **Multi-layer architecture** with shadow, border, background, and content layers
- **Semantic color tokens** that automatically adapt to light/dark modes
- **Variant system** with pre-configured button, card, badge, input, and avatar presets
- **Intent system** for semantic styling (primary, secondary, error, success, etc.)
- **Border gradients** for shine and glow effects
- **Ring system** for focus states and double-border effects

---

## Component Hierarchy

```
Skwircle (base)
├── Skwircle.Button   # Interactive button variant
├── Skwircle.Card     # Container/panel variant
├── Skwircle.Badge    # Label/tag variant
├── Skwircle.Input    # Form input wrapper variant
└── Skwircle.Avatar   # Profile image variant
```

---

## Basic Usage

```tsx
import { Skwircle } from '@/components/ui/skwircle'

// Basic card
<Skwircle.Card>
  <div className="p-4">Card content</div>
</Skwircle.Card>

// Primary button
<Skwircle.Button intent="primary" onClick={handleClick}>
  Submit
</Skwircle.Button>

// Badge with color
<Skwircle.Badge
  backgroundColor="utility-success-50"
  borderColor="utility-success-200"
>
  <span className="text-utility-success-700">Active</span>
</Skwircle.Badge>
```

---

## Directory Structure

```
skwircle/
├── docs/                    # Documentation (you are here)
│   ├── INDEX.md
│   ├── ARCHITECTURE.md
│   ├── PROPS-REFERENCE.md
│   ├── STYLING-GUIDE.md
│   └── VARIANT-SYSTEM.md
│
├── components/              # Compound component factories
│   ├── skwircle-button.tsx
│   ├── skwircle-badge.tsx
│   ├── skwircle-card.tsx
│   ├── skwircle-input.tsx
│   └── skwircle-avatar.tsx
│
├── config/                  # Configuration & presets
│   ├── constants.ts         # Semantic color token mappings
│   ├── variants.ts          # Variant default configurations
│   ├── intents.ts           # Intent color schemes
│   ├── roundness.ts         # Superellipse curve presets
│   ├── elevations.ts        # Shadow elevation presets
│   ├── gradients.ts         # Gradient helper functions
│   ├── button.ts            # Button size/intent configs
│   └── badge.ts             # Badge size/type/color configs
│
├── core/                    # Core hooks
│   ├── use-dimensions.ts    # Element measurement
│   ├── use-hover-state.ts   # Hover tracking
│   ├── use-skwircle-colors.ts  # Color resolution
│   ├── use-skwircle-mount.ts   # FOUC prevention
│   └── use-skwircle-shape.ts   # SVG path generation
│
├── rendering/               # SVG rendering components
│   ├── skwircle-svg.tsx     # Main shape renderer
│   ├── skwircle-shadow.tsx  # Shadow layer
│   └── skwircle-gradients.tsx  # Gradient definitions
│
├── utils/                   # Utility functions
│   ├── path-generator.ts    # Superellipse path generation
│   └── color-resolver.ts    # Token to CSS resolution
│
├── skwircle.tsx             # Base component
├── types.ts                 # TypeScript interfaces
└── index.ts                 # Public exports
```

---

## Common Use Cases

### 1. Interactive Button

```tsx
<Skwircle.Button
  intent="primary"
  size="md"
  onClick={handleClick}
>
  <Icon />
  <span>Click me</span>
</Skwircle.Button>
```

### 2. Card with Shadow

```tsx
<Skwircle.Card
  elevation="sm"
  backgroundGradient="depth-10-bottom-right"
>
  <div className="p-6">
    <h3>Card Title</h3>
    <p>Card content goes here</p>
  </div>
</Skwircle.Card>
```

### 3. Input with Focus Ring

```tsx
<Skwircle.Input
  ring={isFocused}
  ringColor="outline-color-brand"
  borderColor={hasError ? 'border-error' : 'border-primary'}
>
  <input
    type="text"
    onFocus={() => setIsFocused(true)}
    onBlur={() => setIsFocused(false)}
  />
</Skwircle.Input>
```

### 4. Status Badge

```tsx
<Skwircle.Badge
  backgroundColor="utility-error-50"
  borderColor="utility-error-200"
>
  <WarningIcon />
  <span className="text-utility-error-700">Error</span>
</Skwircle.Badge>
```

---

## Quick Reference: Most Used Props

| Prop | Type | Description |
|------|------|-------------|
| `variant` | `'base' \| 'card' \| 'button' \| 'input' \| 'badge' \| 'avatar'` | Component type preset |
| `intent` | `'default' \| 'primary' \| 'secondary' \| 'ghost' \| 'error' \| 'success' \| 'warning'` | Color scheme |
| `roundness` | `'none' \| 'subtle' \| 'moderate' \| 'rounded' \| 'pill'` | Corner curvature |
| `elevation` | `'none' \| 'xs' \| 'sm'` | Shadow depth |
| `fillMode` | `boolean` | Border inside vs outside container |
| `ring` | `boolean` | Enable focus ring |
| `backgroundColor` | `string` | Background color token |
| `borderColor` | `string` | Border color token |

See [Props Reference](./PROPS-REFERENCE.md) for the complete API.

---

## Known Limitations & Issues

### 1. Border Overflow (without fillMode)
When `fillMode=false` (default), the border extends **outside** the content. Parent containers may need extra space.

### 2. Ring + Border Stacking
Using both `ring` and `borderWidth` adds their widths together. Plan layout accordingly.

### 3. Measurement Delay
The component measures itself on mount, causing a brief delay before rendering. Use `initialDimensions` for SSR.

### 4. Performance with Many Instances
SVG filters (shadows, gradients) are computationally expensive. Consider reducing `elevation` on pages with many squircles.

See [Styling Guide](./STYLING-GUIDE.md#troubleshooting) for solutions to common issues.

---

## When to Use Skwircle

**Use Skwircle when:**
- You need iOS-style smooth corners (not circular `border-radius`)
- The component is a key UI element (buttons, cards, badges)
- You need complex border effects (gradients, rings)
- Design consistency with Apple design language is important

**Consider alternatives when:**
- Simple rectangular elements that don't need smooth corners
- High-volume lists with hundreds of items (performance concern)
- Elements where standard `border-radius` is acceptable

---

## Related Documentation

- [Theme System](../../../styles/docs/THEME-STRUCTURE.md) - Semantic color tokens
- [Hugeicons Guide](../../../../docs/styles/icons/hugeicons.md) - Icon library usage
- [Playground](../../../../src/app/playground/PLAYGROUND.md) - Interactive testing

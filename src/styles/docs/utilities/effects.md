# Effects Utilities

Shine borders, depth gradients, animations, corners, and scrollbar utilities.

## Overview

Effect utilities provide visual polish: glossy shine effects, subtle depth gradients, smooth animations, and corner shapes. These create the premium feel of the PAYVA interface.

## Shine Borders

Shine effects create a glossy, 3D appearance using inset box-shadows. They simulate light hitting a surface.

**File Location:** `src/styles/utilities/shine.css`

### Shine Presets

| Preset | Angle | Effect |
|--------|-------|--------|
| `shine-0` | 195° | Angled shine |
| `shine-1` | 180° | Straight top-down |
| `shine-2` | 180° | Theme-aware border |
| `shine-3` | 180° | Enhanced, 2px thick |
| `shine-brand` | 180° | High contrast for buttons |

### Basic Usage

```tsx
// Standard shine
<div className="shine-1 bg-primary rounded-3xl p-4">
  Card with shine effect
</div>

// Different presets
<div className="shine-0 bg-secondary rounded-2xl">Angled</div>
<div className="shine-1 bg-secondary rounded-2xl">Standard</div>
<div className="shine-2 bg-secondary rounded-2xl">Theme-aware</div>
<div className="shine-3 bg-secondary rounded-2xl">Enhanced</div>
<button className="shine-brand bg-brand-solid rounded-lg">Button</button>
```

### Intensity Modifiers

Each shine preset has three intensity levels:

| Modifier | Intensity | Usage |
|----------|-----------|-------|
| `-subtle` | 60% | Understated effect |
| (none) | 100% | Default |
| `-intense` | 150% | Dramatic effect |

```tsx
<div className="shine-1-subtle bg-primary rounded-2xl">Subtle</div>
<div className="shine-1 bg-primary rounded-2xl">Normal</div>
<div className="shine-1-intense bg-primary rounded-2xl">Intense</div>
```

### Shine + Shadow Combinations

Pre-built combinations with drop shadows:

```tsx
// Normal intensity + shadow
<div className="shine-1-shadow-xs bg-primary rounded-xl">XS shadow</div>
<div className="shine-1-shadow-sm bg-primary rounded-xl">SM shadow</div>
<div className="shine-1-shadow-md bg-primary rounded-xl">MD shadow</div>
<div className="shine-1-shadow-lg bg-primary rounded-xl">LG shadow</div>

// Subtle intensity + shadow
<div className="shine-1-subtle-shadow-sm bg-primary rounded-xl">Subtle + SM</div>

// Intense intensity + shadow
<div className="shine-1-intense-shadow-md bg-primary rounded-xl">Intense + MD</div>
```

### All Shine Classes

```
shine-none
shine-0, shine-0-subtle, shine-0-intense
shine-1, shine-1-subtle, shine-1-intense
shine-2, shine-2-subtle, shine-2-intense
shine-3, shine-3-subtle, shine-3-intense
shine-brand, shine-brand-subtle, shine-brand-intense

// With shadows (xs, sm, md, lg for each)
shine-0-shadow-{size}, shine-0-subtle-shadow-{size}, shine-0-intense-shadow-{size}
shine-1-shadow-{size}, shine-1-subtle-shadow-{size}, shine-1-intense-shadow-{size}
// ... etc for all presets
```

### Shine Pattern Examples

```tsx
// Glass card
<div className="
  shine-2-subtle-shadow-md
  bg-primary
  rounded-3xl
  p-6
  backdrop-blur-sm
">
  Glass effect card
</div>

// Premium button
<button className="
  shine-brand
  bg-brand-solid
  hover:bg-brand-solid_hover
  rounded-xl
  px-6 py-3
  text-white
  font-medium
">
  Premium Action
</button>

// Elevated card
<div className="
  shine-1-shadow-lg
  bg-secondary
  rounded-2xl
  p-4
">
  Elevated card content
</div>
```

## Depth Gradients

Subtle vertical gradients that add dimensionality to surfaces.

**File Location:** `src/styles/utilities/depth.css`

### Depth Presets

```tsx
// Subtle depth variations
<div className="depth-gradient-1 rounded-xl">Depth 1</div>
<div className="depth-gradient-2 rounded-xl">Depth 2</div>
<div className="depth-gradient-3 rounded-xl">Depth 3</div>
```

### How Depth Works

Depth gradients layer a subtle white-to-transparent (or black-to-transparent) gradient over the background, creating the illusion of a curved surface.

```tsx
// Card with depth
<div className="
  bg-secondary
  depth-gradient-2
  rounded-xl
  p-4
">
  Card appears slightly curved
</div>
```

## Gradient Utilities

Predefined gradient presets.

**File Location:** `src/styles/utilities/gradients.css`

### Brand Gradient

```tsx
<div className="bg-gradient-to-r from-brand-gradient-from to-brand-gradient-to">
  Brand gradient (purple to cyan)
</div>

// Gradient text
<span className="
  bg-gradient-to-r from-brand-gradient-from to-brand-gradient-to
  bg-clip-text text-transparent
">
  Gradient text
</span>
```

### Custom Gradients

Use Tailwind's gradient utilities with semantic colors:

```tsx
// Vertical gradient
<div className="bg-gradient-to-b from-primary to-secondary">
  Top to bottom
</div>

// Radial-like effect
<div className="bg-gradient-to-br from-brand-primary to-transparent">
  Corner gradient
</div>
```

## Animations

Animation utilities and keyframes.

**File Location:** `src/styles/utilities/animations.css`

### Built-in Animations

```tsx
// Marquee (scrolling text)
<div className="overflow-hidden">
  <div className="animate-marquee whitespace-nowrap">
    Scrolling text content...
  </div>
</div>

// Caret blink (cursor effect)
<span className="animate-caret-blink">|</span>
```

### Animation Definitions

```css
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
}

@keyframes caret-blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
```

### Custom Animation Utilities

```tsx
// Fade utilities (if defined)
<div className="animate-fade-in">Fade in</div>
<div className="animate-fade-out">Fade out</div>

// Slide utilities
<div className="animate-slide-up">Slide up</div>
<div className="animate-slide-down">Slide down</div>
```

## Corner Shapes

Corner shape utilities for modern CSS corner styling.

**File Location:** `src/styles/utilities/corners.css`

Uses the `@toolwind/corner-shape` plugin.

### Corner Shape Values

| Utility | Effect |
|---------|--------|
| `corner-round` | Standard rounded (default) |
| `corner-bevel` | Straight diagonal cut |
| `corner-scoop` | Concave rounded |
| `corner-notch` | 90° concave square |
| `corner-square` | Sharp 90° |

```tsx
// Per-corner control
<div className="
  corner-tl-bevel
  corner-br-bevel
  corner-tr-round
  corner-bl-round
  rounded-xl
">
  Mixed corners
</div>
```

### Per-Corner Utilities

```
corner-tl-{shape}  // Top-left
corner-tr-{shape}  // Top-right
corner-bl-{shape}  // Bottom-left
corner-br-{shape}  // Bottom-right
corner-t-{shape}   // Top edge (both)
corner-b-{shape}   // Bottom edge (both)
corner-l-{shape}   // Left edge (both)
corner-r-{shape}   // Right edge (both)
```

## Scrollbar Utilities

Custom scrollbar styling.

**File Location:** `src/styles/utilities/misc.css`

### Scrollbar Classes

```tsx
// Hide scrollbar completely
<div className="scrollbar-hide overflow-y-auto h-64">
  Content with hidden scrollbar
</div>

// Overlay scrollbar (shows on hover)
<div className="scrollbar-overlay h-64">
  Content with overlay scrollbar
</div>
```

### How Overlay Scrollbar Works

- Always reserves space to prevent layout shift
- Scrollbar is invisible by default
- Shows on container hover
- Uses semantic `--color-fg-quaternary` for the thumb

## Transition Utilities

### Inherit Transitions

```tsx
// Inherit all transition properties from parent
<div className="transition-all duration-200">
  <span className="transition-inherit-all">
    Inherits parent's transition
  </span>
</div>
```

## SILK Component Styles

Styles for SILK gesture-driven components.

**File Location:** `src/styles/utilities/silk-styles.css`

### SILK Classes

```css
/* Bottom Sheet */
.silk-bottom-sheet-view
.silk-bottom-sheet-content
.silk-bottom-sheet-bg

/* Sidebar */
.silk-sidebar-view
.silk-sidebar-content
.silk-sidebar-bg

/* Form Sheet */
.silk-form-sheet-view
.silk-form-sheet-content
.silk-form-sheet-bg

/* Modal */
.silk-modal-view
.silk-modal-content
.silk-modal-bg

/* Toast */
.silk-toast-content
.silk-toast-bg
.silk-toast-bg.default
.silk-toast-bg.success
.silk-toast-bg.warning
.silk-toast-bg.error

/* Sheet Stack */
.silk-sheet-stack-primary
.silk-sheet-stack-secondary

/* Lightbox */
[data-silk-lightbox-view]
[data-silk-lightbox-dismiss-trigger]
```

## Third-Party Overrides

Styles for external libraries.

**File Location:** `src/styles/utilities/components-overrides.css`

### Covered Libraries

- Google Maps Place Autocomplete
- React Phone Input 2
- Radix UI Portal (backdrop prevention)

These use semantic tokens to match the design system.

## Effect Combinations

### Premium Card

```tsx
<div className="
  shine-2-subtle-shadow-lg
  depth-gradient-2
  bg-secondary
  rounded-3xl
  p-6
">
  <h3 className="text-display-sm font-display text-primary">
    Premium Card
  </h3>
  <p className="text-secondary mt-2">
    With all the bells and whistles
  </p>
</div>
```

### Glossy Button

```tsx
<button className="
  shine-brand
  bg-brand-solid
  hover:bg-brand-solid_hover
  rounded-2xl
  px-6 py-3
  text-white
  font-medium
  transition-all
">
  Glossy Action
</button>
```

### Frosted Glass

```tsx
<div className="
  shine-1-subtle
  bg-white/80
  backdrop-blur-md
  rounded-2xl
  p-4
  border border-white/20
">
  Frosted glass effect
</div>
```

## Related

- [Borders & Rings](./borders-rings.md): Border and focus utilities
- [Spacing & Sizing](../tokens/spacing-sizing.md): Shadow tokens
- [All Utilities](../reference/all-utilities.md): Complete utility list

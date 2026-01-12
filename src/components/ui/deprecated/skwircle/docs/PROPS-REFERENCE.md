# Skwircle Props Reference

> **Complete API documentation for all Skwircle props**

---

## Table of Contents

1. [Variant & Intent Props](#variant--intent-props)
2. [Shape Props](#shape-props)
3. [Border Props](#border-props)
4. [Ring Props](#ring-props)
5. [Background & Color Props](#background--color-props)
6. [Gradient Props](#gradient-props)
7. [Shadow Props](#shadow-props)
8. [Layout Props](#layout-props)
9. [Mount Strategy Props](#mount-strategy-props)
10. [Interactivity Props](#interactivity-props)
11. [Accessibility Props](#accessibility-props)
12. [Event Props](#event-props)
13. [Standard React Props](#standard-react-props)

---

## Variant & Intent Props

### `variant`

Pre-configured component type with default styling.

| Type | Default |
|------|---------|
| `'base' \| 'card' \| 'button' \| 'input' \| 'badge' \| 'avatar'` | `'base'` |

**Values:**
- `'base'` - Minimal defaults, most flexible
- `'card'` - Container with subtle shadow
- `'button'` - Interactive element with hover states
- `'input'` - Form input wrapper
- `'badge'` - Small label/tag
- `'avatar'` - Circular profile image

```tsx
<Skwircle variant="card">...</Skwircle>
// or use compound component
<Skwircle.Card>...</Skwircle.Card>
```

---

### `intent`

Semantic color scheme applied to the component.

| Type | Default |
|------|---------|
| `'default' \| 'primary' \| 'secondary' \| 'ghost' \| 'error' \| 'success' \| 'warning'` | `'default'` |

**Values:**
- `'default'` - Neutral colors (gray/white)
- `'primary'` - Brand color (solid background)
- `'secondary'` - Light background, standard border
- `'ghost'` - Transparent background, no border (until hover)
- `'error'` - Red/error colors
- `'success'` - Green/success colors
- `'warning'` - Yellow/warning colors

```tsx
<Skwircle.Button intent="primary">Submit</Skwircle.Button>
<Skwircle.Badge intent="error">Failed</Skwircle.Badge>
```

---

### `size`

Component size preset (primarily affects padding via variant configs).

| Type | Default |
|------|---------|
| `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` |

**Note:** Size behavior varies by variant. See [Variant System](./VARIANT-SYSTEM.md) for size configurations per variant.

---

### `state`

Current state for input variant (affects colors).

| Type | Default |
|------|---------|
| `'default' \| 'hover' \| 'focused' \| 'disabled' \| 'error'` | `'default'` |

**Note:** Only used by input variant.

```tsx
<Skwircle.Input state={isFocused ? 'focused' : 'default'}>
  <input />
</Skwircle.Input>
```

---

## Shape Props

### `roundness`

Corner curvature preset. Controls the superellipse smoothing.

| Type | Default |
|------|---------|
| `'none' \| 'subtle' \| 'moderate' \| 'rounded' \| 'pill'` | Varies by variant |

**Values & CSS Fallbacks:**
| Value | Border Radius | Visual |
|-------|---------------|--------|
| `'none'` | 0px | Sharp corners |
| `'subtle'` | 16px | Slight rounding |
| `'moderate'` | 22px | Standard cards |
| `'rounded'` | 32px | Buttons |
| `'pill'` | 9999px | Capsule/circular |

**Variant Defaults:**
- `base`: `'moderate'`
- `card`: `'rounded'`
- `button`: `'rounded'`
- `input`: `'subtle'`
- `badge`: `'rounded'`
- `avatar`: `'pill'`

```tsx
<Skwircle roundness="pill">Pill shape</Skwircle>
```

---

### `elevation`

Shadow depth preset.

| Type | Default |
|------|---------|
| `'none' \| 'xs' \| 'sm'` | Varies by variant |

**Shadow Configurations:**
| Value | Y-Offset | Blur | Opacity |
|-------|----------|------|---------|
| `'none'` | 0 | 0 | 0 |
| `'xs'` | 2px | 2px | 0.09 |
| `'sm'` | 2px | 4px | 0.08 |

**Variant Defaults:**
- `base`: `'none'`
- `card`: `'xs'`
- `button`: `'sm'`
- `input`: `'none'`
- `badge`: `'none'`
- `avatar`: `'none'`

```tsx
<Skwircle.Card elevation="sm">Card with shadow</Skwircle.Card>
```

---

## Border Props

### `borderWidth`

Border thickness in pixels.

| Type | Default |
|------|---------|
| `number` | Varies by variant |

**Variant Defaults:**
- `base`, `card`, `input`, `badge`: `1`
- `button`, `avatar`: `0`

```tsx
<Skwircle borderWidth={2}>Thicker border</Skwircle>
```

---

### `borderColor`

Border color using semantic token or CSS color.

| Type | Default |
|------|---------|
| `string` | Varies by intent |

**Common Values:**
- `'border-primary'` - Standard border
- `'border-secondary'` - Subtle border
- `'border-brand'` - Brand color border
- `'border-error'` - Error state
- `'transparent'` - No visible border

```tsx
<Skwircle borderColor="border-brand">Brand border</Skwircle>
```

---

### `borderColorHover`

Border color on hover (only applies if `interactive={true}`).

| Type | Default |
|------|---------|
| `string` | Same as `borderColor` |

```tsx
<Skwircle
  interactive
  borderColor="border-primary"
  borderColorHover="border-brand"
>
  Hover to see brand border
</Skwircle>
```

---

## Ring Props

Ring creates a secondary border outside the main border, commonly used for focus states.

### `ring`

Enable/disable the ring layer.

| Type | Default |
|------|---------|
| `boolean` | `false` |

```tsx
<Skwircle.Input ring={isFocused}>
  <input />
</Skwircle.Input>
```

---

### `ringColor`

Ring color using semantic token or CSS color.

| Type | Default |
|------|---------|
| `string` | `'outline-color-brand'` |

**Common Values:**
- `'outline-color-brand'` - Brand focus color
- `'outline-color-error'` - Error focus color

```tsx
<Skwircle.Input
  ring={true}
  ringColor={hasError ? 'outline-color-error' : 'outline-color-brand'}
>
  <input />
</Skwircle.Input>
```

---

### `ringWidth`

Ring thickness in pixels.

| Type | Default |
|------|---------|
| `number` | `2` |

---

### `ringOpacity`

Ring opacity from 0-100.

| Type | Default |
|------|---------|
| `number` | `100` |

```tsx
<Skwircle ring ringWidth={3} ringOpacity={50}>
  Semi-transparent ring
</Skwircle>
```

---

## Background & Color Props

### `backgroundColor`

Background color using semantic token or CSS color.

| Type | Default |
|------|---------|
| `string` | Varies by intent |

**Common Values:**
- `'background-primary'` - White/dark background
- `'background-secondary'` - Slightly tinted
- `'background-brand-solid'` - Brand color solid
- `'transparent'` - No background

```tsx
<Skwircle backgroundColor="background-brand-solid">
  Brand background
</Skwircle>
```

---

### `backgroundColorHover`

Background color on hover (only applies if `interactive={true}`).

| Type | Default |
|------|---------|
| `string` | Varies by intent |

```tsx
<Skwircle.Button
  backgroundColor="background-primary"
  backgroundColorHover="background-secondary"
>
  Hover effect
</Skwircle.Button>
```

---

## Gradient Props

### `borderGradient`

Gradient effect applied to the border.

| Type | Default |
|------|---------|
| `'none' \| 'shine-corners' \| 'edge-glow' \| 'custom'` | `'none'` |

**Values:**
- `'none'` - Solid border color
- `'shine-corners'` - Diagonal shine effect (135° angle)
- `'edge-glow'` - Edge glow with middle fade
- `'custom'` - Use `customBorderGradient`

```tsx
<Skwircle.Card borderGradient="shine-corners">
  Shiny border
</Skwircle.Card>
```

---

### `customBorderGradient`

Custom gradient configuration for border (when `borderGradient="custom"`).

| Type | Default |
|------|---------|
| `GradientConfig` | `undefined` |

```tsx
type GradientConfig = {
  type: 'linear' | 'radial'
  angle?: number  // For linear
  stops: Array<{
    color: string
    position: number  // 0-100
    opacity?: number  // 0-1
  }>
}
```

---

### `backgroundGradient`

Gradient overlay on the background for depth effects.

| Type | Default |
|------|---------|
| `string` | `'none'` |

**Available Presets:**

*Omnidirectional (center-to-edges):*
- `'depth-3'`, `'depth-5'`, `'depth-8'`, `'depth-10'`
- `'depth-12'`, `'depth-15'`, `'depth-20'`, `'depth-25'`, `'depth-30'`

*Directional (from specific direction):*
- `'depth-{intensity}-{direction}'`
- Directions: `top`, `bottom`, `left`, `right`, `top-left`, `top-right`, `bottom-left`, `bottom-right`

**Example Values:**
```tsx
// Subtle omnidirectional depth
<Skwircle.Card backgroundGradient="depth-5" />

// Stronger depth from bottom-right
<Skwircle.Card backgroundGradient="depth-15-bottom-right" />
```

**Note:** Uses `fg-secondary` color, automatically adapts to theme (light/dark mode).

---

### `customBackgroundGradient`

Custom gradient configuration for background (when `backgroundGradient="custom"`).

| Type | Default |
|------|---------|
| `GradientConfig` | `undefined` |

---

### `backgroundGradientOverlayColor`

Override the gradient overlay color (defaults to `fg-secondary`).

| Type | Default |
|------|---------|
| `string` | `'fg-secondary'` |

---

## Shadow Props

### `customShadow`

Override the elevation preset with custom shadow values.

| Type | Default |
|------|---------|
| `ShadowConfig` | `undefined` |

```tsx
type ShadowConfig = {
  offsetX: number
  offsetY: number
  blur: number
  spread: number
  color: string
  opacity: number  // 0-1
}

<Skwircle
  customShadow={{
    offsetX: 0,
    offsetY: 4,
    blur: 8,
    spread: 0,
    color: 'black',
    opacity: 0.15
  }}
>
  Custom shadow
</Skwircle>
```

---

## Layout Props

### `fillMode`

Controls how the border affects overall dimensions.

| Type | Default |
|------|---------|
| `boolean` | Varies by variant |

**Behavior:**
- `false` - Border extends **outside** content bounds
- `true` - Border drawn **inside** container bounds

**Visual Comparison:**
```
fillMode=false:                    fillMode=true:
┌──────────────────┐               ┌──────────────────┐
│ ┌──────────────┐ │ ← border     │╔════════════════╗│
│ │   content    │ │   outside    │║    content     ║│ ← border
│ └──────────────┘ │              │╚════════════════╝│   inside
└──────────────────┘               └──────────────────┘
   Total width =                      Total width =
   content + border*2                 container (fixed)
```

**Variant Defaults:**
- `base`, `card`: `false` (border outside)
- `button`, `input`, `avatar`: `true` (border inside)
- `badge`: `false`

**When to Use:**
- `fillMode={false}` - When content size should drive component size
- `fillMode={true}` - When container size is fixed and border shouldn't add to it

```tsx
// Card that expands to content
<Skwircle.Card fillMode={false}>
  <p>Content determines size</p>
</Skwircle.Card>

// Fixed-width input
<Skwircle.Input fillMode={true} style={{ width: 300 }}>
  <input />
</Skwircle.Input>
```

---

### `overflow`

Content overflow behavior.

| Type | Default |
|------|---------|
| `'visible' \| 'hidden' \| 'clip'` | `'hidden'` |

**Values:**
- `'visible'` - Content can overflow squircle bounds
- `'hidden'` - Content clipped to squircle shape
- `'clip'` - Same as hidden (CSS clip)

```tsx
<Skwircle overflow="visible">
  <div className="absolute -top-4">
    I can overflow!
  </div>
</Skwircle>
```

---

### `contentWrapperClassName`

Additional CSS classes for the content wrapper div.

| Type | Default |
|------|---------|
| `string` | Varies by variant |

**Variant Defaults:**
- `base`, `card`: `''`
- `button`: `'flex items-center justify-center'`
- `input`: `'flex items-center'`
- `badge`: `'flex items-center font-medium whitespace-nowrap'`
- `avatar`: `'flex items-center justify-center'`

```tsx
<Skwircle contentWrapperClassName="p-4 gap-2">
  <Icon />
  <span>Content</span>
</Skwircle>
```

---

### `contentWrapperStyle`

Inline styles for the content wrapper div.

| Type | Default |
|------|---------|
| `React.CSSProperties` | `undefined` |

---

## Mount Strategy Props

### `mountStrategy`

Controls how the component handles initial render (FOUC prevention).

| Type | Default |
|------|---------|
| `'auto' \| 'fade' \| 'immediate'` | `'auto'` |

**Values:**
- `'auto'` - Smart detection based on layout stability
- `'fade'` - Always fade in after measurement (150ms)
- `'immediate'` - Show immediately (use with `initialDimensions`)

**Auto Detection Logic:**
- Fixed dimensions (explicit width/height) → immediate
- Fluid layout (%, flex, w-full) → fade
- Unknown → fade (safe default)

---

### `initialDimensions`

Pre-computed dimensions for SSR or known-size components.

| Type | Default |
|------|---------|
| `{ width: number; height: number }` | `undefined` |

```tsx
// SSR: Skip measurement, render immediately
<Skwircle
  initialDimensions={{ width: 200, height: 48 }}
  mountStrategy="immediate"
>
  Known-size button
</Skwircle>
```

---

## Interactivity Props

### `interactive`

Enable hover state color transitions.

| Type | Default |
|------|---------|
| `boolean` | Varies by variant |

**Variant Defaults:**
- `button`: `true`
- All others: `false`

```tsx
<Skwircle
  interactive
  backgroundColor="background-primary"
  backgroundColorHover="background-secondary"
>
  Hover me
</Skwircle>
```

---

### `disabled`

Disable interactions and apply disabled styling.

| Type | Default |
|------|---------|
| `boolean` | `false` |

**Effects:**
- Sets `pointer-events: none`
- Reduces opacity to 50%
- Sets `aria-disabled="true"`

```tsx
<Skwircle.Button disabled>Can't click me</Skwircle.Button>
```

---

## Accessibility Props

### `tabIndex`

Keyboard tab order.

| Type | Default |
|------|---------|
| `number` | `0` for button variant |

### `role`

ARIA role attribute.

| Type | Default |
|------|---------|
| `string` | `'button'` for button variant |

### `aria-label`

Accessible label for screen readers.

| Type | Default |
|------|---------|
| `string` | `undefined` |

### `aria-labelledby`

ID of element that labels this component.

| Type | Default |
|------|---------|
| `string` | `undefined` |

### `aria-describedby`

ID of element that describes this component.

| Type | Default |
|------|---------|
| `string` | `undefined` |

### `aria-disabled`

Indicates disabled state to assistive technology.

| Type | Default |
|------|---------|
| `boolean` | Matches `disabled` prop |

### `aria-pressed`

For toggle buttons, indicates pressed state.

| Type | Default |
|------|---------|
| `boolean \| 'mixed'` | `undefined` |

### `aria-expanded`

Indicates expanded/collapsed state.

| Type | Default |
|------|---------|
| `boolean` | `undefined` |

### `data-testid`

Test identifier for automated testing.

| Type | Default |
|------|---------|
| `string` | `undefined` |

---

## Event Props

### `onClick`

Click event handler.

| Type | Default |
|------|---------|
| `(e: React.MouseEvent<HTMLDivElement>) => void` | `undefined` |

### `onMouseEnter`

Mouse enter event handler.

| Type | Default |
|------|---------|
| `(e: React.MouseEvent<HTMLDivElement>) => void` | `undefined` |

### `onMouseLeave`

Mouse leave event handler.

| Type | Default |
|------|---------|
| `(e: React.MouseEvent<HTMLDivElement>) => void` | `undefined` |

### `onKeyDown`

Keyboard event handler.

| Type | Default |
|------|---------|
| `(e: React.KeyboardEvent<HTMLDivElement>) => void` | `undefined` |

### `onFocus`

Focus event handler.

| Type | Default |
|------|---------|
| `(e: React.FocusEvent<HTMLDivElement>) => void` | `undefined` |

### `onBlur`

Blur event handler.

| Type | Default |
|------|---------|
| `(e: React.FocusEvent<HTMLDivElement>) => void` | `undefined` |

### `onDimensionsChange`

Called when component dimensions change.

| Type | Default |
|------|---------|
| `(width: number, height: number) => void` | `undefined` |

```tsx
<Skwircle onDimensionsChange={(w, h) => console.log(`${w}x${h}`)}>
  Resizable content
</Skwircle>
```

---

## Standard React Props

### `children`

Content to render inside the squircle.

| Type | Default |
|------|---------|
| `React.ReactNode` | `undefined` |

### `className`

CSS classes for the root container.

| Type | Default |
|------|---------|
| `string` | `undefined` |

### `style`

Inline styles for the root container.

| Type | Default |
|------|---------|
| `React.CSSProperties` | `undefined` |

```tsx
<Skwircle
  className="shadow-lg"
  style={{ width: 300, height: 200 }}
>
  Styled content
</Skwircle>
```

---

## Related Documentation

- [Styling Guide](./STYLING-GUIDE.md) - Detailed color and border usage
- [Variant System](./VARIANT-SYSTEM.md) - Pre-configured variants
- [Architecture](./ARCHITECTURE.md) - Technical implementation

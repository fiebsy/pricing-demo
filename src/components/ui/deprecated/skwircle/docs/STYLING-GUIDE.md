# Skwircle Styling Guide

> **Mastering colors, borders, rings, fill modes, and gradients**

This guide addresses the most common styling challenges and confusion points when working with Skwircle.

---

## Table of Contents

1. [Color System](#color-system)
2. [Border System](#border-system)
3. [Ring System (Focus States)](#ring-system-focus-states)
4. [Fill Mode Explained](#fill-mode-explained)
5. [Gradient Effects](#gradient-effects)
6. [Common Patterns](#common-patterns)
7. [Troubleshooting](#troubleshooting)

---

## Color System

### Semantic Tokens (Recommended)

Always use semantic tokens instead of raw color values. They automatically adapt to light/dark mode.

**Background Colors:**
```tsx
// Primary backgrounds
backgroundColor="background-primary"       // Main background
backgroundColor="background-primary_hover"  // Hover state
backgroundColor="background-secondary"      // Slightly tinted

// Brand backgrounds
backgroundColor="background-brand-solid"        // Solid brand color
backgroundColor="background-brand-solid_hover"  // Brand hover

// Status backgrounds
backgroundColor="background-error-primary"    // Error
backgroundColor="background-success-primary"  // Success
backgroundColor="background-warning-primary"  // Warning

// Transparent
backgroundColor="transparent"
```

**Border Colors:**
```tsx
borderColor="border-primary"    // Standard border
borderColor="border-secondary"  // Subtle border
borderColor="border-brand"      // Brand accent
borderColor="border-error"      // Error state
borderColor="transparent"       // No visible border
```

**Utility Colors (for badges/tags):**
```tsx
// Each color has 50-900 scale
backgroundColor="utility-brand-50"   // Light brand
borderColor="utility-brand-200"      // Medium brand
// Use with text: className="text-utility-brand-700"

// Available colors:
// utility-gray-{50-900}
// utility-brand-{50-900}
// utility-blue-{50-900}
// utility-indigo-{50-900}
// utility-purple-{50-900}
// utility-orange-{50-900}
// utility-error-{50-900}
// utility-success-{50-900}
// utility-warning-{50-900}
```

### How Token Resolution Works

Tokens are resolved to CSS variables:

```typescript
// Input token
borderColor="border-primary"

// Resolved to
'var(--border-color-primary)'

// Which in CSS evaluates to the actual color
// (different in light vs dark mode)
```

### Common Mistakes

```tsx
// WRONG - Raw colors don't adapt to dark mode
<Skwircle backgroundColor="#ffffff" />
<Skwircle borderColor="gray" />

// WRONG - CSS variable syntax in props
<Skwircle backgroundColor="var(--background-color-primary)" />

// CORRECT - Semantic tokens
<Skwircle backgroundColor="background-primary" />
<Skwircle borderColor="border-primary" />
```

---

## Border System

### Border Width

The `borderWidth` prop controls border thickness in pixels:

```tsx
<Skwircle borderWidth={1}>Standard 1px border</Skwircle>
<Skwircle borderWidth={2}>Thicker 2px border</Skwircle>
<Skwircle borderWidth={0}>No border</Skwircle>
```

### Border Color

```tsx
// Solid color
<Skwircle
  borderWidth={1}
  borderColor="border-primary"
/>

// With hover effect (requires interactive={true})
<Skwircle
  interactive
  borderWidth={1}
  borderColor="border-primary"
  borderColorHover="border-brand"
/>
```

### Border Gradients

For decorative border effects:

```tsx
// Shine effect (diagonal gradient)
<Skwircle.Card borderGradient="shine-corners" />

// Edge glow effect
<Skwircle.Card borderGradient="edge-glow" />

// Custom gradient
<Skwircle.Card
  borderGradient="custom"
  customBorderGradient={{
    type: 'linear',
    angle: 90,
    stops: [
      { color: 'brand-500', position: 0, opacity: 1 },
      { color: 'brand-300', position: 50, opacity: 0.5 },
      { color: 'brand-500', position: 100, opacity: 1 },
    ]
  }}
/>
```

### Border vs Ring: Key Differences

| Feature | Border | Ring |
|---------|--------|------|
| Layer position | Middle layer | Outermost layer |
| Primary use | Visual boundary | Focus indicator |
| Default enabled | Yes (1px) | No |
| Affects layout | Yes | Yes (adds outer space) |
| Common tokens | `border-*` | `outline-color-*` |

**Visual stacking:**
```
┌─────────────────────────────┐
│ Ring (outermost, if enabled)│
│  ┌───────────────────────┐  │
│  │ Border (middle layer) │  │
│  │  ┌─────────────────┐  │  │
│  │  │   Background    │  │  │
│  │  └─────────────────┘  │  │
│  └───────────────────────┘  │
└─────────────────────────────┘
```

---

## Ring System (Focus States)

The ring is a secondary border layer used primarily for focus states.

### Basic Usage

```tsx
// Toggle ring on focus
const [isFocused, setIsFocused] = useState(false)

<Skwircle.Input
  ring={isFocused}
  ringColor="outline-color-brand"
  onFocus={() => setIsFocused(true)}
  onBlur={() => setIsFocused(false)}
>
  <input />
</Skwircle.Input>
```

### Ring Properties

```tsx
<Skwircle
  ring={true}                       // Enable ring
  ringColor="outline-color-brand"   // Ring color
  ringWidth={2}                     // Ring thickness (default: 2)
  ringOpacity={100}                 // Ring opacity 0-100 (default: 100)
/>
```

### Error State Pattern

```tsx
<Skwircle.Input
  ring={isFocused || hasError}
  ringColor={hasError ? 'outline-color-error' : 'outline-color-brand'}
  borderColor={hasError ? 'border-error' : 'border-primary'}
>
  <input />
</Skwircle.Input>
```

### Ring + Border Together

When using both, total outer offset = `borderWidth + ringWidth`:

```tsx
<Skwircle
  borderWidth={1}
  borderColor="border-primary"
  ring={true}
  ringWidth={2}
  ringColor="outline-color-brand"
>
  {/* Total offset from content: 3px (1 + 2) */}
</Skwircle>
```

**Important:** Ensure parent container has enough space for the combined offset.

---

## Fill Mode Explained

`fillMode` is one of the most confusing props. It controls how borders affect dimensions.

### fillMode={false} (Default for most variants)

Border extends **outside** the content area.

```
Container:
┌────────────────────────────────┐
│         (border space)         │
│  ┌──────────────────────────┐  │
│  │        Content           │  │  ← Content has its natural size
│  │     (your children)      │  │
│  └──────────────────────────┘  │
│         (border space)         │
└────────────────────────────────┘
     ↑ Total width = content width + border*2
```

**When to use:**
- Content should determine size
- Buttons with text/icons that shouldn't be constrained
- Badges that wrap content
- Elements that "grow" to fit content

**Example:**
```tsx
<Skwircle.Badge fillMode={false}>
  <span>Status</span>  {/* Badge wraps this */}
</Skwircle.Badge>
```

### fillMode={true} (Default for button, input, avatar)

Border drawn **inside** container bounds.

```
Container (fixed size):
┌────────────────────────────────┐
│╔══════════════════════════════╗│ ← Border inside
│║          Content             ║│
│║       (constrained)          ║│
│╚══════════════════════════════╝│
└────────────────────────────────┘
     ↑ Total width = container width (fixed)
```

**When to use:**
- Container has fixed/known dimensions
- Border shouldn't add to overall size
- Grid layouts where size must be exact
- Inputs that fill their container

**Example:**
```tsx
<Skwircle.Input fillMode={true} style={{ width: 300 }}>
  <input className="w-full" />  {/* Fills the 300px */}
</Skwircle.Input>
```

### Common fillMode Issues

**Issue 1: Border adding unexpected width**
```tsx
// Problem: Card is wider than expected
<div style={{ width: 300 }}>
  <Skwircle.Card borderWidth={2}>  {/* fillMode=false by default */}
    Content
  </Skwircle.Card>
</div>
// Result: Card is 304px wide (300 + 2 + 2)

// Solution: Use fillMode
<Skwircle.Card fillMode={true} style={{ width: 300 }}>
  Content
</Skwircle.Card>
// Result: Card is exactly 300px
```

**Issue 2: Content overflowing**
```tsx
// Problem: Content doesn't fit
<Skwircle.Card fillMode={true} style={{ width: 100 }}>
  <div style={{ width: 100 }}>Content</div>  {/* Overflows! */}
</Skwircle.Card>
// With borderWidth=2, content area is only 96px

// Solution: Account for border
<Skwircle.Card fillMode={true} borderWidth={2} style={{ width: 100 }}>
  <div style={{ width: 96 }}>Content</div>  {/* Fits perfectly */}
</Skwircle.Card>
```

### fillMode Quick Reference

| Variant | Default fillMode | Reason |
|---------|------------------|--------|
| `base` | `false` | Flexible container |
| `card` | `false` | Content-driven size |
| `button` | `true` | Predictable click areas |
| `input` | `true` | Fixed input widths |
| `badge` | `false` | Wraps text content |
| `avatar` | `true` | Fixed circular size |

---

## Gradient Effects

### Background Gradients (Depth Effects)

Add subtle depth to cards and containers:

```tsx
// Light omnidirectional depth
<Skwircle.Card backgroundGradient="depth-5" />

// Stronger directional depth
<Skwircle.Card backgroundGradient="depth-15-bottom-right" />
```

**Available Intensities:** 3, 5, 8, 10, 12, 15, 20, 25, 30 (percentage opacity)

**Available Directions:**
- `top`, `bottom`, `left`, `right`
- `top-left`, `top-right`, `bottom-left`, `bottom-right`

**Pattern:**
```tsx
backgroundGradient="depth-{intensity}"              // Omnidirectional
backgroundGradient="depth-{intensity}-{direction}"  // Directional
```

### Theme-Adaptive Gradients

Depth gradients use `fg-secondary` color, which automatically adapts to theme:
- Light mode: Adds subtle dark shadow
- Dark mode: Adds subtle light highlight

### Border Gradients

```tsx
// Preset: Diagonal shine
<Skwircle.Card borderGradient="shine-corners" />

// Preset: Edge glow
<Skwircle.Card borderGradient="edge-glow" />
```

### Performance Note

Gradients are SVG-based and have some rendering cost. For lists with many items, consider:
- Using `backgroundGradient="none"` for repeated elements
- Keeping intensity low (depth-5 vs depth-30)
- Using gradients only on key UI elements

---

## Common Patterns

### 1. Interactive Card with Hover

```tsx
<Skwircle.Card
  interactive
  elevation="sm"
  backgroundColor="background-primary"
  backgroundColorHover="background-secondary"
  backgroundGradient="depth-8-bottom-right"
  className="cursor-pointer"
  onClick={handleClick}
>
  <div className="p-4">
    <h3>Card Title</h3>
    <p>Click me</p>
  </div>
</Skwircle.Card>
```

### 2. Primary Button

```tsx
<Skwircle.Button
  intent="primary"
  onClick={handleClick}
>
  <span className="text-primary_on-brand">Submit</span>
</Skwircle.Button>
```

### 3. Input with Focus Ring

```tsx
const [focused, setFocused] = useState(false)
const [error, setError] = useState(false)

<Skwircle.Input
  ring={focused}
  ringColor={error ? 'outline-color-error' : 'outline-color-brand'}
  borderColor={error ? 'border-error' : 'border-primary'}
>
  <input
    className="w-full px-3 py-2 bg-transparent outline-none"
    onFocus={() => setFocused(true)}
    onBlur={() => setFocused(false)}
  />
</Skwircle.Input>
```

### 4. Status Badge

```tsx
type BadgeColor = 'success' | 'error' | 'warning' | 'info'

const colorMap: Record<BadgeColor, {
  bg: string
  border: string
  text: string
}> = {
  success: {
    bg: 'utility-success-50',
    border: 'utility-success-200',
    text: 'text-utility-success-700',
  },
  error: {
    bg: 'utility-error-50',
    border: 'utility-error-200',
    text: 'text-utility-error-700',
  },
  // ... etc
}

<Skwircle.Badge
  backgroundColor={colorMap[color].bg}
  borderColor={colorMap[color].border}
>
  <span className={colorMap[color].text}>
    {label}
  </span>
</Skwircle.Badge>
```

### 5. Avatar with Ring

```tsx
<Skwircle.Avatar
  ring={isOnline}
  ringColor="utility-success-500"
  ringWidth={3}
>
  <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
</Skwircle.Avatar>
```

---

## Troubleshooting

### Issue: Border extends outside container

**Symptom:** Element is larger than expected, breaks layout.

**Cause:** `fillMode={false}` (default) makes border additive.

**Solutions:**
```tsx
// Option 1: Use fillMode
<Skwircle fillMode={true} style={{ width: 200 }}>...</Skwircle>

// Option 2: Account for border in container
<div style={{ width: 204 }}>  {/* 200 + 2px border on each side */}
  <Skwircle borderWidth={2}>...</Skwircle>
</div>

// Option 3: Use CSS to constrain
<Skwircle className="w-[200px] box-border" fillMode={true}>...</Skwircle>
```

---

### Issue: Ring + Border too thick

**Symptom:** Combined border/ring creates excessive padding.

**Cause:** Ring width adds to border width.

**Solutions:**
```tsx
// Reduce widths
<Skwircle
  borderWidth={1}  // Instead of 2
  ring={true}
  ringWidth={2}    // Instead of 3
>...</Skwircle>

// Or use ring only (no border)
<Skwircle
  borderWidth={0}
  ring={true}
  ringWidth={2}
>...</Skwircle>
```

---

### Issue: Colors not changing on hover

**Symptom:** `backgroundColorHover` doesn't work.

**Cause:** `interactive={false}` (default for most variants).

**Solution:**
```tsx
<Skwircle
  interactive={true}  // Required for hover effects
  backgroundColor="background-primary"
  backgroundColorHover="background-secondary"
>...</Skwircle>
```

---

### Issue: Colors don't adapt to dark mode

**Symptom:** Colors look wrong in dark mode.

**Cause:** Using raw colors instead of semantic tokens.

**Solution:**
```tsx
// WRONG
backgroundColor="#ffffff"
borderColor="rgb(229, 231, 235)"

// CORRECT
backgroundColor="background-primary"
borderColor="border-primary"
```

---

### Issue: Ring doesn't show on focus

**Symptom:** No visible focus indicator.

**Cause:** `ring={false}` or ring is same color as background.

**Solution:**
```tsx
const [focused, setFocused] = useState(false)

<Skwircle.Input
  ring={focused}  // Toggle based on state
  ringColor="outline-color-brand"  // Ensure visible color
  onFocus={() => setFocused(true)}
  onBlur={() => setFocused(false)}
>
  <input />
</Skwircle.Input>
```

---

### Issue: Content clipped unexpectedly

**Symptom:** Child elements cut off.

**Cause:** `overflow="hidden"` (default).

**Solution:**
```tsx
<Skwircle overflow="visible">
  <div className="absolute -top-2">
    This can overflow
  </div>
</Skwircle>
```

---

### Issue: Gradient looks wrong in dark mode

**Symptom:** Background gradient too dark or invisible.

**Cause:** Using legacy depth presets or wrong color.

**Solution:**
```tsx
// CORRECT - Uses theme-adaptive fg-secondary
backgroundGradient="depth-10-bottom-right"

// For custom, use theme-aware colors
customBackgroundGradient={{
  type: 'linear',
  angle: 180,
  stops: [
    { color: 'fg-secondary', position: 0, opacity: 0 },
    { color: 'fg-secondary', position: 100, opacity: 0.1 },
  ]
}}
```

---

## Related Documentation

- [Props Reference](./PROPS-REFERENCE.md) - Complete API
- [Variant System](./VARIANT-SYSTEM.md) - Pre-built configurations
- [Architecture](./ARCHITECTURE.md) - How rendering works

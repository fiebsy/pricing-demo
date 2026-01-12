# Skwircle Architecture

> **Understanding the SVG rendering system, layer architecture, and path generation**

---

## Table of Contents

1. [Rendering Architecture](#rendering-architecture)
2. [Layer System](#layer-system)
3. [SVG Path Generation](#svg-path-generation)
4. [Dimension Measurement](#dimension-measurement)
5. [Mount Strategy (FOUC Prevention)](#mount-strategy-fouc-prevention)
6. [Performance Considerations](#performance-considerations)

---

## Rendering Architecture

### Why SVG Instead of CSS?

CSS `border-radius` creates **circular** corners. iOS uses **superellipse** corners that have a continuous curvature, creating a smoother visual appearance. SVG paths allow us to render these precise mathematical curves.

**Comparison:**
- **CSS border-radius**: `x² + y² = r²` (circular)
- **Superellipse (iOS)**: `|x/a|ⁿ + |y/b|ⁿ = 1` (continuous curve)

The difference is subtle but noticeable, especially at larger sizes.

### Component Structure

```tsx
<div className="relative">
  {/* Layer 1: Shadow (z-index: -1) */}
  <SkwircleShadow {...shadowProps} />

  {/* Layer 2: Main Shape (absolute positioned) */}
  <svg className="absolute inset-0 pointer-events-none">
    {/* Gradient definitions */}
    <defs>...</defs>

    {/* Ring/outer border (if enabled) */}
    <path d={outerBorderPath} fill={ringColor} />

    {/* Main border */}
    <path d={borderPath} fill={borderColor} />

    {/* Background solid */}
    <path d={backgroundPath} fill={backgroundColor} />

    {/* Background gradient overlay (if enabled) */}
    <path d={backgroundPath} fill="url(#gradient)" />
  </svg>

  {/* Layer 3: Content (z-index: 1) */}
  <div className="relative z-10">
    {children}
  </div>
</div>
```

---

## Layer System

The Skwircle renders in **three main layers**, each with distinct responsibilities:

### Layer 1: Shadow Layer

**File:** `rendering/skwircle-shadow.tsx`

- **Purpose:** Drop shadow effect
- **Method:** Duplicate SVG with `<feGaussianBlur>` filter
- **Position:** Offset by shadow config (offsetX, offsetY)
- **Z-index:** -1 (below main shape)

```tsx
// Shadow SVG structure
<svg style={{ position: 'absolute', zIndex: -1 }}>
  <defs>
    <filter id="shadow-blur">
      <feGaussianBlur stdDeviation={blur / 2} />
    </filter>
  </defs>
  <path
    d={shapePath}
    fill={shadowColor}
    filter="url(#shadow-blur)"
    opacity={shadowOpacity}
    transform={`translate(${offsetX}, ${offsetY})`}
  />
</svg>
```

**Why not CSS box-shadow?**
CSS box-shadow follows the rectangular bounding box, not the squircle shape. SVG-based shadows follow the actual curve.

---

### Layer 2: Shape Layer (Main SVG)

**File:** `rendering/skwircle-svg.tsx`

The main SVG contains **four stacked paths** (from back to front):

#### 2a. Outer Border (Ring)
- **Condition:** Only rendered if `ring={true}`
- **Size:** Full SVG dimensions
- **Color:** `ringColor` prop (default: `outline-color-brand`)
- **Purpose:** Focus state indicator, double-border effect

#### 2b. Main Border
- **Condition:** Only rendered if `borderWidth > 0`
- **Size:** SVG dimensions minus ring width
- **Color:** `borderColor` prop
- **Purpose:** Primary border

#### 2c. Background Solid
- **Size:** SVG dimensions minus total border offset
- **Color:** `backgroundColor` prop
- **Purpose:** Base background color

#### 2d. Background Gradient Overlay
- **Condition:** Only rendered if `backgroundGradient !== 'none'`
- **Size:** Same as background solid
- **Fill:** `url(#gradient-id)` reference to `<defs>`
- **Purpose:** Depth effects, visual texture

**Stacking Order Visual:**
```
┌─────────────────────────────────────┐
│           Ring (outermost)          │
│  ┌───────────────────────────────┐  │
│  │         Border                │  │
│  │  ┌─────────────────────────┐  │  │
│  │  │    Background Solid     │  │  │
│  │  │  ┌───────────────────┐  │  │  │
│  │  │  │ Gradient Overlay  │  │  │  │
│  │  │  └───────────────────┘  │  │  │
│  │  └─────────────────────────┘  │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

---

### Layer 3: Content Layer

- **Element:** Regular HTML `<div>`
- **Z-index:** 1 (above SVG)
- **Positioning:** Relative, with margin/padding to account for border
- **Clipping:** Optional clip-path for overflow control

```tsx
<div
  className={contentWrapperClassName}
  style={{
    position: 'relative',
    zIndex: 1,
    margin: fillMode ? 0 : borderWidth,
  }}
>
  {children}
</div>
```

---

## SVG Path Generation

### The Superellipse Formula

**File:** `utils/path-generator.ts`

The squircle shape is generated using the **superellipse equation**:

```
|x/a|ⁿ + |y/b|ⁿ = 1
```

Where:
- `a` = half-width
- `b` = half-height
- `n` = smoothing exponent (controls curve tightness)

**Smoothing Values:**
| Roundness | Exponent | Visual Effect |
|-----------|----------|---------------|
| `none` | 10.0 | Sharp, nearly rectangular |
| `subtle` | 7.0 | Slight rounding |
| `moderate` | 5.5 | Standard card corners |
| `rounded` | 4.0 | Button-style rounding |
| `pill` | 3.0 | Capsule shape |

Lower exponents = more circular. Higher exponents = more rectangular.

### Path Generation Algorithm

```typescript
function generateSkwirclePath(
  width: number,
  height: number,
  roundnessConfig: RoundnessConfig,
  offset: number = 0
): string {
  const { smoothing, borderRadius, pointsPerCorner } = roundnessConfig

  // Calculate actual corner radius (clamped to half of smallest dimension)
  const maxRadius = Math.min(width, height) / 2
  const radius = Math.min(borderRadius, maxRadius)

  // Generate points for each corner
  const corners = [
    generateCornerPoints('top-right', ...),
    generateCornerPoints('bottom-right', ...),
    generateCornerPoints('bottom-left', ...),
    generateCornerPoints('top-left', ...),
  ]

  // Build SVG path
  return `M ${startX} ${startY} ${corners.join(' ')} Z`
}

function generateCornerPoints(
  corner: Corner,
  centerX: number,
  centerY: number,
  radius: number,
  smoothing: number,
  pointsPerCorner: number
): string {
  const points = []

  for (let i = 0; i <= pointsPerCorner; i++) {
    const angle = startAngle + (i / pointsPerCorner) * (Math.PI / 2)

    // Superellipse formula for point calculation
    const factor = Math.pow(
      Math.pow(Math.abs(Math.cos(angle)), smoothing) +
      Math.pow(Math.abs(Math.sin(angle)), smoothing),
      1 / smoothing
    )

    const x = centerX + (radius * Math.cos(angle)) / factor
    const y = centerY + (radius * Math.sin(angle)) / factor

    points.push(`L ${x} ${y}`)
  }

  return points.join(' ')
}
```

### Points Per Corner

More points = smoother curves but more SVG path data:

| Roundness | Points | Trade-off |
|-----------|--------|-----------|
| `none` | 20 | Minimal (nearly straight) |
| `subtle` | 40 | Good balance |
| `moderate` | 50 | Smooth curves |
| `rounded` | 55 | Very smooth |
| `pill` | 60 | Maximum smoothness |

---

## Dimension Measurement

### The Challenge

Skwircle needs to know its exact dimensions to generate accurate SVG paths. But dimensions aren't known until the component is rendered and measured.

### Solution: useDimensions Hook

**File:** `core/use-dimensions.ts`

```typescript
function useDimensions(
  ref: RefObject<HTMLElement>,
  options?: { debounceMs?: number }
): {
  dimensions: { width: number; height: number }
  hasMeasured: boolean
}
```

**Measurement Strategy:**

1. **Initial Measurement** (useLayoutEffect)
   - Synchronous measurement via `getBoundingClientRect()`
   - Runs before browser paint
   - Captures initial dimensions immediately

2. **Ongoing Tracking** (ResizeObserver)
   - Monitors size changes after mount
   - Handles container resize, content changes
   - Uses RAF (requestAnimationFrame) debouncing

3. **Update Threshold**
   - Only updates state if change > 1px
   - Prevents excessive re-renders

```typescript
// Implementation sketch
useLayoutEffect(() => {
  if (!ref.current) return

  const rect = ref.current.getBoundingClientRect()
  setDimensions({ width: rect.width, height: rect.height })
  setHasMeasured(true)

  const observer = new ResizeObserver((entries) => {
    requestAnimationFrame(() => {
      const { width, height } = entries[0].contentRect
      if (Math.abs(width - dimensions.width) > 1 ||
          Math.abs(height - dimensions.height) > 1) {
        setDimensions({ width, height })
      }
    })
  })

  observer.observe(ref.current)
  return () => observer.disconnect()
}, [])
```

---

## Mount Strategy (FOUC Prevention)

### The Problem: Flash of Unstyled Content

Without proper handling, the component might:
1. Render with zero dimensions
2. Measure itself
3. Re-render with correct dimensions

This causes a visible "flash" or layout shift.

### Solution: useSkwircleMount Hook

**File:** `core/use-skwircle-mount.ts`

The hook analyzes the component's layout situation and chooses a strategy:

```typescript
type MountStrategy = 'auto' | 'fade' | 'immediate'

function useSkwircleMount(options: {
  mountStrategy: MountStrategy
  hasMeasured: boolean
  hasInitialDimensions: boolean
  fillMode: boolean
  style?: CSSProperties
}): {
  shouldShow: boolean
  opacity: number
  transition: string
}
```

### Strategy Decision Tree

```
┌─────────────────────────────────────────────┐
│               mountStrategy                  │
└─────────────────────────────────────────────┘
                    │
        ┌───────────┼───────────┐
        ▼           ▼           ▼
   'immediate'    'fade'      'auto'
        │           │           │
        ▼           ▼           ▼
   Show now     Fade in    Analyze layout
                              │
              ┌───────────────┴───────────────┐
              │                               │
        Fixed dimensions?             Fluid layout?
        (width/height set,            (%, calc, flex,
        or initialDimensions)          w-full, fillMode)
              │                               │
              ▼                               ▼
         'immediate'                       'fade'
```

### Fade Mode Behavior

1. **Before measurement:** `opacity: 0`, `visibility: hidden`
2. **After measurement:** Transition to `opacity: 1`
3. **Transition:** 150ms ease-out

```typescript
// Fade mode output
if (!hasMeasured) {
  return { shouldShow: false, opacity: 0, transition: 'none' }
}
return {
  shouldShow: true,
  opacity: 1,
  transition: 'opacity 150ms ease-out'
}
```

### Using initialDimensions for SSR

For server-side rendering or when dimensions are known:

```tsx
<Skwircle
  initialDimensions={{ width: 200, height: 48 }}
  mountStrategy="immediate"
>
  Known-size button
</Skwircle>
```

This skips measurement and renders immediately.

---

## Performance Considerations

### SVG Filter Cost

**High Cost Operations:**
- `<feGaussianBlur>` (shadow blur)
- Gradient definitions with many stops
- Complex paths with 200+ points

**Recommendations:**
- Use `elevation="none"` for lists with many items
- Prefer simpler gradients (`depth-5` over `depth-30`)
- Consider reducing `pointsPerCorner` for small elements

### Re-render Triggers

**Causes Full Re-render:**
- Dimension change > 1px
- Color prop change
- Roundness/elevation change

**Does NOT Re-render:**
- Hover state (optimized via CSS transitions)
- Children changes (only content layer updates)

### Memory Considerations

Each Skwircle instance maintains:
- ResizeObserver subscription
- Memoized path calculations
- Color resolution cache

For pages with 50+ squircles, consider:
- Virtualizing lists
- Lazy loading off-screen elements
- Using simpler variants for repeated items

### Browser Compatibility

**Well Supported:**
- Chrome, Edge, Firefox, Safari (latest 2 versions)
- ResizeObserver (96%+ browser support)
- SVG filters (98%+ browser support)

**Potential Issues:**
- Safari: Occasional RAF timing differences
- Firefox: Gradient rendering quirks in rare cases

---

## Core Hooks Summary

| Hook | File | Purpose |
|------|------|---------|
| `useDimensions` | `core/use-dimensions.ts` | Element measurement with ResizeObserver |
| `useHoverState` | `core/use-hover-state.ts` | Track hover state with callbacks |
| `useSkwircleColors` | `core/use-skwircle-colors.ts` | Resolve colors, handle hover states |
| `useSkwircleMount` | `core/use-skwircle-mount.ts` | FOUC prevention strategy |
| `useSkwircleShape` | `core/use-skwircle-shape.ts` | Generate SVG paths |

---

## File Dependencies

```
skwircle.tsx (entry point)
├── uses: core/use-dimensions.ts
├── uses: core/use-hover-state.ts
├── uses: core/use-skwircle-colors.ts
├── uses: core/use-skwircle-mount.ts
├── uses: core/use-skwircle-shape.ts
├── uses: utils/color-resolver.ts
├── renders: rendering/skwircle-svg.tsx
│   └── uses: rendering/skwircle-gradients.tsx
├── renders: rendering/skwircle-shadow.tsx
├── config: config/variants.ts
├── config: config/intents.ts
├── config: config/roundness.ts
├── config: config/elevations.ts
└── types: types.ts
```

---

## Related Documentation

- [Props Reference](./PROPS-REFERENCE.md) - All configuration options
- [Styling Guide](./STYLING-GUIDE.md) - Color, border, and gradient usage
- [Variant System](./VARIANT-SYSTEM.md) - Pre-built configurations

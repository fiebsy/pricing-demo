# Squircle Component

**iOS-style superellipse shape component** - Foundational component for buttons, badges, cards, and more.

![Status](https://img.shields.io/badge/status-production-green) ![Safari](https://img.shields.io/badge/safari-optimized-blue) ![Shadows](https://img.shields.io/badge/shadows-xs%20%7C%20sm-yellow)

---

## ✨ Features

- **🎨 200+ Semantic Design Tokens** - Automatic dark mode support
- **🌈 Advanced Gradients** - Border & background gradients with opacity control
- **🎯 Safari Optimized** - Debounced ResizeObserver, 30-40% CPU reduction
- **🔍 Shadow Support** - xs/sm shadows (larger shadows disabled due to clipping)
- **📦 Modular Architecture** - 8 focused files, single responsibility
- **⚡ Production Ready** - Used by Button, Badge, SearchInput components
- **🚫 Anti-FOUC** - Fade-in on mount prevents flash (enabled by default)

---

## 🚀 Quick Start

```tsx
import { Squircle } from '@/modules/design-system/v2/components/ui/custom/validated/base/squircle'

// Simple usage
<Squircle backgroundColor="background-primary" borderWidth={1} roundness={3}>
  <div className="p-6">Card content</div>
</Squircle>

// With shadow
<Squircle backgroundColor="background-brand-solid" shadow="sm" roundness={2}>
  <div className="px-6 py-3 text-white">Button</div>
</Squircle>

// With hover colors
<Squircle
  backgroundColor="background-brand-solid"
  backgroundColorHover="background-brand-solid_hover"
  borderColor="border-primary"
  borderColorHover="border-brand"
  shadow="sm"
>
  <div className="px-6 py-3">Hover me</div>
</Squircle>
```

---

## 📖 API Reference

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `backgroundColor` | `string` | `'white'` | Semantic token or CSS color |
| `backgroundColorHover` | `string` | - | Background color on hover (100ms transition) |
| `borderColor` | `string` | `'utility-gray-300'` | Semantic token or CSS color |
| `borderColorHover` | `string` | - | Border color on hover (100ms transition) |
| `borderWidth` | `number` | `1` | Border width in pixels |
| `roundness` | `0-5` | `1` | Roundness level (0 = custom) |
| `shadow` | `'none' \| 'xs' \| 'sm' \| 'custom'` | `'none'` | Shadow preset ⚠️ Only xs/sm available |
| `customShadow` | `CustomShadowConfig` | - | Custom shadow configuration |
| `fillMode` | `boolean` | `false` | Content fills Squircle (for buttons/inputs) |
| `fadeInOnMount` | `boolean` | `true` | Prevents FOUC with fade-in effect |
| `className` | `string` | - | Additional CSS classes |
| `style` | `CSSProperties` | - | Inline styles (auto-detects flex) |
| `children` | `ReactNode` | - | Content to render |

### Gradient Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `borderGradient` | `BorderGradientPreset` | `'none'` | Predefined border gradient |
| `customBorderGradient` | `GradientBorderConfig` | - | Custom border gradient config |
| `backgroundGradient` | `BackgroundGradientPreset` | `'none'` | Predefined background gradient |
| `customBackgroundGradient` | `GradientBorderConfig` | - | Custom background gradient config |
| `outerBorderWidth` | `number` | `0` | Double border outer width |
| `outerBorderColor` | `string` | - | Double border outer color |

### Event Props

| Prop | Type | Description |
|------|------|-------------|
| `onClick` | `MouseEventHandler` | Click event handler |
| `onMouseEnter` | `MouseEventHandler` | Mouse enter event handler |
| `onMouseLeave` | `MouseEventHandler` | Mouse leave event handler |
| `onDimensionsChange` | `(w: number, h: number) => void` | Callback when dimensions change |

---

## 📏 Roundness Levels

| Level | Smoothing | Border Radius | Points/Corner | Use Case |
|-------|-----------|---------------|---------------|----------|
| **0** | Custom | Custom | Custom | Fine control |
| **1** | 0.6 | 8px | 10 | Subtle (buttons) |
| **2** | 0.7 | 12px | 12 | Moderate (cards) |
| **3** | 0.75 | 16px | 14 | Pronounced (features) |
| **4** | 0.8 | 20px | 16 | Strong (modals) |
| **5** | 0.85 | 24px | 18 | Maximum (hero) |

---

## ⚠️ Shadow Presets (IMPORTANT)

**Only `xs` and `sm` shadows are available.** Larger shadows get clipped by parent container overflow.

```typescript
// ✅ WORKS
<Squircle shadow="xs" />
<Squircle shadow="sm" />
<Squircle shadow="custom" customShadow={{ offsetX: 0, offsetY: 2, blur: 4, color: 'black', opacity: 0.1 }} />

// ❌ COMPILER ERROR - These don't exist
<Squircle shadow="md" />
<Squircle shadow="lg" />
```

**Why?** Parent containers clip overflow (cannot extend beyond bounds). Only subtle shadows (xs, sm) stay within element boundaries.

---

## 🎨 Common Patterns

### Primary Button Pattern

Used by `Button` component:

```tsx
<Squircle
  backgroundColor="background-brand-solid"
  backgroundColorHover="background-brand-solid_hover"
  borderWidth={0}
  shadow="sm"
  roundness={2}
  fillMode={true}
>
  <div className="flex items-center justify-center px-6 py-3">
    <span className="text-sm font-medium text-primary_on-brand">Get Started</span>
  </div>
</Squircle>
```

### Secondary Button Pattern

```tsx
<Squircle
  backgroundColor="background-primary"
  backgroundColorHover="background-primary_hover"
  borderColor="border-primary"
  borderColorHover="border-brand"
  borderWidth={1}
  shadow="sm"
  roundness={2}
>
  <div className="flex items-center gap-2 px-6 py-3">
    <span className="text-sm font-medium text-secondary">Secondary Action</span>
  </div>
</Squircle>
```

### Badge Pattern

Used by `Badge` component:

```tsx
<Squircle
  backgroundColor="background-primary"
  borderColor="border-secondary"
  borderWidth={1}
  roundness={3}
  shadow="none"
  className="inline-block"
>
  <div className="flex items-center px-3 py-1">
    <span className="text-xs font-medium text-secondary">Badge</span>
  </div>
</Squircle>
```

### Card with Elevation

```tsx
<Squircle
  backgroundColor="background-primary"
  borderColor="border-secondary"
  borderWidth={1}
  shadow="sm"
  roundness={3}
>
  <div className="p-6">
    <h3 className="text-primary text-base font-semibold">Feature Card</h3>
    <p className="text-secondary text-sm">Beautiful cards with proper shadows</p>
  </div>
</Squircle>
```

### Custom Shadow

```tsx
<Squircle
  backgroundColor="background-primary"
  borderWidth={1}
  roundness={3}
  shadow="custom"
  customShadow={{
    offsetX: 0,
    offsetY: 2,
    blur: 4,
    spread: 0,
    color: 'black',
    opacity: 0.1,
  }}
>
  <div className="p-4">Custom shadow effect</div>
</Squircle>
```

---

## 📐 Layout & Dimensions

### Auto-Detection (Recommended)

Squircle automatically detects flex properties and switches from `inline-flex` to `flex`:

```tsx
// ✅ Automatically uses display: flex
<div style={{ display: 'flex', gap: '16px' }}>
  <Squircle style={{ flex: '1 1 auto' }}>
    <div className="p-4">Flex Item 1</div>
  </Squircle>
</div>
```

### Fill Mode

Use `fillMode` for explicit control over content stretching:

```tsx
// Button-like: Squircle fills container, content fills Squircle
<Squircle fillMode={true} style={{ width: '100%' }}>
  <div className="px-6 py-3">Button stretches to fill</div>
</Squircle>

// Badge-like: Content wraps naturally (default)
<Squircle fillMode={false}>
  <div className="px-3 py-1">Badge</div>
</Squircle>
```

---

## 🎬 Animations & Transitions

### Scale Animation Pattern (Recommended)

```tsx
<Squircle
  backgroundColor="background-brand-solid"
  backgroundColorHover="background-brand-solid_hover"
  fadeInOnMount={true}  // ✅ Keep enabled - prevents flash
  fillMode={true}
  style={{
    flex: '1 1 auto',
    transition: 'all 200ms ease-out',  // Your custom duration
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = 'scale(1.05)'
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'scale(1)'
  }}
>
  <div className="flex items-center justify-center py-3">
    <span className="text-sm font-medium text-primary_on-brand">Hover Me</span>
  </div>
</Squircle>
```

### Why JavaScript Events Instead of CSS?

```tsx
// ❌ WRONG: Tailwind classes don't work reliably
<Squircle className="hover:scale-105 transition-transform" />

// ✅ CORRECT: JavaScript events for reliable control
<Squircle
  style={{ transition: 'all 200ms ease-out' }}
  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
/>
```

**Reason:** Inline styles have higher specificity than CSS classes.

---

## 🐛 Troubleshooting

### Shadow not showing?

```tsx
// ✅ WORKS
<Squircle shadow="xs" />
<Squircle shadow="sm" />

// ❌ COMPILER ERROR
<Squircle shadow="md" />  // md, lg, xl, 2xl don't exist
```

**Other checks:**
- Verify `shadowOpacity > 0` for custom shadows
- Check z-index of parent containers (shadow renders at `z-index: -1`)
- Ensure shadow color contrast is visible

### Border looks jagged?

- Use higher roundness level (3-5 for smoother curves)
- Check border width isn't too thick (max 8px recommended)
- For custom roundness: increase `pointsPerCorner` (16-28)

### Hover colors not working?

```tsx
// ✅ CORRECT - Use hover props
<Squircle
  backgroundColor="background-brand-solid"
  backgroundColorHover="background-brand-solid_hover"
  borderColor="border-primary"
  borderColorHover="border-brand"
/>

// ❌ WRONG - Tailwind classes won't work for Squircle background
<Squircle className="hover:bg-brand-solid" />
```

### Content not filling Squircle?

```tsx
// Use fillMode for button-like behavior
<Squircle fillMode={true} style={{ width: '100%' }}>
  <div className="px-6 py-3">Content fills Squircle</div>
</Squircle>
```

---

## 🧪 Interactive Playgrounds

**Main Playground**: `/v2/playground/ui/gallery/squircle-v2`
- Interactive controls for all props
- Real-time preview
- Copy-to-clipboard functionality

**Width/Layout Testing**: `/v2/playground/ui/gallery/squircle-width-adjustment`
- Flex behavior testing
- Auto-width vs fixed-width
- Fill mode demonstrations

**Scale Animation Testing**: `/v2/playground/ui/gallery/squircle-scale-minimal`
- Hover scale effects
- Layout examples

---

## 📁 File Structure

```
squircle/
├── README.md              # This documentation
├── component.tsx          # Main component (345 lines)
├── types.ts              # TypeScript definitions (125 lines)
├── index.tsx             # Public exports (15 lines)
├── lib/
│   ├── hooks.ts          # 9 custom React hooks (309 lines)
│   ├── constants.ts      # Presets & tokens (372 lines)
│   ├── presets.ts        # Gradient presets
│   └── utils.ts          # Path generation utilities (134 lines)
└── rendering/
    ├── svg-filters.tsx    # Shadow & clipPath (92 lines)
    └── svg-gradients.tsx  # Gradient rendering (273 lines)
```

**Total:** ~1,650 lines across 8 focused files

---

## 🎯 How Button & Badge Use Squircle

### Button Component Pattern

```tsx
// From button/index.tsx
<Squircle
  backgroundColor={backgroundColor}
  borderColor={borderColor}
  borderWidth={hierarchyConfig.borderWidth}
  roundness={effectiveRoundness}
  shadow={effectiveShadow}
  customShadowLayer={effectiveShadow !== 'none'}  // Internal prop
  shadowMethod="duplicate"                         // Internal prop
  performance="high"                               // Internal prop
  overflow="hidden"
  fadeInOnMount={fadeInOnMount}
  className={cx('inline-block', fullWidth && 'w-full')}
  onDimensionsChange={onDimensionsChange}
>
  <div className="flex items-center font-semibold whitespace-nowrap">
    {children}
  </div>
</Squircle>
```

### Badge Component Pattern

```tsx
// From badge/index.tsx
<Squircle
  backgroundColor={colorConfig.backgroundColor}
  borderColor={colorConfig.borderColor}
  borderWidth={typeConfig.borderWidth}
  roundness={effectiveRoundness}
  shadow={effectiveShadow}
  customShadowLayer={effectiveShadow !== 'none'}  // Internal prop
  shadowMethod="duplicate"                         // Internal prop
  performance="high"                               // Internal prop
  overflow="hidden"
  fadeInOnMount={true}
  className={cx('inline-block', className)}
  onDimensionsChange={onDimensionsChange}
>
  <div className="flex items-center font-medium whitespace-nowrap">
    {styledChildren}
  </div>
</Squircle>
```

**Key Props Used:**
- `backgroundColor` / `backgroundColorHover` - Color management
- `borderColor` / `borderColorHover` - Border styling
- `roundness` - Visual style (2-3 for buttons, 3-5 for badges)
- `shadow` - Elevation (sm for buttons, none/sm for badges)
- `fillMode` - Layout behavior (true for buttons, false for badges)
- `fadeInOnMount` - FOUC prevention (enabled by default)

---

## 🔧 Technical Details

<details>
<summary><strong>Architecture Overview</strong></summary>

**8 Modular Files (1,650 lines total)**

| File | Lines | Purpose |
|------|-------|---------|
| `component.tsx` | 345 | Main orchestration component |
| `lib/hooks.ts` | 309 | 9 custom React hooks |
| `rendering/svg-gradients.tsx` | 273 | Gradient rendering |
| `lib/constants.ts` | 372 | Presets & tokens |
| `rendering/svg-filters.tsx` | 92 | Shadow & clipPath |
| `lib/utils.ts` | 134 | Path generation |
| `types.ts` | 125 | TypeScript definitions |
| `index.tsx` | 15 | Public exports |

</details>

<details>
<summary><strong>Shadow Technique - Duplicate SVG Method</strong></summary>

The component uses **duplicate SVG shadow rendering**:
- Separate SVG element positioned behind main shape
- CSS `filter: blur()` for shadow blur effect
- `transform: translate()` for shadow offset
- No clipping issues (unlike SVG filter method)

**Why not CSS filter drop-shadow?**
- CSS filter shadows get clipped by parent overflow
- Duplicate SVG is the only working cross-browser solution

</details>

<details>
<summary><strong>Safari Performance Optimizations</strong></summary>

**1. Debounced ResizeObserver (30-40% CPU reduction)**
```typescript
// Batches resize events using requestAnimationFrame
// Only updates when dimension change > 1px
resizeTimeoutRef.current = requestAnimationFrame(() => {
  if (widthDiff > 1 || heightDiff > 1) {
    setDimensions({ width: newWidth, height: newHeight })
  }
})
```

**2. ClipPath Rendering Fix**
```typescript
// Forces new stacking context to fix Safari compositing bug
transform: 'translateZ(0)',
WebkitBackfaceVisibility: 'hidden'
```

**3. FOUC Prevention**
```typescript
// Fades in from opacity 0 to 1 after dimensions measured
opacity: fadeInOnMount ? (hasMeasured ? 1 : 0) : undefined,
transition: 'opacity 150ms ease-out'
```

</details>

<details>
<summary><strong>Path Generation</strong></summary>

- Uses superellipse formula for iOS-style corners
- Memoized path calculation in `lib/utils.ts`
- Adaptive quality based on roundness preset
- Sub-pixel precision for sharp displays

</details>

---

## ⚠️ Known Limitations

### 1. Shadow Clipping (Critical)

**Problem**: Only `xs` and `sm` shadows work without clipping.

**Root Cause**: Parent containers use `overflow: hidden` which clips shadow that extends beyond element bounds.

**Solution:**
- ✅ Use `shadow="xs"` or `shadow="sm"` (subtle shadows)
- ❌ Cannot use md, lg, xl, 2xl (disabled in TypeScript)

### 2. ResizeObserver Required

**Why?** SVG paths must be regenerated when dimensions change (non-square shapes).

**Optimization**: Debounced with `requestAnimationFrame` to reduce Safari CPU usage by 30-40%.

### 3. Safari ClipPath Bug

**Issue**: Safari has compositing bug with `clipPath` + SVG transforms.

**Fix**: Force new stacking context with `transform: translateZ(0)` + `WebkitBackfaceVisibility: 'hidden'`

---

## 📚 TypeScript Reference

```typescript
// Main component props
export interface SquircleProps {
  // Core styling
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  backgroundColor?: string
  borderColor?: string
  borderWidth?: number
  roundness?: 0 | 1 | 2 | 3 | 4 | 5
  customSmoothing?: number
  customBorderRadius?: number
  customPointsPerCorner?: number
  overflow?: 'visible' | 'hidden' | 'clip'

  // Border gradients
  borderGradient?: BorderGradientPreset
  customBorderGradient?: GradientBorderConfig
  outerBorderColor?: string
  outerBorderWidth?: number

  // Background gradients
  backgroundGradient?: BackgroundGradientPreset
  customBackgroundGradient?: GradientBorderConfig
  backgroundGradientOverlayColor?: string

  // Shadows (restricted to xs/sm)
  shadow?: 'none' | 'xs' | 'sm' | 'custom'
  customShadow?: CustomShadowConfig

  // Hover states
  backgroundColorHover?: string
  borderColorHover?: string

  // Layout behavior
  fillMode?: boolean

  // FOUC prevention
  fadeInOnMount?: boolean

  // Events
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void
  onDimensionsChange?: (width: number, height: number) => void
}

// Shadow configuration
export interface CustomShadowConfig {
  offsetX: number
  offsetY: number
  blur: number
  spread: number
  color: string
  opacity: number
}

// Gradient configuration
export interface GradientBorderConfig {
  type: 'linear' | 'radial' | 'conic' | 'corner-emphasis'
  colors: string[]
  stops?: number[]
  angle?: number
  opacity?: number
  useOpacityGradient?: boolean
  opacities?: number[]  // 5-stop opacity control
}
```

---

## 🔗 Related Documentation

- **Button Component**: `/v2/components/ui/custom/base/button/README.md`
- **Badge Component**: `/v2/components/ui/custom/base/badge/README.md`
- **Design Tokens**: `.claude/DESIGN-TOKENS.md` - Complete semantic token reference (200+)
- **V2 Patterns**: `.claude/FRONTEND-PATTERNS.md` - V2 component best practices

---

## 🤝 Contributing

When modifying the Squircle component:

1. ✅ Test on Safari AND Chrome (different rendering engines)
2. ✅ Run playground tests: `http://localhost:3001/v2/playground/ui/gallery/squircle-v2`
3. ✅ Verify no TypeScript errors: `pnpm type-check`
4. ✅ Check for ESLint issues: `pnpm next lint`
5. ✅ Update this README if adding new props or features

### Quality Checks Before Commit

```bash
pnpm next lint --file src/modules/design-system/v2/components/ui/custom/validated/base/squircle/component.tsx
pnpm type-check
```

---

**Built with ❤️ for PAYVA V2 Design System**

_Modular architecture achieved October 2025 (56% code reduction)_
_Safari optimizations achieved October 2025 (30-40% CPU improvement)_
_Shadow system refined October 2025 (xs/sm only due to clipping constraints)_

# Squircle Badge Component

Production-ready badge component built on optimized Squircle + Hugeicons with semantic design tokens and GPU-accelerated shadows.

## ✨ Features

- **3 Sizes**: sm (12px icons), md (16px icons), lg (20px icons)
- **3 Visual Styles**: pill, badge, modern
- **8 Color Schemes**: gray, brand, error, warning, success, blue, indigo, purple
- **Icon Support**: Hugeicons PRO integration
- **Asymmetric Padding**: 2px less padding on icon side
- **Optimized Rendering**: 50% less SVG overhead, immediate rendering
- **GPU Shadows**: CSS filter drop-shadow for optimal performance
- **Dark Mode**: Automatic with semantic tokens
- **Type Safe**: Full TypeScript support

## 🚀 Quick Start

```tsx
import { Badge } from '@/v2/components/ui/custom/badge'
import FireSecurityIcon from '@hugeicons-pro/core-stroke-rounded/FireSecurityIcon'

// Text only
<Badge size="sm" color="brand">Verified</Badge>

// With icon (helper)
<Badge.WithIcon size="md" color="success" icon={FireSecurityIcon}>
  Secure
</Badge.WithIcon>

// Icon only
<Badge.Icon size="lg" color="error" icon={FireSecurityIcon} />

// Custom (full control)
<Badge size="sm" color="brand">
  <HugeIcon icon={FireSecurityIcon} size={12} strokeWidth={2} />
  <span>Custom</span>
</Badge>
```

## 📖 API Reference

### Badge (Base Component)

```tsx
interface BadgeProps {
  size?: 'sm' | 'md' | 'lg'           // Default: 'md'
  type?: 'pill' | 'badge' | 'modern'  // Default: 'badge'
  color?: BadgeColor                   // Default: 'gray'
  roundness?: 0 | 1 | 2 | 3 | 4 | 5   // Override type default
  shadow?: 'none' | 'sm' | 'md' | ... // Override type default
  children: ReactNode
  className?: string
}
```

### Badge.WithIcon (Helper)

```tsx
interface BadgeWithIconProps {
  icon: any                            // Hugeicons icon
  iconPosition?: 'leading' | 'trailing' // Default: 'leading'
  iconSize?: number                    // Auto-calculated if not specified
  iconStrokeWidth?: number             // Default: 2
  children: ReactNode                  // Text content
  // ...all BadgeProps
}
```

### Badge.Icon (Icon Only)

```tsx
interface BadgeIconOnlyProps {
  icon: any                            // Hugeicons icon
  iconSize?: number                    // Auto-calculated if not specified
  iconStrokeWidth?: number             // Default: 2
  // ...all BadgeProps except children
}
```

## 🎨 Size Configuration

| Size | Text | Icon | Padding (icon/text) | Gap | Stroke |
|------|------|------|---------------------|-----|--------|
| **sm** | xs | 12px | 4px / 6px + 2px V | 4px | 2.0 |
| **md** | sm | 16px | 6px / 8px + 2px V | 4px | 2.0 |
| **lg** | sm | 20px | 8px / 10px + 4px V | 4px | 2.0 |

**Icon Sizing Philosophy**: Based on Untitled UI's 24px standard
- sm: 12px (0.5x base)
- md: 16px (0.67x base)
- lg: 20px (0.83x base)

## 🎭 Visual Styles

```tsx
// Pill - Fully rounded, clean
<Badge type="pill" color="brand">Pill</Badge>

// Badge - Default, moderate rounding
<Badge type="badge" color="success">Badge</Badge>

// Modern - Subtle rounding with shadow
<Badge type="modern" color="error">Modern</Badge>
```

| Type | Roundness | Shadow | Border | Use Case |
|------|-----------|--------|--------|----------|
| **pill** | 5 (full) | none | 1px | Tags, filters |
| **badge** | 3 (moderate) | none | 1px | Status, labels |
| **modern** | 2 (subtle) | sm | 1px | Cards, emphasis |

## 🌈 Color Schemes

All colors use V2 semantic utility tokens:

```tsx
<Badge color="gray">Default</Badge>
<Badge color="brand">Brand</Badge>
<Badge color="error">Error</Badge>
<Badge color="warning">Warning</Badge>
<Badge color="success">Success</Badge>
<Badge color="blue">Info</Badge>
<Badge color="indigo">Indigo</Badge>
<Badge color="purple">Purple</Badge>
```

Each color provides:
- **Background**: `utility-{color}-50`
- **Border**: `utility-{color}-200`
- **Text**: `utility-{color}-700`

## 📐 Asymmetric Padding Pattern

Icons get **2px less padding** on their side:

```
┌─────────────────┐
│ 4px │icon│ 6px  │  Icon on left
└─────────────────┘

┌─────────────────┐
│ 6px │text│ 4px  │  Icon on right
└─────────────────┘
```

This creates visual balance and prevents badges from feeling lopsided.

## 🔧 Advanced Usage

### Custom Icon Size

```tsx
<Badge.WithIcon
  size="md"
  icon={FireSecurityIcon}
  iconSize={18}           // Override default 16px
  iconStrokeWidth={2.5}   // Thicker stroke
>
  Custom
</Badge.WithIcon>
```

### Override Type Defaults

```tsx
<Badge
  type="pill"
  roundness={2}     // Override pill's default roundness
  shadow="md"       // Add shadow to pill
>
  Custom Pill
</Badge>
```

### Fully Custom Layout

```tsx
<Badge size="lg" color="brand">
  <HugeIcon icon={StarIcon} size={20} strokeWidth={2} />
  <span className="font-bold">★★★★★</span>
  <HugeIcon icon={FireIcon} size={20} strokeWidth={2} />
</Badge>
```

## 🎯 Common Patterns

### Status Indicators

```tsx
<Badge size="sm" color="success">Active</Badge>
<Badge size="sm" color="warning">Pending</Badge>
<Badge size="sm" color="error">Failed</Badge>
```

### Feature Tags

```tsx
<Badge.WithIcon size="md" type="pill" color="brand" icon={CrownIcon}>
  Premium
</Badge.WithIcon>

<Badge.WithIcon size="md" type="pill" color="purple" icon={FireIcon}>
  Hot
</Badge.WithIcon>
```

### Icon-Only Actions

```tsx
<Badge.Icon size="sm" color="gray" icon={CloseIcon} />
<Badge.Icon size="md" color="brand" icon={CheckIcon} />
<Badge.Icon size="lg" color="success" icon={HeartIcon} />
```

## 🧪 Badge Builder

Interactive badge builder available at:
```
http://localhost:3001/v2/playground/ui/gallery/squircle
```

**Features**:
- Live preview
- Configure all props (text, icon, padding, squircle)
- Export ready-to-use code
- Track size specifications

## 🔄 Migration Pattern

This component follows the **Squircle Component Pattern** suitable for:
- ✅ Badges (status, tags, labels)
- ✅ Buttons (primary, secondary, CTA)
- ✅ Chips (filters, selections)
- ✅ Pills (navigation, categories)

**Key Principles**:
1. **Squircle base**: All components use Squircle wrapper
2. **Hugeicons integration**: Native icon support via HugeIcon wrapper
3. **Asymmetric padding**: 2px less on icon side
4. **Semantic tokens**: V2 utility color scales
5. **Size variants**: sm/md/lg with icon scaling
6. **Type variants**: Visual style presets

## 📚 Type Definitions

```typescript
// Size variants
type BadgeSize = 'sm' | 'md' | 'lg'

// Visual styles
type BadgeType = 'pill' | 'badge' | 'modern'

// Color schemes
type BadgeColor =
  | 'gray'
  | 'brand'
  | 'error'
  | 'warning'
  | 'success'
  | 'blue'
  | 'indigo'
  | 'purple'

// Squircle overrides
type Roundness = 0 | 1 | 2 | 3 | 4 | 5
type Shadow = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
```

## 🎨 Icon Color Implementation

### How Icon Colors Work

HugeIcon uses `color="currentColor"` which inherits from its parent's CSS `color` property. The Badge component achieves **muted icon colors** (utility-{color}-500) vs text (utility-{color}-700) through:

**Main Badge Component** - Wraps HugeIcon children in `<span>` with inline style:
```tsx
<span style={{ color: `var(--color-${colorConfig.iconColor})` }}>
  <HugeIcon icon={StarIcon} />
</span>
```

**Badge.WithIcon** - Passes HugeIcon to main Badge component (coloring handled automatically)

**Badge.Icon** - Sets `color` on wrapper div:
```tsx
<div style={{ color: `var(--color-${colorConfig.iconColor})` }}>
  <HugeIcon icon={StarIcon} />
</div>
```

### Why Not Tailwind Classes?

❌ **Doesn't work:**
```tsx
<HugeIcon className="text-[var(--color-utility-brand-500)]" />
```
Tailwind's `text-[arbitrary]` syntax doesn't support CSS variables with hyphens.

✅ **Correct approach:**
```tsx
<span style={{ color: 'var(--color-utility-brand-500)' }}>
  <HugeIcon icon={StarIcon} />
</span>
```
HugeIcon's `currentColor` inherits from parent's inline style.

### Color Token Pattern

Each badge color uses two token variants for visual hierarchy:

| Color | Text Token | Icon Token | Difference |
|-------|-----------|------------|------------|
| gray | utility-gray-700 | utility-gray-500 | -200 (muted) |
| brand | utility-brand-700 | utility-brand-500 | -200 (muted) |
| error | utility-error-700 | utility-error-500 | -200 (muted) |

This creates subtle hierarchy where icons are visually secondary to text.

## 🐛 Troubleshooting

### Icon not showing?
- Ensure you're using Hugeicons PRO stroke-rounded icons
- Check icon import path: `@hugeicons-pro/core-stroke-rounded/{IconName}`
- Verify icon size is appropriate for badge size

### Padding looks off?
- Component auto-detects icon position (first child = leading, last = trailing)
- Use Badge.WithIcon for explicit icon/text layout
- Check that HugeIcon is used (not Untitled UI or other libraries)

### Icon colors not applying?
- HugeIcon must inherit from parent's `color` CSS property (uses `currentColor`)
- Don't pass className with text colors to HugeIcon - use parent wrapper
- Verify semantic tokens are loaded (`var(--color-utility-{color}-{shade})`)

### Colors not applying?
- Verify semantic tokens are loaded
- Check dark mode class on parent
- Ensure color value is valid BadgeColor type

---

Built with precision for the PAYVA design system.

# Squircle Button Component

Production-ready button component built on optimized Squircle + Hugeicons with semantic design tokens and GPU-accelerated shadows.

## ✨ Features

- **3 Sizes**: sm, md, lg with responsive padding
- **4 Hierarchies**: primary, secondary, tertiary, link
- **9 Colors**: gray, brand, error, warning, success, purple, orange, green, pink
- **Icon Support**: Hugeicons PRO integration with leading/trailing positions
- **Optimized Rendering**: 50% less SVG overhead, immediate rendering
- **GPU Shadows**: CSS filter drop-shadow for optimal performance
- **Hover States**: Background, border, and shadow transitions
- **Loading State**: Built-in loading spinner
- **Disabled State**: Full disabled styling support
- **Dark Mode**: Automatic with semantic tokens
- **Type Safe**: Full TypeScript support

## 🚀 Quick Start

```tsx
import { Button } from '@/v2/components/ui/custom/base/button'
import { ArrowRight } from '@untitledui-pro/icons/line'

// Text only
<Button size="md" hierarchy="primary" color="brand">
  Get Started
</Button>

// With icon (helper)
<Button.WithIcon
  size="md"
  hierarchy="secondary"
  color="gray"
  icon={ArrowRight}
  iconPosition="trailing"
>
  Learn More
</Button.WithIcon>

// Icon only
<Button.Icon size="sm" hierarchy="tertiary" icon={ArrowRight} />

// Custom (full control)
<Button size="lg" hierarchy="primary" color="brand">
  <HugeIcon icon={ArrowRight} size={20} strokeWidth={2} />
  <span>Custom</span>
</Button>
```

## 📖 API Reference

### Button (Base Component)

```tsx
interface ButtonProps {
  size?: 'sm' | 'md' | 'lg'                    // Default: 'md'
  hierarchy?: 'primary' | 'secondary' | 'tertiary' | 'link'  // Default: 'primary'
  color?: ButtonColor                           // Default: 'brand'
  disabled?: boolean                            // Default: false
  loading?: boolean                             // Default: false
  roundness?: 0 | 1 | 2 | 3 | 4 | 5           // Override hierarchy default
  shadow?: 'none' | 'sm' | 'md' | ...          // Override hierarchy default
  children: ReactNode
  className?: string
  onClick?: () => void
}
```

### Button.WithIcon (Helper)

```tsx
interface ButtonWithIconProps {
  icon: any                                     // Hugeicons icon
  iconPosition?: 'leading' | 'trailing'        // Default: 'leading'
  iconSize?: number                             // Auto-calculated if not specified
  iconStrokeWidth?: number                      // Default: 2
  children: ReactNode                           // Button text
  // ...all ButtonProps
}
```

### Button.Icon (Icon Only)

```tsx
interface ButtonIconOnlyProps {
  icon: any                                     // Hugeicons icon
  iconSize?: number                             // Auto-calculated if not specified
  iconStrokeWidth?: number                      // Default: 2
  // ...all ButtonProps except children
}
```

## 🎨 Size Configuration

| Size | Text | Icon | Padding (H × V) | Gap | Stroke |
|------|------|------|-----------------|-----|--------|
| **sm** | sm | 16px | 12px × 8px | 6px | 2.0 |
| **md** | md | 20px | 16px × 10px | 8px | 2.0 |
| **lg** | lg | 24px | 20px × 12px | 10px | 2.0 |

**Icon Sizing**: Based on Untitled UI's 24px standard
- sm: 16px (0.67x base)
- md: 20px (0.83x base)
- lg: 24px (1.0x base)

## 🎭 Hierarchies

```tsx
// Primary - Solid background, maximum emphasis
<Button hierarchy="primary" color="brand">Primary Action</Button>

// Secondary - Outlined, medium emphasis
<Button hierarchy="secondary" color="gray">Secondary Action</Button>

// Tertiary - Ghost, minimum emphasis
<Button hierarchy="tertiary" color="gray">Tertiary Action</Button>

// Link - Text-only, inline actions
<Button hierarchy="link" color="brand">Learn more →</Button>
```

| Hierarchy | Background | Border | Shadow | Roundness | Use Case |
|-----------|------------|--------|--------|-----------|----------|
| **primary** | Solid color | None | sm | 2 | Main CTA, primary actions |
| **secondary** | Transparent | 1px | none | 2 | Secondary actions, cancel |
| **tertiary** | Transparent | None | none | 2 | Low-emphasis actions |
| **link** | None | None | none | 0 | Inline text links |

## 🌈 Color Schemes

All colors use V2 semantic utility tokens with hover states:

```tsx
<Button color="brand">Brand</Button>
<Button color="gray">Gray</Button>
<Button color="error">Error</Button>
<Button color="warning">Warning</Button>
<Button color="success">Success</Button>
<Button color="purple">Purple</Button>
<Button color="orange">Orange</Button>
<Button color="green">Green</Button>
<Button color="pink">Pink</Button>
```

### Color Configuration

Each color provides background, border, and text colors with hover states:

**Primary Hierarchy:**
- Background: `utility-{color}-600`
- Background Hover: `utility-{color}-700`
- Text: White (`text-white`)

**Secondary Hierarchy:**
- Background: Transparent
- Background Hover: `utility-{color}-50`
- Border: `utility-{color}-300`
- Border Hover: `utility-{color}-400`
- Text: `utility-{color}-700`

**Tertiary Hierarchy:**
- Background: Transparent
- Background Hover: `utility-{color}-50`
- Text: `utility-{color}-700`

## 🔧 Advanced Usage

### Custom Icon Size

```tsx
<Button.WithIcon
  size="md"
  icon={ArrowRight}
  iconSize={22}           // Override default 20px
  iconStrokeWidth={2.5}   // Thicker stroke
>
  Custom
</Button.WithIcon>
```

### Override Hierarchy Defaults

```tsx
<Button
  hierarchy="primary"
  roundness={4}     // Override primary's default roundness
  shadow="lg"       // Add larger shadow
>
  Custom Primary
</Button>
```

### Loading State

```tsx
<Button
  loading={isLoading}
  disabled={isLoading}
  onClick={handleSubmit}
>
  {isLoading ? 'Submitting...' : 'Submit'}
</Button>
```

### Fully Custom Layout

```tsx
<Button size="lg" hierarchy="primary" color="brand">
  <HugeIcon icon={StarIcon} size={24} strokeWidth={2} />
  <span className="font-bold">Rate 5 Stars</span>
  <HugeIcon icon={StarIcon} size={24} strokeWidth={2} />
</Button>
```

## 🎯 Common Patterns

### Primary CTA

```tsx
<Button size="lg" hierarchy="primary" color="brand">
  Get Started
</Button>
```

### Secondary Action with Icon

```tsx
<Button.WithIcon
  size="md"
  hierarchy="secondary"
  color="gray"
  icon={ArrowRight}
  iconPosition="trailing"
>
  Learn More
</Button.WithIcon>
```

### Destructive Action

```tsx
<Button
  size="md"
  hierarchy="primary"
  color="error"
  onClick={handleDelete}
>
  Delete Account
</Button>
```

### Icon-Only Action Button

```tsx
<Button.Icon
  size="sm"
  hierarchy="tertiary"
  color="gray"
  icon={CloseIcon}
  onClick={handleClose}
/>
```

### Loading Button

```tsx
function SubmitButton() {
  const [loading, setLoading] = useState(false)

  return (
    <Button
      size="md"
      hierarchy="primary"
      color="brand"
      loading={loading}
      disabled={loading}
      onClick={async () => {
        setLoading(true)
        await submitForm()
        setLoading(false)
      }}
    >
      {loading ? 'Submitting...' : 'Submit'}
    </Button>
  )
}
```

## 🧪 Interactive Gallery

Visit the interactive gallery to experiment with all features:

```
http://localhost:3002/v2/playground/ui/gallery/button
```

Gallery features:
- Live preview of all hierarchies and colors
- Size comparisons
- State demonstrations (hover, disabled, loading)
- Code examples
- Icon integration examples

## 🔄 Migration Pattern

This component follows the **Squircle Component Pattern** used across:
- ✅ Badges (status, tags, labels)
- ✅ Buttons (primary, secondary, CTA)
- ✅ SearchInput (form controls)

**Key Principles**:
1. **Squircle base**: Optimized Squircle wrapper for all button types
2. **Hugeicons integration**: Native icon support with proper sizing
3. **Semantic tokens**: V2 utility color scales with hover states
4. **Size variants**: sm/md/lg with icon scaling
5. **Hierarchy variants**: Visual emphasis presets
6. **GPU-accelerated shadows**: CSS filter drop-shadow

## 📚 Type Definitions

```typescript
// Size variants
type ButtonSize = 'sm' | 'md' | 'lg'

// Visual hierarchies
type ButtonHierarchy = 'primary' | 'secondary' | 'tertiary' | 'link'

// Color schemes
type ButtonColor =
  | 'brand'
  | 'gray'
  | 'error'
  | 'warning'
  | 'success'
  | 'purple'
  | 'orange'
  | 'green'
  | 'pink'

// Squircle overrides
type Roundness = 0 | 1 | 2 | 3 | 4 | 5
type Shadow = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
```

## 🎨 Technical Implementation

### Squircle Integration
- Uses optimized Squircle component as container
- CSS filter drop-shadow for GPU-accelerated shadows
- Dynamic roundness and shadow based on hierarchy
- Immediate content rendering (no FOUC)

### Icon Integration
- Hugeicons PRO icons (`@hugeicons-pro/core-stroke-rounded`)
- Automatic sizing based on button size
- Color inheritance via `currentColor`
- Leading/trailing position support

### Hover States
- Background color transitions (100ms)
- Border color transitions (100ms)
- Shadow elevation changes on some hierarchies
- Disabled state prevents all hover effects

### Performance
- Memoized with useCallback for handlers
- Optimized Squircle rendering (50% less SVG overhead)
- GPU-accelerated shadows
- Minimal re-renders

## 🐛 Troubleshooting

### Icon not showing?
- Ensure you're using Hugeicons PRO stroke-rounded icons
- Check icon import path: `@hugeicons-pro/core-stroke-rounded/{IconName}`
- Verify icon size is appropriate for button size

### Hover state not working?
- Check that button is not disabled
- Verify color tokens are loaded
- Ensure hierarchy provides hover states

### Shadow not rendering?
- CSS filter shadows are GPU-accelerated (check browser compatibility)
- Try larger shadow preset (md, lg)
- Check that hierarchy supports shadows (primary/secondary have shadows)

### Colors not applying?
- Verify semantic tokens are loaded
- Check dark mode class on parent
- Ensure color value is valid ButtonColor type

## 📁 File Structure

```
src/v2/components/ui/custom/base/button/
├── README.md              # This documentation
├── index.tsx              # Public exports & component variants
├── types.ts              # TypeScript interfaces
├── config.ts             # Size/hierarchy/color configurations
└── deprecated/
    ├── MIGRATION-GUIDE.md
    └── REFACTOR-OUTLINE.md
```

---

Built with precision for the PAYVA design system following the proven Badge/Squircle pattern.

_For live examples and interactive testing, visit `/v2/playground/ui/gallery/button`_

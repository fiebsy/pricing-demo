# Skwircle Variant System

> **Pre-built configurations, intents, and customization**

The variant system provides sensible defaults while allowing full customization.

---

## Table of Contents

1. [Overview](#overview)
2. [Variant Configurations](#variant-configurations)
3. [Intent System](#intent-system)
4. [Size Configurations](#size-configurations)
5. [Compound Components](#compound-components)
6. [Customization Hierarchy](#customization-hierarchy)
7. [Creating Custom Variants](#creating-custom-variants)

---

## Overview

### The Three-Layer System

Skwircle styling flows through three layers:

```
1. Variant Defaults     →  Shape, layout, interactivity
2. Intent Colors        →  Color scheme (primary, error, etc.)
3. User Props           →  Your custom overrides
```

**Priority:** User Props > Intent Colors > Variant Defaults

### Quick Usage

```tsx
// Use compound components for clarity
<Skwircle.Button intent="primary">Submit</Skwircle.Button>
<Skwircle.Card elevation="sm">Content</Skwircle.Card>
<Skwircle.Badge intent="success">Active</Skwircle.Badge>

// Or base component with variant prop
<Skwircle variant="button" intent="primary">Submit</Skwircle>
```

---

## Variant Configurations

Each variant has pre-configured defaults for common use cases.

### Base Variant

**Use for:** Generic containers, custom components

| Property | Default | Notes |
|----------|---------|-------|
| `roundness` | `'moderate'` | 22px corners |
| `borderWidth` | `1` | Standard 1px border |
| `elevation` | `'none'` | No shadow |
| `fillMode` | `false` | Border extends outside |
| `interactive` | `false` | No hover effects |
| `ring` | `false` | No ring |
| `contentWrapperClassName` | `''` | No default styles |

```tsx
<Skwircle>Basic container</Skwircle>
```

---

### Card Variant

**Use for:** Panels, containers, content sections

| Property | Default | Notes |
|----------|---------|-------|
| `roundness` | `'rounded'` | 32px corners |
| `borderWidth` | `1` | Subtle border |
| `elevation` | `'xs'` | Light shadow |
| `fillMode` | `false` | Content-driven size |
| `interactive` | `false` | No hover (add `interactive` for clickable) |
| `ring` | `false` | No ring |
| `contentWrapperClassName` | `''` | No default styles |

```tsx
<Skwircle.Card>
  <div className="p-4">
    <h3>Card Title</h3>
    <p>Card content</p>
  </div>
</Skwircle.Card>

// Clickable card
<Skwircle.Card
  interactive
  backgroundColorHover="background-secondary"
  onClick={handleClick}
>
  Click me
</Skwircle.Card>
```

---

### Button Variant

**Use for:** Interactive buttons, actions

| Property | Default | Notes |
|----------|---------|-------|
| `roundness` | `'rounded'` | 32px corners |
| `borderWidth` | `0` | No border (uses elevation) |
| `elevation` | `'sm'` | Visible shadow |
| `fillMode` | `true` | Fixed dimensions |
| `interactive` | `true` | Hover effects enabled |
| `ring` | `false` | No ring |
| `contentWrapperClassName` | `'flex items-center justify-center'` | Centered content |
| `role` | `'button'` | ARIA role |
| `tabIndex` | `0` | Keyboard accessible |

```tsx
<Skwircle.Button intent="primary" onClick={handleClick}>
  <Icon />
  <span>Submit</span>
</Skwircle.Button>
```

---

### Input Variant

**Use for:** Form input wrappers

| Property | Default | Notes |
|----------|---------|-------|
| `roundness` | `'subtle'` | 16px corners |
| `borderWidth` | `1` | Standard border |
| `elevation` | `'none'` | Flat appearance |
| `fillMode` | `true` | Fills container |
| `interactive` | `false` | Use ring for focus states |
| `ring` | `false` | Toggle on focus |
| `contentWrapperClassName` | `'flex items-center'` | Horizontal layout |

```tsx
const [focused, setFocused] = useState(false)

<Skwircle.Input
  ring={focused}
  ringColor="outline-color-brand"
>
  <input
    className="w-full bg-transparent outline-none px-3 py-2"
    onFocus={() => setFocused(true)}
    onBlur={() => setFocused(false)}
  />
</Skwircle.Input>
```

---

### Badge Variant

**Use for:** Labels, tags, status indicators

| Property | Default | Notes |
|----------|---------|-------|
| `roundness` | `'rounded'` | 32px corners |
| `borderWidth` | `1` | Visible border |
| `elevation` | `'none'` | Flat appearance |
| `fillMode` | `false` | Wraps content |
| `interactive` | `false` | Typically non-interactive |
| `ring` | `false` | No ring |
| `contentWrapperClassName` | `'flex items-center font-medium whitespace-nowrap'` | Inline badge styling |

```tsx
<Skwircle.Badge
  backgroundColor="utility-success-50"
  borderColor="utility-success-200"
>
  <CheckIcon className="w-3 h-3 text-utility-success-700" />
  <span className="text-utility-success-700 text-xs ml-1">Active</span>
</Skwircle.Badge>
```

---

### Avatar Variant

**Use for:** Profile images, user icons

| Property | Default | Notes |
|----------|---------|-------|
| `roundness` | `'pill'` | Circular shape |
| `borderWidth` | `0` | No border |
| `elevation` | `'none'` | Flat appearance |
| `fillMode` | `true` | Fixed dimensions |
| `interactive` | `false` | Non-interactive by default |
| `ring` | `false` | Use for online indicators |
| `contentWrapperClassName` | `'flex items-center justify-center'` | Centered content |

```tsx
// Basic avatar
<Skwircle.Avatar style={{ width: 48, height: 48 }}>
  <img src={avatarUrl} className="w-full h-full object-cover" />
</Skwircle.Avatar>

// Avatar with online indicator
<Skwircle.Avatar
  ring={isOnline}
  ringColor="utility-success-500"
  ringWidth={3}
  style={{ width: 48, height: 48 }}
>
  <img src={avatarUrl} className="w-full h-full object-cover" />
</Skwircle.Avatar>
```

---

## Intent System

Intents provide semantic color schemes that work across variants.

### Available Intents

| Intent | Use Case | Background | Border |
|--------|----------|------------|--------|
| `default` | Neutral elements | `background-primary` | `border-primary` |
| `primary` | Primary actions | `background-brand-solid` | `transparent` |
| `secondary` | Secondary actions | `background-primary` | `border-primary` |
| `ghost` | Subtle actions | `transparent` | `transparent` |
| `error` | Error states | `background-error-primary` | `border-error` |
| `success` | Success states | `background-success-primary` | `border-success` |
| `warning` | Warning states | `background-warning-primary` | `border-warning` |

### Intent Color Mappings

```typescript
// Default Intent
{
  backgroundColor: 'background-primary',
  backgroundColorHover: 'background-primary_hover',
  borderColor: 'border-primary',
  borderColorHover: 'border-primary',
}

// Primary Intent
{
  backgroundColor: 'background-brand-solid',
  backgroundColorHover: 'background-brand-solid_hover',
  borderColor: 'transparent',
  borderColorHover: 'transparent',
}

// Secondary Intent
{
  backgroundColor: 'background-primary',
  backgroundColorHover: 'background-secondary',
  borderColor: 'border-primary',
  borderColorHover: 'border-primary',
}

// Ghost Intent
{
  backgroundColor: 'transparent',
  backgroundColorHover: 'background-secondary',
  borderColor: 'transparent',
  borderColorHover: 'border-primary',
}

// Error Intent
{
  backgroundColor: 'background-error-primary',
  backgroundColorHover: 'background-error-secondary',
  borderColor: 'border-error',
  borderColorHover: 'border-error',
}

// Success Intent
{
  backgroundColor: 'background-success-primary',
  backgroundColorHover: 'background-success-secondary',
  borderColor: 'utility-success-300',
  borderColorHover: 'utility-success-300',
}

// Warning Intent
{
  backgroundColor: 'background-warning-primary',
  backgroundColorHover: 'background-warning-secondary',
  borderColor: 'utility-warning-300',
  borderColorHover: 'utility-warning-300',
}
```

### Variant-Specific Intent Overrides

Some variants modify intent behavior:

**Button Overrides:**
- `ghost` intent: Sets `elevation: 'none'` (no shadow)
- `primary` intent: Uses on-brand text colors

**Card Overrides:**
- All intents: Disable hover color changes (consistent background)

**Badge Overrides:**
- Uses utility color scales for more subtle appearance
- Example: `utility-brand-50` (background), `utility-brand-200` (border), `utility-brand-700` (text)

---

## Size Configurations

### Button Sizes

| Size | Padding X | Padding Y | Text | Icon Size |
|------|-----------|-----------|------|-----------|
| `xs` | 8px | 4px | `text-xs` | 14px |
| `sm` | 12px | 6px | `text-sm` | 16px |
| `md` | 16px | 8px | `text-sm` | 18px |
| `lg` | 20px | 10px | `text-base` | 20px |
| `xl` | 24px | 12px | `text-lg` | 24px |

```tsx
<Skwircle.Button size="sm">Small</Skwircle.Button>
<Skwircle.Button size="lg">Large</Skwircle.Button>
```

### Badge Sizes

| Size | Padding | Text | Icon Size |
|------|---------|------|-----------|
| `xs` | 4px / 2px | `text-[10px]` | 10px |
| `sm` | 6px / 2px | `text-xs` | 12px |
| `md` | 8px / 4px | `text-xs` | 14px |
| `lg` | 10px / 6px | `text-sm` | 16px |

```tsx
<Skwircle.Badge size="sm">Small Badge</Skwircle.Badge>
```

---

## Compound Components

Compound components are factory functions that pre-configure the base Skwircle.

### Available Components

| Component | Factory | File |
|-----------|---------|------|
| `Skwircle.Button` | `createSkwircleButton()` | `components/skwircle-button.tsx` |
| `Skwircle.Card` | `createSkwircleCard()` | `components/skwircle-card.tsx` |
| `Skwircle.Badge` | `createSkwircleBadge()` | `components/skwircle-badge.tsx` |
| `Skwircle.Input` | `createSkwircleInput()` | `components/skwircle-input.tsx` |
| `Skwircle.Avatar` | `createSkwircleAvatar()` | `components/skwircle-avatar.tsx` |

### Using Factories Directly

```tsx
import { createSkwircleButton } from '@/components/ui/skwircle/components'

// Create a custom button variant
const PrimaryButton = createSkwircleButton({
  intent: 'primary',
  size: 'md',
})

// Use it
<PrimaryButton onClick={handleClick}>
  Submit
</PrimaryButton>
```

---

## Customization Hierarchy

Props override in this order (later wins):

```
1. Variant Defaults
2. Intent Colors
3. Variant-Intent Overrides
4. User Props (highest priority)
```

### Example: Customizing a Primary Button

```tsx
// 1. Start with button variant defaults
variant="button"
// → roundness: 'rounded', elevation: 'sm', interactive: true

// 2. Apply primary intent
intent="primary"
// → backgroundColor: 'background-brand-solid'
// → borderColor: 'transparent'

// 3. Variant-intent override (button + primary)
// → (none in this case)

// 4. User props override anything
backgroundColor="utility-purple-500"
// → Now uses purple instead of brand color
```

### Override Examples

```tsx
// Override just the roundness
<Skwircle.Button roundness="subtle">
  Less rounded button
</Skwircle.Button>

// Override colors while keeping button behavior
<Skwircle.Button
  intent="primary"
  backgroundColor="utility-purple-600"
  backgroundColorHover="utility-purple-700"
>
  Purple button
</Skwircle.Button>

// Override elevation
<Skwircle.Card elevation="none">
  Flat card (no shadow)
</Skwircle.Card>
```

---

## Creating Custom Variants

### Method 1: Wrapper Component

```tsx
// components/custom-squircle.tsx
import { Skwircle, type SkwircleProps } from '@/components/ui/skwircle'

interface CustomCardProps extends Omit<SkwircleProps, 'variant'> {
  children: React.ReactNode
}

export function CustomCard({ children, ...props }: CustomCardProps) {
  return (
    <Skwircle
      variant="card"
      roundness="moderate"
      elevation="sm"
      backgroundGradient="depth-8-bottom-right"
      borderGradient="shine-corners"
      {...props}
    >
      {children}
    </Skwircle>
  )
}
```

### Method 2: Using Factories

```tsx
import { createSkwircleCard } from '@/components/ui/skwircle/components'

// Create a specialized card
const MetricCard = createSkwircleCard({
  elevation: 'sm',
  backgroundGradient: 'depth-10',
  roundness: 'rounded',
})

// Extend with additional props
interface MetricCardProps {
  title: string
  value: string | number
  trend?: 'up' | 'down' | 'neutral'
}

export function MetricTile({ title, value, trend }: MetricCardProps) {
  return (
    <MetricCard>
      <div className="p-4">
        <span className="text-secondary text-sm">{title}</span>
        <div className="text-2xl font-semibold">{value}</div>
        {trend && <TrendIndicator trend={trend} />}
      </div>
    </MetricCard>
  )
}
```

### Method 3: Extending Config (Advanced)

Add to `config/variants.ts`:

```typescript
// In config/variants.ts
export const VARIANT_CONFIGS = {
  // ... existing variants

  'metric-card': {
    roundness: 'rounded' as const,
    borderWidth: 0,
    elevation: 'sm' as const,
    fillMode: false,
    interactive: true,
    ring: false,
    contentWrapperClassName: 'p-4 flex flex-col gap-2',
  },
}
```

Then use:
```tsx
<Skwircle variant="metric-card">...</Skwircle>
```

---

## Variant Comparison Chart

| Property | Base | Card | Button | Input | Badge | Avatar |
|----------|------|------|--------|-------|-------|--------|
| `roundness` | moderate | rounded | rounded | subtle | rounded | pill |
| `borderWidth` | 1 | 1 | 0 | 1 | 1 | 0 |
| `elevation` | none | xs | sm | none | none | none |
| `fillMode` | false | false | true | true | false | true |
| `interactive` | false | false | true | false | false | false |
| `ring` | false | false | false | false | false | false |

---

## Best Practices

### 1. Use Compound Components

```tsx
// Preferred
<Skwircle.Button intent="primary">Submit</Skwircle.Button>

// Also fine
<Skwircle variant="button" intent="primary">Submit</Skwircle>
```

### 2. Override Only What's Needed

```tsx
// Good - minimal override
<Skwircle.Card elevation="sm">Content</Skwircle.Card>

// Avoid - unnecessary overrides
<Skwircle.Card
  variant="card"
  roundness="rounded"
  borderWidth={1}
  fillMode={false}
  elevation="sm"  // Only this differs from default
>
  Content
</Skwircle.Card>
```

### 3. Use Intents for Semantics

```tsx
// Good - semantic meaning
<Skwircle.Button intent="error">Delete</Skwircle.Button>

// Avoid - manual colors for semantic states
<Skwircle.Button
  backgroundColor="utility-error-500"
  borderColor="utility-error-600"
>
  Delete
</Skwircle.Button>
```

### 4. Create Wrappers for Repeated Patterns

```tsx
// If you use this pattern often:
<Skwircle.Badge
  backgroundColor="utility-success-50"
  borderColor="utility-success-200"
>
  <span className="text-utility-success-700">{label}</span>
</Skwircle.Badge>

// Create a wrapper:
function SuccessBadge({ children }: { children: React.ReactNode }) {
  return (
    <Skwircle.Badge
      backgroundColor="utility-success-50"
      borderColor="utility-success-200"
    >
      <span className="text-utility-success-700">{children}</span>
    </Skwircle.Badge>
  )
}

// Then use simply:
<SuccessBadge>Active</SuccessBadge>
```

---

## Related Documentation

- [Props Reference](./PROPS-REFERENCE.md) - Complete API
- [Styling Guide](./STYLING-GUIDE.md) - Colors and borders
- [Architecture](./ARCHITECTURE.md) - Technical implementation

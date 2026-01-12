# Icons

> Hugeicons PRO is the standard icon library for PAYVA V2.

---

## Quick Start

```tsx
import Cancel01Icon from '@hugeicons-pro/core-stroke-rounded/Cancel01Icon'
import { HugeIcon } from '@/modules/design-system/v2/components/ui/prod/base/icon'

<HugeIcon icon={Cancel01Icon} size="md" color="secondary" />
```

---

## Finding Icons

### Search Local Packages (Fastest)

```bash
# From front-end directory
ls node_modules/@hugeicons-pro/core-stroke-rounded/dist/esm/*.js | sed 's/.*\///' | sed 's/\.js$//' | grep -i "search_term"
```

### Common Icon Searches

```bash
# User & Account
ls node_modules/@hugeicons-pro/core-stroke-rounded/dist/esm/*.js | grep -i "user\|account\|profile"

# Navigation
ls node_modules/@hugeicons-pro/core-stroke-rounded/dist/esm/*.js | grep -i "home\|menu\|arrow\|chevron"

# Actions
ls node_modules/@hugeicons-pro/core-stroke-rounded/dist/esm/*.js | grep -i "add\|delete\|edit\|cancel\|close"

# Status
ls node_modules/@hugeicons-pro/core-stroke-rounded/dist/esm/*.js | grep -i "check\|alert\|warning\|error\|info"

# Payment & Finance
ls node_modules/@hugeicons-pro/core-stroke-rounded/dist/esm/*.js | grep -i "dollar\|payment\|credit\|invoice"

# Settings
ls node_modules/@hugeicons-pro/core-stroke-rounded/dist/esm/*.js | grep -i "settings\|gear\|config"
```

### Browse Online

- **Hugeicons Website**: [https://hugeicons.com](https://hugeicons.com) - Browse 40,000+ icons

---

## Import Patterns

### Individual Import (Recommended)

```tsx
// Best for bundle size (~0.75KB per icon)
import Cancel01Icon from '@hugeicons-pro/core-stroke-rounded/Cancel01Icon'
import Settings01Icon from '@hugeicons-pro/core-stroke-rounded/Settings01Icon'
```

### Package Reference

| Style | Package |
|-------|---------|
| Stroke (default) | `@hugeicons-pro/core-stroke-rounded` |
| Solid | `@hugeicons-pro/core-solid-rounded` |
| Bulk | `@hugeicons-pro/core-bulk-rounded` |
| Duotone | `@hugeicons-pro/core-duotone-rounded` |
| Twotone | `@hugeicons-pro/core-twotone-rounded` |

### Anti-Patterns

```tsx
// NEVER - Imports entire package (~5MB)
import * as Icons from '@hugeicons-pro/core-stroke-rounded'

// NEVER - Use @hugeicons/react directly (causes "currentIcon is not iterable" error)
import { HugeiconsIcon } from '@hugeicons/react'

// NEVER - Other icon libraries
import { X } from 'lucide-react'
import { X01 } from '@untitledui-pro/icons/line'
```

---

## Styling Icons

### Size

| Preset | Pixels | Context |
|--------|--------|---------|
| `xs` | 12 | Tiny indicators |
| `sm` | 16 | Inline, small |
| `md` | 20 | Default |
| `lg` | 24 | Buttons, nav |
| `xl` | 32 | Featured |
| `2xl` | 48 | Hero |

```tsx
// Using presets
<HugeIcon icon={HomeIcon} size="md" />

// Using numeric values
<HugeIcon icon={HomeIcon} size={20} />
```

### Color

Use semantic color props:

```tsx
// Foreground colors
<HugeIcon icon={UserIcon} color="primary" />
<HugeIcon icon={UserIcon} color="secondary" />
<HugeIcon icon={UserIcon} color="tertiary" />
<HugeIcon icon={UserIcon} color="disabled" />

// Status colors
<HugeIcon icon={CheckIcon} color="success" />
<HugeIcon icon={AlertIcon} color="warning" />
<HugeIcon icon={AlertIcon} color="error" />

// Brand colors
<HugeIcon icon={StarIcon} color="brand" />

// Inherit from parent
<HugeIcon icon={InfoIcon} color="current" />
```

Or use Tailwind classes for custom styling:

```tsx
<HugeIcon
  icon={HomeIcon}
  className="text-fg-secondary hover:text-fg-primary transition-colors"
/>
```

### Stroke Width

| Preset | Value | Use Case |
|--------|-------|----------|
| `thin` | 1 | Light, delicate |
| `light` | 1.25 | Subtle |
| `regular` | 1.5 | Default |
| `medium` | 2 | Emphasis |
| `bold` | 2.5 | Strong |

```tsx
// Using presets
<HugeIcon icon={HomeIcon} strokeWidth="thin" />
<HugeIcon icon={HomeIcon} strokeWidth="medium" />

// Using numeric values
<HugeIcon icon={HomeIcon} strokeWidth={1.5} />
```

---

## Icon Variants

### Stroke (Default)

Line-based icons with adjustable thickness.

```tsx
import Cancel01Icon from '@hugeicons-pro/core-stroke-rounded/Cancel01Icon'

<HugeIcon icon={Cancel01Icon} size="md" strokeWidth="regular" />
```

### Solid

Filled icons. `strokeWidth` is automatically set to 0.

```tsx
import CheckIcon from '@hugeicons-pro/core-solid-rounded/CheckmarkCircle01Icon'

// variant="solid" auto-sets strokeWidth to 0
<HugeIcon icon={CheckIcon} variant="solid" size="md" />
```

### Bulk

Two-tone icons with lighter fill on background elements.

```tsx
import AlertIcon from '@hugeicons-pro/core-bulk-rounded/Alert02Icon'

// variant="bulk" auto-sets strokeWidth to 0
<HugeIcon icon={AlertIcon} variant="bulk" size="md" />
```

### Duotone & Twotone

Two-color icons that still use strokes.

```tsx
import StarIcon from '@hugeicons-pro/core-duotone-rounded/Star01Icon'

// strokeWidth applies to duotone/twotone
<HugeIcon icon={StarIcon} variant="duotone" strokeWidth="medium" />
```

### Stroke Width by Variant

| Variant | `strokeWidth` behavior |
|---------|----------------------|
| `stroke` | Applies (default: 1.5) |
| `duotone` | Applies |
| `twotone` | Applies |
| `solid` | Auto-set to 0 |
| `bulk` | Auto-set to 0 |

---

## Container for Solid/Bulk Icons

Use the `Icon` component with `withContainer` for solid/bulk icons that need proper containment:

```tsx
import { Icon } from '@/modules/design-system/v2/components/ui/prod/base/icon'
import Alert02Icon from '@hugeicons-pro/core-solid-rounded/Alert02Icon'

<Icon
  icon={Alert02Icon}
  variant="solid"
  size="md"
  color="error"
  withContainer
/>
```

The container provides:
- `relative` positioning
- `overflow-hidden` for proper clipping
- Automatic size matching

---

## Interactive Examples

### Button with Icon

```tsx
import Add01Icon from '@hugeicons-pro/core-stroke-rounded/Add01Icon'
import { HugeIcon } from '@/modules/design-system/v2/components/ui/prod/base/icon'

<button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-on-primary">
  <HugeIcon icon={Add01Icon} size="sm" color="current" />
  <span>Add Item</span>
</button>
```

### Hover State

```tsx
<button className="group p-2 rounded-lg hover:bg-primary_hover">
  <HugeIcon
    icon={HomeIcon}
    size="md"
    className="text-secondary group-hover:text-primary transition-colors"
  />
</button>
```

### Navigation Item

```tsx
<a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary_hover">
  <HugeIcon icon={SettingsIcon} size="lg" color="secondary" />
  <span className="text-sm text-secondary">Settings</span>
</a>
```

---

## Common Mappings

If migrating from Untitled UI icons:

| Untitled UI | Hugeicons |
|-------------|-----------|
| `Close01Icon` | `Cancel01Icon` |
| `ChevronDown01Icon` | `ArrowDown01Icon` |
| `InfoCircleIcon` | `InformationCircleIcon` |
| `User01Icon` | `User02Icon` |
| `UserPlus01Icon` | `UserAdd01Icon` |
| `Lock01Icon` | `LockIcon` |
| `Star01Icon` | `StarIcon` |

---

## Troubleshooting

### "currentIcon is not iterable"

**Cause**: Using `@hugeicons/react` directly instead of the wrapper.

```tsx
// Wrong
import { HugeiconsIcon } from '@hugeicons/react'
<HugeiconsIcon icon={HomeIcon} />

// Correct
import { HugeIcon } from '@/modules/design-system/v2/components/ui/prod/base/icon'
<HugeIcon icon={HomeIcon} />
```

### Icon Not Displaying

1. Check import path is correct
2. Verify icon name exists (run local search)
3. For solid/bulk, use `withContainer` if clipping issues occur

### Module Not Found

```bash
# Verify icon exists
ls node_modules/@hugeicons-pro/core-stroke-rounded/dist/esm/ | grep -i "IconName"
```

---

## API Reference

### HugeIcon Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `HugeIconData` | Required | Icon from @hugeicons-pro import |
| `size` | `'xs'` \| `'sm'` \| `'md'` \| `'lg'` \| `'xl'` \| `'2xl'` \| `number` | `'md'` | Icon size |
| `color` | `IconColor` | `'current'` | Semantic color |
| `strokeWidth` | `'thin'` \| `'light'` \| `'regular'` \| `'medium'` \| `'bold'` \| `number` | `'regular'` | Stroke thickness |
| `variant` | `'stroke'` \| `'solid'` \| `'bulk'` \| `'duotone'` \| `'twotone'` | `'stroke'` | Icon style hint |
| `className` | `string` | - | Additional CSS classes |
| `aria-label` | `string` | - | Accessible label |
| `aria-hidden` | `boolean` | `true` | Hide from screen readers |

### Icon Props (extends HugeIcon)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `withContainer` | `boolean` | `false` | Wrap with container for solid/bulk |
| `containerClassName` | `string` | - | Container CSS classes |

---

*Import from: `@/modules/design-system/v2/components/ui/prod/base/icon`*

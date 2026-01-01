# Hugeicons PRO Guide (Skwircle)

## Overview

This guide covers Hugeicons PRO usage in the Skwircle design system demo repository. Hugeicons PRO is the **exclusive** icon library for this codebase.

**Policy**: Hugeicons PRO only. No Untitled UI icons.

## Why Hugeicons Only?

Skwircle serves as a demo/sandbox for PAYVA frontend components. The main frontend repo is actively deprecating Untitled UI icons in favor of Hugeicons. To prevent deprecated patterns from propagating:

1. **Clean slate** - Skwircle uses only Hugeicons from the start
2. **No migration debt** - Components copied to/from PAYVA frontend won't need icon updates
3. **Consistency** - All demos show the target icon library

## Icon Styles Available

### Stroke Rounded (Default)

Clean, minimal stroke with rounded corners. **Use this for most UI elements.**

```typescript
import Home01Icon from '@hugeicons-pro/core-stroke-rounded/Home01Icon'
import { HugeIcon } from '@/v2/components/ui/icon/huge-icons/huge-icons'

<HugeIcon icon={Home01Icon} size={20} className="text-primary" />
```

### Solid Rounded

Filled icons for emphasis or active states.

```typescript
import { Home01Icon } from '@hugeicons-pro/core-solid-rounded'
```

### Duotone Rounded

Two-color icons for visual depth.

```typescript
import { Home01Icon } from '@hugeicons-pro/core-duotone-rounded'
```

## Basic Usage

### Always Use the HugeIcon Wrapper

```typescript
// Import the wrapper and icon
import { HugeIcon } from '@/v2/components/ui/icon/huge-icons/huge-icons'
import Home01Icon from '@hugeicons-pro/core-stroke-rounded/Home01Icon'

// Use with semantic design tokens
<HugeIcon icon={Home01Icon} size={20} className="text-primary" />
```

### Multiple Icons

```typescript
import { HugeIcon } from '@/v2/components/ui/icon/huge-icons/huge-icons'
import User01Icon from '@hugeicons-pro/core-stroke-rounded/User01Icon'
import Settings01Icon from '@hugeicons-pro/core-stroke-rounded/Settings01Icon'
import Home01Icon from '@hugeicons-pro/core-stroke-rounded/Home01Icon'

export function NavigationIcons() {
  return (
    <div className="flex gap-4">
      <HugeIcon icon={Home01Icon} size={24} className="text-primary" />
      <HugeIcon icon={User01Icon} size={24} className="text-secondary" />
      <HugeIcon icon={Settings01Icon} size={24} className="text-tertiary" />
    </div>
  )
}
```

## HugeIcon Wrapper Props

```typescript
interface HugeIconProps {
  icon: any              // Icon from @hugeicons-pro/core-*
  size?: number          // Default: 20px
  strokeWidth?: number   // Default: 1.5 (stroke styles only)
  className?: string     // Tailwind classes for color
}
```

### Size Control

```typescript
<HugeIcon icon={HomeIcon} size={16} />   // Small
<HugeIcon icon={HomeIcon} size={20} />   // Default
<HugeIcon icon={HomeIcon} size={24} />   // Medium
<HugeIcon icon={HomeIcon} size={32} />   // Large
```

### Stroke Width (Stroke Styles Only)

```typescript
<HugeIcon icon={HomeIcon} strokeWidth={1} />     // Thin
<HugeIcon icon={HomeIcon} strokeWidth={1.5} />   // Default
<HugeIcon icon={HomeIcon} strokeWidth={2} />     // Thick
```

**Note**: Solid and Bulk styles don't use strokeWidth - set `strokeWidth={0}` for these.

## Solid & Bulk Icon Container Requirements

Solid and Bulk icons require proper container styling:

```typescript
// Proper container for solid/bulk icons
<div className="relative flex w-[16px] shrink-0 items-center justify-center overflow-hidden">
  <HugeIcon
    icon={Alert02IconSolid}
    size={16}
    strokeWidth={0}
    className="text-primary"
  />
</div>
```

**Required properties:**
- `relative` positioning
- `overflow-hidden` for clipping
- `strokeWidth={0}` on the icon

## Semantic Token Integration

```typescript
// Primary colors
<HugeIcon icon={HomeIcon} className="text-primary" />
<HugeIcon icon={HomeIcon} className="text-secondary" />
<HugeIcon icon={HomeIcon} className="text-tertiary" />

// Brand colors
<HugeIcon icon={HomeIcon} className="text-brand-primary" />

// Status colors
<HugeIcon icon={HomeIcon} className="text-success-primary" />
<HugeIcon icon={HomeIcon} className="text-error-primary" />
<HugeIcon icon={HomeIcon} className="text-warning-primary" />

// Interactive states
<button className="group p-2 rounded-lg hover:bg-primary_hover">
  <HugeIcon
    icon={HomeIcon}
    className="text-secondary group-hover:text-primary transition-colors"
  />
</button>
```

## Finding Icons

### Local Search (Fastest)

```bash
# Search stroke-rounded icons
ls node_modules/@hugeicons-pro/core-stroke-rounded/dist/esm/*.js | sed 's/.*\///' | sed 's/\.js$//' | grep -i "user"

# Common searches
ls node_modules/@hugeicons-pro/core-stroke-rounded/dist/esm/*.js | grep -i "home\|menu\|navigation"
ls node_modules/@hugeicons-pro/core-stroke-rounded/dist/esm/*.js | grep -i "settings\|gear\|config"
ls node_modules/@hugeicons-pro/core-stroke-rounded/dist/esm/*.js | grep -i "dollar\|payment\|credit"
```

### Online Reference

Browse 40,000+ icons at: https://hugeicons.com/docs

## Import Best Practices

```typescript
// BEST: Individual file imports (~0.75KB per icon)
import Home01Icon from '@hugeicons-pro/core-stroke-rounded/Home01Icon'

// GOOD: Named imports from bundle (tree-shakeable)
import { Home01Icon } from '@hugeicons-pro/core-solid-rounded'

// BAD: Import entire package (~5MB!)
import * as Icons from '@hugeicons-pro/core-stroke-rounded'
```

## Forbidden Patterns

These patterns are NOT allowed in Skwircle:

```typescript
// FORBIDDEN - Untitled UI icons
import { User01 } from '@untitledui-pro/icons/line'  // NO
import { UserIcon } from '@untitledui/icons'          // NO

// FORBIDDEN - Other icon libraries
import { User } from 'lucide-react'                   // NO
import { FaUser } from 'react-icons/fa'               // NO
import { UserIcon } from '@heroicons/react'           // NO

// FORBIDDEN - Direct @hugeicons/react usage (must use wrapper)
import { HugeiconsIcon } from '@hugeicons/react'      // NO
```

## When Copying Components from PAYVA Frontend

When bringing components from `myabundant-frontend-react`:

1. **Check for Untitled UI imports** - Replace with Hugeicons equivalents
2. **Update import paths** - Change `@/modules/design-system/v2/...` to `@/v2/...`
3. **Use local search** to find equivalent Hugeicons

### Common Icon Mappings (Untitled UI -> Hugeicons)

| Untitled UI         | Hugeicons               |
| ------------------- | ----------------------- |
| `Close01Icon`       | `Cancel01Icon`          |
| `ChevronDown01Icon` | `ArrowDown01Icon`       |
| `InfoCircleIcon`    | `InformationCircleIcon` |
| `User01Icon`        | `User02Icon`            |
| `UserPlus01Icon`    | `UserAdd01Icon`         |
| `Lock01Icon`        | `LockIcon`              |
| `Star01Icon`        | `StarIcon`              |

## Troubleshooting

### Error: "currentIcon is not iterable"

Using `@hugeicons/react` directly instead of the wrapper.

```typescript
// WRONG
import { HugeiconsIcon } from '@hugeicons/react'
<HugeiconsIcon icon={HomeIcon} />

// CORRECT
import { HugeIcon } from '@/v2/components/ui/icon/huge-icons/huge-icons'
<HugeIcon icon={HomeIcon} size={20} />
```

### Icons Not Displaying

Checklist:
1. Import path correct: `@hugeicons-pro/core-stroke-rounded/IconName`
2. Using `HugeIcon` wrapper
3. Icon name exists (search first)
4. For solid icons: Container has `relative`, `overflow-hidden`, `strokeWidth={0}`

### Module Not Found

```bash
# Verify icon exists
ls node_modules/@hugeicons-pro/core-stroke-rounded/dist/esm/ | grep -i "IconName"
```

## Package Dependencies

Skwircle uses these Hugeicons packages:

```json
{
  "@hugeicons-pro/core-stroke-rounded": "^1.2.1",
  "@hugeicons-pro/core-solid-rounded": "^1.2.1",
  "@hugeicons-pro/core-duotone-rounded": "^1.2.1",
  "@hugeicons/react": "^1.1.1"
}
```

**Note**: `@untitledui-pro/icons` exists in package.json for compatibility but should NOT be used. It will be removed in a future cleanup.

---

**Last Updated**: December 31, 2025
**Location**: `@/v2/components/ui/icon/huge-icons/huge-icons.tsx`

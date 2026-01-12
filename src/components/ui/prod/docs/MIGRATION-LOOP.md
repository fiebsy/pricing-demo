# Component Migration Loop

> Looping workflow for migrating components to Base UI primitives.
> Use the `/migrate` slash command to execute this workflow.

---

## Overview

This document defines the **looping prompt workflow** for migrating components from legacy paths (`custom/`, `untitled-ui/`, `base-ui/`) to the production `prod/base/` path with Base UI primitives.

**Goal**: Convert every component while retaining:
- All existing styles
- All animations (with motion-reduce support)
- All variants
- Exact visual parity

---

## Migration Flow

```
┌─────────────────────────────────────────────────────────────┐
│                     MIGRATION LOOP                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. INPUT ─────► Source component path(s)                   │
│        │                                                    │
│        ▼                                                    │
│  2. ANALYZE ───► Read source, extract:                      │
│        │         • Props/types                              │
│        │         • Variants                                 │
│        │         • Styles (Tailwind classes)                │
│        │         • Animations                               │
│        │         • State management                         │
│        ▼                                                    │
│  3. MAP ───────► Identify Base UI primitive (if any)        │
│        │         • Button → @base-ui/react/button           │
│        │         • Dialog → @base-ui/react/dialog           │
│        │         • None → Custom implementation             │
│        ▼                                                    │
│  4. SCAFFOLD ──► Create prod/base/[component]/ structure:   │
│        │         • index.ts                                 │
│        │         • [component].tsx                          │
│        │         • types.ts                                 │
│        │         • config.ts                                │
│        ▼                                                    │
│  5. IMPLEMENT ─► Build component with:                      │
│        │         • Base UI primitive (if mapped)            │
│        │         • Exact styling from source                │
│        │         • All variants preserved                   │
│        │         • Data attributes for states               │
│        │         • motion-reduce support                    │
│        ▼                                                    │
│  6. VERIFY ────► Visual QA in playground:                   │
│        │         • Side-by-side with legacy                 │
│        │         • All variants                             │
│        │         • All states                               │
│        │         • Animations                               │
│        ▼                                                    │
│  7. APPROVE ───► User confirms visual parity                │
│        │         • If approved → Update MIGRATION.md        │
│        │         • If not → Return to IMPLEMENT             │
│        ▼                                                    │
│  8. NEXT ──────► Repeat with next component                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Source Paths

Components can come from three legacy locations:

| Path | Contains | Example |
|------|----------|---------|
| `custom/` | Custom PAYVA components | `custom/base/skeleton/` |
| `untitled-ui/` | Untitled UI kit components | `untitled-ui/base/buttons/` |
| `base-ui/` | Legacy Base UI experiments | `base-ui/v2/filter-menu/` |

---

## Target Structure

Every migrated component goes to:

```
prod/base/[component]/
├── index.ts              # Re-exports only
├── [component].tsx       # Main component
├── types.ts              # TypeScript interfaces
└── config.ts             # Variants, sizes, constants
```

---

## Extraction Checklist

When analyzing a source component, extract:

### 1. Props Interface
```typescript
// From source: What props does it accept?
interface SourceProps {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  // ...
}
```

### 2. Variant Styles
```typescript
// From source: How does each variant look?
const variants = {
  primary: 'bg-brand-solid text-white ...',
  secondary: 'bg-primary text-secondary ring-1 ring-primary ...',
}
```

### 3. Size Styles
```typescript
// From source: What are the size presets?
const sizes = {
  sm: 'gap-1 px-3 py-2 text-sm',
  md: 'gap-1.5 px-3.5 py-2.5 text-sm',
  lg: 'gap-1.5 px-4 py-2.5 text-md',
}
```

### 4. State Styles
```typescript
// From source: How does it handle states?
// hover, active, disabled, focus, loading, open, etc.
'hover:bg-primary_hover'
'data-[disabled]:opacity-50'
'data-[pressed]:scale-[0.98]'
```

### 5. Animations
```typescript
// From source: What animates?
'transition-all duration-150 ease-out'
'data-[starting-style]:opacity-0 data-[starting-style]:scale-95'
'motion-reduce:transition-none'
```

### 6. Special Features
- Squircle corners (`corner-squircle`)
- Inner gradients/borders
- Icon handling
- Loading states
- Compound component patterns

---

## Base UI Mapping

| Component Type | Base UI Primitive | Import |
|---------------|-------------------|--------|
| Button | Button.Root | `@base-ui/react/button` |
| Checkbox | Checkbox.Root | `@base-ui/react/checkbox` |
| Dialog/Modal | Dialog.* | `@base-ui/react/dialog` |
| Menu/Dropdown | Menu.* | `@base-ui/react/menu` |
| Popover | Popover.* | `@base-ui/react/popover` |
| Tooltip | Tooltip.* | `@base-ui/react/tooltip` |
| Select | Select.* | `@base-ui/react/select` |
| Switch/Toggle | Switch.Root | `@base-ui/react/switch` |
| Accordion | Accordion.* | `@base-ui/react/accordion` |
| Tabs | Tabs.* | `@base-ui/react/tabs` |
| **No primitive** | Custom implementation | N/A |

Components without Base UI primitives:
- Badge (simple, no behavior)
- Icon (wrapper)
- Skeleton
- Card
- etc.

---

## Data Attributes (Base UI)

Use these for state styling instead of `:hover`, `:disabled`:

```typescript
// States
'data-[disabled]:opacity-50'
'data-[pressed]:scale-[0.98]'
'data-[open]:rotate-180'
'data-[focus-visible]:ring-2'
'data-[highlighted]:bg-primary-subtle'
'data-[checked]:bg-primary'

// Animation
'data-[starting-style]:opacity-0'    // Enter from
'data-[ending-style]:opacity-0'      // Exit to
```

---

## Implementation Template

```tsx
'use client'

import { forwardRef } from 'react'
import { ComponentName as BaseComponent } from '@base-ui/react/component-name'
import { cn } from '@/lib/utils'

import type { ComponentNameProps } from './types'
import { commonStyles, variantStyles, sizeStyles } from './config'

export const ComponentName = forwardRef<HTMLElement, ComponentNameProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    return (
      <BaseComponent.Root
        ref={ref}
        className={cn(
          commonStyles,
          sizeStyles[size],
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
      </BaseComponent.Root>
    )
  }
)

ComponentName.displayName = 'ComponentName'
```

---

## Styling Requirements

### Must Have
- [ ] Semantic color tokens only (`text-primary`, NOT `text-gray-900`)
- [ ] motion-reduce support on all animations
- [ ] All variants from source preserved
- [ ] All sizes from source preserved
- [ ] Focus visible ring
- [ ] Disabled state styling

### Nice to Have
- [ ] Squircle corners where applicable
- [ ] Inner gradient borders (skeumorphic style)
- [ ] Subtle shadows

---

## Verification Steps

After implementing, verify in playground:

1. **Visual Comparison**
   - Open legacy component in one tab
   - Open prod component in another
   - Compare side-by-side

2. **Variant Check**
   - Render all variants
   - Compare colors, spacing, typography

3. **State Check**
   - Hover
   - Active/Pressed
   - Disabled
   - Focus (keyboard)
   - Loading (if applicable)

4. **Animation Check**
   - Entry/exit animations
   - Micro-interactions
   - motion-reduce: animations disabled

5. **Responsive Check**
   - Mobile breakpoint
   - Desktop breakpoint

---

## Loop Commands

Use these during the migration loop:

```bash
# Start migration for a component
/migrate [component-path]

# Examples:
/migrate untitled-ui/base/buttons/button.tsx
/migrate custom/base/skeleton/index.tsx
/migrate custom/navigation/core/payva-nav-item.tsx
```

---

## After Each Migration

1. Update `MIGRATION.md`:
   - Move component from "WIP" to "Ready" (if approved)
   - Add entry to Migration Log

2. Update `INDEX.md`:
   - Add to available components list (if ready)

3. Update playground:
   - Ensure component is visible in prod design system gallery

---

## Example Migration Session

```
User: /migrate untitled-ui/base/buttons/button.tsx

Claude:
1. Reading source component...
   - Found variants: primary, secondary, tertiary, link-gray, link-color,
     primary-destructive, secondary-destructive, tertiary-destructive, link-destructive
   - Found sizes: sm, md, lg, xl
   - Found features: loading state, icon support, squircle corners

2. Mapping to Base UI...
   - Using: @base-ui/react/button

3. Creating prod/base/button/...
   - types.ts: [created]
   - config.ts: [created]
   - button.tsx: [created]
   - index.ts: [created]

4. Open in playground to verify:
   http://localhost:3001/playground/ui/gallery/prod-design-system

User: The secondary variant is missing the ring border

Claude:
5. Fixing secondary variant...
   - Added: ring-1 ring-inset ring-primary

6. Please verify again.

User: Looks good, approved.

Claude:
7. Updating MIGRATION.md...
8. Button migration complete.

9. Next component?
```

---

## Quick Reference

### File Locations
```
Source:      front-end/src/modules/design-system/v2/components/ui/[custom|untitled-ui]/...
Target:      front-end/src/modules/design-system/v2/components/ui/prod/base/[component]/
Docs:        front-end/src/modules/design-system/v2/components/ui/prod/docs/
Playground:  /playground/ui/gallery/prod-design-system
```

### Import Patterns
```typescript
// Base UI primitive
import { Button } from '@base-ui/react/button'

// Prod component (after migration)
import { Button } from '@/modules/design-system/v2/components/ui/prod/base/button'
```

---

*Use `/migrate [path]` to start a migration loop.*

# Coding Conventions

> Standards for all components in the prod/ design system.

---

## File Structure

### Component Directory

```
prod/base/button/
├── index.ts              # Public exports only
├── button.tsx            # Main component
├── types.ts              # TypeScript types
├── config.ts             # Variants, presets, constants
└── README.md             # Usage docs (optional for simple components)
```

### Complex Component Directory

```
prod/features/display-card/
├── index.ts              # Public exports
├── display-card.tsx      # Main component
├── display-card-metric.tsx  # Sub-component
├── types.ts              # All types
├── presets.ts            # Preset configurations
├── hooks/                # Component-specific hooks
│   └── use-display-card.ts
└── README.md             # Required for features
```

---

## Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Files | kebab-case | `display-card.tsx` |
| Directories | kebab-case | `display-card/` |
| Components | PascalCase | `DisplayCard` |
| Props interfaces | PascalCase + Props | `DisplayCardProps` |
| Hooks | camelCase, use prefix | `useDisplayCard` |
| Constants | SCREAMING_SNAKE | `DEFAULT_SIZE` |
| Config objects | camelCase | `buttonVariants` |

---

## TypeScript

### Props Interface

```typescript
// types.ts
export interface ButtonProps {
  /** Button visual variant */
  variant?: 'primary' | 'secondary' | 'ghost'
  /** Button size */
  size?: 'sm' | 'md' | 'lg'
  /** Disabled state */
  disabled?: boolean
  /** Click handler */
  onClick?: () => void
  /** Button content */
  children: React.ReactNode
}
```

### Component Definition

```typescript
// button.tsx
import { forwardRef } from 'react'
import type { ButtonProps } from './types'

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button ref={ref} {...props}>
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
```

### Exports

```typescript
// index.ts - Named exports only
export { Button } from './button'
export type { ButtonProps } from './types'

// NEVER use default exports
```

---

## Styling

### Tailwind Classes

Use `cn()` helper for conditional classes:

```typescript
import { cn } from '@/lib/utils'

<button
  className={cn(
    // Base styles
    'inline-flex items-center justify-center',
    'rounded-lg font-medium',
    // Variant styles
    variant === 'primary' && 'bg-primary text-on-primary',
    variant === 'secondary' && 'bg-secondary text-on-secondary',
    // Size styles
    size === 'sm' && 'px-3 py-1.5 text-sm',
    size === 'md' && 'px-4 py-2 text-sm',
    size === 'lg' && 'px-6 py-3 text-base',
    // State styles
    'disabled:opacity-50 disabled:cursor-not-allowed',
    // Custom classes
    className
  )}
/>
```

### Semantic Colors Only

```typescript
// CORRECT
'text-primary'
'bg-primary-subtle'
'border-primary'
'text-fg-primary'
'text-fg-secondary'

// INCORRECT
'text-gray-900'
'bg-purple-50'
'border-[var(--color-primary)]'
```

### Animation

```typescript
// Always include motion-reduce
className={cn(
  'transition-all duration-200 ease-out',
  'hover:scale-105',
  'motion-reduce:transition-none motion-reduce:hover:scale-100'
)}
```

### Transform & Opacity Only

For performance, animate only:
- `transform` (translate, scale, rotate)
- `opacity`

```typescript
// CORRECT
'translate-x-0 opacity-100 transition-transform'

// AVOID
'transition-[height]'  // Layout shift
'transition-colors'    // Triggers paint
```

---

## Base UI Integration

### Standard Pattern

```tsx
import { Button as BaseButton } from '@base-ui/react/button'

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, className, children, ...props }, ref) => {
    return (
      <BaseButton.Root
        ref={ref}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center',
          // Data attribute states
          'data-[disabled]:opacity-50',
          'data-[pressed]:scale-95',
          'data-[focus-visible]:ring-2 data-[focus-visible]:ring-primary',
          // Variants
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </BaseButton.Root>
    )
  }
)
```

### Common Data Attributes

| Attribute | When Applied |
|-----------|--------------|
| `data-disabled` | Component is disabled |
| `data-pressed` | Button/toggle is pressed |
| `data-open` | Popover/menu is open |
| `data-closed` | Popover/menu is closed |
| `data-highlighted` | Menu item is highlighted |
| `data-checked` | Checkbox/radio is checked |
| `data-focus-visible` | Keyboard focus |

---

## Icons

### Always Use HugeIcon Wrapper

```typescript
import Cancel01Icon from '@hugeicons-pro/core-stroke-rounded/Cancel01Icon'
import { HugeIcon } from '@/modules/design-system/v2/components/ui/prod/base/icon'

// Usage
<HugeIcon
  icon={Cancel01Icon}
  size={20}
  strokeWidth={1.5}
  className="text-fg-secondary"
/>
```

### Size Guidelines

| Context | Size |
|---------|------|
| Inline, small | 16 |
| Default | 20 |
| Buttons, nav | 24 |
| Featured/large | 28-32 |

### Never Use

```typescript
// FORBIDDEN
import { X01 } from '@untitledui-pro/icons/line'
import { Icon } from 'lucide-react'
```

---

## Component Composition

### Props Over Children (Simple)

```tsx
// For simple content
<Badge variant="success" label="Active" />
```

### Children (Complex)

```tsx
// For complex/custom content
<Button>
  <HugeIcon icon={PlusIcon} size={16} />
  <span>Add Item</span>
</Button>
```

### Compound Components (Very Complex)

```tsx
// For maximum flexibility
<Table.Root data={data}>
  <Table.Header />
  <Table.Body>
    {row => <Table.Row>{...}</Table.Row>}
  </Table.Body>
</Table.Root>
```

---

## Documentation

### JSDoc for Props

```typescript
export interface ButtonProps {
  /**
   * Visual style variant
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'ghost'

  /**
   * Size preset
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'
}
```

### README.md Template

```markdown
# Component Name

Brief description.

## Usage

\`\`\`tsx
import { Component } from '@/modules/design-system/v2/components/ui/prod/category/component'

<Component prop="value" />
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | string | 'primary' | Visual variant |

## Examples

### Basic
\`\`\`tsx
<Component />
\`\`\`

### With Options
\`\`\`tsx
<Component variant="secondary" size="lg" />
\`\`\`
```

---

## Testing Checklist

Before committing:

- [ ] TypeScript compiles without errors
- [ ] Component renders in playground
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] Motion-reduce respected
- [ ] No console errors
- [ ] Semantic colors used (no raw values)

---

## Anti-Patterns

### Avoid

```typescript
// Inline styles
style={{ color: 'red' }}

// Magic numbers
className="w-[347px]"

// Direct DOM manipulation
document.querySelector('.button').click()

// Non-semantic colors
className="text-gray-900"

// Default exports
export default Button

// Missing displayName
const Button = () => {}  // No displayName
```

### Prefer

```typescript
// Tailwind classes
className="text-error"

// Design tokens
className="w-full max-w-md"

// React refs
const buttonRef = useRef()
buttonRef.current?.click()

// Semantic colors
className="text-fg-primary"

// Named exports
export { Button }

// With displayName
Button.displayName = 'Button'
```

---

*Follow these conventions for consistency across all prod/ components.*

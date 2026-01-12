# Base UI Primitives Reference

> Mapping Base UI components to PAYVA prod/ components.
> Reference: [@base-ui/react](https://base-ui.com)

---

## Package Info

```bash
npm i @base-ui/react
```

```typescript
// Import pattern
import { Dialog } from '@base-ui/react/dialog'
import { Menu } from '@base-ui/react/menu'
import { Button } from '@base-ui/react/button'
```

---

## Component Mapping

### Form Controls

| Base UI | PAYVA prod/ | Status | Notes |
|---------|-------------|--------|-------|
| `Button` | `prod/base/button` | Pending | Primary action buttons |
| `Checkbox` | `prod/base/checkbox` | Pending | With indeterminate state |
| `Input` | `prod/base/input` | Pending | Text input |
| `Number Field` | `prod/base/number-field` | Pending | Numeric input with increment |
| `Radio` | `prod/base/radio` | Pending | Radio button group |
| `Select` | `prod/base/select` | Pending | Dropdown select |
| `Slider` | `prod/base/slider` | Pending | Range slider |
| `Switch` | `prod/base/switch` | Pending | On/off toggle |
| `Toggle` | `prod/base/toggle` | Pending | Two-state button |
| `Toggle Group` | `prod/base/toggle-group` | Pending | Button group |
| `Field` | (integrated) | - | Labeling/validation |
| `Form` | (integrated) | - | Form handling |

### Layout & Navigation

| Base UI | PAYVA prod/ | Status | Notes |
|---------|-------------|--------|-------|
| `Accordion` | `prod/base/accordion` | Pending | With animated line |
| `Collapsible` | `prod/base/collapsible` | Pending | Expandable panel |
| `Navigation Menu` | TBD | Pending | Site navigation |
| `Scroll Area` | TBD | Pending | Custom scrollbars |
| `Separator` | `prod/base/separator` | Pending | Divider |
| `Tabs` | `prod/base/tabs` | Pending | Tab panels |
| `Toolbar` | `prod/base/toolbar` | Pending | Button groups |

### Dialogs & Popups

| Base UI | PAYVA prod/ | Status | Notes |
|---------|-------------|--------|-------|
| `Alert Dialog` | `prod/base/alert-dialog` | Pending | Confirmation dialogs |
| `Dialog` | `prod/base/dialog` | Pending | Modal dialogs |
| `Popover` | `prod/base/popover` | Pending | Anchored popup |
| `Preview Card` | TBD | Pending | Link hover preview |
| `Tooltip` | `prod/base/tooltip` | Pending | Hover hints |
| `Toast` | `prod/base/toast` | Pending | Notifications |

### Menus

| Base UI | PAYVA prod/ | Status | Notes |
|---------|-------------|--------|-------|
| `Menu` | `prod/base/menu` | Pending | Dropdown menu |
| `Menubar` | TBD | Pending | App menubar |
| `Context Menu` | TBD | Pending | Right-click menu |

### Selection & Search

| Base UI | PAYVA prod/ | Status | Notes |
|---------|-------------|--------|-------|
| `Autocomplete` | TBD | Pending | Search with suggestions |
| `Combobox` | TBD | Pending | Input + select combo |
| `Select` | `prod/base/select` | Pending | (see Form Controls) |

### Display

| Base UI | PAYVA prod/ | Status | Notes |
|---------|-------------|--------|-------|
| `Avatar` | `prod/base/avatar` | Pending | User avatar |
| `Meter` | TBD | Pending | Value gauge |
| `Progress` | `prod/base/progress` | Pending | Loading/progress |

### Utilities

| Base UI | Usage | Notes |
|---------|-------|-------|
| `Portal` | Render outside DOM tree | For modals, menus |
| `Direction Provider` | RTL support | Wrap app root |

---

## Common Data Attributes

Base UI uses data attributes for state styling:

```css
/* Open/closed state */
[data-open] { }
[data-closed] { }

/* Disabled state */
[data-disabled] { }

/* Focus state */
[data-focus-visible] { }

/* Pressed state (buttons) */
[data-pressed] { }

/* Highlighted state (menus) */
[data-highlighted] { }

/* Checked state (checkboxes, radios) */
[data-checked] { }
[data-unchecked] { }

/* Animation states */
[data-starting-style] { }
[data-ending-style] { }
```

### Tailwind Usage

```tsx
className={cn(
  'data-[disabled]:opacity-50',
  'data-[pressed]:scale-95',
  'data-[open]:rotate-180',
  'data-[focus-visible]:ring-2',
)}
```

---

## CSS Variables

Base UI provides CSS variables for positioning:

```css
--anchor-width      /* Trigger element width */
--anchor-height     /* Trigger element height */
--available-width   /* Available viewport width */
--available-height  /* Available viewport height */
--transform-origin  /* Animation anchor point */
```

### Usage in Tailwind

```tsx
// Match popover width to trigger
className="w-[var(--anchor-width)]"

// Dynamic transform origin
style={{ transformOrigin: 'var(--transform-origin)' }}
```

---

## Integration Patterns

### Button

```tsx
import { Button as BaseButton } from '@base-ui/react/button'

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => (
    <BaseButton.Root
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-medium',
        'transition-all duration-150',
        'data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed',
        'data-[pressed]:scale-[0.98]',
        'data-[focus-visible]:ring-2 data-[focus-visible]:ring-primary',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </BaseButton.Root>
  )
)
```

### Checkbox

```tsx
import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox'

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ checked, indeterminate, onChange, label, ...props }, ref) => (
    <Field.Root className="flex items-center gap-2">
      <BaseCheckbox.Root
        ref={ref}
        checked={indeterminate ? 'indeterminate' : checked}
        onCheckedChange={onChange}
        className={cn(
          'size-5 rounded border-2 border-primary',
          'data-[checked]:bg-primary data-[checked]:border-primary',
          'data-[focus-visible]:ring-2',
        )}
        {...props}
      >
        <BaseCheckbox.Indicator className="text-on-primary">
          {indeterminate ? <MinusIcon /> : <CheckIcon />}
        </BaseCheckbox.Indicator>
      </BaseCheckbox.Root>
      {label && <Field.Label>{label}</Field.Label>}
    </Field.Root>
  )
)
```

### Accordion

```tsx
import { Accordion as BaseAccordion } from '@base-ui/react/accordion'

export const Accordion = ({ items, ...props }) => (
  <BaseAccordion.Root className="space-y-2" {...props}>
    {items.map(item => (
      <BaseAccordion.Item key={item.id} value={item.id}>
        <BaseAccordion.Header>
          <BaseAccordion.Trigger className={cn(
            'flex w-full items-center justify-between p-4',
            'data-[open]:font-medium',
          )}>
            {item.title}
            <ChevronIcon className="data-[open]:rotate-180 transition-transform" />
          </BaseAccordion.Trigger>
        </BaseAccordion.Header>
        <BaseAccordion.Panel className="px-4 pb-4">
          {item.content}
        </BaseAccordion.Panel>
      </BaseAccordion.Item>
    ))}
  </BaseAccordion.Root>
)
```

### Menu

```tsx
import { Menu } from '@base-ui/react/menu'

export const Dropdown = ({ trigger, items }) => (
  <Menu.Root>
    <Menu.Trigger className="...">{trigger}</Menu.Trigger>
    <Menu.Portal>
      <Menu.Positioner>
        <Menu.Popup className={cn(
          'bg-primary rounded-xl border border-primary shadow-lg',
          'data-[starting-style]:opacity-0 data-[starting-style]:scale-95',
          'data-[ending-style]:opacity-0 data-[ending-style]:scale-95',
          'transition-all duration-150',
        )}>
          {items.map(item => (
            <Menu.Item
              key={item.id}
              className={cn(
                'px-3 py-2 cursor-pointer',
                'data-[highlighted]:bg-primary-subtle',
              )}
              onClick={item.onClick}
            >
              {item.label}
            </Menu.Item>
          ))}
        </Menu.Popup>
      </Menu.Positioner>
    </Menu.Portal>
  </Menu.Root>
)
```

### Tooltip

```tsx
import { Tooltip } from '@base-ui/react/tooltip'

export const InfoTooltip = ({ content, children }) => (
  <Tooltip.Provider>
    <Tooltip.Root>
      <Tooltip.Trigger className="cursor-help">
        {children}
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Positioner>
          <Tooltip.Popup className={cn(
            'bg-inverse text-on-inverse px-2 py-1 rounded text-sm',
            'data-[starting-style]:opacity-0',
            'transition-opacity duration-150',
          )}>
            {content}
            <Tooltip.Arrow className="fill-inverse" />
          </Tooltip.Popup>
        </Tooltip.Positioner>
      </Tooltip.Portal>
    </Tooltip.Root>
  </Tooltip.Provider>
)
```

---

## Animation with Base UI

### Entry/Exit Animations

Base UI provides `data-starting-style` and `data-ending-style`:

```tsx
className={cn(
  // Normal state
  'opacity-100 scale-100',
  // Entry animation (from)
  'data-[starting-style]:opacity-0 data-[starting-style]:scale-95',
  // Exit animation (to)
  'data-[ending-style]:opacity-0 data-[ending-style]:scale-95',
  // Transition
  'transition-all duration-200 ease-out',
)}
```

### Transform Origin

For menus/popovers that flip position:

```tsx
<Menu.Popup
  style={{ transformOrigin: 'var(--transform-origin)' }}
  className="..."
/>
```

---

## Components NOT in Base UI

These need custom implementations:

| Component | Notes |
|-----------|-------|
| Badge | Simple, no Base UI primitive |
| Card | Container, no primitive needed |
| Skeleton | Custom loading state |
| Icon | HugeIcon wrapper |
| Data Table | Complex, custom implementation |
| Filter Chip | Custom expanding animation |

---

## Migration Priority

When migrating a component:

1. Check if Base UI has a primitive
2. If yes: wrap Base UI with PAYVA styling
3. If no: build custom with same patterns (data attributes, etc.)

---

*Reference the [Base UI docs](https://base-ui.com) for complete API details.*

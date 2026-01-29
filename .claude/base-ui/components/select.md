# Select

A high-quality, unstyled React select component for choosing a predefined value in a dropdown menu.

## Overview

The Select component supports both single and multiple selections with customizable styling.

> **Note**: Prefer Combobox for large lists. Select is not filterable, aside from basic keyboard typeahead functionality.

## Basic Usage

```tsx
import { Select } from '@base-ui/react/select';

<Select.Root>
  <Select.Trigger>
    <Select.Value placeholder="Select an option" />
  </Select.Trigger>
  <Select.Portal>
    <Select.Positioner>
      <Select.Popup>
        <Select.Item value="option1">
          <Select.ItemText>Option 1</Select.ItemText>
          <Select.ItemIndicator />
        </Select.Item>
        <Select.Item value="option2">
          <Select.ItemText>Option 2</Select.ItemText>
          <Select.ItemIndicator />
        </Select.Item>
      </Select.Popup>
    </Select.Positioner>
  </Select.Portal>
</Select.Root>
```

## Core Components

| Component | Purpose |
|-----------|---------|
| `Select.Root` | Container managing state |
| `Select.Trigger` | Button that opens dropdown |
| `Select.Value` | Displays selected value |
| `Select.Portal` | Renders popup in portal |
| `Select.Positioner` | Handles positioning |
| `Select.Popup` | Dropdown container |
| `Select.Item` | Selectable option |
| `Select.ItemText` | Item label |
| `Select.ItemIndicator` | Selected state indicator |
| `Select.Group` | Groups related items |
| `Select.GroupLabel` | Label for group |
| `Select.Separator` | Visual divider |
| `Select.ScrollArrow` | Scroll indicators |

## Key Props

### Root
| Prop | Purpose |
|------|---------|
| `value` / `defaultValue` | Control selected value |
| `onValueChange` | Selection change callback |
| `items` | Data structure for label/value pairs |
| `multiple` | Enable multi-select |
| `disabled` / `readOnly` / `required` | Form control states |

### Positioner
| Prop | Default | Purpose |
|------|---------|---------|
| `alignItemWithTrigger` | true | Overlaps trigger to align selected item |
| `sideOffset` | 0 | Distance from anchor |
| `side` / `align` | - | Positioning preferences |

## Multiple Selection

```tsx
<Select.Root multiple defaultValue={['option1']}>
  <Select.Trigger>
    <Select.Value placeholder="Select options" />
  </Select.Trigger>
  <Select.Portal>
    <Select.Positioner>
      <Select.Popup>
        <Select.Item value="option1">Option 1</Select.Item>
        <Select.Item value="option2">Option 2</Select.Item>
      </Select.Popup>
    </Select.Positioner>
  </Select.Portal>
</Select.Root>
```

## Custom Value Formatting

```tsx
<Select.Root
  items={[
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
  ]}
>
  <Select.Trigger>
    <Select.Value>
      {(value, items) => items.find(i => i.value === value)?.label}
    </Select.Value>
  </Select.Trigger>
  ...
</Select.Root>
```

## Grouped Items

```tsx
<Select.Popup>
  <Select.Group>
    <Select.GroupLabel>Fruits</Select.GroupLabel>
    <Select.Item value="apple">Apple</Select.Item>
    <Select.Item value="banana">Banana</Select.Item>
  </Select.Group>
  <Select.Separator />
  <Select.Group>
    <Select.GroupLabel>Vegetables</Select.GroupLabel>
    <Select.Item value="carrot">Carrot</Select.Item>
  </Select.Group>
</Select.Popup>
```

## Data Attributes

- `data-popup-open`: Trigger when popup is open
- `data-selected`: Selected item
- `data-highlighted`: Focused item
- `data-disabled`: Disabled state

## CSS Variables

- `--anchor-width`, `--anchor-height`
- `--available-height`
- `--transform-origin`

## Accessibility

The trigger must have a meaningful label. Use `<Field>` to provide a visible text label, or use the `aria-label` attribute.

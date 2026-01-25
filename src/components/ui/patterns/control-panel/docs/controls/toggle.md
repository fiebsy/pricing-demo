# Toggle Control

Boolean checkbox control for enabling/disabling features.

## Overview

The toggle control renders a checkbox for boolean values. It supports an inline layout variant for compact display.

## Basic Usage

```typescript
const control: ToggleControl = {
  id: 'showLabels',
  type: 'toggle',
  label: 'Show Labels',
  value: true,
}
```

## With Description

```typescript
{
  id: 'animations',
  type: 'toggle',
  label: 'Enable Animations',
  description: 'Disable for reduced motion preference',
  value: true,
}
```

## Type Definition

```typescript
interface ToggleControl extends ControlBase {
  type: 'toggle'
  value: boolean
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | Unique identifier |
| `label` | `string` | Yes | Display label |
| `value` | `boolean` | Yes | Current checked state |
| `description` | `string` | No | Helper text |
| `disabled` | `boolean` | No | Disable control |

## Common Patterns

### Feature Flags

```typescript
const features: Control[] = [
  {
    id: 'darkMode',
    type: 'toggle',
    label: 'Dark Mode',
    value: false,
  },
  {
    id: 'compactView',
    type: 'toggle',
    label: 'Compact View',
    value: true,
  },
  {
    id: 'showThumbnails',
    type: 'toggle',
    label: 'Show Thumbnails',
    value: true,
  },
]
```

### With Conditional Controls

Toggles often gate visibility of other controls:

```tsx
const [showBorder, setShowBorder] = useState(true)

const config: PanelConfig = {
  sections: [
    {
      id: 'appearance',
      label: 'Appearance',
      title: 'Appearance Settings',
      groups: [
        {
          controls: [
            {
              id: 'showBorder',
              type: 'toggle',
              label: 'Show Border',
              value: showBorder,
            },
            // Only show if border enabled
            ...(showBorder ? [{
              id: 'borderWidth',
              type: 'slider',
              label: 'Border Width',
              value: 1,
              min: 1,
              max: 4,
              step: 1,
              formatLabel: (v) => `${v}px`,
            }] : []),
          ],
        },
      ],
    },
  ],
}
```

### Multiple in a Group

```typescript
{
  title: 'Display Options',
  columns: 2,
  controls: [
    { id: 'showHeader', type: 'toggle', label: 'Show Header', value: true },
    { id: 'showFooter', type: 'toggle', label: 'Show Footer', value: true },
    { id: 'showSidebar', type: 'toggle', label: 'Show Sidebar', value: false },
    { id: 'showSearch', type: 'toggle', label: 'Show Search', value: true },
  ],
}
```

---

## Related

- [Slider Control](./slider.md) - Numeric ranges
- [Select Control](./select.md) - Multiple choice
- [Types](../api/types.md) - Full type definitions

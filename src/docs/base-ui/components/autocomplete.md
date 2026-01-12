# Autocomplete

A high-quality, unstyled React autocomplete component that renders an input with a list of filtered options.

## Overview

The Autocomplete provides an input with a filterable list where users can enter custom text and suggestions are optional.

> **Note**: Use Combobox instead if selection must be from predefined options only.

## Basic Usage

```tsx
import { Autocomplete } from '@base-ui/react/autocomplete';

const items = ['Apple', 'Banana', 'Orange'];

<Autocomplete.Root items={items}>
  <Autocomplete.Input placeholder="Search..." />
  <Autocomplete.Portal>
    <Autocomplete.Positioner>
      <Autocomplete.Popup>
        <Autocomplete.List>
          {items.map((item) => (
            <Autocomplete.Item key={item} value={item}>
              {item}
            </Autocomplete.Item>
          ))}
        </Autocomplete.List>
        <Autocomplete.Empty>No results found</Autocomplete.Empty>
      </Autocomplete.Popup>
    </Autocomplete.Positioner>
  </Autocomplete.Portal>
</Autocomplete.Root>
```

## Component Anatomy

```
Root
├── Input
├── Trigger (optional)
└── Portal
    └── Positioner
        └── Popup
            ├── Status (optional)
            ├── Empty (optional)
            └── List
                ├── Item(s)
                ├── Group
                │   ├── GroupLabel
                │   └── Item(s)
                └── Row (for grid mode)
```

## Key Props (Root)

| Prop | Type | Purpose |
|------|------|---------|
| `items` | array | Array of options |
| `value` / `onValueChange` | - | Controlled input state |
| `open` / `onOpenChange` | - | Controlled popup state |
| `mode` | string | 'list', 'both', 'inline', or 'none' |
| `limit` | number | Maximum visible results |
| `autoHighlight` | boolean | Auto-highlight first match |
| `filter` | function \| null | Custom matching or external filtering |

## useFilter Hook

```tsx
const { filter, contains, startsWith, endsWith } = Autocomplete.useFilter();

<Autocomplete.Root filter={contains}>
  ...
</Autocomplete.Root>
```

## Async Loading

```tsx
const [items, setItems] = React.useState([]);
const [loading, setLoading] = React.useState(false);

async function handleInputChange(value) {
  setLoading(true);
  const results = await fetchResults(value);
  setItems(results);
  setLoading(false);
}

<Autocomplete.Root items={items} filter={null}>
  <Autocomplete.Input onValueChange={handleInputChange} />
  <Autocomplete.Portal>
    <Autocomplete.Positioner>
      <Autocomplete.Popup>
        <Autocomplete.Status>
          {loading ? 'Loading...' : null}
        </Autocomplete.Status>
        <Autocomplete.List>
          {items.map((item) => (
            <Autocomplete.Item key={item.id} value={item}>
              {item.label}
            </Autocomplete.Item>
          ))}
        </Autocomplete.List>
        <Autocomplete.Empty>No results</Autocomplete.Empty>
      </Autocomplete.Popup>
    </Autocomplete.Positioner>
  </Autocomplete.Portal>
</Autocomplete.Root>
```

## Grouped Items

```tsx
<Autocomplete.List>
  <Autocomplete.Group>
    <Autocomplete.GroupLabel>Fruits</Autocomplete.GroupLabel>
    <Autocomplete.Item value="apple">Apple</Autocomplete.Item>
    <Autocomplete.Item value="banana">Banana</Autocomplete.Item>
  </Autocomplete.Group>
</Autocomplete.List>
```

## Inline Mode

```tsx
<Autocomplete.Root mode="both">
  <Autocomplete.Input />
  ...
</Autocomplete.Root>
```

## Data Attributes

- `data-highlighted`: Highlighted item
- `data-empty`: No results
- `data-popup-open`: Popup is open

## CSS Variables

- `--anchor-width`: Input width
- `--available-height`: Viewport space
- `--transform-origin`: Animation anchor

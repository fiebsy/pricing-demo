# Combobox

A high-quality, unstyled React combobox component that is an input with a filterable list of predefined options to choose from.

## Overview

The Combobox combines an input field with a filterable list of predefined options, supporting single and multiple selections.

> **Note**: Avoid for simple search widgets. Use Autocomplete instead for free-form text input.

## Basic Usage

```tsx
import { Combobox } from '@base-ui/react/combobox';

<Combobox.Root>
  <Combobox.Trigger>
    <Combobox.Input placeholder="Select..." />
  </Combobox.Trigger>
  <Combobox.Portal>
    <Combobox.Positioner>
      <Combobox.List>
        <Combobox.Item value="option1">
          <Combobox.ItemText>Option 1</Combobox.ItemText>
          <Combobox.ItemIndicator />
        </Combobox.Item>
        <Combobox.Item value="option2">
          <Combobox.ItemText>Option 2</Combobox.ItemText>
          <Combobox.ItemIndicator />
        </Combobox.Item>
      </Combobox.List>
    </Combobox.Positioner>
  </Combobox.Portal>
</Combobox.Root>
```

## Core Components

| Component | Purpose |
|-----------|---------|
| `Combobox.Root` | State management container |
| `Combobox.Trigger` | Opens the dropdown |
| `Combobox.Input` | Text field for filtering |
| `Combobox.Clear` | Clears selection |
| `Combobox.Portal` | Renders popup in portal |
| `Combobox.Positioner` | Handles positioning |
| `Combobox.List` | Item container |
| `Combobox.Item` | Selectable option |
| `Combobox.ItemText` | Item label |
| `Combobox.ItemIndicator` | Selected state indicator |
| `Combobox.Group` | Groups related items |
| `Combobox.GroupLabel` | Group heading |
| `Combobox.Chips` | Selected items (multiple mode) |

## Key Features

- Text input for searching/filtering items
- Keyboard navigation (arrow keys, Enter, Escape)
- Grouped items with section headers
- Async item loading from remote sources
- Creatable items (user can add new options)
- Virtualization for large datasets (10,000+ items)

## Multiple Selection

```tsx
<Combobox.Root multiple defaultValue={['option1']}>
  <Combobox.Trigger>
    <Combobox.Chips>
      {(chips) =>
        chips.map((chip) => (
          <Combobox.Chip key={chip.value} value={chip.value}>
            {chip.label}
            <Combobox.ChipDelete />
          </Combobox.Chip>
        ))
      }
    </Combobox.Chips>
    <Combobox.Input />
  </Combobox.Trigger>
  <Combobox.Portal>
    <Combobox.Positioner>
      <Combobox.List>
        <Combobox.Item value="option1">Option 1</Combobox.Item>
        <Combobox.Item value="option2">Option 2</Combobox.Item>
      </Combobox.List>
    </Combobox.Positioner>
  </Combobox.Portal>
</Combobox.Root>
```

## Filtering

Use the `useFilter` hook for custom filtering:

```tsx
const { filter } = Combobox.useFilter();

<Combobox.Root filter={filter}>
  ...
</Combobox.Root>
```

Pass `filter={null}` for external filtering control.

## Grouped Items

```tsx
<Combobox.List>
  <Combobox.Group>
    <Combobox.GroupLabel>Fruits</Combobox.GroupLabel>
    <Combobox.Item value="apple">Apple</Combobox.Item>
    <Combobox.Item value="banana">Banana</Combobox.Item>
  </Combobox.Group>
  <Combobox.Group>
    <Combobox.GroupLabel>Vegetables</Combobox.GroupLabel>
    <Combobox.Item value="carrot">Carrot</Combobox.Item>
  </Combobox.Group>
</Combobox.List>
```

## Accessibility

Form controls must have an accessible name. Use `<Field>` for labels and descriptions.

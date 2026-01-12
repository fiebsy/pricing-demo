# Accordion

A high-quality, unstyled React accordion component that displays a set of collapsible panels with headings.

## Overview

Base UI provides an unstyled React accordion component featuring collapsible panels with headings. This high-quality component allows developers to customize styling while maintaining accessibility and functionality.

## Component Structure

The accordion uses a compound component pattern with five main parts:

```tsx
import { Accordion } from '@base-ui/react/accordion';

<Accordion.Root>
  <Accordion.Item>
    <Accordion.Header>
      <Accordion.Trigger>Section 1</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Panel>Content for section 1</Accordion.Panel>
  </Accordion.Item>
  <Accordion.Item>
    <Accordion.Header>
      <Accordion.Trigger>Section 2</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Panel>Content for section 2</Accordion.Panel>
  </Accordion.Item>
</Accordion.Root>
```

- **Root**: Container grouping all accordion elements
- **Item**: Wrapper pairing a header with its corresponding panel
- **Header**: Heading label (renders as `<h3>`)
- **Trigger**: Button controlling panel expansion (renders as `<button>`)
- **Panel**: Collapsible content area

## Key Features

**Single vs. Multiple Panels**: By default, only one panel opens at a time. Use the `multiple` prop to allow simultaneous expansion of multiple sections.

**Keyboard Navigation**: The accordion supports arrow key navigation with focus looping, allowing users to cycle through items using vertical or horizontal orientation settings.

## Root Props

| Prop | Purpose |
|------|---------|
| `multiple` | Enables opening multiple panels simultaneously |
| `defaultValue` / `value` | Controls initial or current open state |
| `onValueChange` | Callback when panels open/close |
| `loopFocus` | Cycles keyboard focus (default: true) |
| `orientation` | Vertical (default) or horizontal layout |
| `hiddenUntilFound` | Supports browser search discovery |

## Data Attributes for Styling

Components expose state through data attributes:
- `data-open`: Panel is expanded
- `data-panel-open`: Trigger's panel is open
- `data-disabled`: Item is disabled
- `data-starting-style` / `data-ending-style`: Animation states

## CSS Variables

Panels support custom height/width via `--accordion-panel-height` and `--accordion-panel-width` for smooth animations.

## Example with Animation

```css
.Panel {
  height: 0;
  overflow: hidden;
  transition: height 300ms ease;
}

.Panel[data-open] {
  height: var(--accordion-panel-height);
}
```

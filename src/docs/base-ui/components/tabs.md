# Tabs

A high-quality, unstyled React tabs component for toggling between related panels on the same page.

## Overview

The Tabs component provides accessible tab navigation for switching between content panels.

## Basic Usage

```tsx
import { Tabs } from '@base-ui/react/tabs';

<Tabs.Root defaultValue="tab1">
  <Tabs.List>
    <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
    <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
    <Tabs.Tab value="tab3">Tab 3</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="tab1">Content for Tab 1</Tabs.Panel>
  <Tabs.Panel value="tab2">Content for Tab 2</Tabs.Panel>
  <Tabs.Panel value="tab3">Content for Tab 3</Tabs.Panel>
</Tabs.Root>
```

## Core Components

| Component | Purpose |
|-----------|---------|
| `Tabs.Root` | Container managing active state |
| `Tabs.List` | Wrapper for tab buttons |
| `Tabs.Tab` | Individual tab button |
| `Tabs.Indicator` | Visual active tab indicator |
| `Tabs.Panel` | Content area for each tab |

## Key Props

### Root
| Prop | Purpose |
|------|---------|
| `defaultValue` / `value` | Control active tab |
| `onValueChange` | Tab change callback |
| `orientation` | 'horizontal' or 'vertical' |

### List
| Prop | Default | Purpose |
|------|---------|---------|
| `activateOnFocus` | false | Switch tabs on arrow key navigation |
| `loopFocus` | true | Wrap focus from last to first |

### Tab
| Prop | Purpose |
|------|---------|
| `value` | Unique identifier (required) |
| `disabled` | Disable tab |

### Panel
| Prop | Default | Purpose |
|------|---------|---------|
| `value` | - | Matches corresponding Tab value |
| `keepMounted` | false | Keep hidden panels in DOM |

## With Indicator

```tsx
<Tabs.Root defaultValue="tab1">
  <Tabs.List>
    <Tabs.Indicator />
    <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
    <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
  <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
</Tabs.Root>
```

## Controlled Mode

```tsx
const [value, setValue] = React.useState('tab1');

<Tabs.Root value={value} onValueChange={setValue}>
  <Tabs.List>
    <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
    <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
  <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
</Tabs.Root>
```

## Vertical Orientation

```tsx
<Tabs.Root orientation="vertical" defaultValue="tab1">
  <Tabs.List>
    <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
    <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
  <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
</Tabs.Root>
```

## Data Attributes

- `data-active`: Active tab
- `data-disabled`: Disabled tab
- `data-hidden`: Hidden panel
- `data-orientation`: Layout direction

## CSS Variables (Indicator)

- `--active-tab-width`: Width of active tab
- `--active-tab-height`: Height of active tab
- `--active-tab-left`: Left position of active tab
- `--active-tab-top`: Top position of active tab

## Styling Example

```css
.Indicator {
  position: absolute;
  width: var(--active-tab-width);
  height: 2px;
  left: var(--active-tab-left);
  bottom: 0;
  background: currentColor;
  transition: left 200ms, width 200ms;
}
```

# BiaxialExpand Playground

Comprehensive playground for testing and configuring the BiaxialExpand component.

## Component Location

**Source**: `src/components/ui/core/primitives/biaxial-expand`

## Overview

BiaxialExpand is a composable, slot-based expand system with unified clip-path animations. It supports:

- **TopSlot**: Content that expands upward from the trigger
- **Trigger**: The anchor element (input, button, custom content)
- **BottomSlot**: Content that expands downward from the trigger

## Architecture

```
<BiaxialExpand.Root>
  <BiaxialExpand.TopSlot />      {/* Optional - expands upward */}
  <BiaxialExpand.Backdrop />     {/* Visual layer (background, shadow, shine) */}
  <BiaxialExpand.Content>        {/* Unified clip-path container */}
    <BiaxialExpand.Trigger />    {/* Inside Content for unified animation */}
    <BiaxialExpand.ContentWrapper>
      <BiaxialExpand.BottomSlot />
    </BiaxialExpand.ContentWrapper>
  </BiaxialExpand.Content>
</BiaxialExpand.Root>
```

## Demo Variants

### Command Menu
Full command menu with search input and menu content. Supports optional top filter bar.

### Dashboard Metric
Metric card that expands to show details. Demonstrates the component for data visualization use cases.

### Custom
Placeholder content for testing raw configuration without specific content.

## Presets

| Preset | Description |
|--------|-------------|
| **Default** | Balanced settings for general use |
| **Command Menu** | Full command menu with search + menu content |
| **Command Menu + Filters** | Command menu with top filter bar |
| **Dashboard Metric** | Metric card expansion |
| **Minimal** | Simplified with minimal styling |
| **Filter Dropdown** | Top slot focus with filter bar |

## Configuration Sections

### Layout
- Trigger dimensions (width, height)
- Panel width
- Max heights for top/bottom slots
- Border radius and gaps

### Animation
- Expand/collapse durations
- Content fade timing
- Backdrop animation mode (size vs clip-path)
- Slot container animation offsets
- Expand origins (top, center, bottom)

### Appearance
- Background color
- Border radius semantic token
- Shadow intensity
- Shine effects
- Gradient patterns
- Squircle corners

### Slot Configuration
Each slot (top/bottom) has:
- Enable/disable toggle
- Height mode (fixed, auto, dynamic)
- Animation delay/duration offsets
- Background and border styling
- Inset spacing

## Usage

### Basic Import

```tsx
import { BiaxialExpand } from '@/components/ui/core/primitives/biaxial-expand'
```

### With Configuration

```tsx
const config = {
  layout: {
    triggerWidth: 280,
    triggerHeight: 44,
    panelWidth: 380,
    maxBottomHeight: 340,
    borderRadius: 20,
  },
  animation: {
    duration: 350,
    collapseDuration: 125,
  },
  appearance: {
    borderRadius: '2xl',
    shadow: '2xl',
    shine: 'shine-2-subtle',
  },
  bottomSlot: {
    enabled: true,
    background: 'secondary',
    borderRadius: 14,
    inset: 4,
  },
}

<BiaxialExpand.Root config={config}>
  <BiaxialExpand.Backdrop />
  <BiaxialExpand.Content>
    <BiaxialExpand.Trigger>
      <BiaxialExpand.SearchInput placeholder="Search..." />
    </BiaxialExpand.Trigger>
    <BiaxialExpand.ContentWrapper>
      <BiaxialExpand.BottomSlot>
        <BiaxialExpand.MenuContent groups={commands} />
      </BiaxialExpand.BottomSlot>
    </BiaxialExpand.ContentWrapper>
  </BiaxialExpand.Content>
</BiaxialExpand.Root>
```

## Migration Notes

### From BiaxialExpandV4

The `BiaxialExpandV4` export is deprecated. Update imports:

```diff
- import { BiaxialExpandV4 } from '@/components/ui/features/command-menu'
+ import { BiaxialExpand } from '@/components/ui/core/primitives/biaxial-expand'
```

### From Old Command Menu

Replace old command menu implementations with BiaxialExpand:

```diff
- import { CommandMenu } from '@/components/ui/features/command-menu'
+ import { BiaxialExpand } from '@/components/ui/core/primitives/biaxial-expand'
```

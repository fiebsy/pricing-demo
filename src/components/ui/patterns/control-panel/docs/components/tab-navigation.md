# TabNavigation

Scrollable tab navigation with fade indicators and minimize button.

## Overview

The tab navigation header includes a scrollable tab list, fade indicators for overflow, and a minimize button. Uses React Aria's Tab components for accessibility.

## Imports

```typescript
import {
  ScrollableTabList,
  TabTrigger,
  MinimizeButton,
} from '@/modules/design-system/v2/components/ui/prod/base/control-panel'
```

## Components

### ScrollableTabList

Wrapper with overflow detection and fade indicators.

```tsx
<ScrollableTabList
  activeTabId={activeTab}
  isScrollable={sections.length > 4}
>
  <TabList aria-label="Control sections">
    {/* Tab components */}
  </TabList>
</ScrollableTabList>
```

#### Props

```typescript
interface ScrollableTabListProps {
  children: ReactNode
  activeTabId: string
  isScrollable: boolean
}
```

| Prop | Type | Description |
|------|------|-------------|
| `children` | `ReactNode` | TabList component |
| `activeTabId` | `string` | Currently active tab ID |
| `isScrollable` | `boolean` | Enable scroll behavior |

#### Features

- **Scroll detection**: Updates fade indicators based on scroll position
- **Auto-scroll**: Scrolls active tab into view when it changes
- **Fade indicators**: Left/right gradients when content overflows
- **Resize observer**: Updates on container resize

### TabTrigger

Visual content inside React Aria's Tab component.

```tsx
<Tab id={section.id} className="group cursor-pointer outline-none">
  {({ isSelected }) => (
    <TabTrigger
      label={section.label}
      isSelected={isSelected}
      isScrollable={isScrollable}
    />
  )}
</Tab>
```

#### Props

```typescript
interface TabTriggerProps {
  label: string
  isSelected: boolean
  isScrollable: boolean
}
```

| Prop | Type | Description |
|------|------|-------------|
| `label` | `string` | Tab label text |
| `isSelected` | `boolean` | Whether this tab is active |
| `isScrollable` | `boolean` | Adjusts sizing for scroll mode |

#### Styling

- **Non-scrollable**: `text-[10px]`, centered, equal width
- **Scrollable**: `text-[9px]`, shrink-0, whitespace-nowrap
- **Selected**: `bg-secondary text-primary`
- **Unselected**: `text-tertiary`, hover: `text-primary`

### MinimizeButton

Collapse the panel to a compact button.

```tsx
<MinimizeButton onClick={toggleMinimized} />
```

#### Props

```typescript
interface MinimizeButtonProps {
  onClick: () => void
}
```

Uses Hugeicons `MinusSignIcon` at 12px.

## Scroll Behavior

### Threshold

- `> 4 sections`: Enables scrollable mode
- `≤ 4 sections`: Fixed layout, equal width tabs

### Fade Indicators

- **Left fade**: Shows when `scrollLeft > 2`
- **Right fade**: Shows when content extends beyond visible area
- Uses `bg-gradient-to-r/l from-[var(--bg-quaternary)]`

### Auto-scroll on Tab Change

When the active tab changes, the component scrolls it into view with padding.

---

## Related

- [ActionBar](./action-bar.md) - Footer components
- [MinimizedHeader](./minimized-header.md) - Minimized state
- [Context](../api/context.md) - Panel state management

# Configuration

JAN2 defaults, factory functions, and configuration utilities.

## Overview

All defaults are based on the **JAN2 preset** - the production source of truth. The configuration system is modular:

| Module | Purpose |
|--------|---------|
| `constants/dimensions.ts` | TABLE_CONFIG, CELL_CONFIG |
| `constants/appearance.ts` | Border, background defaults |
| `constants/toolbar.ts` | Toolbar layout defaults |
| `constants/filter.ts` | Filter toolbar defaults |
| `constants/skeleton.ts` | Skeleton defaults |
| `factories/` | Factory functions |
| `calculators/` | Calculation utilities |
| `presets/` | Unified configurations |

## Quick Start

### Use JAN2 Defaults

```tsx
import { getDefaultTableProps } from '...'

<StickyDataTable {...getDefaultTableProps()} data={data} columns={columns} />
```

### Override Specific Values

```tsx
import { createTableConfiguration, tableConfigToProps } from '...'

const config = createTableConfiguration({
  dimensions: { rowHeight: 52 },
  toolbar: { position: 'above' },
})

<StickyDataTable {...tableConfigToProps(config)} data={data} columns={columns} />
```

## Default Values (JAN2)

### Dimensions

```tsx
TABLE_CONFIG = {
  HEADER_GAP: 12,
  HEADER_HEIGHT: 48,
  ROW_HEIGHT: 46,
  DEFAULT_BORDER_RADIUS: 20,
  INTEGRATED_TOOLBAR_HEIGHT: 32,
}

CELL_CONFIG = {
  PADDING_X: 12,
  FIRST_CELL_PADDING_LEFT: 16,
  LAST_CELL_PADDING_RIGHT: 16,
}

ANIMATION_CONFIG = {
  COLUMN_ENTER_DURATION: 300,
  COLUMN_LEAVE_DURATION: 250,
  COLUMN_SHIFT_DURATION: 200,
  ROW_HOVER_DURATION: 150,
}
```

### Border Config

```tsx
DEFAULT_BORDER_CONFIG = {
  showOuter: true,
  showRows: true,
  showCells: true,
  outerColor: 'border-primary',
  rowColor: 'border-secondary',
  cellColor: 'border-tertiary',
}
```

### Background Config

```tsx
DEFAULT_BACKGROUND_CONFIG = {
  headerWrapper: 'bg-secondary_alt',
  headerContainer: 'bg-secondary_t1',
  bodyContainer: 'bg-primary',
  rowHover: 'bg-tertiary',
}
```

### Toolbar Layout

```tsx
DEFAULT_TOOLBAR_LAYOUT = {
  position: 'above',
  countPosition: 'left',
  toolbarToCountGap: 6,
  toolbarToHeaderGap: 12,
  toolbarBottomMargin: 12,
  integratedToolbarHeight: 32,
  integratedPadding: { top: 12, bottom: 8, left: 16, right: 16 },
}
```

### Skeleton Config

```tsx
DEFAULT_SKELETON_CONFIG = {
  initialRowCount: 10,
  infiniteScrollRowCount: 5,
  headerCell: {
    widthMode: 'proportional',
    height: 12,
    borderRadius: 4,
    minWidth: 40,
    maxWidth: 120,
  },
  bodyCell: {
    widthMode: 'random',
    height: 16,
    borderRadius: 4,
    minWidth: 60,
    maxWidth: 140,
  },
  checkboxSize: 16,
  simulateStickyState: 'auto',
}
```

## Factory Functions

### createBorderConfig

```tsx
import { createBorderConfig } from '...'

const borderConfig = createBorderConfig({
  showOuter: false,
  rowColor: 'border-tertiary',
})
```

### createBackgroundConfig

```tsx
import { createBackgroundConfig } from '...'

const backgroundConfig = createBackgroundConfig({
  headerWrapper: 'bg-primary',
  rowHover: 'bg-secondary',
})
```

### createStickyState

```tsx
import { createStickyState } from '...'

const stickyState = createStickyState(canScrollLeft, canScrollRight)
```

### createTableConfiguration

```tsx
import { createTableConfiguration } from '...'

const config = createTableConfiguration({
  dimensions: {
    rowHeight: 52,
    borderRadius: 16,
  },
  toolbar: {
    position: 'integrated',
    showCount: true,
  },
  border: {
    showCells: false,
  },
})
```

### tableConfigToProps

```tsx
import { tableConfigToProps } from '...'

const props = tableConfigToProps(config)
// Returns props compatible with StickyDataTable
```

### getDefaultTableProps

```tsx
import { getDefaultTableProps } from '...'

// Equivalent to tableConfigToProps(DEFAULT_TABLE_CONFIGURATION)
const props = getDefaultTableProps()
```

## Filter Configuration

### Filter Menu

```tsx
DEFAULT_FILTER_MENU = {
  width: 240,
  borderRadius: '2xl',
  shadow: '2xl',
  border: 'shine-1',
  cornerSquircle: true,
  backgroundColor: 'primary',
  gradient: 'subtle-depth-sm',
  gradientColor: 'secondary',
  heightAnimationEnabled: true,
  opacityCrossfadeEnabled: true,
}
```

### Filter Trigger

```tsx
DEFAULT_FILTER_TRIGGER = {
  height: 40,
  shine: '0',
  shineIntensity: 'intense',
  background: 'primary',
  backgroundHover: 'tertiary',
  border: false,
  rounded: 'full',
  paddingX: 12,
  textColor: 'secondary',
  textColorHover: 'primary',
  fontWeight: 'semibold',
  iconSize: 20,
  iconStrokeWidth: 1.5,
  iconColor: 'quaternary',
}
```

### Filter Pill

```tsx
DEFAULT_FILTER_PILL = {
  shine: '1',
  shineIntensity: 'subtle',
  background: 'secondary',
  border: false,
  size: 'sm',
  rounded: 'full',
  paddingLeft: 8,
  paddingRight: 4,
  iconValueGap: 4,
  itemGap: 10,
  iconSize: 14,
  closeIconSize: 16,
  leftIconOpacity: 55,
  duration: 150,
  revealMode: 'fade',
}
```

### createFilterConfig

```tsx
import { createFilterConfig } from '...'

const filterConfig = createFilterConfig({
  menu: { width: 280 },
  pill: { size: 'xs' },
})
```

### mergeFilterConfig

```tsx
import { mergeFilterConfig, DEFAULT_FILTER_CONFIG } from '...'

const config = mergeFilterConfig(DEFAULT_FILTER_CONFIG, {
  trigger: { height: 36 },
})
```

## Calculators

### calculateToolbarHeight

```tsx
import { calculateToolbarHeight } from '...'

const height = calculateToolbarHeight({
  position: 'integrated',
  integratedToolbarHeight: 32,
  integratedPadding: { top: 12, bottom: 8 },
})
```

### calculateSkeletonHeight

```tsx
import { calculateSkeletonHeight } from '...'

const height = calculateSkeletonHeight({
  rowCount: 10,
  rowHeight: 52,
  headerHeight: 48,
  borderRadius: 16,
})
```

### deepMerge

```tsx
import { deepMerge } from '...'

const merged = deepMerge(defaultConfig, userOverrides)
```

## Usage Patterns

### FilterToolbar with Defaults

```tsx
// Just works with JAN2 defaults
<FilterToolbar
  categories={categories}
  filterState={filterState}
  onFilterAdd={addFilter}
  onFilterRemove={removeFilter}
/>
```

### FilterToolbar with Overrides

```tsx
<FilterToolbar
  categories={categories}
  filterState={filterState}
  onFilterAdd={addFilter}
  onFilterRemove={removeFilter}
  config={{ menu: { width: 280 } }}
/>
```

## Related

- [Props Reference](./props.md) - Component props
- [Types Reference](./types.md) - Type definitions
- [Styling Guide](../architecture/styling.md) - Border/background usage

# Installation

StickyDataTable is part of the PAYVA V2 design system.

## Overview

The component is located in the frontend design system and requires no external installation.

## Basic Import

```tsx
import {
  StickyDataTable,
  type ColumnConfig,
} from '@/modules/design-system/v2/components/ui/prod/data/sticky-data-table'
```

## Full Package Path

```
front-end/src/modules/design-system/v2/components/ui/prod/data/sticky-data-table/
```

## Available Exports

### Component

```tsx
import { StickyDataTable } from '...'
```

### Types

```tsx
import type {
  ColumnConfig,
  ColumnAlignment,
  BorderConfig,
  BackgroundConfig,
  StickyState,
  SelectionState,
  InfiniteScrollConfig,
  StickyDataTableProps,
  ComputedColumn,
  ColumnChange,
  DragCloneMode,
  // Configuration types
  TableConfiguration,
  TableConfigurationOverrides,
  TableSkeletonConfig,
  SkeletonCellConfig,
  // Filter types
  FilterCategory,
  FilterConfig,
  FilterState,
  ActiveFilter,
} from '...'
```

### Hooks

```tsx
import {
  // Core
  useStickyDataTable,
  // Column
  useColumns,
  useColumnConfiguration,
  // Scroll
  useScrollSync,
  useInfiniteScroll,
  // State
  useSort,
  useSelection,
  useTableFilters,
  // Config
  useTableConfiguration,
  // Utils
  useArrowPosition,
  useExportCsvSticky,
  // Data adapters
  useTableLoadingState,
  useTableWithGraphQL,
  useTableWithAsync,
} from '...'
```

### Components

```tsx
import {
  TableCell,
  TableRow,
  TableHeader,
  TableBody,
  NavigationArrow,
  NavigationArrows,
  GradientOverlay,
  StickyHeaderWrapper,
  ColumnControlPanel,
  ExportToolbar,
  TableEmptyState,
  FilterToolbar,
  FilterDropdown,
  TableSkeleton,
  LoadMoreSkeleton,
} from '...'
```

### Configuration

```tsx
import {
  // Constants
  TABLE_CONFIG,
  ARROW_CONFIG,
  ANIMATION_CONFIG,
  CELL_CONFIG,
  DEFAULT_BORDER_CONFIG,
  DEFAULT_BACKGROUND_CONFIG,
  DEFAULT_TOOLBAR_LAYOUT,
  DEFAULT_TABLE_CONFIGURATION,
  // Factories
  createBorderConfig,
  createBackgroundConfig,
  createStickyState,
  createTableConfiguration,
  tableConfigToProps,
  getDefaultTableProps,
  deepMerge,
  // Calculators
  calculateToolbarHeight,
  calculateSkeletonHeight,
  calculateIntegratedHeaderGap,
} from '...'
```

### Context

```tsx
import {
  TableProvider,
  useTableContext,
  useScrollContext,
  useColumnsContext,
  useSelectionContext,
  useSortContext,
  useStylingContext,
  // Page background
  TablePageBackgroundProvider,
  useTablePageBackground,
  PAGE_BACKGROUND_CONFIGS,
} from '...'
```

### Utilities

```tsx
import {
  generateGridTemplate,
  calculateTotalStickyWidth,
  computeColumnOffsets,
  separateColumns,
  getAlignmentClasses,
  getCellPadding,
  processColumns,
  createVisibleColumnKeys,
  hasStickyColumns,
} from '...'
```

## Dependencies

The component relies on these internal packages:

- `@base-ui/react` - Base UI primitives
- `@hugeicons-pro/core-stroke-rounded` - Icon library
- `clsx` - Class name utility

## Related

- [Basic Usage](./basic-usage.md) - Get started with examples
- [API Reference](../api/init.md) - Complete props documentation

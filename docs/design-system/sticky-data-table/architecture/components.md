# Components

Component hierarchy and subcomponents in StickyDataTable.

## Overview

The component is built from composable subcomponents, each with a specific responsibility.

## Component Hierarchy

```
StickyDataTable
├── ToolbarContent
│   ├── leftToolbar (user-provided)
│   ├── rightToolbar (user-provided)
│   ├── ExportToolbar
│   └── ColumnControlPanel
├── GradientOverlay
├── StickyHeaderWrapper
│   ├── NavigationArrows
│   │   └── NavigationArrow (left, right)
│   └── TableHeader
│       └── Header cells (CSS Grid)
└── TableBody
    ├── TableRow
    │   └── TableCell
    ├── InfiniteScrollSentinel
    ├── LoadMoreSkeleton
    └── TableEmptyState
```

## Core Components

### StickyDataTable

Main component that orchestrates all functionality.

**Location**: `index.tsx`

```tsx
<StickyDataTable
  data={data}
  columns={columns}
  columnLabels={columnLabels}
  renderCell={renderCell}
/>
```

### TableBody

Scrollable body container with row rendering.

**Location**: `components/core/table-body.tsx`

```tsx
<TableBody
  data={data}
  columns={columns}
  renderCell={renderCell}
  onRowClick={handleRowClick}
  infiniteScroll={infiniteScrollProps}
/>
```

### TableRow

Individual row with cell rendering.

**Location**: `components/core/table-row.tsx`

```tsx
<TableRow
  row={rowData}
  columns={columns}
  renderCell={renderCell}
  onClick={() => handleRowClick(row)}
/>
```

### TableCell

Individual cell with alignment and styling.

**Location**: `components/core/table-cell.tsx`

```tsx
<TableCell
  column={column}
  isSticky={column.isSticky}
  stickyState={stickyState}
>
  {content}
</TableCell>
```

### TableEmptyState

Empty state display when no data.

**Location**: `components/core/table-empty-state.tsx`

```tsx
<TableEmptyState
  title="No items found"
  description="Try adjusting your filters"
  action={<Button onClick={clearFilters}>Clear Filters</Button>}
/>
```

## Header Components

### StickyHeaderWrapper

Container for sticky header with integrated toolbar support.

**Location**: `components/header/sticky-header-wrapper.tsx`

```tsx
<StickyHeaderWrapper
  headerHeight={48}
  columns={columns}
  integratedToolbar={toolbarContent}
/>
```

### TableHeader

Header row with sort controls.

**Location**: `components/header/table-header.tsx`

```tsx
<TableHeader
  columns={columns}
  columnLabels={columnLabels}
  sortColumn={sortColumn}
  sortDirection={sortDirection}
  onSort={handleSort}
/>
```

## Navigation Components

### NavigationArrows

Container for scroll navigation arrows.

**Location**: `components/navigation/navigation-arrows.tsx`

```tsx
<NavigationArrows
  showLeft={canScrollLeft}
  showRight={canScrollRight}
  onScrollLeft={handleScrollLeft}
  onScrollRight={handleScrollRight}
/>
```

### NavigationArrow

Individual navigation arrow button.

**Location**: `components/navigation/navigation-arrow.tsx`

```tsx
<NavigationArrow
  direction="left"
  onClick={handleScrollLeft}
  visible={canScrollLeft}
/>
```

### GradientOverlay

Gradient fade indicating scrollable content.

**Location**: `components/navigation/gradient-overlay.tsx`

```tsx
<GradientOverlay
  visible={showScrollIndicator}
  position="full"
  borderRadius={16}
/>
```

## Toolbar Components

### ToolbarContent

Unified toolbar renderer for both 'above' and 'integrated' positions.

**Location**: `components/toolbar/toolbar-content.tsx`

```tsx
<ToolbarContent
  leftToolbar={<FilterToolbar />}
  rightToolbar={<SearchInput />}
  showCount={true}
  totalCount={100}
/>
```

### ColumnControlPanel

Column visibility dropdown.

**Location**: `components/toolbar/column-control-panel.tsx`

```tsx
<ColumnControlPanel
  columns={columns}
  visibleColumnKeys={visibleKeys}
  columnLabels={columnLabels}
  onToggleColumn={toggleColumn}
  columnGroups={columnGroups}
/>
```

### ExportToolbar

CSV export buttons.

**Location**: `components/toolbar/export-toolbar.tsx`

```tsx
<ExportToolbar
  onExportAll={exportAll}
  onExportSelected={exportSelected}
  hasSelection={selectedIds.size > 0}
/>
```

## Filter Components

### FilterToolbar

Complete filter UI with dropdown and pills.

**Location**: `components/filter/filter-toolbar.tsx`

```tsx
<FilterToolbar
  categories={categories}
  filterState={filterState}
  onFilterAdd={addFilter}
  onFilterRemove={removeFilter}
  onFiltersClear={clearFilters}
/>
```

### FilterDropdown

Filter selection dropdown menu.

**Location**: `components/filter/filter-dropdown.tsx`

```tsx
<FilterDropdown
  categories={categories}
  onSelect={handleFilterSelect}
/>
```

## Skeleton Components

### TableSkeleton

Full table skeleton for initial loading.

**Location**: `components/skeleton/skeleton.tsx`

```tsx
<TableSkeleton
  columns={columns}
  rowCount={10}
  rowHeight={52}
  borderRadius={16}
/>
```

### LoadMoreSkeleton

Inline skeleton for infinite scroll loading.

**Location**: `components/skeleton/skeleton.tsx`

```tsx
<LoadMoreSkeleton
  columns={columns}
  rowCount={5}
  rowHeight={52}
/>
```

## Component Exports

All components are exported from `components/index.ts`:

```tsx
import {
  // Core
  TableCell,
  TableRow,
  TableBody,
  TableEmptyState,

  // Header
  TableHeader,
  StickyHeaderWrapper,

  // Navigation
  NavigationArrow,
  NavigationArrows,
  GradientOverlay,

  // Toolbar
  ColumnControlPanel,
  ExportToolbar,
  ToolbarContent,

  // Filter
  FilterToolbar,
  FilterDropdown,

  // Skeleton
  TableSkeleton,
  LoadMoreSkeleton,
} from '...'
```

## Building Custom Tables

For advanced customization, compose from subcomponents:

```tsx
import {
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  useScrollSync,
  useStickyDataTable,
} from '...'

function CustomTable({ data, columns }) {
  const { headerScrollRef, bodyScrollRef, ... } = useStickyDataTable({ ... })

  return (
    <div>
      <div ref={headerScrollRef}>
        <TableHeader columns={columns} />
      </div>
      <div ref={bodyScrollRef}>
        <TableBody data={data} columns={columns} />
      </div>
    </div>
  )
}
```

## Related

- [State Management](./state-management.md) - Context and hooks
- [Styling](./styling.md) - Visual customization
- [Props Reference](../api/props.md) - Component props

# Filtering

FilterToolbar integration with StickyDataTable.

## Overview

The FilterToolbar component provides a dropdown-based filter interface. Place it in the `leftToolbar` prop to integrate with the table.

## Basic Setup

```tsx
import {
  StickyDataTable,
  FilterToolbar,
  useTableFilters,
  type FilterCategory,
} from '...'

// Define filter categories
const categories: FilterCategory[] = [
  {
    key: 'status',
    label: 'Status',
    filters: [
      {
        type: 'select',
        key: 'status',
        label: 'Status',
        options: [
          { value: 'active', label: 'Active' },
          { value: 'pending', label: 'Pending' },
          { value: 'completed', label: 'Completed' },
        ],
      },
    ],
  },
]

function MyTable() {
  const {
    filterState,
    addFilter,
    removeFilter,
    clearFilters,
    hasActiveFilters,
  } = useTableFilters({ categories })

  return (
    <StickyDataTable
      data={data}
      columns={columns}
      columnLabels={columnLabels}
      renderCell={renderCell}
      hasActiveFilters={hasActiveFilters}
      leftToolbar={
        <FilterToolbar
          categories={categories}
          filterState={filterState}
          onFilterAdd={addFilter}
          onFilterRemove={removeFilter}
          onFiltersClear={clearFilters}
        />
      }
    />
  )
}
```

## Filter Types

### Select Filter

Single or multi-select dropdown:

```tsx
{
  type: 'select',
  key: 'status',
  label: 'Status',
  options: [
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending' },
  ],
  multiple: false, // or true for multi-select
}
```

### Date Filter

Date range picker with presets:

```tsx
{
  type: 'date',
  key: 'createdAt',
  label: 'Created Date',
  presets: [
    { label: 'Today', getValue: () => ({ start: today, end: today }) },
    { label: 'Last 7 days', getValue: () => ({ start: weekAgo, end: today }) },
    { label: 'Last 30 days', getValue: () => ({ start: monthAgo, end: today }) },
  ],
}
```

### Range Filter

Numeric range slider:

```tsx
{
  type: 'range',
  key: 'amount',
  label: 'Amount',
  min: 0,
  max: 10000,
  step: 100,
  presets: [
    { label: 'Under $100', min: 0, max: 100 },
    { label: '$100-$500', min: 100, max: 500 },
    { label: 'Over $500', min: 500, max: 10000 },
  ],
}
```

### Search Filter

Text search:

```tsx
{
  type: 'search',
  key: 'query',
  label: 'Search',
  placeholder: 'Search by name...',
}
```

### Boolean Filter

Toggle:

```tsx
{
  type: 'boolean',
  key: 'isVerified',
  label: 'Verified Only',
}
```

## Filter Categories

Group related filters:

```tsx
const categories: FilterCategory[] = [
  {
    key: 'status',
    label: 'Status',
    icon: StatusIcon,
    filters: [
      { type: 'select', key: 'status', ... },
    ],
  },
  {
    key: 'dates',
    label: 'Dates',
    icon: CalendarIcon,
    filters: [
      { type: 'date', key: 'createdAt', ... },
      { type: 'date', key: 'updatedAt', ... },
    ],
  },
  {
    key: 'amounts',
    label: 'Amounts',
    icon: DollarIcon,
    filters: [
      { type: 'range', key: 'total', ... },
    ],
  },
]
```

## Using useTableFilters

### Basic Usage

```tsx
const {
  filterState,
  addFilter,
  removeFilter,
  updateFilter,
  clearFilters,
  hasActiveFilters,
  getFilterValue,
} = useTableFilters({
  categories,
})
```

### With Persistence

```tsx
const filterHook = useTableFilters({
  categories,
  persistKey: 'my-table-filters', // localStorage key
})
```

### With Callback

```tsx
const filterHook = useTableFilters({
  categories,
  onChange: (state) => {
    // Trigger data refetch
    refetch({ filters: state.activeFilters })
  },
})
```

## Connecting to Data

### With GraphQL

```tsx
const { filterState, addFilter, removeFilter, clearFilters } = useTableFilters({
  categories,
})

// Convert filter state to GraphQL variables
const filterVariables = useMemo(() => {
  return filterState.activeFilters.reduce((acc, filter) => {
    acc[filter.filterKey] = filter.value
    return acc
  }, {})
}, [filterState])

const { data, loading } = useGetItemsQuery({
  variables: {
    ...filterVariables,
  },
})
```

### With Data Adapter

```tsx
const { filterState, ... } = useTableFilters({ categories })

const { tableProps, infiniteScrollProps } = useTableWithGraphQL({
  data: data?.items ?? [],
  loading,
  hasNextPage,
  fetchMore,
  // Skeleton shows when filters change
  filterDependencies: [filterState],
})
```

## FilterToolbar Configuration

### Default Styling (JAN2)

FilterToolbar uses JAN2 defaults automatically:

```tsx
<FilterToolbar
  categories={categories}
  filterState={filterState}
  onFilterAdd={addFilter}
  onFilterRemove={removeFilter}
/>
```

### Custom Styling

Override specific properties:

```tsx
<FilterToolbar
  categories={categories}
  filterState={filterState}
  onFilterAdd={addFilter}
  onFilterRemove={removeFilter}
  config={{
    menu: { width: 280 },
    trigger: { height: 36 },
    pill: { size: 'xs' },
  }}
/>
```

## Empty/No Results States

Handle filter results:

```tsx
<StickyDataTable
  data={filteredData}
  hasActiveFilters={hasActiveFilters}
  searchTerm={searchTerm}
  emptyState={<EmptyState />}
  noResultsState={
    <NoResultsState
      onClearFilters={clearFilters}
    />
  }
/>
```

The component shows:
- `emptyState`: When no data and no filters active
- `noResultsState`: When no data but filters/search active

## Filter Presets

### Date Presets

```tsx
import { DEFAULT_DATE_PRESETS } from '...'

// Uses built-in presets: Today, Yesterday, Last 7 days, etc.
{
  type: 'date',
  key: 'createdAt',
  label: 'Created',
  presets: DEFAULT_DATE_PRESETS,
}
```

### Custom Presets

```tsx
{
  type: 'date',
  key: 'createdAt',
  label: 'Created',
  presets: [
    {
      label: 'This Quarter',
      getValue: () => ({
        start: startOfQuarter(new Date()),
        end: endOfQuarter(new Date()),
      }),
    },
  ],
}
```

## Factory Functions

Create filters with helpers:

```tsx
import {
  createSelectFilter,
  createDateFilter,
  createRangeFilter,
} from '...'

const statusFilter = createSelectFilter({
  key: 'status',
  label: 'Status',
  options: [
    { value: 'active', label: 'Active' },
  ],
})

const dateFilter = createDateFilter({
  key: 'createdAt',
  label: 'Created',
})
```

## Related

- [Configuration](../api/config.md) - Filter config defaults
- [Types Reference](../api/types.md) - Filter types
- [Hooks Reference](../api/hooks.md) - useTableFilters

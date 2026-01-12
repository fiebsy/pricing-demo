# Features

Comprehensive guide to StickyDataTable's feature set: selection, sorting, infinite scroll, filtering, export, and more.

---

## Row Selection

Enable checkbox-based row selection for bulk actions.

### Basic Setup

```tsx
<StickyDataTable
  data={orders}
  columns={columns}
  columnLabels={columnLabels}
  renderCell={renderCell}
  // Enable selection
  enableSelection={true}
  getRowId={(row) => row.id}  // Required for selection
/>
```

### How It Works

When `enableSelection` is true:
1. A checkbox column is automatically added as the first sticky column
2. Header checkbox enables select-all functionality
3. Row checkboxes toggle individual selection
4. Selection state is managed internally via `useSelection` hook

### Accessing Selection State

The selection state is passed to `exportSelected` callbacks:

```tsx
<StickyDataTable
  enableSelection={true}
  getRowId={(row) => row.id}
  exportSelected={(selectionState) => {
    const selectedIds = [...selectionState.selectedIds]
    // Export selected rows
  }}
/>
```

### Selection State Shape

```tsx
interface SelectionState {
  selectedIds: Set<string | number>
  toggleRowSelection: (id: string | number) => void
  selectAllRows: () => void
  deselectAllRows: () => void
  isRowSelected: (id: string | number) => boolean
  isAllSelected: boolean
  isSomeSelected: boolean  // Partial selection (indeterminate)
  selectedCount: number
}
```

---

## Sorting

### Client-Side Sorting (Default)

Simply mark columns as sortable:

```tsx
const columns: ColumnConfig[] = [
  { key: 'name', width: 200, align: 'left', sortable: true },
  { key: 'amount', width: 120, align: 'right', sortable: true },
  { key: 'date', width: 150, align: 'left', sortable: true },
]
```

Clicking a sortable column header toggles: `desc` → `asc` → `desc`

### Server-Side Sorting

For paginated/large datasets, handle sorting server-side:

```tsx
const [sortColumn, setSortColumn] = useState<string | null>(null)
const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')

// Fetch data with sort params
const { data } = useQuery({
  queryKey: ['orders', sortColumn, sortDirection],
  queryFn: () => fetchOrders({ sortBy: sortColumn, sortDir: sortDirection }),
})

<StickyDataTable
  data={data}
  columns={columns}
  columnLabels={columnLabels}
  renderCell={renderCell}
  // Server-side sorting
  serverSideSort={true}
  serverSortColumn={sortColumn}
  serverSortDirection={sortDirection}
  onServerSort={(column, direction) => {
    setSortColumn(column)
    setSortDirection(direction)
  }}
/>
```

---

## Infinite Scroll

### Unified API (Recommended)

The modern approach with automatic skeleton generation:

```tsx
<StickyDataTable
  data={orders}
  columns={columns}
  columnLabels={columnLabels}
  renderCell={renderCell}
  infiniteScroll={{
    hasNextPage: hasMore,
    isLoadingMore: isFetching,
    onLoadMore: () => fetchNextPage(),
    skeletonRowCount: 10,     // Skeleton rows while loading
    threshold: 200,           // Trigger distance from bottom
  }}
/>
```

### Using `useInfiniteScroll` Hook

For additional control and minimum loading delay:

```tsx
import { useInfiniteScroll } from '...'

const { infiniteScrollProps, isLoadingMore } = useInfiniteScroll({
  hasNextPage,
  loadMore: fetchNextPage,
  skeletonRowCount: 10,
  minimumDelay: 250,  // Prevents skeleton flash on fast loads
})

<StickyDataTable
  infiniteScroll={infiniteScrollProps}
  // ... other props
/>
```

### Custom Loading Indicator

Override the automatic skeleton:

```tsx
<StickyDataTable
  infiniteScroll={{
    hasNextPage,
    isLoadingMore,
    onLoadMore: fetchNextPage,
    customIndicator: <CustomLoadingSpinner />,
  }}
/>
```

### InfiniteScrollConfig Shape

```tsx
interface InfiniteScrollConfig {
  hasNextPage: boolean          // More data available?
  isLoadingMore: boolean        // Currently fetching?
  onLoadMore: () => void | Promise<void>
  skeletonRowCount?: number     // Default: 5
  threshold?: number            // Default: 200px
  minimumLoadingDelay?: number  // Default: 0
  customIndicator?: ReactNode   // Override skeleton
}
```

---

## Left Toolbar

Slot for custom filter components or any content on the left side of the toolbar.

### Basic Usage

```tsx
import { FilterToolbar, useTableFilters } from '...'

const filterCategories: FilterCategory[] = [
  {
    key: 'status',
    label: 'Status',
    config: createSelectFilter([
      { id: 'active', label: 'Active' },
      { id: 'pending', label: 'Pending' },
      { id: 'closed', label: 'Closed' },
    ]),
  },
  {
    key: 'date',
    label: 'Date',
    config: createDateFilter(DEFAULT_DATE_PRESETS),
  },
]

const { filterState, onFilterAdd, onFilterRemove, onFiltersClear } = useTableFilters({
  categories: filterCategories,
  onFiltersChange: (filters) => {
    // Trigger data refetch with filters
  },
})

<StickyDataTable
  leftToolbar={
    <FilterToolbar
      categories={filterCategories}
      filterState={filterState}
      onFilterAdd={onFilterAdd}
      onFilterRemove={onFilterRemove}
      onFiltersClear={onFiltersClear}
    />
  }
  // ... other props
/>
```

### Filter Types

| Type | Use Case | Helper |
|------|----------|--------|
| `select` | Dropdown options | `createSelectFilter()` |
| `date` | Date range presets | `createDateFilter()` |
| `range` | Numeric range | `createRangeFilter()` |
| `search` | Text search | Direct config |
| `boolean` | Yes/No toggle | Direct config |

---

## Right Toolbar

Slot for search component or any custom content on the right side of toolbar (appears left of export button):

```tsx
import { SearchToolbar } from '...'

const [searchQuery, setSearchQuery] = useState('')

<StickyDataTable
  rightToolbar={
    <SearchToolbar
      value={searchQuery}
      onChange={setSearchQuery}
      placeholder="Search orders..."
    />
  }
  // ... other props
/>
```

---

## Export Functionality

### Export All

```tsx
<StickyDataTable
  exportAll={async () => {
    const csvData = generateCSV(allData)
    downloadCSV(csvData, 'orders.csv')
  }}
/>
```

### Export Selected

```tsx
<StickyDataTable
  enableSelection={true}
  getRowId={(row) => row.id}
  exportSelected={async (selectionState) => {
    const selectedData = allData.filter(row =>
      selectionState.selectedIds.has(row.id)
    )
    const csvData = generateCSV(selectedData)
    downloadCSV(csvData, 'selected-orders.csv')
  }}
/>
```

### Custom Export Toolbar

```tsx
<StickyDataTable
  exportToolbar={
    <div className="flex gap-2">
      <Button onClick={handleExportCSV}>CSV</Button>
      <Button onClick={handleExportExcel}>Excel</Button>
      <Button onClick={handleExportPDF}>PDF</Button>
    </div>
  }
/>
```

### Using `useExportCsvSticky` Hook

```tsx
import { useExportCsvSticky } from '...'

const { exportAll, exportSelected } = useExportCsvSticky({
  columns,
  columnLabels,
  data,
  filename: 'orders',
  getRowId: (row) => row.id,
})

<StickyDataTable
  exportAll={exportAll}
  exportSelected={exportSelected}
/>
```

---

## Count Display

Show total item count below the left toolbar:

```tsx
<StickyDataTable
  showCount={true}
  totalCount={data.length}      // Or total from pagination
  countLabel="orders"           // Default: "items"
/>
```

Displays as: **1,234** orders

---

## Column Control

### Basic Toggle

Default behavior shows a "Columns" dropdown in toolbar:

```tsx
<StickyDataTable
  showColumnControl={true}  // Default
/>
```

### Disable Column Control

```tsx
<StickyDataTable
  showColumnControl={false}
/>
```

### Column Groups

Organize columns in the dropdown:

```tsx
<StickyDataTable
  columnGroups={[
    { label: 'Order Info', keys: ['id', 'customer', 'status'] },
    { label: 'Financial', keys: ['amount', 'tax', 'total'] },
    { label: 'Timestamps', keys: ['createdAt', 'updatedAt'] },
  ]}
/>
```

### Default Visibility

```tsx
// Hide specific columns initially
<StickyDataTable
  defaultHiddenColumns={['tax', 'createdAt', 'updatedAt']}
/>

// Or explicitly set visible columns
<StickyDataTable
  defaultVisibleColumns={['id', 'customer', 'status', 'amount', 'total']}
/>
```

### Programmatic Control

Use `useColumnConfiguration` hook for external control:

```tsx
import { useColumnConfiguration } from '...'

const {
  visibleColumnKeys,
  toggleColumn,
  resetColumns,
  setVisibleColumns,
} = useColumnConfiguration({
  columns,
  defaultVisibleColumns: ['id', 'name', 'status'],
  onVisibilityChange: (keys) => {
    localStorage.setItem('columnPrefs', JSON.stringify([...keys]))
  },
})

<StickyDataTable
  defaultVisibleColumns={[...visibleColumnKeys]}
/>

// External controls
<Button onClick={() => toggleColumn('email')}>Toggle Email</Button>
<Button onClick={resetColumns}>Reset Columns</Button>
```

---

## Navigation Arrows

Automatically appear when content overflows horizontally:

- **Left Arrow**: Visible when scrolled right
- **Right Arrow**: Visible when more content exists to the right

### Arrow Positioning

Override default positioning:

```tsx
<StickyDataTable
  arrowPreferredTopOffset={400}  // Default: 300
/>
```

Arrows position themselves intelligently:
- Prefer the specified offset from top
- Adjust for short tables
- Stay within visible area

---

## Dynamic Column Features

### Text Wrapping

```tsx
{
  key: 'description',
  width: 300,
  align: 'left',
  allowTextWrap: true,  // Unlimited wrapping
}
```

### Line Clamping

```tsx
{
  key: 'description',
  width: 300,
  align: 'left',
  maxLines: 2,  // Max 2 lines, then truncate with "..."
}
```

### Tabular Numbers

Enabled by default for aligned digits. Disable for text columns:

```tsx
{
  key: 'name',
  width: 200,
  align: 'left',
  useTabularNums: false,  // Disable for text
}
```

### Flexible Widths

```tsx
{
  key: 'description',
  width: 200,      // Default width
  minWidth: 150,   // Minimum constraint
  maxWidth: 400,   // Maximum constraint
  flexRatio: 2,    // Gets 2x space compared to flexRatio: 1
}
```

---

## Feature Combinations

### Full-Featured Table

```tsx
<StickyDataTable
  data={orders}
  columns={columns}
  columnLabels={columnLabels}
  renderCell={renderCell}
  // Selection
  enableSelection={true}
  getRowId={(row) => row.id}
  // Sorting
  serverSideSort={true}
  serverSortColumn={sortColumn}
  serverSortDirection={sortDirection}
  onServerSort={handleSort}
  // Infinite scroll
  infiniteScroll={{
    hasNextPage,
    isLoadingMore,
    onLoadMore: fetchNextPage,
    skeletonRowCount: 10,
  }}
  // Toolbar
  leftToolbar={<FilterToolbar {...filterProps} />}
  rightToolbar={<SearchToolbar {...searchProps} />}
  showCount={true}
  totalCount={totalOrders}
  countLabel="orders"
  // Export
  exportAll={exportAllOrders}
  exportSelected={exportSelectedOrders}
  // Columns
  columnGroups={columnGroups}
  defaultVisibleColumns={defaultVisible}
  // Interaction
  onRowClick={handleRowClick}
/>
```

---

## Next Steps

- [Styling](./STYLING.md) - Customize appearance
- [API Reference](./API-REFERENCE.md) - Complete props documentation
- [Architecture](./ARCHITECTURE.md) - Implementation details

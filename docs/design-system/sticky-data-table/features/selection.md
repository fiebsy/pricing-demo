# Selection

Row selection with checkbox support in StickyDataTable.

## Overview

Enable row selection with `enableSelection={true}`. The component automatically adds a checkbox column and manages selection state.

## Basic Setup

```tsx
<StickyDataTable
  data={data}
  columns={columns}
  columnLabels={columnLabels}
  renderCell={renderCell}
  enableSelection={true}
  getRowId={(row) => row.id}
/>
```

**Required props**:
- `enableSelection`: Enable selection feature
- `getRowId`: Function to extract unique ID from each row

## Selection State

The component manages selection state internally. Access it via:

### Using the Main Hook

```tsx
const { selectionState } = useStickyDataTable({ ... })

// Available properties
selectionState.selectedIds    // Set<string> of selected IDs
selectionState.isAllSelected  // boolean
selectionState.isIndeterminate // boolean (some selected)

// Available methods
selectionState.toggleRow(id)   // Toggle single row
selectionState.toggleAll()     // Toggle all rows
selectionState.clearSelection() // Clear all
selectionState.selectAll(ids)  // Select specific IDs
```

### Using Context

```tsx
import { useSelectionContext } from '...'

function MyComponent() {
  const { selectedIds, toggleRow, clearSelection } = useSelectionContext()

  return (
    <button onClick={() => clearSelection()}>
      Clear ({selectedIds.size} selected)
    </button>
  )
}
```

## Checkbox Column

When selection is enabled, a checkbox column is automatically prepended:

- **Header**: Select-all checkbox with indeterminate state
- **Rows**: Individual row checkboxes
- **Width**: 52px (configurable)
- **Sticky**: Always sticky (leftmost column)

## Export Selected Rows

Combine selection with export:

```tsx
<StickyDataTable
  enableSelection={true}
  getRowId={(row) => row.id}
  exportSelected={() => {
    const selectedRows = data.filter(row =>
      selectionState.selectedIds.has(row.id)
    )
    exportToCsv(selectedRows)
  }}
/>
```

## Using the Selection Hook

For custom implementations:

```tsx
import { useSelection } from '...'

const {
  selectedIds,
  isAllSelected,
  isIndeterminate,
  toggleRow,
  toggleAll,
  clearSelection,
  selectAll,
} = useSelection({
  data,
  getRowId: (row) => row.id,
})
```

## Selection Patterns

### Controlled Selection

Manage selection externally:

```tsx
const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

// In parent component
const handleSelectionChange = (ids: Set<string>) => {
  setSelectedIds(ids)
  // Sync with external state, API, etc.
}
```

### Persist Selection

Maintain selection across pagination:

```tsx
const [persistedSelection, setPersistedSelection] = useState<Set<string>>(new Set())

const handlePageChange = () => {
  // Current selection is preserved in persistedSelection
  // Merge with new page's available selections
}
```

### Bulk Actions

Show bulk action bar when items are selected:

```tsx
{selectionState.selectedIds.size > 0 && (
  <BulkActionBar
    selectedCount={selectionState.selectedIds.size}
    onDelete={() => handleBulkDelete(selectionState.selectedIds)}
    onExport={() => handleBulkExport(selectionState.selectedIds)}
    onClear={() => selectionState.clearSelection()}
  />
)}
```

## Visual States

### Checkbox States

| State | Visual | Condition |
|-------|--------|-----------|
| Unchecked | Empty box | No rows selected |
| Checked | Checkmark | All rows selected |
| Indeterminate | Dash | Some rows selected |

### Row Highlighting

Selected rows can be styled differently:

```tsx
renderCell={(key, row, index) => (
  <span className={
    selectionState.selectedIds.has(row.id)
      ? 'text-primary-accent'
      : 'text-primary'
  }>
    {row[key]}
  </span>
)}
```

## Edge Cases

### Empty Data

When `data.length === 0`:
- Header checkbox is disabled
- No selection state changes possible

### Filtered Data

Selection persists through filtering:

```tsx
// User selects rows 1, 2, 3
// Filter hides row 2
// Row 2 stays in selectedIds
// When filter clears, row 2 is still selected
```

### Dynamic Data

When data changes:

```tsx
// New data loaded (e.g., page change)
// Call clearSelection() if needed:
useEffect(() => {
  selectionState.clearSelection()
}, [pageNumber])
```

## Related

- [Props Reference](../api/props.md) - Selection props
- [Hooks Reference](../api/hooks.md) - useSelection hook
- [Basic Usage](../getting-started/basic-usage.md) - Setup examples

# Features

Comprehensive guide to StickyDataTable features and capabilities.

---

## Topics

- [Sorting](./sorting.md): Client-side, server-side, multi-column support
- [Selection](./selection.md): Row selection, checkbox column, select-all
- [Infinite Scroll](./infinite-scroll.md): Pagination, load-more, data adapters
- [Filtering](./filtering.md): FilterToolbar, filter categories, presets

---

## Quick Reference

| Feature | Enable With |
|---------|-------------|
| Sorting (client) | `sortable: true` on column |
| Sorting (server) | `serverSideSort={true}` + `onServerSort` |
| Row selection | `enableSelection={true}` |
| Infinite scroll | `infiniteScroll={{ hasNextPage, fetchMore }}` |
| Filtering | `leftToolbar={<FilterToolbar />}` |

---

## Feature Matrix

| Feature | Client-Side | Server-Side | Notes |
|---------|-------------|-------------|-------|
| **Sorting** | Auto | `onServerSort` | Multi-type support |
| **Selection** | Built-in | N/A | Checkbox column auto-added |
| **Pagination** | N/A | `infiniteScroll` | Cursor-based recommended |
| **Filtering** | `useTableFilters` | Backend query | FilterToolbar UI |
| **Export** | `exportAll` | N/A | CSV export built-in |
| **Column Control** | Built-in | N/A | Toggle visibility |
| **Reordering** | `enableColumnReorder` | N/A | Drag-and-drop |

---

## Common Patterns

### Table with Filters + Infinite Scroll

```tsx
const { filterState, addFilter, removeFilter, clearFilters } = useTableFilters({
  categories,
  persistKey: 'my-table-filters',
})

const { tableProps, infiniteScrollProps } = useTableWithGraphQL({
  data,
  loading,
  hasNextPage,
  fetchMore,
  filterDependencies: [filterState],
})

<StickyDataTable
  {...tableProps}
  infiniteScroll={infiniteScrollProps}
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
```

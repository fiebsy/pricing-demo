# StickyDataTable

A high-performance, feature-rich data table for the PAYVA V2 design system with sticky columns, infinite scroll, row selection, and comprehensive styling controls.

**Package**: `@/modules/design-system/v2/components/ui/prod/data/sticky-data-table`

---

## Getting Started

- [Installation](./getting-started/installation.md): Import paths and dependencies
- [Basic Usage](./getting-started/basic-usage.md): Minimal setup example
- [Column Configuration](./getting-started/column-config.md): Column types, widths, sticky behavior

---

## API Reference

- [Props](./api/props.md): Component props reference
- [Types](./api/types.md): TypeScript interfaces and types
- [Hooks](./api/hooks.md): Custom hooks for advanced usage
- [Configuration](./api/config.md): JAN2 defaults, factories, calculators

---

## Features

- [Sorting](./features/sorting.md): Client-side and server-side sorting
- [Selection](./features/selection.md): Row selection with checkbox support
- [Infinite Scroll](./features/infinite-scroll.md): Pagination and load-more
- [Filtering](./features/filtering.md): FilterToolbar integration

---

## Architecture

- [Components](./architecture/components.md): Component hierarchy and exports
- [State Management](./architecture/state-management.md): Context API and hooks
- [Styling](./architecture/styling.md): Borders, backgrounds, animations, skeletons

---

## Quick Reference

### Minimal Example

```tsx
import {
  StickyDataTable,
  type ColumnConfig,
} from '@/modules/design-system/v2/components/ui/prod/data/sticky-data-table'

const columns: ColumnConfig[] = [
  { key: 'id', width: 60, align: 'left', isSticky: true },
  { key: 'name', width: 200, align: 'left', isSticky: true },
  { key: 'amount', width: 120, align: 'right', sortable: true },
]

<StickyDataTable
  data={data}
  columns={columns}
  columnLabels={{ id: 'ID', name: 'Name', amount: 'Amount' }}
  renderCell={(key, row) => row[key]}
/>
```

### Common Imports

```tsx
// Main component
import { StickyDataTable } from '...'

// Types
import type { ColumnConfig, BorderConfig, InfiniteScrollConfig } from '...'

// Hooks
import { useStickyDataTable, useTableWithGraphQL, useTableFilters } from '...'

// Components
import { TableSkeleton, FilterToolbar, ExportToolbar } from '...'

// Config
import { getDefaultTableProps, createTableConfiguration } from '...'
```

---

## Related Documentation

| Topic | Location |
|-------|----------|
| Base UI Components | `docs/v2/base-ui/init.md` |
| V2 Architecture | `docs/v2/ARCHITECTURE.md` |
| Existing inline docs | `sticky-data-table/docs/INDEX.md` |

---

**Source**: `front-end/src/modules/design-system/v2/components/ui/prod/data/sticky-data-table/`
**Last Updated**: January 2026

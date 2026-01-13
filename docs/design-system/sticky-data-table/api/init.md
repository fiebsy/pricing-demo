# API Reference

Complete reference for StickyDataTable props, types, hooks, and configuration.

---

## Topics

- [Props](./props.md): All component props with descriptions
- [Types](./types.md): TypeScript interfaces (ColumnConfig, BorderConfig, etc.)
- [Hooks](./hooks.md): Custom hooks for advanced usage
- [Configuration](./config.md): JAN2 defaults, factory functions, calculators

---

## Quick Reference

| Category | Key Exports |
|----------|-------------|
| **Component** | `StickyDataTable`, `TableSkeleton`, `FilterToolbar` |
| **Types** | `ColumnConfig`, `BorderConfig`, `InfiniteScrollConfig` |
| **Hooks** | `useStickyDataTable`, `useTableWithGraphQL`, `useTableFilters` |
| **Config** | `getDefaultTableProps()`, `createTableConfiguration()` |

---

## Import Patterns

```tsx
// Component + Types (most common)
import {
  StickyDataTable,
  type ColumnConfig,
  type BorderConfig,
} from '@/modules/design-system/v2/components/ui/prod/data/sticky-data-table'

// Hooks
import {
  useStickyDataTable,
  useTableWithGraphQL,
  useTableFilters,
  useColumnConfiguration,
} from '@/modules/design-system/v2/components/ui/prod/data/sticky-data-table'

// Configuration
import {
  getDefaultTableProps,
  createTableConfiguration,
  DEFAULT_TABLE_CONFIGURATION,
} from '@/modules/design-system/v2/components/ui/prod/data/sticky-data-table'
```

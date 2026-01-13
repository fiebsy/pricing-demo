# Getting Started

Quick start guide for using StickyDataTable in your application.

---

## Topics

- [Installation](./installation.md): Import paths, package location
- [Basic Usage](./basic-usage.md): Minimal working example, step-by-step setup
- [Column Configuration](./column-config.md): Column types, sticky columns, sorting

---

## Quick Reference

| Task | Example |
|------|---------|
| Import component | `import { StickyDataTable } from '@/modules/design-system/v2/components/ui/prod/data/sticky-data-table'` |
| Define columns | `const columns: ColumnConfig[] = [{ key: 'id', width: 60, align: 'left' }]` |
| Render cell | `renderCell={(key, row) => row[key]}` |
| Enable sticky | `{ key: 'name', width: 200, align: 'left', isSticky: true }` |
| Enable sorting | `{ key: 'amount', width: 120, align: 'right', sortable: true }` |

---

## 5-Minute Setup

```tsx
import {
  StickyDataTable,
  type ColumnConfig,
} from '@/modules/design-system/v2/components/ui/prod/data/sticky-data-table'

// 1. Define columns
const columns: ColumnConfig[] = [
  { key: 'id', width: 60, align: 'left', isSticky: true },
  { key: 'name', width: 200, align: 'left' },
]

// 2. Define labels
const columnLabels = { id: 'ID', name: 'Name' }

// 3. Render
<StickyDataTable
  data={data}
  columns={columns}
  columnLabels={columnLabels}
  renderCell={(key, row) => row[key]}
/>
```

See [Basic Usage](./basic-usage.md) for the complete walkthrough.

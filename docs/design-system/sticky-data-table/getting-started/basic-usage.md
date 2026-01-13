# Basic Usage

Step-by-step guide to setting up your first StickyDataTable.

## Overview

Creating a StickyDataTable requires four steps:
1. Define columns
2. Define column labels
3. Create a cell renderer
4. Render the component

## Basic Example

```tsx
import {
  StickyDataTable,
  type ColumnConfig,
} from '@/modules/design-system/v2/components/ui/prod/data/sticky-data-table'

interface User {
  id: string
  name: string
  email: string
  amount: number
}

// Step 1: Define columns
const columns: ColumnConfig[] = [
  { key: 'id', width: 60, align: 'left', isSticky: true },
  { key: 'name', width: 200, align: 'left', isSticky: true },
  { key: 'email', width: 250, align: 'left' },
  { key: 'amount', width: 120, align: 'right', sortable: true },
]

// Step 2: Define labels
const columnLabels: Record<string, string> = {
  id: 'ID',
  name: 'Name',
  email: 'Email',
  amount: 'Amount',
}

// Step 3: Create cell renderer
const renderCell = (columnKey: string, row: User, index: number) => {
  switch (columnKey) {
    case 'id':
      return <span className="text-xs font-mono text-tertiary">{row.id}</span>
    case 'name':
      return <span className="text-sm text-primary">{row.name}</span>
    case 'email':
      return <span className="text-sm text-primary">{row.email}</span>
    case 'amount':
      return <span className="text-sm text-primary">${row.amount.toFixed(2)}</span>
    default:
      return null
  }
}

// Step 4: Render
function UsersTable({ users }: { users: User[] }) {
  return (
    <StickyDataTable<User>
      data={users}
      columns={columns}
      columnLabels={columnLabels}
      renderCell={renderCell}
    />
  )
}
```

## TypeScript Support

The component uses generics for type safety:

```tsx
interface User {
  id: string
  name: string
  email: string
  amount: number
}

<StickyDataTable<User>
  data={users}
  columns={columns}
  columnLabels={columnLabels}
  renderCell={(key, row, index) => {
    // TypeScript knows `row` is User
    return row.name
  }}
/>
```

**Note**: Your data type must extend `Record<string, unknown>`.

## Using Default Configuration

For production tables, use the JAN2 defaults:

```tsx
import {
  StickyDataTable,
  getDefaultTableProps,
} from '@/modules/design-system/v2/components/ui/prod/data/sticky-data-table'

<StickyDataTable
  {...getDefaultTableProps()}
  data={data}
  columns={columns}
  columnLabels={columnLabels}
  renderCell={renderCell}
/>
```

## Row Click Handler

Handle row clicks for navigation or selection:

```tsx
<StickyDataTable
  data={users}
  columns={columns}
  columnLabels={columnLabels}
  renderCell={renderCell}
  onRowClick={(row, index) => {
    router.push(`/users/${row.id}`)
  }}
/>
```

## Custom Dimensions

Override default dimensions as needed:

```tsx
<StickyDataTable
  data={data}
  columns={columns}
  columnLabels={columnLabels}
  renderCell={renderCell}
  borderRadius={16}      // Default: 20
  rowHeight={52}         // Default: 46
  headerHeight={48}      // Default: 48
/>
```

## Column Visibility Control

The column control panel is shown by default:

```tsx
// Show column control (default)
<StickyDataTable showColumnControl={true} />

// Hide column control
<StickyDataTable showColumnControl={false} />

// Set default hidden columns
<StickyDataTable defaultHiddenColumns={['email', 'phone']} />

// Or explicitly set visible columns
<StickyDataTable defaultVisibleColumns={['id', 'name', 'amount']} />
```

## Column Groups

Organize columns in the dropdown:

```tsx
<StickyDataTable
  columnGroups={[
    { label: 'Basic Info', keys: ['id', 'name', 'email'] },
    { label: 'Financial', keys: ['amount', 'balance', 'status'] },
    { label: 'Dates', keys: ['createdAt', 'updatedAt'] },
  ]}
/>
```

## Common Patterns

### Simple Table

```tsx
<StickyDataTable
  data={products}
  columns={[
    { key: 'id', width: 60, align: 'left', isSticky: true },
    { key: 'name', width: 200, align: 'left', isSticky: true },
    { key: 'price', width: 100, align: 'right', sortable: true },
  ]}
  columnLabels={{ id: 'ID', name: 'Product', price: 'Price' }}
  renderCell={(key, row) => row[key]}
/>
```

### Table with Selection

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

## Related

- [Column Configuration](./column-config.md) - Detailed column options
- [Features](../features/init.md) - Advanced features
- [Props Reference](../api/props.md) - All component props

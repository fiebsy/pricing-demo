# Getting Started

Quick start guide for using StickyDataTable in your application.

## Installation

The component is part of the PAYVA V2 design system:

```tsx
import {
  StickyDataTable,
  type ColumnConfig,
} from '@/modules/design-system/v2/components/ui/custom/data/sticky-data-table'
```

---

## Basic Setup

### Step 1: Define Columns

Create a `ColumnConfig[]` array defining your table structure:

```tsx
const columns: ColumnConfig[] = [
  {
    key: 'id',
    width: 60,
    align: 'left',
    isSticky: true,        // Stays fixed during horizontal scroll
  },
  {
    key: 'name',
    width: 200,
    align: 'left',
    isSticky: true,
  },
  {
    key: 'email',
    width: 250,
    align: 'left',
  },
  {
    key: 'amount',
    width: 120,
    align: 'right',
    sortable: true,        // Enables column sorting
  },
]
```

### Step 2: Define Column Labels

Map column keys to display labels:

```tsx
const columnLabels: Record<string, string> = {
  id: 'ID',
  name: 'Name',
  email: 'Email',
  amount: 'Amount',
}
```

### Step 3: Create Cell Renderer

Define how each cell renders based on column key:

```tsx
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
```

### Step 4: Render the Table

```tsx
<StickyDataTable
  data={users}
  columns={columns}
  columnLabels={columnLabels}
  renderCell={renderCell}
/>
```

---

## Column Configuration Options

### Basic Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `key` | `string` | Yes | Unique column identifier |
| `width` | `number` | Yes | Column width in pixels |
| `align` | `'left' \| 'center' \| 'right'` | Yes | Text alignment |
| `isSticky` | `boolean` | No | Fixed during horizontal scroll |
| `sortable` | `boolean` | No | Enable column sorting |

### Flexible Width Properties

| Property | Type | Description |
|----------|------|-------------|
| `minWidth` | `number` | Minimum width constraint |
| `maxWidth` | `number` | Maximum width constraint |
| `flexRatio` | `number` | Proportional growth (default: 1) |

### Text Display Properties

| Property | Type | Description |
|----------|------|-------------|
| `allowTextWrap` | `boolean` | Allow multi-line text |
| `maxLines` | `number` | Max lines before truncation |
| `useTabularNums` | `boolean` | Equal-width digits (default: true) |

---

## Sticky Columns

Sticky columns remain visible during horizontal scroll. The component **automatically calculates** sticky offsets - you don't need to manually set `stickyLeft`:

```tsx
const columns: ColumnConfig[] = [
  // First sticky column
  { key: 'id', width: 60, align: 'left', isSticky: true },
  // Second sticky - offset calculated automatically
  { key: 'name', width: 200, align: 'left', isSticky: true },
  // Non-sticky columns
  { key: 'email', width: 250, align: 'left' },
]
```

> **Note**: Sticky columns must be defined first in the columns array.

---

## Sortable Columns

Enable sorting with `sortable: true`. Clicking headers toggles between ascending and descending:

```tsx
{
  key: 'amount',
  width: 120,
  align: 'right',
  sortable: true,
}
```

### Client-Side Sorting (Default)

The component handles sorting automatically for loaded data.

### Server-Side Sorting

For paginated data, use server-side sorting:

```tsx
<StickyDataTable
  data={data}
  columns={columns}
  columnLabels={columnLabels}
  renderCell={renderCell}
  // Enable server-side sorting
  serverSideSort={true}
  serverSortColumn={sortColumn}
  serverSortDirection={sortDirection}
  onServerSort={(column, direction) => {
    // Trigger API refetch with new sort params
    setSortColumn(column)
    setSortDirection(direction)
  }}
/>
```

---

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

---

## Column Control Panel

By default, a column visibility control appears in the toolbar. Users can toggle columns on/off:

```tsx
// Show column control (default)
<StickyDataTable showColumnControl={true} />

// Hide column control
<StickyDataTable showColumnControl={false} />
```

### Default Hidden/Visible Columns

Control initial column visibility:

```tsx
// Hide specific columns by default
<StickyDataTable
  defaultHiddenColumns={['email', 'phone']}
/>

// Or explicitly set visible columns (takes precedence)
<StickyDataTable
  defaultVisibleColumns={['id', 'name', 'amount', 'status']}
/>
```

### Column Groups

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

---

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

> **Note**: Your data type must extend `Record<string, unknown>`.

---

## Common Patterns

### Basic Table with Sticky Columns

```tsx
<StickyDataTable
  data={products}
  columns={[
    { key: 'id', width: 60, align: 'left', isSticky: true },
    { key: 'name', width: 200, align: 'left', isSticky: true },
    { key: 'price', width: 100, align: 'right', sortable: true },
    { key: 'stock', width: 80, align: 'center' },
  ]}
  columnLabels={{ id: 'ID', name: 'Product', price: 'Price', stock: 'Stock' }}
  renderCell={(key, row) => row[key]}
/>
```

### Custom Border Radius

```tsx
<StickyDataTable
  borderRadius={16}  // Default is 20
  // ... other props
/>
```

### Custom Row Height

```tsx
<StickyDataTable
  rowHeight={52}      // Default is 46
  headerHeight={56}   // Default is 48
  // ... other props
/>
```

---

## Next Steps

- [Architecture](./ARCHITECTURE.md) - Understand hooks and state management
- [Features](./FEATURES.md) - Selection, infinite scroll, filtering
- [Styling](./STYLING.md) - Customize borders, backgrounds, animations
- [API Reference](./API-REFERENCE.md) - Complete props and types documentation

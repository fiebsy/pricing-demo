# Getting Started with StickyDataTable (ARCHIVED)

> **⚠️ DEPRECATED**: This documentation is archived. See [../GETTING-STARTED.md](../GETTING-STARTED.md) for current getting started guide.

---

A quick start guide to using the StickyDataTable component in your application.

## Installation

The component is part of the PAYVA design system. Import it from:

```tsx
import { StickyDataTable, type ColumnConfig } from '@/modules/design-system/v2/components/ui/custom/data/sticky-data-table'
```

## Basic Usage

### Step 1: Define Your Columns

Create a `ColumnConfig[]` array defining your table structure:

```tsx
const columns: ColumnConfig[] = [
  {
    key: 'id',
    width: 60,
    align: 'left',
    isSticky: true,
    stickyLeft: 0,
  },
  {
    key: 'name',
    width: 200,
    align: 'left',
    isSticky: true,
    stickyLeft: 60, // Sum of previous sticky column widths
  },
  {
    key: 'email',
    width: 250,
    align: 'left',
  },
  {
    key: 'status',
    width: 120,
    align: 'center',
    sortable: true, // Enables sorting
  },
]
```

### Step 2: Define Column Labels

Create a mapping of column keys to display labels:

```tsx
const columnLabels = {
  id: 'ID',
  name: 'Name',
  email: 'Email',
  status: 'Status',
}
```

### Step 3: Create a Render Function

Define how each cell should be rendered:

```tsx
const renderCell = (columnKey: string, row: User, index: number) => {
  switch (columnKey) {
    case 'id':
      return index + 1
    case 'name':
      return row.name
    case 'email':
      return row.email
    case 'status':
      return <StatusBadge status={row.status} />
    default:
      return null
  }
}
```

### Step 4: Use the Component

```tsx
<StickyDataTable data={users} columns={columns} columnLabels={columnLabels} renderCell={renderCell} />
```

## Column Configuration

### Basic Column Properties

- **`key`** (required): Unique identifier for the column
- **`width`** (required): Column width in pixels (used as default/minimum)
- **`align`** (required): Text alignment (`'left' | 'center' | 'right'`)
- **`isSticky`** (optional): Whether column stays fixed when scrolling
- **`stickyLeft`** (optional): Offset for sticky positioning (sum of previous sticky widths)
- **`sortable`** (optional): Whether column can be sorted

### Sticky Columns

To make columns sticky (remain visible while scrolling):

```tsx
{
  key: 'rank',
  width: 48,
  align: 'left',
  isSticky: true,
  stickyLeft: 0, // First sticky column
},
{
  key: 'name',
  width: 180,
  align: 'left',
  isSticky: true,
  stickyLeft: 48, // Sum of previous sticky widths (48)
},
```

**Important:** `stickyLeft` must be the cumulative sum of all previous sticky column widths.

### Sortable Columns

Enable sorting by adding `sortable: true`:

```tsx
{
  key: 'price',
  width: 100,
  align: 'right',
  sortable: true, // Click header to sort
}
```

Clicking the column header will toggle between ascending, descending, and unsorted states.

## Dynamic Column Widths

### Minimum and Maximum Widths

Control column flexibility with `minWidth` and `maxWidth`:

```tsx
{
  key: 'description',
  width: 200, // Default/minimum width
  minWidth: 150, // Minimum constraint
  maxWidth: 400, // Maximum constraint
  align: 'left',
}
```

### Proportional Flexible Columns

Use `flexRatio` to control how scrollable columns share space:

```tsx
{
  key: 'description',
  width: 200,
  minWidth: 150,
  flexRatio: 2, // Gets 2x more space than columns with flexRatio: 1
  align: 'left',
},
{
  key: 'price',
  width: 100,
  flexRatio: 1, // Normal growth
  align: 'right',
}
```

## Common Patterns

### Basic Table with Sticky Columns

```tsx
const columns: ColumnConfig[] = [
  { key: 'rank', width: 48, align: 'left', isSticky: true, stickyLeft: 0 },
  { key: 'name', width: 180, align: 'left', isSticky: true, stickyLeft: 48 },
  { key: 'price', width: 100, align: 'right', sortable: true },
  { key: 'status', width: 120, align: 'center' },
]

<StickyDataTable
  data={products}
  columns={columns}
  columnLabels={{ rank: '#', name: 'Name', price: 'Price', status: 'Status' }}
  renderCell={renderCell}
/>
```

### Table with Row Click Handler

```tsx
<StickyDataTable
  data={products}
  columns={columns}
  columnLabels={columnLabels}
  renderCell={renderCell}
  onRowClick={(product, index) => {
    router.push(`/products/${product.id}`)
  }}
/>
```

### Hide Column Control Panel

```tsx
<StickyDataTable
  data={data}
  columns={columns}
  columnLabels={columnLabels}
  renderCell={renderCell}
  showColumnControl={false} // Hide column visibility toggle
/>
```

### Custom Border Radius

```tsx
<StickyDataTable
  data={data}
  columns={columns}
  columnLabels={columnLabels}
  renderCell={renderCell}
  borderRadius={16} // Custom border radius (default: 20px)
/>
```

## TypeScript Support

The component uses TypeScript generics for type safety:

```tsx
interface User {
  id: string
  name: string
  email: string
  status: 'active' | 'inactive'
}

;<StickyDataTable<User>
  data={users}
  columns={columns}
  columnLabels={columnLabels}
  renderCell={(key, user, index) => {
    // TypeScript knows 'user' is of type User
    return user.name
  }}
/>
```

## Next Steps

- Learn about [API Reference](../docs/api-reference.md) for complete prop documentation
- Explore [Styling & Customization](../docs/styling.md) for visual customization
- Check [Advanced Usage](../docs/advanced.md) for architecture and performance tips

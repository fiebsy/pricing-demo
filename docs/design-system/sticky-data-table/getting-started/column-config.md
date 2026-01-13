# Column Configuration

Complete guide to configuring columns in StickyDataTable.

## Overview

Columns are defined using the `ColumnConfig` interface. Each column specifies width, alignment, and behavior.

## Basic Column Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `key` | `string` | Yes | Unique column identifier |
| `width` | `number` | Yes | Column width in pixels |
| `align` | `'left' \| 'center' \| 'right'` | Yes | Text alignment |
| `isSticky` | `boolean` | No | Fixed during horizontal scroll |
| `sortable` | `boolean` | No | Enable column sorting |

## Basic Example

```tsx
const columns: ColumnConfig[] = [
  { key: 'id', width: 60, align: 'left' },
  { key: 'name', width: 200, align: 'left' },
  { key: 'amount', width: 120, align: 'right' },
]
```

## Sticky Columns

Sticky columns remain visible during horizontal scroll:

```tsx
const columns: ColumnConfig[] = [
  { key: 'id', width: 60, align: 'left', isSticky: true },
  { key: 'name', width: 200, align: 'left', isSticky: true },
  { key: 'email', width: 250, align: 'left' },  // Non-sticky
]
```

**Important**:
- Sticky columns must be defined first in the array
- Sticky offsets are calculated automatically
- You don't need to set `stickyLeft` manually

## Sortable Columns

Enable sorting with `sortable: true`:

```tsx
{
  key: 'amount',
  width: 120,
  align: 'right',
  sortable: true,  // Click header to sort
}
```

Clicking the header toggles between ascending and descending order.

## Flexible Width Properties

For responsive column sizing:

| Property | Type | Description |
|----------|------|-------------|
| `minWidth` | `number` | Minimum width constraint |
| `maxWidth` | `number` | Maximum width constraint |
| `flexRatio` | `number` | Proportional growth (default: 1) |

```tsx
{
  key: 'description',
  width: 200,
  align: 'left',
  minWidth: 150,
  maxWidth: 400,
  flexRatio: 2,  // Takes 2x space when expanding
}
```

## Text Display Properties

Control text wrapping and truncation:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `allowTextWrap` | `boolean` | `false` | Allow multi-line text |
| `maxLines` | `number` | undefined | Max lines before truncation |
| `useTabularNums` | `boolean` | `true` | Equal-width digits |

### Single Line with Truncation (Default)

```tsx
{ key: 'name', width: 200, align: 'left' }
// Text truncates with "..." when too long
```

### Multi-Line with Line Limit

```tsx
{
  key: 'description',
  width: 300,
  align: 'left',
  maxLines: 2,  // Max 2 lines, then truncate
}
```

### Unlimited Wrapping

```tsx
{
  key: 'notes',
  width: 300,
  align: 'left',
  allowTextWrap: true,  // No truncation
}
```

### Tabular Numbers

For numeric columns (amounts, counts):

```tsx
// Numeric column - keep default (true)
{ key: 'amount', width: 120, align: 'right' }

// Text column - disable
{ key: 'name', width: 200, align: 'left', useTabularNums: false }
```

## Typography Rules

When implementing `renderCell`, follow these guidelines:

| Content Type | CSS Classes |
|--------------|-------------|
| Body text | `text-sm font-normal text-primary` |
| Descriptions | `text-xs font-normal text-secondary` |
| Status codes/IDs | `text-xs font-mono text-tertiary` |

**Avoid**:
- Bold text (`font-bold`, `font-semibold`)
- Decorative colors (`text-blue-500`)
- Arbitrary font sizes (`text-[13px]`)

## ComputedColumn Type

Internally, columns are enhanced with computed properties:

```tsx
interface ComputedColumn extends ColumnConfig {
  computedStickyLeft: number   // Calculated sticky offset
  index: number                // Position in visible columns
  isFirst: boolean             // First visible column
  isLast: boolean              // Last visible column
  isLastSticky: boolean        // Last sticky column
  isFirstSticky: boolean       // First sticky column
}
```

You typically don't need to use `ComputedColumn` directly - it's used internally.

## Complete Example

```tsx
const columns: ColumnConfig[] = [
  // Sticky columns (must be first)
  {
    key: 'id',
    width: 60,
    align: 'left',
    isSticky: true,
    useTabularNums: false,  // ID is text, not numbers
  },
  {
    key: 'name',
    width: 200,
    align: 'left',
    isSticky: true,
    useTabularNums: false,
  },

  // Scrollable columns
  {
    key: 'email',
    width: 250,
    align: 'left',
    useTabularNums: false,
  },
  {
    key: 'description',
    width: 300,
    align: 'left',
    maxLines: 2,
    useTabularNums: false,
  },
  {
    key: 'amount',
    width: 120,
    align: 'right',
    sortable: true,
    // useTabularNums: true (default)
  },
  {
    key: 'status',
    width: 100,
    align: 'center',
    sortable: true,
    useTabularNums: false,
  },
]
```

## Related

- [Basic Usage](./basic-usage.md) - Get started with examples
- [Sorting](../features/sorting.md) - Sorting configuration
- [Types Reference](../api/types.md) - Full type definitions

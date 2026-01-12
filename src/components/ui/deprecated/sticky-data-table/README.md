<<<<<<< HEAD
# StickyDataTable V2

A high-performance, feature-rich data table with sticky columns, sticky header, sorting, selection, and dynamic column visibility.

## ✨ What's New in V2

### Performance Improvements

- **Memoized Components** - All major components use `React.memo` with custom comparison functions
- **Consolidated State** - Reduced prop drilling with better state organization
- **RAF-Throttled Scroll Sync** - Smooth scroll synchronization without janky re-renders
- **Optimized Grid Calculations** - Memoized grid template generation

### Architecture Improvements

- **Cleaner File Structure** - Logical separation of concerns
- **Context Support** - Optional React Context for deep component trees
- **Modular Hooks** - Composable hooks for custom implementations
- **Better TypeScript** - Improved type definitions and inference

### Documentation

- **Inline JSDoc** - Every function and component is documented
- **Module Organization** - Clear module boundaries
- **Usage Examples** - Practical code examples

## 📁 File Structure

```
sticky-data-table/
├── index.tsx              # Main component & exports
├── types.ts               # TypeScript type definitions
├── config.ts              # Configuration constants
├── README.md              # This file
│
├── docs/
│   ├── STYLING-GUIDE.md   # ⚠️ CRITICAL: Font/color rules (READ FIRST)
│   └── layout-synchronization.md  # Skeleton sync documentation
│
├── components/
│   ├── index.ts           # Component exports
│   ├── table-cell.tsx     # Memoized cell component
│   ├── table-row.tsx      # Memoized row component
│   ├── table-header.tsx   # Header with sort controls
│   ├── table-body.tsx     # Body container
│   ├── sticky-header-wrapper.tsx  # Sticky header section
│   ├── navigation-arrow.tsx       # Single arrow button
│   ├── navigation-arrows.tsx      # Arrow pair container
│   ├── gradient-overlay.tsx       # Scroll indicator
│   └── column-control-panel.tsx   # Column visibility dropdown
│
├── hooks/
│   ├── index.ts              # Hook exports
│   ├── use-scroll-sync.ts    # Synchronized scrolling
│   ├── use-columns.ts        # Column visibility
│   ├── use-sort.ts           # Sorting state
│   ├── use-selection.ts      # Row selection
│   ├── use-wheel-redirect.ts # Vertical scroll redirect
│   └── use-arrow-position.ts # Arrow positioning
│
├── utils/
│   ├── index.ts          # Utility exports
│   ├── grid.ts           # Grid template generation
│   └── styles.ts         # Style utilities
│
└── context/
    └── table-context.tsx  # React Context (optional)
```
=======
# StickyDataTable Component

A generic, reusable data table component with sticky columns, dynamic column visibility, configurable styling, and smooth scrolling capabilities. Built for the PAYVA platform design system.

## ✨ Features

- **Sticky Columns** - Configurable sticky columns that remain fixed while scrolling horizontally
- **Dynamic Column Visibility** - Toggle column visibility via dropdown control panel with smooth animations
- **Column Sorting** - Click column headers to sort (for sortable columns)
- **Smooth Scrolling** - Navigation arrows appear when content overflows, mouse wheel support
- **Sticky Header** - Header remains visible while scrolling vertically
- **Fully Customizable** - Granular control over borders, backgrounds, and styling
- **Generic Data Support** - Works with any data type via TypeScript generics
- **Custom Cell Rendering** - Flexible cell content via render functions
- **Responsive Design** - Adapts to different screen sizes with proper overflow handling

## 📚 Documentation

Complete documentation is available in the [`docs/`](./docs/) folder:

- **[Getting Started](./docs/getting-started.md)** - Quick start guide and basic usage examples
- **[API Reference](./docs/api-reference.md)** - Complete API documentation for props, types, and configuration
- **[Styling & Customization](./docs/styling.md)** - Border system, backgrounds, animations, and visual customization
- **[Advanced Usage](./docs/advanced.md)** - Architecture, state management, performance considerations
- **[Troubleshooting](./docs/troubleshooting.md)** - Common issues, solutions, and best practices
>>>>>>> origin/payva-2.0

## 🚀 Quick Start

```tsx
import { StickyDataTable, type ColumnConfig } from '@/modules/design-system/v2/components/ui/custom/data/sticky-data-table'

<<<<<<< HEAD
// Define columns
const columns: ColumnConfig[] = [
  { key: 'id', width: 60, align: 'left', isSticky: true },
  { key: 'name', width: 200, align: 'left', isSticky: true, sortable: true },
  { key: 'amount', width: 120, align: 'right', sortable: true },
  { key: 'date', width: 150, align: 'left' },
  { key: 'status', width: 100, align: 'center' },
]

// Column labels
const columnLabels = {
  id: 'ID',
  name: 'Name',
  amount: 'Amount',
  date: 'Date',
  status: 'Status',
}

// Render function
const renderCell = (key: string, row: DataType, index: number) => {
  switch (key) {
    case 'amount':
      return `$${row.amount.toFixed(2)}`
    default:
      return row[key]
  }
}

// Usage
;<StickyDataTable data={myData} columns={columns} columnLabels={columnLabels} renderCell={renderCell} onRowClick={(row) => console.log('Clicked:', row)} />
```

## ⚠️ Cell Rendering Guidelines

> **MANDATORY**: Follow these rules for ALL `renderCell` implementations.

### Typography Defaults

```tsx
// Standard text cell
case 'name':
  return <span className="text-sm font-normal text-primary">{row.name}</span>

// Description/subtext
case 'description':
  return <span className="text-xs font-normal text-secondary">{row.description}</span>

// Status codes, IDs, technical values
case 'id':
  return <span className="text-xs font-mono text-tertiary">{row.id}</span>
```

### Status Indicators - Use Badge Component

```tsx
import { Badge } from '@/modules/design-system/v2/components/ui/untitled-ui/base/badge'

case 'status':
  return (
    <Badge variant={row.status === 'active' ? 'success' : 'gray'} size="sm">
      {row.status}
    </Badge>
  )
```

### Cell with Multiple Lines

```tsx
case 'product':
  return (
    <div className="flex flex-col">
      <span className="text-sm font-normal text-primary">{row.productName}</span>
      <span className="text-xs font-normal text-secondary">{row.sku}</span>
    </div>
  )
```

### ❌ Patterns to AVOID

```tsx
// Wrong: Bold text
<span className="font-bold">{value}</span>

// Wrong: Decorative colors
<span className="text-blue-500">{value}</span>

// Wrong: Arbitrary font sizes
<span className="text-[13px]">{value}</span>

// Wrong: Custom status styling
<div className="bg-green-100 text-green-700 rounded-full px-2">{status}</div>
```

**📖 Complete styling documentation: [STYLING-GUIDE.md](./docs/STYLING-GUIDE.md)**

## 🎯 Core Features

### Sticky Columns

Columns marked with `isSticky: true` remain fixed while scrolling horizontally.

```tsx
const columns: ColumnConfig[] = [
  { key: 'id', width: 60, align: 'left', isSticky: true },
  { key: 'name', width: 200, align: 'left', isSticky: true },
  // Non-sticky columns scroll normally
  { key: 'email', width: 250, align: 'left' },
]
```

**Important:** Sticky offsets are automatically calculated. The first sticky column is at position 0, the second at the width of the first, etc.

### Column Sorting

Mark columns as sortable to enable click-to-sort:

```tsx
{ key: 'amount', width: 120, align: 'right', sortable: true }
```

- First click: Sort descending
- Second click: Sort ascending
- Click different column: Reset to descending

### Row Selection

Enable checkbox selection with:

```tsx
<StickyDataTable
  enableSelection={true}
  getRowId={(row, index) => row.id}
  // ... other props
/>
```

### Column Visibility

Users can toggle columns via the control panel (enabled by default):

```tsx
<StickyDataTable
  showColumnControl={true} // Default: true
  defaultHiddenColumns={['internalId', 'metadata']}
  // ... other props
/>
```

## ⚙️ Configuration

### Border Configuration

```tsx
import { DEFAULT_BORDER_CONFIG, type BorderConfig } from './sticky-data-table'
=======
// Define your columns
const columns: ColumnConfig[] = [
  {
    key: 'rank',
    width: 48,
    align: 'left',
    isSticky: true,
    stickyLeft: 0,
  },
  {
    key: 'name',
    width: 180,
    align: 'left',
    isSticky: true,
    stickyLeft: 48,
  },
  {
    key: 'price',
    width: 100,
    align: 'right',
    sortable: true,
  },
]

// Define column labels
const columnLabels = {
  rank: '#',
  name: 'Name',
  price: 'Price',
}

// Render function for cells
const renderCell = (columnKey: string, row: any, index: number) => {
  switch (columnKey) {
    case 'rank':
      return index + 1
    case 'name':
      return row.name
    case 'price':
      return `$${row.price.toFixed(2)}`
    default:
      return null
  }
}

// Use the component
;<StickyDataTable data={myData} columns={columns} columnLabels={columnLabels} renderCell={renderCell} />
```

## 📖 Basic Usage

### Column Configuration

```tsx
const columns: ColumnConfig[] = [
  {
    key: 'id', // Unique identifier
    width: 60, // Column width in pixels
    align: 'left', // Text alignment
    isSticky: true, // Make column sticky
    stickyLeft: 0, // Offset (sum of previous sticky widths)
    sortable: true, // Enable sorting
  },
]
```

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
  stickyLeft: 48, // Sum of previous sticky widths
}
```

**Important:** `stickyLeft` must be the cumulative sum of all previous sticky column widths.

### Dynamic Column Widths

Control column flexibility with `minWidth`, `maxWidth`, and `flexRatio`:

```tsx
{
  key: 'description',
  width: 200,        // Default/minimum width
  minWidth: 150,     // Minimum constraint
  maxWidth: 400,     // Maximum constraint
  flexRatio: 2,      // Gets 2x more space than columns with flexRatio: 1
  align: 'left',
}
```

## 🎨 Customization

### Custom Borders

```tsx
import { DEFAULT_BORDER_CONFIG, type BorderConfig } from '@/modules/design-system/v2/components/ui/custom/data/sticky-data-table'
>>>>>>> origin/payva-2.0

const customBorderConfig: Partial<BorderConfig> = {
  outerColor: 'border-secondary',
  showRows: false,
<<<<<<< HEAD
  hideCellBordersForColumns: ['id'],
=======
  hideCellBordersForColumns: ['rank'],
>>>>>>> origin/payva-2.0
}

<StickyDataTable
  borderConfig={customBorderConfig}
<<<<<<< HEAD
  // ...
/>
```

### Background Configuration

```tsx
import { DEFAULT_BACKGROUND_CONFIG, type BackgroundConfig } from './sticky-data-table'

const customBackgroundConfig: Partial<BackgroundConfig> = {
  headerContainer: 'bg-primary',
  rowHover: 'bg-tertiary',
=======
  // ... other props
/>
```

### Custom Backgrounds

```tsx
import { DEFAULT_BACKGROUND_CONFIG, type BackgroundConfig } from '@/modules/design-system/v2/components/ui/custom/data/sticky-data-table'

const customBackgroundConfig: Partial<BackgroundConfig> = {
  headerStickyCell: 'bg-primary',
  headerStickyCellWithArrows: 'bg-primary/90',
>>>>>>> origin/payva-2.0
}

<StickyDataTable
  backgroundConfig={customBackgroundConfig}
<<<<<<< HEAD
  // ...
/>
```

## 🔧 Advanced Usage

### Using Individual Hooks

For custom implementations, you can use the hooks directly:

```tsx
import { useColumns, useScrollSync, useSelection, useSort } from './sticky-data-table'

function CustomTable({ data, columns }) {
  const headerRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  const { canScrollLeft, canScrollRight, handleScrollLeft, handleScrollRight } = useScrollSync({ headerRef, bodyRef })

  const { stickyColumns, scrollableColumns, toggleColumn } = useColumns({ columns })

  const { sortColumn, sortDirection, sortedData, handleSort } = useSort({ data })

  // Build your custom UI...
}
```

### Using React Context

For deeply nested components, use the context provider:

```tsx
import { TableProvider, useScrollContext, useTableContext } from './sticky-data-table'

// In a child component
function CustomCell() {
  const { stickyState, borderConfig } = useTableContext()
  // Use context values...
}
```

## 📊 Column Configuration Reference

```tsx
interface ColumnConfig {
  key: string // Unique identifier
  width: number // Width in pixels
  align: 'left' | 'center' | 'right'
  isSticky?: boolean // Fixed during horizontal scroll
  stickyLeft?: number // Auto-calculated if not provided
  sortable?: boolean // Enable sorting
  minWidth?: number // Minimum width (defaults to width)
  maxWidth?: number // Maximum width (enables flexible sizing)
  flexRatio?: number // fr unit ratio for flexible columns
  allowTextWrap?: boolean // Allow text wrapping in cells
  useTabularNums?: boolean // Enable tabular numbers (default: false)
}
```

## 🔢 Tabular Numbers

Tabular numbers (`tabular-nums`) ensure digits have equal widths for proper column alignment. **Disabled by default** - enable for numeric columns:

```tsx
// Enable for amount column
{ key: 'amount', width: 120, align: 'right', useTabularNums: true }
```

```
With tabular-nums:           Without (default):
$1,234.56                    $1,234.56
$   99.99                    $99.99
$  123.45                    $123.45
    ↑ aligned                    ↑ ragged
```

## 🎨 Styling

> **⚠️ CRITICAL: Read the [STYLING-GUIDE.md](./docs/STYLING-GUIDE.md) before implementing any cell rendering logic.**

### Quick Reference - Typography Rules

| Use Case | Class | Notes |
|----------|-------|-------|
| **Body text** | `text-sm font-normal text-primary` | Default for all cells |
| **Descriptions** | `text-xs font-normal text-secondary` | Secondary info, metadata |
| **Headers** | `text-xs font-medium text-tertiary` | Column headers only |
| **Status codes** | `text-xs font-mono text-tertiary` | IDs, codes, technical values |

### Quick Reference - Forbidden Patterns

```tsx
// ❌ NEVER: Bold text, arbitrary sizes, decorative colors
<span className="font-bold text-lg text-blue-500">{value}</span>

// ✅ ALWAYS: Normal weight, semantic sizes, semantic colors
<span className="text-sm font-normal text-primary">{value}</span>
```

### Required Components

**Always use Untitled UI components** for interactive elements:
- `Badge` - Status indicators (NOT custom colored spans)
- `Checkbox` - Selection (NOT native inputs)
- `Button` - Actions (NOT custom styled buttons)

### Semantic Design Tokens

The component uses semantic design tokens for theming:

- `text-primary`, `text-secondary`, `text-tertiary` for text
- `bg-primary`, `bg-secondary` for backgrounds
- `border-primary`, `border-secondary` for borders

All styles adapt automatically to light/dark mode.

**📖 Full styling documentation: [STYLING-GUIDE.md](./docs/STYLING-GUIDE.md)**

## 💀 Skeleton Loaders

Skeleton loaders provide visual feedback during data fetching, preventing layout shift and improving perceived performance. When implementing skeletons for `StickyDataTable`, **all dimensions must match exactly** to prevent Cumulative Layout Shift (CLS).

**Quick Start:**

```tsx
import { TABLE_CONFIG, TableSkeleton } from '@/modules/design-system/v2/components/ui/custom/data/sticky-data-table'

{
  isLoading ? <TableSkeleton columns={columns} skeletonRowCount={10} showToolbar={true} /> : <StickyDataTable data={data} columns={columns} />
}
```

### Critical Requirements

**⚠️ Zero Layout Shift:** Skeleton loaders must match the exact dimensions of the real table:

- Toolbar height (if present)
- Header gap (`TABLE_CONFIG.HEADER_GAP`)
- Header row height (`TABLE_CONFIG.HEADER_HEIGHT`)
- Row height (`TABLE_CONFIG.ROW_HEIGHT`)
- Column widths (must match `columns` configuration)

### Fixed Height Constants

Use these constants from `TABLE_CONFIG` to ensure perfect alignment:

```tsx
import { TABLE_CONFIG } from '@/modules/design-system/v2/components/ui/custom/data/sticky-data-table'

const {
  HEADER_GAP, // 12px - Gap above sticky header (NOT included in height calculations)
  HEADER_HEIGHT, // 48px - Fixed header row height
  ROW_HEIGHT, // 46px - Fixed body row height
  TOOLBAR_HEIGHT, // 40px - Fixed toolbar height (matches button height + spacing)
  TOOLBAR_MARGIN, // 16px - Margin below toolbar (matches mb-4)
} = TABLE_CONFIG

// Toolbar total height (if present)
const TOOLBAR_TOTAL_HEIGHT = TOOLBAR_HEIGHT + TOOLBAR_MARGIN // 56px
```

**Important:** Always use `TABLE_CONFIG` constants directly. Don't hardcode values - they may change and the config is the single source of truth.

### Using the Built-in Component

The `TableSkeleton` component is included with `StickyDataTable` and handles all dimension matching automatically:

```tsx
import { TableSkeleton, LoadMoreSkeleton } from '@/modules/design-system/v2/components/ui/custom/data/sticky-data-table'

// Full table skeleton (page load)
<TableSkeleton
  columns={columns}
  skeletonRowCount={10}
  showToolbar={true}
  showLeftToolbar={false}
/>

// Load more skeleton (infinite scroll)
<LoadMoreSkeleton
  columns={columns}
  rowCount={5}
/>
```

### Custom Implementation Example

If you need a custom skeleton implementation, use this as a reference:

```tsx
import { Skeleton } from '@/modules/design-system/v2/components/ui/custom/base/skeleton'
import { TABLE_CONFIG } from '@/modules/design-system/v2/components/ui/custom/data/sticky-data-table'

// Calculate skeleton dimensions
const toolbarHeight = showToolbar ? 56 : 0 // 40px + 16px margin
const headerHeight = TABLE_CONFIG.HEADER_GAP + TABLE_CONFIG.HEADER_HEIGHT // 12px + 48px = 60px
const bodyHeight = skeletonRowCount * TABLE_CONFIG.ROW_HEIGHT // e.g., 10 rows × 56px = 560px
const totalHeight = toolbarHeight + headerHeight + bodyHeight

// Generate grid template matching table columns
function generateSkeletonGridTemplate(columns: ColumnConfig[]): string {
  return columns.map((col) => `${col.width}px`).join(' ')
}

// Skeleton Header Component
function SkeletonHeader({ columns, gridTemplate }: { columns: ColumnConfig[]; gridTemplate: string }) {
  return (
    <div
      className="bg-secondary_p1 sticky z-30"
      style={{
        top: TABLE_CONFIG.HEADER_GAP,
        height: TABLE_CONFIG.HEADER_HEIGHT,
      }}
    >
      {/* Header gap filler */}
      <div
        className="bg-secondary_p1 absolute"
        style={{
          top: -TABLE_CONFIG.HEADER_GAP,
          height: TABLE_CONFIG.HEADER_GAP,
          width: '100%',
        }}
      />

      {/* Header row */}
      <div
        className="grid w-full"
        style={{
          gridTemplateColumns: gridTemplate,
          height: TABLE_CONFIG.HEADER_HEIGHT,
        }}
      >
        {columns.map((col) => (
          <div key={col.key} className="flex items-center px-4">
            <Skeleton width={col.width - 32} height={20} />
          </div>
        ))}
      </div>
    </div>
  )
}

// Skeleton Row Component
function SkeletonRow({ columns, gridTemplate }: { columns: ColumnConfig[]; gridTemplate: string }) {
  return (
    <div
      className="border-tertiary grid w-fit min-w-full border-b"
      style={{
        gridTemplateColumns: gridTemplate,
        height: TABLE_CONFIG.ROW_HEIGHT,
      }}
    >
      {columns.map((col) => (
        <div key={col.key} className="flex items-center px-4">
          <Skeleton width={Math.max(col.width - 32, 60)} height={16} />
        </div>
      ))}
    </div>
  )
}

// Full Table Skeleton
function TableSkeleton({ columns, skeletonRowCount = 10, showToolbar = false }: { columns: ColumnConfig[]; skeletonRowCount?: number; showToolbar?: boolean }) {
  const gridTemplate = generateSkeletonGridTemplate(columns)
  const toolbarHeight = showToolbar ? 56 : 0
  const headerHeight = TABLE_CONFIG.HEADER_GAP + TABLE_CONFIG.HEADER_HEIGHT
  const bodyHeight = skeletonRowCount * TABLE_CONFIG.ROW_HEIGHT
  const totalHeight = toolbarHeight + headerHeight + bodyHeight

  return (
    <div className="border-primary bg-primary overflow-hidden rounded-[20px] border" style={{ height: totalHeight }}>
      {/* Toolbar Skeleton (if needed) */}
      {showToolbar && (
        <div className="mb-4 flex items-center justify-between px-4" style={{ height: 40 }}>
          <Skeleton width={120} height={40} />
          <div className="flex gap-2">
            <Skeleton width={100} height={40} />
            <Skeleton width={36} height={40} />
          </div>
        </div>
      )}

      {/* Header Skeleton */}
      <SkeletonHeader columns={columns} gridTemplate={gridTemplate} />

      {/* Body Skeleton */}
      <div className="overflow-x-auto overflow-y-hidden">
        {Array.from({ length: skeletonRowCount }).map((_, i) => (
          <SkeletonRow key={i} columns={columns} gridTemplate={gridTemplate} />
        ))}
      </div>
    </div>
  )
}
```

### Usage Pattern

```tsx
function MyTablePage() {
  const [data, setData] = useState<DataType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const columns: ColumnConfig[] = [
    /* ... */
  ]

  useEffect(() => {
    fetchData().then((result) => {
      setData(result)
      setIsLoading(false)
    })
  }, [])

  return (
    <div style={{ height: isLoading ? skeletonHeight : 'auto' }}>
      {isLoading ? (
        <TableSkeleton columns={columns} skeletonRowCount={10} showToolbar={true} />
      ) : (
        <StickyDataTable
          data={data}
          columns={columns}
          // ... other props
        />
      )}
    </div>
  )
}
```

### Best Practices

1. **Always use fixed heights** - Never use `auto` or `min-height` for skeleton containers
2. **Match column widths exactly** - Use the same `columns` array for skeleton grid template
3. **Include toolbar in skeleton** - If your table has a toolbar, include it in the skeleton
4. **Account for header gap** - The 12px gap above sticky header must be included
5. **Test layout shift** - Use browser DevTools Performance panel to verify CLS = 0
6. **Match row count** - Show skeleton rows matching expected initial data count

### Loading Scenarios

#### Page Load (Full Table Replacement)

```tsx
// Show full skeleton including header
{
  isLoading ? <TableSkeleton columns={columns} skeletonRowCount={10} showToolbar={true} /> : <StickyDataTable data={data} columns={columns} />
}
```

#### Load More / Infinite Scroll (Append Rows)

**✨ NEW: Unified `infiniteScroll` API (Recommended)**

The table now supports automatic skeleton generation via the `infiniteScroll` prop. This eliminates manual `LoadMoreSkeleton` configuration and ensures visual consistency:

```tsx
<StickyDataTable
  data={items}
  columns={columns}
  columnLabels={columnLabels}
  renderCell={renderCell}
  enableSelection={true}
  borderConfig={borderConfig}
  backgroundConfig={backgroundConfig}
  // ✨ Unified infinite scroll - auto-generates matching skeleton
  infiniteScroll={{
    hasNextPage,           // Whether more data is available
    isLoadingMore,         // Show skeleton when true
    onLoadMore,            // Callback to fetch next page
    skeletonRowCount: 10,  // Number of skeleton rows (default: 5)
    threshold: 200,        // Distance from bottom to trigger (default: 200)
=======
  // ... other props
/>
```

## 📁 Project Structure

```
sticky-data-table/
├── docs/                    # Documentation
│   ├── index.md            # Main documentation index
│   ├── getting-started.md  # Quick start guide
│   ├── api-reference.md    # API documentation
│   ├── styling.md          # Styling guide
│   ├── advanced.md         # Advanced usage
│   └── troubleshooting.md  # Troubleshooting guide
├── components/             # React components
├── hooks/                  # Custom React hooks
├── utils/                  # Utility functions
├── config.ts               # Configuration constants
├── types.ts                # TypeScript types
└── index.tsx               # Main component & exports
```

## 🎯 Key Concepts

### Sticky Columns

Keep important columns (like ID, name) visible while scrolling through wide tables. Supports multiple sticky columns with proper positioning.

### Dynamic Column Visibility

Users can toggle columns on/off via a dropdown control panel. Columns animate smoothly when added or removed.

### Column Sorting

Click any column header marked as `sortable: true` to sort data ascending/descending.

### CSS Grid Alignment

The table uses CSS Grid for perfect column alignment between header and body. The grid template is automatically generated and shared between header and body components.

## 🔧 TypeScript Support

The component uses TypeScript generics for type safety:

```tsx
interface User extends Record<string, any> {
  id: string
  name: string
  email: string
}

;<StickyDataTable<User>
  data={users}
  columns={columns}
  columnLabels={columnLabels}
  renderCell={(key, user, index) => {
    // TypeScript knows 'user' is of type User
    return user.name
>>>>>>> origin/payva-2.0
  }}
/>
```

<<<<<<< HEAD
**Key Benefits:**
- 🎯 **Zero Configuration** - Skeleton automatically matches table columns, borders, backgrounds
- 🔄 **Self-Contained** - Guards (`hasNextPage`, `isLoadingMore`) are handled internally
- 🎨 **Visual Consistency** - Same sticky column styling, borders, and spacing
- ⚡ **Less Boilerplate** - ~40 lines → ~5 lines of code

**`InfiniteScrollConfig` Interface:**

```typescript
interface InfiniteScrollConfig {
  hasNextPage: boolean        // Controls whether sentinel triggers onLoadMore
  isLoadingMore: boolean      // When true, shows skeleton rows
  onLoadMore: () => void | Promise<void>  // Callback to fetch data
  skeletonRowCount?: number   // Number of skeleton rows (default: 5)
  threshold?: number          // Pixels from bottom to trigger (default: 200)
  minimumLoadingDelay?: number  // Min delay to show skeleton (default: 0)
  customIndicator?: ReactNode   // Override auto-generated skeleton
}
```

**🎯 Universal Hook: `useInfiniteScroll` (Recommended)**

The `useInfiniteScroll` hook provides the cleanest, most universal approach. It handles loading state, minimum delay, and error handling automatically:

```tsx
import { StickyDataTable, useInfiniteScroll } from '@/modules/design-system/v2/components/ui/custom/data/sticky-data-table'

// Use the universal hook
const { infiniteScrollProps, isLoadingMore } = useInfiniteScroll({
  hasNextPage,
  loadMore: fetchNextPage,
  skeletonRowCount: 10,
  threshold: 200,
  minimumDelay: 250, // Default: 250ms - ensures skeleton is visible
  onError: (err) => toast.error('Failed to load more'),
})

// Just spread the props - that's it!
<StickyDataTable
  data={items}
  columns={columns}
  infiniteScroll={infiniteScrollProps}
/>
```

**Hook Options:**

```typescript
interface UseInfiniteScrollOptions {
  hasNextPage: boolean              // Whether more data available
  loadMore: () => Promise<void>     // Data fetch function
  skeletonRowCount?: number         // Skeleton rows (default: 5)
  threshold?: number                // Trigger distance (default: 200px)
  minimumDelay?: number             // Min skeleton visible time (default: 250ms)
  onError?: (error: unknown) => void // Error callback
}
```

**Migration Example:**

```tsx
// Before (40+ lines of manual configuration)
const [isLoadingMore, setIsLoadingMore] = useState(false)

const handleLoadMore = useCallback(async () => {
  if (isLoadingMore || !hasNextPage) return  // Manual guards
  setIsLoadingMore(true)
  try {
    await new Promise(r => setTimeout(r, 250)) // Manual delay
    await loadMore()
  } finally {
    setIsLoadingMore(false)
  }
}, [isLoadingMore, hasNextPage, loadMore])

<StickyDataTable
  loadingIndicator={
    isLoadingMore ? (
      <LoadMoreSkeleton
        columns={columns}
        rowCount={10}
        asRowsOnly={true}
        rowHeight={rowHeight}
        enableSelection={true}
        defaultVisibleColumns={visibleColumns}
        borderConfig={borderConfig}
        backgroundConfig={backgroundConfig}
      />
    ) : null
  }
  onEndReached={handleLoadMore}
  onEndReachedThreshold={200}
/>

// After (5 lines with useInfiniteScroll hook)
const { infiniteScrollProps } = useInfiniteScroll({
  hasNextPage,
  loadMore,
  skeletonRowCount: 10,
  minimumDelay: 250,
})

<StickyDataTable infiniteScroll={infiniteScrollProps} />
```

**Legacy API (Deprecated)**

The previous `loadingIndicator`, `onEndReached`, and `onEndReachedThreshold` props still work but are deprecated:

```tsx
// Legacy approach (still supported but deprecated)
{
  isLoadingMore && (
    <div className="border-primary border-x border-b">
      {Array.from({ length: 5 }).map((_, i) => (
        <SkeletonRow key={i} columns={columns} gridTemplate={gridTemplate} />
      ))}
    </div>
  )
}
```

#### Virtualization (Viewport Fill)

```tsx
// Fill viewport height with skeleton rows
const viewportRows = Math.ceil(window.innerHeight / TABLE_CONFIG.ROW_HEIGHT)
<TableSkeleton columns={columns} skeletonRowCount={viewportRows} />
```

### Testing & Refinement

Use the **Skeleton Loader Playground** to test and refine your skeleton implementations:

**Playground URL:** `/playground/ui/gallery/table-payva/skeleton-loader-playground`

The playground provides:

- ✅ Real-time measurement comparison (skeleton vs real table)
- ✅ Layout shift detection with CLS monitoring
- ✅ Debug visualization with colored borders
- ✅ Configurable skeleton variants (minimal, realistic, columns-match)
- ✅ Console logging for height mismatches
- ✅ Fixed height enforcement for all page elements
- ✅ Toolbar skeleton testing (filter, export, column control)
- ✅ Load more / infinite scroll skeleton testing

**Usage:**

1. Navigate to the playground URL
2. Enable "Debug Mode" and "Show Measurements"
3. Configure skeleton settings (rows, toolbar, header)
4. Click "Simulate Page Load" to test transitions
5. Check browser console for measurement comparisons
6. Verify CLS = 0 in Performance panel

### Common Pitfalls

❌ **Don't:**

- Use different column widths in skeleton vs real table
- Forget the header gap (12px)
- Use `auto` height for skeleton containers
- Show different number of skeleton rows than expected data
- Omit toolbar skeleton if table has toolbar

✅ **Do:**

- Use `TABLE_CONFIG` constants for all dimensions
- Match exact column widths using `generateSkeletonGridTemplate`
- Include all UI elements (toolbar, header, rows) in skeleton
- Test with browser DevTools Performance panel
- Verify CLS = 0 in Lighthouse reports

### 🔍 Debugging Layout Shift Issues

When skeleton loaders don't match the real table dimensions, you'll experience Cumulative Layout Shift (CLS). This section documents proven debugging techniques and solutions.

#### Step 1: Identify the Problem

**Symptoms:**

- Content "jumps" or "pops" when transitioning from skeleton to real table
- Browser DevTools Performance panel shows CLS > 0
- Visual inspection shows height mismatches between skeleton and real table

**Quick Check:**

```tsx
// Temporarily add this to compare heights
console.log('Skeleton height:', skeletonRef.current?.offsetHeight)
console.log('Table height:', tableRef.current?.offsetHeight)
```

#### Step 2: Visual Debugging with Color Mapping

Add colored borders to identify which section is causing the mismatch:

```tsx
// Metrics section (if present above table)
<div
  className="mb-10 flex items-start justify-between gap-4"
  style={{
    height: 64,
    backgroundColor: 'rgba(239, 68, 68, 0.2)',  // Red
    border: '2px solid rgba(239, 68, 68, 0.5)'
  }}
>
  {/* Metrics content */}
</div>

// Table container wrapper
<div style={{
  backgroundColor: 'rgba(59, 130, 246, 0.2)',  // Blue
  border: '2px solid rgba(59, 130, 246, 0.5)'
}}>
  {isLoading ? (
    <div style={{
      backgroundColor: 'rgba(34, 197, 94, 0.2)',  // Green
      border: '2px solid rgba(34, 197, 94, 0.5)'
    }}>
      <TableSkeleton {...props} />
    </div>
  ) : (
    <div style={{
      backgroundColor: 'rgba(168, 85, 247, 0.2)',  // Purple
      border: '2px solid rgba(168, 85, 247, 0.5)'
    }}>
      <StickyDataTable {...props} />
    </div>
  )}
</div>
```

**Color Legend:**

- 🔴 **Red** = Metrics section (if present)
- 🔵 **Blue** = Table container wrapper
- 🟢 **Green** = Skeleton loader
- 🟣 **Purple** = Real table

Compare the heights visually - mismatched colors indicate the problem area.

#### Step 3: Verify Toolbar Synchronization

**Common Issue:** Toolbar height mismatch between skeleton and real table.

**Check:**

1. Does your real table have a toolbar? (Check for `exportAll`, `exportSelected`, `showColumnControl`, or `leftToolbar` props)
2. Is `showToolbar={true}` set on `TableSkeleton`?
3. Are both using `TABLE_CONFIG.TOOLBAR_HEIGHT` and `TABLE_CONFIG.TOOLBAR_MARGIN`?

**Solution:**

```tsx
// Real table toolbar MUST use TABLE_CONFIG constants
<div
  className="mb-4 flex items-center gap-4"
  style={{
    height: TABLE_CONFIG.TOOLBAR_HEIGHT,      // 40px
    marginBottom: TABLE_CONFIG.TOOLBAR_MARGIN, // 16px
  }}
>
  {/* Toolbar content */}
</div>

// Skeleton toolbar MUST match exactly
<TableSkeleton
  showToolbar={true}  // This uses the same constants internally
  {...otherProps}
/>
```

**Key Learning:** The real table toolbar container must explicitly use `TABLE_CONFIG.TOOLBAR_HEIGHT` and `TABLE_CONFIG.TOOLBAR_MARGIN` inline styles, not just Tailwind classes. The skeleton already uses these constants, so ensure the real table matches.

#### Step 4: Verify Header Gap Handling

**Common Issue:** Header gap (`HEADER_GAP`) is incorrectly included in height calculations.

**Check:**

- Header gap is **NOT** part of document flow height
- Header gap is handled by sticky positioning (`top: HEADER_GAP`)
- Gap filler is absolutely positioned and doesn't take up space

**Correct Calculation:**

```tsx
// ✅ CORRECT: Header gap NOT included in total height
const toolbarHeight = showToolbar ? TOOLBAR_TOTAL_HEIGHT : 0
const headerHeight = TABLE_CONFIG.HEADER_HEIGHT // Only header row, NOT gap
const bodyHeight = skeletonRowCount * TABLE_CONFIG.ROW_HEIGHT
const totalHeight = toolbarHeight + headerHeight + bodyHeight

// ❌ WRONG: Don't include HEADER_GAP in total height
const totalHeight = toolbarHeight + HEADER_GAP + HEADER_HEIGHT + bodyHeight
```

#### Step 5: Verify Fixed Heights vs Min-Heights

**Common Issue:** Using `min-height` instead of `height` allows content to grow and cause layout shift.

**Check:**

- All containers use `height`, not `min-height`
- Metrics sections have fixed heights
- Page headers have fixed heights

**Solution:**

```tsx
// ✅ CORRECT: Fixed height
<div style={{ height: 64 }}>  // Always 64px

// ❌ WRONG: Min height allows growth
<div style={{ minHeight: 64 }}>  // Can grow beyond 64px
```

#### Step 6: Verify Column Widths Match

**Common Issue:** Skeleton uses different column widths than real table.

**Check:**

- Both skeleton and real table use the **exact same** `columns` array
- Grid template generation matches between skeleton and real table

**Solution:**

```tsx
// ✅ CORRECT: Same columns array
const columns: ColumnConfig[] = [/* ... */]

{isLoading ? (
  <TableSkeleton columns={columns} />  // Same array
) : (
  <StickyDataTable columns={columns} />  // Same array
)}

// ❌ WRONG: Different column configs
<TableSkeleton columns={skeletonColumns} />
<StickyDataTable columns={tableColumns} />
```

#### Step 7: Verify Metrics Section Heights

**Common Issue:** Metrics sections above the table don't have fixed heights.

**Check:**

- Metrics container has explicit `height` style
- Individual metric cards have fixed heights
- Skeleton loaders match metric value heights exactly

**Solution:**

```tsx
// Metrics container: Fixed height
<div className="mb-10 flex items-start justify-between gap-4" style={{ height: 64 }}>
  {/* Each metric card: Fixed height matching container */}
  <div style={{ height: 64 }}>
    {/* Label: Always visible */}
    <p className="text-xs">Low Risk (0-4 days)</p>

    {/* Amount: Fixed height container */}
    <div style={{ height: 24, marginBottom: 4 }}>
      {isLoading || !metrics ? (
        <Skeleton width={100} height={24} />
      ) : (
        <p className="text-lg">
          <FormattedAmount amount={metrics.lowRiskAmount} />
        </p>
      )}
    </div>

    {/* Count: Fixed height container */}
    <div style={{ height: 14 }}>
      {isLoading || !metrics ? (
        <span>
          <Skeleton width={40} height={14} className="inline-block" /> contracts
        </span>
      ) : (
        <p className="text-xs">{metrics.lowRiskCount} contracts</p>
      )}
    </div>
  </div>
</div>
```

**Key Learning:** Static labels should always be visible. Only dynamic values should show skeleton loaders. Use fixed height containers for each value type to prevent layout shift.

#### Step 8: Systematic Debugging Checklist

When debugging layout shift, check in this order:

1. **Toolbar Height** ✅
   - [ ] Real table toolbar uses `TABLE_CONFIG.TOOLBAR_HEIGHT` inline style
   - [ ] Real table toolbar uses `TABLE_CONFIG.TOOLBAR_MARGIN` inline style
   - [ ] `TableSkeleton` has `showToolbar={true}` if table has toolbar
   - [ ] Both toolbar containers have same total height (height + margin)

2. **Header Height** ✅
   - [ ] Header gap is NOT included in total height calculation
   - [ ] Header height uses `TABLE_CONFIG.HEADER_HEIGHT` only
   - [ ] Sticky positioning uses `top: TABLE_CONFIG.HEADER_GAP`

3. **Row Heights** ✅
   - [ ] Both use `TABLE_CONFIG.ROW_HEIGHT`
   - [ ] Same number of skeleton rows as expected data rows

4. **Column Widths** ✅
   - [ ] Same `columns` array passed to both skeleton and real table
   - [ ] Grid template generation matches

5. **Fixed Heights** ✅
   - [ ] All containers use `height`, not `min-height`
   - [ ] Metrics sections have fixed heights
   - [ ] Page headers have fixed heights

6. **Metrics Sections** ✅
   - [ ] Container has fixed height
   - [ ] Value containers have fixed heights matching actual content
   - [ ] Static labels always visible
   - [ ] Only dynamic values show skeletons

#### Step 9: Measurement Verification

Add temporary measurement logging to verify dimensions:

```tsx
useEffect(() => {
  if (skeletonRef.current && tableRef.current) {
    const skeletonHeight = skeletonRef.current.offsetHeight
    const tableHeight = tableRef.current.offsetHeight

    console.log('Skeleton height:', skeletonHeight)
    console.log('Table height:', tableHeight)
    console.log('Difference:', Math.abs(skeletonHeight - tableHeight))

    if (Math.abs(skeletonHeight - tableHeight) > 1) {
      console.warn('⚠️ Height mismatch detected!')
    }
  }
}, [isLoading])
```

#### Common Issues & Solutions

| Issue                         | Symptom                             | Solution                                                             |
| ----------------------------- | ----------------------------------- | -------------------------------------------------------------------- |
| Toolbar missing in skeleton   | Table appears shorter than skeleton | Set `showToolbar={true}` on `TableSkeleton`                          |
| Toolbar height mismatch       | Toolbar section height differs      | Use `TABLE_CONFIG.TOOLBAR_HEIGHT` inline style on real table toolbar |
| Header gap included in height | Skeleton taller than table          | Remove `HEADER_GAP` from total height calculation                    |
| Min-height instead of height  | Content grows causing shift         | Change `min-height` to `height`                                      |
| Different column widths       | Columns misaligned                  | Use same `columns` array for both                                    |
| Metrics section shift         | Metrics jump on load                | Add fixed `height` to metrics container                              |
| Dynamic value containers      | Values cause shift                  | Use fixed height containers for each value type                      |

### Summary

**Key Takeaways:**

1. **Always use fixed heights** - Never use `auto` or dynamic heights
2. **Use `TABLE_CONFIG` constants** - Ensures perfect alignment with real table
3. **Match column widths exactly** - Use the same `columns` array for skeleton
4. **Include all elements** - Toolbar, header gap, header row, and body rows
5. **Test in playground** - Use the skeleton loader playground to verify measurements
6. **Monitor CLS** - Ensure Cumulative Layout Shift = 0

**Component Exports:**

- `TableSkeleton` - Full table skeleton for page load scenarios
- `LoadMoreSkeleton` - Row-only skeleton for infinite scroll
- `TABLE_CONFIG` - Fixed height constants (HEADER_GAP, HEADER_HEIGHT, ROW_HEIGHT)

**Next Steps:**

1. Import `TableSkeleton` from the component exports
2. Pass the same `columns` array used in `StickyDataTable`
3. Set `skeletonRowCount` to match expected initial data
4. Enable `showToolbar` if your table has a toolbar
5. Test in the playground to verify zero layout shift

## ⚡ Performance Tips

1. **Use `getRowId`** - Always provide a unique row ID function for efficient reconciliation
2. **Memoize `renderCell`** - Wrap your render function in `useCallback`
3. **Limit visible columns** - Hide columns that aren't essential
4. **Use virtualization for large datasets** - Consider wrapping with a virtual list for 1000+ rows

## 🆚 V1 vs V2 Comparison

| Feature               | V1          | V2                 |
| --------------------- | ----------- | ------------------ |
| Component memoization | Partial     | Full               |
| State management      | Props only  | Hooks + Context    |
| TypeScript types      | Basic       | Comprehensive      |
| Documentation         | README only | JSDoc + README     |
| File structure        | Flat        | Modular            |
| Custom hooks          | N/A         | All hooks exported |
| Performance           | Good        | Optimized          |

## 📚 Related Documentation

- [Filter System](./filter-types.ts) - For filter implementation
- [PAYVA Design Tokens](../../../../../styles/docs/) - Semantic token reference
- [Original V1](../sticky-data-table/) - Previous implementation

---

**Built for PAYVA Platform** | V2 Design System
=======
## 📚 Learn More

- **[Getting Started Guide](./docs/getting-started.md)** - Step-by-step tutorial
- **[API Reference](./docs/api-reference.md)** - Complete API documentation
- **[Styling Guide](./docs/styling.md)** - Customization options
- **[Advanced Usage](./docs/advanced.md)** - Architecture and performance
- **[Troubleshooting](./docs/troubleshooting.md)** - Common issues and solutions

---

**Built for PAYVA Platform** | Part of the V2 Design System
>>>>>>> origin/payva-2.0

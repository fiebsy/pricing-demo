# API Reference (ARCHIVED)

> **⚠️ DEPRECATED**: This documentation is archived. See [../API-REFERENCE.md](../API-REFERENCE.md) for current API documentation.

---

Complete API documentation for the StickyDataTable component.

## StickyDataTable Props

```tsx
interface StickyDataTableProps<T> {
  /** Array of data items to display */
  data: T[]
  /** Column configurations */
  columns: ColumnConfig[]
  /** Column labels mapping (columnKey -> display label) */
  columnLabels: Record<string, string>
  /** Function to render cell content */
  renderCell: (columnKey: string, row: T, index: number) => React.ReactNode
  /** Optional: Function to handle row click */
  onRowClick?: (row: T, index: number) => void
  /** Optional: Border radius in pixels. Defaults to 20px */
  borderRadius?: number
  /** Optional: Border configuration */
  borderConfig?: Partial<BorderConfig>
  /** Optional: Background configuration */
  backgroundConfig?: Partial<BackgroundConfig>
  /** Optional: Show column control panel. Defaults to true */
  showColumnControl?: boolean
  /** Optional: Custom wrapper className */
  className?: string
}
```

## ColumnConfig

```tsx
interface ColumnConfig {
  /** Unique column identifier */
  key: string
  /** Column width in pixels (used as default/minimum if minWidth not specified) */
  width: number
  /** Text alignment for both header and cells */
  align: 'left' | 'center' | 'right'
  /** Whether this column is sticky */
  isSticky?: boolean
  /** Sticky position offset (for 2nd+ sticky column) */
  stickyLeft?: number
  /** Whether this column is sortable */
  sortable?: boolean
  /** Minimum width in pixels (defaults to width if not specified) */
  minWidth?: number
  /** Maximum width in pixels (optional, enables flexible sizing with minmax) */
  maxWidth?: number
  /** Multiplier for fr units in CSS Grid (defaults to 1). Higher values = more space allocation */
  flexRatio?: number
}
```

### ColumnConfig Examples

**Basic Column:**

```tsx
{
  key: 'name',
  width: 200,
  align: 'left',
}
```

**Sticky Column:**

```tsx
{
  key: 'id',
  width: 60,
  align: 'left',
  isSticky: true,
  stickyLeft: 0, // First sticky column
}
```

**Sortable Column:**

```tsx
{
  key: 'price',
  width: 100,
  align: 'right',
  sortable: true,
}
```

**Flexible Column with Constraints:**

```tsx
{
  key: 'description',
  width: 200,
  minWidth: 150,
  maxWidth: 400,
  flexRatio: 2, // Gets 2x more space
  align: 'left',
}
```

## BorderConfig

Control all table borders with granular precision:

```tsx
interface BorderConfig {
  /** Outer border color class (e.g., 'border-primary') */
  outerColor: string
  /** Left border color class (overrides outerColor) */
  leftColor?: string
  /** Right border color class (overrides outerColor) */
  rightColor?: string
  /** Top border color class (overrides outerColor) */
  topColor?: string
  /** Bottom border color class (overrides outerColor) */
  bottomColor?: string
  /** Row border color class (between rows) */
  rowColor: string
  /** Cell border color class (between columns) */
  cellColor: string
  /** Whether to show outer borders */
  showOuter: boolean
  /** Whether to show left border (defaults to showOuter) */
  showLeft?: boolean
  /** Whether to show right border (defaults to showOuter) */
  showRight?: boolean
  /** Whether to show top border (defaults to showOuter) */
  showTop?: boolean
  /** Whether to show bottom border (defaults to showOuter) */
  showBottom?: boolean
  /** Whether to show row borders */
  showRows: boolean
  /** Whether to show cell borders */
  showCells: boolean
  /** Array of column keys that should have transparent right borders */
  hideCellBordersForColumns?: string[]
}
```

### Default BorderConfig

```tsx
DEFAULT_BORDER_CONFIG = {
  outerColor: 'border-primary',
  rowColor: 'border-tertiary',
  cellColor: 'border-tertiary',
  showOuter: true,
  showRows: true,
  showCells: true,
}
```

### BorderConfig Examples

**Hide Row Borders:**

```tsx
borderConfig={{
  showRows: false,
}}
```

**Custom Border Colors:**

```tsx
borderConfig={{
  outerColor: 'border-secondary',
  rowColor: 'border-primary',
  cellColor: 'border-tertiary',
}}
```

**Hide Borders for Specific Columns:**

```tsx
borderConfig={{
  hideCellBordersForColumns: ['rank', 'id'],
}}
```

## BackgroundConfig

Control background colors for all table sections:

```tsx
interface BackgroundConfig {
  /** Background color class for sticky header wrapper */
  headerWrapper: string
  /** Background color class for header container */
  headerContainer: string
  /** Background color class for sticky header cells (default state) */
  headerStickyCell: string
  /** Background color class for sticky header cells when arrows are visible */
  headerStickyCellWithArrows: string
  /** Background color class for table body container */
  bodyContainer: string
  /** Background color class for sticky row cells (default state) */
  rowStickyCell: string
  /** Background color class for sticky row cells when arrows are visible */
  rowStickyCellWithArrows: string
  /** Background color class for row hover state */
  rowHover: string
}
```

### Default BackgroundConfig

```tsx
DEFAULT_BACKGROUND_CONFIG = {
  headerWrapper: 'bg-secondary_alt',
  headerContainer: 'bg-secondary_alt',
  headerStickyCell: 'bg-secondary_alt/95',
  headerStickyCellWithArrows: 'bg-tertiary/95',
  bodyContainer: 'bg-primary',
  rowStickyCell: 'bg-primary/0',
  rowStickyCellWithArrows: 'bg-tertiary/95',
  rowHover: 'bg-secondary',
}
```

### BackgroundConfig Examples

**Custom Header Background:**

```tsx
backgroundConfig={{
  headerStickyCell: 'bg-primary',
  headerStickyCellWithArrows: 'bg-primary/90',
}}
```

**Custom Row Hover:**

```tsx
backgroundConfig={{
  rowHover: 'bg-tertiary',
}}
```

## StickyState

Unified state for sticky column behavior:

```tsx
interface StickyState {
  /** Whether the left scroll arrow should be visible */
  showLeftArrow: boolean
  /** Whether the right scroll arrow should be visible */
  showRightArrow: boolean
  /** Whether any arrows are visible (derived: showLeftArrow || showRightArrow) */
  hasArrows: boolean
  /** Whether sticky cells should use "enhanced" styling (with arrows background/border) */
  useEnhancedStyling: boolean
}
```

This is created automatically by the component using `createStickyState()`.

## Configuration Constants

### TABLE_CONFIG

```tsx
{
  HEADER_GAP: 12,              // Gap at top of sticky header (px)
  HEADER_HEIGHT: 48,           // Fixed header height (px)
  SCROLL_AMOUNT: 300,          // Pixels to scroll per arrow click
  SCROLL_THRESHOLD: 10,        // Scroll boundary threshold (prevents flicker)
  DEFAULT_BORDER_RADIUS: 12,   // Default border radius (px)
}
```

### ARROW_CONFIG

```tsx
{
  PREFERRED_TOP_OFFSET: 390,   // Preferred arrow top offset (px)
  BOTTOM_OFFSET: 100,          // Bottom offset for arrows (px)
  ARROW_HEIGHT: 40,            // Estimated arrow height (px)
  LEFT_ARROW_LEFT: '232px',    // Left arrow horizontal position
  RIGHT_ARROW_RIGHT: '16px',   // Right arrow horizontal position
  SHADOW_INDICATOR_LEFT: '232px',  // Shadow indicator position
}
```

## Exported Types

```tsx
export type { ColumnConfig, ColumnAlignment, BorderConfig, BackgroundConfig, StickyState, SortColumn, SortDirection }
```

## Exported Constants

```tsx
export { TABLE_CONFIG, DEFAULT_BORDER_CONFIG, DEFAULT_BACKGROUND_CONFIG, ARROW_CONFIG, createStickyState }
```

## Usage Examples

### Full Customization Example

```tsx
import {
  StickyDataTable,
  type ColumnConfig,
  type BorderConfig,
  type BackgroundConfig,
  DEFAULT_BORDER_CONFIG,
  DEFAULT_BACKGROUND_CONFIG,
} from '@/modules/design-system/v2/components/ui/custom/data/sticky-data-table'

const customBorderConfig: Partial<BorderConfig> = {
  outerColor: 'border-secondary',
  showRows: false,
  hideCellBordersForColumns: ['id'],
}

const customBackgroundConfig: Partial<BackgroundConfig> = {
  headerStickyCell: 'bg-primary',
  headerStickyCellWithArrows: 'bg-primary/90',
}

<StickyDataTable
  data={data}
  columns={columns}
  columnLabels={columnLabels}
  renderCell={renderCell}
  borderRadius={16}
  borderConfig={customBorderConfig}
  backgroundConfig={customBackgroundConfig}
/>
```

## Type Safety

The component uses TypeScript generics for type safety:

```tsx
interface MyDataType extends Record<string, any> {
  id: string
  name: string
  // ... other properties
}

;<StickyDataTable<MyDataType>
  data={myData}
  columns={columns}
  columnLabels={columnLabels}
  renderCell={(key, row, index) => {
    // TypeScript knows 'row' is MyDataType
    return row.name
  }}
/>
```

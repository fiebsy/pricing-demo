# Orders Page

Business orders management page with header metrics, filter toolbar, and data table.

**Route**: `/orders`

## Structure

```
src/app/orders/
├── page.tsx                         # Thin orchestration (~150 lines)
├── README.md                        # This file
│
├── types/
│   └── index.ts                     # All types (order, config, shared)
│
├── sections/
│   ├── header-metrics/
│   │   ├── index.ts                 # Barrel export
│   │   ├── OrdersSummaryCard.tsx    # Summary card component
│   │   ├── config.ts                # Default card config
│   │   ├── options.ts               # Panel dropdown options
│   │   ├── class-builders.ts        # Card-specific class builders
│   │   └── panel-config.ts          # Layout/Type/Pad/Style/Shady tabs
│   │
│   ├── filter-toolbar/
│   │   ├── index.ts                 # Barrel export
│   │   ├── OrdersFilterToolbar.tsx  # StackingNav + Search wrapper
│   │   ├── nav-items.ts             # Navigation hierarchy
│   │   ├── filter-utils.ts          # Path & search filtering
│   │   └── panel-config.ts          # Filter panel section (future)
│   │
│   ├── table/
│   │   ├── index.ts                 # Barrel export
│   │   ├── OrdersTable.tsx          # Table wrapper
│   │   ├── OrdersCellRenderer.tsx   # Cell rendering
│   │   ├── columns.tsx              # Column definitions
│   │   ├── options.ts               # Column options
│   │   └── panel-config.ts          # Columns tab config
│   │
│   └── chart/                       # Placeholder for future
│       └── index.ts                 # Empty export
│
├── data/
│   ├── index.ts
│   └── mock-orders.ts               # Mock data + metrics calculation
│
├── config/
│   ├── presets.ts                   # 4 presets (default/minimal/elevated/brand)
│   └── options.ts                   # Page-level options
│
└── panels/
    └── create-panel-config.ts       # Combines section panel configs
```

## Key Types

| Type | Description |
|------|-------------|
| `OrdersPageConfig` | Full page configuration (extends `SummaryCardConfig`) |
| `SummaryCardConfig` | Summary card styling configuration |
| `SummaryCardData` | Data for a single summary card |
| `OrderRecord` | Individual order data record |
| `ColumnVisibility` | Column visibility state |

## Sections

### Header Metrics
Displays summary cards with key metrics (Total Orders, Active, Closed, At Risk).

**Components**:
- `OrdersSummaryCard` - Configurable summary card
- `class-builders.ts` - Tailwind class generators

### Filter Toolbar
Navigation and search for filtering orders.

**Components**:
- `StackingNavWrapper` - Hierarchical navigation
- `SearchWrapper` - Expanding search input
- `filter-utils.ts` - Path and search filtering

### Table
Data table with sortable, reorderable columns.

**Components**:
- `OrdersTable` - StickyDataTable wrapper
- `OrdersCellRenderer` - Cell rendering with badges
- `columns.tsx` - Column definitions

## Presets

| Preset | Description |
|--------|-------------|
| `default` | Label-first layout, transparent background |
| `minimal` | Value-first, no badges, tight spacing |
| `elevated` | Shady container, shine effects, shadows |
| `brand` | Brand colors, subtle tint background |

## Control Panel Tabs

1. **Layout** - Preset selection, page background, gaps, container size
2. **Type** - Typography for value, subtext1, subtext2 + badge options
3. **Pad** - Container padding (top/right/bottom/left)
4. **Style** - Background, border, corner shape, shine effects
5. **Shady** - Inner layer container options
6. **Cols** - Column visibility and reorder toggle

## Migration from metric-tiles-v2

| Old | New |
|-----|-----|
| `MetricTile` | `OrdersSummaryCard` |
| `MetricTileConfig` | `OrdersPageConfig` |
| `MetricTileData` | `SummaryCardData` |
| `cell-renderer.tsx` | `OrdersCellRenderer.tsx` |

## Usage

```tsx
import { OrdersPageConfig, SummaryCardData } from './types'
import { OrdersSummaryCard } from './sections/header-metrics'
import { OrdersTable, createRenderCell } from './sections/table'
import { filterData } from './sections/filter-toolbar'
import { ORDER_DATA, calculateMetrics } from './data'
import { PRESET_DEFAULT } from './config/presets'
```

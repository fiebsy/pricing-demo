# StickyDataTable V2 Documentation

A high-performance, feature-rich data table component for the PAYVA design system with sticky columns, infinite scroll, row selection, and comprehensive styling controls.

## Documentation Structure

| Document | Description |
|----------|-------------|
| [Getting Started](./GETTING-STARTED.md) | Quick start guide, basic usage, minimal setup |
| [Architecture](./ARCHITECTURE.md) | Component structure, hooks, state management, context API |
| [Features](./FEATURES.md) | Selection, sorting, infinite scroll, filtering, export |
| [Data Adapters](./DATA-ADAPTERS.md) | **Auto-skeleton loading** for GraphQL, REST, and custom data sources |
| [Column Reordering](./COLUMN-REORDERING.md) | Drag-and-drop column reordering, FLIP animations, pointer events |
| [Styling](./STYLING.md) | Borders, backgrounds, animations, skeleton loaders |
| [API Reference](./API-REFERENCE.md) | Complete props, types, hooks, utilities reference |

---

## Overview

`StickyDataTable` is a production-ready data table built for enterprise dashboards. It provides:

### Core Features
- **Sticky Columns** - Keep important columns visible during horizontal scroll
- **Dynamic Column Visibility** - Toggle columns with smooth FLIP animations
- **Row Selection** - Checkbox-based selection with select-all support
- **Client & Server-Side Sorting** - Built-in sorting with server-side support

### Advanced Features
- **Infinite Scroll** - Automatic pagination with skeleton loading
- **Left Toolbar** - Flexible slot for filters or any custom content (`leftToolbar` prop)
- **Right Toolbar** - Slot for search or custom content (`rightToolbar` prop)
- **Export Functionality** - CSV export with selection support
- **Skeleton Loaders** - Perfectly-matched loading states

### Developer Experience
- **Full TypeScript Support** - Generic types for data safety
- **Comprehensive Hooks** - Reusable hooks for custom implementations
- **Utility Functions** - Styling and layout utilities
- **Context API** - Selective state access without prop drilling

---

## Quick Start

```tsx
import {
  StickyDataTable,
  type ColumnConfig
} from '@/modules/design-system/v2/components/ui/custom/data/sticky-data-table'

// 1. Define columns
const columns: ColumnConfig[] = [
  { key: 'id', width: 60, align: 'left', isSticky: true },
  { key: 'name', width: 200, align: 'left', isSticky: true },
  { key: 'email', width: 250, align: 'left' },
  { key: 'status', width: 120, align: 'center', sortable: true },
]

// 2. Define labels
const columnLabels = {
  id: 'ID',
  name: 'Name',
  email: 'Email',
  status: 'Status',
}

// 3. Define cell renderer
const renderCell = (key: string, row: User, index: number) => {
  switch (key) {
    case 'id': return row.id
    case 'name': return row.name
    case 'email': return row.email
    case 'status': return <StatusBadge status={row.status} />
    default: return null
  }
}

// 4. Render table
<StickyDataTable
  data={users}
  columns={columns}
  columnLabels={columnLabels}
  renderCell={renderCell}
/>
```

---

## Component Architecture

```
StickyDataTable
├── Toolbar Row (conditional)
│   ├── Left Toolbar (`leftToolbar` prop)
│   ├── Count Display (left, below toolbar)
│   ├── Right Toolbar (`rightToolbar` prop)
│   ├── Export Toolbar (right)
│   └── Column Control Panel (right)
├── Table Container
│   ├── Gradient Overlay (scroll indicator)
│   ├── Sticky Header Wrapper
│   │   ├── Navigation Arrows (left/right)
│   │   └── Table Header (CSS Grid)
│   └── Table Body (scrollable)
│       ├── Table Rows (CSS Grid)
│       ├── Infinite Scroll Sentinel
│       └── Loading Indicator / Skeleton
```

---

## File Structure

```
sticky-data-table/
├── index.tsx              # Main component & exports
├── config.ts              # Configuration constants & factory functions
├── types.ts               # Type re-exports (for backward compatibility)
├── filter-types.ts        # Filter system types
│
├── types/                 # Type definitions (modular)
│   ├── index.ts           # Type exports
│   ├── column.types.ts    # Column configuration types
│   ├── props.types.ts     # Component props types
│   ├── styling.types.ts   # Border/background types
│   ├── sort.types.ts      # Sorting types
│   ├── selection.types.ts # Selection types
│   ├── infinite-scroll.types.ts
│   ├── context.types.ts   # Context types
│   └── table-configuration.types.ts  # Table config & skeleton types
│
├── hooks/                 # Custom hooks
│   ├── index.ts           # Hook exports
│   ├── use-sticky-data-table.tsx  # Main orchestration hook
│   ├── use-columns.ts     # Internal column visibility management
│   ├── use-column-configuration.ts  # External column config (with localStorage)
│   ├── use-table-configuration.ts   # Table config persistence
│   ├── use-scroll-sync.ts # Header/body scroll sync
│   ├── use-selection.ts   # Row selection
│   ├── use-sort.ts        # Client-side sorting
│   ├── use-table-sort.ts  # Table-level sort (server/client)
│   ├── use-infinite-scroll.ts
│   ├── use-wheel-redirect.ts
│   ├── use-arrow-position.ts
│   ├── use-column-flip.ts # FLIP animations
│   ├── use-auto-column-flip.ts
│   ├── use-dynamic-columns.ts
│   ├── use-table-filters.ts
│   └── use-export-csv-sticky.ts
│
├── components/            # Subcomponents
│   ├── index.ts           # Component exports
│   ├── table-body.tsx
│   ├── table-header.tsx
│   ├── table-row.tsx
│   ├── table-cell.tsx
│   ├── table-skeleton.tsx # Skeleton loaders
│   ├── table-empty-state.tsx
│   ├── sticky-header-wrapper.tsx
│   ├── navigation-arrows.tsx
│   ├── navigation-arrow.tsx
│   ├── gradient-overlay.tsx
│   ├── column-control-panel.tsx
│   ├── export-toolbar.tsx
│   ├── toolbar-content.tsx  # Unified toolbar rendering (NEW)
│   ├── filter-toolbar.tsx
│   ├── filter-dropdown.tsx
│   └── search-toolbar.tsx
│
├── utils/                 # Utility functions (consolidated)
│   ├── index.ts           # Utility exports
│   ├── grid.ts            # Grid template generation & column calculations
│   ├── styles.ts          # All styling utilities (unified)
│   └── column-processor.ts # Unified column processing
│
├── context/               # React Context
│   ├── table-context.tsx  # Table state context
│   └── page-background-context.tsx  # Page background sync
│
└── docs/                  # Documentation
    ├── INDEX.md           # This file
    ├── GETTING-STARTED.md
    ├── ARCHITECTURE.md
    ├── FEATURES.md
    ├── COLUMN-REORDERING.md
    ├── STYLING.md
    ├── API-REFERENCE.md
    └── archive/           # Deprecated documentation (Dec 2024)
```

---

## Key Exports

### Main Component
```tsx
import { StickyDataTable } from '...'
```

### Types
```tsx
import type {
  ColumnConfig,
  ColumnAlignment,
  BorderConfig,
  BackgroundConfig,
  StickyState,
  SelectionState,
  InfiniteScrollConfig,
  StickyDataTableProps,
} from '...'
```

### Hooks
```tsx
import {
  useStickyDataTable,
  useColumnConfiguration,
  useInfiniteScroll,
  useScrollSync,
  useColumns,
  useSelection,
  useSort,
} from '...'
```

### Components
```tsx
import {
  TableSkeleton,
  LoadMoreSkeleton,
  FilterToolbar,
  SearchToolbar,
  ExportToolbar,
} from '...'
```

### Utilities
```tsx
import {
  processColumns,
  generateGridTemplate,
  createBorderConfig,
  createBackgroundConfig,
  calculateSkeletonHeight,
} from '...'
```

---

## Version History

This documentation reflects the current state of StickyDataTable V2 as of December 2024.

### December 2024 Optimizations

Code structure improvements for maintainability:
- **Consolidated toolbar rendering** - `ToolbarContent` component eliminates duplicate code for 'above' and 'integrated' toolbar modes
- **Unified styling utilities** - All style utilities now in single `styles.ts` file (previously scattered across 7 files)
- **Removed dead code** - Cleaned up unused utility files that had been superseded
- **Improved type exports** - Fixed missing type re-exports in `types.ts`

### Feature Additions

- Row selection with checkbox column
- Infinite scroll with automatic skeleton
- Server-side sorting support
- Left/right toolbar slots (`leftToolbar`/`rightToolbar` props)
- Export functionality
- TableSkeleton/LoadMoreSkeleton components
- Context API for state access
- FLIP animations for column transitions
- Unified column processor
- Drag-and-drop column reordering (pointer-based)
- Empty state support (`emptyState`, `noResultsState` props)
- Page background context for automatic theming

---

**Built for PAYVA Platform** | Part of the V2 Design System | Last Updated: December 2024

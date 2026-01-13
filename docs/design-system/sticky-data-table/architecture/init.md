# Architecture

Internal structure, component hierarchy, and state management.

---

## Topics

- [Components](./components.md): Component hierarchy, subcomponents, exports
- [State Management](./state-management.md): Context API, hooks organization
- [Styling](./styling.md): Borders, backgrounds, animations, skeletons

---

## Quick Reference

| Aspect | Key Files |
|--------|-----------|
| Main component | `index.tsx` |
| Types | `types/` directory |
| Hooks | `hooks/` directory |
| Config | `config/` directory |
| Subcomponents | `components/` directory |
| Context | `context/table-context.tsx` |

---

## Component Hierarchy

```
StickyDataTable
├── ToolbarContent (conditional)
│   ├── leftToolbar (FilterToolbar, etc.)
│   ├── rightToolbar (SearchToolbar, etc.)
│   ├── ExportToolbar
│   └── ColumnControlPanel
├── GradientOverlay
├── StickyHeaderWrapper
│   ├── NavigationArrows
│   └── TableHeader (CSS Grid)
└── TableBody
    ├── TableRow (CSS Grid)
    │   └── TableCell
    ├── InfiniteScrollSentinel
    └── LoadMoreSkeleton
```

---

## Hook Organization

```
hooks/
├── core/           # Main orchestration
│   └── useStickyDataTable
├── column/         # Column management
│   ├── useColumns
│   ├── useColumnConfiguration
│   └── useColumnFlip
├── scroll/         # Scroll behavior
│   ├── useScrollSync
│   └── useInfiniteScroll
├── state/          # Row data state
│   ├── useSort
│   ├── useSelection
│   └── useTableFilters
├── config/         # Configuration
│   └── useTableConfiguration
├── utils/          # Utilities
│   └── useExportCsvSticky
└── data-adapters/  # Loading state
    ├── useTableWithGraphQL
    └── useTableWithAsync
```

---

## File Structure

```
sticky-data-table/
├── index.tsx              # Main component
├── types.ts               # Type re-exports
├── exports.ts             # Public API exports
├── config/                # Configuration module
├── types/                 # Type definitions
├── hooks/                 # Custom hooks
├── components/            # Subcomponents
├── utils/                 # Utility functions
├── context/               # React Context
└── docs/                  # Inline documentation
```

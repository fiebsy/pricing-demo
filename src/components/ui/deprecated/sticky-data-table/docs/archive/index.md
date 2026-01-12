# StickyDataTable Documentation (ARCHIVED)

> **⚠️ DEPRECATED**: This documentation is archived and may be outdated.
>
> Please refer to the current documentation in the parent directory:
> - [INDEX.md](../INDEX.md) - Main documentation hub
> - [GETTING-STARTED.md](../GETTING-STARTED.md) - Quick start guide
> - [ARCHITECTURE.md](../ARCHITECTURE.md) - Component architecture
> - [API-REFERENCE.md](../API-REFERENCE.md) - Complete API reference
> - [FEATURES.md](../FEATURES.md) - Feature documentation
> - [STYLING.md](../STYLING.md) - Styling guide
>
> *Archived: December 2024*

---

A comprehensive guide to the StickyDataTable component - a generic, reusable data table with sticky columns, dynamic column visibility, and smooth scrolling capabilities.

## 📚 Documentation Structure

- **[Getting Started](./getting-started.md)** - Quick start guide, basic usage examples, and core concepts
- **[API Reference](./api-reference.md)** - Complete API documentation for props, types, and configuration
- **[Styling & Customization](./styling.md)** - Border system, backgrounds, animations, and visual customization
- **[Advanced Usage](./advanced.md)** - Architecture, state management, performance considerations, and advanced patterns
- **[Troubleshooting](./troubleshooting.md)** - Common issues, solutions, and best practices

## 🎯 What is StickyDataTable?

`StickyDataTable` is a production-ready data table component built for the PAYVA platform design system. It provides:

- **Sticky Columns** - Keep important columns visible while scrolling horizontally
- **Dynamic Column Visibility** - Toggle columns on/off with smooth animations
- **Column Sorting** - Built-in sorting for any column
- **Smooth Scrolling** - Navigation arrows and mouse wheel support
- **Fully Customizable** - Granular control over borders, backgrounds, and styling
- **Type-Safe** - Full TypeScript support with generics for any data type

## 🚀 Quick Example

```tsx
import { StickyDataTable, type ColumnConfig } from '@/modules/design-system/v2/components/ui/custom/data/sticky-data-table'

const columns: ColumnConfig[] = [
  { key: 'rank', width: 48, align: 'left', isSticky: true, stickyLeft: 0 },
  { key: 'name', width: 180, align: 'left', isSticky: true, stickyLeft: 48 },
  { key: 'price', width: 100, align: 'right', sortable: true },
]

const columnLabels = {
  rank: '#',
  name: 'Name',
  price: 'Price',
}

const renderCell = (key: string, row: any, index: number) => {
  switch (key) {
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

;<StickyDataTable data={myData} columns={columns} columnLabels={columnLabels} renderCell={renderCell} />
```

## 🏗️ Component Architecture

The component is built with a modular architecture:

```
StickyDataTable (main component)
├── ColumnControlPanel (optional) - Column visibility toggle
└── Table Container
    ├── GradientOverlay - Scroll indicators
    ├── StickyHeaderWrapper - Sticky header with navigation
    │   ├── NavigationArrows - Scroll arrows
    │   └── TableHeader - Header row
    └── TableBody - Scrollable body
        └── TableRow[] - Data rows
```

## 🎨 Key Features

### Sticky Columns

Keep important columns (like ID, name) visible while scrolling through wide tables. Supports multiple sticky columns with proper positioning.

### Dynamic Column Visibility

Users can toggle columns on/off via a dropdown control panel. Columns animate smoothly when added or removed.

### Column Sorting

Click any column header marked as `sortable: true` to sort data ascending/descending.

### Smooth Scrolling

- Navigation arrows appear when content overflows
- Mouse wheel scrolling supported
- Smooth scroll animations

### Customizable Styling

- Granular border control (outer, row, cell borders)
- Customizable backgrounds for all sections
- Configurable border radius
- Dark mode support via semantic tokens

## 📖 Next Steps

1. **New to the component?** Start with [Getting Started](./getting-started.md)
2. **Need API details?** Check [API Reference](./api-reference.md)
3. **Customizing appearance?** See [Styling & Customization](./styling.md)
4. **Building complex features?** Read [Advanced Usage](./advanced.md)
5. **Running into issues?** Visit [Troubleshooting](./troubleshooting.md)

---

**Built for PAYVA Platform** | Part of the V2 Design System

# Production Design System Architecture

> System design decisions and component hierarchy for the prod/ design system.

---

## Design Philosophy

### Base UI First

Every primitive component is built on [Base UI](https://base-ui.com) (`@base-ui/react`). Base UI provides:

- **Accessibility**: WCAG-compliant keyboard navigation, ARIA attributes
- **Unstyled primitives**: No default styling to override
- **Composable**: Compound component patterns
- **Data attributes**: Styling hooks via `data-*` attributes

We apply PAYVA styling directly to Base UI primitives using Tailwind CSS.

### Three-Tier Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│  PAGES (modules/v2/, pages/v2/)                             │
│  - Compose features and data components                     │
│  - Business logic, data fetching                            │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  FEATURES (prod/features/)                                  │
│  - Higher-level product components                          │
│  - Compose base primitives                                  │
│  - Examples: DisplayCard, ActivityFeed, ControlPanel        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  BASE (prod/base/)                                          │
│  - Core primitives built on Base UI                         │
│  - Single responsibility                                    │
│  - Examples: Button, Badge, Accordion, Input                │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  BASE UI (@base-ui/react)                                   │
│  - Unstyled, accessible primitives                          │
│  - External dependency                                      │
└─────────────────────────────────────────────────────────────┘
```

### Data Components

The `prod/data/` directory is for data-heavy display components:

- **Sticky Data Table**: Complex table with sticky columns, sorting, filtering
- Charts and visualizations (future)

These often compose both base primitives and feature components.

---

## Component Structure

### Base Component Pattern

```
prod/base/button/
├── index.ts              # Public exports
├── button.tsx            # Main component
├── types.ts              # TypeScript types
├── config.ts             # Variants, sizes, defaults
└── README.md             # Usage documentation (optional)
```

### Feature Component Pattern

```
prod/features/display-card/
├── index.ts              # Public exports
├── display-card.tsx      # Main component
├── display-card-metric.tsx  # Sub-component
├── types.ts              # TypeScript types
├── presets.ts            # Preset configurations
└── README.md             # Usage documentation
```

### Data Component Pattern

```
prod/data/sticky-data-table/
├── index.ts              # Public exports
├── table.tsx             # Root compound component
├── core/                 # Headless logic
│   ├── context.tsx
│   ├── types.ts
│   ├── config.ts
│   └── hooks/
├── components/           # Presentation layer
│   ├── header.tsx
│   ├── body.tsx
│   ├── row.tsx
│   └── ...
├── primitives/           # Base UI integration
└── README.md
```

---

## Styling Approach

### Tailwind + Data Attributes

Base UI exposes state via data attributes. We style using Tailwind's data attribute selectors:

```tsx
// Button with Base UI
import { Button as BaseButton } from '@base-ui/react/button'

export function Button({ children, ...props }) {
  return (
    <BaseButton.Root
      className={cn(
        // Base styles
        'inline-flex items-center justify-center',
        'rounded-lg px-4 py-2',
        'text-sm font-medium',
        // State styles via data attributes
        'data-[disabled]:opacity-50',
        'data-[pressed]:scale-95',
        'data-[focus-visible]:ring-2',
      )}
      {...props}
    >
      {children}
    </BaseButton.Root>
  )
}
```

### Semantic Color Tokens

Always use semantic tokens, never raw colors:

```tsx
// CORRECT
className="text-primary bg-primary-subtle border-primary"

// INCORRECT
className="text-gray-900 bg-purple-50 border-purple-200"
```

### Animation Policy

- **Transform and opacity only** for performance
- Always include `motion-reduce:transition-none`
- Use CSS transitions, not JS animations where possible

```tsx
className={cn(
  'transition-all duration-200',
  'translate-x-0 opacity-100',
  'motion-reduce:transition-none'
)}
```

---

## Icon System

### Huge Icons Only

All icons use [Huge Icons PRO](https://hugeicons.com/) via the `HugeIcon` wrapper:

```tsx
import Cancel01Icon from '@hugeicons-pro/core-stroke-rounded/Cancel01Icon'
import { HugeIcon } from '@/modules/design-system/v2/components/ui/prod/base/icon'

<HugeIcon icon={Cancel01Icon} size={20} className="text-fg-secondary" />
```

### Icon Wrapper Location

The `HugeIcon` wrapper will be migrated to:
```
prod/base/icon/
├── index.ts
├── huge-icon.tsx         # Wrapper component
└── types.ts
```

### Why a Wrapper?

Huge Icons exports arrays of SVG definitions, not React components. The wrapper:
1. Converts the array format to valid JSX
2. Provides consistent sizing API
3. Supports stroke width customization

---

## State Management

### Component State

Components manage their own UI state. No global state for presentation.

### Data Fetching

Data is passed via props. Components don't fetch their own data.

```tsx
// Page handles data
const { data, isLoading } = useQuery(...)

// Component receives data
<StickyDataTable data={data} isLoading={isLoading} />
```

### Context Usage

Context is used for:
- Compound component communication (Table.Root → Table.Cell)
- Theme/mode propagation
- NOT for business data

---

## Compound Components

Complex components use the compound component pattern:

```tsx
// Usage
<Table.Root data={data} columns={columns}>
  <Table.Toolbar>
    <Table.FilterSlot />
    <Table.SearchSlot />
  </Table.Toolbar>
  <Table.Header />
  <Table.Body />
</Table.Root>

// Implementation
const TableContext = createContext<TableContextValue>(null)

function Root({ children, data, columns }) {
  const state = useTableState(data, columns)
  return (
    <TableContext.Provider value={state}>
      {children}
    </TableContext.Provider>
  )
}

function Header() {
  const { columns } = useContext(TableContext)
  return <thead>...</thead>
}

export const Table = { Root, Header, Body, ... }
```

---

## File Naming

| Type | Convention | Example |
|------|------------|---------|
| Component files | kebab-case | `display-card.tsx` |
| Type files | kebab-case | `types.ts` |
| Config files | kebab-case | `config.ts` |
| Directories | kebab-case | `display-card/` |
| Components | PascalCase | `DisplayCard` |
| Hooks | camelCase | `useTableState` |

---

## Exports

### Named Exports Only

```typescript
// index.ts
export { Button } from './button'
export type { ButtonProps } from './types'

// NEVER default exports
// export default Button
```

### Barrel Files

Each component directory has an `index.ts` that exports its public API:

```typescript
// prod/base/button/index.ts
export { Button } from './button'
export type { ButtonProps, ButtonVariant, ButtonSize } from './types'
```

---

## Dependencies

### Allowed

- `@base-ui/react` - Primitives
- `@hugeicons-pro/*` - Icons
- `tailwind-merge` / `clsx` - Class merging
- `framer-motion` - Complex animations (sparingly)

### Forbidden in prod/

- `@untitledui-pro/*` - Legacy
- `@untitledui/icons` - Legacy icons
- Direct DOM manipulation
- CSS-in-JS libraries

---

## Migration Path

Components migrate from legacy → prod/:

```
untitled-ui/base/buttons/button.tsx
        │
        ▼ (rebuild with Base UI)

prod/base/button/button.tsx
```

The legacy component remains until all consumers are updated, then it's removed.

---

*Last Updated: January 2026*

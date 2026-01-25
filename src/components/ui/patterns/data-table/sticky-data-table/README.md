# StickyDataTable V2

Production data table with sticky header, configurable toolbar, and integrated design system components.

**Location**: `@/modules/design-system/v2/components/ui/prod/data/sticky-data-table`

---

## Current Status

> **Work in Progress**: This component requires integration updates to properly inherit styling from hardened production components.

### Known Issues

| Issue | Status | Priority | Description |
|-------|--------|----------|-------------|
| Toolbar filter imports | **Open** | High | Toolbar does not import correct FilterMenu/FilterChip components from prod/base/filter |
| Contract column count | **Open** | High | Shows order count instead of contract count |
| Expanding search styling | **Open** | High | Does not use correct ExpandingSearch component with shine border |
| Checkbox column missing | **Open** | Medium | Selection checkbox not rendered to left of contract column |
| Metric card interactions | **Open** | Medium | Cards have incorrect interactions; should use flat preset defaults |

### Required Integrations

The toolbar must import and render these production components with their hardened styling:

```
prod/base/filter/
├── FilterMenu         → "Add a filter" dropdown with submenu support
├── FilterChip         → Active filter display with shine-3-subtle
└── FilterTrigger      → Trigger button with shine variant

prod/features/expanding-search/
└── ExpandingSearch    → Search input with shine-1 border on bg-secondary

prod/features/metric-card/
└── MetricCard         → Dashboard tiles with METRIC_CARD_PRESETS.flat
```

---

## Architecture

```
sticky-data-table/
├── index.tsx                 # Main component
├── types.ts                  # Type definitions
├── config/
│   ├── index.ts              # Default configuration exports
│   ├── presets/
│   │   ├── index.ts          # Preset exports
│   │   └── jan2.ts           # "Gen 2" default configuration
│   └── types.ts              # Configuration types
├── components/
│   ├── toolbar/
│   │   ├── toolbar-content.tsx    # Reusable toolbar layout
│   │   ├── column-control-panel.tsx
│   │   ├── export-toolbar.tsx
│   │   └── index.ts
│   └── ...
└── README.md
```

---

## Toolbar Integration Requirements

### 1. Filter Menu Integration

The toolbar `leftToolbar` slot should render the FilterMenu component from `prod/base/filter`:

```tsx
import {
  FilterMenu,
  FilterChip,
  FilterTrigger,
} from '@/modules/design-system/v2/components/ui/prod/base/filter'

// In toolbar leftToolbar slot:
<div className="flex items-center gap-2">
  {/* Active filter chips */}
  {activeFilters.map((filter) => (
    <FilterChip
      key={filter.id}
      icon={filter.icon}
      value={filter.label}
      onRemove={() => handleFilterRemove(filter.id)}
    />
  ))}

  {/* Filter menu trigger */}
  <FilterMenu
    items={filterItems}
    onFilterSelect={handleFilterSelect}
    activeFilterIds={activeFilters.map((f) => f.id)}
  />
</div>
```

**Critical styling requirements**:
- FilterChip uses `shine-3-subtle` (hardcoded in component)
- FilterTrigger uses Button with `variant="shine"`
- Filter menu inherits from base Menu component

### 2. Expanding Search Integration

The toolbar should include ExpandingSearch with correct shine styling:

```tsx
import { ExpandingSearch } from '@/modules/design-system/v2/components/ui/prod/features/expanding-search'

// In toolbar (typically rightToolbar slot):
<ExpandingSearch
  placeholder="Search contracts..."
  value={searchValue}
  onChange={setSearchValue}
  className="shine-1"  // Required for shine border effect
  expandedWidth={200}
  height={32}          // Compact height for integrated toolbar
/>
```

**Critical styling requirements**:
- `className="shine-1"` is passed to SearchContainer for the shine border
- Background uses `bg-secondary` (hardcoded in SearchContainer)
- Opacity transitions on hover/active/expanded states

### 3. Column Select Menu

The ColumnControlPanel already exists and uses ButtonUtility with proper styling. Ensure it's enabled in configuration:

```tsx
features: {
  showColumnControl: true,
}
```

### 4. Selection Checkbox

Enable selection checkboxes:

```tsx
features: {
  enableSelection: true,
}
```

This adds a checkbox column to the left of all other columns.

---

## Metric Card Integration

Metric cards above the table should use the flat preset without additional interactions:

```tsx
import {
  MetricCard,
  METRIC_CARD_PRESETS,
} from '@/modules/design-system/v2/components/ui/prod/features/metric-card'

<MetricCard
  label="Total Contracts"
  value={formatCurrency(totalValue)}
  count={`${contractCount} contracts`}  // Not "orders"
  config={METRIC_CARD_PRESETS.flat}
  isActive={selectedMetric === 'total'}
  isHovered={hoveredMetric === 'total'}
  onClick={() => setSelectedMetric('total')}
/>
```

**Critical requirements**:
- Use `METRIC_CARD_PRESETS.flat` - no custom configuration
- Count label should be "contracts" not "orders"
- No additional hover animations or effects beyond what flat preset provides
- Flat preset: outer hidden by default, reveals with shine-1/depth-20 on active

---

## Default Configuration (Jan2 Preset)

The "Gen 2" default configuration from `config/presets/jan2.ts`:

```typescript
toolbar: {
  position: 'integrated',      // Sticky with table header
  countPosition: 'right',
  countStackPosition: 'inline',
  bottomMargin: 8,
  countGap: 0,
  integratedHeight: 32,        // Compact height
  integratedPadding: { top: 0, bottom: 12, left: 0, right: 0 },
  countPaddingRight: 24,
}

features: {
  showColumnControl: true,
  showCount: false,
  showExport: false,
  enableSelection: false,      // TODO: Enable when checkbox implemented
}
```

---

## Styling Pass-Down Architecture

### Current State (Issues)

Components currently have hardcoded styling that doesn't flow from parent configuration:

| Component | Hardcoded Styling | Issue |
|-----------|-------------------|-------|
| FilterChip | `shine-3-subtle` | Cannot override |
| ButtonUtility | `shine-1` | Cannot override |
| ExpandingSearch | Relies on `className` prop | Works, but implicit |
| MetricCard | Config-driven | Works correctly |

### Required State

Production components should always render with their hardened styling. The toolbar should:

1. **Import correct components** - Not custom implementations
2. **Pass correct className** - For components that need it (ExpandingSearch)
3. **Use correct presets** - METRIC_CARD_PRESETS.flat for metric cards
4. **Trust component defaults** - Don't override hardened styling

---

## Implementation Checklist

### Toolbar
- [ ] Import FilterMenu from `prod/base/filter`
- [ ] Import FilterChip from `prod/base/filter`
- [ ] Import FilterTrigger from `prod/base/filter`
- [ ] Import ExpandingSearch from `prod/features/expanding-search`
- [ ] Pass `className="shine-1"` to ExpandingSearch
- [ ] Render filter chips for active filters
- [ ] Render filter menu with "Add a filter" trigger
- [ ] Enable selection checkbox column

### Metric Cards
- [ ] Use `METRIC_CARD_PRESETS.flat` configuration
- [ ] Show "contracts" not "orders" in count
- [ ] Fetch correct data (contract count, not order count)
- [ ] Remove any custom interactions beyond flat preset

### Column Configuration
- [ ] Verify contract column shows contract count
- [ ] Verify checkbox column renders when selection enabled

---

## File References

| Component | Location |
|-----------|----------|
| Toolbar | `./components/toolbar/toolbar-content.tsx` |
| FilterMenu | `../../base/filter/filter-menu/filter-menu.tsx` |
| FilterChip | `../../base/filter/filter-chip/filter-chip.tsx` |
| ExpandingSearch | `../../features/expanding-search/expanding-search.tsx` |
| MetricCard | `../../features/metric-card/metric-card.tsx` |
| Jan2 Preset | `./config/presets/jan2.ts` |

---

## Related Documentation

- [Filter System README](../../base/filter/README.md)
- [MetricCard README](../../features/metric-card/README.md)
- [V2 Architecture](/docs/v2/ARCHITECTURE.md)

---

*Last Updated: January 2025*

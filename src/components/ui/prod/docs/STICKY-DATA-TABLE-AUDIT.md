# StickyDataTable Migration Audit

> **Purpose**: Comprehensive analysis of all imports and dependencies for StickyDataTable in `prod/data/sticky-data-table`.
> **Location**: `prod/data/sticky-data-table/` (migrated from `custom/data/sticky-data-table/`)
> **Generated**: January 2026
> **Last Updated**: January 2026
> **Status**: IN PROGRESS - Filter System + ExpandingSearch + Column Control Panel Fully Migrated

---

## Executive Summary

The StickyDataTable migration is in progress. The **Filter System** and **Empty State** have been successfully migrated to use PROD components.

### Migration Readiness: IN PROGRESS

**Completed Migrations**:
- Filter system (`filter-toolbar.tsx`) - Now using `prod/base/filter`
- Filter config types (`config/filter.ts`) - Now using `prod/base/menu` types
- ExpandingSearch (`table-payva-v2` playground) - Now using `prod/features/expanding-search`
- Export toolbar (`export-toolbar.tsx`) - Now using `prod/base/button-utility` + `prod/base/icon`
- Column control panel (`column-control-panel.tsx`) - **FULLY MIGRATED** to `prod/base/menu` + `prod/base/button-utility` + `prod/base/checkbox`
- **Checkbox (table-header, table-row)** - **FULLY MIGRATED** to `prod/base/checkbox`
- **Empty state (`table-empty-state.tsx`)** - **FULLY MIGRATED** to `prod/base/button` + `prod/features/featured-icon` + Hugeicons

**Remaining Blockers (1)**:
- Skeleton (legacy design-system) - used in skeleton components

**Already Available in prod/ (10)**:
- Button (prod/base/button) - **INTEGRATED** in table-empty-state
- HugeIcon (prod/base/icon) - **INTEGRATED** in export-toolbar, column-control-panel
- ButtonUtility (prod/base/button-utility) - **INTEGRATED** in export-toolbar, column-control-panel
- Tooltip (prod/base/tooltip) - **INTEGRATED** via ButtonUtility
- Checkbox (prod/base/checkbox) - **INTEGRATED** via prod/base/menu checkbox items
- Filter system (prod/base/filter) - **INTEGRATED**
- Menu system (prod/base/menu) - **INTEGRATED** (with new checkbox item support)
- ExpandingSearch (prod/features/expanding-search) - **INTEGRATED**
- FeaturedIcon (prod/features/featured-icon) - **INTEGRATED** in table-empty-state
- Button (prod/base/button) - **INTEGRATED** in table-empty-state

---

## Complete Import Analysis

### 1. Imports from `untitled-ui/` (NEEDS MIGRATION)

| File | Import | Component | Used For | Status |
|------|--------|-----------|----------|--------|
| ~~`components/table-header/header-cell.tsx:12`~~ | ~~Checkbox~~ | ~~Selection header~~ | ~~Header checkbox for "select all"~~ | **MIGRATED** - Uses `prod/base/checkbox` |
| ~~`components/table-row.tsx:25`~~ | ~~Checkbox~~ | ~~Selection row~~ | ~~Row checkbox for row selection~~ | **MIGRATED** - Uses `prod/base/checkbox` |
| ~~`components/column-control-panel.tsx`~~ | ~~CheckboxBase~~ | ~~Column visibility~~ | ~~Checkbox in column control panel~~ | **MIGRATED** - Uses `prod/base/menu` checkbox items |
| ~~`components/column-control-panel.tsx`~~ | ~~ButtonUtility~~ | ~~Column menu trigger~~ | ~~Dots button for column menu~~ | **MIGRATED** - Uses `prod/base/button-utility` |
| `components/export-toolbar.tsx:14` | ButtonUtility | Export button | Download button | **MIGRATED** |
| ~~`components/column-control-panel.tsx`~~ | ~~Dropdown~~ | ~~Column menu~~ | ~~Full dropdown menu component~~ | **REPLACED** - Uses `prod/base/menu` |
| ~~`components/table-empty-state.tsx:5`~~ | ~~Button~~ | ~~Empty state CTA~~ | ~~Action button in empty state~~ | **MIGRATED** - Uses `prod/base/button` |
| ~~`components/table-empty-state.tsx:4`~~ | ~~FeaturedIcon~~ | ~~Empty state icon~~ | ~~Icon wrapper in empty state~~ | **MIGRATED** - Uses `prod/features/featured-icon` |

**Dependency Chain**:
- ~~`ButtonUtility` depends on `Tooltip` from untitled-ui~~ **RESOLVED** - Now using `prod/base/button-utility` which uses `prod/base/tooltip`
- ~~`Dropdown` depends on `CommandShortcut` from untitled-ui/application~~ **RESOLVED** - Replaced by `prod/base/menu` (no untitled-ui dependencies)

### 2. Imports from `custom/` (MIGRATED)

| File | Import | Component | Used For | Status |
|------|--------|-----------|----------|--------|
| `components/filter-dropdown.tsx:20` | HugeIcon | Icon rendering | Icons in filter dropdown | **MIGRATED** |
| `components/export-toolbar.tsx:13` | HugeIcon | Icon rendering | Download icon | **MIGRATED** |
| `components/search-toolbar.tsx:28` | HugeIcon | Icon rendering | Search/clear icons | DEPRECATED |

**Status**: All HugeIcon imports now use `prod/base/icon`.

### 3. Imports from `base-ui/` (FULLY MIGRATED)

| File | Import | Module | Status |
|------|--------|--------|--------|
| `components/filter-dropdown.tsx:20-23` | Menu, MenuItemType, HugeIcon | **prod/base/menu, prod/base/icon** | **MIGRATED** |
| `components/filter-toolbar.tsx:21-32` | FilterMenu, FilterChip, FilterTrigger, MenuItemType, etc. | **prod/base/filter** | **MIGRATED** |
| `config/filter.ts:10-18` | MenuAppearance, BorderRadius, Shadow, etc. | **prod/base/menu** | **MIGRATED** |

**Migration Notes**:
- `filter-toolbar.tsx` now imports from `prod/base/filter` instead of `legacy-base-ui/filter`
- `config/filter.ts` now uses PROD menu types (`MenuAppearance`, `BorderRadius`, `Shadow`, etc.)
- `filter-dropdown.tsx` now uses `prod/base/menu` (Menu) instead of `legacy-base-ui/menu` (RevealMenu)

### 4. Legacy Imports (NEEDS MIGRATION)

| File | Import | Source | Used For |
|------|--------|--------|----------|
| `components/skeleton/skeleton-cells.tsx:11` | Skeleton | `@/modules/design-system/components/skeleton` | Loading skeleton primitives |
| `components/skeleton/toolbar-skeleton.tsx:11` | Skeleton | (same) | Toolbar skeleton |

**Note**: This is a very simple component (7 lines) - can be copied into prod/ or table itself.

### 5. Untitled UI Icons (MUST REPLACE)

Per prod/ policy, all icons must use HugeIcons. The following Untitled UI icons are used:

| File | Icon | Replacement Suggestion | Status |
|------|------|----------------------|--------|
| ~~`components/column-control-panel.tsx`~~ | ~~`DotsVertical`~~ | `MoreVerticalIcon` | **MIGRATED** |
| ~~`components/table-empty-state.tsx:3`~~ | ~~`SearchLg`~~ | `Search01Icon` | **MIGRATED** |
| ~~`components/table-empty-state.tsx:3`~~ | ~~`Inbox01`~~ | `InboxIcon` | **MIGRATED** |

### 6. External NPM Packages (SAFE)

These are stable dependencies and can remain:

| Package | Usage |
|---------|-------|
| `react`, `react-dom` | Core React |
| `react-aria-components` | Accessibility primitives |
| `@hugeicons-pro/core-stroke-rounded/*` | Icons (compliant) |
| `@hugeicons/react` | Icon renderer |
| `sonner` | Toast notifications |
| `export-to-csv` | CSV export functionality |

### 7. Utility Imports

| Import | Files | Recommendation |
|--------|-------|----------------|
| `@/utils/cx` | 3 files | Use `@/lib/utils` (cn) for consistency |
| `@/v2/utils/cx` | 1 file | Use `@/lib/utils` (cn) for consistency |
| `@/lib/utils` | 1 file (Skeleton) | Already correct |

---

## Dependency Resolution Order

Migration must follow this order to avoid broken imports:

### Phase 1: Primitives (No dependencies)
1. **Skeleton** - Copy simple component to prod/base/skeleton
2. **Checkbox** - Migrate untitled-ui checkbox to prod/base/checkbox
3. **Tooltip** - Migrate untitled-ui tooltip to prod/base/tooltip

### Phase 2: Composite Components
4. **ButtonUtility** - Migrate after Tooltip (depends on Tooltip)
5. **Dropdown** - Migrate untitled-ui dropdown to prod/base/dropdown
6. **FeaturedIcon** - Migrate untitled-ui featured-icon to prod/base/featured-icon

### Phase 3: Complex Systems
7. **Menu System** - Migrate base-ui/menu to prod/base/menu (or keep shared)
8. **Filter System** - Migrate base-ui/filter to prod/base/filter (or keep shared)

### Phase 4: StickyDataTable
9. **Update StickyDataTable imports** - Point all imports to prod/ equivalents
10. **Move StickyDataTable** - Copy to prod/data/sticky-data-table
11. **Replace Untitled UI icons** - Swap to HugeIcons equivalents

---

## Files Requiring Changes

When migrating, these files need import updates:

```
sticky-data-table/
├── components/
│   ├── column-control-panel.tsx    [✅ FULLY MIGRATED - prod/base/menu (checkbox items), prod/base/button-utility, Hugeicons]
│   ├── export-toolbar.tsx          [✅ MIGRATED - prod/base/button-utility, prod/base/icon]
│   ├── filter-dropdown.tsx         [✅ MIGRATED - prod/base/menu, prod/base/icon]
│   ├── filter-toolbar.tsx          [✅ MIGRATED - prod/base/filter]
│   ├── table-empty-state.tsx       [✅ FULLY MIGRATED - prod/base/button, prod/features/featured-icon, Hugeicons]
│   ├── table-header/
│   │   └── header-cell.tsx         [✅ MIGRATED - prod/base/checkbox]
│   ├── table-row.tsx               [✅ MIGRATED - prod/base/checkbox]
│   └── skeleton/
│       ├── skeleton.tsx            [✅ LOCAL - self-contained skeleton primitive]
│       ├── skeleton-cells.tsx      [✅ MIGRATED - uses local ./skeleton]
│       └── toolbar-skeleton.tsx    [✅ MIGRATED - uses local ./skeleton]
├── config/
│   └── filter.ts                   [✅ MIGRATED - prod/base/menu types]
```

**Note**: `search-toolbar.tsx` was DELETED (Jan 2026) - superseded by `prod/features/expanding-search`

**Total files**: 10 files (all fully migrated)

---

## Alternative Strategies

### Strategy A: Full Migration (Recommended)
Migrate all dependencies to prod/, then migrate StickyDataTable.

**Pros**: Clean architecture, no legacy references
**Cons**: Significant upfront work, ~8 components to migrate first

### Strategy B: Partial Migration with Shared Dependencies
Keep base-ui/menu and base-ui/filter as shared modules, migrate only primitives.

**Pros**: Less work, reuses existing tested code
**Cons**: StickyDataTable still has external dependencies

### Strategy C: Inline Dependencies
Copy dependency code directly into StickyDataTable folder.

**Pros**: Fully self-contained, no external dependencies
**Cons**: Code duplication, harder to maintain

### Strategy D: Gradual Migration
Move StickyDataTable first with legacy imports, update imports one-by-one.

**Pros**: Can ship incrementally
**Cons**: Temporary broken consistency, technical debt

---

## Recommended Approach

**Strategy A (Full Migration)** is recommended because:

1. StickyDataTable is a core data component used across the product
2. The dependency components (Checkbox, Button, etc.) will be needed by other prod/ components anyway
3. Establishes clean architectural boundaries
4. One-time effort that benefits all future development

### Immediate Actions

1. **Migrate Skeleton** to `prod/base/skeleton/` (5 minutes - simple component)
2. **Migrate Checkbox** to `prod/base/checkbox/` (already using Base UI via react-aria)
3. **Migrate Tooltip** to `prod/base/tooltip/` (standard component)
4. **Migrate ButtonUtility** to `prod/base/button-utility/` (after Tooltip)

After these 4 components are migrated, the remaining blockers can be addressed incrementally.

---

## Migration Log

### January 2026 - Filter System Migration (Phase 1: filter-toolbar)

**Files Changed**:
1. `components/filter-toolbar.tsx`
   - Changed imports from `legacy-base-ui/filter` to `prod/base/filter`
   - Updated `FilterTriggerButton` to `FilterTrigger` with new prop API
   - Changed `chipConfig` prop to `config` for FilterChip
   - Added helper functions to map legacy config to PROD config

2. `config/filter.ts`
   - Changed imports from `legacy-base-ui/menu` to `prod/base/menu`
   - Updated `FilterMenuConfig` interface to use PROD types
   - Renamed properties: `border` -> `shine`, `cornerSquircle` -> `squircle`, `backgroundColor` -> `background`
   - Updated `toMenuAppearanceConfig()` to return PROD `MenuAppearance`

**API Changes**:
- PROD `FilterChip` uses `config` prop instead of `chipConfig`
- PROD `FilterTrigger` uses individual props (`size`, `variant`, `rounded`) instead of config object
- PROD `MenuItemAction` doesn't have `addon` property - counts now included in label text

**Type Mapping**:
| Legacy Type | PROD Type |
|-------------|-----------|
| `MenuAppearanceConfig` | `MenuAppearance` |
| `MenuBorderRadius` | `BorderRadius` |
| `MenuShadow` | `Shadow` |
| `MenuBorderStyle` | `ShineVariant` |
| `MenuBackgroundColor` | `Background` |
| `ChipStyleConfig` | `ChipConfig` |

### January 2026 - Menu Migration (Phase 2: filter-dropdown)

**Files Changed**:
1. `components/filter-dropdown.tsx`
   - Changed `RevealMenu` to `Menu` from `prod/base/menu`
   - Changed `MenuItem` type to `MenuItemType`
   - Changed `HugeIcon` import to `prod/base/icon`
   - Updated `revealConfig` to `animation` with PROD API

**API Changes**:
- `RevealMenu` → `Menu` (component name)
- `MenuItem` → `MenuItemType` (type name)
- `variant` prop removed (use `appearance` for styling)
- `revealConfig` → `animation` (different config structure)

**Legacy revealConfig → PROD animation mapping**:
| Legacy `revealConfig` | PROD `animation` |
|-----------------------|------------------|
| `duration` | `duration` |
| `easing` | `easing` |
| `direction` | N/A (handled internally) |
| `scaleStart` | N/A (handled internally) |
| `scaleEnd` | N/A (handled internally) |
| `contentAnimation` | N/A (use `opacityMode`) |
| `contentDelay` | `fadeInDelay` |

### January 2026 - ExpandingSearch Migration (table-payva-v2 playground)

**Files Changed**:
1. `playground/ui/gallery/table-payva-v2/components/toolbar-content.tsx`
   - Changed `ExpandingSearch` import from `custom/expanding-search` to `prod/features/expanding-search`

2. `playground/ui/gallery/table-payva-v2/hooks/use-table-v2-state.ts`
   - Changed `useSearchWithEmptyState` import from `custom/expanding-search` to `prod/features/expanding-search`

3. `playground/ui/gallery/table-payva-v2/sections/table-content.tsx`
   - Changed `EmptyStateConfig` type import from `custom/expanding-search` to `prod/features/expanding-search`

**Integration Pattern**:
The ExpandingSearch is integrated via the `rightToolbar` prop:
```tsx
<StickyDataTable
  rightToolbar={<RightToolbarContent searchProps={state.searchProps} />}
  ...
/>
```

Where `RightToolbarContent` renders:
```tsx
<ExpandingSearch {...searchProps} />
```

**Deprecation Notes**:
- `custom/expanding-search/` - Can be deprecated (replaced by `prod/features/expanding-search`)
- `sticky-data-table/components/search-toolbar.tsx` - Can be deprecated (static search bar superseded by ExpandingSearch)

### January 2026 - Toolbar Buttons Migration (export-toolbar, column-control-panel)

**Files Changed**:
1. `components/export-toolbar.tsx`
   - Changed `HugeIcon` import from `custom/base/icon` to `prod/base/icon`
   - Changed `ButtonUtility` import from `untitled-ui` to `prod/base/button-utility`

2. `components/column-control-panel.tsx`
   - Changed `DotsVertical` icon from `@untitledui-pro/icons/line` to `MoreVerticalIcon` from `@hugeicons-pro/core-stroke-rounded`
   - Changed `ButtonUtility` import from `untitled-ui` to `prod/base/button-utility`
   - Added `HugeIcon` import from `prod/base/icon` for icon wrapper

**Icon Mapping**:
| Untitled UI Icon | Hugeicons Replacement |
|------------------|----------------------|
| `DotsVertical` | `MoreVerticalIcon` |

**API Notes**:
- PROD `ButtonUtility` accepts HugeIcon arrays directly via the `icon` prop
- Uses `HugeIcon` wrapper internally with `data-icon` attribute for sizing
- Tooltip is built-in via PROD `prod/base/tooltip`
- Uses `color="tertiary"` for transparent background with hover state

**column-control-panel.tsx - FULLY MIGRATED**:
- `Dropdown` replaced by `prod/base/menu` with new config-driven API
- `CheckboxBase` replaced by checkbox menu items via `prod/base/menu`
- `ButtonUtility` now uses `prod/base/button-utility` (works with Base UI Menu.Trigger)

**Implementation Pattern**:
The column control panel now uses the config-driven `prod/base/menu` component:
```tsx
import { Menu, type MenuItemType } from '@/modules/design-system/v2/components/ui/prod/base/menu'
import { ButtonUtility } from '@/modules/design-system/v2/components/ui/prod/base/button-utility'

const menuItems: MenuItemType[] = [
  { type: 'label', id: 'header', label: 'Column Visibility' },
  { type: 'checkbox', id: 'col-1', label: 'Column Name', checked: true, onCheckedChange: handleToggle },
  { type: 'separator', id: 'sep1' },
  { type: 'action', id: 'reset', label: 'Reset All', onClick: handleReset },
]

<Menu
  trigger={<ButtonUtility icon={DotsIcon} tooltip="Column Visibility" size="sm" color="tertiary" />}
  items={menuItems}
  width={220}
  side="bottom"
  align="end"
/>
```

**prod/base/menu Checkbox Item Type**:
```typescript
interface MenuItemCheckbox {
  type: 'checkbox'
  id: string
  label: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  disabled?: boolean
  closeOnClick?: boolean // default: false (keeps menu open)
}
```

### January 2026 - Empty State Migration (table-empty-state)

**Files Changed**:
1. `components/table-empty-state.tsx`
   - Changed `FeaturedIcon` import from `untitled-ui/foundations/featured-icon` to `prod/features/featured-icon`
   - Changed `Button` import from `untitled-ui/base/buttons/button` to `prod/base/button`
   - Changed `SearchLg` icon from `@untitledui-pro/icons/line` to `Search01Icon` from `@hugeicons-pro/core-stroke-rounded`
   - Changed `Inbox01` icon from `@untitledui-pro/icons/line` to `InboxIcon` from `@hugeicons-pro/core-stroke-rounded`
   - Changed `cx` utility to `cn` from `@/lib/utils`

2. Created `prod/features/featured-icon/`
   - `types.ts` - Type definitions for FeaturedIconProps, size, color, theme variants
   - `config.ts` - Theme styles configuration (light, gradient, dark, modern, modern-neue, outline)
   - `featured-icon.tsx` - Main component using `prod/base/icon` HugeIcon wrapper
   - `index.ts` - Barrel exports

**API Mapping (Button)**:
| Legacy (untitled-ui) | PROD (prod/base/button) |
|----------------------|-------------------------|
| `color="primary"` | `variant="primary"` |
| `color="secondary"` | `variant="secondary"` |

**Icon Mapping**:
| Untitled UI Icon | Hugeicons Replacement |
|------------------|----------------------|
| `SearchLg` | `Search01Icon` |
| `Inbox01` | `InboxIcon` |

---

### January 2026 - Skeleton & Utility Migration (Final Cleanup)

**Files Changed**:
1. `components/skeleton/skeleton.tsx` (NEW)
   - Created local Skeleton component to eliminate legacy import
   - Simple 7-line component using `cn` from `@/lib/utils`

2. `components/skeleton/skeleton-cells.tsx`
   - Changed `Skeleton` import from `../../../../../../../../components/skeleton` to `./skeleton`

3. `components/skeleton/toolbar-skeleton.tsx`
   - Changed `Skeleton` import from `../../../../../../../../components/skeleton` to `./skeleton`

4. `components/filter-dropdown.tsx`
   - Changed `cx` import from `@/utils/cx` to `cn` from `@/lib/utils`
   - Replaced all `cx(` calls with `cn(`

5. `components/filter-toolbar.tsx`
   - Changed `cx` import from `@/utils/cx` to `cn` from `@/lib/utils`
   - Replaced all `cx(` calls with `cn(`

6. `components/search-toolbar.tsx`
   - Changed `cx` import from `@/utils/cx` to `cn` from `@/lib/utils`
   - Replaced all `cx(` calls with `cn(`

**Migration Notes**:
- The legacy Skeleton component was a simple 7-line component, so it was copied directly into the sticky-data-table rather than creating a new `prod/base/skeleton`
- All `cx` utility usages migrated to `cn` for consistency with the rest of the codebase

---

### January 2026 - Checkbox Migration (table-header, table-row)

**Files Changed**:
1. `components/table-header/header-cell.tsx`
   - Changed `Checkbox` import from `untitled-ui/base/checkbox/checkbox` to `prod/base/checkbox`
   - Updated props: `isSelected` → `checked`, `isIndeterminate` → `indeterminate`, `onChange` → `onCheckedChange`

2. `components/table-row.tsx`
   - Changed `Checkbox` import from `untitled-ui/base/checkbox/checkbox` to `prod/base/checkbox`
   - Updated props: `isSelected` → `checked`, `onChange` → `onCheckedChange`
   - Moved `onClick={(e) => e.stopPropagation()}` to wrapper div (prod checkbox doesn't expose onClick)

3. `prod/base/checkbox/types.ts`
   - Added `'aria-label'?: string` prop for accessibility (used by table checkboxes)

4. `prod/base/checkbox/checkbox.tsx`
   - Added aria-label passthrough to BaseCheckbox.Root

**API Mapping**:
| Legacy (untitled-ui) | PROD (prod/base/checkbox) |
|----------------------|---------------------------|
| `isSelected` | `checked` |
| `isIndeterminate` | `indeterminate` |
| `onChange` | `onCheckedChange` |
| `onClick` | N/A (use wrapper) |
| `size` | `size` ✓ |
| `aria-label` | `aria-label` ✓ (newly added) |

---

## Validation Checklist

Before declaring migration complete:

- [x] No imports from `untitled-ui/` (FeaturedIcon, Button now use prod/)
- [x] No imports from `custom/base/icon` (now uses `prod/base/icon`)
- [x] No imports from `legacy-base-ui/filter` in filter-toolbar.tsx
- [x] No imports from `legacy-base-ui/menu` in config/filter.ts
- [x] No imports from `legacy-base-ui/menu` in filter-dropdown.tsx
- [x] table-payva-v2 playground uses `prod/features/expanding-search`
- [x] export-toolbar.tsx uses `prod/base/button-utility` + `prod/base/icon`
- [x] column-control-panel.tsx fully migrated: `prod/base/menu` (with checkbox items) + `prod/base/button-utility` + Hugeicons
- [x] table-header/header-cell.tsx uses `prod/base/checkbox`
- [x] table-row.tsx uses `prod/base/checkbox`
- [x] table-empty-state.tsx uses `prod/base/button` + `prod/features/featured-icon` + Hugeicons
- [x] No imports from legacy `@/modules/design-system/components/` (Skeleton now local)
- [x] All icons use `@hugeicons-pro/*` or `prod/base/icon`
- [x] All utilities use `@/lib/utils` (cn)
- [x] TypeScript compiles without errors (filter-toolbar.tsx, config/filter.ts, filter-dropdown.tsx)
- [x] TypeScript compiles without errors (table-payva-v2 ExpandingSearch migration)
- [x] TypeScript compiles without errors (export-toolbar.tsx, column-control-panel.tsx)
- [x] TypeScript compiles without errors (table-header/header-cell.tsx, table-row.tsx checkbox migration)
- [ ] All existing functionality preserved
- [ ] Playground verified: http://localhost:3001/playground/ui/gallery/table-payva-v2

### Playground Verification Steps

1. Open http://localhost:3001/playground/ui/gallery/table-payva-v2
2. Click "Add a filter" button - should open PROD Menu with reveal animation
3. Select a category (e.g., Risk Status) - should navigate to submenu with slide animation
4. Select a filter value - filter chip should appear with expand animation
5. Click X on chip to remove filter
6. Click "Clear all" to remove all filters
7. **ExpandingSearch**: Click the search icon on the right side of the toolbar
8. Search should expand with smooth animation (delay reveal mode)
9. Type a search term - table should filter in real-time
10. Click the X button to clear search
11. Click outside or blur - search should collapse back to icon
12. **Export Button**: Hover over download icon - tooltip should appear ("Export All")
13. Click export button - should trigger export (check console for log)
14. **Column Control**: Hover over three-dots icon - tooltip should appear ("Column Visibility")
15. Click column control button - dropdown should open with checkbox list
16. Toggle column visibility - table should update

---

## References

- [prod/ README](/src/modules/design-system/v2/components/ui/prod/README.md)
- [prod/ Migration Tracking](/src/modules/design-system/v2/components/ui/prod/docs/MIGRATION.md)
- [Base UI Primitives Guide](/src/modules/design-system/v2/components/ui/prod/docs/BASE-UI-PRIMITIVES.md)
- [StickyDataTable Documentation](./INDEX.md)

---

*This audit should be updated whenever dependencies change or migrations occur.*

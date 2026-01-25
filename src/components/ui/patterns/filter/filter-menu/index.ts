/**
 * Filter Menu
 *
 * A derivative of the base Menu component specialized for filtering.
 * Built on Base UI primitives with reveal animation and panel navigation.
 *
 * @module prod/base/filter/filter-menu
 *
 * @example Basic Usage
 * ```tsx
 * import { FilterMenu } from '@/components/ui/prod/base/filter/filter-menu'
 *
 * <FilterMenu
 *   items={filterItems}
 *   onFilterSelect={(id) => handleSelect(id)}
 *   activeFilterIds={['status-active']}
 * />
 * ```
 */

// ============================================================================
// Components
// ============================================================================

export { FilterMenu } from './filter-menu'
export type { FilterMenuProps } from './filter-menu'

export { FilterMenuHeader } from './filter-menu-header'
export type { FilterMenuHeaderProps } from './filter-menu-header'

// Default items for demos
export { DEFAULT_FILTER_ITEMS } from './default-items'

// Note: Menu types and config are available from '@/components/ui/core'
// (MenuItemComponent, MenuBackButton, MenuItemType, AnimationConfig, etc.)

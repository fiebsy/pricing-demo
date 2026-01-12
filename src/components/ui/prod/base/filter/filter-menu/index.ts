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

// ============================================================================
// Re-export from base Menu
// ============================================================================

// Components (use base menu components directly)
export { MenuItemComponent, MenuBackButton } from '../../menu'

// Types
export type {
  MenuItemType,
  MenuItemAction,
  MenuItemSubmenu,
  MenuItemSeparator,
  MenuItemLabel,
  MenuSide,
  MenuAlign,
  MenuAppearance,
  AnimationConfig,
  BorderRadius,
  Shadow,
  ShineVariant,
  Background,
  GradientPattern,
  GradientColor,
  IconType,
  PanelState,
} from '../../menu'

// Configuration
export {
  DEFAULT_APPEARANCE,
  DEFAULT_ANIMATION,
  DEFAULT_MENU_WIDTH,
  DEFAULT_SIDE_OFFSET,
  EASING_EXPO_OUT,
  MENU_ITEM_STYLES,
  getPopupClasses,
  getGradientStyles,
  getItemRadius,
  getSeparatorClasses,
} from '../../menu'

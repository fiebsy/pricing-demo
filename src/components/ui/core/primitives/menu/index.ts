/**
 * Menu - Public Exports
 *
 * Base menu component with reveal animation, panel navigation,
 * and configurable appearance. Built on Base UI primitives.
 *
 * @module prod/base/menu
 *
 * @example Basic Usage
 * ```tsx
 * import { Menu } from '@/components/ui/core/primitives/menu'
 *
 * <Menu
 *   items={[
 *     { id: 'edit', label: 'Edit', icon: Edit01Icon },
 *     { id: 'delete', label: 'Delete', icon: Delete01Icon },
 *   ]}
 *   trigger={<button>Actions</button>}
 *   onSelect={(item) => handleAction(item.id)}
 * />
 * ```
 */

// ============================================================================
// Components
// ============================================================================

export { Menu } from './menu'
export { MenuItem as MenuItemComponent } from './menu-item'
export { MenuBackButton } from './menu-back-button'

// ============================================================================
// Types
// ============================================================================

// Re-export MenuItem type with a clear name to avoid confusion with component
export type { MenuItem as MenuItemType } from './types'

export type {
  MenuProps,
  MenuItemAction,
  MenuItemCheckbox,
  MenuItemSubmenu,
  MenuItemSeparator,
  MenuItemLabel,
  MenuItemBase,
  MenuSide,
  MenuAlign,
  MenuAppearance,
  AnimationConfig,
  PanelState,
  IconType,
  BorderRadius,
  Shadow,
  ShineVariant,
  Background,
  GradientPattern,
  GradientColor,
} from './types'

// ============================================================================
// Configuration
// ============================================================================

export {
  DEFAULT_APPEARANCE,
  DEFAULT_ANIMATION,
  DEFAULT_MENU_WIDTH,
  DEFAULT_SIDE_OFFSET,
  REVEAL_ANIMATION,
  REVEAL_ANIMATION_CLASSES,
  USE_LEGACY_ANIMATION,
  Z_INDEX,
  EASING_EXPO_OUT,
  MENU_ITEM_STYLES,
  MENU_ITEM_STYLES_SMALL,
  SEPARATOR_STYLES,
  INTERACTIVE_STATES,
  getPopupClasses,
  getGradientStyles,
  getItemRadius,
  getSeparatorClasses,
  getRevealAnimationClasses,
  BORDER_RADIUS_CLASSES,
  SHADOW_CLASSES,
  BACKGROUND_CLASSES,
} from './config'

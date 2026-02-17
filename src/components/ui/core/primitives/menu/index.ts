/**
 * Menu - Public Exports
 *
 * Base menu component with spring animations, panel navigation,
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
 *
 * @example Spring Preset
 * ```tsx
 * <Menu
 *   items={items}
 *   trigger={trigger}
 *   animation={{
 *     springPreset: 'snappy',
 *   }}
 * />
 * ```
 *
 * @example Render Prop Trigger
 * ```tsx
 * <Menu
 *   items={items}
 *   trigger={({ isOpen, toggle }) => (
 *     <MyTrigger active={isOpen} onClick={toggle} />
 *   )}
 * />
 * ```
 *
 * @example Feature Toggles
 * ```tsx
 * <Menu
 *   items={items}
 *   trigger={trigger}
 *   features={{
 *     submenu: false,  // Disable submenu navigation
 *     animateHeight: false,  // Disable height animation
 *   }}
 * />
 * ```
 */

// ============================================================================
// Components
// ============================================================================

export { Menu } from './menu'
export { MenuItem as MenuItemComponent } from './menu-item'
export { MenuBackButton } from './menu-back-button'
export {
  UnifiedHoverProvider,
  UnifiedHoverIndicator,
  UnifiedHoverContainer,
  useUnifiedHover,
} from './unified-hover'

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
  MenuSide,
  MenuAlign,
  MenuAppearance,
  AnimationConfig,
  SpringPreset,
  MenuFeatures,
  TriggerState,
  PanelState,
  IconType,
  BorderRadius,
  Shadow,
  ShineVariant,
  Background,
  GradientPattern,
  GradientColor,
  UnifiedHoverConfig,
} from './types'

// ============================================================================
// Configuration
// ============================================================================

export {
  DEFAULT_APPEARANCE,
  DEFAULT_ANIMATION,
  DEFAULT_FEATURES,
  DEFAULT_UNIFIED_HOVER,
  DEFAULT_MENU_WIDTH,
  DEFAULT_SIDE_OFFSET,
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
  BORDER_RADIUS_CLASSES,
  SHADOW_CLASSES,
  BACKGROUND_CLASSES,
  // Spring animation exports
  SPRING_PRESETS,
  getSpringConfig,
  getSpringSettlingTime,
  // Reveal animation exports (Motion variants)
  REVEAL_ANIMATION,
  REVEAL_EASING,
  REVEAL_TRANSITION,
  createRevealVariants,
  createReducedMotionVariants,
  createRevealTransition,
} from './config'

export type { RevealVariantConfig } from './config'

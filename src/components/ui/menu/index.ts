/**
 * Base UI Menu - Animated Menu Component
 *
 * A feature-rich menu component with nested submenu support, smooth animations,
 * and GPU-accelerated transitions. Built on Base UI primitives for accessibility.
 *
 * @module base-ui/menu
 *
 * @example Basic usage with icon trigger
 * ```tsx
 * import { RevealMenu } from '@/modules/design-system/v2/components/ui/base-ui/menu'
 * import MoreHorizontalIcon from '@hugeicons-pro/core-stroke-rounded/MoreHorizontalCircle01Icon'
 *
 * <RevealMenu
 *   trigger={{ icon: MoreHorizontalIcon }}
 *   items={[
 *     { id: 'edit', label: 'Edit', onClick: () => {} },
 *     { id: 'delete', label: 'Delete', onClick: () => {}, className: 'text-error-primary' },
 *   ]}
 * />
 * ```
 *
 * @example With nested submenus
 * ```tsx
 * <RevealMenu
 *   trigger={{ icon: MoreHorizontalIcon }}
 *   items={[
 *     {
 *       id: 'actions',
 *       type: 'submenu',
 *       label: 'Actions',
 *       items: [
 *         { id: 'edit', label: 'Edit', onClick: () => {} },
 *         { id: 'duplicate', label: 'Duplicate', onClick: () => {} },
 *       ],
 *     },
 *   ]}
 * />
 * ```
 */

// =============================================================================
// COMPONENTS
// =============================================================================

export { RevealMenu } from './reveal-menu'
export { BaseUIMenu } from './base-ui-menu'

// Sub-components
export { IconTrigger, MenuItemComponent, BackButton } from './components'

// =============================================================================
// HOOKS
// =============================================================================

export { useMenuNavigation, useRevealAnimation } from './hooks'

// =============================================================================
// CONFIGURATION
// =============================================================================

export {
  DEFAULT_REVEAL_CONFIG,
  DEFAULT_HEIGHT_TRANSITION,
  DEFAULT_SLIDE_TRANSITION,
  DEFAULT_MENU_PROPS,
  EASING_PRESETS,
  HEIGHT_TRANSITION_PRESETS,
  ITEM_HEIGHT_CLASSES,
  ICON_SIZES,
  getTransformOrigin,
  TRANSFORM_ORIGINS,
  // Appearance configuration
  DEFAULT_APPEARANCE,
  APPEARANCE_CLASS_MAP,
  BACKGROUND_COLOR_CSS_VAR_MAP,
  getAppearanceClasses,
  getAppearanceStyle,
  // Dynamic border radius
  BORDER_RADIUS_PX,
  PADDING_PX,
  calculateItemRadius,
} from './config'

// =============================================================================
// TYPES
// =============================================================================

export type {
  // Menu item types
  MenuItem,
  MenuItemAction,
  MenuItemSubmenu,
  MenuItemSeparator,
  MenuItemLabel,

  // Configuration types
  MenuAlign,
  MenuSide,
  MenuVariant,
  RevealAnimationConfig,
  HeightTransitionConfig,
  SlideTransitionConfig,
  MenuCSSVars,

  // Appearance types
  MenuAppearanceConfig,
  MenuGradientPattern,
  MenuGradientColor,
  MenuBackgroundColor,
  MenuBorderRadius,
  MenuShadow,
  MenuBorderStyle,

  // Component props
  BaseUIMenuProps,
  RevealMenuProps,
  IconTriggerProps,
  IconTriggerConfig,
} from './types'

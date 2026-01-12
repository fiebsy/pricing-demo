/**
 * Skwircle Components
 *
 * Pre-configured compound components for common use cases.
 * Each component is a thin wrapper around the base Skwircle with variant preset.
 *
 * Usage: Import from the main skwircle index for compound component pattern:
 * ```tsx
 * import { Skwircle } from '@/modules/design-system/v2/components/ui/custom/base/skwircle'
 *
 * <Skwircle.Button intent="primary">...</Skwircle.Button>
 * <Skwircle.Card elevation="sm">...</Skwircle.Card>
 * ```
 *
 * Or import config helpers directly:
 * ```tsx
 * import {
 *   BUTTON_SIZE_CONFIGS,
 *   getButtonPaddingStyle,
 *   getBadgeColorConfig,
 * } from '@/modules/design-system/v2/components/ui/custom/base/skwircle'
 * ```
 */

// Button component and config
export {
  createSkwircleButton,
  type SkwircleButtonProps,
  // Re-exported config
  BUTTON_SIZE_CONFIGS,
  BUTTON_INTENT_CONFIGS,
  getButtonSizeConfig,
  getButtonIntentConfig,
  getButtonIconStyle,
  getButtonPaddingStyle,
  type ButtonSize,
  type ButtonIntent,
  type ButtonSizeConfig,
  type ButtonIntentConfig,
} from './skwircle-button'

// Badge component and config
export {
  createSkwircleBadge,
  type SkwircleBadgeProps,
  // Re-exported config
  BADGE_SIZE_CONFIGS,
  BADGE_TYPE_CONFIGS,
  BADGE_COLOR_CONFIGS,
  BADGE_COLOR_MODERN_GRAY,
  getBadgeSizeConfig,
  getBadgeTypeConfig,
  getBadgeColorConfig,
  getBadgePaddingStyle,
  getBadgeIconStyle,
  getBadgeTextStyle,
  type BadgeSize,
  type BadgeType,
  type BadgeColor,
  type BadgeSizeConfig,
  type BadgeTypeConfig,
  type BadgeColorConfig,
} from './skwircle-badge'

// Card component
export { createSkwircleCard, type SkwircleCardProps } from './skwircle-card'

// Input component
export { createSkwircleInput, type SkwircleInputProps } from './skwircle-input'

// Avatar component
export { createSkwircleAvatar, type SkwircleAvatarProps } from './skwircle-avatar'

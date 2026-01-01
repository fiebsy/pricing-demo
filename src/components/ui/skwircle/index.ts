/**
 * Skwircle - Unified Squircle Component
 *
 * Production-ready squircle primitive with variant-first API
 * and smart FOUC prevention.
 *
 * @example Basic
 * ```tsx
 * import { Skwircle } from '@/modules/design-system/v2/components/ui/custom/base/skwircle'
 *
 * <Skwircle variant="card" intent="default">
 *   Card content
 * </Skwircle>
 * ```
 *
 * @example Compound Components
 * ```tsx
 * <Skwircle.Card elevation="sm">Card</Skwircle.Card>
 * <Skwircle.Button intent="primary">Button</Skwircle.Button>
 * <Skwircle.Badge intent="success">Badge</Skwircle.Badge>
 * ```
 */

// Main component
export { Skwircle } from './skwircle'

// Types
export type {
  SkwircleProps,
  SkwircleVariant,
  SkwircleIntent,
  SkwircleSize,
  SkwircleState,
  SkwircleRoundness,
  SkwircleElevation,
  SkwircleBorderGradient,
  SkwircleBackgroundGradient,
  SkwircleMountStrategy,
  SkwircleCardProps,
  SkwircleButtonProps,
  SkwircleBadgeProps,
  SkwircleInputProps,
  SkwircleAvatarProps,
  SkwircleComponent,
  RoundnessConfig,
  CustomShadowConfig,
  GradientConfig,
} from './types'

// Config (for advanced customization)
export {
  VARIANT_CONFIGS,
  INTENT_CONFIGS,
  ROUNDNESS_CONFIGS,
  ELEVATION_CONFIGS,
  GRADIENT_BORDER_PRESETS,
  BACKGROUND_GRADIENT_PRESETS,
  getIntentConfig,
  getVariantConfig,
  // Badge-specific configuration
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
  // Button-specific configuration
  BUTTON_SIZE_CONFIGS,
  BUTTON_INTENT_CONFIGS,
  getButtonSizeConfig,
  getButtonIntentConfig,
  getButtonIconStyle,
  getButtonPaddingStyle,
} from './config'

// Badge types
export type {
  BadgeSize,
  BadgeType,
  BadgeColor,
  BadgeSizeConfig,
  BadgeTypeConfig,
  BadgeColorConfig,
} from './config'

// Button types
export type {
  ButtonSize,
  ButtonIntent,
  ButtonSizeConfig,
  ButtonIntentConfig,
} from './config'


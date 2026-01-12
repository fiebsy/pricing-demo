/**
 * Skwircle Configuration
 */

// Roundness
export { ROUNDNESS_CONFIGS, getRoundnessConfig } from './roundness'

// Elevations
export { ELEVATION_CONFIGS, getElevationConfig, hasVisibleShadow } from './elevations'

// Variants
export {
  VARIANT_CONFIGS,
  getVariantConfig,
  CONTENT_WRAPPER_CLASSES,
  getContentWrapperClass,
} from './variants'

// Intents
export {
  INTENT_CONFIGS,
  VARIANT_INTENT_OVERRIDES,
  getIntentConfig,
  INPUT_STATE_CONFIGS,
  getInputStateConfig,
} from './intents'

// Gradients
export {
  GRADIENT_BORDER_PRESETS,
  BACKGROUND_GRADIENT_PRESETS,
  getBorderGradientConfig,
  getBackgroundGradientConfig,
} from './gradients'

// Badge Configuration
export {
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
} from './badge'
export type { BadgeSize, BadgeType, BadgeColor, BadgeSizeConfig, BadgeTypeConfig, BadgeColorConfig } from './badge'

// Button Configuration
export {
  BUTTON_SIZE_CONFIGS,
  BUTTON_INTENT_CONFIGS,
  getButtonSizeConfig,
  getButtonIntentConfig,
  getButtonIconStyle,
  getButtonPaddingStyle,
} from './button'
export type { ButtonSize, ButtonIntent, ButtonSizeConfig, ButtonIntentConfig } from './button'

// Re-export types for convenience
export type { SkwircleRoundness, SkwircleElevation } from '../types'

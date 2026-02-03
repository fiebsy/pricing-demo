// =============================================================================
// Control Panel Design Tokens - Public API
// =============================================================================
// Re-exports all token constants for easy consumption.
// =============================================================================

// Colors
export {
  SEMANTIC_TEXT_COLORS,
  SEMANTIC_BG_COLORS,
  SEMANTIC_BORDER_COLORS,
  getColorsByCategory,
  toSelectOptions as toColorSelectOptions,
} from './colors'
export type { SemanticColorOption } from './colors'

// Typography
export {
  FONT_WEIGHT_OPTIONS,
  COMMON_FONT_WEIGHTS,
  FONT_SIZE_OPTIONS,
  DISPLAY_FONT_SIZES,
  LINE_HEIGHT_OPTIONS,
  LETTER_SPACING_OPTIONS,
  getFontWeight,
  getFontSizePixels,
} from './typography'
export type {
  FontWeightOption,
  FontSizeOption,
  LineHeightOption,
  LetterSpacingOption,
} from './typography'

// Border Radius
export {
  BORDER_RADIUS_OPTIONS,
  COMMON_RADIUS_OPTIONS,
  getRadiusPixels,
  getRadiusClassName,
} from './radius'
export type { RadiusOption } from './radius'

// Shine & Effects
export {
  SHINE_PRESET_OPTIONS,
  SHINE_INTENSITY_OPTIONS,
  SHINE_SHADOW_OPTIONS,
  DEPTH_GRADIENT_OPTIONS,
  getShineClassName,
  getShineWithShadow,
} from './shine'
export type {
  ShinePresetOption,
  ShineIntensityOption,
  ShineShadowOption,
  DepthGradientOption,
} from './shine'

// Animation
export {
  EASING_OPTIONS,
  COMMON_EASING_OPTIONS,
  DURATION_OPTIONS,
  DURATION_PRESETS,
  DELAY_OPTIONS,
  SPRING_OPTIONS,
  getEasingCssValue,
  getMotionEasing,
  getDurationSeconds,
} from './animation'
export type {
  EasingOption,
  DurationOption,
  DelayOption,
  SpringOption,
} from './animation'

// Spacing
export {
  SPACING_SCALE,
  GAP_OPTIONS,
  PADDING_OPTIONS,
  MARGIN_OPTIONS,
  getSpacingPixels,
  getGapClassName,
  getPaddingClassName,
} from './spacing'
export type { SpacingOption } from './spacing'

// Validation (dev utilities)
export {
  validateCssVariable,
  validateToken,
  validateTokens,
  validateAllColorTokens,
  runValidation,
  generateTailwindClassReport,
} from './validate'
export type { ValidationResult, ValidationSummary } from './validate'

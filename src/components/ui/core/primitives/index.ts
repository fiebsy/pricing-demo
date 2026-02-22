/**
 * Core Primitives
 * ================
 * Stable, hardened UI primitives that are production-ready.
 * These components are well-tested and have consistent APIs.
 */

// Badge
export { Badge, BadgeGroup } from './badge'
export type {
  BadgeProps,
  BadgeGroupProps,
  BadgeColor,
  BadgeSize,
  BadgeGroupSize,
  BadgeShape,
  BadgeStyle,
  BadgeGroupTheme,
  BadgeGroupAlign,
  BadgeIconProp,
} from './badge'
export {
  badgeColorStyles,
  badgeSizeStyles,
  badgeShapeStyles,
  badgeStyleVariantStyles,
  badgeGroupThemeStyles,
  badgeGroupColorStyles,
  badgeGroupSizeStyles,
} from './badge'

// Icon
export { HugeIcon, Icon } from './icon'
export type { HugeIconData, IconSize } from './icon'

// Button
export * from './button'

// Button Utility
export * from './button-utility'

// Menu
export * from './menu'

// Slider
export { InlineSlider, TickSlider } from './slider'
export type { InlineSliderProps, SliderBaseProps } from './slider'
export { sliderConfig, inlineSliderStyles, tickSliderStyles } from './slider'

// Animated Count
export { AnimatedCount, countEasings } from './animated-count'
export type { AnimatedCountProps } from './animated-count'

// Fluid Button Group
export { FluidButtonGroup, TIMING_PRESETS, DEFAULT_GAP, DEFAULT_BLUR_CONFIG } from './fluid-button-group'
export type {
  FluidButtonGroupProps,
  FluidTiming,
  FluidTimingPreset,
  FluidBlurConfig,
} from './fluid-button-group'

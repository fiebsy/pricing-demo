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

// Slider
export { InlineSlider } from './slider'
export type { InlineSliderProps, SliderBaseProps } from './slider'
export { sliderConfig, inlineSliderStyles } from './slider'

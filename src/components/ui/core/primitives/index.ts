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

// Button
export { Button } from './button'
export type {
  ButtonProps,
  ButtonBaseProps,
  ButtonElementProps,
  ButtonLinkProps,
  ButtonRoundness,
  ButtonSize,
  ButtonVariant,
  IconProp,
} from './button'
export {
  buttonCommonStyles,
  buttonRoundnessStyles,
  buttonSizeStyles,
  buttonVariantStyles,
} from './button'

// Button Utility
export { ButtonUtility } from './button-utility'
export type { ButtonUtilityProps } from './button-utility'

// Icon
export { HugeIcon, Icon } from './icon'
export type { HugeIconData, IconSize } from './icon'

// Accordion
export { Accordion } from './accordion'
export type {
  AccordionProps,
  AccordionItemProps,
  AccordionSize,
} from './accordion'

// Menu
export * from './menu'

// Slider
export { InlineSlider } from './slider'
export type { InlineSliderProps, SliderBaseProps } from './slider'
export { sliderConfig, inlineSliderStyles } from './slider'

// Components
export { HugeIcon, Icon } from './huge-icon'

// Types
export type {
  HugeIconProps,
  IconContainerProps,
  HugeIconData,
  IconSize,
  IconSizePreset,
  IconSizeNumeric,
  IconColor,
  StrokeWidth,
  StrokeWidthPreset,
  IconVariant,
} from './types'

// Config (for advanced usage)
export {
  sizePresets,
  colorStyles,
  strokeWidthPresets,
  resolveSize,
  resolveColorClass,
  resolveStrokeWidth,
  getVariantStrokeWidth,
  isFilledVariant,
  isStrokedVariant,
  filledVariants,
  strokedVariants,
  containerStyles,
  packagesByVariant,
  allPackages,
} from './config'

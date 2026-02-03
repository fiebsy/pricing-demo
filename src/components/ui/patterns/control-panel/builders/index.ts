// =============================================================================
// Section Builders - Public API
// =============================================================================
// Pre-built section builders for rapid playground creation.
// =============================================================================

// Typography
export { createTypographySection, getTypographyGroups } from './typography'
export type { TypographyValues, TypographyOptions } from './typography'

// Colors
export { createColorsSection, getColorGroups } from './colors'
export type { ColorValues, ColorOptions } from './colors'

// Border Radius
export { createBorderRadiusSection, getRadiusGroups } from './radius'
export type { RadiusValues, RadiusOptions } from './radius'

// Shine & Effects
export { createShineSection, getShineGroups } from './shine'
export type { ShineValues, ShineOptions } from './shine'

// Animation
export { createAnimationSection, getAnimationGroups } from './animation'
export type { AnimationValues, AnimationOptions } from './animation'

// Spacing
export { createSpacingSection, getSpacingGroups } from './spacing'
export type { SpacingValues, SpacingOptions } from './spacing'

// Utilities
export {
  createSection,
  filterGroups,
  toControlGroups,
  getValue,
  slider,
  select,
  toggle,
} from './utils'
export type { BuilderOptions, GroupDefinition } from './utils'

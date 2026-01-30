/**
 * StickyDataTable - Calculators Index
 *
 * Re-exports all calculation utilities.
 *
 * @module config/calculators
 */

// Toolbar calculators
export {
  calculateIntegratedHeaderGap,
  calculateToolbarHeight,
} from './toolbar'

// Skeleton calculators
export {
  type SkeletonDimensionConfig,
  calculateSkeletonHeight,
} from './skeleton'

// Deep merge utility
export { deepMerge } from './deep-merge'

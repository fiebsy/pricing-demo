/**
 * ButtonAnimation V2 - Animation Utilities
 *
 * Re-exports all animation utilities.
 *
 * @module prod/base/button-animation-v2/animation
 */

export {
  getTransition,
  getChildTransition,
  getExitTransition,
  SPRING_PRESETS,
  type SpringTransition,
  type DurationTransition,
  type TransitionConfig,
} from './spring-utils'

export {
  getEntryOffset,
  getStaggerIndex,
  getChildDelay,
  type EntryOffset,
} from './stagger-utils'

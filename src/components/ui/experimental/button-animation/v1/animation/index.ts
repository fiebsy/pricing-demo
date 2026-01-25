/**
 * ButtonAnimation - Animation Utilities
 *
 * Re-exports all animation utilities for convenient import.
 *
 * @module prod/base/button-animation/animation
 */

// Spring and transition utilities
export {
  getTransition,
  getExitTransition,
  SPRING_PRESETS,
  type SpringTransition,
  type DurationTransition,
  type TransitionConfig,
  type TransitionParams,
} from './spring-utils'

// Stagger and entry utilities
export {
  getEntryOffset,
  getStaggerIndex,
  getChildDelay,
  type EntryOffset,
} from './stagger-utils'

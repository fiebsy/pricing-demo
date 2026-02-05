/**
 * StackingNav - Utility Exports
 *
 * @module features/stacking-nav/utils
 */

export {
  getChildEntryOffset,
  getChildDelay,
  getPromotionAnimation,
  getExitAnimation,
} from './animations'

export {
  configureDebug,
  debug,
  debugTable,
} from './debug'

export {
  computeItemState,
} from './item-state'

export type {
  DebugCategory,
} from './debug'

export type {
  AnimationMode,
  ItemRenderState,
  ItemStateContext,
} from './item-state'

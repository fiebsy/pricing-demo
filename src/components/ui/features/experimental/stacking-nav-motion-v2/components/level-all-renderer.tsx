/**
 * StackingNav V2 - Level-All Renderer
 *
 * Motion wrapper for the virtual Level-All item.
 * V2 fix: Dynamic z-index - higher when active.
 *
 * @module features/stacking-nav-v2/components
 */

'use client'

import { motion } from 'motion/react'
import type { AnimationConfig } from '../types'
import {
  getChildDelay,
  getChildEntryOffset,
  getInstantExitAnimation,
  getTransition,
  getCollapseLayoutTransition,
} from '../utils/animations'
import { computeLevelAllZIndex } from '../utils/item-state'
import { LevelAllItem } from './level-all-item'

interface LevelAllRendererProps {
  itemId: string
  isActive: boolean
  isHoverSuppressed: boolean
  baseParentOffset: number
  animationConfig: AnimationConfig
  shouldReduceMotion: boolean
  isCollapsingNow: boolean
  isPromotingPhase: boolean
  parentAnchoredOffset: number
}

export function LevelAllRenderer({
  itemId,
  isActive,
  isHoverSuppressed,
  baseParentOffset,
  animationConfig,
  shouldReduceMotion,
  isCollapsingNow,
  isPromotingPhase,
  parentAnchoredOffset,
}: LevelAllRendererProps) {
  // Level-All uses index 0 for stagger, and respects promotion sequencing
  const animationDelay = isCollapsingNow
    ? 0
    : getChildDelay(0, animationConfig, isPromotingPhase)

  // Pass parentAnchoredOffset for entryFromParent, baseParentOffset for entryInstant
  const entryOffset = shouldReduceMotion
    ? { x: 0, y: 0 }
    : getChildEntryOffset(animationConfig, parentAnchoredOffset, baseParentOffset)

  // Use instant exit for consistency with item-renderer
  const levelAllExit = shouldReduceMotion
    ? undefined
    : getInstantExitAnimation()

  const levelAllTransition = isCollapsingNow
    ? {
        ...getTransition(animationConfig, animationDelay),
        ...getCollapseLayoutTransition(animationConfig),
      }
    : getTransition(animationConfig, animationDelay)

  // V2 fix: Dynamic z-index based on active state
  const zIndex = computeLevelAllZIndex(isActive)

  return (
    <motion.div
      key={itemId}
      layout="position"
      className={
        isHoverSuppressed
          ? 'inline-flex [&_button]:!pointer-events-none'
          : 'inline-flex'
      }
      style={{ zIndex }}
      data-hover-suppressed={isHoverSuppressed || undefined}
      data-level-all-active={isActive || undefined}
      initial={
        shouldReduceMotion
          ? undefined
          : {
              opacity: animationConfig.entryOpacity,
              ...entryOffset,
              scale: animationConfig.entryScale,
            }
      }
      animate={{ opacity: 1, x: baseParentOffset, y: 0, scale: 1 }}
      exit={levelAllExit}
      transition={levelAllTransition}
    >
      <LevelAllItem levelAllId={itemId} isActive={isActive} />
    </motion.div>
  )
}

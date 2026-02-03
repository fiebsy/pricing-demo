/**
 * StackingNav - Level-All Renderer
 *
 * Motion wrapper for the virtual Level-All item.
 * Extracted from stack-level.tsx lines 221-253.
 *
 * @module features/stacking-nav/components
 */

'use client'

import { motion } from 'motion/react'
import type { AnimationConfig } from '../types'
import { getChildDelay, getChildEntryOffset, getExitAnimation, getTransition } from '../utils/animations'
import { LevelAllItem } from './level-all-item'

interface LevelAllRendererProps {
  itemId: string
  isActive: boolean
  isHoverSuppressed: boolean
  baseParentOffset: number
  animationConfig: AnimationConfig
  shouldReduceMotion: boolean
  isCollapsingNow: boolean
  timeScale: number
}

export function LevelAllRenderer({
  itemId,
  isActive,
  isHoverSuppressed,
  baseParentOffset,
  animationConfig,
  shouldReduceMotion,
  isCollapsingNow,
  timeScale,
}: LevelAllRendererProps) {
  const animationDelay = isCollapsingNow ? 0 : getChildDelay(0, animationConfig)

  const entryOffset = shouldReduceMotion
    ? { x: 0, y: 0 }
    : getChildEntryOffset(animationConfig)

  const levelAllExit = shouldReduceMotion
    ? undefined
    : getExitAnimation(animationConfig)

  const levelAllTransition = isCollapsingNow
    ? {
        ...getTransition(animationConfig, animationDelay),
        layout: {
          duration: animationConfig.collapseLayoutDuration / timeScale,
          ease: 'easeOut' as const,
        },
      }
    : getTransition(animationConfig, animationDelay)

  return (
    <motion.div
      key={itemId}
      layout="position"
      className={isHoverSuppressed ? 'inline-flex [&_button]:!pointer-events-none' : 'inline-flex'}
      style={{ zIndex: 90 }}
      data-hover-suppressed={isHoverSuppressed || undefined}
      initial={
        shouldReduceMotion
          ? undefined
          : { opacity: 0, ...entryOffset, scale: animationConfig.entryScale }
      }
      animate={{ opacity: 1, x: baseParentOffset, y: 0, scale: 1 }}
      exit={levelAllExit}
      transition={levelAllTransition}
    >
      <LevelAllItem levelAllId={itemId} isActive={isActive} />
    </motion.div>
  )
}

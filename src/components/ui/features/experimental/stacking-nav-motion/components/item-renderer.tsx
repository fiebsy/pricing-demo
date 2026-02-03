/**
 * StackingNav - Item Renderer
 *
 * Motion wrapper for regular items. Receives `ItemRenderState` from
 * `computeItemState()` and maps `animationMode` to Motion props.
 * Extracted from stack-level.tsx lines 255-456.
 *
 * @module features/stacking-nav/components
 */

'use client'

import { motion, type TargetAndTransition, type Transition } from 'motion/react'
import { cn } from '@/lib/utils'
import type { StackItem, AnimationConfig } from '../types'
import type { ItemRenderState } from '../utils/item-state'
import { getChildEntryOffset, getExitAnimation, getTransition } from '../utils/animations'
import { debug } from '../utils/debug'
import { AnimatedItem } from './animated-item'

interface ItemRendererProps {
  item: StackItem
  itemIndex: number
  itemLevelIndices: number[]
  state: ItemRenderState
  animationConfig: AnimationConfig
  shouldReduceMotion: boolean
  isCollapsingNow: boolean
  isHoverSuppressed: boolean
  timeScale: number
  showDebug: boolean
}

export function ItemRenderer({
  item,
  itemIndex,
  itemLevelIndices,
  state,
  animationConfig,
  shouldReduceMotion,
  isCollapsingNow,
  isHoverSuppressed,
  timeScale,
  showDebug,
}: ItemRendererProps) {
  const {
    isActive,
    isAnchored,
    isPromoting,
    animationMode,
    shouldUseAbsolute,
    targetOffset,
    animationDelay,
    zIndex,
  } = state

  // --- Entry offset (shared) ---------------------------------------------
  const entryOffset = shouldReduceMotion
    ? { x: 0, y: 0 }
    : getChildEntryOffset(animationConfig)

  // --- Initial (depends on animationMode) --------------------------------
  let initial: TargetAndTransition | undefined
  switch (animationMode) {
    case 'skip':
      initial = undefined
      break
    case 'collapse-reentry':
      initial = shouldReduceMotion ? undefined : { opacity: 0 }
      break
    default:
      initial = shouldReduceMotion
        ? undefined
        : { opacity: 0, ...entryOffset, scale: animationConfig.entryScale }
      break
  }

  // --- Animate state (depends on animationMode) --------------------------
  let animateState: TargetAndTransition
  switch (animationMode) {
    case 'skip':
      animateState = { opacity: 1, x: targetOffset, y: 0, scale: 1 }
      break
    case 'anchor':
      animateState = { opacity: 1, x: targetOffset, y: 0, scale: 1 }
      break
    case 'promote':
      animateState = {
        opacity: 1,
        x: targetOffset,
        y: 0,
        scale: [1, animationConfig.promotionScale, 1],
      }
      break
    default:
      animateState = { opacity: 1, x: targetOffset, y: 0, scale: 1 }
      break
  }

  // --- Transition (depends on animationMode) -----------------------------
  const collapseLayoutOverride = isCollapsingNow
    ? { layout: { duration: animationConfig.collapseLayoutDuration / timeScale, ease: 'easeOut' as const } }
    : {}

  let transition: Transition
  if (animationMode === 'skip') {
    transition = { duration: 0 }
  } else {
    transition = {
      ...getTransition(animationConfig, animationDelay),
      ...collapseLayoutOverride,
      scale: isPromoting
        ? {
            duration: animationConfig.promotionDuration,
            times: [0, 0.5, 1],
            ease: 'easeInOut',
          }
        : undefined,
    }
  }

  // --- Exit --------------------------------------------------------------
  const exitAnimation = shouldReduceMotion
    ? undefined
    : getExitAnimation(animationConfig)

  // --- Debug logging -----------------------------------------------------
  if (showDebug && !isActive) {
    debug('exit', item.id, {
      exitScale: animationConfig.exitScale,
      collapsing: isCollapsingNow,
    })
  }

  return (
    <motion.div
      key={item.id}
      layout={!isAnchored ? 'position' : false}
      className={cn(
        shouldUseAbsolute ? 'absolute top-0 left-0 inline-flex' : 'inline-flex',
        isHoverSuppressed && !isAnchored && '[&_button]:!pointer-events-none',
      )}
      style={{ zIndex }}
      data-hover-suppressed={(isHoverSuppressed && !isAnchored) || undefined}
      initial={initial}
      animate={animateState}
      exit={exitAnimation}
      transition={transition}
      data-item-expected-offset={shouldUseAbsolute ? targetOffset : 0}
    >
      <AnimatedItem
        item={item}
        index={itemIndex}
        levelIndices={itemLevelIndices}
        isAnchored={isAnchored}
        isPromoting={isPromoting}
      />
    </motion.div>
  )
}

/**
 * StackingNav - Item Renderer
 *
 * Motion wrapper for regular items. Receives `ItemRenderState` from
 * `computeItemState()` and maps `animationMode` to Motion props.
 *
 * @module features/stacking-nav/components
 */

'use client'

import * as React from 'react'
import { motion, type TargetAndTransition, type Transition } from 'motion/react'
import { cn } from '@/lib/utils'
import type { StackItem, AnimationConfig } from '../types'
import type { ItemRenderState } from '../types'
import {
  getChildEntryOffset,
  getInstantExitAnimation,
  getTransition,
  getCollapseLayoutTransition,
} from '../utils/animations'
import { AnimatedItem } from './animated-item'

interface ItemRendererProps {
  item: StackItem
  itemIndex: number
  itemLevelIndices: number[]
  state: ItemRenderState
  animationConfig: AnimationConfig
  shouldReduceMotion: boolean
  isCollapsing: boolean
  isHoverSuppressed: boolean
  parentAnchoredOffset: number
}

/**
 * Shallow array equality check for levelIndices.
 */
function arraysShallowEqual(a: number[], b: number[]): boolean {
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false
  }
  return true
}

/**
 * Custom comparison function for ItemRenderer memoization.
 * Only re-renders when props that affect visual output change.
 */
function areItemRendererPropsEqual(
  prev: ItemRendererProps,
  next: ItemRendererProps
): boolean {
  return (
    prev.item.id === next.item.id &&
    prev.item.label === next.item.label &&
    prev.itemIndex === next.itemIndex &&
    arraysShallowEqual(prev.itemLevelIndices, next.itemLevelIndices) &&
    prev.state.animationMode === next.state.animationMode &&
    prev.state.isAnchored === next.state.isAnchored &&
    prev.state.isPromoting === next.state.isPromoting &&
    prev.state.targetOffset === next.state.targetOffset &&
    prev.state.zIndex === next.state.zIndex &&
    prev.state.animationDelay === next.state.animationDelay &&
    prev.state.shouldUseAbsolute === next.state.shouldUseAbsolute &&
    prev.isCollapsing === next.isCollapsing &&
    prev.isHoverSuppressed === next.isHoverSuppressed &&
    prev.parentAnchoredOffset === next.parentAnchoredOffset &&
    prev.shouldReduceMotion === next.shouldReduceMotion &&
    // AnimationConfig comparison - only compare fields used in this component
    prev.animationConfig.type === next.animationConfig.type &&
    prev.animationConfig.stiffness === next.animationConfig.stiffness &&
    prev.animationConfig.damping === next.animationConfig.damping &&
    prev.animationConfig.mass === next.animationConfig.mass &&
    prev.animationConfig.duration === next.animationConfig.duration &&
    prev.animationConfig.ease === next.animationConfig.ease &&
    prev.animationConfig.promotionDuration === next.animationConfig.promotionDuration &&
    prev.animationConfig.promotionScale === next.animationConfig.promotionScale &&
    prev.animationConfig.timeScale === next.animationConfig.timeScale &&
    prev.animationConfig.demotionEntryOpacity === next.animationConfig.demotionEntryOpacity &&
    prev.animationConfig.demotionEntryScale === next.animationConfig.demotionEntryScale &&
    prev.animationConfig.entryOpacity === next.animationConfig.entryOpacity &&
    prev.animationConfig.entryScale === next.animationConfig.entryScale
  )
}

function ItemRendererComponent({
  item,
  itemIndex,
  itemLevelIndices,
  state,
  animationConfig,
  shouldReduceMotion,
  isCollapsing,
  isHoverSuppressed,
  parentAnchoredOffset,
}: ItemRendererProps) {
  const {
    isAnchored,
    isPromoting,
    animationMode,
    shouldUseAbsolute,
    targetOffset,
    animationDelay,
    zIndex,
  } = state

  // --- Entry offset (shared) ---------------------------------------------
  // Pass parentAnchoredOffset for entryFromParent, targetOffset for entryInstant
  const entryOffset = shouldReduceMotion
    ? { x: 0, y: 0 }
    : getChildEntryOffset(animationConfig, parentAnchoredOffset, targetOffset)

  // --- Initial (depends on animationMode) --------------------------------
  let initial: TargetAndTransition | false | undefined
  switch (animationMode) {
    case 'skip':
      initial = undefined
      break
    case 'promote':
      // Promoting items are already visible - no initial state needed
      // They just do the scale animation in place
      initial = false
      break
    case 'anchor':
      // Anchored items are already visible - no initial state needed
      initial = false
      break
    case 'collapse-reentry':
      // Demotion entry: siblings reappearing when collapsing - uses separate config
      initial = shouldReduceMotion
        ? undefined
        : {
            opacity: animationConfig.demotionEntryOpacity,
            scale: animationConfig.demotionEntryScale,
          }
      break
    case 'collapse-demote':
      // Demoting parent: previously-expanded item returning to sibling status
      initial = shouldReduceMotion
        ? undefined
        : {
            opacity: animationConfig.demotionEntryOpacity,
            scale: animationConfig.demotionEntryScale,
          }
      break
    case 'promote-entry':
      // Children entering during promotion - explicit initial state like collapse-reentry
      initial = shouldReduceMotion
        ? undefined
        : {
            opacity: animationConfig.entryOpacity,
            ...entryOffset,
            scale: animationConfig.entryScale,
          }
      break
    case 'default':
    default:
      // Default mode for items that aren't entering, promoting, or anchoring
      // No initial state - item is already visible
      initial = false
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
  const collapseLayoutOverride = isCollapsing
    ? getCollapseLayoutTransition(animationConfig)
    : {}

  // Entry modes should have a delay - promoting/anchored items animate immediately
  const shouldHaveDelay =
    animationMode === 'promote-entry' ||
    animationMode === 'collapse-reentry' ||
    animationMode === 'collapse-demote'
  const effectiveDelay = shouldHaveDelay ? animationDelay : 0

  let transition: Transition
  if (animationMode === 'skip') {
    transition = { duration: 0 }
  } else if (animationMode === 'promote') {
    // Promoting items: immediate scale animation, no delay
    // Apply timeScale to promotionDuration for consistent slow-mo debugging
    const timeScale = animationConfig.timeScale > 0 ? animationConfig.timeScale : 1
    transition = {
      ...getTransition(animationConfig, 0), // No delay
      ...collapseLayoutOverride,
      scale: {
        duration: animationConfig.promotionDuration / timeScale,
        times: [0, 0.5, 1],
        ease: 'easeOut',
      },
    }
  } else {
    transition = {
      ...getTransition(animationConfig, effectiveDelay),
      ...collapseLayoutOverride,
    }
  }

  // --- Exit --------------------------------------------------------------
  // Use instant exit to avoid slow-to-fast feel during promotion
  // The exit animation was causing a noticeable delay before new children appear
  const exitAnimation = shouldReduceMotion
    ? undefined
    : getInstantExitAnimation()

  return (
    <motion.div
      key={item.id}
      layout={!isAnchored ? 'position' : false}
      className={cn(
        shouldUseAbsolute ? 'absolute left-0 top-0 inline-flex' : 'inline-flex',
        isHoverSuppressed && !isAnchored && '[&_button]:!pointer-events-none'
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
        isReentry={animationMode === 'collapse-reentry'}
        isDemoting={animationMode === 'collapse-demote'}
      />
    </motion.div>
  )
}

/**
 * Memoized ItemRenderer - prevents re-renders when props haven't changed.
 * Uses custom comparison to check only fields that affect visual output.
 */
export const ItemRenderer = React.memo(ItemRendererComponent, areItemRendererPropsEqual)

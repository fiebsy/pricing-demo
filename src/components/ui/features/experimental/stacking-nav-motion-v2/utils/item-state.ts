/**
 * StackingNav V2 - Item State Computation
 *
 * Pure function that computes the complete render state for a single item.
 * Debug logging is centralized through debug-log.ts.
 *
 * @module features/stacking-nav-v2/utils
 */

import type { ItemStateContext, ItemRenderState, AnimationMode } from '../types'
import { getAnchoredZIndex, Z_INDEX } from '../config'
import { getChildDelay, getDemotionDelay } from './animations'
import { logMode, logTiming } from './debug-log'

// =============================================================================
// COMPUTATION
// =============================================================================

/**
 * Compute complete render state for a single item.
 * Pure function - no side effects, no logging.
 */
export function computeItemState(ctx: ItemStateContext): ItemRenderState {
  const {
    item,
    index,
    level,
    activePath,
    animationConfig,
    styleConfig,
    anchorCount,
    promotingId,
    isCollapsing,
    activeItemIsLeaf,
    activeChildIsLeaf,
    // showLevelAll is available but not used in core logic
    isPromotingPhase,
  } = ctx

  const activeId = activePath[level]
  const hasActiveAtThisLevel = activeId !== undefined
  const hasActiveChild = activePath.length > level + 1
  const isActive = item.id === activeId
  const hasChildren = Boolean(item.children?.length)
  const isLeafNode = !hasChildren
  const isPromoting = item.id === promotingId

  // --- Sibling visibility ------------------------------------------------
  const shouldHide =
    hasActiveAtThisLevel &&
    !isActive &&
    !(animationConfig.skipLeafAnimation && activeItemIsLeaf)

  // --- Anchored state ----------------------------------------------------
  const isAnchored =
    isActive &&
    hasActiveChild &&
    hasChildren &&
    !(animationConfig.skipLeafAnimation && activeChildIsLeaf)

  // --- Depth & offset ----------------------------------------------------
  const anchoredDepth = level === 0 ? 1 : level + 1
  const rootAnchorVisible =
    level === 0 && hasActiveAtThisLevel && activeId !== 'all'
  const totalAnchorCount = anchorCount + (rootAnchorVisible ? 1 : 0)
  const parentOffset =
    totalAnchorCount > 0 ? styleConfig.peekOffset * totalAnchorCount : 0
  const anchoredOffset = styleConfig.peekOffset * anchoredDepth
  const targetOffset = isAnchored ? anchoredOffset : parentOffset

  // --- Animation mode ----------------------------------------------------
  const skipLeaf = animationConfig.skipLeafAnimation && isLeafNode && isActive
  const skipParent =
    animationConfig.skipLeafAnimation && activeChildIsLeaf && isActive && !isLeafNode
  const levelHasActiveLeaf = animationConfig.skipLeafAnimation && activeItemIsLeaf
  const skipAny = skipLeaf || levelHasActiveLeaf || skipParent

  let animationMode: AnimationMode
  if (skipAny) {
    animationMode = 'skip'
  } else if (isAnchored) {
    animationMode = 'anchor'
  } else if (isPromoting) {
    animationMode = 'promote'
  } else if (isCollapsing && !isActive) {
    // Siblings reappearing during collapse - applies at any level
    animationMode = 'collapse-reentry'
  } else if (isPromotingPhase && level > 0 && !isActive) {
    // Children entering during expansion (promotion or simple expand)
    animationMode = 'promote-entry'
  } else {
    // Default: items that are already visible or don't need entry animation
    animationMode = 'default'
  }

  // --- Stagger delay ------------------------------------------------------
  let animationDelay: number
  if (animationMode === 'promote-entry') {
    // Children appearing during expansion
    animationDelay = getChildDelay(index, animationConfig, isPromotingPhase)
  } else if (animationMode === 'collapse-reentry') {
    // Demotion entry: siblings reappearing when collapsing
    animationDelay = getDemotionDelay(index, animationConfig)
  } else {
    animationDelay = 0
  }

  // --- Debug logging -----------------------------------------------------
  logMode(item.id, level, animationMode, {
    isActive,
    isAnchored,
    isPromoting,
    isCollapsing,
    isPromotingPhase,
    shouldHide,
  })

  if (animationDelay > 0) {
    logTiming(item.id, level, animationDelay, {
      mode: animationMode,
      index,
      stagger: animationConfig.stagger,
      demotionStagger: animationConfig.demotionStagger,
    })
  }

  // --- Z-index -----------------------------------------------------------
  let zIndex: number
  if (isAnchored) {
    zIndex = getAnchoredZIndex(anchoredDepth)
  } else if (isPromoting) {
    zIndex = Z_INDEX.PROMOTING
  } else if (isActive) {
    zIndex = Z_INDEX.ACTIVE + 10 + level * 10
  } else {
    zIndex = Z_INDEX.ACTIVE + level * 10
  }

  return {
    isActive,
    isAnchored,
    isPromoting,
    shouldHide,
    animationMode,
    shouldUseAbsolute: isAnchored,
    anchoredDepth,
    targetOffset,
    animationDelay,
    zIndex,
  }
}

// =============================================================================
// LEVEL-ALL STATE COMPUTATION
// =============================================================================

/**
 * Compute z-index for Level-All button.
 * V2 fix: Higher z-index when active for proper visual layering.
 */
export function computeLevelAllZIndex(isActive: boolean): number {
  return isActive ? Z_INDEX.LEVEL_ALL_ACTIVE : Z_INDEX.LEVEL_ALL_INACTIVE
}

/**
 * StackingNav V2 - Item State Computation
 *
 * Pure function that computes the complete render state for a single item.
 * No debug logging inline - keeps the function pure and testable.
 *
 * @module features/stacking-nav-v2/utils
 */

import type { ItemStateContext, ItemRenderState, AnimationMode } from '../types'
import { getAnchoredZIndex, Z_INDEX } from '../config'
import { getChildDelay } from './animations'

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
    isCollapsingNow,
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
  } else if (isCollapsingNow && level === 0 && !isActive) {
    animationMode = 'collapse-reentry'
  } else if (level > 0 && !isActive && !isCollapsingNow) {
    animationMode = 'entry'
  } else {
    animationMode = 'default'
  }

  // --- Stagger delay (skip during collapse) ------------------------------
  const animationDelay =
    animationMode === 'entry'
      ? getChildDelay(index, animationConfig, isPromotingPhase)
      : 0

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

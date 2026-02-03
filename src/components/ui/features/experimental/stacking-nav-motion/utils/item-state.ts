/**
 * StackingNav - Item State Computation
 *
 * Pure function that replaces the 6+ overlapping skip booleans
 * in stack-level.tsx with a single clear `ItemRenderState`.
 *
 * @module features/stacking-nav/utils
 */

import type { StackItem, AnimationConfig, StyleConfig, ActivePath } from '../types'
import { getAnchoredZIndex, Z_INDEX } from '../config'
import { getChildDelay } from './animations'

// =============================================================================
// TYPES
// =============================================================================

/**
 * Animation mode — single enum replacing:
 * shouldSkipAnimation, shouldSkipParentAnimation, levelHasActiveLeaf,
 * skipAllAnimationAtLevel, skipAnyAnimation, isInitialEntry, isCollapseReentry
 */
export type AnimationMode =
  | 'skip'             // Leaf skip or parent-of-leaf skip — instant, no movement
  | 'entry'            // Staggered entry for new child items
  | 'anchor'           // Absolute-positioned peek-behind
  | 'promote'          // Scale keyframes for child-becoming-parent
  | 'collapse-reentry' // L0 siblings re-appearing during collapse (fade only)
  | 'default'          // Standard animate to parent offset

/**
 * Complete render state for a single item.
 * Computed once per item per render — all downstream code reads this.
 */
export interface ItemRenderState {
  isActive: boolean
  isAnchored: boolean
  isPromoting: boolean
  shouldHide: boolean
  animationMode: AnimationMode
  shouldUseAbsolute: boolean
  anchoredDepth: number
  targetOffset: number
  animationDelay: number
  zIndex: number
}

// =============================================================================
// CONTEXT PASSED INTO THE COMPUTATION
// =============================================================================

export interface ItemStateContext {
  item: StackItem
  index: number
  level: number
  activePath: ActivePath
  animationConfig: AnimationConfig
  styleConfig: StyleConfig
  anchorCount: number
  promotingId: string | null
  isCollapsingNow: boolean
  /** Whether active item at this level is a leaf */
  activeItemIsLeaf: boolean
  /** Whether active child (one level deeper) is a leaf */
  activeChildIsLeaf: boolean
  /** Whether level-all is prepended (shifts indices) */
  showLevelAll: boolean
}

// =============================================================================
// COMPUTATION
// =============================================================================

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
    showLevelAll,
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
    animationMode === 'entry' ? getChildDelay(index, animationConfig) : 0

  // DEBUG: Log child entry delay
  if (animationMode === 'entry') {
    console.log(`[CHILD ENTRY] ${item.id}`, {
      index,
      animationMode,
      childEntryDelay: animationConfig.childEntryDelay,
      stagger: animationConfig.stagger,
      calculatedDelay: animationDelay,
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

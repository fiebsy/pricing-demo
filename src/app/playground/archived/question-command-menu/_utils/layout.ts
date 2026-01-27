/**
 * Question Command Menu - Layout Utilities
 *
 * Functions for calculating dynamic panel dimensions.
 * Adapted from biaxial-command-menu-v3 layout patterns.
 *
 * @module playground/question-command-menu/utils
 */

import type { PlaygroundConfig } from '../types'

// =============================================================================
// CONSTANTS
// =============================================================================

/** Default height for empty state display */
const EMPTY_STATE_HEIGHT = 80

/** Height per question item in list view */
const QUESTION_ITEM_HEIGHT = 44

/** Gap between question items */
const QUESTION_ITEM_GAP = 4

/** Padding for list container */
const LIST_PADDING = 8

/** Stats footer height */
const STATS_FOOTER_HEIGHT = 36

/** Action bar fixed height */
export const ACTION_BAR_HEIGHT = 56

/** Gradient height for overflow indicators */
export const OVERFLOW_GRADIENT_HEIGHT = 24

// =============================================================================
// HEIGHT CALCULATIONS
// =============================================================================

/**
 * Calculate the dynamic panel height for list view based on question count
 *
 * @param config - Menu configuration
 * @param questionCount - Number of questions in the list
 * @param isEmpty - Whether there are no questions
 * @returns Calculated panel height in pixels
 */
export function calculateListHeight(
  config: PlaygroundConfig,
  questionCount: number,
  isEmpty: boolean
): number {
  if (isEmpty) {
    return EMPTY_STATE_HEIGHT + LIST_PADDING * 2
  }

  const itemsHeight = questionCount * QUESTION_ITEM_HEIGHT
  const gapsHeight = Math.max(0, questionCount - 1) * QUESTION_ITEM_GAP
  const padding = LIST_PADDING * 2
  const footer = STATS_FOOTER_HEIGHT

  const contentHeight = itemsHeight + gapsHeight + padding + footer

  return Math.min(contentHeight, config.maxBottomHeight)
}

/**
 * Calculate the dynamic panel height for suggestions dropdown
 *
 * @param suggestionCount - Number of visible suggestions
 * @param maxHeight - Maximum allowed height
 * @returns Calculated panel height in pixels
 */
export function calculateSuggestionsHeight(
  suggestionCount: number,
  maxHeight: number
): number {
  if (suggestionCount === 0) {
    return EMPTY_STATE_HEIGHT + LIST_PADDING * 2
  }

  const itemsHeight = suggestionCount * QUESTION_ITEM_HEIGHT
  const gapsHeight = Math.max(0, suggestionCount - 1) * QUESTION_ITEM_GAP
  const padding = LIST_PADDING * 2

  const contentHeight = itemsHeight + gapsHeight + padding

  return Math.min(contentHeight, maxHeight)
}

/**
 * Calculate the bottom slot height based on view mode
 *
 * @param viewMode - Current view mode ('list' or 'detail')
 * @param config - Menu configuration
 * @param questionCount - Number of questions
 * @returns Calculated bottom height in pixels
 */
export function calculateBottomHeight(
  viewMode: 'list' | 'detail',
  config: PlaygroundConfig,
  questionCount: number
): number {
  if (viewMode === 'detail') {
    return ACTION_BAR_HEIGHT
  }

  return calculateListHeight(config, questionCount, questionCount === 0)
}

// =============================================================================
// GRADIENT UTILITIES
// =============================================================================

export interface GradientInsets {
  top: number
  bottom: number
  left: number
  right: number
}

/**
 * Default gradient insets for scroll areas
 */
export const DEFAULT_GRADIENT_INSETS: GradientInsets = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
}

/**
 * Get CSS for top overflow gradient
 *
 * @param height - Gradient height in pixels
 * @param insets - Gradient positioning insets
 * @param bgColor - Background color token (primary, secondary, tertiary)
 * @returns CSS properties object
 */
export function getTopGradientStyles(
  height: number = OVERFLOW_GRADIENT_HEIGHT,
  insets: GradientInsets = DEFAULT_GRADIENT_INSETS,
  bgColor: string = 'primary'
): React.CSSProperties {
  return {
    top: insets.top,
    left: insets.left,
    right: insets.right,
    height,
    background: `linear-gradient(to bottom, var(--color-bg-${bgColor}) 0%, transparent 100%)`,
    opacity: `calc(min(1, var(--scroll-area-overflow-y-start, ${height}) / ${height}))`,
  }
}

/**
 * Get CSS for bottom overflow gradient
 *
 * @param height - Gradient height in pixels
 * @param insets - Gradient positioning insets
 * @param bgColor - Background color token (primary, secondary, tertiary)
 * @returns CSS properties object
 */
export function getBottomGradientStyles(
  height: number = OVERFLOW_GRADIENT_HEIGHT,
  insets: GradientInsets = DEFAULT_GRADIENT_INSETS,
  bgColor: string = 'primary'
): React.CSSProperties {
  return {
    bottom: insets.bottom,
    left: insets.left,
    right: insets.right,
    height,
    background: `linear-gradient(to top, var(--color-bg-${bgColor}) 0%, transparent 100%)`,
    opacity: `calc(min(1, var(--scroll-area-overflow-y-end, ${height}) / ${height}))`,
  }
}

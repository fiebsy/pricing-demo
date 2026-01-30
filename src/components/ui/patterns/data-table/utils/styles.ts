/**
 * StickyDataTable V2 - Style Utilities
 *
 * Functions for computing dynamic CSS classes and inline styles.
 * Centralized styling logic for consistency.
 *
 * @module utils/styles
 */

import type { CSSProperties } from 'react'
import type { BackgroundConfig, BorderConfig, ColumnAlignment, ComputedColumn, StickyState } from '../types'

// ============================================================================
// ALIGNMENT
// ============================================================================

interface AlignmentClasses {
  textAlign: string
  flexJustify: string
}

/**
 * Get Tailwind classes for column alignment
 */
export function getAlignmentClasses(align: ColumnAlignment): AlignmentClasses {
  switch (align) {
    case 'right':
      return { textAlign: 'text-right', flexJustify: 'justify-end' }
    case 'center':
      return { textAlign: 'text-center', flexJustify: 'justify-center' }
    default:
      return { textAlign: 'text-left', flexJustify: 'justify-start' }
  }
}

// ============================================================================
// PADDING
// ============================================================================

/**
 * Get cell padding classes based on position
 * First column: extra left padding
 * Last column: extra right padding
 */
export function getCellPadding(isFirst: boolean, isLast: boolean): string {
  if (isFirst) return 'pl-6 pr-4'
  if (isLast) return 'pl-4 pr-6'
  return 'px-4'
}

// ============================================================================
// BACKGROUNDS
// ============================================================================

/**
 * Map of background classes to their hover variants
 * Tailwind requires static class names, so we maintain this mapping
 */
const BG_TO_HOVER_MAP: Record<string, string> = {
  'bg-primary': 'hover:bg-primary',
  'bg-secondary': 'hover:bg-secondary',
  'bg-secondary_alt': 'hover:bg-secondary_alt',
  'bg-secondary_p1': 'hover:bg-secondary_p1',
  'bg-secondary_t1': 'hover:bg-secondary_t1',
  'bg-tertiary': 'hover:bg-tertiary',
}

/**
 * Get the hover class for a background class
 * Falls back to hover:bg-secondary if not found
 */
export function getRowHoverClass(backgroundConfig: BackgroundConfig): string {
  const bgClass = backgroundConfig.rowHover
  return BG_TO_HOVER_MAP[bgClass] ?? 'hover:bg-secondary'
}

/**
 * Get background class for header sticky cell
 */
export function getHeaderStickyBackground(
  config: BackgroundConfig,
  stickyState: StickyState,
  isSticky: boolean
): string {
  if (!isSticky) return ''
  return stickyState.useEnhancedStyling
    ? config.headerStickyCellWithArrows
    : config.headerStickyCell
}

/**
 * Get background class for row sticky cell
 */
export function getRowStickyBackground(
  config: BackgroundConfig,
  stickyState: StickyState,
  isSticky: boolean
): string {
  if (!isSticky) return ''
  return stickyState.useEnhancedStyling
    ? config.rowStickyCellWithArrows
    : config.rowStickyCell
}

// ============================================================================
// BORDERS
// ============================================================================


/**
 * Check if a specific border side should be shown
 */
function shouldShowSide(config: BorderConfig, side: 'left' | 'right' | 'top' | 'bottom'): boolean {
  if (!config.showOuter) return false
  const showMap = {
    left: config.showLeft,
    right: config.showRight,
    top: config.showTop,
    bottom: config.showBottom,
  }
  return showMap[side] ?? config.showOuter
}

/**
 * Map semantic border token to CSS variable
 * e.g., 'border-primary' -> 'var(--border-color-primary)'
 */
function borderTokenToCssVar(token: string): string {
  // Handle tokens like 'border-primary', 'border-secondary', 'border-tertiary/20'
  const match = token.match(/^border-(.+)$/)
  if (!match || !match[1]) return token

  const colorPart = match[1]
  // Handle opacity variants like 'tertiary/20'
  if (colorPart.includes('/')) {
    const [color, opacity] = colorPart.split('/')
    if (color && opacity) {
      return `color-mix(in srgb, var(--border-color-${color}) ${opacity}%, transparent)`
    }
  }
  return `var(--border-color-${colorPart})`
}


/**
 * Get outer border classes for header
 * Uses outerColor for all borders except bottom which may have headerBottomColor override.
 * When headerBottomColor is set, bottom border width is added but color comes from inline style.
 */
export function getHeaderOuterBorders(config: BorderConfig): string {
  const classes: string[] = []
  const hasHeaderBottomColor = !!config.headerBottomColor

  if (shouldShowSide(config, 'top')) {
    classes.push(`border-t ${config.outerColor}`)
  }
  if (shouldShowSide(config, 'left')) {
    classes.push(`border-l ${config.outerColor}`)
  }
  if (shouldShowSide(config, 'right')) {
    classes.push(`border-r ${config.outerColor}`)
  }
  if (shouldShowSide(config, 'bottom')) {
    // If headerBottomColor is set, add width class only (color via inline style)
    classes.push(hasHeaderBottomColor ? 'border-b' : `border-b ${config.outerColor}`)
  }

  return classes.join(' ')
}

/**
 * Get inline styles for header outer borders
 * Only applies headerBottomColor when set - all other sides use Tailwind classes.
 */
export function getHeaderOuterBorderStyles(config: BorderConfig): CSSProperties {
  if (!config.headerBottomColor) {
    return {}
  }

  // Only override bottom border color for header
  return {
    borderBottomColor: borderTokenToCssVar(config.headerBottomColor),
  }
}

/**
 * Get outer border classes for body
 * Body always uses outerColor for all sides (no headerBottomColor here)
 */
export function getBodyOuterBorders(config: BorderConfig): string {
  const classes: string[] = []

  if (shouldShowSide(config, 'left')) {
    classes.push(`border-l ${config.outerColor}`)
  }
  if (shouldShowSide(config, 'right')) {
    classes.push(`border-r ${config.outerColor}`)
  }
  if (shouldShowSide(config, 'bottom')) {
    classes.push(`border-b ${config.outerColor}`)
  }

  return classes.join(' ')
}

/**
 * Get inline styles for body outer borders
 * Body always uses Tailwind classes with outerColor, no inline overrides needed.
 */
export function getBodyOuterBorderStyles(_config: BorderConfig): CSSProperties {
  // Body always uses outerColor via Tailwind classes - no inline styles needed
  return {}
}

/**
 * Get row border class (between rows)
 */
export function getRowBorder(config: BorderConfig): string {
  if (!config.showRows) return ''
  return `border-b ${config.rowColor}`
}

/**
 * Get cell border class (between columns)
 */
export function getCellBorder(config: BorderConfig, isLast: boolean, columnKey?: string): string {
  if (!config.showCells || isLast) return ''
  if (columnKey && config.hideCellBordersForColumns?.includes(columnKey)) {
    return 'border-r border-transparent'
  }
  return `border-r ${config.cellColor}`
}

/**
 * Get sticky column right border when enhanced styling is active
 */
export function getStickyColumnBorder(
  column: ComputedColumn,
  stickyState: StickyState,
  config: BorderConfig
): string {
  if (!column.isSticky || !column.isLastSticky || !stickyState.useEnhancedStyling) {
    return ''
  }

  // If only one sticky column, always show border
  // If multiple, only show on last (not first)
  const isOnlySticky = column.isFirstSticky && column.isLastSticky
  if (!isOnlySticky && column.isFirstSticky) {
    return ''
  }

  const color = config.stickyColumnRightBorderColor ?? 'border-primary'
  return `border-r ${color}`
}

// ============================================================================
// STICKY POSITIONING
// ============================================================================

/**
 * Get CSS left value for sticky positioning
 */
export function getStickyLeft(stickyLeft: number | undefined): string | undefined {
  if (stickyLeft === undefined) return undefined
  return `${stickyLeft}px`
}

// ============================================================================
// ANIMATION CLASSES & DATA ATTRIBUTES
// ============================================================================

/**
 * Animation state for a column
 */
export type ColumnAnimationState = 'entering' | 'leaving' | 'idle'

/**
 * Get animation state for a column
 * Used with data attributes for Tailwind v4 integration
 */
export function getColumnAnimationState(
  columnKey: string,
  leavingKeys: Set<string>,
  enteringKeys: Set<string>
): ColumnAnimationState {
  if (leavingKeys.has(columnKey)) {
    return 'leaving'
  }
  if (enteringKeys.has(columnKey)) {
    return 'entering'
  }
  return 'idle'
}

/**
 * Get data attributes for column animation
 * Returns an object to spread onto the element
 *
 * @example
 * <div {...getColumnAnimationDataAttrs(key, leaving, entering)} />
 */
export function getColumnAnimationDataAttrs(
  columnKey: string,
  leavingKeys: Set<string>,
  enteringKeys: Set<string>
): Record<string, string | undefined> {
  const state = getColumnAnimationState(columnKey, leavingKeys, enteringKeys)

  return {
    'data-column-key': columnKey,
    'data-column-leaving': state === 'leaving' ? '' : undefined,
    'data-column-entering': state === 'entering' ? '' : undefined,
  }
}

/**
 * Get animation class for column transitions
 * Provides backwards compatibility with legacy class names
 */
export function getColumnAnimationClass(
  columnKey: string,
  leavingKeys: Set<string>,
  columnChange: { columnKey: string; action: 'added' | 'removed' } | null,
  enteringKeys?: Set<string>
): string {
  // Column is animating out
  if (leavingKeys.has(columnKey)) {
    return 'animate-column-remove'
  }

  // Column is animating in (new: check enteringKeys first)
  if (enteringKeys?.has(columnKey)) {
    return 'animate-column-add'
  }

  // Legacy: Column was just added (fallback for backwards compatibility)
  if (columnChange?.columnKey === columnKey && columnChange.action === 'added') {
    return 'animate-column-add'
  }

  // Legacy: Reset (multiple columns added)
  if (columnChange?.columnKey === 'reset' && columnChange.action === 'added') {
    return 'animate-column-add'
  }

  return ''
}

// ============================================================================
// CELL STYLES
// ============================================================================

/**
 * Generate complete cell style object
 */
export function getCellStyle(
  column: ComputedColumn,
  stickyState: StickyState
): React.CSSProperties {
  const minWidth = column.minWidth ?? column.width

  return {
    position: column.isSticky ? 'sticky' : 'relative',
    left: column.isSticky ? getStickyLeft(column.computedStickyLeft) : undefined,
    height: '100%',
    boxSizing: 'border-box',
    zIndex: column.isSticky ? 10 : 1,
    minWidth: `${minWidth}px`,
    ...(column.maxWidth ? { maxWidth: `${column.maxWidth}px` } : {}),
    ...(column.isSticky && stickyState.useEnhancedStyling ? { borderOpacity: 0 } : {}),
  }
}



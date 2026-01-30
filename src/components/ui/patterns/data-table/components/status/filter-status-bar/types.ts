/**
 * FilterStatusBar Types
 *
 * Type definitions for the flip-corner filter status bar.
 */

// ============================================================================
// CORE TYPES
// ============================================================================

/** Active filter displayed as a badge */
export interface ActiveFilter {
  id: string
  label: string
}

/** Corner position for flip corner shapes */
export type CornerPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

/** Positioning mode passed from StickyDataTable */
export type PositionMode = 'fixed' | 'absolute'

/** Font weight options for text segments */
export type FontWeight = 'normal' | 'medium' | 'semibold' | 'bold'

// ============================================================================
// CORNER CONFIGURATION
// ============================================================================

/** Individual corner radius values */
export interface CornerRadius {
  topLeft: number
  topRight: number
  bottomLeft: number
  bottomRight: number
}

/** Bezier control points for S-curve shape */
export interface FlipCornerCurvature {
  cp1x: number
  cp1y: number
  cp2x: number
  cp2y: number
}

// ============================================================================
// BORDER CONFIGURATION
// ============================================================================

/** Border configuration for a single side */
export interface BorderSide {
  width: number
  color: string
}

/** Complete border configuration */
export interface Borders {
  top: BorderSide
  right: BorderSide
  bottom: BorderSide
  left: BorderSide
}

// ============================================================================
// COMPONENT PROPS
// ============================================================================

export interface FilterStatusBarProps {
  /** Number of visible/filtered items */
  visibleCount: number
  /** Total number of items */
  totalCount: number
  /** Whether filters are currently active (controls "Filtered" vs "Showing all") */
  isFiltered?: boolean
  /** Active filters to display as badges */
  activeFilters?: ActiveFilter[]
  /** Whether the bar should be visible */
  visible?: boolean
  /** Current positioning mode - passed from StickyDataTable */
  positionMode?: PositionMode
  /** Optional className */
  className?: string
}

export interface CountDisplayProps {
  visibleCount: number
  totalCount: number
  isFiltered: boolean
  visible: boolean
  className?: string
}

export interface BadgeGroupProps {
  activeFilters: ActiveFilter[]
  visible: boolean
  showDivider: boolean
  hasCountText: boolean
  className?: string
}

export interface CornerShapeProps {
  position: CornerPosition
  size: number
  height: number
  fillColor: string
  strokeWidth?: number
  strokeColor?: string
  curvature: FlipCornerCurvature
  className?: string
}

export interface EdgeStrokeProps {
  position: 'top' | 'bottom'
  strokeWidth: number
  strokeColor: string
  leftInset?: number
  rightInset?: number
}

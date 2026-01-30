'use client'

/**
 * FilterStatusBar Component
 *
 * A floating status bar with flip-corner styling that displays filter state
 * and count information at the bottom of the table.
 *
 * Features:
 * - SVG-based S-curve flip corners (Safari tab style)
 * - Adaptive corner flipping based on scroll position (fixed vs absolute)
 * - Badge indicators for filter state
 * - Automatic positioning via useFilterBarPosition hook
 *
 * Display states:
 * - Unfiltered: "287 orders [All]"
 * - Filtered: "50 / 287 orders [Filtered]"
 *
 * @module components/status/filter-status-bar
 */

import { memo, useRef, useState, useLayoutEffect } from 'react'
import { cn } from '@/lib/utils'

// Subcomponents
import {
  CornerShape,
  CountDisplay,
  BadgeGroup,
  EdgeStroke,
  useAdaptiveStyles,
} from './filter-status-bar/index'

// Constants
import {
  BACKGROUND_COLOR,
  FLIP_CORNER_CURVATURE,
  PADDING_X,
  PADDING_Y,
} from './filter-status-bar/constants'

// Types
import type {
  FilterStatusBarProps,
  ActiveFilter,
  PositionMode,
} from './filter-status-bar/types'

// Re-export types for external use
export type { FilterStatusBarProps, ActiveFilter, PositionMode }

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * FilterStatusBar - Floating filter information display with flip corners
 *
 * Renders a status bar showing:
 * - Count display: "X orders [All]" or "X / Y orders [Filtered]"
 * - Optional filter badges
 * - SVG flip corners that adapt based on positioning mode
 */
const FilterStatusBarBase = ({
  visibleCount,
  totalCount,
  isFiltered = false,
  activeFilters = [],
  visible = true,
  positionMode = 'absolute',
  className,
}: FilterStatusBarProps) => {
  // Ref for measuring bar height
  const barRef = useRef<HTMLDivElement>(null)
  const [barHeight, setBarHeight] = useState(36)

  // Measure bar height for corner sizing
  useLayoutEffect(() => {
    if (barRef.current) {
      const height = barRef.current.offsetHeight
      if (height > 0) {
        setBarHeight(height)
      }
    }
  }, [visibleCount, totalCount, isFiltered, activeFilters])

  // Get adaptive styles based on position mode
  const {
    effectiveCorners,
    cornerWidth,
    topCornerStroke,
    bottomCornerStroke,
    topEdgeStroke,
    bottomEdgeStroke,
    sidesBorderStyle,
  } = useAdaptiveStyles(positionMode)

  // Determine visibility - show when there's data
  const shouldShow = visible && totalCount > 0

  // Determine corner positions based on which corners are active
  const hasTopCorners = effectiveCorners.topLeft > 0 || effectiveCorners.topRight > 0
  const hasBottomCorners = effectiveCorners.bottomLeft > 0 || effectiveCorners.bottomRight > 0

  return (
    <div
      className={cn(
        'pointer-events-none',
        'transition-opacity duration-200 ease-out',
        'motion-reduce:transition-none',
        className
      )}
      style={{
        opacity: shouldShow ? 1 : 0,
      }}
    >
      {/* Main bar container with relative positioning for corners */}
      <div className="pointer-events-auto relative">
        {/* Left flip corner */}
        {(hasTopCorners || hasBottomCorners) && (
          <>
            {/* Top-left corner */}
            {effectiveCorners.topLeft > 0 && (
              <CornerShape
                position="top-left"
                size={cornerWidth}
                height={barHeight}
                fillColor={BACKGROUND_COLOR}
                strokeWidth={topCornerStroke.width}
                strokeColor={topCornerStroke.color}
                curvature={FLIP_CORNER_CURVATURE}
              />
            )}
            {/* Bottom-left corner */}
            {effectiveCorners.bottomLeft > 0 && (
              <CornerShape
                position="bottom-left"
                size={cornerWidth}
                height={barHeight}
                fillColor={BACKGROUND_COLOR}
                strokeWidth={bottomCornerStroke.width}
                strokeColor={bottomCornerStroke.color}
                curvature={FLIP_CORNER_CURVATURE}
              />
            )}
          </>
        )}

        {/* Right flip corner */}
        {(hasTopCorners || hasBottomCorners) && (
          <>
            {/* Top-right corner */}
            {effectiveCorners.topRight > 0 && (
              <CornerShape
                position="top-right"
                size={cornerWidth}
                height={barHeight}
                fillColor={BACKGROUND_COLOR}
                strokeWidth={topCornerStroke.width}
                strokeColor={topCornerStroke.color}
                curvature={FLIP_CORNER_CURVATURE}
              />
            )}
            {/* Bottom-right corner */}
            {effectiveCorners.bottomRight > 0 && (
              <CornerShape
                position="bottom-right"
                size={cornerWidth}
                height={barHeight}
                fillColor={BACKGROUND_COLOR}
                strokeWidth={bottomCornerStroke.width}
                strokeColor={bottomCornerStroke.color}
                curvature={FLIP_CORNER_CURVATURE}
              />
            )}
          </>
        )}

        {/* Edge strokes (horizontal lines) */}
        {topEdgeStroke.enabled && (
          <EdgeStroke
            position="top"
            strokeWidth={topEdgeStroke.width}
            strokeColor={topEdgeStroke.color}
            leftInset={effectiveCorners.topLeft > 0 ? cornerWidth : 0}
            rightInset={effectiveCorners.topRight > 0 ? cornerWidth : 0}
          />
        )}
        {bottomEdgeStroke.enabled && (
          <EdgeStroke
            position="bottom"
            strokeWidth={bottomEdgeStroke.width}
            strokeColor={bottomEdgeStroke.color}
            leftInset={effectiveCorners.bottomLeft > 0 ? cornerWidth : 0}
            rightInset={effectiveCorners.bottomRight > 0 ? cornerWidth : 0}
          />
        )}

        {/* Bar content */}
        <div
          ref={barRef}
          className="relative flex items-center gap-2 text-xs"
          style={{
            backgroundColor: BACKGROUND_COLOR,
            paddingLeft: `${PADDING_X}px`,
            paddingRight: `${PADDING_X}px`,
            paddingTop: `${PADDING_Y}px`,
            paddingBottom: `${PADDING_Y}px`,
            ...sidesBorderStyle,
          }}
        >
          {/* Count display */}
          <CountDisplay
            visibleCount={visibleCount}
            totalCount={totalCount}
            isFiltered={isFiltered}
            visible={true}
          />

          {/* Badge group for active filters */}
          <BadgeGroup
            activeFilters={activeFilters}
            visible={activeFilters.length > 0}
            showDivider={true}
            hasCountText={true}
          />
        </div>
      </div>
    </div>
  )
}

export const FilterStatusBar = memo(FilterStatusBarBase)
FilterStatusBar.displayName = 'FilterStatusBar'

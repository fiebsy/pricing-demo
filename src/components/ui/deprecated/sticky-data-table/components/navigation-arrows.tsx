'use client'

/**
 * StickyDataTable V2 - NavigationArrows Component
 *
 * Container for left and right navigation arrows.
 * Manages positioning based on table dimensions.
 *
 * @module components/navigation-arrows
 */

import { memo, type RefObject } from 'react'
import { ARROW_CONFIG } from '../config'
import { useArrowPosition } from '../hooks/use-arrow-position'
import { NavigationArrow } from './navigation-arrow'

interface NavigationArrowsProps {
  /** Show left arrow */
  showLeftArrow: boolean
  /** Show right arrow */
  showRightArrow: boolean
  /** Left arrow click handler */
  onScrollLeft: () => void
  /** Right arrow click handler */
  onScrollRight: () => void
  /** Reference to body element for positioning */
  bodyScrollRef: RefObject<HTMLDivElement | null>
  /** Header gap for offset calculation */
  headerGap: number
  /** Total sticky column width for left arrow positioning */
  totalStickyWidth: number
  /** Override preferred top offset */
  preferredTopOffset?: number
}

/**
 * Navigation arrows container
 *
 * Features:
 * - Dynamic vertical positioning
 * - Responsive to table height
 * - Left arrow aligns with sticky column edge
 */
const NavigationArrowsBase = ({
  showLeftArrow,
  showRightArrow,
  onScrollLeft,
  onScrollRight,
  bodyScrollRef,
  headerGap,
  totalStickyWidth,
  preferredTopOffset,
}: NavigationArrowsProps) => {
  // Calculate arrow position based on table height
  const arrowPosition = useArrowPosition({
    bodyRef: bodyScrollRef,
    headerGap,
    preferredTopOffset: preferredTopOffset ?? ARROW_CONFIG.PREFERRED_TOP_OFFSET,
    bottomOffset: ARROW_CONFIG.BOTTOM_OFFSET,
    arrowHeight: ARROW_CONFIG.ARROW_HEIGHT,
  })

  // Left arrow position aligns with sticky column edge
  const leftArrowPosition = `${totalStickyWidth}px`

  return (
    <>
      <NavigationArrow
        direction="left"
        onClick={onScrollLeft}
        visible={showLeftArrow}
        position={{
          ...arrowPosition,
          left: leftArrowPosition,
        }}
      />
      <NavigationArrow
        direction="right"
        onClick={onScrollRight}
        visible={showRightArrow}
        position={{
          ...arrowPosition,
          right: ARROW_CONFIG.RIGHT_ARROW_RIGHT,
        }}
      />
    </>
  )
}

export const NavigationArrows = memo(NavigationArrowsBase)
NavigationArrows.displayName = 'NavigationArrows'



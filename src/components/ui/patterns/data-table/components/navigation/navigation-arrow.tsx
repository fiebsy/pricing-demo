'use client'

/**
 * StickyDataTable V2 - NavigationArrow Component
 *
 * Single navigation arrow button for horizontal scrolling.
 *
 * @module components/navigation-arrow
 */

import { memo } from 'react'

interface ArrowPosition {
  top?: string
  bottom?: string
  left?: string
  right?: string
}

interface NavigationArrowProps {
  /** Arrow direction */
  direction: 'left' | 'right'
  /** Click handler */
  onClick: () => void
  /** Visibility state */
  visible: boolean
  /** Position style */
  position: ArrowPosition
}

/**
 * Navigation arrow button
 *
 * Features:
 * - Smooth fade in/out
 * - Hover effects
 * - Accessible button
 * - Direction indicator
 */
const NavigationArrowBase = ({
  direction,
  onClick,
  visible,
  position,
}: NavigationArrowProps) => {
  return (
    <div
      className="absolute pl-2 z-[1]"
      style={{
        top: position.top,
        bottom: position.bottom,
        left: position.left,
        right: position.right,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 200ms',
      }}
    >
      <button
        onClick={onClick}
        className="flex flex-col rounded-full bg-transparent cursor-pointer transform scale-100 group"
        tabIndex={0}
        aria-label={`Scroll table ${direction}`}
      >
        <div className="flex flex-col shadow-lg rounded-full bg-primary/95 backdrop-blur-sm p-3 border border-primary transition-all duration-200 text-primary hover:bg-secondary hover:text-brand-primary hover:border-brand-primary">
          <svg
            viewBox="0 0 18 18"
            fill="none"
            strokeWidth="8"
            className={`w-3 h-3 ${direction === 'left' ? 'rotate-180' : ''}`}
            aria-hidden="true"
          >
            <path
              d="M9.79261 16.1108L17.5398 8.36364L9.79261 0.616477L8.25852 2.15057L13.3807 7.25568H0V9.47159H13.3807L8.25852 14.5852L9.79261 16.1108Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </button>
    </div>
  )
}

export const NavigationArrow = memo(NavigationArrowBase)
NavigationArrow.displayName = 'NavigationArrow'



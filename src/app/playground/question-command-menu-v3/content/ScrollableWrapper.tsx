/**
 * Question Command Menu V3 - Scrollable Wrapper
 *
 * Shared scroll container with overflow gradients.
 * Used by any content type that needs scrolling (questions, etc.)
 */

'use client'

import * as React from 'react'
import { ScrollArea } from '@base-ui/react/scroll-area'
import { cn } from '@/lib/utils'
import type { SlotScrollConfig } from '../config/slots'

// ============================================================================
// TYPES
// ============================================================================

export interface ScrollableWrapperProps {
  /** Scroll configuration */
  scrollConfig: SlotScrollConfig
  /** Height of the scroll container */
  height: number
  /** Background color for gradients (CSS variable) */
  gradientBackground?: string
  /** Additional className */
  className?: string
  /** Children to render inside scroll area */
  children: React.ReactNode
}

// ============================================================================
// OVERFLOW GRADIENT
// ============================================================================

interface OverflowGradientProps {
  position: 'top' | 'bottom'
  height: number
  background: string
}

const OverflowGradient: React.FC<OverflowGradientProps> = ({
  position,
  height,
  background,
}) => {
  const isTop = position === 'top'
  const cssVar = isTop
    ? '--scroll-area-overflow-y-start'
    : '--scroll-area-overflow-y-end'

  return (
    <div
      className={cn(
        'pointer-events-none absolute left-0 right-0 transition-opacity duration-150',
        isTop ? 'top-0' : 'bottom-0'
      )}
      style={{
        height,
        background: `linear-gradient(${isTop ? 'to bottom' : 'to top'}, ${background} 0%, transparent 100%)`,
        opacity: `calc(min(1, var(${cssVar}, ${height}) / ${height}))`,
      }}
    />
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const ScrollableWrapper: React.FC<ScrollableWrapperProps> = ({
  scrollConfig,
  height,
  gradientBackground = 'var(--color-bg-secondary)',
  className,
  children,
}) => {
  return (
    <div className={cn('w-full h-full overflow-hidden', className)}>
      <ScrollArea.Root className="h-full w-full" style={{ height }}>
        <ScrollArea.Viewport className="h-full w-full">
          <div
            style={{
              paddingTop: scrollConfig.paddingTop,
              paddingBottom: scrollConfig.paddingBottom,
              paddingLeft: 8,
              paddingRight: 8,
            }}
          >
            {children}
          </div>
        </ScrollArea.Viewport>

        {/* Custom Scrollbar */}
        <ScrollArea.Scrollbar
          orientation="vertical"
          className={cn(
            'absolute top-1 right-1 bottom-1 flex w-1.5 touch-none select-none p-0.5',
            'opacity-0 transition-opacity duration-150',
            'data-[hovering]:opacity-100 data-[scrolling]:opacity-100'
          )}
        >
          <ScrollArea.Thumb className="bg-fg-quaternary hover:bg-fg-quaternary_hover relative flex-1 rounded-full" />
        </ScrollArea.Scrollbar>

        {/* Overflow Gradients */}
        {scrollConfig.overflowGradient && (
          <>
            <OverflowGradient
              position="top"
              height={scrollConfig.gradientHeight}
              background={gradientBackground}
            />
            <OverflowGradient
              position="bottom"
              height={scrollConfig.gradientHeight}
              background={gradientBackground}
            />
          </>
        )}
      </ScrollArea.Root>
    </div>
  )
}

ScrollableWrapper.displayName = 'ScrollableWrapper'

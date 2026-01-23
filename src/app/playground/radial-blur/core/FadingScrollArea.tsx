/**
 * FadingScrollArea Component
 *
 * Scroll area where content fades at top and bottom edges.
 * Uses mask-image for opacity fade.
 *
 * @module playground/radial-blur
 */

'use client'

import * as React from 'react'
import { ScrollArea } from '@base-ui/react/scroll-area'
import { cn } from '@/lib/utils'

// =============================================================================
// COMPONENT
// =============================================================================

export interface FadingScrollAreaProps {
  children: React.ReactNode
  className?: string
  /** Height of the fade zone at top in pixels */
  fadeTopHeight?: number
  /** Height of the fade zone at bottom in pixels */
  fadeBottomHeight?: number
  /** Maximum height of the scroll area */
  maxHeight?: string
  /** Align content to bottom of scroll area */
  alignBottom?: boolean
  /** Bottom offset for scrollbar to avoid overlapping input (px) */
  scrollbarBottomOffset?: number
}

export function FadingScrollArea({
  children,
  className,
  fadeTopHeight = 120,
  fadeBottomHeight = 40,
  maxHeight,
  alignBottom = false,
  scrollbarBottomOffset = 0,
}: FadingScrollAreaProps) {
  // Create a linear gradient mask with both top and bottom fades
  // Top: larger, more gradual fade
  // Bottom: smaller, subtle fade
  const maskGradient = `linear-gradient(
    to bottom,
    transparent 0px,
    rgba(0,0,0,0.05) ${fadeTopHeight * 0.15}px,
    rgba(0,0,0,0.15) ${fadeTopHeight * 0.3}px,
    rgba(0,0,0,0.35) ${fadeTopHeight * 0.5}px,
    rgba(0,0,0,0.6) ${fadeTopHeight * 0.7}px,
    rgba(0,0,0,0.85) ${fadeTopHeight * 0.85}px,
    black ${fadeTopHeight}px,
    black calc(100% - ${fadeBottomHeight}px),
    rgba(0,0,0,0.85) calc(100% - ${fadeBottomHeight * 0.7}px),
    rgba(0,0,0,0.5) calc(100% - ${fadeBottomHeight * 0.4}px),
    rgba(0,0,0,0.2) calc(100% - ${fadeBottomHeight * 0.2}px),
    transparent 100%
  )`

  return (
    <ScrollArea.Root className={cn('relative h-full', className)}>
      <ScrollArea.Viewport
        className="h-full w-full"
        style={{
          maxHeight,
          // Mask fades content at top and bottom edges
          WebkitMaskImage: maskGradient,
          maskImage: maskGradient,
        }}
      >
        {alignBottom ? (
          <div
            className="flex flex-col justify-end"
            style={{ minHeight: '100%' }}
          >
            {children}
          </div>
        ) : (
          children
        )}
      </ScrollArea.Viewport>

      <ScrollArea.Scrollbar
        orientation="vertical"
        className={cn(
          'flex w-3 touch-none select-none p-0.5',
          'opacity-0 transition-opacity duration-150',
          'data-[hovering]:opacity-100 data-[scrolling]:opacity-100'
        )}
        style={{
          top: 0,
          bottom: scrollbarBottomOffset,
          height: scrollbarBottomOffset > 0 ? `calc(100% - ${scrollbarBottomOffset}px)` : undefined,
        }}
      >
        <ScrollArea.Thumb
          className={cn(
            'relative flex-1 rounded-full',
            'bg-quaternary/90 hover:bg-quaternary',
            'transition-colors duration-150'
          )}
        />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  )
}

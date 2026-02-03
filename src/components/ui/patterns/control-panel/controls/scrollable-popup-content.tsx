// =============================================================================
// Scrollable Popup Content
// =============================================================================
// Shared wrapper for select popups that adds consistent scrolling behavior
// with a max-height constraint and custom scrollbar.
// =============================================================================

'use client'

import type { ReactNode } from 'react'
import { ScrollArea } from '@base-ui/react/scroll-area'

interface ScrollablePopupContentProps {
  children: ReactNode
  maxHeight?: number
  className?: string
}

export function ScrollablePopupContent({
  children,
  maxHeight = 280,
  className,
}: ScrollablePopupContentProps) {
  return (
    <ScrollArea.Root className="relative overflow-hidden rounded-xl">
      <ScrollArea.Viewport
        className={className}
        style={{ maxHeight }}
      >
        <ScrollArea.Content>{children}</ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        orientation="vertical"
        className="absolute top-2 right-1 bottom-2 flex w-1.5 touch-none select-none rounded-full p-px opacity-0 transition-opacity duration-150 data-[hovering]:opacity-100 data-[scrolling]:opacity-100"
      >
        <ScrollArea.Thumb className="bg-quaternary hover:bg-quaternary_hover relative flex-1 rounded-full transition-colors duration-150" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  )
}

/**
 * ChatStateIndicator Component
 *
 * Displays the current chat state as a badge.
 *
 * @module playground/radial-blur/chat
 */

import { cn } from '@/lib/utils'
import type { ChatStateIndicatorProps } from './types'

export function ChatStateIndicator({
  state,
  useBlurBubbles,
  className,
}: ChatStateIndicatorProps) {
  return (
    <div className={cn('absolute top-4 left-4 z-30', className)}>
      <div className="px-3 py-1.5 rounded-full bg-primary/80 backdrop-blur-sm border border-primary">
        <span className="text-sm font-medium text-primary">
          State: <span className="text-brand-primary">{state}</span>
          {useBlurBubbles && (
            <span className="text-tertiary ml-2">(blur bubbles)</span>
          )}
        </span>
      </div>
    </div>
  )
}

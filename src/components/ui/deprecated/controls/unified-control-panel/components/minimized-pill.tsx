/**
 * Minimized Pill
 *
 * Compact representation of the control panel when minimized.
 * Clicking expands back to full panel.
 */

'use client'

import { memo } from 'react'
import { cx } from '@/components/utils/cx'
import { usePanelActions } from '../context/panel-context'

interface MinimizedPillProps {
  title?: string
  className?: string
}

export const MinimizedPill = memo(({ title = 'Controls', className }: MinimizedPillProps) => {
  const { toggleMinimize } = usePanelActions()

  return (
    <button
      type="button"
      onClick={toggleMinimize}
      className={cx(
        // Base styles
        'group fixed bottom-4 right-4 z-50',
        'flex items-center gap-2',
        'rounded-full px-4 py-2.5',
        // Colors
        'bg-secondary text-primary',
        'border border-primary',
        'shadow-lg',
        // Hover state
        'hover:bg-tertiary hover:shadow-xl',
        'hover:scale-105',
        // Focus state
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
        // Transition
        'transition-all duration-200 ease-out',
        // Motion preferences
        'motion-reduce:transition-none motion-reduce:hover:scale-100',
        className
      )}
    >
      {/* Settings icon */}
      <svg
        className="size-4 text-secondary group-hover:text-primary transition-colors"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
      </svg>

      {/* Title */}
      <span className="text-sm font-medium">{title}</span>

      {/* Expand indicator */}
      <svg
        className="size-3 text-tertiary group-hover:text-secondary transition-colors"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="15 3 21 3 21 9" />
        <polyline points="9 21 3 21 3 15" />
        <line x1="21" y1="3" x2="14" y2="10" />
        <line x1="3" y1="21" x2="10" y2="14" />
      </svg>
    </button>
  )
})
MinimizedPill.displayName = 'MinimizedPill'

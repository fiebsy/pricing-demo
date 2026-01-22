/**
 * StatusBar - Interactive island component
 *
 * Fixed bottom bar showing:
 * - Upload progress/file count
 * - Composite score (AI brain + formatted number)
 * - Confidence wheel (color-coded progress)
 * - Notification badge (expandable)
 *
 * @module playground/edit-questions/components/playground
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import type { StatusBarState, StatusNotification } from '../../types'
import { UploadIndicator } from './UploadIndicator'
import { CompositeScore } from './CompositeScore'
import { ConfidenceWheel } from './ConfidenceWheel'
import { NotificationBadge } from './NotificationBadge'

// =============================================================================
// TYPES
// =============================================================================

export interface StatusBarProps {
  /** StatusBar state from useStatusBarState hook */
  state: StatusBarState
  /** Dismiss a notification by ID */
  onDismissNotification: (id: string) => void
  /** Clear all notifications */
  onClearNotifications: () => void
  /** Navigate to question menu (for "View" action) */
  onNavigateToMenu?: () => void
  /** Additional CSS classes */
  className?: string
}

// =============================================================================
// DIVIDER
// =============================================================================

function Divider() {
  return <div className="w-px h-5 bg-white/20" aria-hidden />
}

// =============================================================================
// COMPONENT
// =============================================================================

export function StatusBar({
  state,
  onDismissNotification,
  onClearNotifications,
  onNavigateToMenu,
  className,
}: StatusBarProps) {
  const { upload, compositeScore, confidence, notifications, filesUploaded } =
    state

  return (
    <div
      className={cn(
        'fixed bottom-4 left-1/2 -translate-x-1/2 z-40',
        'flex items-center gap-3 px-4 py-2.5',
        'bg-[#1a1a1a]/90 backdrop-blur-xl',
        'border border-white/10',
        'rounded-full shadow-lg',
        // Offset for control panel
        'ml-[-176px]',
        className
      )}
      role="status"
      aria-live="polite"
    >
      {/* Upload indicator */}
      <UploadIndicator
        state={upload.state}
        progress={upload.progress}
        filesUploaded={filesUploaded}
      />

      <Divider />

      {/* Composite score */}
      <CompositeScore score={compositeScore} />

      <Divider />

      {/* Confidence wheel */}
      <div className="inline-flex items-center gap-2">
        <ConfidenceWheel
          value={confidence.value}
          level={confidence.level}
        />
        <span className="text-xs text-white/60">confidence</span>
      </div>

      {/* Notification badge (only shown if has notifications) */}
      {notifications.length > 0 && (
        <>
          <Divider />
          <NotificationBadge
            notifications={notifications}
            onDismiss={onDismissNotification}
            onClearAll={onClearNotifications}
            onNavigateToMenu={onNavigateToMenu}
          />
        </>
      )}
    </div>
  )
}

// =============================================================================
// RE-EXPORTS FOR CONVENIENCE
// =============================================================================

export { UploadIndicator } from './UploadIndicator'
export { CompositeScore } from './CompositeScore'
export { ConfidenceWheel } from './ConfidenceWheel'
export { NotificationBadge } from './NotificationBadge'

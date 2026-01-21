/**
 * StatusBar - Fixed bottom status indicator
 *
 * Shows files uploaded count and updates count in a floating pill.
 *
 * @module playground/edit-questions/components/playground
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import FolderAddIcon from '@hugeicons-pro/core-stroke-rounded/FolderAddIcon'
import NotificationBubbleIcon from '@hugeicons-pro/core-stroke-rounded/NotificationBubbleIcon'

// =============================================================================
// TYPES
// =============================================================================

export interface StatusBarProps {
  /** Number of files uploaded */
  filesUploaded: number
  /** Number of updates/answered questions */
  updatesCount: number
}

// =============================================================================
// COMPONENT
// =============================================================================

export function StatusBar({ filesUploaded, updatesCount }: StatusBarProps) {
  return (
    <div
      className={cn(
        'fixed bottom-4 left-1/2 -translate-x-1/2 z-40',
        'flex items-center gap-4 px-4 py-2.5',
        'bg-[#1a1a1a]/90 backdrop-blur-xl',
        'border border-white/10',
        'rounded-full shadow-lg',
        // Offset for control panel
        'ml-[-176px]'
      )}
    >
      {/* Files uploaded */}
      <div className="inline-flex items-center gap-2 text-white/60">
        <HugeIcon icon={FolderAddIcon} size={16} color="current" />
        <span className="text-xs">
          {filesUploaded} {filesUploaded === 1 ? 'file' : 'files'} uploaded
        </span>
      </div>

      {/* Divider */}
      {updatesCount > 0 && <div className="w-px h-4 bg-white/20" />}

      {/* Updates count */}
      {updatesCount > 0 && (
        <div className="inline-flex items-center gap-1.5 text-white/80">
          <HugeIcon icon={NotificationBubbleIcon} size={14} color="current" />
          <span className="text-xs font-medium">{updatesCount} updates</span>
        </div>
      )}
    </div>
  )
}

/**
 * BottomToolbar - Fixed bottom status bar
 *
 * Shows uploaded content count, notifications, and status indicators.
 *
 * @module playground/edit-questions/components
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import FolderAddIcon from '@hugeicons-pro/core-stroke-rounded/FolderAddIcon'
import NotificationBubbleIcon from '@hugeicons-pro/core-stroke-rounded/NotificationBubbleIcon'
import CheckmarkCircle02Icon from '@hugeicons-pro/core-stroke-rounded/CheckmarkCircle02Icon'
import Loading03Icon from '@hugeicons-pro/core-stroke-rounded/Loading03Icon'

import type { ToolbarStatus, Notification } from '../types'

// =============================================================================
// TYPES
// =============================================================================

export interface BottomToolbarProps {
  status: ToolbarStatus
  uploadedCount: number
  notifications: Notification[]
  statusMessage?: string
  onClearNotifications?: () => void
  className?: string
}

// =============================================================================
// STATUS INDICATOR
// =============================================================================

interface StatusIndicatorProps {
  status: ToolbarStatus
  message?: string
}

function StatusIndicator({ status, message }: StatusIndicatorProps) {
  if (status === 'idle') return null

  const config = {
    processing: {
      icon: Loading03Icon,
      className: 'text-brand-primary',
      iconClassName: 'animate-spin',
      defaultMessage: 'Processing...',
    },
    success: {
      icon: CheckmarkCircle02Icon,
      className: 'text-success-primary',
      iconClassName: '',
      defaultMessage: 'Done',
    },
  }[status]

  return (
    <div className={cn('inline-flex items-center gap-2', config.className)}>
      <HugeIcon
        icon={config.icon}
        size="sm"
        color="current"
        className={config.iconClassName}
      />
      <span className="text-xs font-medium">{message || config.defaultMessage}</span>
    </div>
  )
}

// =============================================================================
// COMPONENT
// =============================================================================

export function BottomToolbar({
  status,
  uploadedCount,
  notifications,
  statusMessage,
  onClearNotifications,
  className,
}: BottomToolbarProps) {
  const hasNotifications = notifications.length > 0

  return (
    <div
      className={cn(
        'flex items-center justify-between px-4 py-3',
        'bg-secondary/80 backdrop-blur-sm',
        'border-t border-primary',
        className
      )}
    >
      {/* Left side - Upload count */}
      <div className="flex items-center gap-4">
        <div className="inline-flex items-center gap-2 text-tertiary">
          <HugeIcon icon={FolderAddIcon} size="sm" color="current" />
          <span className="text-xs">
            {uploadedCount} {uploadedCount === 1 ? 'file' : 'files'} uploaded
          </span>
        </div>
      </div>

      {/* Center - Status */}
      <StatusIndicator status={status} message={statusMessage} />

      {/* Right side - Notifications */}
      <div className="flex items-center gap-2">
        {hasNotifications && (
          <button
            type="button"
            onClick={onClearNotifications}
            className={cn(
              'inline-flex items-center gap-2 px-3 py-1.5 rounded-lg',
              'text-xs font-medium text-secondary',
              'bg-tertiary/50 hover:bg-tertiary',
              'motion-safe:transition-colors motion-safe:duration-150'
            )}
          >
            <HugeIcon icon={NotificationBubbleIcon} size="xs" color="current" />
            <span>{notifications.length} updates</span>
          </button>
        )}
      </div>
    </div>
  )
}

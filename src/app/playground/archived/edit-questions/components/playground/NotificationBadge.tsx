/**
 * NotificationBadge - Expandable notification list
 *
 * Shows notification count as a badge, expands on click to show list.
 * Each notification is dismissible, with "View" action to navigate.
 *
 * @module playground/edit-questions/components/playground
 */

'use client'

import * as React from 'react'
import { useState, useCallback, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import NotificationBubbleIcon from '@hugeicons-pro/core-stroke-rounded/NotificationBubbleIcon'
import Cancel01Icon from '@hugeicons-pro/core-stroke-rounded/Cancel01Icon'
import ArrowRight01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowRight01Icon'
import Delete02Icon from '@hugeicons-pro/core-stroke-rounded/Delete02Icon'
import type { StatusNotification, NotificationType } from '../../types'

// =============================================================================
// TYPES
// =============================================================================

export interface NotificationBadgeProps {
  /** List of notifications */
  notifications: StatusNotification[]
  /** Dismiss a notification by ID */
  onDismiss: (id: string) => void
  /** Clear all notifications */
  onClearAll: () => void
  /** Navigate to question menu (optional) */
  onNavigateToMenu?: () => void
  /** Additional CSS classes */
  className?: string
}

// =============================================================================
// CONSTANTS
// =============================================================================

const TYPE_ICONS: Record<NotificationType, typeof NotificationBubbleIcon> = {
  upload_complete: NotificationBubbleIcon,
  confidence_change: NotificationBubbleIcon,
  regeneration: NotificationBubbleIcon,
  info: NotificationBubbleIcon,
}

const TYPE_COLORS: Record<NotificationType, string> = {
  upload_complete: 'text-success-primary',
  confidence_change: 'text-brand-primary',
  regeneration: 'text-info-primary',
  info: 'text-tertiary',
}

// =============================================================================
// NOTIFICATION ITEM
// =============================================================================

interface NotificationItemProps {
  notification: StatusNotification
  onDismiss: () => void
  onView?: () => void
}

function NotificationItem({
  notification,
  onDismiss,
  onView,
}: NotificationItemProps) {
  const Icon = TYPE_ICONS[notification.type]
  const colorClass = TYPE_COLORS[notification.type]

  return (
    <div
      className={cn(
        'flex items-start gap-2 p-2 rounded-lg',
        'bg-white/5 hover:bg-white/10',
        'motion-safe:transition-colors motion-safe:duration-150'
      )}
    >
      {/* Icon */}
      <div className={cn('shrink-0 mt-0.5', colorClass)}>
        <HugeIcon icon={Icon} size={14} color="current" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-xs text-white/90 leading-relaxed">
          {notification.message}
        </p>
        {onView && (
          <button
            type="button"
            onClick={onView}
            className={cn(
              'inline-flex items-center gap-1 mt-1',
              'text-[10px] font-medium text-brand-primary hover:text-brand-primary-hover',
              'motion-safe:transition-colors motion-safe:duration-150'
            )}
          >
            View
            <HugeIcon icon={ArrowRight01Icon} size={10} color="current" />
          </button>
        )}
      </div>

      {/* Dismiss button */}
      <button
        type="button"
        onClick={onDismiss}
        className={cn(
          'shrink-0 p-1 -m-1 rounded',
          'text-white/40 hover:text-white/80',
          'motion-safe:transition-colors motion-safe:duration-150'
        )}
        aria-label="Dismiss notification"
      >
        <HugeIcon icon={Cancel01Icon} size={12} color="current" />
      </button>
    </div>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function NotificationBadge({
  notifications,
  onDismiss,
  onClearAll,
  onNavigateToMenu,
  className,
}: NotificationBadgeProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const count = notifications.length

  // Close on click outside
  useEffect(() => {
    if (!isExpanded) return

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isExpanded])

  // Close on escape
  useEffect(() => {
    if (!isExpanded) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsExpanded(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isExpanded])

  const handleToggle = useCallback(() => {
    if (count > 0) {
      setIsExpanded((prev) => !prev)
    }
  }, [count])

  const handleView = useCallback(() => {
    setIsExpanded(false)
    onNavigateToMenu?.()
  }, [onNavigateToMenu])

  const handleClearAll = useCallback(() => {
    onClearAll()
    setIsExpanded(false)
  }, [onClearAll])

  if (count === 0) {
    return null
  }

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      {/* Badge trigger */}
      <button
        type="button"
        onClick={handleToggle}
        className={cn(
          'inline-flex items-center gap-1.5 px-2 py-1 rounded-full',
          'bg-white/10 hover:bg-white/20',
          'motion-safe:transition-colors motion-safe:duration-150',
          isExpanded && 'bg-white/20'
        )}
        aria-expanded={isExpanded}
        aria-haspopup="true"
      >
        <HugeIcon
          icon={NotificationBubbleIcon}
          size={14}
          className="text-white/80"
        />
        <span className="text-xs font-medium text-white/80">{count}</span>
      </button>

      {/* Expanded panel */}
      {isExpanded && (
        <div
          className={cn(
            'absolute bottom-full left-1/2 -translate-x-1/2 mb-2',
            'w-64 max-h-64 overflow-auto',
            'bg-[#1a1a1a] border border-white/10 rounded-xl shadow-xl',
            'motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2',
            'motion-safe:duration-200'
          )}
          role="menu"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b border-white/10">
            <span className="text-xs font-medium text-white/80">
              Notifications
            </span>
            <button
              type="button"
              onClick={handleClearAll}
              className={cn(
                'inline-flex items-center gap-1',
                'text-[10px] font-medium text-white/40 hover:text-white/80',
                'motion-safe:transition-colors motion-safe:duration-150'
              )}
            >
              <HugeIcon icon={Delete02Icon} size={10} color="current" />
              Clear all
            </button>
          </div>

          {/* Notification list */}
          <div className="p-2 space-y-1">
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onDismiss={() => onDismiss(notification.id)}
                onView={
                  notification.type === 'confidence_change'
                    ? handleView
                    : undefined
                }
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

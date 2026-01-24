/**
 * StatusIsland - Configurable floating status bar
 *
 * Uses Base UI Menu for viewport-aware notification dropdown positioning.
 *
 * @status incubating
 * @migration-target src/components/ui/prod/features/quick-fix
 */

'use client'

import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import { Menu } from '@base-ui/react/menu'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import AiBrain01Icon from '@hugeicons-pro/core-stroke-rounded/AiBrain01Icon'
import Upload04Icon from '@hugeicons-pro/core-stroke-rounded/Upload04Icon'
import Notification01Icon from '@hugeicons-pro/core-stroke-rounded/Notification01Icon'
import CheckmarkCircle01Icon from '@hugeicons-pro/core-stroke-rounded/CheckmarkCircle01Icon'
import ArrowUp01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowUp01Icon'
import Cancel01Icon from '@hugeicons-pro/core-stroke-rounded/Cancel01Icon'
import type { IslandConfig } from '../config/types'

// =============================================================================
// TYPES
// =============================================================================

export interface Notification {
  id: string
  type: 'upload_complete' | 'confidence_change' | 'regeneration' | 'info'
  title: string
  subtitle?: string
  timestamp: Date
}

export interface StatusIslandProps {
  config: IslandConfig
  uploadProgress?: number
  filesUploaded?: number
  compositeScore?: number
  confidenceValue?: number
  confidenceLevel?: 'high' | 'medium' | 'low'
  notifications?: Notification[]
  onDismissNotification?: (id: string) => void
  /** Position preset or use className for custom positioning */
  position?: 'bottom-center' | 'top-right' | 'none'
  className?: string
}

// =============================================================================
// DIVIDER
// =============================================================================

function Divider() {
  return <div className="w-px self-stretch -my-2 bg-border-secondary" aria-hidden />
}

// =============================================================================
// UPLOAD INDICATOR
// =============================================================================

function UploadIndicator({
  progress,
  filesUploaded,
}: {
  progress: number
  filesUploaded: number
}) {
  const isUploading = progress > 0 && progress < 100

  return (
    <div className="flex items-center gap-2">
      <div className={cn(
        'size-5 rounded-full flex items-center justify-center',
        isUploading ? 'bg-brand-primary/20' : 'bg-tertiary'
      )}>
        <HugeIcon
          icon={Upload04Icon}
          size={14}
          className={isUploading ? 'text-brand-primary animate-pulse' : 'text-tertiary'}
        />
      </div>
      <span className="text-xs text-tertiary tabular-nums">
        {filesUploaded} files
      </span>
    </div>
  )
}

// =============================================================================
// COMPOSITE SCORE
// =============================================================================

function CompositeScore({ score }: { score: number }) {
  const [isPulsing, setIsPulsing] = useState(false)
  const prevScoreRef = useRef(score)

  useEffect(() => {
    if (score > prevScoreRef.current) {
      setIsPulsing(true)
      const timer = setTimeout(() => setIsPulsing(false), 300)
      return () => clearTimeout(timer)
    }
    prevScoreRef.current = score
  }, [score])

  const formatted = score >= 1000 ? `${(score / 1000).toFixed(1)}K` : score.toString()

  return (
    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-brand-primary/20">
      <div className={cn(
        'motion-safe:transition-transform motion-safe:duration-300',
        isPulsing && 'motion-safe:scale-110'
      )}>
        <HugeIcon icon={AiBrain01Icon} size={14} className="text-brand-primary" />
      </div>
      <span className={cn(
        'text-xs font-semibold text-primary',
        'motion-safe:transition-transform motion-safe:duration-300',
        isPulsing && 'motion-safe:scale-105'
      )}>
        {formatted}
      </span>
    </div>
  )
}

// =============================================================================
// CONFIDENCE WHEEL
// =============================================================================

function ConfidenceWheel({
  value,
  level,
  size,
  strokeWidth,
}: {
  value: number
  level: 'high' | 'medium' | 'low'
  size: number
  strokeWidth: number
}) {
  const [displayValue, setDisplayValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDisplayValue(value), 50)
    return () => clearTimeout(timer)
  }, [value])

  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (displayValue / 100) * circumference

  const colorClass = {
    high: 'text-success-primary',
    medium: 'text-warning-primary',
    low: 'text-error-primary',
  }[level]

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-tertiary/30"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className={cn(colorClass, 'motion-safe:transition-all motion-safe:duration-500')}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-primary">
        {Math.round(displayValue)}
      </span>
    </div>
  )
}

// =============================================================================
// NOTIFICATION HELPERS
// =============================================================================

function getNotificationIcon(type: Notification['type']) {
  switch (type) {
    case 'upload_complete':
      return Upload04Icon
    case 'confidence_change':
      return ArrowUp01Icon
    case 'regeneration':
      return CheckmarkCircle01Icon
    default:
      return Notification01Icon
  }
}

function getNotificationIconColor(type: Notification['type']) {
  switch (type) {
    case 'upload_complete':
      return 'text-brand-primary'
    case 'confidence_change':
      return 'text-success-primary'
    case 'regeneration':
      return 'text-success-primary'
    default:
      return 'text-tertiary'
  }
}

// =============================================================================
// NOTIFICATION BADGE (Base UI Menu)
// =============================================================================

function NotificationBadge({
  count,
  notifications,
  showPanel,
  onDismiss,
}: {
  count: number
  notifications: Notification[]
  showPanel: boolean
  onDismiss?: (id: string) => void
}) {
  if (count === 0) return null

  return (
    <Menu.Root>
      <Menu.Trigger
        className="relative flex items-center justify-center size-6 rounded-full bg-tertiary hover:bg-secondary motion-safe:transition-colors"
      >
        <HugeIcon icon={Notification01Icon} size={14} className="text-secondary" />
        <span className="absolute -top-0.5 -right-0.5 size-3.5 rounded-full bg-error-primary flex items-center justify-center text-[9px] font-semibold text-white">
          {count > 9 ? '9+' : count}
        </span>
      </Menu.Trigger>

      {showPanel && (
        <Menu.Portal>
          <Menu.Positioner side="top" align="end" sideOffset={12}>
            <Menu.Popup
              className={cn(
                'w-80 max-h-64 overflow-y-auto',
                'bg-primary border border-primary rounded-xl shadow-2xl',
                'origin-[var(--transform-origin)]',
                'motion-safe:transition-all motion-safe:duration-200',
                'data-[starting-style]:opacity-0 data-[starting-style]:scale-95',
                'data-[ending-style]:opacity-0 data-[ending-style]:scale-95'
              )}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-primary">
                <span className="text-sm font-medium text-primary">Notifications</span>
              </div>

              {/* Notifications list */}
              <div className="p-2">
                {notifications.length === 0 ? (
                  <p className="text-sm text-disabled text-center py-4">No notifications</p>
                ) : (
                  notifications.map((notif) => (
                    <Menu.Item
                      key={notif.id}
                      closeOnClick={false}
                      className={cn(
                        'flex items-start gap-3 p-3 rounded-lg',
                        'hover:bg-tertiary data-[highlighted]:bg-tertiary',
                        'motion-safe:transition-colors',
                        'outline-none cursor-default'
                      )}
                    >
                      <div className={cn(
                        'flex-shrink-0 size-8 rounded-lg flex items-center justify-center',
                        'bg-tertiary'
                      )}>
                        <HugeIcon
                          icon={getNotificationIcon(notif.type)}
                          size={16}
                          className={getNotificationIconColor(notif.type)}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-primary truncate">{notif.title}</p>
                        {notif.subtitle && (
                          <p className="text-xs text-tertiary mt-0.5">{notif.subtitle}</p>
                        )}
                      </div>
                      {onDismiss && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            onDismiss(notif.id)
                          }}
                          className="flex-shrink-0 p-1 rounded hover:bg-secondary text-tertiary hover:text-secondary motion-safe:transition-colors"
                        >
                          <HugeIcon icon={Cancel01Icon} size={12} />
                        </button>
                      )}
                    </Menu.Item>
                  ))
                )}
              </div>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      )}
    </Menu.Root>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function StatusIsland({
  config,
  uploadProgress = 0,
  filesUploaded = 0,
  compositeScore = 12100,
  confidenceValue = 65,
  confidenceLevel = 'medium',
  notifications = [],
  onDismissNotification,
  position = 'bottom-center',
  className,
}: StatusIslandProps) {
  // Build border class
  const borderClass = config.border ? `border border-${config.borderColor}` : ''

  // Position classes
  const positionClasses = {
    'bottom-center': 'fixed bottom-4 left-1/2 -translate-x-1/2 ml-[-176px]',
    'top-right': 'fixed top-4 right-[368px]',
    'none': '',
  }

  return (
    <div
      className={cn(
        positionClasses[position],
        'z-40',
        'flex items-center',
        'shadow-lg',
        borderClass,
        className
      )}
      style={{
        padding: `${Math.max(6, config.padding - 4)}px ${Math.max(10, config.padding)}px`,
        gap: Math.max(8, config.gap - 4),
        borderRadius: config.borderRadius,
        background: config.background,
        backdropFilter: config.backdropBlur > 0 ? `blur(${config.backdropBlur}px)` : undefined,
        WebkitBackdropFilter: config.backdropBlur > 0 ? `blur(${config.backdropBlur}px)` : undefined,
      }}
      role="status"
      aria-live="polite"
    >
      {/* Upload indicator */}
      {config.showUpload && (
        <>
          <UploadIndicator progress={uploadProgress} filesUploaded={filesUploaded} />
          <Divider />
        </>
      )}

      {/* Composite score */}
      {config.showScore && (
        <>
          <CompositeScore score={compositeScore} />
          <Divider />
        </>
      )}

      {/* Confidence wheel */}
      {config.showConfidence && (
        <ConfidenceWheel
          value={confidenceValue}
          level={confidenceLevel}
          size={config.wheelSize}
          strokeWidth={config.wheelStrokeWidth}
        />
      )}

      {/* Notification badge */}
      {config.showNotifications && notifications.length > 0 && (
        <>
          <Divider />
          <NotificationBadge
            count={notifications.length}
            notifications={notifications}
            showPanel={config.showNotificationPanel}
            onDismiss={onDismissNotification}
          />
        </>
      )}
    </div>
  )
}

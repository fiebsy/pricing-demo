/**
 * StatusIsland - Configurable floating status bar
 *
 * @status incubating
 * @migration-target src/components/ui/prod/features/quick-fix
 */

'use client'

import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
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
  className?: string
}

// =============================================================================
// DIVIDER
// =============================================================================

function Divider() {
  return <div className="w-px h-5 bg-white/20" aria-hidden />
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
        isUploading ? 'bg-brand-primary/20' : 'bg-white/10'
      )}>
        <HugeIcon
          icon={Upload04Icon}
          size={14}
          className={isUploading ? 'text-brand-primary animate-pulse' : 'text-white/60'}
        />
      </div>
      <span className="text-xs text-white/60 tabular-nums">
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
    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-brand-primary/20">
      <div className={cn(
        'motion-safe:transition-transform motion-safe:duration-300',
        isPulsing && 'motion-safe:scale-110'
      )}>
        <HugeIcon icon={AiBrain01Icon} size={18} className="text-brand-primary" />
      </div>
      <span className={cn(
        'text-sm font-semibold text-white',
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
          className="text-white/10"
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
      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-white">
        {Math.round(displayValue)}
      </span>
    </div>
  )
}

// =============================================================================
// NOTIFICATION PANEL
// =============================================================================

interface NotificationPanelProps {
  notifications: Notification[]
  onDismiss?: (id: string) => void
  isOpen: boolean
  onClose: () => void
}

function NotificationPanel({ notifications, onDismiss, isOpen, onClose }: NotificationPanelProps) {
  if (!isOpen) return null

  const getIcon = (type: Notification['type']) => {
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

  const getIconColor = (type: Notification['type']) => {
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

  return (
    <div
      className={cn(
        'absolute bottom-full left-1/2 -translate-x-1/2 mb-3',
        'w-80 max-h-64 overflow-y-auto',
        'bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl',
        'motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2',
        'motion-safe:duration-200'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <span className="text-sm font-medium text-white">Notifications</span>
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-md hover:bg-white/10 text-white/60 hover:text-white motion-safe:transition-colors"
        >
          <HugeIcon icon={Cancel01Icon} size={14} />
        </button>
      </div>

      {/* Notifications list */}
      <div className="p-2">
        {notifications.length === 0 ? (
          <p className="text-sm text-white/40 text-center py-4">No notifications</p>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 motion-safe:transition-colors"
            >
              <div className={cn(
                'flex-shrink-0 size-8 rounded-lg flex items-center justify-center',
                'bg-white/5'
              )}>
                <HugeIcon
                  icon={getIcon(notif.type)}
                  size={16}
                  className={getIconColor(notif.type)}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{notif.title}</p>
                {notif.subtitle && (
                  <p className="text-xs text-white/50 mt-0.5">{notif.subtitle}</p>
                )}
              </div>
              {onDismiss && (
                <button
                  type="button"
                  onClick={() => onDismiss(notif.id)}
                  className="flex-shrink-0 p-1 rounded hover:bg-white/10 text-white/40 hover:text-white/60 motion-safe:transition-colors"
                >
                  <HugeIcon icon={Cancel01Icon} size={12} />
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

// =============================================================================
// NOTIFICATION BADGE
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
  const [isOpen, setIsOpen] = useState(false)

  if (count === 0) return null

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-center size-8 rounded-full bg-white/10 hover:bg-white/20 motion-safe:transition-colors"
      >
        <HugeIcon icon={Notification01Icon} size={16} className="text-white/80" />
        <span className="absolute -top-1 -right-1 size-4 rounded-full bg-error-primary flex items-center justify-center text-[10px] font-semibold text-white">
          {count > 9 ? '9+' : count}
        </span>
      </button>

      {showPanel && (
        <NotificationPanel
          notifications={notifications}
          onDismiss={onDismiss}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
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
  className,
}: StatusIslandProps) {
  // Build border class
  const borderClass = config.border ? `border border-${config.borderColor}` : ''

  return (
    <div
      className={cn(
        'fixed bottom-4 left-1/2 -translate-x-1/2 z-40',
        'flex items-center',
        'shadow-lg',
        borderClass,
        // Offset for control panel
        'ml-[-176px]',
        className
      )}
      style={{
        padding: `${config.padding}px ${config.padding + 6}px`,
        gap: config.gap,
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
        <div className="inline-flex items-center gap-2">
          <ConfidenceWheel
            value={confidenceValue}
            level={confidenceLevel}
            size={config.wheelSize}
            strokeWidth={config.wheelStrokeWidth}
          />
          <span className="text-xs text-white/60">confidence</span>
        </div>
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

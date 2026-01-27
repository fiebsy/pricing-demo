/**
 * StatusIslandAdapter - Modal-positioned status island
 *
 * Adapts the StatusIsland component for use within the modal context.
 * Positions the island relative to the modal instead of the viewport.
 *
 * @module playground/quick-fix-modal/integration
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { StatusIsland, type Notification } from '../../quick-fix-interactions/core/StatusIsland'
// Use any for IslandConfig since the type is not properly exported
type IslandConfig = any

export interface StatusIslandAdapterProps {
  /** Island configuration */
  config: IslandConfig
  /** Upload progress (0-100) */
  uploadProgress?: number
  /** Number of files uploaded */
  filesUploaded?: number
  /** Composite score */
  compositeScore?: number
  /** Confidence value (0-100) */
  confidenceValue?: number
  /** Confidence level */
  confidenceLevel?: 'high' | 'medium' | 'low'
  /** Active notifications */
  notifications?: Notification[]
  /** Callback to dismiss notification */
  onDismissNotification?: (id: string) => void
  /** Whether to show (can be hidden during certain flows) */
  visible?: boolean
  /** Additional className */
  className?: string
}

/**
 * StatusIslandAdapter Component
 *
 * Wraps StatusIsland for modal integration.
 * Can be positioned within the modal or as a fixed element.
 */
export function StatusIslandAdapter({
  config,
  uploadProgress = 0,
  filesUploaded = 0,
  compositeScore = 0,
  confidenceValue = 0,
  confidenceLevel = 'low',
  notifications = [],
  onDismissNotification,
  visible = true,
  className,
}: StatusIslandAdapterProps) {
  if (!visible) return null

  // Override fixed positioning for modal context
  return (
    <div
      className={cn(
        'absolute bottom-4 left-1/2 -translate-x-1/2 z-10',
        'motion-safe:transition-opacity motion-safe:duration-200',
        className
      )}
    >
      <StatusIsland
        config={config}
        uploadProgress={uploadProgress}
        filesUploaded={filesUploaded}
        compositeScore={compositeScore}
        confidenceValue={confidenceValue}
        confidenceLevel={confidenceLevel}
        notifications={notifications}
        onDismissNotification={onDismissNotification}
      />
    </div>
  )
}

// =============================================================================
// INLINE ISLAND (for within sheet content)
// =============================================================================

export interface InlineStatusIslandProps extends Omit<StatusIslandAdapterProps, 'className'> {
  /** Additional className */
  className?: string
}

/**
 * InlineStatusIsland - Non-floating status display
 *
 * For use within sheet content rather than fixed positioning.
 */
export function InlineStatusIsland({
  config,
  uploadProgress = 0,
  filesUploaded = 0,
  compositeScore = 0,
  confidenceValue = 0,
  confidenceLevel = 'low',
  notifications = [],
  onDismissNotification,
  visible = true,
  className,
}: InlineStatusIslandProps) {
  if (!visible) return null

  // Build border class
  const borderClass = config.border ? `border border-${config.borderColor}` : ''

  return (
    <div
      className={cn(
        'flex items-center justify-center',
        'shadow-lg',
        borderClass,
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
      {/* Simplified inline display - just score and confidence */}
      <div className="text-sm font-medium text-white">
        Score: {compositeScore.toLocaleString()}
      </div>
      <div className="w-px h-4 bg-white/20" />
      <div className="text-sm text-white/60">
        {confidenceValue}% confidence
      </div>
    </div>
  )
}

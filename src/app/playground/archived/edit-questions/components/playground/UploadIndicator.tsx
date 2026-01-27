/**
 * UploadIndicator - Mini circular progress indicator
 *
 * Shows upload progress during file upload, file count when idle.
 * Uses SVG circular progress (S-tier animation: transform/opacity only).
 *
 * @module playground/edit-questions/components/playground
 */

'use client'

import * as React from 'react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import FolderAddIcon from '@hugeicons-pro/core-stroke-rounded/FolderAddIcon'
import Tick01Icon from '@hugeicons-pro/core-stroke-rounded/Tick01Icon'
import type { UploadState } from '../../types'

// =============================================================================
// TYPES
// =============================================================================

export interface UploadIndicatorProps {
  /** Current upload state */
  state: UploadState
  /** Progress percentage (0-100) */
  progress: number
  /** Number of files uploaded (shown when idle) */
  filesUploaded: number
  /** Additional CSS classes */
  className?: string
}

// =============================================================================
// CONSTANTS
// =============================================================================

const CIRCLE_SIZE = 32
const STROKE_WIDTH = 3
const RADIUS = (CIRCLE_SIZE - STROKE_WIDTH) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

// =============================================================================
// COMPONENT
// =============================================================================

export function UploadIndicator({
  state,
  progress,
  filesUploaded,
  className,
}: UploadIndicatorProps) {
  const [displayProgress, setDisplayProgress] = useState(0)
  const [showComplete, setShowComplete] = useState(false)

  // Animate progress smoothly
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayProgress(progress)
    }, 50)
    return () => clearTimeout(timer)
  }, [progress])

  // Show checkmark briefly on complete
  useEffect(() => {
    if (state === 'complete') {
      setShowComplete(true)
      const timer = setTimeout(() => {
        setShowComplete(false)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [state])

  const strokeDashoffset =
    CIRCUMFERENCE - (displayProgress / 100) * CIRCUMFERENCE
  const isUploading = state === 'uploading' || state === 'processing'

  return (
    <div
      className={cn('inline-flex items-center gap-2', className)}
      role="status"
      aria-label={
        isUploading
          ? `Uploading ${Math.round(displayProgress)}%`
          : `${filesUploaded} files uploaded`
      }
    >
      {/* Circular progress when uploading, icon when idle */}
      {isUploading || showComplete ? (
        <div className="relative">
          <svg
            width={CIRCLE_SIZE}
            height={CIRCLE_SIZE}
            className="transform -rotate-90"
          >
            {/* Background circle */}
            <circle
              cx={CIRCLE_SIZE / 2}
              cy={CIRCLE_SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke="currentColor"
              strokeWidth={STROKE_WIDTH}
              className="text-white/10"
            />
            {/* Progress circle */}
            <circle
              cx={CIRCLE_SIZE / 2}
              cy={CIRCLE_SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke="currentColor"
              strokeWidth={STROKE_WIDTH}
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={showComplete ? 0 : strokeDashoffset}
              className={cn(
                'motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out',
                showComplete ? 'text-success-primary' : 'text-brand-primary'
              )}
            />
          </svg>

          {/* Center content */}
          <div className="absolute inset-0 flex items-center justify-center">
            {showComplete ? (
              <HugeIcon
                icon={Tick01Icon}
                size={14}
                className="text-success-primary"
              />
            ) : (
              <span className="text-[9px] font-medium text-white/80">
                {Math.round(displayProgress)}%
              </span>
            )}
          </div>
        </div>
      ) : (
        <HugeIcon icon={FolderAddIcon} size={16} className="text-white/60" />
      )}

      {/* Text label */}
      <span
        className={cn(
          'text-xs',
          isUploading || showComplete ? 'text-white/80' : 'text-white/60'
        )}
      >
        {isUploading
          ? state === 'processing'
            ? 'Processing...'
            : 'Uploading...'
          : showComplete
            ? 'Complete!'
            : `${filesUploaded} ${filesUploaded === 1 ? 'file' : 'files'} uploaded`}
      </span>
    </div>
  )
}

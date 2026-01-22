/**
 * ProcessingMeter - Circular progress indicator
 *
 * Shows during LLM processing after revision:
 * - Loading → Analyzing → Complete states
 * - Circular progress with percentage
 *
 * @module playground/edit-questions/components
 */

'use client'

import * as React from 'react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import Tick01Icon from '@hugeicons-pro/core-stroke-rounded/Tick01Icon'

import type { ProcessingState } from '../../types'

// =============================================================================
// TYPES
// =============================================================================

export interface ProcessingMeterProps {
  state: ProcessingState
  progress: number // 0-100
  onComplete?: () => void
  className?: string
}

// =============================================================================
// CONSTANTS
// =============================================================================

const STATE_LABELS: Record<ProcessingState, string> = {
  idle: '',
  loading: 'Loading memories...',
  analyzing: 'Analyzing context...',
  complete: 'Complete!',
}

const CIRCLE_SIZE = 120
const STROKE_WIDTH = 8
const RADIUS = (CIRCLE_SIZE - STROKE_WIDTH) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

// =============================================================================
// COMPONENT
// =============================================================================

export function ProcessingMeter({
  state,
  progress,
  onComplete,
  className,
}: ProcessingMeterProps) {
  const [displayProgress, setDisplayProgress] = useState(0)

  // Animate progress smoothly
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayProgress(progress)
    }, 50)
    return () => clearTimeout(timer)
  }, [progress])

  // Call onComplete when reaching 100%
  useEffect(() => {
    if (state === 'complete' && progress >= 100 && onComplete) {
      const timer = setTimeout(onComplete, 800)
      return () => clearTimeout(timer)
    }
  }, [state, progress, onComplete])

  const strokeDashoffset = CIRCUMFERENCE - (displayProgress / 100) * CIRCUMFERENCE

  if (state === 'idle') return null

  return (
    <div className={cn('flex flex-col items-center justify-center py-8', className)}>
      {/* Circular progress */}
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
            className="text-tertiary/20"
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
            strokeDashoffset={strokeDashoffset}
            className={cn(
              'motion-safe:transition-all motion-safe:duration-500 motion-safe:ease-out',
              state === 'complete' ? 'text-success-primary' : 'text-brand-primary'
            )}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex items-center justify-center">
          {state === 'complete' ? (
            <div className="size-12 rounded-full bg-success-primary/10 flex items-center justify-center">
              <HugeIcon icon={Tick01Icon} size="lg" color="success" />
            </div>
          ) : (
            <span className="text-2xl font-semibold text-primary">
              {Math.round(displayProgress)}%
            </span>
          )}
        </div>
      </div>

      {/* State label */}
      <p className="mt-4 text-sm font-medium text-secondary">
        {STATE_LABELS[state]}
      </p>

      {/* Description */}
      {state !== 'complete' && (
        <p className="mt-1 text-xs text-tertiary">
          Generating improved answer...
        </p>
      )}
    </div>
  )
}

// =============================================================================
// HOOK FOR SIMULATED PROGRESS
// =============================================================================

export interface UseSimulatedProgressOptions {
  duration: number // Total duration in ms
  onComplete?: () => void
}

export function useSimulatedProgress({ duration, onComplete }: UseSimulatedProgressOptions) {
  const [progress, setProgress] = useState(0)
  const [state, setState] = useState<ProcessingState>('idle')

  const start = React.useCallback(() => {
    setProgress(0)
    setState('loading')

    const interval = 50
    const increment = (100 / duration) * interval
    let currentProgress = 0

    const timer = setInterval(() => {
      currentProgress += increment

      if (currentProgress >= 100) {
        setProgress(100)
        setState('complete')
        clearInterval(timer)
        onComplete?.()
      } else {
        setProgress(currentProgress)
        // Switch to analyzing at 40%
        if (currentProgress >= 40 && state === 'loading') {
          setState('analyzing')
        }
      }
    }, interval)

    return () => clearInterval(timer)
  }, [duration, onComplete, state])

  const reset = React.useCallback(() => {
    setProgress(0)
    setState('idle')
  }, [])

  return { progress, state, start, reset, setState }
}

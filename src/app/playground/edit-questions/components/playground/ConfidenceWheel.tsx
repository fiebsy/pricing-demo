/**
 * ConfidenceWheel - Mini color-coded circular progress
 *
 * Shows confidence score (0-100) as a circular progress wheel
 * with color based on level: green (high), orange (medium), red (low).
 *
 * @module playground/edit-questions/components/playground
 */

'use client'

import * as React from 'react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import type { ConfidenceLevel } from '../../types'

// =============================================================================
// TYPES
// =============================================================================

export interface ConfidenceWheelProps {
  /** Confidence value (0-100) */
  value: number
  /** Confidence level for color */
  level: ConfidenceLevel
  /** Wheel size in pixels (default 28) */
  size?: number
  /** Additional CSS classes */
  className?: string
}

// =============================================================================
// CONSTANTS
// =============================================================================

const DEFAULT_SIZE = 28
const STROKE_WIDTH = 2.5

const LEVEL_COLORS: Record<ConfidenceLevel, string> = {
  high: 'text-success-primary',
  medium: 'text-warning-primary',
  low: 'text-error-primary',
}

// =============================================================================
// COMPONENT
// =============================================================================

export function ConfidenceWheel({
  value,
  level,
  size = DEFAULT_SIZE,
  className,
}: ConfidenceWheelProps) {
  const [displayValue, setDisplayValue] = useState(value)

  // Animate value smoothly
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayValue(value)
    }, 50)
    return () => clearTimeout(timer)
  }, [value])

  const radius = (size - STROKE_WIDTH) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (displayValue / 100) * circumference

  const colorClass = LEVEL_COLORS[level]

  return (
    <div
      className={cn('relative inline-flex items-center justify-center', className)}
      role="meter"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Confidence: ${value}%`}
    >
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={STROKE_WIDTH}
          className="text-white/10"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className={cn(
            colorClass,
            'motion-safe:transition-all motion-safe:duration-500 motion-safe:ease-out'
          )}
        />
      </svg>

      {/* Center score */}
      <span
        className={cn(
          'absolute inset-0 flex items-center justify-center',
          'text-[10px] font-semibold text-white'
        )}
      >
        {Math.round(displayValue)}
      </span>
    </div>
  )
}

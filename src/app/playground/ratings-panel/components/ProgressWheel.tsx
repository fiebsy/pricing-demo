/**
 * ProgressWheel Component
 *
 * Circular SVG progress indicator for score display.
 *
 * @module playground/ratings-panel/components
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { getScoreColor } from '../config'

// Color mapping for progress fill
const strokeColorMap = {
  success: 'rgb(23 178 106 / 0.6)',
  warning: 'rgb(247 144 9 / 0.6)',
  error: 'rgb(240 68 56 / 0.6)',
}

export interface ProgressWheelProps {
  value: number
  size?: number
  strokeWidth?: number
  isActive?: boolean
  className?: string
  children: React.ReactNode
}

export function ProgressWheel({
  value,
  size = 56,
  strokeWidth = 4,
  isActive = false,
  className,
  children,
}: ProgressWheelProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const clampedValue = Math.max(0, Math.min(100, value))
  const strokeDashoffset = circumference - (clampedValue / 100) * circumference

  const scoreColor = getScoreColor(clampedValue)

  return (
    <div
      className={cn('relative flex items-center justify-center shrink-0', className)}
      style={{ width: size, height: size }}
    >
      {/* SVG Circle */}
      <svg className="absolute -rotate-90" width={size} height={size}>
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-bg-quaternary)"
          strokeWidth={strokeWidth}
        />
        {/* Progress fill */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={strokeColorMap[scoreColor]}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className={cn(
            'motion-safe:transition-[stroke-dashoffset] motion-safe:duration-500 motion-safe:ease-[cubic-bezier(.2,.8,.2,1)]',
            'motion-reduce:transition-none'
          )}
        />
      </svg>

      {/* Center content (icon) */}
      <div className="relative flex items-center justify-center">{children}</div>
    </div>
  )
}

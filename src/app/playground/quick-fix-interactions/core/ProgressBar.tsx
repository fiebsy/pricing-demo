/**
 * ProgressBar - Configurable progress indicator
 *
 * @status incubating
 * @migration-target src/components/ui/prod/features/quick-fix
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import type { ProgressConfig } from '../config/types'

// =============================================================================
// TYPES
// =============================================================================

export interface ProgressBarProps {
  current: number
  total: number
  config: ProgressConfig
  className?: string
}

// =============================================================================
// COMPONENT
// =============================================================================

export function ProgressBar({ current, total, config, className }: ProgressBarProps) {
  const percentage = total > 0 ? (current / total) * 100 : 0

  return (
    <div className={cn('w-full max-w-xs', className)}>
      {/* Labels above */}
      {config.labelPosition === 'above' && (config.showLabel || config.showCount) && (
        <div className="flex items-center justify-between mb-2">
          {config.showLabel && (
            <span className="text-xs font-medium text-tertiary">Progress</span>
          )}
          {config.showCount && (
            <span className="text-xs font-medium text-primary">
              {current} / {total}
            </span>
          )}
        </div>
      )}

      {/* Bar container */}
      <div
        className={cn('overflow-hidden', `bg-${config.background}`)}
        style={{
          height: config.height,
          borderRadius: config.borderRadius,
        }}
      >
        {/* Fill */}
        <div
          className={cn(
            'h-full',
            `bg-${config.fillColor}`,
            config.animateFill && 'motion-safe:transition-all motion-safe:ease-out'
          )}
          style={{
            width: `${percentage}%`,
            borderRadius: config.borderRadius,
            transitionDuration: config.animateFill ? `${config.fillDuration}ms` : undefined,
          }}
        />
      </div>

      {/* Inline labels */}
      {config.labelPosition === 'inline' && (config.showLabel || config.showCount) && (
        <div className="flex items-center justify-center mt-2 gap-2">
          {config.showLabel && (
            <span className="text-xs text-tertiary">Progress</span>
          )}
          {config.showCount && (
            <span className="text-xs font-medium text-primary">
              {current} / {total}
            </span>
          )}
        </div>
      )}
    </div>
  )
}

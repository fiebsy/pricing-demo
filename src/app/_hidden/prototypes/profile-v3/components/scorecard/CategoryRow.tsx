/**
 * CategoryRow Component - V3
 *
 * Individual category row with score bar, hover reveal "Add" button.
 *
 * @module b/profile-v3/components/scorecard
 */

'use client'

import * as React from 'react'
import NumberFlow from '@number-flow/react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import { Button } from '@/components/ui/prod/base/button'
import type { CategoryType } from '../../types'

// =============================================================================
// TYPES
// =============================================================================

export interface CategoryRowProps {
  id: CategoryType
  label: string
  icon: React.ComponentType<{ className?: string }>
  score: number
  onImprove: () => void
  className?: string
}

// =============================================================================
// COMPONENT
// =============================================================================

export function CategoryRow({
  id,
  label,
  icon: Icon,
  score,
  onImprove,
  className,
}: CategoryRowProps) {
  return (
    <div
      className={cn(
        'group relative py-0.5 px-2 rounded-xl corner-squircle',
        'motion-safe:transition-all motion-safe:duration-150 motion-reduce:transition-none',
        'group-hover/list:opacity-50 hover:!opacity-100',
        className
      )}
    >
      {/* Fill background - width based on score */}
      <div
        className="absolute inset-y-0 left-0 bg-tertiary/50 rounded-xl corner-squircle"
        style={{ width: `${Math.max(0, Math.min(100, score))}%` }}
      />

      {/* Content - positioned above fill */}
      <div className="relative flex items-center gap-2">
        <HugeIcon
          icon={Icon}
          size={16}
          strokeWidth={2}
          className="text-quaternary shrink-0 opacity-50"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-secondary">{label}</span>
            <div className="relative flex items-center justify-end min-h-[28px]">
              {/* Score */}
              <NumberFlow
                value={score}
                className="text-sm font-medium text-tertiary tabular-nums"
              />
              {/* Improve button - absolute, hidden by default, visible on hover */}
              <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 opacity-0 group-hover:opacity-100 motion-safe:transition-opacity motion-safe:duration-150">
                {/* Triangle pointing left */}
                <svg
                  className="absolute -left-1.5 top-1/2 -translate-y-1/2 text-[var(--color-gray-700)]"
                  width="6"
                  height="10"
                  viewBox="0 0 6 10"
                  fill="currentColor"
                >
                  <path d="M6 0L6 10L0 5L6 0Z" />
                </svg>
                <Button
                  variant="shine"
                  size="xs"
                  onClick={onImprove}
                >
                  Improve
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

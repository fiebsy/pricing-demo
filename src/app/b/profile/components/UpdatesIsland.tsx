/**
 * UpdatesIsland Component
 *
 * Floating pill at top showing pending updates.
 *
 * @module b/profile/components
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import Notification01Icon from '@hugeicons-pro/core-stroke-rounded/Notification01Icon'
import File01Icon from '@hugeicons-pro/core-stroke-rounded/File01Icon'
import type { UpdatesIslandProps } from '../types'

// =============================================================================
// COMPONENT
// =============================================================================

export function UpdatesIsland({ data, onClick, className }: UpdatesIslandProps) {
  const hasUpdates = data.pendingFiles > 0 || data.pendingUpdates > 0

  if (!hasUpdates) return null

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-3 px-4 py-2 rounded-full',
        'bg-primary border border-primary shadow-lg',
        'hover:bg-secondary',
        'motion-safe:transition-all motion-safe:duration-150',
        'motion-reduce:transition-none',
        'hover:scale-[1.02] active:scale-[0.98]',
        className
      )}
    >
      {/* Files count */}
      {data.pendingFiles > 0 && (
        <span className="inline-flex items-center gap-1.5 text-sm text-secondary">
          <HugeIcon icon={File01Icon} size={14} strokeWidth={1.5} className="text-tertiary" />
          <span className="tabular-nums">{data.pendingFiles} files</span>
        </span>
      )}

      {/* Separator */}
      {data.pendingFiles > 0 && data.pendingUpdates > 0 && (
        <span className="w-px h-4 bg-tertiary" />
      )}

      {/* Updates count */}
      {data.pendingUpdates > 0 && (
        <span className="inline-flex items-center gap-1.5 text-sm text-secondary">
          <HugeIcon icon={Notification01Icon} size={14} strokeWidth={1.5} className="text-tertiary" />
          <span className="tabular-nums">{data.pendingUpdates} updates</span>
        </span>
      )}
    </button>
  )
}

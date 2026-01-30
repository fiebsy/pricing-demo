/**
 * BottomToolbar Component
 *
 * Fixed toolbar at bottom-left with edit mode toggle, settings, and share.
 *
 * @module b/profile-v2/components/layout
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import Edit02Icon from '@hugeicons-pro/core-stroke-rounded/Edit02Icon'
import Settings01Icon from '@hugeicons-pro/core-stroke-rounded/Settings01Icon'
import Share01Icon from '@hugeicons-pro/core-stroke-rounded/Share01Icon'
import Tick02Icon from '@hugeicons-pro/core-stroke-rounded/Tick02Icon'
import { Z_INDEX } from '../../config'
import type { BottomToolbarProps } from '../../types'

// =============================================================================
// COMPONENT
// =============================================================================

export function BottomToolbar({
  isEditMode,
  onToggleEditMode,
  onSettings,
  onShare,
  className,
}: BottomToolbarProps) {
  return (
    <div
      className={cn(
        'fixed bottom-6 left-6',
        'flex items-center gap-2',
        'bg-primary border border-secondary rounded-2xl p-2',
        'shadow-lg',
        className
      )}
      style={{ zIndex: Z_INDEX.bottomToolbar }}
    >
      {/* Edit mode toggle */}
      <button
        type="button"
        onClick={onToggleEditMode}
        className={cn(
          'flex items-center gap-2',
          'px-3 py-2 rounded-lg',
          'text-sm font-medium',
          'motion-safe:transition-all motion-safe:duration-150',
          'motion-reduce:transition-none',
          isEditMode
            ? 'bg-brand-primary text-white'
            : 'bg-secondary text-primary hover:bg-tertiary'
        )}
      >
        <HugeIcon
          icon={isEditMode ? Tick02Icon : Edit02Icon}
          size={16}
          strokeWidth={2}
        />
        <span>{isEditMode ? 'Done' : 'Edit'}</span>
      </button>

      {/* Settings button */}
      {onSettings && (
        <button
          type="button"
          onClick={onSettings}
          className={cn(
            'flex items-center justify-center',
            'size-10 rounded-lg',
            'bg-secondary text-secondary hover:text-primary hover:bg-tertiary',
            'motion-safe:transition-colors motion-safe:duration-150',
            'motion-reduce:transition-none'
          )}
          aria-label="Settings"
        >
          <HugeIcon icon={Settings01Icon} size={18} strokeWidth={2} />
        </button>
      )}

      {/* Share button */}
      {onShare && (
        <button
          type="button"
          onClick={onShare}
          className={cn(
            'flex items-center justify-center',
            'size-10 rounded-lg',
            'bg-secondary text-secondary hover:text-primary hover:bg-tertiary',
            'motion-safe:transition-colors motion-safe:duration-150',
            'motion-reduce:transition-none'
          )}
          aria-label="Share"
        >
          <HugeIcon icon={Share01Icon} size={18} strokeWidth={2} />
        </button>
      )}
    </div>
  )
}

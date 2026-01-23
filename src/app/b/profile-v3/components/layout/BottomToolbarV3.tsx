/**
 * BottomToolbarV3 Component
 *
 * Fixed toolbar at bottom-left with "Save my Delphi" button, settings, and share.
 *
 * @module b/profile-v3/components/layout
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import Settings01Icon from '@hugeicons-pro/core-stroke-rounded/Settings01Icon'
import Share01Icon from '@hugeicons-pro/core-stroke-rounded/Share01Icon'
import { Z_INDEX } from '../../../profile-v2/config'

// =============================================================================
// TYPES
// =============================================================================

export interface BottomToolbarV3Props {
  onSave?: () => void
  onSettings?: () => void
  onShare?: () => void
  isSaving?: boolean
  className?: string
}

// =============================================================================
// COMPONENT
// =============================================================================

export function BottomToolbarV3({
  onSave,
  onSettings,
  onShare,
  isSaving = false,
  className,
}: BottomToolbarV3Props) {
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
      {/* Save my Delphi button */}
      <button
        type="button"
        onClick={onSave}
        disabled={isSaving}
        className={cn(
          'flex items-center gap-2',
          'px-4 py-2 rounded-lg',
          'text-sm font-medium',
          'bg-brand-primary text-white',
          'hover:bg-brand-primary/90',
          'motion-safe:transition-all motion-safe:duration-150',
          'motion-reduce:transition-none',
          'disabled:opacity-50 disabled:cursor-not-allowed'
        )}
      >
        <span>{isSaving ? 'Saving...' : 'Save my Delphi'}</span>
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

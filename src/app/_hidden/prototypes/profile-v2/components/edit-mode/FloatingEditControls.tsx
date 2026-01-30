/**
 * FloatingEditControls Component
 *
 * Edit and trash buttons that appear on hover over editable items.
 *
 * @module b/profile-v2/components/edit-mode
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import Edit02Icon from '@hugeicons-pro/core-stroke-rounded/Edit02Icon'
import Delete01Icon from '@hugeicons-pro/core-stroke-rounded/Delete01Icon'
import type { FloatingEditControlsProps } from '../../types'

// =============================================================================
// COMPONENT
// =============================================================================

export function FloatingEditControls({
  onEdit,
  onDelete,
  visible,
  className,
}: FloatingEditControlsProps) {
  return (
    <div
      className={cn(
        'absolute -top-2 -right-2',
        'flex gap-1',
        // Visibility
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none',
        'motion-safe:transition-opacity motion-safe:duration-150',
        'motion-reduce:transition-none',
        className
      )}
    >
      {/* Edit button */}
      <button
        type="button"
        onClick={onEdit}
        className={cn(
          'flex items-center justify-center',
          'size-8 rounded-lg',
          'bg-primary border border-primary',
          'text-secondary hover:text-primary',
          'shadow-sm',
          'motion-safe:transition-colors motion-safe:duration-150',
          'motion-reduce:transition-none'
        )}
        aria-label="Edit"
      >
        <HugeIcon icon={Edit02Icon} size={16} strokeWidth={2} />
      </button>

      {/* Delete button */}
      <button
        type="button"
        onClick={onDelete}
        className={cn(
          'flex items-center justify-center',
          'size-8 rounded-lg',
          'bg-primary border border-primary',
          'text-secondary hover:text-error-primary',
          'shadow-sm',
          'motion-safe:transition-colors motion-safe:duration-150',
          'motion-reduce:transition-none'
        )}
        aria-label="Delete"
      >
        <HugeIcon icon={Delete01Icon} size={16} strokeWidth={2} />
      </button>
    </div>
  )
}

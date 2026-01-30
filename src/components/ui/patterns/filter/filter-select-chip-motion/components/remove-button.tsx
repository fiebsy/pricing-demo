/**
 * RemoveButton - Chip removal button
 *
 * The X button that removes a filter chip.
 *
 * @module prod/base/filter/filter-select-chip-motion/components/remove-button
 */

'use client'

import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import CancelCircleSolidIcon from '@hugeicons-pro/core-solid-rounded/CancelCircleIcon'

import type { RemoveButtonProps } from '../types'

// ============================================================================
// Component
// ============================================================================

export function RemoveButton({
  filterLabel,
  iconSize,
  height,
  onRemove,
}: RemoveButtonProps) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        onRemove()
      }}
      className={cn(
        'flex-shrink-0 flex items-center justify-center',
        'text-tertiary hover:text-primary',
        'transition-colors duration-150',
        'motion-reduce:transition-none',
        'pr-2 -ml-1',
        'outline-none focus-visible:ring-2 focus-visible:ring-brand'
      )}
      style={{ height }}
      aria-label={`Remove ${filterLabel} filter`}
    >
      <HugeIcon
        icon={CancelCircleSolidIcon}
        size={iconSize}
        strokeWidth={0}
      />
    </button>
  )
}

RemoveButton.displayName = 'RemoveButton'

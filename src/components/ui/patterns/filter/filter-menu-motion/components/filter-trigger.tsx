/**
 * FilterTrigger - Default trigger button for the filter menu
 *
 * A styled button that changes appearance when the menu is open.
 *
 * @module prod/base/filter/filter-menu-motion/components/filter-trigger
 */

'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import Add01Icon from '@hugeicons-pro/core-stroke-rounded/Add01Icon'

// ============================================================================
// PROPS
// ============================================================================

export interface FilterTriggerProps {
  /** Whether the menu is currently open */
  isOpen?: boolean
  /** Whether filters are currently active */
  isActive?: boolean
}

// ============================================================================
// COMPONENT
// ============================================================================

export function FilterTrigger({ isOpen, isActive }: FilterTriggerProps) {
  const active = isOpen || isActive

  return (
    <button
      type="button"
      className={cn(
        'inline-flex items-center gap-2 rounded-xl px-4 py-2.5',
        'text-sm font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary',
        'motion-reduce:transition-none',
        active
          ? 'bg-brand-solid text-white'
          : 'bg-secondary text-secondary ring-1 ring-inset ring-primary hover:bg-secondary_hover'
      )}
    >
      <HugeIcon icon={Add01Icon} size={16} strokeWidth={2} />
      <span>Filter</span>
    </button>
  )
}

FilterTrigger.displayName = 'FilterTrigger'

/**
 * FilterMenuHeader - Header component for the filter menu
 *
 * Displays the "Add a filter" header with icon and optional divider.
 *
 * @module prod/base/filter/filter-menu-motion/components/filter-menu-header
 */

'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import FilterIcon from '@hugeicons-pro/core-stroke-rounded/FilterIcon'

// ============================================================================
// PROPS
// ============================================================================

export interface FilterMenuHeaderProps {
  /** Header title text */
  title?: string
  /** Show divider below header */
  showDivider?: boolean
  /** Additional className */
  className?: string
}

// ============================================================================
// COMPONENT
// ============================================================================

export function FilterMenuHeader({
  title = 'Add a filter',
  showDivider = true,
  className,
}: FilterMenuHeaderProps) {
  return (
    <>
      <div
        className={cn(
          'flex items-center gap-2 px-2.5 min-h-9',
          className
        )}
      >
        <HugeIcon
          icon={FilterIcon}
          size={16}
          strokeWidth={2}
          className="text-fg-tertiary opacity-60 shrink-0"
        />
        <span className="text-fg-tertiary text-sm font-medium">
          {title}
        </span>
      </div>
      {showDivider && (
        <div
          role="separator"
          className="border-primary -mx-1 my-1 border-t opacity-50"
        />
      )}
    </>
  )
}

FilterMenuHeader.displayName = 'FilterMenuHeader'

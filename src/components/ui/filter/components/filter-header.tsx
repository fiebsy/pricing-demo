/**
 * Filter Header Component
 *
 * Reusable header for filter menu dropdowns showing filter icon and title
 * Matches the styling of the submenu back button for visual consistency
 *
 * @module base-ui/filter/components/filter-header
 */

'use client'

import { FilterIcon } from '@hugeicons-pro/core-stroke-rounded'

import { HugeIcon } from '@/components/ui/icon/huge-icons/huge-icons'

export interface FilterHeaderProps {
  title?: string
  showDivider?: boolean
}

export const FilterHeader: React.FC<FilterHeaderProps> = ({
  title = 'Add a filter',
  showDivider = true,
}) => {
  return (
    <>
      <div
        className="-mx-1 flex items-center gap-2.5 corner-squircle px-2.5 py-1.5"
        style={{ borderRadius: 'var(--menu-item-radius, 12px)' }}
      >
        <HugeIcon
          icon={FilterIcon}
          size={16}
          strokeWidth={2}
          className="text-tertiary shrink-0"
        />
        <span className="text-primary flex-1 truncate text-sm font-medium">
          {title}
        </span>
      </div>
      {showDivider && (
        <div role="separator" className="bg-border-primary -mx-2 my-1 h-px opacity-50" />
      )}
    </>
  )
}

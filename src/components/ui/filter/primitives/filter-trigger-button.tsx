/**
 * Filter Trigger Button Primitive
 *
 * Button styled to trigger filter menus. Matches ExpandingSearch container
 * styling for visual consistency across the filter UI.
 *
 * @module base-ui/filter/primitives/filter-trigger-button
 */

'use client'

import { Add01Icon } from '@hugeicons-pro/core-stroke-rounded'

import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/icon/huge-icons/huge-icons'

// ============================================================================
// Types
// ============================================================================

/** Hugeicon component type */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type HugeIconComponent = any

export interface FilterTriggerButtonProps {
  /** Whether the menu is currently open */
  isOpen?: boolean
  /** Button label text */
  label?: string
  /** Icon component (default: Add01Icon) */
  icon?: HugeIconComponent
  /** Icon size in pixels (default: 20) */
  iconSize?: number
  /** Icon stroke width (default: 1.5) */
  iconStrokeWidth?: number
  /** Additional class names */
  className?: string
}

// ============================================================================
// Component
// ============================================================================

/**
 * FilterTriggerButton - Trigger button for filter menus
 *
 * Styled to match ExpandingSearch container for visual consistency.
 * Includes pressed state styling when `isOpen` is true.
 */
export const FilterTriggerButton: React.FC<FilterTriggerButtonProps> = ({
  isOpen,
  label = 'Add a filter',
  icon,
  iconSize = 20,
  iconStrokeWidth = 1.5,
  className,
}) => {
  const IconComponent = icon ?? Add01Icon

  return (
    <button
      className={cn(
        // Base styles
        'group relative inline-flex cursor-pointer items-center justify-center whitespace-nowrap',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 outline-brand',

        // Size & shape - matches ExpandingSearch container (h-9 = 36px)
        'h-9 gap-1 rounded-full px-3 text-sm font-semibold',
        'bg-secondary border border-primary',
        'shine-1',

        // Transition
        'transition-all duration-150 ease-out',

        // Normal state
        !isOpen && [
          'text-secondary',
          'hover:bg-tertiary hover:text-primary',
        ],

        // Active/Open state - pressed appearance
        isOpen && [
          'bg-tertiary text-secondary',
          'scale-95',
        ],

        className
      )}
    >
      <HugeIcon
        icon={IconComponent}
        size={iconSize}
        strokeWidth={iconStrokeWidth}
        className={cn(
          'pointer-events-none shrink-0',
          !isOpen && 'text-fg-quaternary group-hover:text-fg-quaternary_hover',
          isOpen && 'text-fg-quaternary'
        )}
      />
      <span className="px-0.5">{label}</span>
    </button>
  )
}

FilterTriggerButton.displayName = 'FilterTriggerButton'

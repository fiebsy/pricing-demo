'use client'

import Search01Icon from '@hugeicons-pro/core-stroke-rounded/Search01Icon'
import InboxIcon from '@hugeicons-pro/core-stroke-rounded/InboxIcon'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import { Button } from '@/components/ui/core/primitives/button'

/**
 * TableEmptyState
 *
 * Minimalist empty state for StickyDataTable with two variants:
 * 1. "no-results" - When search/filter yields no results
 * 2. "empty" - When the table has no data at all
 *
 * Uses semantic tokens and Untitled UI components.
 */

export interface TableEmptyStateProps {
  /** The type of empty state to display */
  variant: 'no-results' | 'empty'
  /** Optional custom title */
  title?: string
  /** Optional custom description */
  description?: string
  /** Optional search term to display in the message */
  searchTerm?: string
  /** Optional action button */
  action?: {
    label: string
    onClick: () => void
  }
  /** Optional secondary action (e.g., "Clear filters") */
  secondaryAction?: {
    label: string
    onClick: () => void
  }
  /** Optional className for the container */
  className?: string
}

const defaultContent = {
  'no-results': {
    title: 'No results found',
    description: 'Try adjusting your search or filters to find what you\'re looking for.',
  },
  empty: {
    title: 'No results',
    description: 'There\'s nothing to display yet.',
  },
}

export function TableEmptyState({
  variant,
  title,
  description,
  searchTerm,
  action,
  secondaryAction,
  className,
}: TableEmptyStateProps) {
  const content = defaultContent[variant]
  const displayTitle = title ?? content.title
  const displayDescription = searchTerm
    ? `No results found for "${searchTerm}". Try a different search term.`
    : (description ?? content.description)

  // Select the appropriate HugeIcon based on variant
  const IconComponent = variant === 'no-results' ? Search01Icon : InboxIcon

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-16 px-6',
        className
      )}
    >
      {/* Icon */}
      <div className="mb-4">
        <div className="relative flex shrink-0 items-center justify-center size-12 rounded-xl bg-primary shadow-xs-skeumorphic ring-1 ring-inset ring-primary corner-squircle text-fg-secondary">
          <HugeIcon icon={IconComponent} size={24} className="z-1" data-icon />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center text-center max-w-xs">
        <h3 className="text-primary text-sm font-semibold mb-1">
          {displayTitle}
        </h3>
        <p className="text-tertiary text-sm leading-relaxed">
          {displayDescription}
        </p>
      </div>

      {/* Actions - Only show if provided */}
      {(action || secondaryAction) && (
        <div className="flex items-center gap-3 mt-6">
          {secondaryAction && (
            <Button
              size="md"
              variant="secondary"
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </Button>
          )}
          {action && (
            <Button
              size="md"
              variant="primary"
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

/**
 * BadgeGroup Component
 *
 * Renders a group of filter badges with optional divider.
 * Each active filter is displayed as a small badge.
 */

import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/prod/base/badge'
import type { BadgeGroupProps } from './types'

export function BadgeGroup({
  activeFilters,
  visible,
  showDivider,
  hasCountText,
  className,
}: BadgeGroupProps) {
  // Don't render if badges are hidden or there are no filters
  if (!visible || activeFilters.length === 0) return null

  return (
    <>
      {/* Divider: only show if both divider and count text are enabled */}
      {showDivider && hasCountText && (
        <span
          className="bg-quaternary h-3 w-px shrink-0"
          aria-hidden="true"
        />
      )}

      {/* Badge container */}
      <div className={cn('flex items-center gap-1', className)}>
        {activeFilters.map((filter) => (
          <Badge
            key={filter.id}
            size="xs"
            color="gray"
          >
            {filter.label}
          </Badge>
        ))}
      </div>
    </>
  )
}

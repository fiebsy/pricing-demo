/**
 * CountDisplay Component
 *
 * Renders count with a badge indicator:
 * - [All] X orders - when no filter
 * - [Filtered] X / Y orders - when filtered
 */

import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/core/primitives/badge'
import type { CountDisplayProps } from './types'

export function CountDisplay({
  visibleCount,
  totalCount,
  isFiltered,
  visible,
  className,
}: CountDisplayProps) {
  if (!visible) return null

  const secondaryStyle = 'text-secondary/50 font-normal'
  const primaryStyle = 'text-primary font-semibold'

  if (!isFiltered) {
    return (
      <span className={cn('flex items-center gap-1.5 whitespace-nowrap', className)}>
        <span className={primaryStyle}>{totalCount.toLocaleString()}</span>
        <span className={secondaryStyle}>orders</span>
        <Badge size="xs" color="gray" shape="rounded" className="opacity-50">All</Badge>
      </span>
    )
  }

  return (
    <span className={cn('flex items-center gap-1.5 whitespace-nowrap', className)}>
      <span className={primaryStyle}>{visibleCount.toLocaleString()}</span>
      <span className={secondaryStyle}>/ {totalCount.toLocaleString()} orders</span>
      <Badge size="xs" color="brand" shape="rounded" className="opacity-50">Filtered</Badge>
    </span>
  )
}

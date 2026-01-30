import { cn } from '@/lib/utils'

/**
 * Skeleton Component
 *
 * A simple skeleton loading placeholder for the sticky-data-table.
 * Uses semantic tokens and squircle corners for PAYVA design consistency.
 */
function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('bg-tertiary animate-pulse rounded-lg corner-squircle', className)} {...props} />
}

export { Skeleton }

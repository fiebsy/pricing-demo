'use client'

import { cn } from '@/lib/utils'

interface MetricCardProps {
  title?: string
  className?: string
}

export function MetricCard({ title, className }: MetricCardProps) {
  return (
    <div
      className={cn(
        'flex h-24 flex-col justify-between rounded-xl bg-secondary p-4',
        className
      )}
    >
      {title && (
        <span className="text-xs font-medium text-tertiary">{title}</span>
      )}
      <div className="h-4 w-2/3 rounded bg-tertiary/30" />
    </div>
  )
}

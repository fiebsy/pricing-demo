'use client'

/**
 * Simple Skeleton Component
 *
 * A basic animated skeleton loading placeholder.
 */

import { cx } from '@/components/utils/cx'

interface SkeletonProps {
  className?: string
  width?: string | number
  height?: string | number
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  style?: React.CSSProperties
}

export function Skeleton({
  className,
  width,
  height,
  rounded = 'md',
  style,
}: SkeletonProps) {
  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  }

  return (
    <div
      className={cx(
        'animate-pulse bg-tertiary/20',
        roundedClasses[rounded],
        className
      )}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        ...style,
      }}
    />
  )
}

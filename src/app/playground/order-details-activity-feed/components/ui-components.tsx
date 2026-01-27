'use client'

import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

// ============================================================================
// BADGE COMPONENT (Simplified for demo)
// ============================================================================

type BadgeColor = 'gray' | 'success' | 'warning' | 'error' | 'brand'
type BadgeSize = 'sm' | 'md' | 'lg'
type BadgeType = 'color' | 'outline'

interface BadgeProps {
  children: ReactNode
  type?: BadgeType
  color?: BadgeColor
  size?: BadgeSize
  className?: string
}

const BADGE_COLORS: Record<BadgeColor, string> = {
  gray: 'bg-[var(--color-bg-quaternary)] text-[var(--color-fg-secondary)] border-[var(--color-border-secondary)]',
  success: 'bg-[var(--color-utility-success-50)] text-[var(--color-utility-success-700)] border-[var(--color-utility-success-200)]',
  warning: 'bg-[var(--color-utility-warning-50)] text-[var(--color-utility-warning-700)] border-[var(--color-utility-warning-200)]',
  error: 'bg-[var(--color-utility-error-50)] text-[var(--color-utility-error-700)] border-[var(--color-utility-error-200)]',
  brand: 'bg-[var(--color-utility-brand-50)] text-[var(--color-utility-brand-700)] border-[var(--color-utility-brand-200)]',
}

const BADGE_SIZES: Record<BadgeSize, string> = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-0.5',
  lg: 'text-sm px-3 py-1',
}

export const Badge = ({
  children,
  type = 'color',
  color = 'gray',
  size = 'sm',
  className,
}: BadgeProps) => {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-medium',
        BADGE_COLORS[color],
        BADGE_SIZES[size],
        className
      )}
    >
      {children}
    </span>
  )
}

// ============================================================================
// AVATAR COMPONENT (Simplified for demo)
// ============================================================================

type AvatarColor = 'blue' | 'green' | 'orange' | 'red' | 'yellow' | 'brand'
type AvatarSize = 'xs' | 'sm' | 'md' | 'lg'
type AvatarShape = 'circle' | 'square'

interface AvatarProps {
  initials: string
  color?: AvatarColor
  size?: AvatarSize
  shape?: AvatarShape
  className?: string
}

const AVATAR_COLORS: Record<AvatarColor, string> = {
  blue: 'bg-[var(--color-utility-blue-100)] text-[var(--color-utility-blue-700)]',
  green: 'bg-[var(--color-utility-success-100)] text-[var(--color-utility-success-700)]',
  orange: 'bg-[var(--color-utility-warning-100)] text-[var(--color-utility-warning-700)]',
  red: 'bg-[var(--color-utility-error-100)] text-[var(--color-utility-error-700)]',
  yellow: 'bg-[var(--color-utility-warning-50)] text-[var(--color-utility-warning-700)]',
  brand: 'bg-[var(--color-utility-brand-100)] text-[var(--color-utility-brand-700)]',
}

const AVATAR_SIZES: Record<AvatarSize, string> = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
}

export const Avatar = ({
  initials,
  color = 'blue',
  size = 'sm',
  shape = 'circle',
  className,
}: AvatarProps) => {
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center font-semibold',
        AVATAR_COLORS[color],
        AVATAR_SIZES[size],
        shape === 'circle' ? 'rounded-full' : 'rounded-md',
        className
      )}
    >
      {initials}
    </div>
  )
}

// ============================================================================
// PAY PROGRESS CIRCLE COMPONENT
// ============================================================================

interface PayProgressCircleProps {
  amountPaid: number
  totalAmount: number
  size?: number
  strokeWidth?: number
  showPercentageText?: boolean
  className?: string
}

export const PayProgressCircle = ({
  amountPaid,
  totalAmount,
  size = 40,
  strokeWidth = 3,
  showPercentageText = true,
  className,
}: PayProgressCircleProps) => {
  const percentage = totalAmount > 0 ? Math.min(100, (amountPaid / totalAmount) * 100) : 0
  const radius = (size - strokeWidth) / 2
  const center = size / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  // Color based on progress
  const getProgressColor = () => {
    if (percentage >= 75) return 'var(--color-utility-success-500)'
    if (percentage >= 50) return 'var(--color-utility-blue-500)'
    if (percentage >= 25) return 'var(--color-utility-warning-500)'
    return 'var(--color-fg-tertiary)'
  }

  return (
    <div className={cn('relative', className)} style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        style={{ transform: 'rotate(-90deg)' }}
        className="absolute inset-0"
      >
        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          style={{ stroke: 'var(--color-border-secondary)' }}
        />
        {/* Progress circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{
            stroke: getProgressColor(),
            transition: 'stroke-dashoffset 0.3s ease',
          }}
        />
      </svg>

      {showPercentageText && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-medium text-primary">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  )
}

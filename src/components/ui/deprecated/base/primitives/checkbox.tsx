/**
 * Checkbox Component
 *
 * Simple checkbox primitive with size variants.
 */

'use client'

import * as React from 'react'
import { cx } from '@/components/utils/cx'

interface CheckboxProps {
  isSelected: boolean
  onChange: (checked: boolean) => void
  isDisabled?: boolean
  isIndeterminate?: boolean
  size?: 'sm' | 'md'
  className?: string
  onClick?: (e: React.MouseEvent) => void
  'aria-label'?: string
}

export function Checkbox({
  isSelected,
  onChange,
  isDisabled = false,
  isIndeterminate = false,
  size = 'md',
  className,
  onClick,
  'aria-label': ariaLabel,
}: CheckboxProps) {
  const sizeClasses = {
    sm: 'size-4',
    md: 'size-5',
  }

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick(e)
    }
    if (!isDisabled) {
      onChange(!isSelected)
    }
  }

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={isIndeterminate ? 'mixed' : isSelected}
      aria-label={ariaLabel}
      onClick={handleClick}
      disabled={isDisabled}
      className={cx(
        'shrink-0 rounded border transition-colors',
        sizeClasses[size],
        isSelected || isIndeterminate
          ? 'bg-brand-solid border-brand text-primary_on-brand'
          : 'bg-secondary border-primary hover:border-secondary_hover',
        isDisabled && 'cursor-not-allowed opacity-50',
        className
      )}
    >
      {isIndeterminate ? (
        <svg className="size-full p-0.5" viewBox="0 0 16 16" fill="none">
          <path
            d="M4 8H12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ) : isSelected ? (
        <svg className="size-full p-0.5" viewBox="0 0 16 16" fill="none">
          <path
            d="M13 4L6 12L3 9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
    </button>
  )
}

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
  size?: 'sm' | 'md'
  className?: string
}

export function Checkbox({
  isSelected,
  onChange,
  isDisabled = false,
  size = 'md',
  className,
}: CheckboxProps) {
  const sizeClasses = {
    sm: 'size-4',
    md: 'size-5',
  }

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={isSelected}
      onClick={() => !isDisabled && onChange(!isSelected)}
      disabled={isDisabled}
      className={cx(
        'shrink-0 rounded border transition-colors',
        sizeClasses[size],
        isSelected
          ? 'bg-brand-solid border-brand text-primary_on-brand'
          : 'bg-secondary border-primary hover:border-secondary_hover',
        isDisabled && 'cursor-not-allowed opacity-50',
        className
      )}
    >
      {isSelected && (
        <svg className="size-full p-0.5" viewBox="0 0 16 16" fill="none">
          <path
            d="M13 4L6 12L3 9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  )
}

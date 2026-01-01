/**
 * Clear Button
 *
 * A small circular button to clear the search input.
 *
 * @module expanding-search/components/clear-button
 */

'use client'

import React from 'react'
import { Cancel01Icon } from '@hugeicons-pro/core-stroke-rounded'
import { HugeIcon } from '@/components/ui/icon/huge-icons/huge-icons'
import { cn } from '@/lib/utils'

import type { ClearButtonProps } from '../types'

export const ClearButton: React.FC<ClearButtonProps> = ({ visible, onClick }) => {
  if (!visible) return null

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex-shrink-0 flex items-center justify-center',
        'w-5 h-5 rounded-full',
        'text-tertiary hover:text-primary',
        'hover:bg-tertiary',
        'transition-colors duration-150',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-solid'
      )}
      aria-label="Clear search"
    >
      <HugeIcon icon={Cancel01Icon} size={14} strokeWidth={2} />
    </button>
  )
}

ClearButton.displayName = 'ClearButton'

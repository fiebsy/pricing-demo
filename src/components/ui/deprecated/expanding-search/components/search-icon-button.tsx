/**
 * Search Icon Button
 *
 * The trigger button that displays the search icon.
 * Stays fixed at the left position while the input slides in.
 *
 * @module expanding-search/components/search-icon-button
 */

'use client'

import React from 'react'
import { Search01Icon } from '@hugeicons-pro/core-stroke-rounded'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import { cn } from '@/lib/utils'

import type { SearchIconButtonProps } from '../types'

export const SearchIconButton: React.FC<SearchIconButtonProps> = ({
  isExpanded,
  collapsedWidth,
  iconSize,
  iconStrokeWidth,
  iconOpacity,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={isExpanded ? undefined : onClick}
      className={cn(
        'absolute left-0 top-0 bottom-0',
        'flex items-center justify-center',
        isExpanded
          ? 'text-primary'
          : 'text-tertiary group-hover/search:text-primary group-active/search:text-primary',
        'transition-[color,transform] duration-150',
        'focus:outline-none',
        !isExpanded && 'active:scale-95'
      )}
      style={{
        width: collapsedWidth,
        opacity: iconOpacity / 100,
      }}
      aria-label={isExpanded ? 'Search' : 'Open search'}
      tabIndex={isExpanded ? -1 : 0}
    >
      <HugeIcon icon={Search01Icon} size={iconSize} strokeWidth={iconStrokeWidth} />
    </button>
  )
}

SearchIconButton.displayName = 'SearchIconButton'

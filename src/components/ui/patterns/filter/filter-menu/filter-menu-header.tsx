/**
 * Filter Menu - Header Component
 *
 * Header with filter icon and title, matching the V1 FilterHeader styling.
 * Includes optional divider below for visual separation from menu items.
 *
 * Uses centralized config for consistent styling with other menu components.
 *
 * @module prod/base/filter/filter-menu/filter-menu-header
 */

'use client'

import React from 'react'
import FilterIcon from '@hugeicons-pro/core-stroke-rounded/FilterIcon'

import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import { MENU_ITEM_STYLES, getSeparatorClasses } from '@/components/ui/core/primitives/menu'

export interface FilterMenuHeaderProps {
  /** Header title text */
  title?: string
  /** Show divider below header */
  showDivider?: boolean
  /** Item border radius in pixels */
  itemRadius?: number
}

export const FilterMenuHeader: React.FC<FilterMenuHeaderProps> = ({
  title = 'Add a filter',
  showDivider = true,
  itemRadius = 12,
}) => {
  return (
    <>
      <div
        className={cn(
          'flex items-center corner-squircle',
          MENU_ITEM_STYLES.paddingX,
          MENU_ITEM_STYLES.minHeight,
          MENU_ITEM_STYLES.iconGap
        )}
        style={{ borderRadius: itemRadius }}
      >
        <HugeIcon
          icon={FilterIcon}
          size={MENU_ITEM_STYLES.iconSize}
          strokeWidth={MENU_ITEM_STYLES.iconStrokeWidth}
          className={cn(MENU_ITEM_STYLES.iconColor, MENU_ITEM_STYLES.iconOpacity, 'shrink-0')}
        />
        <span
          className={cn(
            'text-fg-tertiary flex-1 truncate',
            MENU_ITEM_STYLES.textSize,
            MENU_ITEM_STYLES.textWeight
          )}
        >
          {title}
        </span>
      </div>
      {showDivider && (
        <div role="separator" className={getSeparatorClasses('header')} />
      )}
    </>
  )
}

FilterMenuHeader.displayName = 'FilterMenuHeader'

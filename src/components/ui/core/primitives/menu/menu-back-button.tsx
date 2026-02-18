/**
 * Menu - Back Button Component
 *
 * Navigation button for returning from submenu to root menu.
 * Includes separator below to match header styling.
 *
 * Uses centralized config for consistent styling with other menu components.
 *
 * @module prod/base/menu/menu-back-button
 */

'use client'

import React from 'react'
import ArrowLeft01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowLeft01Icon'

import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import {
  MENU_ITEM_STYLES,
  getSeparatorClasses,
} from './config'

export interface MenuBackButtonProps {
  title: string
  onBack: () => void
  /** Show divider below (default: true) */
  showDivider?: boolean
}

export const MenuBackButton: React.FC<MenuBackButtonProps> = ({
  title,
  onBack,
  showDivider = true,
}) => {
  return (
    <>
      <button
        onClick={() => onBack()}
        className={cn(
          'flex w-full items-center',
          MENU_ITEM_STYLES.paddingX,
          MENU_ITEM_STYLES.minHeight,
          MENU_ITEM_STYLES.iconGap,
          MENU_ITEM_STYLES.textSize,
          MENU_ITEM_STYLES.textWeight,
          'text-secondary hover:text-primary',
          'transition-colors duration-150',
          'motion-reduce:transition-none',
          'outline-none'
        )}
        style={{ borderRadius: 'var(--menu-item-radius, 12px)' }}
      >
        <HugeIcon
          icon={ArrowLeft01Icon}
          size={MENU_ITEM_STYLES.iconSize}
          strokeWidth={MENU_ITEM_STYLES.iconStrokeWidth}
          className={cn(MENU_ITEM_STYLES.iconColor, MENU_ITEM_STYLES.iconOpacity, 'shrink-0')}
        />
        <span className="truncate">{title}</span>
      </button>
      {showDivider && (
        <div role="separator" className={getSeparatorClasses('header')} />
      )}
    </>
  )
}

MenuBackButton.displayName = 'MenuBackButton'

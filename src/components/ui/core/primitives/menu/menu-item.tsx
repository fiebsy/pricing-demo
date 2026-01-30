/**
 * Menu - Menu Item Component
 *
 * Renders individual menu items using Base UI Menu.Item primitive.
 * Uses centralized config for consistent styling.
 * Handles selected state (checkmarks) and activeCount badges.
 *
 * @module prod/base/menu/menu-item
 */

'use client'

import React from 'react'
import { Menu } from '@base-ui/react/menu'
import ArrowRight01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowRight01Icon'
import Tick02Icon from '@hugeicons-pro/core-stroke-rounded/Tick02Icon'

import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import type { MenuItem, MenuItemCheckbox as MenuItemCheckboxType } from './types'
import { CheckboxBase } from '@/components/ui/core/inputs/checkbox'
import {
  MENU_ITEM_STYLES,
  INTERACTIVE_STATES,
  getSeparatorClasses,
} from './config'

// ============================================================================
// Types
// ============================================================================

interface MenuItemComponentProps {
  item: MenuItem
  onSubmenuClick: (menuId: string) => void
  onSelect: () => void
}

// ============================================================================
// Styles
// ============================================================================

const baseItemStyles = cn(
  'flex cursor-pointer items-center justify-between',
  INTERACTIVE_STATES.hover,
  INTERACTIVE_STATES.focusVisible,
  INTERACTIVE_STATES.active,
  'corner-squircle transition-colors duration-150',
  'motion-reduce:transition-none',
  'relative outline-none select-none',
  MENU_ITEM_STYLES.paddingX,
  MENU_ITEM_STYLES.minHeight,
  MENU_ITEM_STYLES.textSize
)

const itemRadiusStyle: React.CSSProperties = {
  borderRadius: 'var(--menu-item-radius, 12px)',
}

// ============================================================================
// Active Count Badge
// ============================================================================

const ActiveCountBadge: React.FC<{ count: number }> = ({ count }) => (
  <div
    className={cn(
      'inline-flex items-center justify-center',
      'rounded-full',
      'bg-utility-brand-50 border border-utility-brand-200',
      'text-[10px] font-semibold leading-none text-utility-brand-700',
      'px-[5px] py-[2px]'
    )}
  >
    {count}
  </div>
)

// ============================================================================
// Component
// ============================================================================

export const MenuItemComponent: React.FC<MenuItemComponentProps> = ({
  item,
  onSubmenuClick,
  onSelect,
}) => {
  // Separator - spans full width, 50% opacity
  // Note: Uses 'list' context (no my-1) because parent container has gap-1 which provides spacing
  if (item.type === 'separator') {
    return (
      <div
        role="separator"
        className={getSeparatorClasses('list')}
      />
    )
  }

  // Label (using div instead of Menu.GroupLabel to avoid Menu.Group requirement)
  if (item.type === 'label') {
    return (
      <div
        role="presentation"
        className="text-tertiary px-2 py-1.5 text-xs font-semibold uppercase tracking-wide"
      >
        {item.label}
      </div>
    )
  }

  // Checkbox item
  if (item.type === 'checkbox') {
    const checkboxItem = item as MenuItemCheckboxType
    return (
      <Menu.CheckboxItem
        checked={checkboxItem.checked}
        onCheckedChange={checkboxItem.onCheckedChange}
        disabled={checkboxItem.disabled}
        closeOnClick={checkboxItem.closeOnClick ?? false}
        className={cn(
          baseItemStyles,
          'text-primary',
          'data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
        )}
        style={itemRadiusStyle}
      >
        <div className={cn('flex min-w-0 flex-1 items-center', MENU_ITEM_STYLES.iconGap)}>
          <CheckboxBase checked={checkboxItem.checked} size="sm" />
          <span className="truncate">{checkboxItem.label}</span>
        </div>
      </Menu.CheckboxItem>
    )
  }

  // Submenu trigger
  if (item.type === 'submenu') {
    return (
      <div
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          onSubmenuClick(item.id)
        }}
        className={cn(
          baseItemStyles,
          'text-primary font-medium',
          item.description && 'flex-col items-start py-2'
        )}
        style={itemRadiusStyle}
        role="menuitem"
        aria-haspopup="menu"
        aria-expanded={false}
        tabIndex={-1}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') {
            e.preventDefault()
            onSubmenuClick(item.id)
          }
        }}
      >
        <div className={cn('flex min-w-0 flex-1 items-center w-full', MENU_ITEM_STYLES.iconGap)}>
          {item.icon != null && (
            <HugeIcon
              icon={item.icon}
              size={MENU_ITEM_STYLES.iconSize}
              strokeWidth={MENU_ITEM_STYLES.iconStrokeWidth}
              className={cn(MENU_ITEM_STYLES.iconColor, MENU_ITEM_STYLES.iconOpacity, 'shrink-0')}
            />
          )}
          <div className="flex-1 min-w-0">
            <div className="truncate">{item.label}</div>
            {item.description && (
              <div className="text-xs font-normal text-tertiary mt-0.5 truncate">
                {item.description}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {item.activeCount !== undefined && item.activeCount > 0 && (
              <ActiveCountBadge count={item.activeCount} />
            )}
            <HugeIcon
              icon={ArrowRight01Icon}
              size={MENU_ITEM_STYLES.iconSize}
              strokeWidth={MENU_ITEM_STYLES.iconStrokeWidth}
              className={cn(MENU_ITEM_STYLES.iconColor, MENU_ITEM_STYLES.iconOpacity, 'shrink-0')}
            />
          </div>
        </div>
      </div>
    )
  }

  // Action item
  return (
    <Menu.Item
      disabled={item.disabled}
      closeOnClick
      onClick={() => {
        item.onClick?.()
        onSelect()
      }}
      className={cn(
        baseItemStyles,
        'text-primary',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
      )}
      style={itemRadiusStyle}
    >
      <div className={cn('flex min-w-0 flex-1 items-center', MENU_ITEM_STYLES.iconGap)}>
        {item.icon && (
          <HugeIcon
            icon={item.icon}
            size={MENU_ITEM_STYLES.iconSize}
            strokeWidth={MENU_ITEM_STYLES.iconStrokeWidth}
            className={cn(MENU_ITEM_STYLES.iconColor, MENU_ITEM_STYLES.iconOpacity, 'shrink-0')}
          />
        )}
        <span className="truncate">{item.label}</span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {item.shortcut && (
          <span className="text-xs text-tertiary opacity-60 ml-3">
            {item.shortcut}
          </span>
        )}
        {item.selected && (
          <HugeIcon
            icon={Tick02Icon}
            size={MENU_ITEM_STYLES.iconSize}
            strokeWidth={2.5}
            className="text-brand-solid shrink-0"
          />
        )}
      </div>
    </Menu.Item>
  )
}

MenuItemComponent.displayName = 'MenuItem'

// Re-export as MenuItem for cleaner imports
export { MenuItemComponent as MenuItem }

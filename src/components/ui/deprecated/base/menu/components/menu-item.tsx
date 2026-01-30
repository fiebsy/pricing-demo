/**
 * Base UI Menu - Menu Item Component
 *
 * Renders individual menu items using Base UI Menu.Item primitive.
 *
 * @module base-ui/menu/components/menu-item
 */

'use client'

import React from 'react'
import { Menu } from '@base-ui/react/menu'
import { ArrowRight01Icon } from '@hugeicons-pro/core-stroke-rounded'

import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import type { MenuItem as MenuItemType, MenuVariant } from '../types'
import { ITEM_HEIGHT_CLASSES, ICON_SIZES } from '../config'

// ============================================================================
// Types
// ============================================================================

interface MenuItemProps {
  /** The menu item to render */
  item: MenuItemType
  /** Visual variant */
  variant: MenuVariant
  /** Callback when a submenu item is clicked */
  onSubmenuClick: (menuId: string) => void
  /** Callback when an action item is selected */
  onSelect: () => void
}

// ============================================================================
// Shared Styles
// ============================================================================

const baseItemStyles = cn(
  'flex cursor-pointer items-center justify-between',
  // Only show highlight on actual hover, not Base UI's auto-highlight on open
  'hover:bg-quaternary focus-visible:bg-quaternary active:bg-tertiary',
  // Border radius uses CSS var from container: --menu-item-radius
  'corner-squircle transition-colors duration-150',
  'relative px-2.5 outline-none select-none'
)

// Inline style for dynamic border radius from CSS variable
const itemRadiusStyle: React.CSSProperties = {
  borderRadius: 'var(--menu-item-radius, 12px)', // fallback to 12px (rounded-xl)
}

// ============================================================================
// Helper
// ============================================================================

/**
 * Parse shortcut string into CommandShortcut keys format
 */
function parseShortcut(shortcut: string): string[] {
  return shortcut
    .replace(/⌘/g, 'meta')
    .replace(/⇧/g, 'shift')
    .replace(/⌥/g, 'alt')
    .replace(/⌃/g, 'ctrl')
    .split('')
    .filter((char) => char !== '+' && char !== ' ')
}

// ============================================================================
// Component
// ============================================================================

/**
 * Renders a single menu item (action, submenu, separator, or label)
 * Built on Base UI Menu.Item primitive
 */
export const MenuItemComponent: React.FC<MenuItemProps> = ({
  item,
  variant,
  onSubmenuClick,
  onSelect,
}) => {
  const itemSizeClass = ITEM_HEIGHT_CLASSES[variant]
  const iconSize = ICON_SIZES[variant]

  // Separator - using Base UI's Group as a separator container
  if (item.type === 'separator') {
    return (
      <div
        key={item.id}
        role="separator"
        className="bg-primary -mx-1 my-1 h-px opacity-50"
      />
    )
  }

  // Label (section header)
  if (item.type === 'label') {
    return (
      <Menu.GroupLabel
        key={item.id}
        className="text-tertiary px-2 py-1.5 text-xs font-semibold uppercase tracking-wide"
      >
        {item.label}
      </Menu.GroupLabel>
    )
  }

  // Submenu trigger - using custom div since we handle navigation differently
  if (item.type === 'submenu') {
    return (
      <React.Fragment key={item.id}>
        {item.divider === 'before' && (
          <div role="separator" className="bg-primary -mx-1 my-1 h-px opacity-50" />
        )}
        <div
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onSubmenuClick(item.id)
          }}
          className={cn(
            baseItemStyles,
            'text-primary font-medium',
            itemSizeClass,
            item.className,
            item.description && 'flex-col items-start py-2'
          )}
          style={itemRadiusStyle}
          role="menuitem"
          tabIndex={-1}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') {
              e.preventDefault()
              onSubmenuClick(item.id)
            }
          }}
        >
          <div className="flex min-w-0 flex-1 items-center gap-2.5 w-full">
            {item.icon && (
              <HugeIcon
                icon={item.icon}
                size={iconSize}
                strokeWidth={2}
                className="text-tertiary opacity-50 shrink-0"
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
              <HugeIcon
                icon={ArrowRight01Icon}
                size={16}
                strokeWidth={2}
                className="text-tertiary opacity-50 shrink-0"
              />
            </div>
          </div>
        </div>
        {item.divider === 'after' && (
          <div role="separator" className="bg-primary -mx-1 my-1 h-px opacity-50" />
        )}
      </React.Fragment>
    )
  }

  // Action item - using Base UI Menu.Item
  return (
    <React.Fragment key={item.id}>
      {item.divider === 'before' && (
        <div role="separator" className="bg-primary -mx-1 my-1 h-px opacity-50" />
      )}
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
          'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
          // Note: Removed data-[highlighted]:bg-quaternary to prevent auto-selection appearance
          // Highlight is now handled by hover: and focus-visible: in baseItemStyles
          itemSizeClass,
          item.className
        )}
        style={itemRadiusStyle}
      >
        <div className="flex min-w-0 flex-1 items-center gap-2.5">
          {item.icon && (
            <HugeIcon
              icon={item.icon}
              size={iconSize}
              strokeWidth={2}
              className="text-tertiary opacity-50 shrink-0"
            />
          )}
          <span className="truncate">{item.label}</span>
        </div>
        {item.shortcut && (
          <span className="text-tertiary ml-3 text-xs">{item.shortcut}</span>
        )}
        {item.addon && (
          <div className="ml-auto shrink-0">{item.addon}</div>
        )}
      </Menu.Item>
      {item.divider === 'after' && (
        <div role="separator" className="bg-primary -mx-1 my-1 h-px opacity-50" />
      )}
    </React.Fragment>
  )
}

MenuItemComponent.displayName = 'MenuItemComponent'

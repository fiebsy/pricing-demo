/**
 * Command Item - Individual Command Menu Item
 *
 * Renders a single command with icon, label, description, and keyboard shortcut.
 * Supports `navigates` prop to show a right arrow for drill-down navigation.
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import ArrowRight01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowRight01Icon'
import {
  MENU_ITEM_STYLES,
  INTERACTIVE_STATES,
} from '@/components/ui/prod/base/menu/config'
import type { CommandItemAction } from '../core/types'

// ============================================================================
// TYPES
// ============================================================================

export interface CommandItemProps {
  item: CommandItemAction
  isHighlighted?: boolean
  onSelect?: () => void
  itemHeight?: number
  // Configurable styling
  /** Horizontal padding (px) */
  itemPaddingX?: number
  /** Vertical padding (px) */
  itemPaddingY?: number
  /** Border radius (px) */
  itemBorderRadius?: number
  /** Background for highlighted item */
  itemHighlightBackground?: string
  /** Background for hovered item */
  itemHoverBackground?: string
  /** Icon size (px) */
  itemIconSize?: number
  /** Gap between icon and text (px) */
  itemIconGap?: number
  /** Icon opacity (0-100) */
  itemIconOpacity?: number
}

// ============================================================================
// COMPONENT
// ============================================================================

export const CommandItem: React.FC<CommandItemProps> = ({
  item,
  isHighlighted = false,
  onSelect,
  itemHeight = 36,
  // Configurable styling with fallbacks
  itemPaddingX,
  itemPaddingY,
  itemBorderRadius,
  itemHighlightBackground,
  itemHoverBackground,
  itemIconSize,
  itemIconGap,
  itemIconOpacity,
}) => {
  const handleClick = () => {
    if (!item.disabled) {
      onSelect?.()
      item.onSelect?.()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !item.disabled) {
      handleClick()
    }
  }

  // Compute background classes
  const highlightBg = itemHighlightBackground
    ? `bg-${itemHighlightBackground}`
    : 'bg-quaternary'
  const hoverBg = itemHoverBackground
    ? `hover:bg-${itemHoverBackground} data-[highlighted]:bg-${itemHoverBackground}`
    : INTERACTIVE_STATES.hover

  // Use configurable values or defaults
  const paddingX = itemPaddingX ?? 10
  const paddingY = itemPaddingY ?? 0
  const borderRadius = itemBorderRadius ?? 12
  const iconSize = itemIconSize ?? MENU_ITEM_STYLES.iconSize
  const iconGap = itemIconGap ?? 8
  const iconOpacity = itemIconOpacity ?? 60

  return (
    <button
      type="button"
      role="option"
      aria-selected={isHighlighted}
      aria-disabled={item.disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        'w-full flex items-center',
        'corner-squircle transition-colors duration-150',
        'outline-none text-left',
        // Highlight state
        isHighlighted && highlightBg,
        // Interactive states
        !isHighlighted && hoverBg,
        // Disabled state
        item.disabled && 'opacity-50 pointer-events-none'
      )}
      style={{
        height: itemHeight,
        paddingLeft: paddingX,
        paddingRight: paddingX,
        paddingTop: paddingY,
        paddingBottom: paddingY,
        borderRadius,
        gap: iconGap,
      }}
    >
      {/* Icon */}
      {item.icon && (
        <HugeIcon
          icon={item.icon}
          size={iconSize}
          strokeWidth={MENU_ITEM_STYLES.iconStrokeWidth}
          className={cn(
            MENU_ITEM_STYLES.iconColor,
            'shrink-0'
          )}
          style={{ opacity: iconOpacity / 100 }}
        />
      )}

      {/* Label and Description */}
      <div className="flex-1 min-w-0">
        <div
          className={cn(
            MENU_ITEM_STYLES.textSize,
            MENU_ITEM_STYLES.textWeight,
            'text-primary truncate'
          )}
        >
          {item.label}
        </div>
        {item.description && (
          <div className="text-xs text-tertiary truncate">{item.description}</div>
        )}
      </div>

      {/* Keyboard Shortcut */}
      {item.shortcut && item.shortcut.length > 0 && (
        <div className="flex items-center gap-0.5 shrink-0 ml-2">
          {item.shortcut.map((key, idx) => (
            <kbd
              key={idx}
              className={cn(
                'px-1 py-0.5 min-w-[18px] text-center',
                'rounded text-[10px] font-medium',
                'bg-tertiary text-tertiary border border-secondary'
              )}
            >
              {key}
            </kbd>
          ))}
        </div>
      )}
    </button>
  )
}

CommandItem.displayName = 'CommandItem'

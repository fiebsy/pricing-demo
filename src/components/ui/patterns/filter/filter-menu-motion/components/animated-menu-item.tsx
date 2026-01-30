/**
 * AnimatedMenuItem - Motion-animated menu item
 *
 * Wraps Base UI Menu.Item with Motion Dev animations.
 * Supports state-based animation (mounted components pattern).
 *
 * @module prod/base/filter/filter-menu-motion/components/animated-menu-item
 */

'use client'

import * as React from 'react'
import { Menu as BaseMenu } from '@base-ui/react/menu'
import { motion } from 'motion/react'

import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import ArrowRight01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowRight01Icon'
import CheckmarkCircle02Icon from '@hugeicons-pro/core-stroke-rounded/CheckmarkCircle02Icon'

import type { MenuItem, MotionAnimationConfig } from '../types'
import { getTimedTransition } from '../animation-config'

// ============================================================================
// STYLES
// ============================================================================

const ITEM_CLASSES = cn(
  'flex items-center gap-2 px-2.5 min-h-9 rounded-xl cursor-pointer',
  'text-sm font-medium text-secondary',
  'transition-colors hover:bg-quaternary',
  'focus-visible:outline-none focus-visible:bg-quaternary',
  'motion-reduce:transition-none'
)

const ICON_CLASSES = 'text-fg-tertiary opacity-60 shrink-0'

// ============================================================================
// PROPS
// ============================================================================

export interface AnimatedMenuItemProps {
  /** The menu item data */
  item: MenuItem
  /** Item index for stagger calculation */
  index: number
  /** Animation configuration */
  animationConfig: MotionAnimationConfig
  /** Whether reduced motion is preferred */
  shouldReduceMotion: boolean | null
  /** Whether this item should be visible/animated in */
  isVisible: boolean
  /** Whether this item is in a submenu (affects slide direction) */
  isInSubmenu?: boolean
  /** Callback when a submenu item is clicked */
  onSubmenuClick: (menuId: string) => void
  /** Callback when an action item is selected */
  onSelect: () => void
}

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * AnimatedMenuItem - Single menu item with motion animation.
 *
 * Uses state-based animation pattern for mounted components:
 * - `initial={false}` prevents animation on first render
 * - Animation driven by `isVisible` prop
 * - Supports staggered delays based on index
 */
export function AnimatedMenuItem({
  item,
  index,
  animationConfig,
  shouldReduceMotion,
  isVisible,
  isInSubmenu = false,
  onSubmenuClick,
  onSelect,
}: AnimatedMenuItemProps) {
  // Separator - no animation needed
  if (item.type === 'separator') {
    return (
      <div
        role="separator"
        className="border-primary -mx-1 border-t opacity-50"
      />
    )
  }

  // Calculate stagger delay
  const itemDelay = animationConfig.enableItemStagger
    ? index * animationConfig.itemStagger
    : 0

  // State-based animation props
  const animateProps = shouldReduceMotion
    ? { opacity: isVisible ? 1 : 0 }
    : {
        opacity: isVisible ? 1 : 0,
        x: isVisible ? 0 : isInSubmenu ? -15 : 15,
      }

  const transition = getTimedTransition(
    animationConfig.opacityDuration,
    isVisible ? itemDelay : 0
  )

  // Submenu trigger item
  if (item.type === 'submenu') {
    return (
      <motion.div
        initial={false}
        animate={animateProps}
        transition={transition}
      >
        <BaseMenu.Item
          className={ITEM_CLASSES}
          closeOnClick={false}
          onClick={() => onSubmenuClick(item.id)}
        >
          {item.icon && (
            <HugeIcon
              icon={item.icon}
              size={16}
              strokeWidth={2}
              className={ICON_CLASSES}
            />
          )}
          <span className="flex-1 truncate">{item.label}</span>
          {typeof item.activeCount === 'number' && item.activeCount > 0 && (
            <span className="bg-brand-solid text-white text-xs font-semibold px-1.5 py-0.5 rounded-full min-w-5 text-center">
              {item.activeCount}
            </span>
          )}
          <HugeIcon
            icon={ArrowRight01Icon}
            size={16}
            strokeWidth={2}
            className="text-fg-quaternary shrink-0"
          />
        </BaseMenu.Item>
      </motion.div>
    )
  }

  // Action item
  return (
    <motion.div
      initial={false}
      animate={animateProps}
      transition={transition}
    >
      <BaseMenu.Item
        className={ITEM_CLASSES}
        onClick={() => {
          item.onClick?.()
          onSelect()
        }}
      >
        {item.icon && (
          <HugeIcon
            icon={item.icon}
            size={16}
            strokeWidth={2}
            className={ICON_CLASSES}
          />
        )}
        <span className="flex-1 truncate">{item.label}</span>
        {item.selected && (
          <HugeIcon
            icon={CheckmarkCircle02Icon}
            size={16}
            strokeWidth={2}
            className="text-brand-primary shrink-0"
          />
        )}
      </BaseMenu.Item>
    </motion.div>
  )
}

AnimatedMenuItem.displayName = 'AnimatedMenuItem'

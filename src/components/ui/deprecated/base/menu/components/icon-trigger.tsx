/**
 * Base UI Menu - Icon Trigger Component
 *
 * Circular button trigger with icon, commonly used for "more options" menus.
 * Uses ButtonUtility styles for consistent styling across the design system.
 *
 * Note: Uses a plain <button> element (not react-aria Button) to allow
 * Base UI's Menu.Trigger to properly handle click events.
 *
 * @module base-ui/menu/components/icon-trigger
 */

'use client'

import React from 'react'

import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/core/primitives/icon'

// Simplified button utility styles for demo-repo
const buttonUtilityStyles = {
  shapes: {
    circular: 'rounded-full',
  },
  colors: {
    secondary: 'text-secondary hover:text-primary hover:bg-secondary',
  },
  active: {
    secondary: 'text-primary bg-secondary',
  },
}

import type { IconTriggerProps } from '../types'

// ============================================================================
// Component
// ============================================================================

/**
 * Circular icon button trigger for menus
 * Uses ButtonUtility styles with circular shape and isActive state
 */
export const IconTrigger = React.forwardRef<HTMLButtonElement, IconTriggerProps>(
  ({ icon, className, isOpen, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        aria-label="Open menu"
        className={cn(
          // Base styles (from ButtonUtility pattern)
          'group relative inline-flex h-max cursor-pointer items-center justify-center p-1.5 transition-all duration-150 ease-out',
          'outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2',
          'disabled:text-fg-disabled_subtle disabled:cursor-not-allowed',

          // Shape - circular
          buttonUtilityStyles.shapes.circular,

          // Color - secondary (only when not active)
          !isOpen && buttonUtilityStyles.colors.secondary,

          // Active state styles
          isOpen && buttonUtilityStyles.active.secondary,

          // Icon styles
          '*:data-icon:transition-inherit-all *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current',
          '*:data-icon:size-4',

          className
        )}
        {...props}
      >
        <HugeIcon icon={icon} size={16} strokeWidth={2.5} data-icon />
      </button>
    )
  }
)

IconTrigger.displayName = 'IconTrigger'

/**
 * Biaxial Expand V4 - Action Button Variant
 *
 * Built-in trigger variant for button-based expansion.
 * Useful for action menus, dropdowns, and selection triggers.
 */

'use client'

import * as React from 'react'
import { forwardRef, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import ArrowDown01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowDown01Icon'
import { useBiaxialExpand } from '../core/context'

export interface ActionButtonProps {
  /** Button label */
  label?: string
  /** Left icon */
  icon?: React.ComponentType<{ className?: string }>
  /** Show dropdown indicator */
  showChevron?: boolean
  /** Additional className */
  className?: string
  /** Children (alternative to label) */
  children?: React.ReactNode
}

export const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  (
    {
      label,
      icon: Icon,
      showChevron = true,
      className,
      children,
    },
    ref
  ) => {
    const { expanded, setExpanded } = useBiaxialExpand()

    const handleClick = useCallback(() => {
      setExpanded(!expanded)
    }, [expanded, setExpanded])

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === 'Escape' && expanded) {
          setExpanded(false)
        } else if (e.key === 'ArrowDown' && !expanded) {
          e.preventDefault()
          setExpanded(true)
        }
      },
      [expanded, setExpanded]
    )

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          'flex items-center justify-center gap-2 w-full h-full px-4',
          'text-primary text-sm font-medium',
          'focus:outline-none',
          'rounded-full',
          className
        )}
        aria-expanded={expanded}
        aria-haspopup="true"
      >
        {/* Left icon */}
        {Icon && (
          <HugeIcon
            icon={Icon}
            size={18}
            className="shrink-0 text-secondary"
          />
        )}

        {/* Label or children */}
        {children ?? label}

        {/* Chevron indicator */}
        {showChevron && (
          <HugeIcon
            icon={ArrowDown01Icon}
            size={16}
            className={cn(
              'shrink-0 text-tertiary transition-transform duration-200',
              expanded && 'rotate-180'
            )}
          />
        )}
      </button>
    )
  }
)

ActionButton.displayName = 'BiaxialExpandV4.ActionButton'

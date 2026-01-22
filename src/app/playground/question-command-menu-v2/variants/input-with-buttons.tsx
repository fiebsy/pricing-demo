/**
 * Question Command Menu - Input With Buttons Variant
 *
 * Enhanced trigger component that supports action buttons inside the input.
 * Based on BiaxialExpandV4.SearchInput with additional button slots.
 */

'use client'

import * as React from 'react'
import { forwardRef, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import { useBiaxialExpand } from '@/components/ui/prod/base/biaxial-command-menu-v4'
import type { TriggerConfig, TriggerButtonConfig } from '../config/types'

// Icons
import Search01Icon from '@hugeicons-pro/core-stroke-rounded/Search01Icon'
import Add01Icon from '@hugeicons-pro/core-stroke-rounded/Add01Icon'
// Sent01Icon doesn't exist - using ArrowUp01Icon for send
import Tick01Icon from '@hugeicons-pro/core-stroke-rounded/Tick01Icon'
import Cancel01Icon from '@hugeicons-pro/core-stroke-rounded/Cancel01Icon'
import RefreshIcon from '@hugeicons-pro/core-stroke-rounded/RefreshIcon'
import Settings01Icon from '@hugeicons-pro/core-stroke-rounded/Settings01Icon'
import Edit01Icon from '@hugeicons-pro/core-stroke-rounded/Edit01Icon'
import Delete01Icon from '@hugeicons-pro/core-stroke-rounded/Delete01Icon'
import SparklesIcon from '@hugeicons-pro/core-stroke-rounded/SparklesIcon'
import ArrowRight01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowRight01Icon'
import ArrowUp01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowUp01Icon'

// ============================================================================
// ICON MAP
// ============================================================================

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  search: Search01Icon,
  add: Add01Icon,
  send: ArrowUp01Icon,
  check: Tick01Icon,
  close: Cancel01Icon,
  refresh: RefreshIcon,
  settings: Settings01Icon,
  edit: Edit01Icon,
  delete: Delete01Icon,
  sparkle: SparklesIcon,
  'arrow-right': ArrowRight01Icon,
  'arrow-up': ArrowUp01Icon,
}

// ============================================================================
// TYPES
// ============================================================================

export interface InputWithButtonsProps {
  /** Placeholder text */
  placeholder?: string
  /** Current value */
  value?: string
  /** Value change handler */
  onValueChange?: (value: string) => void
  /** Called when escape is pressed */
  onEscape?: () => void
  /** Called when enter is pressed */
  onEnter?: () => void
  /** Trigger configuration */
  triggerConfig: TriggerConfig
  /** Called when a button is clicked */
  onButtonClick?: (buttonIndex: number, buttonConfig: TriggerButtonConfig) => void
  /** Additional className */
  className?: string
}

// ============================================================================
// ACTION BUTTON COMPONENT
// ============================================================================

interface ActionButtonProps {
  config: TriggerButtonConfig
  onClick?: () => void
}

const ActionButton: React.FC<ActionButtonProps> = ({ config, onClick }) => {
  if (!config.enabled) return null

  const IconComponent = config.icon ? ICON_MAP[config.icon] : null
  const showIcon = config.type === 'icon' || config.type === 'icon-text'
  const showLabel = config.type === 'text' || config.type === 'icon-text'

  const sizeClasses = config.size === 'sm'
    ? 'h-7 min-w-7 px-2 text-xs'
    : 'h-8 min-w-8 px-3 text-sm'

  const variantClasses = {
    ghost: 'bg-transparent hover:bg-tertiary text-tertiary hover:text-secondary',
    outline: 'bg-transparent border border-primary hover:bg-tertiary text-tertiary hover:text-secondary',
    solid: 'bg-brand-solid hover:bg-brand-solid-hover text-on-brand',
  }[config.variant]

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        onClick?.()
      }}
      className={cn(
        'shrink-0 flex items-center justify-center gap-1.5',
        'rounded-lg font-medium',
        'transition-colors duration-150',
        sizeClasses,
        variantClasses,
        config.className
      )}
    >
      {showIcon && IconComponent && (
        <HugeIcon
          icon={IconComponent}
          size={config.size === 'sm' ? 14 : 16}
        />
      )}
      {showLabel && config.label && (
        <span>{config.label}</span>
      )}
    </button>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const InputWithButtons = forwardRef<HTMLInputElement, InputWithButtonsProps>(
  (
    {
      placeholder = 'Type your question...',
      value,
      onValueChange,
      onEscape,
      onEnter,
      triggerConfig,
      onButtonClick,
      className,
    },
    ref
  ) => {
    const { expanded, setExpanded } = useBiaxialExpand()

    const handleFocus = useCallback(() => {
      setExpanded(true)
    }, [setExpanded])

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') {
          setExpanded(false)
          onEscape?.()
          ;(e.target as HTMLInputElement).blur()
        } else if (e.key === 'Enter') {
          e.preventDefault()
          onEnter?.()
        }
      },
      [setExpanded, onEscape, onEnter]
    )

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onValueChange?.(e.target.value)
      },
      [onValueChange]
    )

    const leftButtons = triggerConfig.buttons?.filter((b) => b.position === 'left' && b.enabled) ?? []
    const rightButtons = triggerConfig.buttons?.filter((b) => b.position === 'right' && b.enabled) ?? []
    const hasRightButtons = rightButtons.length > 0

    const paddingLeft = triggerConfig.paddingX + (expanded ? triggerConfig.paddingExpanded : 0)
    const paddingRight = triggerConfig.paddingX + (expanded ? triggerConfig.paddingExpanded : 0)

    return (
      <div
        className={cn(
          'flex items-center w-full h-full gap-2',
          className
        )}
        style={{
          paddingLeft,
          paddingRight,
          cursor: triggerConfig.cursor,
        }}
      >
        {/* Left Buttons */}
        {leftButtons.map((btn, idx) => (
          <ActionButton
            key={`left-${idx}`}
            config={btn}
            onClick={() => onButtonClick?.(triggerConfig.buttons.indexOf(btn), btn)}
          />
        ))}

        {/* Search icon */}
        {triggerConfig.showSearchIcon && (
          <HugeIcon
            icon={Search01Icon}
            size={18}
            className={cn(
              'shrink-0 transition-colors duration-150',
              expanded ? 'text-tertiary' : 'text-quaternary'
            )}
          />
        )}

        {/* Input */}
        <input
          ref={ref}
          type="text"
          value={value ?? ''}
          onChange={handleChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            'flex-1 min-w-0 bg-transparent outline-none',
            'text-primary placeholder:text-tertiary',
            'text-sm'
          )}
        />

        {/* Keyboard hint (when collapsed and no right buttons) */}
        {!expanded && triggerConfig.showKeyboardHint && !hasRightButtons && (
          <kbd
            className={cn(
              'hidden sm:flex items-center gap-1',
              'px-1.5 py-0.5 rounded',
              'bg-tertiary text-tertiary',
              'text-xs font-medium'
            )}
          >
            <span className="text-[10px]">⌘</span>
            <span>{triggerConfig.keyboardHintText}</span>
          </kbd>
        )}

        {/* Right Buttons */}
        {rightButtons.map((btn, idx) => (
          <ActionButton
            key={`right-${idx}`}
            config={btn}
            onClick={() => onButtonClick?.(triggerConfig.buttons.indexOf(btn), btn)}
          />
        ))}
      </div>
    )
  }
)

InputWithButtons.displayName = 'InputWithButtons'

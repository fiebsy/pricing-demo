/**
 * Command Input - Search Input Trigger
 *
 * An input field that serves as the trigger for the command menu.
 * Expands the panel on focus and filters items as user types.
 */

'use client'

import * as React from 'react'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import Search01Icon from '@hugeicons-pro/core-stroke-rounded/Search01Icon'

// ============================================================================
// TYPES
// ============================================================================

export interface CommandInputProps {
  /** Current search value */
  value: string
  /** Called when search value changes */
  onChange: (value: string) => void
  /** Called when input gains focus */
  onFocus: () => void
  /** Called when input loses focus */
  onBlur: (e: React.FocusEvent) => void
  /** Called when escape is pressed */
  onEscape?: () => void
  /** Called when arrow down is pressed */
  onArrowDown?: () => void
  /** Placeholder text */
  placeholder?: string
  /** Whether the menu is expanded */
  isExpanded: boolean
  /** Additional className */
  className?: string
  /** Custom icon component */
  icon?: React.ComponentType<{ className?: string }>
  /** Show the icon. Default: true */
  showIcon?: boolean
  /** Show keyboard hint. Default: true */
  showKeyboardHint?: boolean
  /** Keyboard hint text. Default: "/" */
  keyboardHintText?: string
  /** Right icon component */
  rightIcon?: React.ComponentType<{ className?: string }>
  /** Show right icon. Default: false */
  showRightIcon?: boolean
  /** Cursor style */
  cursor?: 'text' | 'pointer'
}

// ============================================================================
// COMPONENT
// ============================================================================

export const CommandInput = forwardRef<HTMLInputElement, CommandInputProps>(
  (
    {
      value,
      onChange,
      onFocus,
      onBlur,
      onEscape,
      onArrowDown,
      placeholder = 'Search...',
      isExpanded,
      className,
      icon: CustomIcon,
      showIcon = true,
      showKeyboardHint = true,
      keyboardHintText = '/',
      rightIcon: RightIcon,
      showRightIcon = false,
      cursor = 'text',
    },
    ref
  ) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Escape') {
        onEscape?.()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        onArrowDown?.()
      }
    }

    const IconComponent = CustomIcon || Search01Icon

    return (
      <div
        className={cn(
          'relative flex items-center gap-2',
          'w-full h-full',
          className
        )}
      >
        {/* Icon */}
        {showIcon && (
          <HugeIcon
            icon={IconComponent}
            size={16}
            strokeWidth={2}
            className={cn(
              'shrink-0 transition-colors duration-150',
              isExpanded
                ? 'text-primary'
                : 'text-tertiary group-hover/trigger:text-secondary'
            )}
          />
        )}

        {/* Input Field */}
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-label="Search commands"
          className={cn(
            'flex-1 bg-transparent border-none outline-none',
            'text-sm text-primary placeholder:text-quaternary',
            'focus:outline-none focus:ring-0',
            cursor === 'pointer' && !isExpanded && 'cursor-pointer'
          )}
        />

        {/* Right Icon (when collapsed, replaces keyboard hint) */}
        {showRightIcon && RightIcon && !isExpanded && !value && (
          <HugeIcon
            icon={RightIcon}
            size={16}
            strokeWidth={2}
            className="shrink-0 text-tertiary group-hover/trigger:text-secondary transition-colors duration-150"
          />
        )}

        {/* Keyboard Shortcut Hint (when collapsed, if no right icon) */}
        {showKeyboardHint && !showRightIcon && !isExpanded && !value && (
          <div className="flex items-center gap-0.5 shrink-0">
            <kbd
              className={cn(
                'px-1.5 py-0.5 rounded text-xs font-medium',
                'bg-tertiary text-tertiary border border-secondary'
              )}
            >
              {keyboardHintText}
            </kbd>
          </div>
        )}

        {/* Clear Button (when has value) */}
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className={cn(
              'shrink-0 p-1 rounded',
              'text-tertiary hover:text-secondary',
              'hover:bg-quaternary',
              'transition-colors duration-150'
            )}
            aria-label="Clear search"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M2 2l8 8M10 2l-8 8" />
            </svg>
          </button>
        )}
      </div>
    )
  }
)

CommandInput.displayName = 'CommandInput'

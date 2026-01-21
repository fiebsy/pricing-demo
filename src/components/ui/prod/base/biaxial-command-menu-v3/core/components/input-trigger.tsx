/**
 * Biaxial Command Menu V3 - Input Trigger Component
 *
 * Wrapper for the command input with position/size animations.
 */

'use client'

import * as React from 'react'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { EASING_EXPO_OUT } from '@/components/ui/prod/base/menu/config'
import { CommandInput } from '@/components/ui/prod/base/biaxial-command-menu/components/command-input'
import type { BackgroundOption } from '../types'
import { getBackgroundClass } from '../utils'

export interface InputTriggerProps {
  /** Ref to the input element */
  inputRef: React.RefObject<HTMLInputElement | null>
  /** Whether the menu is expanded */
  expanded: boolean
  /** Filter value */
  filter: string
  /** Filter change handler */
  onFilterChange: (value: string) => void
  /** Focus handler */
  onFocus: () => void
  /** Blur handler */
  onBlur: (e: React.FocusEvent) => void
  /** Escape handler */
  onEscape: () => void
  /** Arrow down handler */
  onArrowDown: () => void
  /** Mouse enter handler */
  onMouseEnter?: () => void
  /** Mouse leave handler */
  onMouseLeave?: () => void
  /** Placeholder text */
  placeholder: string
  /** Panel width */
  panelWidth: number
  /** Input width */
  inputWidth: number
  /** Input height */
  inputHeight: number
  /** Base horizontal padding for input */
  inputPaddingX: number
  /** Input top padding when expanded */
  inputTopPaddingExpanded: number
  /** Input horizontal padding when expanded (added to base) */
  inputPaddingExpanded: number
  /** Animation duration */
  duration: number
  /** Input background */
  inputBackground: BackgroundOption
  /** Cursor style for collapsed state */
  inputCursor?: 'text' | 'pointer'
  /** Custom icon component */
  inputIcon?: React.ComponentType<{ className?: string }>
  /** Show input icon */
  showInputIcon?: boolean
  /** Show keyboard hint */
  showKeyboardHint?: boolean
  /** Keyboard hint text */
  keyboardHintText?: string
  /** Right icon component */
  rightIcon?: React.ComponentType<{ className?: string }>
  /** Show right icon */
  showRightIcon?: boolean
}

export const InputTrigger = forwardRef<HTMLDivElement, InputTriggerProps>(
  (
    {
      inputRef,
      expanded,
      filter,
      onFilterChange,
      onFocus,
      onBlur,
      onEscape,
      onArrowDown,
      onMouseEnter,
      onMouseLeave,
      placeholder,
      panelWidth,
      inputWidth,
      inputHeight,
      inputPaddingX,
      inputTopPaddingExpanded,
      inputPaddingExpanded,
      duration,
      inputBackground,
      inputCursor = 'text',
      inputIcon,
      showInputIcon = true,
      showKeyboardHint = true,
      keyboardHintText = '/',
      rightIcon,
      showRightIcon = false,
    },
    ref
  ) => {
    // Base padding + expanded offset
    const paddingH = expanded ? inputPaddingX + inputPaddingExpanded : inputPaddingX

    // Cursor: pointer when collapsed (if configured), text when expanded
    const cursor = expanded ? 'text' : inputCursor

    return (
      <div
        ref={ref}
        className={cn(
          'absolute flex items-center group/trigger',
          'transition-all duration-150',
          expanded && getBackgroundClass(inputBackground)
        )}
        style={{
          top: 0,
          left: expanded ? 0 : (panelWidth - inputWidth) / 2,
          width: expanded ? panelWidth : inputWidth,
          height: expanded
            ? inputHeight + inputTopPaddingExpanded
            : inputHeight,
          paddingLeft: paddingH,
          paddingRight: paddingH,
          paddingTop: expanded ? inputTopPaddingExpanded : 0,
          pointerEvents: 'auto',
          cursor,
          transition: `left ${duration}ms ${EASING_EXPO_OUT}, width ${duration}ms ${EASING_EXPO_OUT}, height ${duration}ms ${EASING_EXPO_OUT}, padding ${duration}ms ${EASING_EXPO_OUT}, background-color 150ms ease`,
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <CommandInput
          ref={inputRef}
          value={filter}
          onChange={onFilterChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onEscape={onEscape}
          onArrowDown={onArrowDown}
          placeholder={placeholder}
          isExpanded={expanded}
          icon={inputIcon}
          showIcon={showInputIcon}
          showKeyboardHint={showKeyboardHint}
          keyboardHintText={keyboardHintText}
          rightIcon={rightIcon}
          showRightIcon={showRightIcon}
          cursor={cursor}
        />
      </div>
    )
  }
)

InputTrigger.displayName = 'InputTrigger'

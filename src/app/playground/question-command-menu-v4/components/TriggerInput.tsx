/**
 * Question Command Menu V4 - Trigger Input
 *
 * Input field state with action buttons.
 */

'use client'

import * as React from 'react'
import { forwardRef, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import { useBiaxialExpand } from '@/components/ui/prod/base/biaxial-command-menu-v4'
import { useV4Context } from '../state'
import { useVisibleButtons } from '../hooks'
import { ActionButton } from './TriggerButtons'
import type { TriggerConfig, TriggerButtonConfig, SaveStatus } from '../types'

// Icons
import Search01Icon from '@hugeicons-pro/core-stroke-rounded/Search01Icon'

// =============================================================================
// TYPES
// =============================================================================

export interface TriggerInputProps {
  placeholder?: string
  triggerConfig: TriggerConfig
  onButtonClick?: (buttonIndex: number, buttonConfig: TriggerButtonConfig) => void
  onEnter?: () => void
  className?: string
  /** When true (default), focusing input expands the panel. Set to false when expansion is controlled externally. */
  expandOnFocus?: boolean
}

// =============================================================================
// COMPONENT
// =============================================================================

export const TriggerInput = forwardRef<HTMLInputElement, TriggerInputProps>(
  (
    {
      placeholder = 'Type your question...',
      triggerConfig,
      onButtonClick,
      onEnter,
      className,
      expandOnFocus = true,
    },
    ref
  ) => {
    const { expanded, setExpanded, timing } = useBiaxialExpand()
    const { state, setInput, escape, expand, collapse } = useV4Context()

    // Get save status for button display
    const saveStatus = state.saveStatus
    // Check if there are unsaved changes (input differs from saved value)
    const hasUnsavedChanges = state.inputValue.trim() !== (state.savedValue ?? '').trim() && state.inputValue.trim() !== ''

    // Filter buttons by position using hook (pass BiaxialExpand's expanded state for accuracy)
    const leftButtons = useVisibleButtons(triggerConfig.buttons ?? [], 'left', expanded)
    const rightButtons = useVisibleButtons(triggerConfig.buttons ?? [], 'right', expanded)
    const hasRightButtons = rightButtons.length > 0

    const handleFocus = useCallback(() => {
      if (expandOnFocus) {
        setExpanded(true)
        expand() // Also update V4 context state
      }
    }, [setExpanded, expandOnFocus, expand])

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') {
          setExpanded(false)
          escape()
          collapse() // Also update V4 context state
          ;(e.target as HTMLInputElement).blur()
        } else if (e.key === 'Enter') {
          e.preventDefault()
          onEnter?.()
        }
      },
      [setExpanded, escape, collapse, onEnter]
    )

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
      },
      [setInput]
    )

    const expandOffsetLeft = expanded ? triggerConfig.paddingExpandedLeft : 0
    const expandOffsetRight = expanded ? triggerConfig.paddingExpandedRight : 0
    const paddingLeft = triggerConfig.paddingLeft + expandOffsetLeft
    const paddingRight = triggerConfig.paddingRight + expandOffsetRight
    const paddingTop = triggerConfig.paddingTop
    const paddingBottom = triggerConfig.paddingBottom

    // Get animation duration from context for synchronized transitions
    const duration = timing.duration

    return (
      <div
        className={cn(
          'flex items-center w-full h-full gap-2',
          'motion-reduce:transition-none',
          className
        )}
        style={{
          paddingLeft,
          paddingRight,
          paddingTop,
          paddingBottom,
          // When expanded, always use text cursor for proper input UX
          cursor: expanded ? 'text' : triggerConfig.cursor,
          transition: `padding ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
        }}
      >
        {/* Left Buttons */}
        {leftButtons.map((btn) => (
          <ActionButton
            key={btn.id}
            config={btn}
            onClick={() => onButtonClick?.(triggerConfig.buttons.indexOf(btn), btn)}
            expanded={expanded}
            duration={duration}
            saveStatus={saveStatus}
            hasUnsavedChanges={hasUnsavedChanges}
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
          value={state.inputValue}
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

        {/* Keyboard hint */}
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
        {rightButtons.map((btn) => (
          <ActionButton
            key={btn.id}
            config={btn}
            onClick={() => onButtonClick?.(triggerConfig.buttons.indexOf(btn), btn)}
            expanded={expanded}
            duration={duration}
            saveStatus={saveStatus}
            hasUnsavedChanges={hasUnsavedChanges}
          />
        ))}
      </div>
    )
  }
)

TriggerInput.displayName = 'TriggerInput'

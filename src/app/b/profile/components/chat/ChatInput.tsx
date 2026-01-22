/**
 * ChatInput Component
 *
 * Input area with inline control buttons (close, expand).
 * Same component used in all chat states for consistency.
 *
 * @module b/profile/components/chat
 */

'use client'

import * as React from 'react'
import { useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import ArrowUp01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowUp01Icon'
import Mic01Icon from '@hugeicons-pro/core-stroke-rounded/Mic01Icon'
import Cancel01Icon from '@hugeicons-pro/core-stroke-rounded/Cancel01Icon'
import type { ChatInputProps, ChatOverlayState } from '../../types'

// =============================================================================
// TYPES
// =============================================================================

interface ChatInputInternalProps extends ChatInputProps {
  state?: ChatOverlayState
  onClose?: () => void
  onExpand?: () => void
}

// =============================================================================
// COMPONENT
// =============================================================================

export function ChatInput({
  onSend,
  onFocus,
  disabled,
  state = 'collapsed',
  onClose,
  onExpand,
  className,
}: ChatInputInternalProps) {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault()
      const trimmed = inputValue.trim()
      if (trimmed && !disabled) {
        onSend(trimmed)
        setInputValue('')
      }
    },
    [inputValue, onSend, disabled]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSubmit()
      }
    },
    [handleSubmit]
  )

  const canSend = inputValue.trim() && !disabled
  const isExpanded = state === 'expanded'
  const showControls = state !== 'collapsed'

  return (
    <form onSubmit={handleSubmit} className={cn('p-4', className)}>
      <div className="flex items-center gap-2">
        {/* Close button - left of input (visible when not collapsed) */}
        {showControls && onClose && (
          <button
            type="button"
            onClick={onClose}
            className={cn(
              'size-9 rounded-lg flex items-center justify-center shrink-0',
              'text-tertiary hover:text-primary hover:bg-secondary',
              'motion-safe:transition-colors motion-safe:duration-150',
              'motion-reduce:transition-none'
            )}
          >
            <HugeIcon icon={Cancel01Icon} size={20} strokeWidth={1.5} />
          </button>
        )}

        {/* Input field */}
        <div
          className={cn(
            'flex-1 flex items-center gap-2 p-2 rounded-xl',
            'bg-secondary border border-primary',
            'focus-within:ring-2 focus-within:ring-brand-primary/20 focus-within:border-brand-primary',
            'motion-safe:transition-all motion-safe:duration-150',
            'motion-reduce:transition-none'
          )}
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={onFocus}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything..."
            disabled={disabled}
            className={cn(
              'flex-1 bg-transparent outline-none',
              'text-sm text-primary placeholder:text-tertiary',
              'px-2',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          />
          <button
            type="button"
            disabled={disabled}
            className={cn(
              'size-9 rounded-lg flex items-center justify-center shrink-0',
              'text-tertiary hover:text-primary hover:bg-tertiary',
              'motion-safe:transition-colors motion-safe:duration-150',
              'motion-reduce:transition-none',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            <HugeIcon icon={Mic01Icon} size={20} strokeWidth={1.5} />
          </button>
          <button
            type="submit"
            disabled={!canSend}
            className={cn(
              'size-9 rounded-lg flex items-center justify-center shrink-0',
              'bg-brand-solid text-white',
              'hover:bg-brand-solid-hover',
              'motion-safe:transition-colors motion-safe:duration-150',
              'motion-reduce:transition-none',
              !canSend && 'opacity-50 cursor-not-allowed'
            )}
          >
            <HugeIcon icon={ArrowUp01Icon} size={20} strokeWidth={2} />
          </button>
        </div>

        {/* Expand button - right of input (visible when not expanded) */}
        {showControls && !isExpanded && onExpand && (
          <button
            type="button"
            onClick={onExpand}
            className={cn(
              'size-9 rounded-lg flex items-center justify-center shrink-0',
              'text-tertiary hover:text-primary hover:bg-secondary',
              'motion-safe:transition-colors motion-safe:duration-150',
              'motion-reduce:transition-none'
            )}
          >
            <HugeIcon icon={ArrowUp01Icon} size={20} strokeWidth={1.5} />
          </button>
        )}
      </div>
    </form>
  )
}

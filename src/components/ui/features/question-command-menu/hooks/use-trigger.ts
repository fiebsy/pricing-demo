/**
 * Question Command Menu V4 - Trigger Hooks
 *
 * Convenience hooks for trigger state and visibility.
 */

'use client'

import { useMemo, useCallback } from 'react'
import { useV4Context } from '../state'
import type { TriggerButtonConfig, ButtonVisibility } from '../types'

/**
 * Evaluate button visibility based on current state
 * @param expandedOverride - Optional override for expanded state (use BiaxialExpand's state for accuracy)
 */
export function useButtonVisibility(
  visibility: ButtonVisibility | undefined,
  expandedOverride?: boolean
): boolean {
  const { state, isExpanded, isEditing, hasSavedValue } = useV4Context()

  // Use override if provided (BiaxialExpand's state), otherwise fall back to context
  const effectiveExpanded = expandedOverride ?? isExpanded

  return useMemo(() => {
    // Default to always visible
    if (visibility === undefined || visibility === true || visibility === 'always') {
      return true
    }

    if (visibility === false) {
      return false
    }

    switch (visibility) {
      case 'expanded':
        return effectiveExpanded
      case 'collapsed':
        return !effectiveExpanded
      case 'editing':
        return isEditing
      case 'has-value':
        return state.inputValue.trim().length > 0
      case 'saved':
        return hasSavedValue
      case 'not-saved':
        return !hasSavedValue
      default:
        return true
    }
  }, [visibility, effectiveExpanded, isEditing, hasSavedValue, state.inputValue])
}

/**
 * Get visible buttons for a position based on current state
 * @param expandedOverride - Optional override for expanded state (use BiaxialExpand's state for accuracy)
 */
export function useVisibleButtons(
  buttons: TriggerButtonConfig[],
  position: 'left' | 'right',
  expandedOverride?: boolean
) {
  const { state, isExpanded, isEditing, hasSavedValue } = useV4Context()

  // Use override if provided (BiaxialExpand's state), otherwise fall back to context
  const effectiveExpanded = expandedOverride ?? isExpanded

  return useMemo(() => {
    return buttons.filter((btn) => {
      if (!btn.enabled || btn.position !== position) return false

      const visibility = btn.showWhen ?? 'always'

      if (visibility === true || visibility === 'always') return true
      if (visibility === false) return false

      switch (visibility) {
        case 'expanded':
          return effectiveExpanded
        case 'collapsed':
          return !effectiveExpanded
        case 'editing':
          return isEditing
        case 'has-value':
          return state.inputValue.trim().length > 0
        case 'saved':
          return hasSavedValue
        case 'not-saved':
          return !hasSavedValue
        default:
          return true
      }
    })
  }, [buttons, position, effectiveExpanded, isEditing, hasSavedValue, state.inputValue])
}

/**
 * Get trigger display text based on mode and state
 */
export function useTriggerDisplayText(placeholder: string, addPlaceholder?: string) {
  const { state, hasSavedValue } = useV4Context()

  return useMemo(() => {
    if (state.mode === 'question' || state.mode === 'display') {
      if (hasSavedValue) {
        return state.savedValue!
      }
      return addPlaceholder ?? placeholder
    }
    return placeholder
  }, [state.mode, state.savedValue, hasSavedValue, placeholder, addPlaceholder])
}

/**
 * Get handlers for trigger interactions
 */
export function useTriggerHandlers() {
  const ctx = useV4Context()

  const handleClick = useCallback(() => {
    ctx.clickTrigger()
  }, [ctx])

  const handleFocus = useCallback(() => {
    ctx.focusInput()
  }, [ctx])

  const handleBlur = useCallback(() => {
    ctx.blurInput()
  }, [ctx])

  const handleEscape = useCallback(() => {
    ctx.escape()
  }, [ctx])

  const handleChange = useCallback(
    (value: string) => {
      ctx.setInput(value)
    },
    [ctx]
  )

  const handleSave = useCallback(() => {
    if (ctx.state.inputValue.trim()) {
      ctx.save(ctx.state.inputValue.trim())
    }
  }, [ctx])

  const handleClear = useCallback(() => {
    ctx.clearValue()
  }, [ctx])

  return {
    handleClick,
    handleFocus,
    handleBlur,
    handleEscape,
    handleChange,
    handleSave,
    handleClear,
  }
}

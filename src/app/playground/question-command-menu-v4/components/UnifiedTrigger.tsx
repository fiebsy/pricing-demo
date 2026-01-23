/**
 * Question Command Menu V4 - Unified Trigger
 *
 * Single trigger component that handles all interaction modes:
 * - input: Always shows input field
 * - question: Toggles between display and input
 * - display: Always shows read-only display
 */

'use client'

import * as React from 'react'
import { useCallback } from 'react'
import { useBiaxialExpand } from '@/components/ui/prod/base/biaxial-command-menu-v4'
import { useV4Context } from '../state'
import { TriggerDisplay } from './TriggerDisplay'
import { TriggerInput } from './TriggerInput'
import type { TriggerConfig, TriggerDisplayConfig, TriggerButtonConfig } from '../types'

// =============================================================================
// VALIDATION HELPER
// =============================================================================

function validateQuestionLength(text: string, maxWords: number): { valid: boolean; message?: string } {
  const words = text.trim().split(/\s+/)
  if (words.length > maxWords) {
    return { valid: false, message: `Question exceeds ${maxWords} word limit` }
  }
  return { valid: true }
}

// =============================================================================
// TYPES
// =============================================================================

export interface UnifiedTriggerProps {
  placeholder?: string
  triggerConfig: TriggerConfig
  displayConfig?: TriggerDisplayConfig
  onButtonClick?: (buttonIndex: number, buttonConfig: TriggerButtonConfig) => void
  onEnter?: () => void
  onSave?: (question: string) => void
  maxWords?: number
  className?: string
}

// =============================================================================
// COMPONENT
// =============================================================================

export const UnifiedTrigger: React.FC<UnifiedTriggerProps> = ({
  placeholder = 'Add a question...',
  triggerConfig,
  displayConfig,
  onButtonClick,
  onEnter,
  onSave,
  maxWords = 15,
  className,
}) => {
  const { setExpanded } = useBiaxialExpand()
  const {
    state,
    clickTrigger,
    save,
    startSaving,
    saveComplete,
    resetSaveStatus,
  } = useV4Context()

  // Handle click on display trigger (question/display mode)
  const handleDisplayClick = useCallback(() => {
    clickTrigger()
    setExpanded(true)
  }, [clickTrigger, setExpanded])

  // Handle save action with loading/saved states
  const handleSave = useCallback(async () => {
    if (!state.inputValue.trim()) return
    if (state.saveStatus !== 'idle') return // Prevent double-saves

    // Validate word count
    const validation = validateQuestionLength(state.inputValue, maxWords)
    if (!validation.valid) {
      console.warn('[UnifiedTrigger] Validation failed:', validation.message)
      return
    }

    const valueToSave = state.inputValue.trim()

    // Start saving (show loading spinner)
    startSaving()

    // Simulate save delay (in real app, this would be an API call)
    await new Promise((resolve) => setTimeout(resolve, 400))

    // Save the value
    save(valueToSave)

    // Show saved state
    saveComplete()

    // Notify parent
    onSave?.(valueToSave)

    // Reset to idle after showing saved feedback
    setTimeout(() => {
      resetSaveStatus()
    }, 1500)
  }, [state.inputValue, state.saveStatus, maxWords, startSaving, save, saveComplete, resetSaveStatus, onSave])

  // Handle button clicks - intercept save/edit button
  const handleButtonClick = useCallback(
    (buttonIndex: number, buttonConfig: TriggerButtonConfig) => {
      // Check if it's a save button (check icon, or Save/Edit label when in editing mode)
      const isSaveButton = buttonConfig.icon === 'check' ||
        buttonConfig.label === 'Save' ||
        (buttonConfig.label === 'Edit' && state.inputValue !== state.savedValue)

      if (isSaveButton) {
        handleSave()
        return
      }
      onButtonClick?.(buttonIndex, buttonConfig)
    },
    [handleSave, onButtonClick, state.inputValue, state.savedValue]
  )

  // Handle Enter key
  const handleEnter = useCallback(() => {
    // If in expanded state with a save/edit button, trigger save
    const hasSaveButton = triggerConfig.buttons?.some(
      (btn) => btn.icon === 'check' || btn.label === 'Save' || btn.label === 'Edit'
    )
    if (hasSaveButton) {
      handleSave()
    } else {
      onEnter?.()
    }
  }, [triggerConfig.buttons, handleSave, onEnter])

  // Determine what to render based on mode and state
  const { mode, editing } = state

  // Display mode: always show read-only display
  if (mode === 'display') {
    return (
      <TriggerDisplay
        triggerConfig={triggerConfig}
        displayConfig={displayConfig}
        className={className}
      />
    )
  }

  // Question mode: toggle between display and input
  if (mode === 'question') {
    // If not editing, show display
    if (!editing) {
      return (
        <TriggerDisplay
          triggerConfig={triggerConfig}
          displayConfig={displayConfig}
          onClick={handleDisplayClick}
          className={className}
        />
      )
    }

    // If editing, show input
    return (
      <TriggerInput
        placeholder={placeholder}
        triggerConfig={triggerConfig}
        onButtonClick={handleButtonClick}
        onEnter={handleEnter}
        expandOnFocus={false}
        className={className}
      />
    )
  }

  // Input mode: always show input
  return (
    <TriggerInput
      placeholder={placeholder}
      triggerConfig={triggerConfig}
      onButtonClick={handleButtonClick}
      onEnter={handleEnter}
      expandOnFocus={true}
      className={className}
    />
  )
}

UnifiedTrigger.displayName = 'UnifiedTrigger'

/**
 * RevisionFlowModal - Nested dialog for revision flows
 *
 * Contains three recovery options:
 * - Quick Fix: Tinder-style True/False statements
 * - Add to Mind: Upload files/links
 * - Manual Fix: Type or voice answer
 *
 * Uses Base UI Dialog with nested dialog support.
 *
 * @module playground/edit-questions/components
 */

'use client'

import * as React from 'react'
import { useCallback } from 'react'
import { Dialog } from '@base-ui/react/dialog'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import Cancel01Icon from '@hugeicons-pro/core-stroke-rounded/Cancel01Icon'
import ArrowLeft01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowLeft01Icon'
import Idea01Icon from '@hugeicons-pro/core-stroke-rounded/Idea01Icon'
import File02Icon from '@hugeicons-pro/core-stroke-rounded/File02Icon'
import Mic01Icon from '@hugeicons-pro/core-stroke-rounded/Mic01Icon'

import { QuickFixFlow } from './QuickFixFlow'
import { AddToMindFlow } from './AddToMindFlow'
import { ManualFixFlow } from './ManualFixFlow'

import type { RevisionFlowType, PlaygroundConfig, QuickFixStatement, MindContent } from '../types'

// =============================================================================
// TYPES
// =============================================================================

export interface RevisionFlowModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  flowType: RevisionFlowType | null
  onFlowTypeChange: (flowType: RevisionFlowType | null) => void
  questionText: string
  onComplete: () => void
  config: PlaygroundConfig
}

// =============================================================================
// FLOW TITLES
// =============================================================================

const FLOW_TITLES: Record<RevisionFlowType, string> = {
  'quick-fix': 'Quick Fix',
  'add-to-mind': 'Add to Mind',
  'manual-fix': 'Manual Fix',
}

// =============================================================================
// COMPONENT
// =============================================================================

export function RevisionFlowModal({
  open,
  onOpenChange,
  flowType,
  onFlowTypeChange,
  questionText,
  onComplete,
  config,
}: RevisionFlowModalProps) {
  // Handle close
  const handleClose = useCallback(() => {
    onOpenChange(false)
    onFlowTypeChange(null)
  }, [onOpenChange, onFlowTypeChange])

  // Handle back to flow selection
  const handleBack = useCallback(() => {
    onFlowTypeChange(null)
  }, [onFlowTypeChange])

  // Handle quick fix complete
  const handleQuickFixComplete = useCallback(
    (_answers: QuickFixStatement[]) => {
      // In a real app, you'd process the answers here
      onComplete()
    },
    [onComplete]
  )

  // Handle add to mind complete
  const handleAddToMindComplete = useCallback(
    (_content: MindContent[]) => {
      // In a real app, you'd process the content here
      onComplete()
    },
    [onComplete]
  )

  // Handle manual fix complete
  const handleManualFixComplete = useCallback(
    (_answer: string) => {
      // In a real app, you'd process the answer here
      onComplete()
    },
    [onComplete]
  )

  // Handle flow selection
  const handleSelectFlow = useCallback(
    (type: RevisionFlowType) => {
      onFlowTypeChange(type)
    },
    [onFlowTypeChange]
  )

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* Backdrop */}
        <Dialog.Backdrop
          className={cn(
            'fixed inset-0 z-50 bg-black/30',
            'motion-safe:transition-opacity',
            'motion-safe:duration-200',
            'data-[starting-style]:opacity-0',
            'data-[ending-style]:opacity-0'
          )}
        />

        {/* Popup */}
        <Dialog.Popup
          className={cn(
            'fixed z-50',
            'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
            'w-[calc(100vw-96px)] max-w-lg max-h-[calc(100vh-96px)]',
            'bg-primary rounded-2xl shadow-2xl',
            'flex flex-col overflow-hidden',
            'motion-safe:transition-all',
            'motion-safe:duration-200',
            'data-[starting-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:translate-y-4',
            'data-[ending-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:translate-y-4'
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-primary">
            <div className="flex items-center gap-3">
              {flowType && (
                <button
                  type="button"
                  onClick={handleBack}
                  className={cn(
                    'p-1.5 rounded-lg',
                    'text-tertiary hover:text-primary',
                    'hover:bg-secondary',
                    'motion-safe:transition-colors motion-safe:duration-150'
                  )}
                >
                  <HugeIcon icon={ArrowLeft01Icon} size="sm" color="current" />
                </button>
              )}
              <Dialog.Title className="text-lg font-semibold text-primary">
                {flowType ? FLOW_TITLES[flowType] : 'Choose Fix Method'}
              </Dialog.Title>
            </div>
            <Dialog.Close
              className={cn(
                'p-2 rounded-lg',
                'text-tertiary hover:text-primary',
                'hover:bg-secondary',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary',
                'motion-safe:transition-colors motion-safe:duration-150'
              )}
            >
              <HugeIcon icon={Cancel01Icon} size="sm" color="current" />
            </Dialog.Close>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6">
            {!flowType && (
              <FlowSelector onSelect={handleSelectFlow} />
            )}

            {flowType === 'quick-fix' && (
              <QuickFixFlow
                questionCount={config.quickFixCount}
                onComplete={handleQuickFixComplete}
              />
            )}

            {flowType === 'add-to-mind' && (
              <AddToMindFlow onComplete={handleAddToMindComplete} />
            )}

            {flowType === 'manual-fix' && (
              <ManualFixFlow
                questionText={questionText}
                onComplete={handleManualFixComplete}
              />
            )}
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

// =============================================================================
// FLOW SELECTOR
// =============================================================================

interface FlowSelectorProps {
  onSelect: (flowType: RevisionFlowType) => void
}

function FlowSelector({ onSelect }: FlowSelectorProps) {
  const options: {
    type: RevisionFlowType
    label: string
    description: string
    icon: typeof Idea01Icon
  }[] = [
    {
      type: 'quick-fix',
      label: 'Quick Fix',
      description: '10 T/F questions',
      icon: Idea01Icon,
    },
    {
      type: 'add-to-mind',
      label: 'Add to Mind',
      description: 'Upload files/links',
      icon: File02Icon,
    },
    {
      type: 'manual-fix',
      label: 'Manual Fix',
      description: 'Type or speak',
      icon: Mic01Icon,
    },
  ]

  return (
    <div>
      <p className="text-sm text-tertiary text-center mb-6">
        Choose how you&apos;d like to improve this answer:
      </p>

      {/* Horizontal grid */}
      <div className="grid grid-cols-3 gap-3">
        {options.map((option) => (
          <button
            key={option.type}
            type="button"
            onClick={() => onSelect(option.type)}
            className={cn(
              'flex flex-col items-center p-4 rounded-xl text-center',
              'bg-secondary border border-primary',
              'hover:bg-tertiary hover:border-secondary',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary',
              'motion-safe:transition-all motion-safe:duration-150'
            )}
          >
            <div className="size-10 rounded-full bg-brand-primary/10 flex items-center justify-center mb-2">
              <HugeIcon icon={option.icon} size="sm" color="brand" />
            </div>
            <h4 className="text-sm font-medium text-primary mb-0.5">{option.label}</h4>
            <p className="text-xs text-tertiary">{option.description}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

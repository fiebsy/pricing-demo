/**
 * RevisionModal Component
 *
 * Modal wrapper for improvement flows.
 * Shows flow selection menu with Quick Fix / Add to Mind / Manual Fix options.
 * Add to Mind shows upload suggestions ranked by impact score.
 *
 * @module b/profile/components
 */

'use client'

import * as React from 'react'
import { useState, useCallback } from 'react'
import { Dialog } from '@base-ui/react/dialog'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import Cancel01Icon from '@hugeicons-pro/core-stroke-rounded/Cancel01Icon'
import SparklesIcon from '@hugeicons-pro/core-stroke-rounded/SparklesIcon'
import Brain01Icon from '@hugeicons-pro/core-stroke-rounded/Brain01Icon'
import Edit01Icon from '@hugeicons-pro/core-stroke-rounded/Edit01Icon'
import Upload01Icon from '@hugeicons-pro/core-stroke-rounded/Upload01Icon'
import ArrowRight01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowRight01Icon'
// Upload suggestion icons - verified to exist in hugeicons-pro
import File01Icon from '@hugeicons-pro/core-stroke-rounded/File01Icon'
import Video01Icon from '@hugeicons-pro/core-stroke-rounded/Video01Icon'
import Award01Icon from '@hugeicons-pro/core-stroke-rounded/Award01Icon'
import Book02Icon from '@hugeicons-pro/core-stroke-rounded/Book02Icon'
import Comment01Icon from '@hugeicons-pro/core-stroke-rounded/Comment01Icon'
import CodeIcon from '@hugeicons-pro/core-stroke-rounded/CodeIcon'
import Certificate01Icon from '@hugeicons-pro/core-stroke-rounded/Certificate01Icon'
import Presentation01Icon from '@hugeicons-pro/core-stroke-rounded/Presentation01Icon'
import Mail01Icon from '@hugeicons-pro/core-stroke-rounded/Mail01Icon'
import ChartLineData01Icon from '@hugeicons-pro/core-stroke-rounded/ChartLineData01Icon'
import Mic01Icon from '@hugeicons-pro/core-stroke-rounded/Mic01Icon'
import Share01Icon from '@hugeicons-pro/core-stroke-rounded/Share01Icon'
import Image01Icon from '@hugeicons-pro/core-stroke-rounded/Image01Icon'
import Image02Icon from '@hugeicons-pro/core-stroke-rounded/Image02Icon'
import PaintBrush01Icon from '@hugeicons-pro/core-stroke-rounded/PaintBrush01Icon'
import Link01Icon from '@hugeicons-pro/core-stroke-rounded/Link01Icon'
import { QuickFixFlow, ManualFixFlow } from '@/app/playground/edit-questions/components'
import { getCategoryById, getUploadSuggestions } from '../constants'
import type { RevisionModalProps, RevisionFlowType, UploadSuggestion, CategoryType } from '../types'

// =============================================================================
// ICON MAPPING FOR UPLOAD SUGGESTIONS
// =============================================================================

const uploadIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  // Use File01Icon as fallback for most items
  Linkedin01Icon: Link01Icon,
  File01Icon,
  Video01Icon,
  Award01Icon,
  Book02Icon,
  Comment01Icon,
  SourceCode01Icon: CodeIcon,
  Podcast01Icon: Mic01Icon,
  Certificate01Icon,
  Presentation01Icon,
  Mail01Icon,
  ChartLineData01Icon,
  Mic01Icon,
  Edit01Icon,
  Share01Icon,
  Image01Icon,
  Gallery01Icon: Image02Icon,
  PaintBrush01Icon,
  ColorPicker01Icon: PaintBrush01Icon,
}

// =============================================================================
// FLOW SELECTOR
// =============================================================================

interface FlowSelectorProps {
  onSelect: (flow: RevisionFlowType) => void
  categoryLabel: string
}

function FlowSelector({ onSelect, categoryLabel }: FlowSelectorProps) {
  const flows = [
    {
      id: 'quick-fix' as const,
      label: 'Quick Fix',
      description: 'Answer true/false statements to clarify your profile',
      icon: SparklesIcon,
    },
    {
      id: 'add-to-mind' as const,
      label: 'Add to Mind',
      description: 'Upload files, links, or text to expand knowledge',
      icon: Brain01Icon,
    },
    {
      id: 'manual-fix' as const,
      label: 'Manual Fix',
      description: 'Write or record your own clarifications',
      icon: Edit01Icon,
    },
  ]

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-primary mb-1">
          Improve {categoryLabel}
        </h3>
        <p className="text-sm text-tertiary">
          Choose how you'd like to improve this category
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {flows.map((flow) => (
          <button
            key={flow.id}
            type="button"
            onClick={() => onSelect(flow.id)}
            className={cn(
              'flex items-center gap-4 p-4 rounded-xl',
              'bg-secondary hover:bg-tertiary',
              'border border-primary',
              'text-left',
              'motion-safe:transition-colors motion-safe:duration-150',
              'motion-reduce:transition-none'
            )}
          >
            <div className="size-10 rounded-lg bg-brand-primary/10 flex items-center justify-center shrink-0">
              <HugeIcon icon={flow.icon} size={20} className="text-brand-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="block text-sm font-medium text-primary">{flow.label}</span>
              <span className="block text-xs text-tertiary mt-0.5">{flow.description}</span>
            </div>
            <HugeIcon icon={ArrowRight01Icon} size={16} className="text-tertiary shrink-0" />
          </button>
        ))}
      </div>
    </div>
  )
}

// =============================================================================
// ADD TO MIND FLOW (with upload suggestions)
// =============================================================================

interface AddToMindFlowProps {
  categoryId: CategoryType
  categoryLabel: string
  onComplete: () => void
}

function AddToMindFlow({ categoryId, categoryLabel, onComplete }: AddToMindFlowProps) {
  const suggestions = getUploadSuggestions(categoryId)

  const handleSuggestionClick = (suggestion: UploadSuggestion) => {
    // In a real app, this would open a file picker or link input
    console.log('Selected upload:', suggestion.label)
    // For demo, just complete the flow
    onComplete()
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="text-center mb-2">
        <h3 className="text-base font-semibold text-primary mb-1">
          Add to {categoryLabel}
        </h3>
        <p className="text-sm text-tertiary">
          Upload content to improve this area. Top suggestions have higher impact.
        </p>
      </div>

      {/* Suggestions list */}
      <div className="flex flex-col gap-2">
        {suggestions.map((suggestion) => {
          const Icon = uploadIconMap[suggestion.icon] || File01Icon
          const isHighImpact = suggestion.impactScore >= 9

          return (
            <button
              key={suggestion.id}
              type="button"
              onClick={() => handleSuggestionClick(suggestion)}
              className={cn(
                'flex items-center gap-3 p-3 rounded-xl',
                'text-left',
                'border',
                'motion-safe:transition-all motion-safe:duration-150',
                'motion-reduce:transition-none',
                isHighImpact
                  ? 'bg-brand-primary/5 border-brand-primary/20 hover:bg-brand-primary/10'
                  : 'bg-secondary/50 border-primary hover:bg-secondary'
              )}
            >
              {/* Icon */}
              <div
                className={cn(
                  'size-9 rounded-lg flex items-center justify-center shrink-0',
                  isHighImpact ? 'bg-brand-primary/15' : 'bg-quaternary'
                )}
              >
                <HugeIcon
                  icon={Icon}
                  size={18}
                  strokeWidth={1.5}
                  className={isHighImpact ? 'text-brand-primary' : 'text-secondary'}
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-primary">{suggestion.label}</span>
                  {isHighImpact && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-brand-primary/10 text-brand-primary">
                      High Impact
                    </span>
                  )}
                </div>
                <span className="block text-xs text-tertiary mt-0.5">{suggestion.description}</span>
              </div>

              {/* Impact score */}
              <div className="shrink-0 flex flex-col items-end">
                <span className="text-xs font-medium text-tertiary">Impact</span>
                <span
                  className={cn(
                    'text-sm font-semibold tabular-nums',
                    isHighImpact ? 'text-brand-primary' : 'text-secondary'
                  )}
                >
                  {suggestion.impactScore}/10
                </span>
              </div>
            </button>
          )
        })}
      </div>

      {/* Generic upload option */}
      <button
        type="button"
        onClick={onComplete}
        className={cn(
          'flex items-center justify-center gap-2 p-3 rounded-xl',
          'bg-quaternary hover:bg-tertiary',
          'border border-dashed border-secondary',
          'text-sm text-tertiary',
          'motion-safe:transition-colors motion-safe:duration-150',
          'motion-reduce:transition-none'
        )}
      >
        <HugeIcon icon={Upload01Icon} size={18} />
        Upload other content
      </button>
    </div>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function RevisionModal({
  isOpen,
  flowType,
  targetCategory,
  targetSection,
  onClose,
  onComplete,
}: RevisionModalProps) {
  const [selectedFlow, setSelectedFlow] = useState<RevisionFlowType | null>(flowType)
  const category = targetCategory ? getCategoryById(targetCategory) : null

  const handleFlowSelect = useCallback((flow: RevisionFlowType) => {
    setSelectedFlow(flow)
  }, [])

  const handleBack = useCallback(() => {
    setSelectedFlow(null)
  }, [])

  const handleComplete = useCallback(() => {
    setSelectedFlow(null)
    onComplete()
  }, [onComplete])

  // Reset selected flow when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setSelectedFlow(flowType)
    }
  }, [isOpen, flowType])

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Backdrop
          className={cn(
            'fixed inset-0 bg-black/50',
            'motion-safe:transition-opacity motion-safe:duration-200',
            'motion-reduce:transition-none',
            'data-[starting-style]:opacity-0',
            'data-[ending-style]:opacity-0'
          )}
        />
        <Dialog.Popup
          className={cn(
            'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
            'w-full max-w-md max-h-[85vh]',
            'bg-primary rounded-2xl shadow-xl',
            'overflow-hidden flex flex-col',
            'motion-safe:transition-all motion-safe:duration-200',
            'motion-reduce:transition-none',
            'data-[starting-style]:opacity-0 data-[starting-style]:scale-95',
            'data-[ending-style]:opacity-0 data-[ending-style]:scale-95'
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-primary">
            {selectedFlow ? (
              <button
                type="button"
                onClick={handleBack}
                className={cn(
                  'text-sm font-medium text-brand-primary',
                  'hover:underline'
                )}
              >
                Back
              </button>
            ) : (
              <div />
            )}
            <Dialog.Title className="text-sm font-medium text-primary">
              {selectedFlow ? getFlowTitle(selectedFlow) : 'Improve Score'}
            </Dialog.Title>
            <Dialog.Close
              className={cn(
                'size-8 rounded-lg flex items-center justify-center',
                'text-tertiary hover:text-primary hover:bg-secondary',
                'motion-safe:transition-colors motion-safe:duration-150',
                'motion-reduce:transition-none'
              )}
            >
              <HugeIcon icon={Cancel01Icon} size={20} strokeWidth={1.5} />
            </Dialog.Close>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {!selectedFlow && category && (
              <FlowSelector onSelect={handleFlowSelect} categoryLabel={category.label} />
            )}

            {selectedFlow === 'quick-fix' && (
              <div className="p-4">
                <QuickFixFlow questionCount={5} onComplete={handleComplete} />
              </div>
            )}

            {selectedFlow === 'add-to-mind' && category && targetCategory && (
              <AddToMindFlow
                categoryId={targetCategory}
                categoryLabel={category.label}
                onComplete={handleComplete}
              />
            )}

            {selectedFlow === 'manual-fix' && (
              <div className="p-4">
                <ManualFixFlow
                  questionText={`How would you describe your ${category?.label.toLowerCase() || 'profile'}?`}
                  onComplete={handleComplete}
                />
              </div>
            )}
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

// =============================================================================
// HELPERS
// =============================================================================

function getFlowTitle(flow: RevisionFlowType): string {
  const titles: Record<RevisionFlowType, string> = {
    'quick-fix': 'Quick Fix',
    'add-to-mind': 'Add to Mind',
    'manual-fix': 'Manual Fix',
  }
  return titles[flow]
}

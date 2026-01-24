/**
 * QuickFixModal - Modal with full flow navigation
 *
 * Uses proper flow sheet components with:
 * - Tinder-style SwipeableCard for Quick Fix
 * - Full file/link/text upload for Add to Mind
 * - Voice recording support for Manual Fix
 *
 * @module playground/quick-fix-modal/core
 */

'use client'

import * as React from 'react'
import { Dialog } from '@base-ui/react/dialog'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import ArrowLeft01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowLeft01Icon'
import Cancel01Icon from '@hugeicons-pro/core-stroke-rounded/Cancel01Icon'
import CheckmarkCircle02Icon from '@hugeicons-pro/core-stroke-rounded/CheckmarkCircle02Icon'
import { FlowSelector, type FlowType } from '../../quick-fix-interactions/core/FlowSelector'
import {
  SwipeableCard,
  ActionButtons,
  ProgressBar,
  CompletionState,
} from '../../quick-fix-interactions/core'
import type { QuickFixModalConfig, IntegrationConfig } from '../config/types'

// =============================================================================
// SAMPLE DATA
// =============================================================================

const SAMPLE_STATEMENTS = [
  { id: 's1', text: 'I prefer working independently rather than in teams.' },
  { id: 's2', text: 'I enjoy learning new technologies and tools.' },
  { id: 's3', text: 'I prioritize quality over speed in my work.' },
  { id: 's4', text: 'I am comfortable presenting to large groups.' },
  { id: 's5', text: 'I thrive in fast-paced environments.' },
]

const MEMORY_BULLETS = [
  'Updated your work preferences',
  'Improved profile accuracy by 12%',
  'New recommendations available',
]

// =============================================================================
// TYPES
// =============================================================================

type ModalView = 'selector' | 'quick-fix' | 'add-to-mind' | 'manual-fix' | 'complete'

export interface QuickFixModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  config: QuickFixModalConfig
  integration?: IntegrationConfig
  categoryName?: string
  onComplete?: () => void
  className?: string
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function QuickFixModal({
  open,
  onOpenChange,
  config,
  integration,
  categoryName = '',
  onComplete,
  className,
}: QuickFixModalProps) {
  const { modal, animation } = config
  const [currentView, setCurrentView] = React.useState<ModalView>('selector')

  // Reset state when modal closes
  React.useEffect(() => {
    if (!open) {
      setCurrentView('selector')
    }
  }, [open])

  // Build style classes
  const bgClass = `bg-${modal.background}`
  const shineClass = modal.shine !== 'none' ? `${modal.shine}${modal.shineIntensity}` : ''
  const cornerClass = modal.cornerShape === 'squircle' ? 'corner-squircle' : ''
  const goldBorderClass = modal.goldBorder ? 'ring-1 ring-yellow-500/30' : ''

  const handleClose = () => onOpenChange(false)

  const handleBack = () => setCurrentView('selector')

  const handleFlowSelect = (flow: FlowType) => {
    setCurrentView(flow as ModalView)
  }

  const handleFlowComplete = () => {
    setCurrentView('complete')
  }

  const handleDone = () => {
    onComplete?.()
    if (integration?.onCompleteAction === 'close') {
      handleClose()
    }
  }

  // Get title based on current view
  const getTitle = () => {
    switch (currentView) {
      case 'selector':
        return 'Choose Method'
      case 'quick-fix':
        return 'Quick Fix'
      case 'add-to-mind':
        return 'Add to Mind'
      case 'manual-fix':
        return 'Manual Fix'
      case 'complete':
        return 'Complete'
      default:
        return integration?.headerTitle?.replace('{category}', categoryName) || 'Improve Answer'
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* Backdrop */}
        <Dialog.Backdrop
          className={cn(
            'fixed inset-0 z-50 bg-black/60',
            'motion-safe:transition-opacity motion-safe:duration-300',
            'data-[starting-style]:opacity-0 data-[ending-style]:opacity-0'
          )}
          style={{
            backdropFilter: modal.backdropBlur > 0 ? `blur(${modal.backdropBlur}px)` : undefined,
          }}
        />

        {/* Popup */}
        <Dialog.Popup
          className={cn(
            'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50',
            'w-full shadow-2xl overflow-hidden',
            bgClass, shineClass, cornerClass, goldBorderClass,
            'transform-gpu motion-safe:transition-all',
            'data-[starting-style]:scale-95 data-[starting-style]:opacity-0',
            'data-[ending-style]:scale-95 data-[ending-style]:opacity-0',
            className
          )}
          style={{
            maxWidth: modal.maxWidth,
            borderRadius: modal.borderRadius,
            transitionDuration: `${animation.sheetTransition}ms`,
            transitionTimingFunction: animation.easing,
          }}
        >
          <Dialog.Title className="sr-only">{getTitle()}</Dialog.Title>

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-primary">
            <div className="w-10 flex justify-start">
              {currentView !== 'selector' && currentView !== 'complete' && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="p-2 -ml-2 rounded-lg text-secondary hover:text-primary hover:bg-tertiary motion-safe:transition-colors"
                >
                  <HugeIcon icon={ArrowLeft01Icon} size={20} />
                </button>
              )}
            </div>
            <h2 className="text-lg font-semibold text-primary">{getTitle()}</h2>
            <div className="w-10 flex justify-end">
              <button
                type="button"
                onClick={handleClose}
                className="p-2 -mr-2 rounded-lg text-secondary hover:text-primary hover:bg-tertiary motion-safe:transition-colors"
              >
                <HugeIcon icon={Cancel01Icon} size={20} />
              </button>
            </div>
          </div>

          {/* Content - scrollable with max height, overflow-x-hidden prevents scrollbar during card exit animation */}
          <div className="p-6 max-h-[70vh] overflow-y-auto overflow-x-hidden">
            {currentView === 'selector' && (
              <FlowSelector
                onSelect={handleFlowSelect}
                config={config.flowOptions}
                selectedFlow={null}
              />
            )}

            {currentView === 'quick-fix' && (
              <QuickFixContent config={config} onComplete={handleFlowComplete} />
            )}

            {currentView === 'add-to-mind' && (
              <AddToMindContent config={config} onComplete={handleFlowComplete} />
            )}

            {currentView === 'manual-fix' && (
              <ManualFixContent config={config} onComplete={handleFlowComplete} />
            )}

            {currentView === 'complete' && (
              <CompleteContent config={config} onDone={handleDone} />
            )}
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

// =============================================================================
// QUICK FIX CONTENT - Tinder-style swiping cards
// =============================================================================

function QuickFixContent({
  config,
  onComplete,
}: {
  config: QuickFixModalConfig
  onComplete: () => void
}) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isComplete, setIsComplete] = React.useState(false)
  const [triggerDirection, setTriggerDirection] = React.useState<'left' | 'right' | null>(null)

  const handleSwipe = React.useCallback((isTrue: boolean) => {
    setTriggerDirection(null)
    console.log(`Answered: ${isTrue ? 'True' : 'False'}`)

    if (currentIndex + 1 >= SAMPLE_STATEMENTS.length) {
      setIsComplete(true)
    } else {
      setCurrentIndex((prev) => prev + 1)
    }
  }, [currentIndex])

  const handleButtonSwipe = React.useCallback((direction: 'left' | 'right') => {
    setTriggerDirection(direction)
  }, [])

  const handleContinue = React.useCallback(() => {
    onComplete()
  }, [onComplete])

  if (isComplete) {
    return (
      <CompletionState
        onContinue={handleContinue}
        bullets={MEMORY_BULLETS}
        config={config.completion}
      />
    )
  }

  return (
    <div className="flex flex-col items-center">
      {/* Progress */}
      <div className="mb-6 w-full flex justify-center">
        <ProgressBar
          current={currentIndex}
          total={SAMPLE_STATEMENTS.length}
          config={config.progress}
        />
      </div>

      {/* Instructions */}
      <p className="text-sm text-tertiary mb-6 text-center">
        Swipe right if true, left if false
      </p>

      {/* Card stack */}
      <div
        className="relative mb-6"
        style={{
          width: config.card.width,
          height: config.card.height,
        }}
      >
        {SAMPLE_STATEMENTS.map((statement, index) => {
          const position = index - currentIndex
          if (position < 0) return null

          return (
            <SwipeableCard
              key={statement.id}
              text={statement.text}
              isActive={position === 0}
              position={position}
              onSwipe={handleSwipe}
              cardConfig={config.card}
              swipeConfig={config.swipe}
              triggerDirection={position === 0 ? triggerDirection : null}
            />
          )
        })}
      </div>

      {/* Action buttons */}
      <ActionButtons
        onSwipe={handleButtonSwipe}
        config={config.actionButtons}
      />
    </div>
  )
}

// =============================================================================
// ADD TO MIND CONTENT - File/link/text upload
// =============================================================================

import { HugeIcon as Icon } from '@/components/ui/prod/base/icon'
import FolderUploadIcon from '@hugeicons-pro/core-stroke-rounded/FolderUploadIcon'
import Link01Icon from '@hugeicons-pro/core-stroke-rounded/Link01Icon'
import TextIcon from '@hugeicons-pro/core-stroke-rounded/TextIcon'
import Delete01Icon from '@hugeicons-pro/core-stroke-rounded/Delete01Icon'
import { Button } from '@/components/ui/prod/base/button'

interface MindContent {
  id: string
  type: 'file' | 'link' | 'text'
  name: string
  url?: string
  content?: string
}

function AddToMindContent({
  config,
  onComplete,
}: {
  config: QuickFixModalConfig
  onComplete: () => void
}) {
  const [content, setContent] = React.useState<MindContent[]>([])
  const [showLinkInput, setShowLinkInput] = React.useState(false)
  const [showTextInput, setShowTextInput] = React.useState(false)
  const [linkValue, setLinkValue] = React.useState('')
  const [textValue, setTextValue] = React.useState('')

  const generateId = () => `mc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

  const handleFileUpload = React.useCallback(() => {
    const fileName = `Document_${content.length + 1}.pdf`
    setContent((prev) => [
      ...prev,
      { id: generateId(), type: 'file', name: fileName },
    ])
  }, [content.length])

  const handleAddLink = React.useCallback(() => {
    if (!linkValue.trim()) return
    setContent((prev) => [
      ...prev,
      { id: generateId(), type: 'link', name: linkValue, url: linkValue },
    ])
    setLinkValue('')
    setShowLinkInput(false)
  }, [linkValue])

  const handleAddText = React.useCallback(() => {
    if (!textValue.trim()) return
    const preview = textValue.slice(0, 30) + (textValue.length > 30 ? '...' : '')
    setContent((prev) => [
      ...prev,
      { id: generateId(), type: 'text', name: preview, content: textValue },
    ])
    setTextValue('')
    setShowTextInput(false)
  }, [textValue])

  const handleRemove = React.useCallback((id: string) => {
    setContent((prev) => prev.filter((c) => c.id !== id))
  }, [])

  const getIcon = (type: MindContent['type']) => {
    switch (type) {
      case 'file': return FolderUploadIcon
      case 'link': return Link01Icon
      case 'text': return TextIcon
    }
  }

  const shineClass = config.flowOptions.shine !== 'none'
    ? `${config.flowOptions.shine}${config.flowOptions.shineIntensity}`
    : ''
  const cornerClass = config.flowOptions.cornerShape === 'squircle' ? 'corner-squircle' : ''

  return (
    <div className="flex flex-col">
      <h3 className="text-lg font-semibold text-primary mb-2">Add to Mind</h3>
      <p className="text-sm text-tertiary mb-6">
        Upload files, links, or text that contains relevant information.
      </p>

      {/* Upload options */}
      <div className="space-y-3 mb-6">
        {[
          { icon: FolderUploadIcon, label: 'Upload File', desc: 'PDF, DOC, TXT, or images', onClick: handleFileUpload },
          { icon: Link01Icon, label: 'Add Link', desc: 'Paste a URL to web content', onClick: () => setShowLinkInput(true) },
          { icon: TextIcon, label: 'Add Text', desc: 'Type or paste text directly', onClick: () => setShowTextInput(true) },
        ].map((opt) => (
          <button
            key={opt.label}
            type="button"
            onClick={opt.onClick}
            className={cn(
              'w-full p-4 text-left',
              'bg-secondary border border-primary',
              'hover:bg-tertiary hover:border-secondary',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary',
              'motion-safe:transition-all motion-safe:duration-150',
              shineClass,
              cornerClass
            )}
            style={{ borderRadius: config.flowOptions.cardBorderRadius }}
          >
            <div className="flex items-center gap-3">
              <div
                className="rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0"
                style={{
                  width: config.flowOptions.iconCircleSize,
                  height: config.flowOptions.iconCircleSize,
                }}
              >
                <Icon icon={opt.icon} size="sm" color="brand" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-primary">{opt.label}</h4>
                <p className="text-xs text-tertiary">{opt.desc}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Link input */}
      {showLinkInput && (
        <div className="mb-4 p-4 rounded-xl bg-secondary border border-primary">
          <input
            type="url"
            value={linkValue}
            onChange={(e) => setLinkValue(e.target.value)}
            placeholder="https://..."
            className={cn(
              'w-full px-3 py-2 rounded-lg mb-3',
              'bg-primary border border-primary',
              'text-primary placeholder:text-tertiary',
              'focus:outline-none focus:ring-2 focus:ring-brand-primary'
            )}
            autoFocus
          />
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowLinkInput(false)}
              className="px-3 py-1.5 text-xs font-medium text-tertiary hover:text-primary"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleAddLink}
              disabled={!linkValue.trim()}
              className={cn(
                'px-3 py-1.5 rounded-lg',
                'text-xs font-medium text-white',
                'bg-brand-solid hover:bg-brand-solid-hover',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
            >
              Add
            </button>
          </div>
        </div>
      )}

      {/* Text input */}
      {showTextInput && (
        <div className="mb-4 p-4 rounded-xl bg-secondary border border-primary">
          <textarea
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            placeholder="Type or paste your text here..."
            rows={4}
            className={cn(
              'w-full px-3 py-2 rounded-lg mb-3 resize-none',
              'bg-primary border border-primary',
              'text-primary placeholder:text-tertiary',
              'focus:outline-none focus:ring-2 focus:ring-brand-primary'
            )}
            autoFocus
          />
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowTextInput(false)}
              className="px-3 py-1.5 text-xs font-medium text-tertiary hover:text-primary"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleAddText}
              disabled={!textValue.trim()}
              className={cn(
                'px-3 py-1.5 rounded-lg',
                'text-xs font-medium text-white',
                'bg-brand-solid hover:bg-brand-solid-hover',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
            >
              Add
            </button>
          </div>
        </div>
      )}

      {/* Added content list */}
      {content.length > 0 && (
        <div className="mb-6">
          <h4 className="text-xs font-medium text-tertiary uppercase tracking-wider mb-3">
            Added Content ({content.length})
          </h4>
          <div className="space-y-2">
            {content.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary border border-primary"
              >
                <div className="flex items-center gap-3">
                  <Icon icon={getIcon(item.type)} size="sm" color="tertiary" />
                  <span className="text-sm text-primary">{item.name}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemove(item.id)}
                  className={cn(
                    'p-1.5 rounded-md',
                    'text-tertiary hover:text-error-primary',
                    'hover:bg-error-primary/10',
                    'motion-safe:transition-colors motion-safe:duration-150'
                  )}
                >
                  <Icon icon={Delete01Icon} size="xs" color="current" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Complete button */}
      <Button
        variant="primary"
        size="lg"
        roundness={config.flowOptions.cornerShape === 'squircle' ? 'squircle' : 'default'}
        onClick={onComplete}
        disabled={content.length === 0}
        className="w-full"
      >
        {content.length === 0
          ? 'Add content to continue'
          : `Process ${content.length} item${content.length === 1 ? '' : 's'}`}
      </Button>
    </div>
  )
}

// =============================================================================
// MANUAL FIX CONTENT - Text/voice input
// =============================================================================

import Mic01Icon from '@hugeicons-pro/core-stroke-rounded/Mic01Icon'
import MicOff01Icon from '@hugeicons-pro/core-stroke-rounded/MicOff01Icon'
import StarIcon from '@hugeicons-pro/core-stroke-rounded/StarIcon'

function ManualFixContent({
  config,
  onComplete,
}: {
  config: QuickFixModalConfig
  onComplete: () => void
}) {
  const [inputValue, setInputValue] = React.useState('')
  const [isRecording, setIsRecording] = React.useState(false)

  const shineClass = config.flowOptions.shine !== 'none'
    ? `${config.flowOptions.shine}${config.flowOptions.shineIntensity}`
    : ''
  const cornerClass = config.flowOptions.cornerShape === 'squircle' ? 'corner-squircle' : ''
  const borderRadius = config.flowOptions.cardBorderRadius

  const handleToggleRecording = React.useCallback(() => {
    if (isRecording) {
      setIsRecording(false)
      setInputValue((prev) => {
        const transcription =
          'I believe the answer involves careful consideration of multiple factors and a balanced approach that takes into account both short-term needs and long-term goals.'
        return prev ? `${prev}\n\n${transcription}` : transcription
      })
    } else {
      setIsRecording(true)
      setTimeout(() => {
        setIsRecording(false)
        setInputValue((prev) => {
          const transcription =
            'I believe the answer involves careful consideration of multiple factors and a balanced approach that takes into account both short-term needs and long-term goals.'
          return prev ? `${prev}\n\n${transcription}` : transcription
        })
      }, 3000)
    }
  }, [isRecording])

  const charCount = inputValue.length
  const minChars = 50
  const isValid = charCount >= minChars

  return (
    <div className="flex flex-col">
      {/* Question reference */}
      <div
        className={cn(
          'mb-6 p-4 bg-secondary border border-primary',
          shineClass,
          cornerClass
        )}
        style={{ borderRadius }}
      >
        <h4 className="text-xs font-medium text-tertiary uppercase tracking-wider mb-2">
          Question
        </h4>
        <p className="text-primary">How do you typically approach problem-solving in your work?</p>
      </div>

      <h3 className="text-lg font-semibold text-primary mb-2">Provide Your Answer</h3>
      <p className="text-sm text-tertiary mb-6">
        Type your answer below or use voice input to dictate your response.
      </p>

      {/* Input area */}
      <div className="relative mb-4">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Start typing your answer here..."
          rows={6}
          className={cn(
            'w-full px-4 py-3 resize-none',
            'bg-secondary border border-primary',
            'text-primary placeholder:text-tertiary',
            'focus:outline-none focus:ring-2 focus:ring-brand-primary',
            'motion-safe:transition-colors motion-safe:duration-150',
            shineClass,
            cornerClass
          )}
          style={{ borderRadius }}
        />

        {/* Voice button */}
        <button
          type="button"
          onClick={handleToggleRecording}
          className={cn(
            'absolute bottom-3 right-3 p-2 rounded-lg',
            'motion-safe:transition-all motion-safe:duration-150',
            isRecording
              ? 'bg-error-primary text-white animate-pulse'
              : 'bg-tertiary text-tertiary hover:text-primary hover:bg-secondary'
          )}
        >
          <Icon
            icon={isRecording ? MicOff01Icon : Mic01Icon}
            size="sm"
            color="current"
          />
        </button>
      </div>

      {/* Character count and recording status */}
      <div className="flex items-center justify-between mb-6">
        <span
          className={cn(
            'text-xs',
            isValid ? 'text-success-primary' : 'text-tertiary'
          )}
        >
          {charCount} / {minChars} min characters
        </span>
        {isRecording && (
          <span className="inline-flex items-center gap-1.5 text-xs text-error-primary">
            <span className="size-2 rounded-full bg-error-primary animate-pulse" />
            Recording...
          </span>
        )}
      </div>

      {/* Tips */}
      <div
        className={cn(
          'mb-6 p-4 bg-brand-primary/5 border border-brand-primary/20',
          cornerClass
        )}
        style={{ borderRadius }}
      >
        <div className="flex items-start gap-3">
          <Icon icon={StarIcon} size="sm" color="brand" className="mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-primary mb-1">Tips for a great answer</h4>
            <ul className="text-xs text-secondary space-y-1">
              <li>• Be specific with examples when possible</li>
              <li>• Explain your reasoning or approach</li>
              <li>• Keep it concise but comprehensive</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Complete button */}
      <Button
        variant="primary"
        size="lg"
        roundness={config.flowOptions.cornerShape === 'squircle' ? 'squircle' : 'default'}
        onClick={onComplete}
        disabled={!isValid}
        className="w-full"
      >
        {isValid
          ? 'Save Answer'
          : `Add ${minChars - charCount} more characters`}
      </Button>
    </div>
  )
}

// =============================================================================
// COMPLETE CONTENT - Success state with memory bullets
// =============================================================================

function CompleteContent({
  config,
  onDone,
}: {
  config: QuickFixModalConfig
  onDone: () => void
}) {
  return (
    <CompletionState
      onContinue={onDone}
      bullets={MEMORY_BULLETS}
      config={config.completion}
    />
  )
}

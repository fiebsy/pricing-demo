/**
 * EditQuestionsModal - Main modal orchestrator
 *
 * Single-column layout with:
 * - Menu View: Questions list with add input
 * - Detail View: Answer preview with question input
 *
 * This component orchestrates state and delegates rendering to view components.
 *
 * @module playground/edit-questions/components
 */

'use client'

import * as React from 'react'
import { useEffect, useMemo } from 'react'
import { Dialog } from '@base-ui/react/dialog'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import Cancel01Icon from '@hugeicons-pro/core-stroke-rounded/Cancel01Icon'
import ArrowLeft01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowLeft01Icon'

import { RevisionFlowModal } from './RevisionFlowModal'
import { ProcessingMeter } from './ProcessingMeter'
import { MenuView } from '../views/MenuView'
import { DetailView } from '../views/DetailView'

import type { Question, PlaygroundConfig } from '../../types'
import { useModalState, useProcessingSimulation, useModalHandlers } from '../../hooks'
import { useQuestionsService } from '../../services'
import { MODAL_WIDTH_MAP } from '../../constants'

// =============================================================================
// TYPES
// =============================================================================

export interface EditQuestionsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  questions: Question[]
  onQuestionsChange: (questions: Question[]) => void
  config: PlaygroundConfig
  /** Called when a revision flow completes (for StatusBar integration) */
  onRevisionComplete?: () => void
}

// =============================================================================
// COMPONENT
// =============================================================================

export function EditQuestionsModal({
  open,
  onOpenChange,
  questions,
  onQuestionsChange,
  config,
  onRevisionComplete,
}: EditQuestionsModalProps) {
  // ---------------------------------------------------------------------------
  // 1. Initialize hooks
  // ---------------------------------------------------------------------------
  const modal = useModalState()
  const questionsService = useQuestionsService({
    questions,
    onQuestionsChange,
  })

  // ---------------------------------------------------------------------------
  // 2. Processing simulation
  // ---------------------------------------------------------------------------
  const processing = useProcessingSimulation({
    duration: config.delayMs,
    modal,
    onComplete: () => {
      // After processing, regenerate answer with good response
      if (modal.state.selectedQuestionId) {
        questionsService
          .generateAnswer({
            questionId: modal.state.selectedQuestionId,
            responseType: 'good',
            simulateDelay: false,
            delayMs: 0,
          })
          .then(() => {
            modal.setAnswerState('success')
            modal.addNotification('Answer regenerated successfully')
            setTimeout(() => modal.clearToolbarStatus(), 2000)
            // Notify parent for StatusBar integration
            onRevisionComplete?.()
          })
      }
    },
  })

  // ---------------------------------------------------------------------------
  // 3. Handlers
  // ---------------------------------------------------------------------------
  const handlers = useModalHandlers({
    modal,
    questionsService,
    questions,
    config,
    processing,
  })

  // ---------------------------------------------------------------------------
  // 4. Derived state
  // ---------------------------------------------------------------------------
  const selectedQuestion = useMemo(
    () => questions.find((q) => q.id === modal.state.selectedQuestionId),
    [questions, modal.state.selectedQuestionId]
  )

  const sortedQuestions = useMemo(() => {
    const statusOrder = ['orphaned', 'pending', 'answered'] as const
    return [...questions].sort(
      (a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
    )
  }, [questions])

  const stats = useMemo(
    () => ({
      answered: questions.filter((q) => q.status === 'answered').length,
      orphaned: questions.filter((q) => q.status === 'orphaned').length,
    }),
    [questions]
  )

  const isDetailView = !!modal.state.selectedQuestionId
  const selectedQuestionText =
    selectedQuestion?.text ?? handlers.pendingQuestionTextRef.current ?? undefined

  // ---------------------------------------------------------------------------
  // 5. Sync effect - keep open state in sync with external prop
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (open && !modal.isOpen) {
      modal.openModal()
    } else if (!open && modal.isOpen) {
      modal.closeModal()
      processing.stop()
    }
  }, [open, modal, processing])

  // ---------------------------------------------------------------------------
  // 6. Render
  // ---------------------------------------------------------------------------
  const modalWidth =
    config.modalWidth === 'custom'
      ? `${config.customModalWidth}px`
      : MODAL_WIDTH_MAP[config.modalWidth]

  const handleDialogOpenChange = (newOpen: boolean) => {
    handlers.handleOpenChange(newOpen)
    onOpenChange(newOpen)
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleDialogOpenChange}>
      <Dialog.Portal>
        {/* Backdrop */}
        <Dialog.Backdrop
          className={cn(
            'fixed inset-0 z-50 bg-black/50',
            'motion-safe:transition-opacity',
            'motion-safe:duration-200',
            'data-[starting-style]:opacity-0',
            'data-[ending-style]:opacity-0'
          )}
          style={{ opacity: config.backdropOpacity / 100 }}
        />

        {/* Popup */}
        <Dialog.Popup
          className={cn(
            'fixed z-50',
            'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
            'w-[calc(100vw-48px)] max-h-[calc(100vh-48px)]',
            'bg-primary rounded-2xl shadow-2xl',
            'flex flex-col overflow-hidden',
            'motion-safe:transition-all',
            'motion-safe:duration-200',
            'data-[starting-style]:opacity-0 data-[starting-style]:scale-95',
            'data-[ending-style]:opacity-0 data-[ending-style]:scale-95',
            // Nested dialog styling
            'data-[nested-dialog-open]:brightness-90',
            'data-[nested-dialog-open]:scale-[0.98]'
          )}
          style={{ maxWidth: modalWidth }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-primary">
            {/* Left side - Back button or spacer */}
            <div className="w-10">
              {isDetailView && (
                <button
                  type="button"
                  onClick={() => modal.deselectQuestion()}
                  className={cn(
                    'p-2 rounded-lg',
                    'text-tertiary hover:text-primary',
                    'hover:bg-secondary',
                    'motion-safe:transition-colors motion-safe:duration-150'
                  )}
                  title="Back to questions"
                >
                  <HugeIcon icon={ArrowLeft01Icon} size="sm" color="current" />
                </button>
              )}
            </div>

            {/* Center - Title */}
            <Dialog.Title className="text-lg font-semibold text-primary">
              Edit Questions
            </Dialog.Title>

            {/* Right side - Close button */}
            <div className="w-10 flex justify-end">
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
          </div>

          {/* Body */}
          <div className="flex-1 flex flex-col overflow-hidden relative">
            {/* Processing overlay */}
            {modal.isProcessing && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-primary/90">
                <ProcessingMeter
                  state={modal.state.processingState}
                  progress={modal.state.processingProgress}
                />
              </div>
            )}

            {/* Menu View - No question selected */}
            {!isDetailView && (
              <MenuView
                questions={questions}
                sortedQuestions={sortedQuestions}
                stats={stats}
                onAddQuestion={handlers.handleAddQuestion}
                onSelectQuestion={handlers.handleSelectQuestion}
              />
            )}

            {/* Detail View - Question selected */}
            {isDetailView && (
              <DetailView
                questionText={selectedQuestionText}
                question={selectedQuestion}
                answerState={modal.state.answerState}
                answerPosition={config.answerPosition}
                existingQuestions={questions}
                onAddQuestion={handlers.handleAddQuestion}
                onUpdateQuestion={(text) => {
                  if (modal.state.selectedQuestionId) {
                    handlers.handleUpdateQuestionText(modal.state.selectedQuestionId, text)
                  }
                }}
                onDeleteQuestion={handlers.handleDeleteQuestion}
                onRegenerate={handlers.handleRegenerate}
                onRevise={handlers.handleRevise}
              />
            )}
          </div>

          {/* Nested revision flow modal */}
          <RevisionFlowModal
            open={modal.isRevisionFlowOpen}
            onOpenChange={(newOpen) => {
              if (!newOpen) modal.closeRevisionFlow()
            }}
            flowType={modal.state.activeRevisionFlow}
            onFlowTypeChange={(flowType) => {
              // flowType is null when back button is pressed
              modal.openRevisionFlow(flowType)
            }}
            questionText={selectedQuestionText || ''}
            onComplete={handlers.handleRevisionComplete}
            config={config}
          />
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

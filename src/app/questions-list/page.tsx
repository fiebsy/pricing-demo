/**
 * Questions List Page
 *
 * Standalone questions list with integrated improve flow.
 * When user clicks "Improve answer", opens the QuickFixModal flow.
 * On completion, shows loading spinners on all questions, then transitions
 * to green checks and shows a success toast.
 *
 * Route: /questions-list
 *
 * @module questions-list
 */

'use client'

import * as React from 'react'
import { useState, useCallback, useRef, useMemo } from 'react'

// Questions List Components
import { QuestionsListWithImprove } from './components/QuestionsListWithImprove'
import type { Question } from '../playground/question-command-menu-v4-flow/types'

// Quick Fix Modal
import { QuickFixModal } from '@/app/playground/archived/quick-fix-modal/core/QuickFixModal'
import { EDIT_QUESTIONS_MODAL_PRESET } from '@/app/playground/archived/quick-fix-modal/config/presets'
import type { IntegrationConfig } from '@/app/playground/archived/quick-fix-modal/config/types'

// Success Toast
import { ConfigurableToast } from '@/app/playground/success-toast/core/ConfigurableToast'
import type { SuccessToastConfig } from '@/app/playground/success-toast/config/types'

// =============================================================================
// INITIAL QUESTIONS
// =============================================================================

const INITIAL_QUESTIONS = [
  { text: 'How did you transition into your current role?' },
  { text: 'What technologies are you most excited about?' },
  { text: 'How would you describe your communication style?' },
  { text: 'How do you approach building and leading teams?' },
]

// =============================================================================
// TOAST CONFIG
// =============================================================================

const SUCCESS_TOAST_CONFIG: SuccessToastConfig = {
  container: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 32,
    background: 'secondary',
    shine: 'shine-1',
    shineIntensity: '-subtle',
    cornerShape: 'squircle',
  },
  icon: {
    containerSize: 28,
    iconSize: 20,
    containerBackground: 'success-secondary',
    iconColor: 'success-primary',
    containerBorderRadius: 10,
  },
  typography: {
    titleSize: 'text-sm',
    titleWeight: 'font-medium',
    titleColor: 'primary',
    subtitleSize: 'text-xs',
    subtitleWeight: 'font-normal',
    subtitleColor: 'tertiary',
  },
  progress: {
    height: 3,
    background: 'tertiary/20',
    fillColor: 'brand-primary',
    borderRadius: 0,
  },
  behavior: {
    duration: 5500,
    animationDuration: 250,
    animationDirection: 'up',
  },
  content: {
    title: 'Question improved',
    subtitle: 'One of your questions has been significantly improved',
    iconType: 'sparkles',
  },
}

// =============================================================================
// INTEGRATION CONFIG
// =============================================================================

const QUESTIONS_INTEGRATION_CONFIG: IntegrationConfig = {
  mode: 'modal',
  showHeader: true,
  showBackButton: true,
  showCloseButton: true,
  headerTitle: 'Improve Answer',
  showStepIndicator: false,
  onCompleteAction: 'close',
}

// =============================================================================
// CONSTANTS
// =============================================================================

const REGENERATION_DELAY = 2500 // Time to show loading spinners (ms)

// =============================================================================
// PAGE COMPONENT
// =============================================================================

export default function QuestionsListPage() {
  const [questions, setQuestions] = useState<Question[]>([])

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null)

  // Regenerating state - tracks which questions are currently regenerating
  const [regeneratingIds, setRegeneratingIds] = useState<Set<string>>(new Set())

  // Toast state
  const [showToast, setShowToast] = useState(false)
  const [toastContent, setToastContent] = useState({
    title: 'Question improved',
    subtitle: 'One of your questions has been significantly improved',
    iconType: 'sparkles' as const,
  })

  // Ref to trigger regeneration
  const regenerateRef = useRef<((questionId: string) => void) | null>(null)

  // Memoize the regeneratingIds set for stable reference
  const regeneratingIdsSet = useMemo(() => regeneratingIds, [regeneratingIds])

  // Handle "Improve answer" button click
  const handleImproveAnswer = useCallback((questionId: string) => {
    setActiveQuestionId(questionId)
    setIsModalOpen(true)
  }, [])

  // Handle modal completion
  const handleModalComplete = useCallback(() => {
    setIsModalOpen(false)

    // Get all questions that have responses (not empty/idle questions)
    const answeredQuestionIds = questions
      .filter((q) => q.text && q.response)
      .map((q) => q.id)

    // Set all answered questions to regenerating
    setRegeneratingIds(new Set(answeredQuestionIds))

    // After delay, clear regenerating state and show toast
    // This simulates AI re-evaluating all responses
    setTimeout(() => {
      // Clear regenerating state - icons will transition to green checks
      setRegeneratingIds(new Set())

      // Show success toast
      setToastContent({
        title: 'Question improved',
        subtitle: 'One of your questions has been significantly improved',
        iconType: 'sparkles',
      })
      setShowToast(true)

      // Trigger regeneration on the specific question that was improved
      if (activeQuestionId && regenerateRef.current) {
        regenerateRef.current(activeQuestionId)
      }
    }, REGENERATION_DELAY)

    setActiveQuestionId(null)
  }, [questions, activeQuestionId])

  // Handle toast dismiss
  const handleToastDismiss = useCallback(() => {
    setShowToast(false)
  }, [])

  // Register regenerate function
  const registerRegenerate = useCallback((fn: (questionId: string) => void) => {
    regenerateRef.current = fn
  }, [])

  return (
    <div className="min-h-screen bg-primary">
      <div className="max-w-xl mx-auto px-6 pt-[400px] pb-48">
        {/* Questions List */}
        <QuestionsListWithImprove
          questionCount={5}
          initialQuestions={INITIAL_QUESTIONS}
          layout={{ triggerWidth: 480, panelWidth: 520 }}
          onChange={setQuestions}
          onImproveAnswer={handleImproveAnswer}
          onRegisterRegenerate={registerRegenerate}
          regeneratingIds={regeneratingIdsSet}
        />
      </div>

      {/* Toast */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <ConfigurableToast
          config={{
            ...SUCCESS_TOAST_CONFIG,
            content: toastContent,
          }}
          visible={showToast}
          onDismiss={handleToastDismiss}
        />
      </div>

      {/* Quick Fix Modal */}
      <QuickFixModal
        open={isModalOpen}
        onOpenChange={(open) => !open && setIsModalOpen(false)}
        config={EDIT_QUESTIONS_MODAL_PRESET.config}
        integration={QUESTIONS_INTEGRATION_CONFIG}
        onComplete={handleModalComplete}
      />
    </div>
  )
}

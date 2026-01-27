/**
 * Profile V3 Page
 *
 * Flat 5-category leaderboard structure:
 * - Career (20%) - What you've done
 * - Skills (20%) - What you can do
 * - Growth (20%) - How you think
 * - Business (20%) - How you lead
 * - Voice (20%) - How you express
 *
 * Route: /b/profile-v3
 *
 * @module b/profile-v3
 */

'use client'

import * as React from 'react'
import { useCallback, useState, useRef } from 'react'

// V3 Components
import { ProfileV3Layout } from './components/layout'
import { Scorecard } from './components/scorecard'
import { AvatarVideo } from './components/video'
import { EditableProfilePanel } from './components/editable-profile'

// Quick Fix Modal
import { QuickFixModal } from '@/app/playground/archived/quick-fix-modal/core/QuickFixModal'
import { PROFILE_QUICK_FIX_CONFIG, PROFILE_INTEGRATION_CONFIG } from './config/quick-fix-config'

// Reuse components from profile-v2
import { EditModeProvider } from '../profile-v2/components/edit-mode'
import { ChatOverlay } from '@/app/b/profile/components/chat'
import type { ChatOverlayRef } from '@/app/b/profile/components/chat'

// V3 Question components (command menu based)
import { QuestionsContainer, QuestionCard, AddQuestionInput } from './components/questions'

// Bento Grid from v2
import { BentoGrid } from '../profile-v2/components/bento-grid'

// Success Toast
import { ConfigurableToast } from '@/app/playground/success-toast/core/ConfigurableToast'
import type { SuccessToastConfig } from '@/app/playground/success-toast/config/types'

// V3 Bottom Toolbar with Save button
import { BottomToolbarV3 } from './components/layout/BottomToolbarV3'

// V3 Hooks
import {
  useProfileScores,
  useRevisionFlow,
  useChatOverlay,
  useCategoryHighlight,
  useScoreAnimation,
  useEditMode,
  useQuestions,
} from './hooks'

// Constants
import { MOCK_PROFILE } from './constants'

// Types
import type { ProfileQuestion, CategoryType, ScoreImprovement } from './types'
import type { ChatMessage } from '@/app/b/profile/types'

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
    containerBackground: 'tertiary',
    iconColor: 'secondary',
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
    title: 'Changes saved',
    subtitle: 'Your profile has been updated',
  },
}

// Confidence improvement toast - longer duration with party icon
const CONFIDENCE_TOAST_CONFIG: SuccessToastConfig = {
  ...SUCCESS_TOAST_CONFIG,
  icon: {
    ...SUCCESS_TOAST_CONFIG.icon,
    containerBackground: 'success-secondary',
    iconColor: 'success-primary',
  },
  behavior: {
    ...SUCCESS_TOAST_CONFIG.behavior,
    duration: 8000, // Longer duration for celebration
  },
  content: {
    title: '',
    subtitle: '',
    iconType: 'party',
  },
}

// =============================================================================
// PAGE CONTENT
// =============================================================================

function ProfileV3Content() {
  // Profile scores and categories (V3 flat structure)
  const {
    scores,
    scrollToCategory,
    improveCategory,
  } = useProfileScores()

  // Revision flow (modal)
  const {
    modalState,
    openModal,
    closeModal,
    completeFlow,
  } = useRevisionFlow()

  // Chat overlay
  const chatRef = useRef<ChatOverlayRef>(null)
  const {
    state: chatState,
    setState: setChatState,
  } = useChatOverlay('collapsed')

  // Category highlighting
  const {
    state: highlightState,
    setActiveQuestion,
    clearHighlight,
    isHighlighted,
    isDimmed,
  } = useCategoryHighlight()

  // Score animations
  const {
    improvements,
    addImprovement,
    clearAllImprovements,
  } = useScoreAnimation()

  // Edit mode
  const {
    isEditMode,
    toggleEditMode,
  } = useEditMode()

  // Questions management
  const {
    questions,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    canAddQuestion,
  } = useQuestions()

  // Show toast state
  const [showToast, setShowToast] = useState(false)
  const [toastContent, setToastContent] = useState<{
    title: string
    subtitle: string
    iconType?: 'checkmark' | 'party' | 'sparkles' | 'arrow-up'
  }>({ title: '', subtitle: '' })
  const [toastConfig, setToastConfig] = useState<SuccessToastConfig>(SUCCESS_TOAST_CONFIG)

  // Track question to resubmit after improve flow completes
  const [questionToResubmit, setQuestionToResubmit] = useState<string | null>(null)

  // Track previous confidence for comparison toast
  const [previousConfidence, setPreviousConfidence] = useState<number | null>(null)

  // Editable profile fields
  const [profileName, setProfileName] = useState(MOCK_PROFILE.name)
  const [profileRole, setProfileRole] = useState('Design Engineer')
  const [profileCompany, setProfileCompany] = useState('PAYVA')
  const [profileBio, setProfileBio] = useState(
    'Design engineer crafting thoughtful UI experiences. Always iterating.'
  )
  const [isSaving, setIsSaving] = useState(false)
  const [isVideoAreaHovered, setIsVideoAreaHovered] = useState(false)

  // ==========================================================================
  // HANDLERS
  // ==========================================================================

  const handleQuestionClick = useCallback(
    (question: ProfileQuestion) => {
      setActiveQuestion(question)
      scrollToCategory(question.linkedCategory)
      // Send question to chat
      chatRef.current?.sendMessage(question.text)
    },
    [setActiveQuestion, scrollToCategory]
  )

  const handleImproveCategory = useCallback(
    (category: CategoryType) => {
      openModal('quick-fix', category)
    },
    [openModal]
  )

  // Handle overall improve - finds lowest-scoring category
  const handleImproveOverall = useCallback(() => {
    const lowestCategory = Object.entries(scores.categories)
      .sort(([, a], [, b]) => a.aggregate.current - b.aggregate.current)[0][0] as CategoryType
    openModal('quick-fix', lowestCategory)
  }, [scores.categories, openModal])

  // Handle improve answer from chat - uses the active question's linked category
  const handleImproveAnswer = useCallback(
    (message: ChatMessage, userMessageContent: string) => {
      // Use the active question's linked category, or default to the lowest-scoring category
      const category = highlightState.activeQuestion?.linkedCategory
        || (Object.entries(scores.categories)
            .sort(([, a], [, b]) => a.aggregate.current - b.aggregate.current)[0][0] as CategoryType)

      // Store the question text to resubmit after flow completes
      // Prefer the active question text, fall back to the user's original message
      const textToResubmit = highlightState.activeQuestion?.text || userMessageContent
      if (textToResubmit) {
        setQuestionToResubmit(textToResubmit)
      }

      // Store the current confidence for comparison after improvement
      if (message.confidence !== undefined) {
        setPreviousConfidence(message.confidence)
      }

      openModal('quick-fix', category)
    },
    [highlightState.activeQuestion, scores.categories, openModal]
  )

  const handleRevisionComplete = useCallback(() => {
    completeFlow()
    if (modalState.targetCategory) {
      // Increase the score
      improveCategory(modalState.targetCategory)

      const improvement: ScoreImprovement = {
        categoryId: modalState.targetCategory,
        delta: Math.floor(Math.random() * 3) + 1,
        previousScore: 70,
        newScore: 73,
      }
      addImprovement(improvement)

      // Set toast content before showing (use default config)
      setToastConfig(SUCCESS_TOAST_CONFIG)
      setToastContent({
        title: `+${improvement.delta} strength added`,
        subtitle: `Improved: ${modalState.targetCategory}`,
      })
      setShowToast(true)

      // Resubmit the question if triggered from chat "Improve answer" button
      if (questionToResubmit) {
        // Small delay to let the modal close animation complete
        setTimeout(() => {
          // Force high confidence since user just improved their answer
          chatRef.current?.sendMessage(questionToResubmit, { forceHighConfidence: true })
        }, 300)
        setQuestionToResubmit(null)
      }
    }
  }, [completeFlow, modalState.targetCategory, addImprovement, improveCategory, questionToResubmit])

  const handleToastClose = useCallback(() => {
    setShowToast(false)
    // Delay clearing improvements until after exit animation
    setTimeout(() => {
      clearAllImprovements()
    }, 300)
  }, [clearAllImprovements])

  // Handle when a new answer completes - show confidence comparison toast if improving
  const handleAnswerComplete = useCallback(
    (message: ChatMessage) => {
      // Only show comparison toast if we were improving a previous answer
      if (previousConfidence !== null && message.confidence !== undefined) {
        const prevPercent = Math.round(previousConfidence * 100)
        const newPercent = Math.round(message.confidence * 100)
        const delta = newPercent - prevPercent

        // Use confidence toast config with party icon for improvements
        setToastConfig(CONFIDENCE_TOAST_CONFIG)
        setToastContent({
          title: delta > 0
            ? `+${delta}% confidence improvement`
            : delta < 0
              ? `${delta}% confidence change`
              : 'Same confidence level',
          subtitle: `${prevPercent}% → ${newPercent}%`,
          iconType: delta > 0 ? 'party' : 'checkmark',
        })
        setShowToast(true)

        // Clear the previous confidence
        setPreviousConfidence(null)
      }
    },
    [previousConfidence]
  )

  const handleGridClick = useCallback(() => {
    if (highlightState.activeQuestion) {
      clearHighlight()
    }
  }, [highlightState.activeQuestion, clearHighlight])

  const handleSave = useCallback(async () => {
    setIsSaving(true)
    // Simulate save - in real app this would call an API
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    console.log('Saved profile:', {
      name: profileName,
      role: profileRole,
      company: profileCompany,
      bio: profileBio,
    })
  }, [profileName, profileRole, profileCompany, profileBio])

  // Question handlers
  const handleAddQuestion = useCallback((question: ProfileQuestion) => {
    addQuestion(question)
    // Run the question after adding
    handleQuestionClick(question)
  }, [addQuestion, handleQuestionClick])

  const handleUpdateQuestion = useCallback((question: ProfileQuestion) => {
    updateQuestion(question)
    // Run the question after updating
    handleQuestionClick(question)
  }, [updateQuestion, handleQuestionClick])

  const handleRegenerateQuestion = useCallback((question: ProfileQuestion): string => {
    // Simulated regeneration - in production this would call an AI API
    const regeneratedQuestions: Record<string, string[]> = {
      growth: [
        'What motivates you to keep learning?',
        'How do you approach personal development?',
        'What challenges have shaped your growth?',
      ],
      career: [
        'What led you to your current career path?',
        'How has your professional journey evolved?',
        'What pivotal moments defined your career?',
      ],
      skills: [
        'What skills are you most proud of developing?',
        'How do you stay current with new technologies?',
        'What tools do you rely on daily?',
      ],
      voice: [
        'How do you prefer to communicate with teams?',
        'What makes your perspective unique?',
        'How do you express complex ideas simply?',
      ],
      business: [
        'How do you approach leadership challenges?',
        'What strategies guide your decision making?',
        'How do you build effective teams?',
      ],
    }

    const options = regeneratedQuestions[question.linkedCategory] || regeneratedQuestions.growth
    return options[Math.floor(Math.random() * options.length)]
  }, [])

  const handleDeleteQuestion = useCallback((question: ProfileQuestion) => {
    deleteQuestion(question.id)
  }, [deleteQuestion])

  // ==========================================================================
  // RENDER
  // ==========================================================================

  return (
    <>
      <ProfileV3Layout
        // LEFT: Profile info (editable)
        profile={
          <EditableProfilePanel
            name={profileName}
            avatarUrl={MOCK_PROFILE.avatarUrl}
            bio={profileBio}
            role={profileRole}
            company={profileCompany}
            isVerified
            onNameChange={setProfileName}
            onRoleChange={setProfileRole}
            onCompanyChange={setProfileCompany}
            onBioChange={setProfileBio}
          />
        }
        // CENTER: Video
        video={
          <AvatarVideo src="/avatar-videos/listening-learning.mp4" isHovered={isVideoAreaHovered} />
        }
        onVideoAreaHover={setIsVideoAreaHovered}
        // RIGHT: Scorecard (5 categories)
        editPanel={
          <Scorecard
            scores={scores}
            onImproveCategory={handleImproveCategory}
            onImproveOverall={handleImproveOverall}
          />
        }
        // CENTER BELOW: Questions
        questions={
          <div onClick={handleGridClick}>
            <BentoGrid className="flex-col items-center *:opacity-50 *:hover:opacity-100 *:transition-opacity">
              {questions.map((question) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  onClick={() => handleQuestionClick(question)}
                  onUpdate={handleUpdateQuestion}
                  onRegenerate={handleRegenerateQuestion}
                  onDelete={handleDeleteQuestion}
                  isHighlighted={isHighlighted(question.linkedCategory)}
                  isDimmed={isDimmed(question.linkedCategory)}
                />
              ))}
              {/* Inline add input - hidden when at max 5 questions */}
              {canAddQuestion && (
                <AddQuestionInput onAdd={handleAddQuestion} />
              )}
            </BentoGrid>
          </div>
        }
        // FOOTER: Chat overlay
        footer={
          <ChatOverlay
            ref={chatRef}
            state={chatState}
            onStateChange={setChatState}
            onImproveAnswer={handleImproveAnswer}
            onAnswerComplete={handleAnswerComplete}
            className="pb-6"
          />
        }
      />

      {/* Bottom toolbar with Save my Delphi button */}
      <BottomToolbarV3
        onSave={handleSave}
        isSaving={isSaving}
        onSettings={() => console.log('Settings clicked')}
        onShare={() => console.log('Share clicked')}
      />

      {/* Score improvement toast */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <ConfigurableToast
          config={{
            ...toastConfig,
            content: toastContent,
          }}
          visible={showToast}
          onDismiss={handleToastClose}
        />
      </div>

      {/* Quick Fix Modal */}
      <QuickFixModal
        open={modalState.isOpen}
        onOpenChange={(open) => !open && closeModal()}
        config={PROFILE_QUICK_FIX_CONFIG}
        categoryName={modalState.targetCategory || ''}
        integration={PROFILE_INTEGRATION_CONFIG}
        onComplete={handleRevisionComplete}
      />

    </>
  )
}

// =============================================================================
// PAGE COMPONENT
// =============================================================================

export default function ProfileV3Page() {
  return (
    <EditModeProvider>
      <ProfileV3Content />
    </EditModeProvider>
  )
}

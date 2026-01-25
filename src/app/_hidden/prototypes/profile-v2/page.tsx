/**
 * Profile V2 Page
 *
 * Bento-style profile editor with:
 * - Profile/avatar/bio fixed on LEFT (top portion)
 * - Edit panel with Mind/Voice tabs in BOTTOM-LEFT (always visible)
 * - Content cards (questions) in bento grid on RIGHT
 * - Preserved chat system (unchanged)
 *
 * Route: /b/profile-v2
 *
 * @module b/profile-v2
 */

'use client'

import * as React from 'react'
import { useCallback, useState } from 'react'

// Layout
import { BentoProfileLayout, BottomToolbar } from './components/layout'

// Profile Panel (separated components)
import { ProfileAvatar, ProfileBio } from './components/profile-panel'

// Bento Grid
import { BentoGrid, QuestionCard } from './components/bento-grid'

// Score Components (separated)
import { OverallScore, SubScores } from './components/score'

// Edit Mode
import { EditModeProvider, useEditModeContext } from './components/edit-mode'

// Chat (reused from base profile)
import { ChatOverlay } from './components/chat'

// Toast
import { ScoreToast } from './components/toast'

// Modals (reused from base profile)
import { RevisionModal, UpdatesIsland } from './components'

// Hooks
import {
  useProfileScores,
  useRevisionFlow,
  useChatOverlay,
  useCategoryHighlight,
  useScoreAnimation,
  useEditMode,
} from './hooks'

// Constants (reused from base profile)
import { MOCK_PROFILE, MOCK_UPDATES } from '@/app/b/profile/constants'

// Types
import type { ProfileQuestion, CategoryType, SectionType } from './types'

// =============================================================================
// SIMPLIFIED QUESTIONS (max 30 words, single concept)
// =============================================================================

const SIMPLIFIED_QUESTIONS: ProfileQuestion[] = [
  {
    id: 'q1',
    text: 'What drives your passion for design engineering?',
    linkedCategory: 'growth',
    linkedSection: 'mind',
  },
  {
    id: 'q2',
    text: 'How did you transition into your current role?',
    linkedCategory: 'career',
    linkedSection: 'mind',
  },
  {
    id: 'q3',
    text: 'What technologies are you most excited about?',
    linkedCategory: 'skills',
    linkedSection: 'mind',
  },
  {
    id: 'q4',
    text: 'How would you describe your communication style?',
    linkedCategory: 'tone',
    linkedSection: 'voice',
  },
  {
    id: 'q5',
    text: 'What advice would you give to junior developers?',
    linkedCategory: 'skills',
    linkedSection: 'mind',
  },
]

// =============================================================================
// PAGE CONTENT (with EditModeProvider context)
// =============================================================================

function ProfileV2Content() {
  // Profile scores and categories
  const {
    scores,
    activeSection,
    expandedCategory,
    setActiveSection,
    toggleCategory,
    scrollToCategory,
  } = useProfileScores()

  // Revision flow (modal)
  const {
    modalState,
    openModal,
    closeModal,
    completeFlow,
  } = useRevisionFlow()

  // Chat overlay
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

  // Show toast state
  const [showToast, setShowToast] = useState(false)

  // ==========================================================================
  // HANDLERS
  // ==========================================================================

  const handleQuestionClick = useCallback(
    (question: ProfileQuestion) => {
      // Highlight the related category
      setActiveQuestion(question)
      // Scroll to category in edit panel
      scrollToCategory(question.linkedCategory)
      // Switch to the correct section
      if (question.linkedSection === 'voice') {
        setActiveSection('voice')
      } else {
        setActiveSection('mind')
      }
    },
    [setActiveQuestion, scrollToCategory, setActiveSection]
  )

  const handleImproveCategory = useCallback(
    (category: CategoryType, section: SectionType) => {
      openModal('quick-fix', category, section)
    },
    [openModal]
  )

  const handleRevisionComplete = useCallback(() => {
    completeFlow()
    // Simulate a score improvement
    if (modalState.targetCategory) {
      addImprovement({
        categoryId: modalState.targetCategory,
        delta: Math.floor(Math.random() * 3) + 1, // +1 to +3
        previousScore: 70,
        newScore: 73,
      })
      setShowToast(true)
    }
  }, [completeFlow, modalState.targetCategory, addImprovement])

  const handleToastClose = useCallback(() => {
    setShowToast(false)
    clearAllImprovements()
  }, [clearAllImprovements])

  // Clear highlight when clicking outside
  const handleGridClick = useCallback(() => {
    if (highlightState.activeQuestion) {
      clearHighlight()
    }
  }, [highlightState.activeQuestion, clearHighlight])

  // ==========================================================================
  // RENDER
  // ==========================================================================

  return (
    <>
      <BentoProfileLayout
        // AVATAR: Profile image (draggable)
        avatar={
          <ProfileAvatar
            name={MOCK_PROFILE.name}
            avatarUrl={MOCK_PROFILE.avatarUrl}
            isVerified
            className="size-[72px]"
          />
        }
        // NAME: Just the name (draggable)
        name={
          <h1 className="text-2xl font-bold leading-tight tracking-tight text-primary xl:text-3xl">
            {MOCK_PROFILE.name}
          </h1>
        }
        // ROLE: Role + company (draggable)
        role={
          <p className="text-sm text-secondary">
            Design Engineer at PAYVA
          </p>
        }
        // BIO: Description text (draggable)
        bio={
          <ProfileBio bio="Design engineer crafting thoughtful UI experiences. Always iterating." />
        }
        // OVERALL SCORE: Aggregate score display (draggable)
        overallScore={
          <OverallScore
            score={scores.overall.current}
            rank="#142 in Design"
          />
        }
        // SUB-SCORES: Section tabs + category metrics (draggable)
        subScores={
          <SubScores
            scores={scores}
            activeSection={activeSection}
            expandedCategory={expandedCategory}
            onSectionChange={setActiveSection}
            onCategoryToggle={toggleCategory}
            onImproveCategory={handleImproveCategory}
          />
        }
        // VIDEO: Avatar video (draggable + resizable)
        videoRender={() => (
          <video
            ref={(el) => {
              if (el) el.playbackRate = 0.9
            }}
            src="/avatar-videos/listening-learning.mp4"
            autoPlay
            muted
            playsInline
            onEnded={(e) => e.currentTarget.pause()}
            onMouseEnter={(e) => {
              e.currentTarget.currentTime = 0
              e.currentTarget.play()
            }}
            className="w-full h-full object-cover"
          />
        )}
        // QUESTIONS: Bento grid (draggable)
        questions={
          <div onClick={handleGridClick}>
            <BentoGrid>
              {SIMPLIFIED_QUESTIONS.map((question) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  onClick={handleQuestionClick}
                  isHighlighted={isHighlighted(question.linkedCategory)}
                  isDimmed={isDimmed(question.linkedCategory)}
                />
              ))}
            </BentoGrid>
          </div>
        }
        // FOOTER: Chat overlay
        footer={
          <ChatOverlay
            state={chatState}
            onStateChange={setChatState}
          />
        }
      />

      {/* Bottom toolbar (edit mode, settings, share) */}
      <BottomToolbar
        isEditMode={isEditMode}
        onToggleEditMode={toggleEditMode}
        onSettings={() => console.log('Settings clicked')}
        onShare={() => console.log('Share clicked')}
      />

      {/* Score improvement toast */}
      {showToast && improvements.length > 0 && (
        <ScoreToast
          title={`Congratulations! +${improvements.reduce((sum, i) => sum + i.delta, 0)} to your confidence score`}
          improvements={improvements}
          onClose={handleToastClose}
        />
      )}

      {/* Revision Modal (reused from base profile) */}
      <RevisionModal
        isOpen={modalState.isOpen}
        flowType={modalState.flowType}
        targetCategory={modalState.targetCategory}
        targetSection={modalState.targetSection}
        onClose={closeModal}
        onComplete={handleRevisionComplete}
      />
    </>
  )
}

// =============================================================================
// PAGE COMPONENT
// =============================================================================

export default function ProfileV2Page() {
  return (
    <EditModeProvider>
      <ProfileV2Content />
    </EditModeProvider>
  )
}

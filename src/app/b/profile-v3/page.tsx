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
import { useCallback, useState } from 'react'

// V3 Components
import { ProfileV3Layout } from './components/layout'
import { Scorecard } from './components/scorecard'
import { AvatarVideo } from './components/video'
import { RevisionModal } from './components/modals'
import { EditableProfilePanel } from './components/editable-profile'

// Reuse components from profile-v2
import { BentoGrid, QuestionCard } from '../profile-v2/components/bento-grid'
import { EditModeProvider } from '../profile-v2/components/edit-mode'
import { ChatOverlay } from '../profile/components/chat'
import { ScoreToast } from '../profile-v2/components/toast'

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
} from './hooks'

// Constants
import { MOCK_PROFILE, PROFILE_QUESTIONS } from './constants'

// Types
import type { ProfileQuestion, CategoryType, ScoreImprovement } from './types'

// =============================================================================
// PAGE CONTENT
// =============================================================================

function ProfileV3Content() {
  // Profile scores and categories (V3 flat structure)
  const {
    scores,
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

  // Editable profile fields
  const [profileName, setProfileName] = useState(MOCK_PROFILE.name)
  const [profileRole, setProfileRole] = useState('Design Engineer')
  const [profileCompany, setProfileCompany] = useState('PAYVA')
  const [profileBio, setProfileBio] = useState(
    'Design engineer crafting thoughtful UI experiences. Always iterating.'
  )
  const [isSaving, setIsSaving] = useState(false)

  // ==========================================================================
  // HANDLERS
  // ==========================================================================

  const handleQuestionClick = useCallback(
    (question: ProfileQuestion) => {
      setActiveQuestion(question)
      scrollToCategory(question.linkedCategory)
    },
    [setActiveQuestion, scrollToCategory]
  )

  const handleImproveCategory = useCallback(
    (category: CategoryType) => {
      openModal('quick-fix', category)
    },
    [openModal]
  )

  const handleRevisionComplete = useCallback(() => {
    completeFlow()
    if (modalState.targetCategory) {
      const improvement: ScoreImprovement = {
        categoryId: modalState.targetCategory,
        delta: Math.floor(Math.random() * 3) + 1,
        previousScore: 70,
        newScore: 73,
      }
      addImprovement(improvement)
      setShowToast(true)
    }
  }, [completeFlow, modalState.targetCategory, addImprovement])

  const handleToastClose = useCallback(() => {
    setShowToast(false)
    clearAllImprovements()
  }, [clearAllImprovements])

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
          <AvatarVideo src="/avatar-videos/listening-learning.mp4" />
        }
        // RIGHT: Scorecard (5 categories)
        editPanel={
          <Scorecard
            scores={scores}
            onImproveCategory={handleImproveCategory}
          />
        }
        // CENTER BELOW: Questions
        questions={
          <div onClick={handleGridClick}>
            <BentoGrid className="flex-col items-center *:opacity-50 *:hover:opacity-100 *:transition-opacity">
              {PROFILE_QUESTIONS.map((question) => (
                <QuestionCard
                  key={question.id}
                  question={{
                    id: question.id,
                    text: question.text,
                    // Map to legacy format for QuestionCard compatibility
                    linkedCategory: question.linkedCategory === 'voice' ? 'tone' : question.linkedCategory,
                    linkedSection: question.linkedCategory === 'voice' ? 'voice' : 'mind',
                  } as import('../profile-v2/types').ProfileQuestion}
                  onClick={() => handleQuestionClick(question)}
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
      {showToast && improvements.length > 0 && (
        <ScoreToast
          title={`Congratulations! +${improvements.reduce((sum, i) => sum + i.delta, 0)} to your confidence score`}
          improvements={improvements.map((i) => ({
            ...i,
            // Map to legacy format for ScoreToast compatibility
            categoryId: i.categoryId as any,
          }))}
          onClose={handleToastClose}
        />
      )}

      {/* Revision Modal */}
      <RevisionModal
        isOpen={modalState.isOpen}
        targetCategory={modalState.targetCategory}
        onClose={closeModal}
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

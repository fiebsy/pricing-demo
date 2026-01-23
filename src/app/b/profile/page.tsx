/**
 * Profile Page
 *
 * Video game-inspired profile editor with RPG-style scoring system.
 * Supports 3-tier hierarchy: Sections > Categories > SubScores
 * Route: /b/profile
 *
 * @module b/profile
 */

'use client'

import * as React from 'react'
import { useCallback } from 'react'
import {
  ProfileLayout,
  ConfidencePanel,
  CharacterAvatar,
  BioSection,
  ChatOverlay,
  RevisionModal,
  UpdatesIsland,
  LoginModal,
} from './components'
import { useProfileScores, useRevisionFlow, useChatOverlay, useAuth } from './hooks'
import { MOCK_PROFILE, MOCK_UPDATES } from './constants'
import type { ProfileQuestion, CategoryType, SectionType } from './types'

// =============================================================================
// PAGE COMPONENT
// =============================================================================

export default function ProfilePage() {
  // Auth hook
  const {
    isAuthenticated,
    isLoading: authLoading,
    showLoginModal,
    signIn,
    closeLoginModal,
  } = useAuth()

  // Hooks
  const {
    scores,
    activeSection,
    expandedCategory,
    setActiveSection,
    toggleCategory,
    scrollToCategory,
  } = useProfileScores()

  const {
    modalState,
    openModal,
    closeModal,
    completeFlow,
  } = useRevisionFlow()

  const {
    state: chatState,
    setState: setChatState,
  } = useChatOverlay('collapsed')

  // Handlers
  const handleQuestionClick = useCallback(
    (question: ProfileQuestion) => {
      scrollToCategory(question.linkedCategory)
    },
    [scrollToCategory]
  )

  const handleImproveCategory = useCallback(
    (category: CategoryType, section: SectionType) => {
      openModal('quick-fix', category, section)
    },
    [openModal]
  )

  return (
    <>
      <ProfileLayout
        // Header: Updates Island
        header={<UpdatesIsland data={MOCK_UPDATES} />}
        // Sidebar: Confidence Panel
        sidebar={
          <ConfidencePanel
            scores={scores}
            activeSection={activeSection}
            expandedCategory={expandedCategory}
            onSectionChange={setActiveSection}
            onCategoryToggle={toggleCategory}
            onImproveCategory={handleImproveCategory}
          />
        }
        // Main: Avatar + Bio + Questions
        main={
          <>
            <CharacterAvatar
              name={MOCK_PROFILE.name}
              avatarUrl={MOCK_PROFILE.avatarUrl}
            />
            <BioSection
              bio={MOCK_PROFILE.bio}
              questions={MOCK_PROFILE.questions}
              onQuestionClick={handleQuestionClick}
            />
          </>
        }
        // Footer: Chat Overlay
        footer={
          <ChatOverlay
            state={chatState}
            onStateChange={setChatState}
          />
        }
      />

      {/* Revision Modal */}
      <RevisionModal
        isOpen={modalState.isOpen}
        flowType={modalState.flowType}
        targetCategory={modalState.targetCategory}
        targetSection={modalState.targetSection}
        onClose={closeModal}
        onComplete={completeFlow}
      />

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={closeLoginModal}
        onSignIn={signIn}
      />
    </>
  )
}

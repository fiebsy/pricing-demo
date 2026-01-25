/**
 * useRevisionFlow Hook - V3
 *
 * Manages revision modal state for profile improvements.
 *
 * @module b/profile-v3/hooks
 */

'use client'

import { useState, useCallback } from 'react'
import type { CategoryType, RevisionFlowType, RevisionModalState } from '../types'

// =============================================================================
// HOOK
// =============================================================================

export interface UseRevisionFlowReturn {
  modalState: RevisionModalState
  openModal: (flowType: RevisionFlowType, category: CategoryType) => void
  closeModal: () => void
  completeFlow: () => void
}

const INITIAL_STATE: RevisionModalState = {
  isOpen: false,
  flowType: null,
  targetCategory: null,
}

export function useRevisionFlow(): UseRevisionFlowReturn {
  const [modalState, setModalState] = useState<RevisionModalState>(INITIAL_STATE)

  const openModal = useCallback((flowType: RevisionFlowType, category: CategoryType) => {
    setModalState({
      isOpen: true,
      flowType,
      targetCategory: category,
    })
  }, [])

  const closeModal = useCallback(() => {
    setModalState(INITIAL_STATE)
  }, [])

  const completeFlow = useCallback(() => {
    setModalState(INITIAL_STATE)
  }, [])

  return {
    modalState,
    openModal,
    closeModal,
    completeFlow,
  }
}

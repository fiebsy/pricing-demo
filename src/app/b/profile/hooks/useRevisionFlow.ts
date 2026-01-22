/**
 * useRevisionFlow Hook
 *
 * Manages revision modal state and flow selection.
 *
 * @module b/profile/hooks
 */

'use client'

import { useState, useCallback, useMemo } from 'react'
import type { RevisionModalState, RevisionFlowType, CategoryType, SectionType } from '../types'

export interface UseRevisionFlowReturn {
  modalState: RevisionModalState
  openModal: (flowType: RevisionFlowType, category: CategoryType, section: SectionType) => void
  closeModal: () => void
  completeFlow: () => void
}

const initialState: RevisionModalState = {
  isOpen: false,
  flowType: null,
  targetCategory: null,
  targetSection: null,
}

export function useRevisionFlow(): UseRevisionFlowReturn {
  const [modalState, setModalState] = useState<RevisionModalState>(initialState)

  const openModal = useCallback((flowType: RevisionFlowType, category: CategoryType, section: SectionType) => {
    setModalState({
      isOpen: true,
      flowType,
      targetCategory: category,
      targetSection: section,
    })
  }, [])

  const closeModal = useCallback(() => {
    setModalState(initialState)
  }, [])

  const completeFlow = useCallback(() => {
    // Could trigger score refresh here in a real app
    setModalState(initialState)
  }, [])

  return useMemo(
    () => ({
      modalState,
      openModal,
      closeModal,
      completeFlow,
    }),
    [modalState, openModal, closeModal, completeFlow]
  )
}

/**
 * EditModeProvider Component
 *
 * Context provider for edit mode state.
 *
 * @module b/profile-v2/components/edit-mode
 */

'use client'

import * as React from 'react'
import { createContext, useContext } from 'react'
import { useEditMode } from '../../hooks'
import type { UseEditModeReturn } from '../../hooks'

// =============================================================================
// CONTEXT
// =============================================================================

const EditModeContext = createContext<UseEditModeReturn | null>(null)

export function useEditModeContext(): UseEditModeReturn {
  const context = useContext(EditModeContext)
  if (!context) {
    throw new Error('useEditModeContext must be used within EditModeProvider')
  }
  return context
}

// =============================================================================
// PROVIDER
// =============================================================================

interface EditModeProviderProps {
  children: React.ReactNode
}

export function EditModeProvider({ children }: EditModeProviderProps) {
  const editMode = useEditMode()

  return (
    <EditModeContext.Provider value={editMode}>
      {children}
    </EditModeContext.Provider>
  )
}

/**
 * useAuth Hook
 *
 * Simulated authentication state for profile walkthrough.
 * Uses localStorage to persist auth state across page refreshes.
 *
 * @module a/hooks
 */

'use client'

import { useState, useEffect, useCallback } from 'react'

const AUTH_STORAGE_KEY = 'profile-a-auth'

interface AuthState {
  isAuthenticated: boolean
  isLoading: boolean
  showLoginModal: boolean
}

interface UseAuthReturn extends AuthState {
  signIn: () => void
  signOut: () => void
  openLoginModal: () => void
  closeLoginModal: () => void
}

export function useAuth(): UseAuthReturn {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showLoginModal, setShowLoginModal] = useState(false)

  // Check localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY)
    if (stored === 'true') {
      setIsAuthenticated(true)
    } else {
      // Not authenticated - show login modal
      setShowLoginModal(true)
    }
    setIsLoading(false)
  }, [])

  const signIn = useCallback(() => {
    localStorage.setItem(AUTH_STORAGE_KEY, 'true')
    setIsAuthenticated(true)
    setShowLoginModal(false)
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    setIsAuthenticated(false)
    setShowLoginModal(true)
  }, [])

  const openLoginModal = useCallback(() => {
    setShowLoginModal(true)
  }, [])

  const closeLoginModal = useCallback(() => {
    // Only allow closing if already authenticated
    if (isAuthenticated) {
      setShowLoginModal(false)
    }
  }, [isAuthenticated])

  return {
    isAuthenticated,
    isLoading,
    showLoginModal,
    signIn,
    signOut,
    openLoginModal,
    closeLoginModal,
  }
}

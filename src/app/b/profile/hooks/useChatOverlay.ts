/**
 * useChatOverlay Hook
 *
 * Manages chat overlay expansion state.
 *
 * @module b/profile/hooks
 */

'use client'

import { useState, useCallback, useMemo } from 'react'
import type { ChatOverlayState } from '../types'

export interface UseChatOverlayReturn {
  state: ChatOverlayState
  setState: (state: ChatOverlayState) => void
  expand: () => void
  collapse: () => void
  toggle: () => void
}

export function useChatOverlay(initialState: ChatOverlayState = 'collapsed'): UseChatOverlayReturn {
  const [state, setState] = useState<ChatOverlayState>(initialState)

  const expand = useCallback(() => {
    setState('expanded')
  }, [])

  const collapse = useCallback(() => {
    setState('collapsed')
  }, [])

  const toggle = useCallback(() => {
    setState((prev) => {
      if (prev === 'collapsed') return 'default'
      if (prev === 'default') return 'expanded'
      return 'collapsed'
    })
  }, [])

  return useMemo(
    () => ({
      state,
      setState,
      expand,
      collapse,
      toggle,
    }),
    [state, setState, expand, collapse, toggle]
  )
}

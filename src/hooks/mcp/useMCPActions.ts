'use client'

import { useEffect, useCallback, useRef } from 'react'

export interface BrowserAction {
  id: string
  type: 'refresh' | 'navigate' | 'highlight' | 'scroll_to' | 'custom'
  payload?: Record<string, unknown>
  timestamp: number
}

interface UseMCPActionsOptions {
  enabled?: boolean
  pollInterval?: number
  onAction?: (action: BrowserAction) => void
}

export function useMCPActions(options: UseMCPActionsOptions = {}) {
  const { enabled = true, pollInterval = 1000, onAction } = options
  const processedActionsRef = useRef<Set<string>>(new Set())

  const executeAction = useCallback((action: BrowserAction) => {
    // Skip if already processed
    if (processedActionsRef.current.has(action.id)) return
    processedActionsRef.current.add(action.id)

    // Call custom handler if provided
    onAction?.(action)

    switch (action.type) {
      case 'refresh':
        window.location.reload()
        break

      case 'navigate': {
        const url = action.payload?.url as string | undefined
        if (url) {
          window.location.href = url
        }
        break
      }

      case 'highlight': {
        const selector = action.payload?.selector as string | undefined
        if (selector) {
          const element = document.querySelector(selector) as HTMLElement | null
          if (element) {
            element.style.outline = '3px solid #22c55e'
            element.style.outlineOffset = '2px'
            setTimeout(() => {
              element.style.outline = ''
              element.style.outlineOffset = ''
            }, 3000)
          }
        }
        break
      }

      case 'scroll_to': {
        const selector = action.payload?.selector as string | undefined
        if (selector) {
          const element = document.querySelector(selector)
          element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
        break
      }

      case 'custom':
        // Custom actions are handled by onAction callback
        break
    }
  }, [onAction])

  const pollActions = useCallback(async () => {
    try {
      const response = await fetch('/api/mcp/actions')
      if (!response.ok) return

      const actions = await response.json() as BrowserAction[]
      for (const action of actions) {
        executeAction(action)
      }
    } catch {
      // Ignore poll errors
    }
  }, [executeAction])

  // Poll for actions
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return

    // Initial poll
    pollActions()

    // Set up interval
    const interval = setInterval(pollActions, pollInterval)

    return () => clearInterval(interval)
  }, [enabled, pollInterval, pollActions])

  // Cleanup old processed action IDs periodically
  useEffect(() => {
    const cleanup = setInterval(() => {
      // Keep only last 100 processed IDs
      const ids = Array.from(processedActionsRef.current)
      if (ids.length > 100) {
        processedActionsRef.current = new Set(ids.slice(-100))
      }
    }, 60000)

    return () => clearInterval(cleanup)
  }, [])

  return { pollActions }
}

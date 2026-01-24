/**
 * ToastPortal - Completion notification portal
 *
 * Renders toast notifications via portal for proper layering.
 * Used for completion feedback outside of the modal context.
 *
 * @module playground/quick-fix-modal/integration
 */

'use client'

import * as React from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/utils'
import { Toast } from '../../quick-fix-interactions/core/Toast'
import type { ToastConfig } from '../config/types'

export interface ToastPortalProps {
  /** Toast title */
  title: string
  /** Toast subtitle */
  subtitle?: string
  /** Custom icon component */
  icon?: React.ComponentType
  /** Whether toast is visible */
  visible: boolean
  /** Toast configuration */
  config: ToastConfig
  /** Duration before auto-hide (ms), 0 = no auto-hide */
  duration?: number
  /** Callback when toast is dismissed */
  onDismiss?: () => void
  /** Portal container (defaults to document.body) */
  container?: HTMLElement
  /** Additional className */
  className?: string
}

/**
 * ToastPortal Component
 *
 * Renders a toast notification via React portal.
 * Automatically handles dismiss timing and animation.
 */
export function ToastPortal({
  title,
  subtitle,
  icon,
  visible,
  config,
  duration = 3000,
  onDismiss,
  container,
  className,
}: ToastPortalProps) {
  const [mounted, setMounted] = React.useState(false)
  const [internalVisible, setInternalVisible] = React.useState(visible)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  // Handle client-side mounting
  React.useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  // Sync internal visibility with prop
  React.useEffect(() => {
    if (visible) {
      setInternalVisible(true)

      // Auto-dismiss after duration
      if (duration > 0) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(() => {
          setInternalVisible(false)
          onDismiss?.()
        }, duration)
      }
    } else {
      setInternalVisible(false)
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [visible, duration, onDismiss])

  // Don't render on server
  if (!mounted) return null

  // Get portal container
  const portalContainer = container || document.body

  return createPortal(
    <div
      className={cn(
        'fixed bottom-8 left-1/2 -translate-x-1/2 z-[100]',
        className
      )}
    >
      <Toast
        title={title}
        subtitle={subtitle}
        icon={icon}
        visible={internalVisible}
        config={config}
      />
    </div>,
    portalContainer
  )
}

// =============================================================================
// TOAST STACK (for multiple toasts)
// =============================================================================

export interface ToastItem {
  id: string
  title: string
  subtitle?: string
  icon?: React.ComponentType
}

export interface ToastStackProps {
  /** Array of toasts to display */
  toasts: ToastItem[]
  /** Toast configuration */
  config: ToastConfig
  /** Duration before auto-hide (ms) */
  duration?: number
  /** Callback when a toast is dismissed */
  onDismiss?: (id: string) => void
  /** Max number of visible toasts */
  maxVisible?: number
  /** Additional className */
  className?: string
}

/**
 * ToastStack Component
 *
 * Manages multiple stacked toast notifications.
 */
export function ToastStack({
  toasts,
  config,
  duration = 3000,
  onDismiss,
  maxVisible = 3,
  className,
}: ToastStackProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Only show up to maxVisible toasts
  const visibleToasts = toasts.slice(0, maxVisible)

  return createPortal(
    <div
      className={cn(
        'fixed bottom-8 left-1/2 -translate-x-1/2 z-[100]',
        'flex flex-col-reverse items-center gap-2',
        className
      )}
    >
      {visibleToasts.map((toast, index) => (
        <div
          key={toast.id}
          className="motion-safe:transition-all motion-safe:duration-200"
          style={{
            transform: `translateY(${-index * 8}px) scale(${1 - index * 0.05})`,
            opacity: 1 - index * 0.2,
            zIndex: visibleToasts.length - index,
          }}
        >
          <Toast
            title={toast.title}
            subtitle={toast.subtitle}
            icon={toast.icon}
            visible={true}
            config={config}
          />
        </div>
      ))}
    </div>,
    document.body
  )
}

// =============================================================================
// TOAST HOOK
// =============================================================================

export interface UseToastReturn {
  /** Show a toast */
  show: (title: string, subtitle?: string, icon?: React.ComponentType) => void
  /** Hide the current toast */
  hide: () => void
  /** Current toast state */
  toast: { title: string; subtitle?: string; icon?: React.ComponentType } | null
  /** Whether toast is visible */
  visible: boolean
}

/**
 * Hook for managing toast state.
 */
export function useToast(defaultDuration = 3000): UseToastReturn {
  const [toast, setToast] = React.useState<{
    title: string
    subtitle?: string
    icon?: React.ComponentType
  } | null>(null)
  const [visible, setVisible] = React.useState(false)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const show = React.useCallback(
    (title: string, subtitle?: string, icon?: React.ComponentType) => {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      setToast({ title, subtitle, icon })
      setVisible(true)

      // Auto-hide after duration
      if (defaultDuration > 0) {
        timeoutRef.current = setTimeout(() => {
          setVisible(false)
        }, defaultDuration)
      }
    },
    [defaultDuration]
  )

  const hide = React.useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setVisible(false)
  }, [])

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return { show, hide, toast, visible }
}

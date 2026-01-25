/**
 * LoginModal Component
 *
 * Simulated login flow for profile walkthrough.
 * Two-step flow: Choose Google or Email, then sign in.
 *
 * @module a/components
 */

'use client'

import * as React from 'react'
import { useState, useCallback } from 'react'
import { Dialog } from '@base-ui/react/dialog'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import Cancel01Icon from '@hugeicons-pro/core-stroke-rounded/Cancel01Icon'
import ArrowRight02Icon from '@hugeicons-pro/core-stroke-rounded/ArrowRight02Icon'
import Mail01Icon from '@hugeicons-pro/core-stroke-rounded/Mail01Icon'

// =============================================================================
// TYPES
// =============================================================================

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onSignIn: () => void
}

type AuthMethod = 'initial' | 'google' | 'email'

// =============================================================================
// GOOGLE ICON
// =============================================================================

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn('size-5', className)}
      aria-hidden="true"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  )
}

// =============================================================================
// INITIAL STEP
// =============================================================================

interface InitialStepProps {
  onSelectGoogle: () => void
  onSelectEmail: () => void
  email: string
  onEmailChange: (value: string) => void
}

function InitialStep({ onSelectGoogle, onSelectEmail, email, onEmailChange }: InitialStepProps) {
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      onSelectEmail()
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <Dialog.Title className="text-xl font-semibold text-white mb-2">
          Welcome to Delphi!
        </Dialog.Title>
        <Dialog.Description className="text-sm text-neutral-400">
          Sign in to save your conversation history and receive personalized advice.
        </Dialog.Description>
      </div>

      {/* Google Button */}
      <button
        type="button"
        onClick={onSelectGoogle}
        className={cn(
          'flex items-center justify-center gap-3',
          'w-full py-3.5 px-4',
          'bg-white text-neutral-900 font-medium',
          'rounded-full',
          'motion-safe:transition-all motion-safe:duration-150',
          'motion-reduce:transition-none',
          'hover:bg-neutral-100',
          'active:scale-[0.98]'
        )}
      >
        <GoogleIcon />
        <span>Continue with Google</span>
      </button>

      {/* Email Input */}
      <form onSubmit={handleEmailSubmit} className="relative">
        <input
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="Email"
          className={cn(
            'w-full py-3.5 px-4 pr-12',
            'bg-neutral-800 text-white placeholder:text-neutral-500',
            'rounded-full',
            'border border-neutral-700',
            'focus:outline-none focus:ring-2 focus:ring-neutral-600',
            'motion-safe:transition-all motion-safe:duration-150',
            'motion-reduce:transition-none'
          )}
        />
        <button
          type="submit"
          disabled={!email.trim()}
          className={cn(
            'absolute right-2 top-1/2 -translate-y-1/2',
            'size-9 rounded-full',
            'flex items-center justify-center',
            'bg-neutral-700 text-neutral-400',
            'motion-safe:transition-all motion-safe:duration-150',
            'motion-reduce:transition-none',
            'hover:bg-neutral-600 hover:text-neutral-300',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
        >
          <HugeIcon icon={ArrowRight02Icon} size={18} strokeWidth={2} />
        </button>
      </form>

      {/* Terms */}
      <p className="text-xs text-neutral-500 text-center">
        By continuing, you agree to our{' '}
        <button type="button" className="text-neutral-400 underline underline-offset-2 hover:text-neutral-300">
          terms and conditions
        </button>{' '}
        and{' '}
        <button type="button" className="text-neutral-400 underline underline-offset-2 hover:text-neutral-300">
          privacy policy
        </button>
        .
      </p>
    </div>
  )
}

// =============================================================================
// SIGNING IN STEP
// =============================================================================

interface SigningInStepProps {
  method: 'google' | 'email'
  email?: string
  onSignIn: () => void
  onBack: () => void
}

function SigningInStep({ method, email, onSignIn, onBack }: SigningInStepProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async () => {
    setIsLoading(true)
    // Simulate a brief loading state
    await new Promise((resolve) => setTimeout(resolve, 800))
    onSignIn()
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <Dialog.Title className="text-xl font-semibold text-white mb-2">
          {method === 'google' ? 'Continue with Google' : 'Sign in with Email'}
        </Dialog.Title>
        <Dialog.Description className="text-sm text-neutral-400">
          {method === 'google'
            ? 'Click below to complete your sign in with Google.'
            : `We'll sign you in as ${email || 'user@example.com'}.`}
        </Dialog.Description>
      </div>

      {/* Account Preview */}
      <div className={cn(
        'flex items-center gap-3 p-4',
        'bg-neutral-800 rounded-xl',
        'border border-neutral-700'
      )}>
        {method === 'google' ? (
          <>
            <div className="size-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-semibold text-sm">D</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white">Demo User</p>
              <p className="text-xs text-neutral-400 truncate">demo@example.com</p>
            </div>
            <GoogleIcon className="shrink-0" />
          </>
        ) : (
          <>
            <div className="size-10 rounded-full bg-neutral-700 flex items-center justify-center">
              <HugeIcon icon={Mail01Icon} size={20} className="text-neutral-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{email || 'user@example.com'}</p>
              <p className="text-xs text-neutral-400">Email sign in</p>
            </div>
          </>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={handleSignIn}
          disabled={isLoading}
          className={cn(
            'flex items-center justify-center gap-2',
            'w-full py-3.5 px-4',
            'bg-white text-neutral-900 font-medium',
            'rounded-full',
            'motion-safe:transition-all motion-safe:duration-150',
            'motion-reduce:transition-none',
            'hover:bg-neutral-100',
            'active:scale-[0.98]',
            'disabled:opacity-70 disabled:cursor-not-allowed'
          )}
        >
          {isLoading ? (
            <>
              <svg className="size-5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="opacity-25"
                />
                <path
                  d="M4 12a8 8 0 018-8"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="opacity-75"
                />
              </svg>
              <span>Signing in...</span>
            </>
          ) : (
            <span>Sign in</span>
          )}
        </button>

        <button
          type="button"
          onClick={onBack}
          disabled={isLoading}
          className={cn(
            'text-sm text-neutral-400',
            'hover:text-neutral-300',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
        >
          Use a different method
        </button>
      </div>
    </div>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function LoginModal({ isOpen, onClose, onSignIn }: LoginModalProps) {
  const [authMethod, setAuthMethod] = useState<AuthMethod>('initial')
  const [email, setEmail] = useState('')

  const handleSelectGoogle = useCallback(() => {
    setAuthMethod('google')
  }, [])

  const handleSelectEmail = useCallback(() => {
    setAuthMethod('email')
  }, [])

  const handleBack = useCallback(() => {
    setAuthMethod('initial')
  }, [])

  const handleSignIn = useCallback(() => {
    onSignIn()
    // Reset state after sign in
    setAuthMethod('initial')
    setEmail('')
  }, [onSignIn])

  // Reset state when modal closes
  React.useEffect(() => {
    if (!isOpen) {
      setAuthMethod('initial')
    }
  }, [isOpen])

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Backdrop
          className={cn(
            'fixed inset-0 bg-black/60 backdrop-blur-sm',
            'motion-safe:transition-opacity motion-safe:duration-200',
            'motion-reduce:transition-none',
            'data-[starting-style]:opacity-0',
            'data-[ending-style]:opacity-0'
          )}
        />
        <Dialog.Popup
          className={cn(
            'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
            'w-full max-w-md',
            'bg-neutral-900 rounded-3xl shadow-2xl',
            'p-6',
            'motion-safe:transition-all motion-safe:duration-200',
            'motion-reduce:transition-none',
            'data-[starting-style]:opacity-0 data-[starting-style]:scale-95',
            'data-[ending-style]:opacity-0 data-[ending-style]:scale-95'
          )}
        >
          {/* Close Button */}
          <Dialog.Close
            className={cn(
              'absolute top-4 right-4',
              'size-8 rounded-full flex items-center justify-center',
              'text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800',
              'motion-safe:transition-colors motion-safe:duration-150',
              'motion-reduce:transition-none'
            )}
          >
            <HugeIcon icon={Cancel01Icon} size={20} strokeWidth={1.5} />
          </Dialog.Close>

          {/* Content */}
          {authMethod === 'initial' ? (
            <InitialStep
              onSelectGoogle={handleSelectGoogle}
              onSelectEmail={handleSelectEmail}
              email={email}
              onEmailChange={setEmail}
            />
          ) : (
            <SigningInStep
              method={authMethod}
              email={email}
              onSignIn={handleSignIn}
              onBack={handleBack}
            />
          )}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

/**
 * Profile Page - /a
 *
 * Combined view/edit profile with:
 * - Preview mode ↔ Edit mode flow
 * - Fully functional QuestionsListWithImprove
 * - Login/logout authentication flow
 * - Save feedback toast
 *
 * Route: /a
 *
 * @module a
 */

'use client'

import * as React from 'react'
import { useState, useCallback, useRef, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'

// Auth
import { useAuth } from './hooks/useAuth'
import { LoginModal } from './components/LoginModal'

// Profile components
import { EditProfileForm } from './components/edit-profile-form'
import type { ProfileFormData } from './types'

// Questions system
import { QuestionsListWithImprove } from '@/app/questions-list/components/QuestionsListWithImprove'
import type { Question } from '@/components/ui/features/question-command-menu/flow'

// Modal & Toast
import { QuickFixModal } from '@/app/playground/archived/quick-fix-modal/core/QuickFixModal'
import { EDIT_QUESTIONS_MODAL_PRESET } from '@/app/playground/archived/quick-fix-modal/config/presets'
import type { IntegrationConfig } from '@/app/playground/archived/quick-fix-modal/config/types'
import { ConfigurableToast } from '@/components/ui/features/success-toast'
import type { SuccessToastConfig } from '@/components/ui/features/success-toast'

// UI Components
import { Button } from '@/components/ui/core/primitives/button'
import Logout03Icon from '@hugeicons-pro/core-stroke-rounded/Logout03Icon'
import ViewIcon from '@hugeicons-pro/core-stroke-rounded/ViewIcon'
import ViewOffIcon from '@hugeicons-pro/core-stroke-rounded/ViewOffIcon'

// =============================================================================
// DATA
// =============================================================================

const initialProfileData: ProfileFormData = {
  name: 'Derick Fiebiger',
  organization: {
    name: 'Payva',
    logo: '/org-logo.png',
    role: 'Design Engineer',
  },
  headline: '',
  bio: "Welcome to my mentorship profile where I help professionals accelerate their career growth through personalized guidance and strategic advice. Each session is tailored to your unique goals, whether you are navigating a career transition, building leadership skills, or seeking industry insights.",
  questions: [
    'How did you transition into your current role?',
    'What technologies are you most excited about?',
    'How would you describe your communication style?',
    'How do you approach building and leading teams?',
  ],
  socialLinks: ['linkedin.com/in/derickfiebiger', 'fiebsy.medium.com/'],
}

const INITIAL_QUESTIONS = [
  { text: 'How did you transition into your current role?' },
  { text: 'What technologies are you most excited about?' },
  { text: 'How would you describe your communication style?' },
  { text: 'How do you approach building and leading teams?' },
]

// =============================================================================
// TOAST CONFIG
// =============================================================================

const SUCCESS_TOAST_CONFIG: SuccessToastConfig = {
  container: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 32,
    background: 'secondary',
    shine: 'shine-1',
    shineIntensity: '-subtle',
    cornerShape: 'squircle',
  },
  icon: {
    containerSize: 28,
    iconSize: 20,
    containerBackground: 'success-secondary',
    iconColor: 'success-primary',
    containerBorderRadius: 10,
  },
  typography: {
    titleSize: 'text-sm',
    titleWeight: 'font-medium',
    titleColor: 'primary',
    subtitleSize: 'text-xs',
    subtitleWeight: 'font-normal',
    subtitleColor: 'tertiary',
  },
  progress: {
    height: 3,
    background: 'tertiary/20',
    fillColor: 'brand-primary',
    borderRadius: 0,
  },
  behavior: {
    duration: 5500,
    animationDuration: 250,
    animationDirection: 'up',
  },
  content: {
    title: 'Changes saved',
    subtitle: 'Your profile has been updated',
    iconType: 'checkmark',
  },
}

// =============================================================================
// INTEGRATION CONFIG
// =============================================================================

const QUESTIONS_INTEGRATION_CONFIG: IntegrationConfig = {
  mode: 'modal',
  showHeader: true,
  showBackButton: true,
  showCloseButton: true,
  headerTitle: 'Improve Answer',
  showStepIndicator: false,
  onCompleteAction: 'close',
}

// =============================================================================
// CONSTANTS
// =============================================================================

const REGENERATION_DELAY = 2500 // Time to show loading spinners (ms)

// =============================================================================
// VIEW MODE COMPONENT
// =============================================================================

interface ViewContentProps {
  profileData: ProfileFormData
  questions: string[]
  onEdit: () => void
}

function ViewContent({ profileData, questions, onEdit }: ViewContentProps) {
  return (
    <>
      {/* Header actions */}
      <header className="mb-6 flex items-center justify-end gap-2">
        <span className="flex items-center gap-1.5 rounded-full bg-tertiary px-2.5 py-1.5 text-sm font-medium text-tertiary">
          <LockIcon />
          Private
        </span>
        <button
          type="button"
          onClick={onEdit}
          className="flex items-center gap-1.5 rounded-full bg-quaternary px-3 py-1.5 text-base font-[450] text-primary transition-colors hover:bg-quaternary"
        >
          Edit
        </button>
      </header>

      {/* Profile image */}
      <div
        className="relative mb-6 size-36 overflow-hidden shadow-lg"
        style={{ borderRadius: 32 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/feebs-avatar-500.png"
          alt={`${profileData.name}'s profile`}
          className="size-full object-cover"
        />
      </div>

      {/* Name */}
      <h1 className="-ml-0.5 mb-3 text-[clamp(36px,10vw,52px)] font-semibold leading-[1.1]">
        {profileData.name}
      </h1>

      {/* Organization line */}
      <div className="mb-2 flex items-center gap-2 text-md">
        {profileData.organization.logo && (
          <img
            alt={profileData.organization.name}
            src={profileData.organization.logo}
            className="size-[22px] rounded-[6px] object-contain"
          />
        )}
        <span className="font-medium">{profileData.organization.name}</span>
        {profileData.organization.role && (
          <>
            <span className="opacity-60">·</span>
            <span>{profileData.organization.role}</span>
          </>
        )}
        <VerifiedBadge />
      </div>

      {/* Clone association */}
      <p className="mb-5 text-sm text-tertiary">
        This clone is associated with the person it represents.
      </p>

      {/* Bio */}
      <p className="mb-8 text-[18px] leading-relaxed">{profileData.bio}</p>

      {/* Questions section */}
      <section className="mb-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-xl font-[580]">
            <ChatBubbleIcon />
            Ask me about
          </h2>
          <button
            type="button"
            className="flex items-center gap-1 rounded-full bg-quaternary px-2 py-1.5 text-[13px] font-[500] opacity-70 transition-colors hover:opacity-100"
          >
            <HistoryIcon />
            Chats
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {questions.map((question, index) => (
            <button
              key={index}
              type="button"
              className={cn(
                'w-fit rounded-[20px] bg-tertiary px-4 py-3',
                'text-left transition-all hover:bg-quaternary active:scale-[0.98]'
              )}
            >
              {question}
            </button>
          ))}
        </div>
      </section>

      {/* Social links */}
      {profileData.socialLinks.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-4 text-md opacity-60">
            Follow {profileData.name.split(' ')[0]} for more...
          </h2>
          <div className="flex flex-wrap gap-2">
            {profileData.socialLinks.map((link, index) => {
              const parsed = parseUrl(link)
              return (
                <a
                  key={index}
                  href={parsed.fullUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl bg-tertiary p-1.5 opacity-60 transition-all hover:bg-quaternary hover:opacity-100"
                  aria-label={parsed.icon === 'linkedin' ? 'LinkedIn' : parsed.domain}
                >
                  {parsed.icon === 'linkedin' ? <LinkedInIcon /> : <GlobeIcon />}
                </a>
              )
            })}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="pt-4 text-xs opacity-50">
        <p>
          © 2026 Delphi ·{' '}
          <a href="/terms-of-use" className="hover:opacity-100">
            Terms
          </a>{' '}
          ·{' '}
          <a href="/privacy-policy" className="hover:opacity-100">
            Privacy
          </a>
        </p>
      </footer>
    </>
  )
}

// =============================================================================
// QUESTIONS WRAPPER COMPONENT
// =============================================================================

interface QuestionsWrapperProps {
  initialQuestions: typeof INITIAL_QUESTIONS
  onQuestionsChange: (questions: Question[]) => void
  onImproveAnswer: (questionId: string) => void
  regeneratingIds: Set<string>
  registerRegenerate: (fn: (questionId: string) => void) => void
  isLocked?: boolean
  onLockedChange?: (locked: boolean) => void
}

function QuestionsWrapper({
  initialQuestions,
  onQuestionsChange,
  onImproveAnswer,
  regeneratingIds,
  registerRegenerate,
  isLocked,
  onLockedChange,
}: QuestionsWrapperProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="mb-2 ml-4 flex items-baseline gap-2">
        <label className="text-sm font-medium text-primary">
          Ask me about
        </label>
        <span className="text-xs text-tertiary">optional</span>
      </div>
      <QuestionsListWithImprove
        questionCount={5}
        initialQuestions={initialQuestions}
        layout={{ triggerWidth: 480, panelWidth: 520 }}
        onChange={onQuestionsChange}
        onImproveAnswer={onImproveAnswer}
        onRegisterRegenerate={registerRegenerate}
        regeneratingIds={regeneratingIds}
        isLocked={isLocked}
        onLockedChange={onLockedChange}
      />
    </div>
  )
}

// =============================================================================
// PAGE COMPONENT
// =============================================================================

export default function ProfilePage() {
  return (
    <React.Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-primary">
        <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-brand-primary" />
      </div>
    }>
      <ProfilePageContent />
    </React.Suspense>
  )
}

function ProfilePageContent() {
  // Auth
  const { isAuthenticated, isLoading, showLoginModal, signIn, signOut, closeLoginModal } = useAuth()

  // URL params for mode persistence (survives hot reload)
  const searchParams = useSearchParams()

  // Mode - initialized from URL param, defaults to 'view'
  const [mode, setModeState] = useState<'view' | 'edit'>(() => {
    const urlMode = searchParams.get('mode')
    return urlMode === 'edit' ? 'edit' : 'view'
  })

  // Sync URL when mode changes
  const setMode = useCallback((newMode: 'view' | 'edit') => {
    setModeState(newMode)
    const url = new URL(window.location.href)
    if (newMode === 'edit') {
      url.searchParams.set('mode', 'edit')
    } else {
      url.searchParams.delete('mode')
    }
    window.history.replaceState({}, '', url)
  }, [])

  // Sync state from URL on initial load (handles browser back/forward)
  useEffect(() => {
    const urlMode = searchParams.get('mode')
    const expectedMode = urlMode === 'edit' ? 'edit' : 'view'
    if (mode !== expectedMode) {
      setModeState(expectedMode)
    }
  }, [searchParams, mode])

  const [profileData, setProfileData] = useState(initialProfileData)

  // Questions for view mode (filtered strings)
  const viewQuestions = useMemo(() => {
    return profileData.questions.filter(Boolean)
  }, [profileData.questions])

  // Questions system (for QuestionsListWithImprove)
  // Initialize with same data structure as QuestionsListWithImprove
  const [questions, setQuestions] = useState<Question[]>(() =>
    INITIAL_QUESTIONS.map((q, i) => ({
      id: `q-${i}`,
      text: q.text,
      response: `This is a pre-filled response for: "${q.text}"`,
      confidence: 0.85,
      status: 'response' as const,
    }))
  )
  const [regeneratingIds, setRegeneratingIds] = useState<Set<string>>(new Set())
  const regenerateRef = useRef<((questionId: string) => void) | null>(null)

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null)

  // Focus mode - dims other sections to highlight questions
  const [focusMode, setFocusMode] = useState(true)

  // Lock mode - keeps expanded menus open for debugging
  const [lockExpanded, setLockExpanded] = useState(false)

  // Toast state
  const [showToast, setShowToast] = useState(false)
  const [toastContent, setToastContent] = useState<{
    title: string
    subtitle: string
    iconType: 'checkmark' | 'party' | 'sparkles' | 'arrow-up'
  }>({
    title: 'Changes saved',
    subtitle: 'Your profile has been updated',
    iconType: 'checkmark',
  })

  // Memoize the regeneratingIds set for stable reference
  const regeneratingIdsSet = useMemo(() => regeneratingIds, [regeneratingIds])

  // Handle "Improve answer" button click
  const handleImproveAnswer = useCallback((questionId: string) => {
    setActiveQuestionId(questionId)
    setIsModalOpen(true)
  }, [])

  // Handle modal completion
  const handleModalComplete = useCallback(() => {
    setIsModalOpen(false)

    // Get all questions that have responses (not empty/idle questions)
    const answeredQuestionIds = questions
      .filter((q) => q.text && q.response)
      .map((q) => q.id)

    // Set all answered questions to regenerating
    setRegeneratingIds(new Set(answeredQuestionIds))

    // After delay, clear regenerating state and show toast
    setTimeout(() => {
      // Clear regenerating state - icons will transition to green checks
      setRegeneratingIds(new Set())

      // Show success toast
      setToastContent({
        title: 'Question improved',
        subtitle: 'Your answer has been updated',
        iconType: 'sparkles',
      })
      setShowToast(true)

      // Trigger regeneration on the specific question that was improved
      if (activeQuestionId && regenerateRef.current) {
        regenerateRef.current(activeQuestionId)
      }
    }, REGENERATION_DELAY)

    setActiveQuestionId(null)
  }, [questions, activeQuestionId])

  // Handle save from edit form
  const handleSave = useCallback(
    (formData: ProfileFormData) => {
      // Merge question texts from QuestionsListWithImprove
      const updatedData = {
        ...formData,
        questions: questions.map((q) => q.text).filter(Boolean),
      }

      setProfileData(updatedData)
      setToastContent({
        title: 'Changes saved',
        subtitle: 'Your profile has been updated',
        iconType: 'checkmark',
      })
      setShowToast(true)
      setMode('view')
    },
    [questions]
  )

  // Handle cancel from edit form
  const handleCancel = useCallback(() => {
    setMode('view')
  }, [])

  // Handle toast dismiss
  const handleToastDismiss = useCallback(() => {
    setShowToast(false)
  }, [])

  // Register regenerate function
  const registerRegenerate = useCallback((fn: (questionId: string) => void) => {
    regenerateRef.current = fn
  }, [])

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-primary">
        <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-brand-primary" />
      </div>
    )
  }

  return (
    <>
      {/* Nav clearance */}
      <div className="nav-clearance" />

      {/* Main content */}
      <main className="mx-auto max-w-[528px] px-6 pb-32">
        {isAuthenticated && (
          <>
            {mode === 'view' ? (
              <ViewContent
                profileData={profileData}
                questions={viewQuestions}
                onEdit={() => setMode('edit')}
              />
            ) : (
              <EditProfileForm
                initialData={profileData}
                onSave={handleSave}
                onCancel={handleCancel}
                focusMode={focusMode}
                questionsSlot={
                  <QuestionsWrapper
                    initialQuestions={INITIAL_QUESTIONS}
                    onQuestionsChange={setQuestions}
                    onImproveAnswer={handleImproveAnswer}
                    regeneratingIds={regeneratingIdsSet}
                    registerRegenerate={registerRegenerate}
                    isLocked={lockExpanded}
                    onLockedChange={setLockExpanded}
                  />
                }
              />
            )}
          </>
        )}
      </main>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={closeLoginModal}
        onSignIn={signIn}
      />

      {/* QuickFix Modal */}
      <QuickFixModal
        open={isModalOpen}
        onOpenChange={(open) => !open && setIsModalOpen(false)}
        config={EDIT_QUESTIONS_MODAL_PRESET.config}
        integration={QUESTIONS_INTEGRATION_CONFIG}
        onComplete={handleModalComplete}
      />

      {/* Success Toast */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <ConfigurableToast
          config={{
            ...SUCCESS_TOAST_CONFIG,
            content: toastContent,
          }}
          visible={showToast}
          onDismiss={handleToastDismiss}
        />
      </div>

      {/* Bottom right buttons */}
      {isAuthenticated && (
        <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
          <Button
            variant={lockExpanded ? 'primary' : 'tertiary'}
            size="sm"
            onClick={() => setLockExpanded(!lockExpanded)}
          >
            {lockExpanded ? 'Unlock' : 'Lock'}
          </Button>
          <Button
            variant={focusMode ? 'secondary' : 'tertiary'}
            size="sm"
            iconLeading={focusMode ? ViewOffIcon : ViewIcon}
            onClick={() => setFocusMode(!focusMode)}
          />
          <Button
            variant="tertiary"
            size="sm"
            iconLeading={Logout03Icon}
            onClick={signOut}
          />
        </div>
      )}
    </>
  )
}

// =============================================================================
// HELPERS
// =============================================================================

function parseUrl(url: string) {
  let normalizedUrl = url
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    normalizedUrl = `https://${url}`
  }

  try {
    const urlObj = new URL(normalizedUrl)
    const hostname = urlObj.hostname.replace('www.', '')

    return {
      domain: hostname,
      fullUrl: normalizedUrl,
      icon: hostname.includes('linkedin.com') ? ('linkedin' as const) : ('globe' as const),
    }
  } catch {
    return {
      domain: url,
      fullUrl: `https://${url}`,
      icon: 'globe' as const,
    }
  }
}

// =============================================================================
// ICONS
// =============================================================================

function LockIcon() {
  return (
    <svg className="size-4" viewBox="0 0 24 24" fill="none">
      <path
        d="M17 10V8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8V10M12 14.5V16.5M8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C17.7202 10 16.8802 10 15.2 10H8.8C7.11984 10 6.27976 10 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function VerifiedBadge() {
  return (
    <svg className="size-5 text-fg-brand-primary" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 12L11 14L15 10M7.33377 3.8187C8.1376 3.75455 8.90071 3.43846 9.51447 2.91542C10.9467 1.69486 13.0533 1.69486 14.4855 2.91542C15.0993 3.43846 15.8624 3.75455 16.6662 3.8187C18.5421 3.96812 20.0319 5.45794 20.1813 7.33377C20.2455 8.1376 20.5615 8.90071 21.0846 9.51447C22.3051 10.9467 22.3051 13.0533 21.0846 14.4855C20.5615 15.0993 20.2455 15.8624 20.1813 16.6662C20.0319 18.5421 18.5421 20.0319 16.6662 20.1813C15.8624 20.2455 15.0993 20.5615 14.4855 21.0846C13.0533 22.3051 10.9467 22.3051 9.51447 21.0846C8.90071 20.5615 8.1376 20.2455 7.33377 20.1813C5.45794 20.0319 3.96812 18.5421 3.8187 16.6662C3.75455 15.8624 3.43846 15.0993 2.91542 14.4855C1.69486 13.0533 1.69486 10.9467 2.91542 9.51447C3.43846 8.90071 3.75455 8.1376 3.8187 7.33377C3.96812 5.45794 5.45794 3.96812 7.33377 3.8187Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChatBubbleIcon() {
  return (
    <svg className="size-4" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.999 9.505c0 4.73-4.59 8.273-9.853 8.273-1.214 0-2.38-.185-3.459-.523-.431.315-.94.584-1.441.803-.709.309-1.48.552-2.173.698-.644.136-1.372.222-1.915.09-.25-.06-.788-.25-.97-.843-.17-.559.122-1.027.296-1.254.976-1.276 1.383-1.912 1.472-2.637C.916 12.808.293 11.224.293 9.505c0-4.73 4.589-8.273 9.853-8.273s9.853 3.543 9.853 8.273"
      />
    </svg>
  )
}

function HistoryIcon() {
  return (
    <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 5.99932V5C4 4.44772 3.55228 4 3 4C2.44772 4 2 4.44772 2 5V9C2 9.55228 2.44772 10 3 10H7C7.55228 10 8 9.55228 8 9C8 8.44772 7.55228 8 7 8H5.06997C6.45395 5.60755 9.04015 4 12 4C16.4182 4 20 7.58172 20 12C20 16.4183 16.4182 20 12 20C8.51828 20 5.55363 17.7753 4.45492 14.6668C4.27088 14.146 3.69955 13.8731 3.17884 14.0572C2.65812 14.2412 2.3852 14.8125 2.56925 15.3332C3.94156 19.2159 7.64434 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C8.72763 2 5.82381 3.57164 4 5.99932ZM12 7C12.5523 7 13 7.44772 13 8V11.5858L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L11.2929 12.7071C11.1054 12.5196 11 12.2652 11 12V8C11 7.44772 11.4477 7 12 7Z"
      />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.65 3H4.35C3.99196 3 3.64858 3.14223 3.39541 3.39541C3.14223 3.64858 3 3.99196 3 4.35V19.65C3 20.008 3.14223 20.3514 3.39541 20.6046C3.64858 20.8578 3.99196 21 4.35 21H19.65C20.008 21 20.3514 20.8578 20.6046 20.6046C20.8578 20.3514 21 20.008 21 19.65V4.35C21 3.99196 20.8578 3.64858 20.6046 3.39541C20.3514 3.14223 20.008 3 19.65 3ZM8.4 18.3H5.7V10.2H8.4V18.3ZM7.05 8.625C6.74056 8.61616 6.4406 8.51632 6.18758 8.33797C5.93456 8.15962 5.7397 7.91066 5.62737 7.6222C5.51503 7.33374 5.49019 7.01857 5.55595 6.71607C5.6217 6.41358 5.77515 6.13716 5.9971 5.92138C6.21906 5.70559 6.49968 5.55999 6.80391 5.50278C7.10814 5.44556 7.42248 5.47927 7.70766 5.59969C7.99284 5.7201 8.23622 5.92189 8.40737 6.17983C8.57853 6.43778 8.66987 6.74044 8.67 7.05C8.66289 7.47331 8.4885 7.8766 8.18495 8.17173C7.88139 8.46685 7.47335 8.62982 7.05 8.625ZM18.3 18.3H15.6V14.034C15.6 12.756 15.06 12.297 14.358 12.297C14.1522 12.3107 13.9511 12.3649 13.7663 12.4566C13.5815 12.5482 13.4166 12.6755 13.2811 12.831C13.1457 12.9866 13.0422 13.1674 12.9768 13.363C12.9114 13.5586 12.8853 13.7652 12.9 13.971C12.8955 14.0129 12.8955 14.0551 12.9 14.097V18.3H10.2V10.2H12.81V11.37C13.0733 10.9695 13.435 10.6433 13.8605 10.4227C14.286 10.2021 14.761 10.0944 15.24 10.11C16.635 10.11 18.264 10.884 18.264 13.404L18.3 18.3Z" />
    </svg>
  )
}

function GlobeIcon() {
  return (
    <svg className="size-5" viewBox="0 0 24 24" fill="none">
      <path
        d="M21 12C21 16.9706 16.9706 21 12 21M21 12C21 7.02944 16.9706 3 12 3M21 12H3M12 21C7.02944 21 3 16.9706 3 12M12 21C9.79086 21 8 16.9706 8 12C8 7.02944 9.79086 3 12 3M12 21C14.2091 21 16 16.9706 16 12C16 7.02944 14.2091 3 12 3M3 12C3 7.02944 7.02944 3 12 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
      />
    </svg>
  )
}

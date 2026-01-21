/**
 * AI Profile Raw - Hardcoded Base Layer
 *
 * Fixed visual implementation extracted from the AI Playground.
 * This serves as the source/reference implementation with hardcoded values.
 *
 * Route: /a/raw
 * @module a/raw
 */

'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { ProfileMode, ProfileFormData } from '../playground/types'
import { EditProfileForm } from '../playground/components/edit-profile-form'
import { config, initialProfileData } from './config'
import { ProfileGradient } from './components/ProfileGradient'
import { ProfileHeader } from './components/ProfileHeader'
import { AskMeAboutCard } from './components/AskMeAboutCard'

// CSS for squircle clip path (matching Delphi's profile image)
const squircleClipPath = `path('M0 54C0 29.1898 0 16.7847 6.81896 8.91159C8.26871 7.21128 9.92653 5.70228 11.7549 4.42159C20.1339 -1.44861 33.1961 -1.44861 59.3206 -1.44861H84.6794C110.804 -1.44861 123.866 -1.44861 132.245 4.42159C134.073 5.70228 135.731 7.21128 137.181 8.91159C144 16.7847 144 29.1898 144 54V90C144 114.81 144 127.215 137.181 135.088C135.731 136.789 134.073 138.298 132.245 139.578C123.866 145.449 110.804 145.449 84.6794 145.449H59.3206C33.1961 145.449 20.1339 145.449 11.7549 139.578C9.92653 138.298 8.26871 136.789 6.81896 135.088C0 127.215 0 114.81 0 90V54Z')`

export default function ProfileRaw() {
  const [mode, setMode] = useState<ProfileMode>('view')
  const [profileData, setProfileData] = useState<ProfileFormData>(initialProfileData)
  const [isImageEnlarged, setIsImageEnlarged] = useState(false)

  return (
    <div className="min-h-screen bg-secondary">
      {/* Nav clearance - matches playground structure */}
      <div className="nav-clearance" />

      {/* Preview Area */}
      <div className="pb-24 md:pb-0">
        <div
          className="flex-1 p-6 pb-32 pt-0 tracking-[-0.015em]"
          style={{ marginTop: config.topPadding - 56 }}
        >
          <div
            className="relative mx-auto"
            style={{ maxWidth: config.contentMaxWidth }}
          >
            {/* Decorative gradient background */}
            {config.gradientEnabled && <ProfileGradient />}

            {/* Content wrapper */}
            <div className="relative z-10 text-secondary">
              {/* Content - View or Edit mode */}
              <div key={mode}>
                {mode === 'view' ? (
                  <div className="relative z-10">
                    {/* Header actions */}
                    <ProfileHeader onEdit={() => setMode('edit')} />

                    {/* Profile image - click to enlarge */}
                    <button
                      type="button"
                      onClick={() => setIsImageEnlarged(!isImageEnlarged)}
                      className="group relative cursor-pointer transition-transform duration-300 ease-out"
                      style={{
                        transform: isImageEnlarged ? 'scale(1.5)' : 'scale(1)',
                        transformOrigin: 'top left',
                      }}
                    >
                      <div
                        className="relative overflow-hidden shadow-lg"
                        style={{
                          width: 144,
                          height: 144,
                          clipPath: squircleClipPath,
                        }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/skwircle-kid.png"
                          alt={`${profileData.name}'s profile`}
                          className="absolute inset-0 size-full object-cover"
                        />
                        {/* Inset shadow overlay */}
                        <div
                          className="pointer-events-none absolute inset-0"
                          style={{
                            clipPath: squircleClipPath,
                            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
                          }}
                        />
                      </div>
                    </button>

                    {/* Name */}
                    <h1
                      className="mt-6 mb-3 -ml-0.5 font-semibold leading-[1.1] animate-in fade-in slide-in-from-bottom-4"
                      style={{
                        fontSize: 'clamp(36px, 10vw, 52px)',
                        animationDelay: '60ms',
                        animationDuration: '500ms',
                        animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                        animationFillMode: 'backwards',
                      }}
                    >
                      {profileData.name}
                    </h1>

                    {/* Organization line with verified badge */}
                    <div
                      className="flex items-center gap-2 pb-5 text-md opacity-70 animate-in fade-in slide-in-from-bottom-4"
                      style={{
                        animationDelay: '120ms',
                        animationDuration: '500ms',
                        animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                        animationFillMode: 'backwards',
                      }}
                    >
                      {profileData.organization.logo && (
                        <div className="flex size-[22px] items-center justify-center">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            alt={profileData.organization.name}
                            src={profileData.organization.logo}
                            className="size-[22px] rounded-[6px] object-contain"
                          />
                        </div>
                      )}
                      <span>{profileData.headline || profileData.organization.role}</span>
                      {profileData.organization.name && (
                        <>
                          <span className="opacity-60">at</span>
                          <span className="font-medium opacity-100">
                            {profileData.organization.name}
                          </span>
                          <VerifiedBadge />
                        </>
                      )}
                    </div>

                    {/* Bio section */}
                    <section
                      className="pb-5 animate-in fade-in slide-in-from-bottom-4"
                      style={{
                        animationDelay: '180ms',
                        animationDuration: '500ms',
                        animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                        animationFillMode: 'backwards',
                      }}
                    >
                      <p className="text-[18px] leading-relaxed">{profileData.bio}</p>
                    </section>

                    {/* Questions section */}
                    <AskMeAboutCard questions={profileData.questions} />

                    {/* Social links section */}
                    {profileData.socialLinks.length > 0 && (
                      <div
                        className="animate-in fade-in slide-in-from-bottom-4"
                        style={{
                          animationDelay: '300ms',
                          animationDuration: '500ms',
                          animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                          animationFillMode: 'backwards',
                        }}
                      >
                        <h2 className="pb-4 text-md opacity-60">
                          Follow {profileData.name.split(' ')[0]} for more...
                        </h2>
                        <div className="-ml-1 flex flex-wrap gap-2">
                          {profileData.socialLinks.map((link, index) => {
                            const parsed = parseUrl(link)
                            return (
                              <a
                                key={index}
                                href={parsed.fullUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                  'rounded-2xl bg-tertiary p-1.5',
                                  'opacity-60',
                                  'hover:bg-quaternary',
                                  'hover:opacity-100',
                                  'transition-all'
                                )}
                                aria-label={parsed.icon === 'linkedin' ? 'LinkedIn' : parsed.domain}
                              >
                                {parsed.icon === 'linkedin' ? <LinkedInIcon /> : <GlobeIcon />}
                              </a>
                            )
                          })}
                        </div>
                      </div>
                    )}

                    {/* Footer */}
                    <footer className="w-fit pb-4 pt-[25px] text-left text-xs opacity-50">
                      <p>
                        © 2026 Delphi ·{' '}
                        <a
                          href="/terms-of-use"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-opacity hover:opacity-100"
                        >
                          Terms
                        </a>{' '}
                        ·{' '}
                        <a
                          href="/privacy-policy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-opacity hover:opacity-100"
                        >
                          Privacy
                        </a>
                      </p>
                    </footer>
                  </div>
                ) : (
                  <EditProfileForm
                    initialData={profileData}
                    onSave={(data) => {
                      setProfileData(data)
                      setMode('view')
                    }}
                    onCancel={() => setMode('view')}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Parse URL to extract domain and determine icon
 */
function parseUrl(url: string): {
  domain: string
  fullUrl: string
  icon: 'linkedin' | 'globe'
} {
  let normalizedUrl = url
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    normalizedUrl = `https://${url}`
  }

  try {
    const urlObj = new URL(normalizedUrl)
    const hostname = urlObj.hostname.replace('www.', '')

    let icon: 'linkedin' | 'globe' = 'globe'
    if (hostname.includes('linkedin.com')) {
      icon = 'linkedin'
    }

    return {
      domain: hostname,
      fullUrl: normalizedUrl,
      icon,
    }
  } catch {
    return {
      domain: url,
      fullUrl: `https://${url}`,
      icon: 'globe',
    }
  }
}

// Icons
function VerifiedBadge() {
  return (
    <svg
      className="size-5 text-fg-brand-primary"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
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

function LinkedInIcon() {
  return (
    <svg
      className="size-5"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M19.65 3H4.35C3.99196 3 3.64858 3.14223 3.39541 3.39541C3.14223 3.64858 3 3.99196 3 4.35V19.65C3 20.008 3.14223 20.3514 3.39541 20.6046C3.64858 20.8578 3.99196 21 4.35 21H19.65C20.008 21 20.3514 20.8578 20.6046 20.6046C20.8578 20.3514 21 20.008 21 19.65V4.35C21 3.99196 20.8578 3.64858 20.6046 3.39541C20.3514 3.14223 20.008 3 19.65 3ZM8.4 18.3H5.7V10.2H8.4V18.3ZM7.05 8.625C6.74056 8.61616 6.4406 8.51632 6.18758 8.33797C5.93456 8.15962 5.7397 7.91066 5.62737 7.6222C5.51503 7.33374 5.49019 7.01857 5.55595 6.71607C5.6217 6.41358 5.77515 6.13716 5.9971 5.92138C6.21906 5.70559 6.49968 5.55999 6.80391 5.50278C7.10814 5.44556 7.42248 5.47927 7.70766 5.59969C7.99284 5.7201 8.23622 5.92189 8.40737 6.17983C8.57853 6.43778 8.66987 6.74044 8.67 7.05C8.66289 7.47331 8.4885 7.8766 8.18495 8.17173C7.88139 8.46685 7.47335 8.62982 7.05 8.625ZM18.3 18.3H15.6V14.034C15.6 12.756 15.06 12.297 14.358 12.297C14.1522 12.3107 13.9511 12.3649 13.7663 12.4566C13.5815 12.5482 13.4166 12.6755 13.2811 12.831C13.1457 12.9866 13.0422 13.1674 12.9768 13.363C12.9114 13.5586 12.8853 13.7652 12.9 13.971C12.8955 14.0129 12.8955 14.0551 12.9 14.097V18.3H10.2V10.2H12.81V11.37C13.0733 10.9695 13.435 10.6433 13.8605 10.4227C14.286 10.2021 14.761 10.0944 15.24 10.11C16.635 10.11 18.264 10.884 18.264 13.404L18.3 18.3Z"
        fill="currentColor"
      />
    </svg>
  )
}

function GlobeIcon() {
  return (
    <svg
      className="size-5"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M21 12C21 16.9706 16.9706 21 12 21M21 12C21 7.02944 16.9706 3 12 3M21 12H3M12 21C7.02944 21 3 16.9706 3 12M12 21C9.79086 21 8 16.9706 8 12C8 7.02944 9.79086 3 12 3M12 21C14.2091 21 16 16.9706 16 12C16 7.02944 14.2091 3 12 3M3 12C3 7.02944 7.02944 3 12 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
      />
    </svg>
  )
}

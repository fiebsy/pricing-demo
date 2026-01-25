'use client'

import { useEffect, useState } from 'react'
import type { ProfileMode } from '../types'
import { EditProfileForm } from '../components/edit-profile-form'
import { ViewProfileContent } from '../components/view-profile-content'

// Mock profile data - in real app this would come from API
const PROFILE_DATA = {
  name: 'Derick Fiebiger',
  organization: {
    name: 'Payva',
    logo: '/org-logo.png',
    role: '',
  },
  headline: 'Design Engineer',
  bio: "I'm Derick, a design engineer in Minneapolis who builds product experiences and writes code to ship them fast. I launched a ranked leaderboard and redesigned the Content Rewards approvals flow at Whop, and through my studio Pickaxe I delivered dashboards like Bnocs and ZCN.fun funded by community grants. I work on staking and analytics dashboards, UI design, and product engineering, and I'm open to roles where I can shape both the experience and the code.",
  questions: [
    'How has your experience co-founding Pickaxe.it shaped your approach to design?',
    'What types of projects do you focus on as a design engineer at Payva?',
    'How old are you?',
    'What inspired you to transition from product management to design engineering?',
    'Hello',
  ],
  socialLinks: ['linkedin.com/in/derickfiebiger', 'fiebsy.medium.com/'],
}

/**
 * Profile Page - Solution A
 * Recreates the Delphi.ai profile flow with view/edit modes
 */
export default function ProfilePage() {
  const [mode, setMode] = useState<ProfileMode>('view')

  // Apply Delphi theme on mount
  useEffect(() => {
    document.documentElement.classList.add('theme-delphi')
    return () => {
      document.documentElement.classList.remove('theme-delphi')
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-[var(--color-gray-50)]">
      {/* Header */}
      <header className="pointer-events-none relative z-10 w-full select-none pb-0 lg:pb-10">
        <nav className="pointer-events-none flex items-center justify-between px-4 py-4 [&>*]:pointer-events-auto lg:py-6">
          {/* Left side - Logo placeholder (hidden for now) */}
          <div className="ml-0 hidden items-center gap-3 lg:ml-3" />

          {/* Right side - Avatar placeholder (hidden for now) */}
          <div className="hidden items-center" />
        </nav>
      </header>

      {/* Main content */}
      <div className="mt-20 flex-1 p-6 pb-32 pt-0 tracking-[-0.015em] lg:mt-10">
        <div className="relative mx-auto max-w-2xl">
          {/* Decorative gradient background */}
          <div className="max-w-full overflow-hidden">
            <div
              className="pointer-events-none absolute inset-x-0 -left-10 -right-10 -top-10 z-0 h-[400px] rounded-none bg-white/50 md:rounded-[72px]"
              style={{
                boxShadow:
                  '0 4px 200px 0 rgba(0,0,0,0.25), inset 0 4px 4px 0px rgba(255,255,255,1)',
                maskImage: 'linear-gradient(black 0%, transparent 300px)',
              }}
            />
          </div>

          {/* Content - View or Edit mode */}
          <div key={mode}>
            {mode === 'view' ? (
              <ViewProfileContent
                data={PROFILE_DATA}
                onEdit={() => setMode('edit')}
              />
            ) : (
              <EditProfileForm
                initialData={PROFILE_DATA}
                onSave={(data) => {
                  console.log('Save profile:', data)
                  setMode('view')
                }}
                onCancel={() => setMode('view')}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

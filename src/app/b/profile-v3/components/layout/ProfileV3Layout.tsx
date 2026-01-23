/**
 * ProfileV3Layout Component
 *
 * Fixed layout with:
 * - Avatar video centered
 * - Questions below avatar, centered
 * - Scorecard vertically centered, right of avatar
 * - Profile info on the left
 *
 * @module b/profile-v3/components/layout
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

// =============================================================================
// TYPES
// =============================================================================

export interface ProfileV3LayoutProps {
  profile: React.ReactNode
  video: React.ReactNode
  editPanel: React.ReactNode
  questions: React.ReactNode
  footer?: React.ReactNode
  className?: string
}

// =============================================================================
// COMPONENT
// =============================================================================

export function ProfileV3Layout({
  profile,
  video,
  editPanel,
  questions,
  footer,
  className,
}: ProfileV3LayoutProps) {
  return (
    <div
      className={cn(
        'h-screen bg-black overflow-hidden',
        className
      )}
    >
      {/* Fixed header area - Profile, Video, Scorecard */}
      <div className="relative h-[480px] pt-24 max-w-[1200px] mx-auto">
        {/* LEFT - Profile info (fixed position) */}
        <aside className="absolute left-12 top-24 w-[280px]">
          {profile}
        </aside>

        {/* CENTER - Video (always centered) */}
        <div className="flex justify-center">
          <div className="relative">
            {/* Video */}
            {video}

            {/* RIGHT - Scorecard (positioned relative to video) */}
            <aside className="absolute left-full bottom-0 ml-6 w-[280px]">
              {editPanel}
            </aside>
          </div>
        </div>
      </div>

      {/* Scrollable questions area - falls off the page */}
      <div className="h-[calc(100vh-480px)] overflow-y-auto pb-32 pt-12">
        <div className="flex flex-col items-center gap-3">
          {questions}
        </div>
      </div>

      {/* Footer (Chat Overlay) */}
      {footer}
    </div>
  )
}

/**
 * ProfileLayout Component
 *
 * CSS Grid orchestrator for the profile page layout.
 *
 * @module b/profile/components
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface ProfileLayoutProps {
  header?: React.ReactNode
  sidebar: React.ReactNode
  main: React.ReactNode
  footer?: React.ReactNode
  className?: string
}

export function ProfileLayout({
  header,
  sidebar,
  main,
  footer,
  className,
}: ProfileLayoutProps) {
  return (
    <div
      className={cn(
        'min-h-screen bg-secondary',
        // Bottom padding to account for chat overlay
        'pb-20',
        className
      )}
    >
      {/* Header (floating) */}
      {header && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">{header}</div>
      )}

      {/* Layout container - centers content with sidebar offset */}
      <div className="relative pt-16 px-6">
        {/* Mobile sidebar - shows above main content on smaller screens */}
        <aside className="lg:hidden mb-6 max-w-xl mx-auto">
          {sidebar}
        </aside>

        {/* Centered main content */}
        <main className="max-w-xl mx-auto flex flex-col gap-6">
          {main}
        </main>

        {/* Desktop sidebar - positioned to left of centered content, clamped to viewport */}
        <aside
          className={cn(
            'hidden lg:block',
            'fixed top-20',
            // Position relative to viewport, clamped to stay on screen
            // max-w-xl = 36rem = 576px, sidebar = 280px, gap = 24px
            // Uses max() to ensure minimum 16px from left edge
            'left-[max(1rem,calc(50%-288px-280px-1.5rem))]',
            'w-[280px]'
          )}
        >
          {sidebar}
        </aside>
      </div>

      {/* Footer (Chat Overlay) */}
      {footer}
    </div>
  )
}

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

      {/* Main content grid */}
      <div
        className={cn(
          'grid gap-6 p-6 pt-16',
          'max-w-6xl mx-auto',
          // Responsive grid
          'grid-cols-1 lg:grid-cols-[280px_1fr]'
        )}
      >
        {/* Sidebar (Confidence Panel) */}
        <aside className="lg:sticky lg:top-6 lg:self-start">{sidebar}</aside>

        {/* Main content */}
        <main className="flex flex-col gap-6">{main}</main>
      </div>

      {/* Footer (Chat Overlay) */}
      {footer}
    </div>
  )
}

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface SlideSubtitleProps {
  children: React.ReactNode
  className?: string
}

/**
 * Top-left subtitle component for slide headers.
 * Provides consistent styling across all slide types.
 */
export function SlideSubtitle({ children, className }: SlideSubtitleProps) {
  return (
    <div className="w-full pt-4 px-4">
      <span
        className={cn(
          'text-sm font-medium tracking-wide text-tertiary/50',
          className
        )}
      >
        {children}
      </span>
    </div>
  )
}

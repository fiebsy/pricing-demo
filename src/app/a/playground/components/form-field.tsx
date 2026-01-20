'use client'

import { cn } from '@/lib/utils'
import type { FormFieldProps } from '../types'

/**
 * Form field wrapper with label and staggered animation
 * Uses semantic design tokens
 */
export function FormField({
  label,
  optional = false,
  children,
  animationDelay = 0,
}: FormFieldProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3',
        'animate-in fade-in slide-in-from-bottom-4'
      )}
      style={{
        animationDelay: `${animationDelay}ms`,
        animationDuration: '500ms',
        animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        animationFillMode: 'backwards',
      }}
    >
      <div className="flex items-baseline gap-2">
        <label className="ml-3.5 text-sm font-medium text-primary">
          {label}
        </label>
        {optional && (
          <span className="text-xs text-quaternary">Optional</span>
        )}
      </div>
      {children}
    </div>
  )
}

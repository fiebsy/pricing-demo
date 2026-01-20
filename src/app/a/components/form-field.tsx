'use client'

import { cn } from '@/lib/utils'
import type { FormFieldProps } from '../types'

/**
 * Form field wrapper with label and staggered animation
 * Matches Delphi's edit profile field styling
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
        <label className="ml-3.5 text-sm font-medium text-[var(--color-gray-900)]">
          {label}
        </label>
        {optional && (
          <span className="text-xs text-[var(--color-gray-500)]">Optional</span>
        )}
      </div>
      {children}
    </div>
  )
}

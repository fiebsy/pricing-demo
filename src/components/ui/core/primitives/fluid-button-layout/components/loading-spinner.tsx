/**
 * Loading Spinner
 *
 * SVG-based loading spinner for button states.
 *
 * @status stable
 */

'use client'

import { cn } from '@/lib/utils'

export interface LoadingSpinnerProps {
  className?: string
  slowMo?: boolean
}

export function LoadingSpinner({ className, slowMo }: LoadingSpinnerProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={cn('size-5 shrink-0', className)}
      aria-hidden="true"
    >
      {/* Background circle */}
      <circle
        cx="10"
        cy="10"
        r="8"
        stroke="currentColor"
        strokeWidth="2"
        className="opacity-30"
      />
      {/* Spinning arc */}
      <circle
        cx="10"
        cy="10"
        r="8"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="12.5 50"
        strokeLinecap="round"
        className={cn(
          'origin-center',
          slowMo ? 'animate-[spin_5s_linear_infinite]' : 'animate-spin'
        )}
        style={{ transformOrigin: '10px 10px' }}
      />
    </svg>
  )
}

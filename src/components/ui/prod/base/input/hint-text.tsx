'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

import type { HintTextProps } from './types'
import { hintTextCommonStyles, hintTextInvalidStyles } from './config'

/**
 * HintText - Helper/description text for form fields
 *
 * Automatically styles as error message when isInvalid is true.
 *
 * @example
 * ```tsx
 * <HintText>Enter your full name as it appears on your ID</HintText>
 * <HintText isInvalid>This field is required</HintText>
 * ```
 */
export const HintText = forwardRef<HTMLSpanElement, HintTextProps>(
  ({ children, isInvalid, className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        role={isInvalid ? 'alert' : undefined}
        className={cn(
          hintTextCommonStyles,
          isInvalid && hintTextInvalidStyles,
          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }
)

HintText.displayName = 'HintText'

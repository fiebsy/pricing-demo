'use client'

import { forwardRef } from 'react'
import HelpCircleIcon from '@hugeicons-pro/core-stroke-rounded/HelpCircleIcon'
import { Field } from '@base-ui/react/field'
import { cn } from '@/lib/utils'

import { HugeIcon } from '@/components/ui/prod/base/icon'
import { Tooltip } from '@/components/ui/prod/base/tooltip'

import type { LabelProps } from './types'
import { labelCommonStyles, requiredIndicatorStyles } from './config'

/**
 * Label - Input label component with optional required indicator and tooltip
 *
 * @example
 * ```tsx
 * <Label>Email</Label>
 * <Label isRequired>Password</Label>
 * <Label tooltip="We'll never share your email">Email</Label>
 * ```
 */
export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ children, isRequired, tooltip, tooltipDescription, className, ...props }, ref) => {
    return (
      <Field.Label
        ref={ref}
        data-label="true"
        className={cn(labelCommonStyles, className)}
        {...props}
      >
        {children}

        {/* Required indicator */}
        <span
          className={cn(
            'hidden',
            requiredIndicatorStyles,
            isRequired && 'block'
          )}
        >
          *
        </span>

        {/* Tooltip */}
        {tooltip && (
          <Tooltip title={tooltip} description={tooltipDescription} side="top">
            <span className="cursor-pointer text-fg-quaternary transition duration-200 hover:text-fg-quaternary_hover focus:text-fg-quaternary_hover">
              <HugeIcon icon={HelpCircleIcon} size={16} className="text-fg-quaternary" />
            </span>
          </Tooltip>
        )}
      </Field.Label>
    )
  }
)

Label.displayName = 'Label'

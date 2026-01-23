/**
 * ProfileIdentity Component
 *
 * Name and role with clean, minimal styling.
 * Text sizing matches bento.me reference (32px/44px).
 *
 * @module b/profile-v2/components/profile-panel
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import type { ProfileIdentityProps } from '../../types'

// =============================================================================
// COMPONENT
// =============================================================================

export function ProfileIdentity({
  name,
  role,
  company,
  className,
}: ProfileIdentityProps) {
  // Combine role and company into single line
  const roleText = [role, company].filter(Boolean).join(' at ')

  return (
    <div className={cn('flex flex-col', className)}>
      {/* Name - smaller to match reduced avatar */}
      <h1 className="text-2xl font-bold leading-tight tracking-tight text-primary xl:text-3xl">
        {name}
      </h1>

      {/* Role + Company - simple, clean */}
      {roleText && (
        <p className="mt-1 text-sm text-secondary">
          {roleText}
        </p>
      )}
    </div>
  )
}

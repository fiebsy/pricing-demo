/**
 * ProfilePanel Component
 *
 * Container for left side profile content.
 * Vertical layout: Large avatar on top, name below, then bio.
 * Emulates bento.me style with clean, spacious design.
 *
 * @module b/profile-v2/components/profile-panel
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { ProfileAvatar } from './ProfileAvatar'
import { ProfileIdentity } from './ProfileIdentity'
import { ProfileBio } from './ProfileBio'
import type { ProfilePanelProps } from '../../types'

// =============================================================================
// COMPONENT
// =============================================================================

export function ProfilePanel({
  name,
  avatarUrl,
  bio,
  role,
  company,
  isVerified = false,
  className,
}: ProfilePanelProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-start',
        className
      )}
    >
      {/* Avatar - smaller, cleaner */}
      <ProfileAvatar
        name={name}
        avatarUrl={avatarUrl}
        isVerified={isVerified}
        className="size-[60px] xl:size-[72px]"
      />

      {/* Name + Role below avatar */}
      <div className="mt-4 max-w-[400px]">
        <ProfileIdentity
          name={name}
          role={role}
          company={company}
        />

        {/* Bio - minimal text with top margin */}
        <ProfileBio bio={bio} className="mt-3" />
      </div>
    </div>
  )
}

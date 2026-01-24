/**
 * ProfileAvatar Component
 *
 * Avatar with optional verified badge.
 *
 * @module b/profile-v2/components/profile-panel
 */

'use client'

import * as React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import CheckmarkBadge02Icon from '@hugeicons-pro/core-solid-rounded/CheckmarkBadge02Icon'
import type { ProfileAvatarProps } from '../../types'

// =============================================================================
// COMPONENT
// =============================================================================

export function ProfileAvatar({
  name,
  avatarUrl,
  isVerified = false,
  className,
}: ProfileAvatarProps) {
  return (
    <div
      className={cn(
        'relative',
        // Default size via className for Tailwind responsive support
        className
      )}
    >
      {/* Avatar image - clean circle with subtle border */}
      <div
        className={cn(
          'relative h-full w-full overflow-hidden rounded-full',
          'bg-quaternary',
          // Subtle phantom border like reference
          'after:pointer-events-none after:absolute after:inset-0 after:rounded-full after:border after:border-secondary'
        )}
      >
        <Image
          src={avatarUrl}
          alt={name}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Verified badge - positioned at bottom right */}
      {isVerified && (
        <div className="absolute -bottom-1 -right-1">
          <HugeIcon
            icon={CheckmarkBadge02Icon}
            size={24}
            className="text-[var(--color-blue-500)]"
            strokeWidth={0}
          />
        </div>
      )}
    </div>
  )
}

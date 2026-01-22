/**
 * CharacterAvatar Component
 *
 * Center avatar display with squircle frame.
 *
 * @module b/profile/components
 */

'use client'

import * as React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { CharacterAvatarProps } from '../types'

// =============================================================================
// COMPONENT
// =============================================================================

export function CharacterAvatar({ name, avatarUrl, className }: CharacterAvatarProps) {
  return (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      {/* Avatar with squircle frame */}
      <div
        className={cn(
          'relative size-48',
          'rounded-[48px] corner-squircle overflow-hidden',
          'bg-quaternary',
          'ring-4 ring-primary ring-offset-4 ring-offset-secondary'
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

      {/* Name */}
      <h1 className="text-2xl font-bold text-primary">{name}</h1>
    </div>
  )
}

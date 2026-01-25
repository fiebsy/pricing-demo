/**
 * ProfileBio Component
 *
 * Clean, minimal bio text without keyword highlighting.
 * Matches bento.me reference with consistent weight and muted color.
 *
 * @module b/profile-v2/components/profile-panel
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import type { ProfileBioProps } from '../../types'

// =============================================================================
// COMPONENT
// =============================================================================

export function ProfileBio({
  bio,
  className,
}: ProfileBioProps) {
  return (
    <div className={cn(className)}>
      {/* Bio text - clean, minimal, consistent weight */}
      <p className="text-sm leading-relaxed text-secondary">
        {bio}
      </p>
    </div>
  )
}

/**
 * AvatarVideo Component - V3
 *
 * Animated avatar video with hover replay and gradient effects.
 *
 * @module b/profile-v3/components/video
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

// =============================================================================
// TYPES
// =============================================================================

export interface AvatarVideoProps {
  src: string
  playbackRate?: number
  className?: string
}

// =============================================================================
// COMPONENT
// =============================================================================

export function AvatarVideo({
  src,
  playbackRate = 0.9,
  className,
}: AvatarVideoProps) {
  return (
    <div className={cn('relative', className)}>
      <div className="overflow-hidden rounded-3xl">
        <video
          ref={(el) => {
            if (el) el.playbackRate = playbackRate
          }}
          src={src}
          autoPlay
          muted
          playsInline
          onEnded={(e) => e.currentTarget.pause()}
          onMouseEnter={(e) => {
            e.currentTarget.currentTime = 0
            e.currentTarget.play()
          }}
          className="h-[360px] w-auto object-cover"
        />
      </div>
      {/* Bottom fade gradient */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent pointer-events-none rounded-b-3xl" />
      {/* Subtle shadow below feet */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/30 blur-xl rounded-full" />
    </div>
  )
}

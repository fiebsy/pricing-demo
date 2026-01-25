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
  isHovered?: boolean
  className?: string
}

// =============================================================================
// COMPONENT
// =============================================================================

export function AvatarVideo({
  src,
  playbackRate = 0.9,
  isHovered,
  className,
}: AvatarVideoProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null)

  // Play video when isHovered becomes true, let it play through
  React.useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isHovered) {
      // Only restart if video has ended
      if (video.ended) {
        video.currentTime = 0
      }
      video.play()
    }
  }, [isHovered])

  return (
    <div className={cn('relative', className)}>
      <div className="overflow-hidden rounded-3xl">
        <video
          ref={(el) => {
            if (el) el.playbackRate = playbackRate
            ;(videoRef as React.MutableRefObject<HTMLVideoElement | null>).current = el
          }}
          src={src}
          autoPlay
          muted
          playsInline
          className="h-[420px] w-auto object-cover"
        />
      </div>
      {/* Bottom fade gradient */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent pointer-events-none rounded-b-3xl" />
      {/* Subtle shadow below feet */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/30 blur-xl rounded-full" />
    </div>
  )
}

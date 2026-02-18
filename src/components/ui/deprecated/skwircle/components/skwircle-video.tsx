/**
 * Skwircle Video Component
 *
 * A pre-configured video variant of Skwircle that clips video content
 * using the skwircle shape.
 *
 * @example Basic
 * ```tsx
 * <Skwircle.Video
 *   src="/video.mp4"
 *   style={{ width: 142, height: 80 }}
 *   muted
 *   playsInline
 * />
 * ```
 *
 * @example With poster and autoplay
 * ```tsx
 * <Skwircle.Video
 *   src="/video.mp4"
 *   poster="/poster.jpg"
 *   autoPlay
 *   loop
 *   muted
 *   playsInline
 *   style={{ width: 200, height: 112 }}
 * />
 * ```
 */

'use client'

import * as React from 'react'
import type { SkwircleProps } from '../types'

export interface SkwircleVideoProps extends Omit<SkwircleProps, 'variant' | 'children'> {
  /** Video source URL */
  src: string
  /** Poster image URL (shown before video loads/plays) */
  poster?: string
  /** Auto-play the video on load */
  autoPlay?: boolean
  /** Loop the video playback */
  loop?: boolean
  /** Mute the video audio */
  muted?: boolean
  /** Play inline on mobile (prevents fullscreen on iOS) */
  playsInline?: boolean
}

/**
 * Factory function to create the SkwircleVideo component
 * with the base Skwircle injected
 */
export const createSkwircleVideo = (
  SkwircleBase: React.FC<SkwircleProps>
): React.FC<SkwircleVideoProps> => {
  const SkwircleVideo: React.FC<SkwircleVideoProps> = ({
    src,
    poster,
    autoPlay = false,
    loop = false,
    muted = true,
    playsInline = true,
    ...skwircleProps
  }) => {
    return (
      <SkwircleBase variant="avatar" contentWrapperClassName="" {...skwircleProps}>
        <video
          src={src}
          poster={poster}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          className="h-full w-full object-cover"
          // DEBUG: lime = video element
          style={{ backgroundColor: 'lime' }}
        />
      </SkwircleBase>
    )
  }
  SkwircleVideo.displayName = 'Skwircle.Video'
  return SkwircleVideo
}

/**
 * PreviewArea Component
 *
 * Positions background content, blur overlay, and chat with proper z-index layering.
 *
 * @module playground/radial-blur/layout
 */

import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { RadialBlurDemo } from '../core/RadialBlurDemo'
import type { RadialBlurConfig } from '../config/types'

// =============================================================================
// TYPES
// =============================================================================

export interface PreviewAreaProps {
  /** Full radial blur configuration */
  config: RadialBlurConfig
  /** Chat container (rendered above blur) */
  children: ReactNode
  /** Background content (rendered behind blur) */
  backgroundContent?: ReactNode
  /** Additional class names */
  className?: string
}

// =============================================================================
// COMPONENT
// =============================================================================

export function PreviewArea({
  config,
  children,
  backgroundContent,
  className,
}: PreviewAreaProps) {
  return (
    <div className={cn('relative h-full bg-primary', className)}>
      {/* Background content - z-0 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 overflow-auto">
        {backgroundContent}
      </div>

      {/* Radial Blur Overlay - z-10 */}
      <RadialBlurDemo config={config} className="z-10" />

      {/* Chat Interface - z-20 (above blur so messages can blur content beneath) */}
      {children}
    </div>
  )
}

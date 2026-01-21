/**
 * Biaxial Command Menu V3 - Top Section Component
 *
 * Experimental section that expands upward above the search input.
 * Uses clip-path animation that syncs with the backdrop's expansion.
 *
 * Animation Strategy:
 * - The outer wrapper uses clip-path to reveal content from bottom (toward input)
 * - The inner container uses transform + opacity for a compound "offset" effect
 *   (similar to how MenuContainer gets offset from being inside ContentLayer)
 * - This creates the same fluid layered animation as the bottom menu
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { EASING_EXPO_OUT } from '@/components/ui/prod/base/menu/config'
import type { BackgroundOption } from '../types'

export interface TopSectionProps {
  /** Whether the menu is expanded */
  expanded: boolean
  /** Height of the section when expanded (px) */
  height: number
  /** Background color for the inner container */
  background: BackgroundOption
  /** Content type */
  contentType: 'actions' | 'breadcrumbs' | 'custom'
  /** Animation duration (ms) - should match backdrop duration */
  duration: number
  /** Animation delay (ms) - should match backdrop delay */
  delay?: number
  /**
   * Duration offset for inner container animation (ms).
   * Creates the layered "offset" effect like MenuContainer.
   * Should match menuContainerDurationOffset for visual consistency.
   * @default 100
   */
  innerDurationOffset?: number
  /** Panel width when expanded */
  panelWidth: number
  /** Border radius for the inner container */
  borderRadius?: number
  /** Inset from edges (matches menuContainerInset) */
  inset?: number
  /** Bottom offset - gap between top section and search input (px) */
  bottomOffset?: number
  /** Border width */
  borderWidth?: number
  /** Border color */
  borderColor?: 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'brand'
  /** Shine effect class */
  shine?: string
  /** Enable squircle corners */
  squircle?: boolean
  /** Custom children (for contentType='custom') */
  children?: React.ReactNode
}

const BACKGROUND_CLASSES: Record<BackgroundOption, string> = {
  none: '',
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  tertiary: 'bg-tertiary',
  quaternary: 'bg-quaternary',
}

/**
 * Get clip-path for top section - expands from bottom (closest to search input)
 * This mirrors the backdrop's vertical expansion
 */
function getTopSectionClipPath(expanded: boolean): string {
  if (expanded) {
    return 'inset(0 0 0 0)'
  }
  // Collapsed: clip from top, leaving nothing visible
  // This makes it expand from the bottom edge (toward the search)
  return 'inset(100% 0 0 0)'
}

export const TopSection: React.FC<TopSectionProps> = ({
  expanded,
  height,
  background,
  contentType,
  duration,
  delay = 0,
  innerDurationOffset = 100,
  panelWidth,
  borderRadius = 14,
  inset = 3,
  bottomOffset = 0,
  borderWidth = 1,
  borderColor = 'primary',
  shine = 'none',
  squircle = true,
  children,
}) => {
  const clipPath = getTopSectionClipPath(expanded)

  // Inner container uses offset duration for compound "offset" effect
  // This mimics MenuContainer's behavior inside ContentLayer
  const innerDuration = duration + innerDurationOffset
  const innerDelay = delay

  // Total height includes the bottom offset (gap between top section and input)
  const totalHeight = height + bottomOffset

  return (
    <div
      className="absolute"
      style={{
        zIndex: 20,
        bottom: '100%',
        left: '50%',
        width: panelWidth,
        marginLeft: -(panelWidth / 2),
        height: totalHeight,
        clipPath,
        transition: `clip-path ${duration}ms ${EASING_EXPO_OUT} ${delay}ms`,
      }}
    >
      {/* Inner container - uses transform for compound animation effect */}
      <div
        className={cn(
          'absolute overflow-hidden',
          squircle && 'corner-squircle',
          BACKGROUND_CLASSES[background],
          shine && shine !== 'none' && shine
        )}
        style={{
          top: inset,
          left: inset,
          right: inset,
          bottom: bottomOffset, // Gap between top section and search input
          borderRadius,
          // Transform creates the "offset" effect - inner content grows from bottom
          clipPath: expanded ? 'inset(0 0 0 0)' : 'inset(100% 0 0 0)',
          transition: `clip-path ${innerDuration}ms ${EASING_EXPO_OUT} ${innerDelay}ms`,
          ...(borderWidth > 0 && {
            borderTopWidth: borderWidth,
            borderLeftWidth: borderWidth,
            borderRightWidth: borderWidth,
            borderBottomWidth: 0,
            borderStyle: 'solid',
            borderColor: `var(--color-border-${borderColor})`,
          }),
        }}
      >
        <div className="flex h-full items-center justify-center px-3">
          {contentType === 'custom' && children}
          {contentType === 'actions' && <DefaultActions />}
          {contentType === 'breadcrumbs' && <DefaultBreadcrumbs />}
        </div>
      </div>
    </div>
  )
}

// Default content for actions type
const DefaultActions: React.FC = () => (
  <div className="flex items-center gap-2 w-full">
    <button
      type="button"
      className="flex-1 px-3 py-1.5 text-xs font-medium text-tertiary hover:text-primary
                 bg-tertiary hover:bg-quaternary rounded-lg transition-colors"
    >
      Recent
    </button>
    <button
      type="button"
      className="flex-1 px-3 py-1.5 text-xs font-medium text-tertiary hover:text-primary
                 bg-tertiary hover:bg-quaternary rounded-lg transition-colors"
    >
      Favorites
    </button>
    <button
      type="button"
      className="flex-1 px-3 py-1.5 text-xs font-medium text-tertiary hover:text-primary
                 bg-tertiary hover:bg-quaternary rounded-lg transition-colors"
    >
      All
    </button>
  </div>
)

// Default content for breadcrumbs type
const DefaultBreadcrumbs: React.FC = () => (
  <div className="flex items-center gap-1 text-xs text-tertiary w-full">
    <span className="hover:text-primary cursor-pointer transition-colors">Home</span>
    <span className="text-quaternary">/</span>
    <span className="hover:text-primary cursor-pointer transition-colors">Commands</span>
    <span className="text-quaternary">/</span>
    <span className="text-primary font-medium">Search</span>
  </div>
)

TopSection.displayName = 'TopSection'

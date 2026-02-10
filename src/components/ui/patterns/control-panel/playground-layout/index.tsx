'use client'

/**
 * Playground Layout
 *
 * Reusable layout wrapper for playground pages that provides:
 * - Consistent preview area with correct padding for control panel
 * - Debug controls positioned at bottom-center (default)
 * - Flexible configuration for different layout needs
 */

import { cn } from '../utils'
import { PlaygroundDebugControls } from './debug-controls'

// ============================================================================
// TYPES
// ============================================================================

export interface DebugControlsConfig {
  /** Enable/disable debug controls. Defaults to true when config is provided */
  enabled?: boolean
  /** Slow motion state */
  slowMo: boolean
  /** Slow motion change handler */
  onSlowMoChange: (enabled: boolean) => void
  /** Debug outlines state */
  showDebug: boolean
  /** Debug outlines change handler */
  onShowDebugChange: (enabled: boolean) => void
  /** Auto-open expanded state */
  autoOpen?: boolean
  /** Auto-open change handler */
  onAutoOpenChange?: (enabled: boolean) => void
}

export type DebugPosition = 'bottom-center' | 'bottom-left' | 'bottom-right'

export interface PlaygroundLayoutProps {
  /** Main playground content */
  children: React.ReactNode

  /** Control panel component (rendered in fixed position) */
  controlPanel?: React.ReactNode

  /** Debug controls configuration */
  debugControls?: DebugControlsConfig

  /** Control panel width in pixels. Default: 340 */
  panelWidth?: number

  /** Position of debug controls. Default: 'bottom-center' */
  debugPosition?: DebugPosition

  /** Additional class names for the container */
  className?: string
}

// ============================================================================
// HELPERS
// ============================================================================

function getDebugPositionClasses(
  position: DebugPosition,
  panelWidth: number
): string {
  const baseClasses = 'pointer-events-none absolute bottom-8 flex'
  const panelOffset = `pr-[${panelWidth + 12}px]`

  switch (position) {
    case 'bottom-left':
      return cn(baseClasses, 'left-8')
    case 'bottom-right':
      return cn(baseClasses, 'right-8', panelOffset)
    case 'bottom-center':
    default:
      return cn(baseClasses, 'inset-x-0 justify-center', panelOffset)
  }
}

// ============================================================================
// COMPONENT
// ============================================================================

export function PlaygroundLayout({
  children,
  controlPanel,
  debugControls,
  panelWidth = 340,
  debugPosition = 'bottom-center',
  className,
}: PlaygroundLayoutProps) {
  // Calculate padding for preview area (panel width + gap)
  const previewPaddingRight = panelWidth + 12

  return (
    <div className={cn('relative h-screen overflow-hidden', className)}>
      {/* Control Panel */}
      {controlPanel}

      {/* Preview Area */}
      <div
        className="relative h-full overflow-y-auto p-8"
        style={{ paddingRight: previewPaddingRight }}
      >
        <div className="flex min-h-full items-center justify-center">
          {children}
        </div>

        {/* Debug Controls */}
        {debugControls && debugControls.enabled !== false && (
          <div
            className={getDebugPositionClasses(debugPosition, panelWidth)}
            style={{
              paddingRight:
                debugPosition !== 'bottom-left' ? previewPaddingRight : undefined,
            }}
          >
            <PlaygroundDebugControls
              slowMo={debugControls.slowMo}
              onSlowMoChange={debugControls.onSlowMoChange}
              showDebug={debugControls.showDebug}
              onShowDebugChange={debugControls.onShowDebugChange}
              autoOpen={debugControls.autoOpen}
              onAutoOpenChange={debugControls.onAutoOpenChange}
            />
          </div>
        )}
      </div>
    </div>
  )
}

// Re-export debug controls for direct usage if needed
export { PlaygroundDebugControls } from './debug-controls'
export type { PlaygroundDebugControlsProps } from './debug-controls'

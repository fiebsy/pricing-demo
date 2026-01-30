/**
 * PlaygroundLayout Component
 *
 * Standard playground wrapper with UnifiedControlPanel.
 *
 * @module playground/radial-blur/layout
 */

import type { ReactNode } from 'react'
import {
  UnifiedControlPanel,
  type ControlChangeEvent,
  type PanelConfig,
} from '@/components/ui/patterns/control-panel'
import type { RadialBlurConfig } from '../config/types'

// =============================================================================
// TYPES
// =============================================================================

export interface PlaygroundLayoutProps {
  /** Content to render in the preview area */
  children: ReactNode
  /** Panel configuration for controls */
  panelConfig: PanelConfig
  /** Control change handler */
  onControlChange: (event: ControlChangeEvent) => void
  /** Preset change handler */
  onPresetChange: (presetId: string) => void
  /** Reset handler */
  onReset: () => void
  /** Get config for copy button */
  getConfigForCopy: () => RadialBlurConfig
}

// =============================================================================
// COMPONENT
// =============================================================================

export function PlaygroundLayout({
  children,
  panelConfig,
  onControlChange,
  onPresetChange,
  onReset,
  getConfigForCopy,
}: PlaygroundLayoutProps) {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Control Panel */}
      <UnifiedControlPanel
        config={panelConfig}
        onChange={onControlChange}
        onPresetChange={onPresetChange}
        onReset={onReset}
        getConfigForCopy={getConfigForCopy}
      />

      {/* Preview Area - Full screen with panel offset */}
      <div className="h-full pr-[352px] overflow-hidden">
        {children}
      </div>
    </div>
  )
}

/**
 * Universal Expand Playground
 *
 * Comprehensive playground for the Universal Expand component.
 * Supports 4-directional expansion (top, bottom, left, right) with
 * full customization via UnifiedControlPanel.
 */

'use client'

import { useCallback, useMemo, useState } from 'react'
import {
  UnifiedControlPanel,
  type ControlChangeEvent,
} from '@/components/ui/patterns/control-panel'
import {
  UniversalExpandRoot,
  Backdrop,
  TriggerSlot,
  UniversalSlot,
  type UniversalExpandConfig,
  type UnifiedSlotConfig,
} from '@/components/ui/core/primitives/universal-expand'

import type { PlaygroundConfig } from './config/types'
import { DEFAULT_PLAYGROUND_CONFIG } from './config/defaults'
import { createPanelConfig } from './panels/panel-config'
import {
  TriggerContent,
  TopSlotContent,
  BottomSlotContent,
  LeftSlotContent,
  RightSlotContent,
} from './demo/slot-content'

// =============================================================================
// CONFIG TRANSFORM HELPERS
// =============================================================================

type SlotPrefix = 'top' | 'bottom' | 'left' | 'right'

/**
 * Builds a UnifiedSlotConfig from flat playground config.
 */
function buildSlotConfig(
  slot: SlotPrefix,
  config: PlaygroundConfig
): UnifiedSlotConfig {
  return {
    enabled: config[`${slot}Enabled`],
    dimensionMode: config[`${slot}DimensionMode`],
    fixedDimension: config[`${slot}FixedDimension`],
    maxDimension: config[`${slot}MaxDimension`],
    minDimension: config[`${slot}MinDimension`],
    appearance: {
      background: config[`${slot}Background`],
      shine: config[`${slot}Shine`],
      borderRadius: config[`${slot}BorderRadius`],
      inset: config[`${slot}Inset`],
      borderWidth: config[`${slot}BorderWidth`],
      borderColor: config[`${slot}BorderColor`],
    },
    animation: {
      delayOffset: config[`${slot}DelayOffset`],
      durationOffset: config[`${slot}DurationOffset`],
      expandOrigin: config[`${slot}ExpandOrigin`],
    },
    scroll: {
      overflowGradient: config[`${slot}OverflowGradient`],
      gradientHeight: config[`${slot}GradientHeight`],
      paddingTop: config[`${slot}PaddingTop`],
      paddingBottom: config[`${slot}PaddingBottom`],
    },
  }
}

/**
 * Transforms flat PlaygroundConfig to UniversalExpandConfig.
 */
function buildExpandConfig(config: PlaygroundConfig): Partial<UniversalExpandConfig> {
  return {
    layout: {
      triggerWidth: config.triggerWidth,
      triggerHeight: config.triggerHeight,
      panelWidth: config.panelWidth,
      borderRadius: config.borderRadius,
      gaps: {
        top: config.gapTop,
        bottom: config.gapBottom,
        left: config.gapLeft,
        right: config.gapRight,
      },
    },
    animation: {
      duration: config.duration,
      collapseDuration: config.collapseDuration,
      contentFadeDuration: 0,
      contentFadeDelay: 0,
      backdropMode: config.backdropMode,
      backdropDelay: config.backdropDelay,
      backdropDurationOffset: config.backdropDurationOffset,
      animateSlotContainers: config.animateSlotContainers,
      slotContainerDelay: config.slotContainerDelay,
      slotContainerDurationOffset: config.slotContainerDurationOffset,
    },
    appearance: {
      background: config.background,
      borderRadius: config.backdropBorderRadius,
      shadow: config.shadow,
      shine: config.shine,
      gradient: config.gradient,
      gradientColor: config.gradientColor,
      squircle: config.squircle,
    },
    slots: {
      top: buildSlotConfig('top', config),
      bottom: buildSlotConfig('bottom', config),
      left: buildSlotConfig('left', config),
      right: buildSlotConfig('right', config),
    },
    triggerSlot: {
      enabled: config.triggerSlotEnabled,
      background: config.triggerSlotBackground,
      inset: config.triggerSlotInset,
    },
    debug: config.debug,
  }
}

// =============================================================================
// MAIN PAGE
// =============================================================================

export default function UniversalExpandPlayground() {
  const [config, setConfig] = useState<PlaygroundConfig>(DEFAULT_PLAYGROUND_CONFIG)
  const [resetKey, setResetKey] = useState(0)

  // Transform config for component
  const expandConfig = useMemo(() => buildExpandConfig(config), [config])

  // Panel config
  const panelConfig = useMemo(() => createPanelConfig(config), [config])

  // Handlers
  const handleControlChange = useCallback((event: ControlChangeEvent) => {
    const { controlId, value } = event
    setConfig((prev) => ({ ...prev, [controlId]: value }))
  }, [])

  const handleReset = useCallback(() => {
    setConfig(DEFAULT_PLAYGROUND_CONFIG)
    setResetKey((k) => k + 1)
  }, [])

  const getConfigForCopy = useCallback(() => {
    return expandConfig
  }, [expandConfig])

  return (
    <div className="min-h-screen bg-primary">
      {/* Main content area */}
      <div className="flex items-center justify-center min-h-screen pr-[340px]">
        {/* Demo container */}
        <div className="relative">
          <UniversalExpandRoot key={resetKey} config={expandConfig}>
            {/* Backdrop layer */}
            <Backdrop />

            {/* Trigger slot */}
            <TriggerSlot>
              <TriggerContent />
            </TriggerSlot>

            {/* Conditional slot rendering */}
            {config.topEnabled && (
              <UniversalSlot position="top">
                <TopSlotContent />
              </UniversalSlot>
            )}

            {config.bottomEnabled && (
              <UniversalSlot position="bottom">
                <BottomSlotContent />
              </UniversalSlot>
            )}

            {config.leftEnabled && (
              <UniversalSlot position="left">
                <LeftSlotContent />
              </UniversalSlot>
            )}

            {config.rightEnabled && (
              <UniversalSlot position="right">
                <RightSlotContent />
              </UniversalSlot>
            )}
          </UniversalExpandRoot>
        </div>
      </div>

      {/* Control Panel */}
      <UnifiedControlPanel
        config={panelConfig}
        onChange={handleControlChange}
        onReset={handleReset}
        getConfigForCopy={getConfigForCopy}
      />
    </div>
  )
}

/**
 * Radial Blur Playground
 *
 * Interactive playground for the radial blur backdrop effect.
 * Includes the actual chat interface for testing alignment.
 *
 * Core component: ./core/RadialBlurDemo.tsx
 * Migration target: src/app/b/profile/components/chat/ChatBackdrop.tsx
 */

'use client'

import { useCallback, useMemo, useState } from 'react'
import type { ControlChangeEvent } from '@/components/ui/prod/base/control-panel'

import type { RadialBlurConfig } from './config/types'
import type { ChatOverlayState } from '@/app/b/profile/types'
import { DEFAULT_RADIAL_BLUR_CONFIG, RADIAL_BLUR_PRESETS } from './config'
import { buildRadialBlurPanelConfig } from './panels'
import { PlaygroundLayout, PreviewArea, MockProfileContent } from './layout'
import { ChatContainer, ChatStateIndicator, type ChatDisplayConfig } from './chat'

// =============================================================================
// UTILITIES
// =============================================================================

function setNestedValue<T>(obj: T, path: string, value: unknown): T {
  const keys = path.split('.')
  const result = { ...obj } as Record<string, unknown>
  let current = result

  for (let i = 0; i < keys.length - 1; i++) {
    current[keys[i]] = { ...(current[keys[i]] as Record<string, unknown>) }
    current = current[keys[i]] as Record<string, unknown>
  }

  current[keys[keys.length - 1]] = value
  return result as T
}

function extractDisplayConfig(config: RadialBlurConfig): ChatDisplayConfig {
  return {
    useBlurBubbles: config.messages.useBlurBubbles,
    bubbleBlur: config.messages.bubbleBlur,
    bubbleBgColor: config.messages.bubbleBgColor,
    bubbleOpacity: config.messages.bubbleOpacity,
    userBubbleBgColor: config.messages.userBubbleBgColor,
    userBubbleOpacity: config.messages.userBubbleOpacity,
    fadeTopHeight: config.messages.fadeTopHeight,
    fadeBottomHeight: config.messages.fadeBottomHeight,
    borderRadius: config.messages.borderRadius,
    useAsymmetricCorners: config.messages.useAsymmetricCorners,
    useSquircle: config.messages.useSquircle,
    shineStyle: config.messages.shineStyle,
  }
}

// =============================================================================
// PAGE COMPONENT
// =============================================================================

export default function RadialBlurPlayground() {
  const [config, setConfig] = useState<RadialBlurConfig>(DEFAULT_RADIAL_BLUR_CONFIG)
  const [activePresetId, setActivePresetId] = useState<string | null>('default')

  // Derived values
  const chatState = config.demoState
  const isExpanded = chatState === 'expanded'
  const displayConfig = useMemo(() => extractDisplayConfig(config), [config])
  const inputConfig = config.input
  const messagesMaxHeight = isExpanded
    ? 'calc(100vh - 120px)'
    : `calc(${config.height.default}vh - 80px)`

  // Handlers
  const handleChange = useCallback((event: ControlChangeEvent) => {
    setConfig((prev) => setNestedValue(prev, event.controlId, event.value))
    setActivePresetId(null)
  }, [])

  const handlePresetChange = useCallback((presetId: string) => {
    const preset = RADIAL_BLUR_PRESETS.find((p) => p.id === presetId)
    if (preset) {
      setConfig(preset.data)
      setActivePresetId(presetId)
    }
  }, [])

  const handleReset = useCallback(() => {
    setConfig(DEFAULT_RADIAL_BLUR_CONFIG)
    setActivePresetId('default')
  }, [])

  const handleStateChange = useCallback((newState: ChatOverlayState) => {
    setConfig((prev) => ({ ...prev, demoState: newState }))
    setActivePresetId(null)
  }, [])

  // Build panel config
  const panelConfig = useMemo(
    () => buildRadialBlurPanelConfig(config, RADIAL_BLUR_PRESETS, activePresetId),
    [config, activePresetId]
  )

  return (
    <PlaygroundLayout
      panelConfig={panelConfig}
      onControlChange={handleChange}
      onPresetChange={handlePresetChange}
      onReset={handleReset}
      getConfigForCopy={() => config}
    >
      <PreviewArea
        config={config}
        backgroundContent={<MockProfileContent />}
      >
        <ChatContainer
          displayConfig={displayConfig}
          inputConfig={inputConfig}
          state={chatState}
          onStateChange={handleStateChange}
          maxWidth={config.layout.maxWidth}
          messagesMaxHeight={messagesMaxHeight}
        />
        <ChatStateIndicator
          state={chatState}
          useBlurBubbles={config.messages.useBlurBubbles}
        />
      </PreviewArea>
    </PlaygroundLayout>
  )
}

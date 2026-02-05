/**
 * Universal Expand Playground
 *
 * Exploration playground for testing 4-directional expansion patterns.
 * Demonstrates:
 * - Bottom-only (floating search bar)
 * - Vertical bidirectional (top + bottom)
 * - Horizontal (left/right panels)
 * - Multi-directional (L-shaped, T-shaped, quad)
 *
 * @status incubating
 */

'use client'

import * as React from 'react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import {
  UniversalExpandRoot,
  UniversalSlot,
  Backdrop,
  TriggerSlot,
  ContentLayer,
  useUniversalExpand,
  // Presets
  getBottomOnlyConfig,
  getVerticalBidirectionalConfig,
  getChatInterfaceConfig,
  getRightPanelConfig,
  getLeftPanelConfig,
  getHorizontalBidirectionalConfig,
  getLShapedTopRightConfig,
  getLShapedBottomLeftConfig,
  getTShapedConfig,
  getQuadExpansionConfig,
  // Types
  type UniversalExpandConfig,
} from '@/components/ui/core/primitives/universal-expand'

// =============================================================================
// PRESET DEFINITIONS
// =============================================================================

interface PresetOption {
  id: string
  name: string
  description: string
  getConfig: () => UniversalExpandConfig
  slots: ('top' | 'bottom' | 'left' | 'right')[]
}

const PRESETS: PresetOption[] = [
  {
    id: 'bottom-only',
    name: 'Bottom Only',
    description: 'Floating search bar / command menu',
    getConfig: getBottomOnlyConfig,
    slots: ['bottom'],
  },
  {
    id: 'vertical-bidirectional',
    name: 'Vertical Bidirectional',
    description: 'Top + Bottom expansion',
    getConfig: getVerticalBidirectionalConfig,
    slots: ['top', 'bottom'],
  },
  {
    id: 'chat-interface',
    name: 'Chat Interface',
    description: 'Chat messages above, actions below',
    getConfig: getChatInterfaceConfig,
    slots: ['top', 'bottom'],
  },
  {
    id: 'right-panel',
    name: 'Right Panel',
    description: 'Expands to the right',
    getConfig: getRightPanelConfig,
    slots: ['right'],
  },
  {
    id: 'left-panel',
    name: 'Left Panel',
    description: 'Expands to the left',
    getConfig: getLeftPanelConfig,
    slots: ['left'],
  },
  {
    id: 'horizontal-bidirectional',
    name: 'Horizontal Bidirectional',
    description: 'Left + Right expansion',
    getConfig: getHorizontalBidirectionalConfig,
    slots: ['left', 'right'],
  },
  {
    id: 'l-shaped-top-right',
    name: 'L-Shaped (Top + Right)',
    description: 'Expands up and to the right',
    getConfig: getLShapedTopRightConfig,
    slots: ['top', 'right'],
  },
  {
    id: 'l-shaped-bottom-left',
    name: 'L-Shaped (Bottom + Left)',
    description: 'Expands down and to the left',
    getConfig: getLShapedBottomLeftConfig,
    slots: ['bottom', 'left'],
  },
  {
    id: 't-shaped',
    name: 'T-Shaped',
    description: 'Top + Bottom + Right expansion',
    getConfig: getTShapedConfig,
    slots: ['top', 'bottom', 'right'],
  },
  {
    id: 'quad-expansion',
    name: 'Quad Expansion',
    description: 'All 4 directions',
    getConfig: getQuadExpansionConfig,
    slots: ['top', 'bottom', 'left', 'right'],
  },
]

// =============================================================================
// TRIGGER COMPONENT
// =============================================================================

function DemoTrigger() {
  const { expanded, setExpanded } = useUniversalExpand()

  return (
    <button
      onClick={() => setExpanded(!expanded)}
      className={cn(
        'w-full h-full px-4 flex items-center justify-center',
        'text-sm font-medium text-fg-primary',
        'bg-secondary rounded-xl',
        'border border-primary',
        'hover:bg-tertiary transition-colors',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand'
      )}
    >
      {expanded ? 'Click to collapse' : 'Click to expand'}
    </button>
  )
}

// =============================================================================
// SLOT CONTENT COMPONENTS
// =============================================================================

function SlotContent({
  position,
  color,
}: {
  position: string
  color: string
}) {
  return (
    <div
      className={cn(
        'w-full h-full flex items-center justify-center',
        'text-sm font-medium',
        color
      )}
    >
      <div className="text-center">
        <div className="text-fg-secondary uppercase text-xs tracking-wider mb-1">
          {position} slot
        </div>
        <div className="text-fg-tertiary text-xs">
          Content area
        </div>
      </div>
    </div>
  )
}

// =============================================================================
// DEMO COMPONENT
// =============================================================================

function UniversalExpandDemo({
  preset,
}: {
  preset: PresetOption
}) {
  const config = preset.getConfig()

  // Color map for visual distinction
  const colorMap: Record<string, string> = {
    top: 'text-blue-400',
    bottom: 'text-green-400',
    left: 'text-purple-400',
    right: 'text-orange-400',
  }

  return (
    <div className="relative flex items-center justify-center min-h-[400px] p-16">
      <UniversalExpandRoot config={config}>
        <Backdrop />

        {/* For biaxial-style layouts (bottom slot uses ContentLayer) */}
        {preset.slots.includes('bottom') && !preset.slots.includes('left') && !preset.slots.includes('right') ? (
          <ContentLayer>
            <TriggerSlot>
              <DemoTrigger />
            </TriggerSlot>
            <UniversalSlot position="bottom">
              <SlotContent position="bottom" color={colorMap.bottom} />
            </UniversalSlot>
          </ContentLayer>
        ) : (
          <TriggerSlot>
            <DemoTrigger />
          </TriggerSlot>
        )}

        {/* Top slot */}
        {preset.slots.includes('top') && (
          <UniversalSlot position="top">
            <SlotContent position="top" color={colorMap.top} />
          </UniversalSlot>
        )}

        {/* Bottom slot (only when not using ContentLayer) */}
        {preset.slots.includes('bottom') && (preset.slots.includes('left') || preset.slots.includes('right')) && (
          <UniversalSlot position="bottom">
            <SlotContent position="bottom" color={colorMap.bottom} />
          </UniversalSlot>
        )}

        {/* Left slot */}
        {preset.slots.includes('left') && (
          <UniversalSlot position="left">
            <SlotContent position="left" color={colorMap.left} />
          </UniversalSlot>
        )}

        {/* Right slot */}
        {preset.slots.includes('right') && (
          <UniversalSlot position="right">
            <SlotContent position="right" color={colorMap.right} />
          </UniversalSlot>
        )}
      </UniversalExpandRoot>
    </div>
  )
}

// =============================================================================
// PAGE COMPONENT
// =============================================================================

export default function UniversalExpandPlayground() {
  const [selectedPreset, setSelectedPreset] = useState<PresetOption>(PRESETS[0])

  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <header className="border-b border-primary px-6 py-4">
        <h1 className="text-xl font-semibold text-fg-primary">
          Universal Expand Playground
        </h1>
        <p className="text-sm text-fg-secondary mt-1">
          Test 4-directional expansion patterns with GPU-accelerated clip-path animations
        </p>
      </header>

      <div className="flex">
        {/* Sidebar - Preset Selection */}
        <aside className="w-72 border-r border-primary p-4 min-h-[calc(100vh-73px)]">
          <h2 className="text-sm font-medium text-fg-secondary uppercase tracking-wider mb-4">
            Presets
          </h2>
          <div className="space-y-2">
            {PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => setSelectedPreset(preset)}
                className={cn(
                  'w-full text-left px-3 py-2 rounded-lg transition-colors',
                  'border',
                  selectedPreset.id === preset.id
                    ? 'bg-tertiary border-brand text-fg-primary'
                    : 'bg-secondary border-transparent text-fg-secondary hover:bg-tertiary hover:text-fg-primary'
                )}
              >
                <div className="font-medium text-sm">{preset.name}</div>
                <div className="text-xs text-fg-tertiary mt-0.5">
                  {preset.description}
                </div>
                <div className="flex gap-1 mt-2">
                  {preset.slots.map((slot) => (
                    <span
                      key={slot}
                      className={cn(
                        'text-[10px] px-1.5 py-0.5 rounded',
                        'bg-quaternary text-fg-tertiary'
                      )}
                    >
                      {slot}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Main content - Demo */}
        <main className="flex-1 p-6">
          <div className="bg-secondary rounded-2xl border border-primary overflow-hidden">
            {/* Demo info bar */}
            <div className="px-4 py-3 border-b border-primary bg-tertiary">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-fg-primary">
                    {selectedPreset.name}
                  </h3>
                  <p className="text-xs text-fg-tertiary">
                    {selectedPreset.description}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-fg-tertiary">
                    Expand: 350ms • Collapse: 125ms
                  </span>
                </div>
              </div>
            </div>

            {/* Demo area */}
            <UniversalExpandDemo
              key={selectedPreset.id}
              preset={selectedPreset}
            />
          </div>

          {/* Usage example */}
          <div className="mt-6 bg-secondary rounded-xl border border-primary p-4">
            <h3 className="text-sm font-medium text-fg-primary mb-3">
              Usage
            </h3>
            <pre className="text-xs text-fg-secondary bg-tertiary rounded-lg p-4 overflow-x-auto">
{`import {
  UniversalExpandRoot,
  UniversalSlot,
  Backdrop,
  TriggerSlot,
  ${selectedPreset.getConfig.name},
} from '@/components/ui/core/primitives/universal-expand'

<UniversalExpandRoot config={${selectedPreset.getConfig.name}()}>
  <Backdrop />
  <TriggerSlot>
    <YourTrigger />
  </TriggerSlot>
${selectedPreset.slots.map(slot => `  <UniversalSlot position="${slot}">
    <Your${slot.charAt(0).toUpperCase() + slot.slice(1)}Content />
  </UniversalSlot>`).join('\n')}
</UniversalExpandRoot>`}
            </pre>
          </div>
        </main>
      </div>
    </div>
  )
}

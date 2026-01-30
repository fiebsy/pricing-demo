/**
 * ButtonAnimation V2 Playground
 *
 * Interactive testing environment for the multi-level stacking component.
 * Demonstrates infinite nesting depth with the peek-behind pattern.
 *
 * @module playground/button-animation-v2
 */

'use client'

import * as React from 'react'
import { useCallback, useMemo, useState } from 'react'
import { Breadcrumbs } from '@/components/ui/deprecated/nav'
import {
  UnifiedControlPanel,
  type ControlChangeEvent,
  type UnifiedControlPanelProps,
} from '@/components/ui/patterns/control-panel'
import {
  EnhancedButtonAnimationV2 as ButtonAnimationV2,
  type AnimationConfig,
  type StyleConfig,
  type StackItem,
  type OffsetTarget,
  type ButtonVariant,
  type EaseType,
  DEFAULT_ANIMATION_CONFIG,
  DEFAULT_STYLE_CONFIG,
} from '@/components/ui/features/button-animation'
import { 
  AnchorPositionDebugger, 
  MiniPositionTracker 
} from '@/components/ui/features/button-animation/debug/AnchorPositionDebugger'
import { PositionLogger } from '@/components/ui/features/button-animation/debug/PositionLogger'

type UnifiedControlPanelConfig = UnifiedControlPanelProps['config']

// =============================================================================
// DEMO DATA
// =============================================================================

/**
 * Extended demo items with 4 levels of nesting to showcase the pattern.
 */
const EXTENDED_DEMO_ITEMS: StackItem[] = [
  {
    id: 'all',
    label: 'All',
  },
  {
    id: 'design',
    label: 'Design',
    children: [
      {
        id: 'figma',
        label: 'Figma',
        children: [
          {
            id: 'components',
            label: 'Components',
            children: [
              { id: 'buttons', label: 'Buttons' },
              { id: 'inputs', label: 'Inputs' },
              { id: 'cards', label: 'Cards' },
            ],
          },
          {
            id: 'prototypes',
            label: 'Prototypes',
            children: [
              { id: 'mobile', label: 'Mobile' },
              { id: 'desktop', label: 'Desktop' },
            ],
          },
          { id: 'design-tokens', label: 'Tokens' },
        ],
      },
      {
        id: 'sketch',
        label: 'Sketch',
        children: [
          { id: 'symbols', label: 'Symbols' },
          { id: 'libraries', label: 'Libraries' },
        ],
      },
      { id: 'adobe', label: 'Adobe XD' },
    ],
  },
  {
    id: 'develop',
    label: 'Develop',
    children: [
      {
        id: 'react',
        label: 'React',
        children: [
          {
            id: 'hooks',
            label: 'Hooks',
            children: [
              { id: 'use-state', label: 'useState' },
              { id: 'use-effect', label: 'useEffect' },
              { id: 'use-memo', label: 'useMemo' },
            ],
          },
          { id: 'components-lib', label: 'Components' },
          { id: 'state-mgmt', label: 'State' },
        ],
      },
      {
        id: 'vue',
        label: 'Vue',
        children: [
          { id: 'composition', label: 'Composition' },
          { id: 'pinia', label: 'Pinia' },
        ],
      },
      { id: 'svelte', label: 'Svelte' },
    ],
  },
  {
    id: 'deploy',
    label: 'Deploy',
    children: [
      { id: 'vercel', label: 'Vercel' },
      { id: 'netlify', label: 'Netlify' },
      {
        id: 'aws',
        label: 'AWS',
        children: [
          { id: 'lambda', label: 'Lambda' },
          { id: 's3', label: 'S3' },
          { id: 'cloudfront', label: 'CloudFront' },
        ],
      },
    ],
  },
]

// =============================================================================
// CONFIG INTERFACE
// =============================================================================

interface PlaygroundConfig {
  // Animation Type
  ease: EaseType
  duration: number

  // Active Button Animation (Spring)
  stiffness: number
  damping: number

  // Child Animation
  childEase: EaseType
  childDuration: number
  childStiffness: number
  childDamping: number
  childEntryDelay: number
  stagger: number
  entryDistance: number
  exitDuration: number

  // Terminal Animation (when child becomes active)
  terminalDuration: number
  terminalScale: number

  // Stacking Behavior
  offsetTarget: OffsetTarget
  peekOffset: number
  anchoredOpacity: number

  // Button Variants
  expandedVariant: ButtonVariant
  childVariant: ButtonVariant
  anchoredVariant: ButtonVariant

  // Layout
  gap: 'sm' | 'md' | 'lg'
  childGap: number

  // Display
  showNumbers: boolean
  
  // Debug
  showDebugOverlay: boolean
  showMiniTracker: boolean
  debugGrid: boolean
  debugRulers: boolean
  debugConnections: boolean
  debugCalculations: boolean
}

const DEFAULT_PLAYGROUND_CONFIG: PlaygroundConfig = {
  // Animation Type
  ease: DEFAULT_ANIMATION_CONFIG.ease,
  duration: DEFAULT_ANIMATION_CONFIG.duration * 1000, // ms

  // Active Button Animation (Spring)
  stiffness: DEFAULT_ANIMATION_CONFIG.stiffness,
  damping: DEFAULT_ANIMATION_CONFIG.damping,

  // Child Animation
  childEase: DEFAULT_ANIMATION_CONFIG.ease,
  childDuration: DEFAULT_ANIMATION_CONFIG.duration * 1000, // ms
  childStiffness: DEFAULT_ANIMATION_CONFIG.childStiffness,
  childDamping: DEFAULT_ANIMATION_CONFIG.childDamping,
  childEntryDelay: DEFAULT_ANIMATION_CONFIG.childEntryDelay * 1000, // ms
  stagger: DEFAULT_ANIMATION_CONFIG.stagger * 1000, // ms
  entryDistance: DEFAULT_ANIMATION_CONFIG.entryDistance,
  exitDuration: DEFAULT_ANIMATION_CONFIG.exitDuration * 1000, // ms

  // Terminal Animation (when child becomes active)
  terminalDuration: DEFAULT_ANIMATION_CONFIG.terminalDuration * 1000, // ms
  terminalScale: DEFAULT_ANIMATION_CONFIG.terminalScale,

  // Stacking Behavior
  offsetTarget: DEFAULT_STYLE_CONFIG.offsetTarget,
  peekOffset: DEFAULT_STYLE_CONFIG.peekOffset,
  anchoredOpacity: DEFAULT_STYLE_CONFIG.anchoredOpacity,

  // Button Variants
  expandedVariant: DEFAULT_STYLE_CONFIG.expandedVariant,
  childVariant: DEFAULT_STYLE_CONFIG.childVariant,
  anchoredVariant: DEFAULT_STYLE_CONFIG.anchoredVariant,

  // Layout
  gap: DEFAULT_STYLE_CONFIG.gap,
  childGap: 12, // pixels

  // Display
  showNumbers: false,
  
  // Debug
  showDebugOverlay: false,
  showMiniTracker: false,
  debugGrid: true,
  debugRulers: true,
  debugConnections: true,
  debugCalculations: true,
}

// =============================================================================
// PANEL CONFIG
// =============================================================================

// Button variant options for selects
const VARIANT_OPTIONS = [
  { value: 'primary', label: 'Primary' },
  { value: 'secondary', label: 'Secondary' },
  { value: 'tertiary', label: 'Tertiary' },
  { value: 'shine', label: 'Shine' },
  { value: 'link-gray', label: 'Link Gray' },
  { value: 'link-color', label: 'Link Color' },
]

// Ease type options
const EASE_OPTIONS = [
  { value: 'spring', label: 'Spring' },
  { value: 'easeOut', label: 'Ease Out' },
  { value: 'easeIn', label: 'Ease In' },
  { value: 'easeInOut', label: 'Ease In Out' },
  { value: 'linear', label: 'Linear' },
]

function createPanelConfig(config: PlaygroundConfig): UnifiedControlPanelConfig {
  // Dynamic range for peekOffset based on offsetTarget
  const peekOffsetMin = config.offsetTarget === 'incoming' ? 0 : -24
  const peekOffsetMax = config.offsetTarget === 'incoming' ? 24 : 0

  return {
    sections: [
      {
        id: 'active',
        title: 'Active Button',
        tabLabel: 'Active',
        groups: [
          {
            title: 'Animation Type',
            controls: [
              {
                id: 'ease',
                type: 'select',
                label: 'Easing',
                value: config.ease,
                options: EASE_OPTIONS,
              },
              ...(config.ease === 'spring'
                ? [
                    {
                      id: 'stiffness',
                      type: 'slider' as const,
                      label: 'Stiffness',
                      value: config.stiffness,
                      min: 100,
                      max: 1000,
                      step: 25,
                      formatLabel: (v: number) => `${v}`,
                    },
                    {
                      id: 'damping',
                      type: 'slider' as const,
                      label: 'Damping',
                      value: config.damping,
                      min: 10,
                      max: 60,
                      step: 1,
                      formatLabel: (v: number) => `${v}`,
                    },
                  ]
                : [
                    {
                      id: 'duration',
                      type: 'slider' as const,
                      label: 'Duration',
                      value: config.duration,
                      min: 50,
                      max: 500,
                      step: 25,
                      formatLabel: (v: number) => `${v}ms`,
                    },
                  ]),
            ],
          },
          {
            title: 'Style',
            controls: [
              {
                id: 'expandedVariant',
                type: 'select',
                label: 'Expanded Variant',
                value: config.expandedVariant,
                options: VARIANT_OPTIONS,
              },
            ],
          },
        ],
      },
      {
        id: 'children',
        title: 'Child Items',
        tabLabel: 'Children',
        groups: [
          {
            title: 'Animation Type',
            controls: [
              {
                id: 'childEase',
                type: 'select',
                label: 'Easing',
                value: config.childEase,
                options: EASE_OPTIONS,
              },
              ...(config.childEase === 'spring'
                ? [
                    {
                      id: 'childStiffness',
                      type: 'slider' as const,
                      label: 'Stiffness',
                      value: config.childStiffness,
                      min: 100,
                      max: 1000,
                      step: 25,
                      formatLabel: (v: number) => `${v}`,
                    },
                    {
                      id: 'childDamping',
                      type: 'slider' as const,
                      label: 'Damping',
                      value: config.childDamping,
                      min: 10,
                      max: 60,
                      step: 1,
                      formatLabel: (v: number) => `${v}`,
                    },
                  ]
                : [
                    {
                      id: 'childDuration',
                      type: 'slider' as const,
                      label: 'Duration',
                      value: config.childDuration,
                      min: 50,
                      max: 500,
                      step: 25,
                      formatLabel: (v: number) => `${v}ms`,
                    },
                  ]),
            ],
          },
          {
            title: 'Entry Timing',
            controls: [
              {
                id: 'childEntryDelay',
                type: 'slider',
                label: 'Entry Delay',
                value: config.childEntryDelay,
                min: 0,
                max: 200,
                step: 10,
                formatLabel: (v: number) => `${v}ms`,
              },
              {
                id: 'stagger',
                type: 'slider',
                label: 'Stagger',
                value: config.stagger,
                min: 0,
                max: 100,
                step: 5,
                formatLabel: (v: number) => `${v}ms`,
              },
              {
                id: 'entryDistance',
                type: 'slider',
                label: 'Entry Distance',
                value: config.entryDistance,
                min: 0,
                max: 24,
                step: 2,
                formatLabel: (v: number) => `${v}px`,
              },
            ],
          },
          {
            title: 'Active Selection',
            controls: [
              {
                id: 'terminalDuration',
                type: 'slider',
                label: 'Pulse Duration',
                value: config.terminalDuration,
                min: 100,
                max: 500,
                step: 25,
                formatLabel: (v: number) => `${v}ms`,
              },
              {
                id: 'terminalScale',
                type: 'slider',
                label: 'Pulse Scale',
                value: config.terminalScale,
                min: 1.0,
                max: 1.15,
                step: 0.01,
                formatLabel: (v: number) => `${v.toFixed(2)}`,
              },
            ],
          },
          {
            title: 'Style',
            controls: [
              {
                id: 'childVariant',
                type: 'select',
                label: 'Child Variant',
                value: config.childVariant,
                options: VARIANT_OPTIONS,
              },
              {
                id: 'childGap',
                type: 'slider',
                label: 'Child Gap',
                value: config.childGap,
                min: 0,
                max: 24,
                step: 2,
                formatLabel: (v: number) => `${v}px`,
              },
            ],
          },
        ],
      },
      {
        id: 'stacking',
        title: 'Stacking',
        tabLabel: 'Stack',
        groups: [
          {
            title: 'Offset Behavior',
            controls: [
              {
                id: 'offsetTarget',
                type: 'select',
                label: 'Offset Target',
                value: config.offsetTarget,
                options: [
                  { value: 'anchored', label: 'Anchored (shifts left)' },
                  { value: 'incoming', label: 'Incoming (starts right)' },
                ],
              },
              {
                id: 'peekOffset',
                type: 'slider',
                label: 'Peek Offset',
                value: config.peekOffset,
                min: peekOffsetMin,
                max: peekOffsetMax,
                step: 2,
                formatLabel: (v: number) => `${v}px`,
              },
            ],
          },
          {
            title: 'Anchored Style',
            controls: [
              {
                id: 'anchoredVariant',
                type: 'select',
                label: 'Anchored Variant',
                value: config.anchoredVariant,
                options: VARIANT_OPTIONS,
              },
              {
                id: 'anchoredOpacity',
                type: 'slider',
                label: 'Opacity',
                value: config.anchoredOpacity,
                min: 0.2,
                max: 1,
                step: 0.1,
                formatLabel: (v: number) => `${v}`,
              },
            ],
          },
          {
            title: 'Exit',
            controls: [
              {
                id: 'exitDuration',
                type: 'slider',
                label: 'Exit Duration',
                value: config.exitDuration,
                min: 50,
                max: 300,
                step: 10,
                formatLabel: (v: number) => `${v}ms`,
              },
            ],
          },
        ],
      },
      {
        id: 'layout',
        title: 'Layout',
        tabLabel: 'Layout',
        groups: [
          {
            title: 'Spacing',
            controls: [
              {
                id: 'gap',
                type: 'select',
                label: 'Gap',
                value: config.gap,
                options: [
                  { value: 'sm', label: 'Small' },
                  { value: 'md', label: 'Medium' },
                  { value: 'lg', label: 'Large' },
                ],
              },
            ],
          },
          {
            title: 'Display',
            controls: [
              {
                id: 'showNumbers',
                type: 'toggle',
                label: 'Show Numbers',
                value: config.showNumbers,
              },
            ],
          },
        ],
      },
      {
        id: 'debug',
        title: 'Debug',
        tabLabel: 'Debug',
        groups: [
          {
            title: 'Debug Overlay',
            controls: [
              {
                id: 'showDebugOverlay',
                type: 'toggle',
                label: 'Enable Debug Overlay',
                value: config.showDebugOverlay,
              },
              {
                id: 'showMiniTracker',
                type: 'toggle',
                label: 'Show Mini Tracker',
                value: config.showMiniTracker,
              },
            ],
          },
          {
            title: 'Debug Options',
            controls: [
              {
                id: 'debugGrid',
                type: 'toggle',
                label: 'Show Grid',
                value: config.debugGrid,
              },
              {
                id: 'debugRulers',
                type: 'toggle',
                label: 'Show Rulers',
                value: config.debugRulers,
              },
              {
                id: 'debugConnections',
                type: 'toggle',
                label: 'Show Connections',
                value: config.debugConnections,
              },
              {
                id: 'debugCalculations',
                type: 'toggle',
                label: 'Show Calculations',
                value: config.debugCalculations,
              },
            ],
          },
        ],
      },
    ],
    defaultActiveTab: 'active',
    position: {
      top: '16px',
      bottom: '16px',
      right: '16px',
      width: '320px',
    },
    showReset: true,
    resetLabel: 'Reset All',
  }
}

// =============================================================================
// MAIN PAGE
// =============================================================================

export default function ButtonAnimationV2Playground() {
  const [config, setConfig] = useState<PlaygroundConfig>(DEFAULT_PLAYGROUND_CONFIG)
  const [resetKey, setResetKey] = useState(0)

  // Transform config for component
  const animationConfig: Partial<AnimationConfig> = useMemo(
    () => ({
      ease: config.ease,
      duration: config.duration / 1000, // back to seconds
      stiffness: config.stiffness,
      damping: config.damping,
      childEase: config.childEase,
      childDuration: config.childDuration / 1000,
      childStiffness: config.childStiffness,
      childDamping: config.childDamping,
      childEntryDelay: config.childEntryDelay / 1000,
      stagger: config.stagger / 1000,
      entryDistance: config.entryDistance,
      exitDuration: config.exitDuration / 1000,
      terminalDuration: config.terminalDuration / 1000,
      terminalScale: config.terminalScale,
    }),
    [config]
  )

  const styleConfig: Partial<StyleConfig> = useMemo(
    () => ({
      offsetTarget: config.offsetTarget,
      peekOffset: config.peekOffset,
      anchoredOpacity: config.anchoredOpacity,
      expandedVariant: config.expandedVariant,
      childVariant: config.childVariant,
      anchoredVariant: config.anchoredVariant,
      gap: config.gap,
      childGap: config.childGap,
    }),
    [config]
  )

  // Panel config
  const panelConfig = useMemo(() => createPanelConfig(config), [config])

  // Handlers
  const handleControlChange = useCallback((event: ControlChangeEvent) => {
    const { controlId, value } = event
    setConfig((prev) => {
      const next = { ...prev, [controlId]: value }

      // When offsetTarget changes, adjust peekOffset to be valid for the new mode
      if (controlId === 'offsetTarget') {
        if (value === 'incoming' && next.peekOffset < 0) {
          // Switch from negative to positive
          next.peekOffset = Math.abs(next.peekOffset)
        } else if (value === 'anchored' && next.peekOffset > 0) {
          // Switch from positive to negative
          next.peekOffset = -Math.abs(next.peekOffset)
        }
      }

      return next
    })
  }, [])

  const handleReset = useCallback(() => {
    setConfig(DEFAULT_PLAYGROUND_CONFIG)
    setResetKey((k) => k + 1)
  }, [])

  const handleComponentReset = useCallback(() => {
    setResetKey((k) => k + 1)
  }, [])

  const getConfigForCopy = useCallback(() => {
    return {
      animationConfig,
      styleConfig,
      showNumbers: config.showNumbers,
    }
  }, [animationConfig, styleConfig, config.showNumbers])

  return (
    <div className="min-h-screen bg-primary">
      {/* Debug Overlay - conditionally rendered to avoid React errors */}
      {config.showDebugOverlay && (
        <AnchorPositionDebugger
          enabled={true}
          showGrid={config.debugGrid}
          showRulers={config.debugRulers}
          showConnections={config.debugConnections}
          showOffsetCalculations={config.debugCalculations}
        />
      )}
      
      {/* Mini Position Tracker */}
      {config.showMiniTracker && <MiniPositionTracker />}
      {/* Breadcrumbs */}
      <div className="nav-clearance px-6">
        <div className="flex items-center justify-between">
          <Breadcrumbs
            items={[
              { label: 'Playground', href: '/playground' },
              { label: 'Button Animation V2' },
            ]}
          />
          <div className="text-xs text-tertiary">
            Multi-level stacking with peek-behind pattern
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <div className="pr-[352px] pb-24 md:pb-0">
        <div className="flex flex-col min-h-[calc(100vh-120px)] p-8">
          {/* Description */}
          <div className="mb-8 max-w-2xl">
            <h1 className="text-2xl font-semibold text-primary mb-2">
              Button Animation V2
            </h1>
            <p className="text-tertiary">
              Multi-level expandable navigation with infinite nesting support.
              Uses the <strong>peek-behind stacking pattern</strong> for O(1)
              performance regardless of depth.
            </p>
          </div>

          {/* Instructions */}
          <div className="mb-6 p-4 bg-secondary rounded-xl">
            <h3 className="text-sm font-medium text-primary mb-2">
              How the stacking works:
            </h3>
            <ol className="text-sm text-tertiary space-y-1 list-decimal list-inside">
              <li>Click any parent (Design, Develop, Deploy) to expand</li>
              <li>The "All" button slides behind (absolute positioned, faded)</li>
              <li>Click a child (e.g., Figma) to go deeper</li>
              <li>Previous level (Design) becomes anchored behind Figma</li>
              <li>Continue clicking to go 4+ levels deep</li>
              <li>Click × to collapse back up</li>
            </ol>
            <p className="mt-3 text-xs text-quaternary">
              Key insight: Each level only knows "am I anchored or active?" —
              no tracking of the full stack. This enables infinite scalability.
            </p>
          </div>

          {/* Component Preview */}
          <div className="bg-secondary rounded-2xl p-8 mb-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-primary">
                Component Preview
              </span>
              <button
                onClick={handleComponentReset}
                className="px-3 py-1 text-xs rounded-lg bg-tertiary text-secondary hover:text-primary transition-colors"
              >
                Reset State
              </button>
            </div>

            <ButtonAnimationV2
              key={resetKey}
              items={EXTENDED_DEMO_ITEMS}
              animationConfig={animationConfig}
              styleConfig={styleConfig}
              showNumbers={config.showNumbers}
              onReset={handleComponentReset}
            />
          </div>

          {/* Nesting depth indicator */}
          <div className="mb-6 p-4 bg-tertiary rounded-xl">
            <h3 className="text-sm font-medium text-secondary mb-2">
              Demo nesting structure:
            </h3>
            <pre className="text-xs text-tertiary font-mono overflow-auto">
{`Level 0: All, Design, Develop, Deploy
Level 1: Figma, Sketch, Adobe XD (under Design)
Level 2: Components, Prototypes, Tokens (under Figma)
Level 3: Buttons, Inputs, Cards (under Components)

Try: Design → Figma → Components → Buttons (4 levels deep)`}
            </pre>
          </div>

          {/* Current Config Display */}
          <div className="bg-tertiary rounded-xl p-4">
            <div className="text-xs font-mono text-tertiary">
              <div className="mb-2 text-secondary font-medium">
                Current Config:
              </div>
              <pre className="text-xs overflow-auto max-h-48">
                {JSON.stringify(getConfigForCopy(), null, 2)}
              </pre>
            </div>
          </div>

          {/* Technical notes */}
          <div className="mt-6 text-xs text-quaternary space-y-1">
            <p>
              <strong>S-tier optimizations:</strong> layout=&quot;position&quot;, GPU-only
              properties (opacity, x, y), high damping springs
            </p>
            <p>
              <strong>Scalability:</strong> O(1) state size regardless of nesting depth
            </p>
            <p>
              <strong>Pattern:</strong> Peek-behind (absolute + z-index + opacity)
            </p>
          </div>
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

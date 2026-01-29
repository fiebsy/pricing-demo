/**
 * ButtonAnimation V3 Playground
 *
 * Clean, production-ready multi-level stacking component.
 * Fixes child-to-parent animation issues with minimal complexity.
 *
 * @module playground/button-animation-v3
 */

'use client'

import * as React from 'react'
import { useCallback, useMemo, useState } from 'react'
import { Breadcrumbs } from '@/components/ui/deprecated/nav'
import {
  UnifiedControlPanel,
  type ControlChangeEvent,
  type UnifiedControlPanelProps,
} from '@/components/ui/prod/base/control-panel'
import {
  ButtonAnimationV3,
  type AnimationConfig,
  type StyleConfig,
  type StackItem,
  DEFAULT_ANIMATION_CONFIG,
  DEFAULT_STYLE_CONFIG,
} from '@/components/ui/prod/base/button-animation-v3'

type UnifiedControlPanelConfig = UnifiedControlPanelProps['config']

// =============================================================================
// DEMO DATA
// =============================================================================

const DEMO_ITEMS: StackItem[] = [
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
  // Animation
  springStiffness: number
  springDamping: number
  promotionDuration: number
  promotionScale: number
  
  // Child Animation
  childStagger: number
  childEntryDistance: number
  childEntryDelay: number
  
  // Stacking
  peekOffset: number
  anchoredOpacity: number
  
  // Layout
  gap: 'sm' | 'md' | 'lg'
  
  // Display
  showNumbers: boolean
  showDebug: boolean
  
  // Advanced Debug
  showGrid: boolean
  showRulers: boolean
  showConnections: boolean
  showCalculations: boolean
  showPositionOverlays: boolean
  debugOpacity: number
}

const DEFAULT_PLAYGROUND_CONFIG: PlaygroundConfig = {
  // Animation
  springStiffness: DEFAULT_ANIMATION_CONFIG.stiffness,
  springDamping: DEFAULT_ANIMATION_CONFIG.damping,
  promotionDuration: 400, // ms
  promotionScale: 1.08,
  
  // Child Animation
  childStagger: DEFAULT_ANIMATION_CONFIG.stagger * 1000, // ms
  childEntryDistance: DEFAULT_ANIMATION_CONFIG.entryDistance,
  childEntryDelay: DEFAULT_ANIMATION_CONFIG.childEntryDelay * 1000, // ms
  
  // Stacking
  peekOffset: 8,
  anchoredOpacity: DEFAULT_STYLE_CONFIG.anchoredOpacity,
  
  // Layout
  gap: DEFAULT_STYLE_CONFIG.gap,
  
  // Display
  showNumbers: false,
  showDebug: false,
  
  // Advanced Debug
  showGrid: true,
  showRulers: true,
  showConnections: true,
  showCalculations: true,
  showPositionOverlays: true,
  debugOpacity: 0.9,
}

// =============================================================================
// PANEL CONFIG
// =============================================================================

function createPanelConfig(config: PlaygroundConfig): UnifiedControlPanelConfig {
  return {
    sections: [
      {
        id: 'animation',
        title: 'Animation',
        tabLabel: 'Animation',
        groups: [
          {
            title: 'Spring Settings',
            controls: [
              {
                id: 'springStiffness',
                type: 'slider',
                label: 'Stiffness',
                value: config.springStiffness,
                min: 100,
                max: 1000,
                step: 25,
                formatLabel: (v: number) => `${v}`,
              },
              {
                id: 'springDamping',
                type: 'slider',
                label: 'Damping',
                value: config.springDamping,
                min: 10,
                max: 60,
                step: 1,
                formatLabel: (v: number) => `${v}`,
              },
            ],
          },
          {
            title: 'Promotion Animation',
            controls: [
              {
                id: 'promotionDuration',
                type: 'slider',
                label: 'Duration',
                value: config.promotionDuration,
                min: 200,
                max: 600,
                step: 25,
                formatLabel: (v: number) => `${v}ms`,
              },
              {
                id: 'promotionScale',
                type: 'slider',
                label: 'Scale',
                value: config.promotionScale,
                min: 1.0,
                max: 1.15,
                step: 0.01,
                formatLabel: (v: number) => `${v.toFixed(2)}`,
              },
            ],
          },
        ],
      },
      {
        id: 'children',
        title: 'Children',
        tabLabel: 'Children',
        groups: [
          {
            title: 'Entry Animation',
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
                id: 'childStagger',
                type: 'slider',
                label: 'Stagger',
                value: config.childStagger,
                min: 0,
                max: 100,
                step: 5,
                formatLabel: (v: number) => `${v}ms`,
              },
              {
                id: 'childEntryDistance',
                type: 'slider',
                label: 'Entry Distance',
                value: config.childEntryDistance,
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
            title: 'Peek Behavior',
            controls: [
              {
                id: 'peekOffset',
                type: 'slider',
                label: 'Peek Offset',
                value: config.peekOffset,
                min: -40,
                max: 40,
                step: 2,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'anchoredOpacity',
                type: 'slider',
                label: 'Anchored Opacity',
                value: config.anchoredOpacity,
                min: 0.2,
                max: 1,
                step: 0.1,
                formatLabel: (v: number) => `${v}`,
              },
            ],
          },
        ],
      },
      {
        id: 'display',
        title: 'Display',
        tabLabel: 'Display',
        groups: [
          {
            title: 'Layout',
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
            title: 'Options',
            controls: [
              {
                id: 'showNumbers',
                type: 'toggle',
                label: 'Show Numbers',
                value: config.showNumbers,
              },
              {
                id: 'showDebug',
                type: 'toggle',
                label: 'Show Debug',
                value: config.showDebug,
              },
            ],
          },
          {
            title: 'Advanced Debug',
            controls: [
              {
                id: 'showGrid',
                type: 'toggle',
                label: 'Grid Lines',
                value: config.showGrid,
              },
              {
                id: 'showRulers',
                type: 'toggle',
                label: 'Position Rulers',
                value: config.showRulers,
              },
              {
                id: 'showConnections',
                type: 'toggle',
                label: 'Connections',
                value: config.showConnections,
              },
              {
                id: 'showCalculations',
                type: 'toggle',
                label: 'Calculations',
                value: config.showCalculations,
              },
              {
                id: 'showPositionOverlays',
                type: 'toggle',
                label: 'Position Overlays',
                value: config.showPositionOverlays,
              },
              {
                id: 'debugOpacity',
                type: 'slider',
                label: 'Debug Opacity',
                value: config.debugOpacity,
                min: 0.1,
                max: 1,
                step: 0.1,
                formatLabel: (v: number) => `${v.toFixed(1)}`,
              },
            ],
          },
        ],
      },
    ],
    defaultActiveTab: 'animation',
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

export default function ButtonAnimationV3Playground() {
  const [config, setConfig] = useState<PlaygroundConfig>(DEFAULT_PLAYGROUND_CONFIG)
  const [resetKey, setResetKey] = useState(0)

  // Transform config for component
  const animationConfig: Partial<AnimationConfig> = useMemo(
    () => ({
      stiffness: config.springStiffness,
      damping: config.springDamping,
      promotionDuration: config.promotionDuration / 1000, // to seconds
      promotionScale: config.promotionScale,
      stagger: config.childStagger / 1000,
      entryDistance: config.childEntryDistance,
      childEntryDelay: config.childEntryDelay / 1000,
    }),
    [config]
  )

  const styleConfig: Partial<StyleConfig> = useMemo(
    () => ({
      peekOffset: config.peekOffset,
      anchoredOpacity: config.anchoredOpacity,
      gap: config.gap,
    }),
    [config]
  )

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

  const handleComponentReset = useCallback(() => {
    setResetKey((k) => k + 1)
  }, [])

  const getConfigForCopy = useCallback(() => {
    return {
      animationConfig,
      styleConfig,
      showNumbers: config.showNumbers,
      showDebug: config.showDebug,
    }
  }, [animationConfig, styleConfig, config.showNumbers, config.showDebug])

  return (
    <div className="min-h-screen bg-primary">
      {/* Breadcrumbs */}
      <div className="nav-clearance px-6">
        <div className="flex items-center justify-between">
          <Breadcrumbs
            items={[
              { label: 'Playground', href: '/playground' },
              { label: 'Button Animation V3' },
            ]}
          />
          <div className="text-xs text-tertiary">
            Production-ready with child-to-parent fix
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <div className="pr-[352px] pb-24 md:pb-0">
        <div className="flex flex-col min-h-[calc(100vh-120px)] p-8">
          {/* Description */}
          <div className="mb-8 max-w-2xl">
            <h1 className="text-2xl font-semibold text-primary mb-2">
              Button Animation V3
            </h1>
            <p className="text-tertiary">
              Clean, production-ready multi-level navigation with proper child-to-parent
              promotion animations. Fixes the animation issue where children at 2nd+ levels
              don't animate correctly when becoming parents.
            </p>
          </div>

          {/* Key Improvements */}
          <div className="mb-6 p-4 bg-secondary rounded-xl">
            <h3 className="text-sm font-medium text-primary mb-2">
              V3 Improvements:
            </h3>
            <ul className="text-sm text-tertiary space-y-1">
              <li>✅ Fixed child-to-parent promotion at all levels</li>
              <li>✅ Simplified to 5 essential animation states</li>
              <li>✅ Cleaner component architecture</li>
              <li>✅ Better animation targeting and debugging</li>
              <li>✅ Maintains O(1) performance characteristics</li>
            </ul>
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

            <ButtonAnimationV3
              key={resetKey}
              items={DEMO_ITEMS}
              animationConfig={animationConfig}
              styleConfig={styleConfig}
              showNumbers={config.showNumbers}
              showDebug={config.showDebug}
              onReset={handleComponentReset}
            />
          </div>

          {/* Test Scenarios */}
          <div className="mb-6 p-4 bg-tertiary rounded-xl">
            <h3 className="text-sm font-medium text-secondary mb-2">
              Test the fix:
            </h3>
            <ol className="text-xs text-tertiary font-mono space-y-1">
              <li>1. Click Design → Figma → Components</li>
              <li>2. Watch Components animate smoothly into parent position</li>
              <li>3. Try deeper: Components → Buttons (4th level)</li>
              <li className="text-brand">→ All levels now animate correctly!</li>
            </ol>
          </div>

          {/* Technical Notes */}
          <div className="text-xs text-quaternary space-y-1">
            <p>
              <strong>Animation States:</strong> idle, parent, anchored, child, promoting
            </p>
            <p>
              <strong>Key Fix:</strong> Explicit "promoting" state handles child-to-parent transition
            </p>
            <p>
              <strong>Performance:</strong> GPU-only transforms, high-damping springs
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
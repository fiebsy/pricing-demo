/**
 * StackingNav Playground
 *
 * Test page for the migrated stacking navigation component.
 * This should behave exactly like button-animation-v3.
 *
 * @module playground/stacking-nav
 */

'use client'

import * as React from 'react'
import { useCallback, useMemo, useState } from 'react'
import {
  UnifiedControlPanel,
  type ControlChangeEvent,
  type UnifiedControlPanelProps,
} from '@/components/ui/prod/base/control-panel'
import {
  StackingNav,
  type AnimationConfig,
  type StyleConfig,
  type StackItem,
  type ActivePath,
  type AnimationType,
  type EasingType,
  type ButtonVariant,
  DEFAULT_ANIMATION_CONFIG,
  DEFAULT_STYLE_CONFIG,
} from '@/components/ui/features/stacking-nav'

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

// Filter list demo items
const FILTER_ITEMS: StackItem[] = [
  { id: 'all', label: 'All' },
  {
    id: 'status',
    label: 'Status',
    children: [
      { id: 'active', label: 'Active' },
      { id: 'pending', label: 'Pending' },
      { id: 'completed', label: 'Completed' },
    ],
  },
  {
    id: 'priority',
    label: 'Priority',
    children: [
      { id: 'high', label: 'High' },
      { id: 'medium', label: 'Medium' },
      { id: 'low', label: 'Low' },
    ],
  },
  {
    id: 'type',
    label: 'Type',
    children: [
      { id: 'bug', label: 'Bug' },
      { id: 'feature', label: 'Feature' },
      { id: 'enhancement', label: 'Enhancement' },
    ],
  },
]

// =============================================================================
// CONFIG INTERFACE
// =============================================================================

type ConfigPreset = 'default' | 'spring' | 'custom'

type EntryDirection = 'up' | 'down' | 'left' | 'right' | 'up-left' | 'up-right' | 'down-left' | 'down-right' | 'none' | 'custom'

interface PlaygroundConfig {
  // Config Preset
  configPreset: ConfigPreset
  
  // Animation Type
  animationType: AnimationType
  
  // Spring Animation
  springStiffness: number
  springDamping: number
  springPreset: 'custom' | 'smooth' | 'snappy' | 'soft' | 'bouncy'
  
  // Tween/Easing Animation
  tweenDuration: number
  tweenEase: EasingType
  
  // Promotion Animation
  promotionDuration: number
  promotionScale: number
  
  // Child Animation
  childStagger: number
  entryDirection: EntryDirection
  entryOffsetX: number
  entryOffsetY: number
  childEntryDelay: number
  childEntryScale: number
  
  // Exit Animation
  exitDuration: number
  exitScale: number
  
  // Leaf Node Behavior
  skipLeafAnimation: boolean
  selectedLeafVariant: ButtonVariant
  
  // Stacking
  peekOffset: number
  anchoredOpacity: number
  
  // Layout
  gap: 'sm' | 'md' | 'lg'
  
  // Display
  showNumbers: boolean
  showDebug: boolean
  
  // Demo
  demoType: 'navigation' | 'filters'
  
  // Level All Button
  showLevelAll: boolean
  levelAllLabel: string
  levelAllActiveVariant: ButtonVariant
  levelAllInactiveVariant: ButtonVariant
}

// Spring presets (for spring animation tuning)
const SPRING_PRESETS = {
  smooth: { stiffness: 500, damping: 30 },
  snappy: { stiffness: 700, damping: 35 },
  soft: { stiffness: 300, damping: 25 },
  bouncy: { stiffness: 400, damping: 15 },
}

// Easing presets for quick selection
const EASING_OPTIONS: { value: EasingType; label: string }[] = [
  { value: 'linear', label: 'Linear' },
  { value: 'easeIn', label: 'Ease In' },
  { value: 'easeOut', label: 'Ease Out' },
  { value: 'easeInOut', label: 'Ease In-Out' },
  { value: 'circIn', label: 'Circ In' },
  { value: 'circOut', label: 'Circ Out' },
  { value: 'circInOut', label: 'Circ In-Out' },
  { value: 'backIn', label: 'Back In' },
  { value: 'backOut', label: 'Back Out' },
  { value: 'backInOut', label: 'Back In-Out' },
  { value: 'anticipate', label: 'Anticipate' },
]

// Entry direction presets
const ENTRY_DIRECTION_PRESETS: Record<Exclude<EntryDirection, 'custom'>, { x: number; y: number }> = {
  // Cardinal directions
  up: { x: 0, y: 12 },           // Slides up from below
  down: { x: 0, y: -12 },        // Slides down from above
  left: { x: 12, y: 0 },         // Slides left from right
  right: { x: -12, y: 0 },       // Slides right from left
  // Diagonal directions
  'up-left': { x: 10, y: 10 },   // Slides up-left from bottom-right
  'up-right': { x: -10, y: 10 }, // Slides up-right from bottom-left
  'down-left': { x: 10, y: -10 },// Slides down-left from top-right
  'down-right': { x: -10, y: -10 }, // Slides down-right from top-left
  // No movement
  none: { x: 0, y: 0 },          // No slide, just fade/scale
}

const ENTRY_DIRECTION_OPTIONS: { value: EntryDirection; label: string }[] = [
  { value: 'none', label: 'None (Scale Only)' },
  { value: 'up', label: '↑ Slide Up' },
  { value: 'down', label: '↓ Slide Down' },
  { value: 'left', label: '← Slide Left' },
  { value: 'right', label: '→ Slide Right' },
  { value: 'up-left', label: '↖ Up-Left' },
  { value: 'up-right', label: '↗ Up-Right' },
  { value: 'down-left', label: '↙ Down-Left' },
  { value: 'down-right', label: '↘ Down-Right' },
  { value: 'custom', label: 'Custom' },
]

// Button variant options for styling
const BUTTON_VARIANT_OPTIONS: { value: ButtonVariant; label: string }[] = [
  { value: 'primary', label: 'Primary' },
  { value: 'secondary', label: 'Secondary' },
  { value: 'tertiary', label: 'Tertiary' },
  { value: 'shine', label: 'Shine' },
  { value: 'tab', label: 'Tab' },
  { value: 'link-gray', label: 'Link Gray' },
  { value: 'link-color', label: 'Link Color' },
]

// =============================================================================
// FULL CONFIG PRESETS
// =============================================================================

/** Default preset - optimized tween animation */
const PRESET_DEFAULT: Omit<PlaygroundConfig, 'configPreset' | 'demoType'> = {
  animationType: 'tween',
  springStiffness: 500,
  springDamping: 30,
  springPreset: 'smooth',
  tweenDuration: 150, // 0.15s
  tweenEase: 'easeOut',
  promotionDuration: 100, // 0.1s
  promotionScale: 1,
  childStagger: 45, // 0.045s
  entryDirection: 'custom',
  entryOffsetX: 12,
  entryOffsetY: 10,
  childEntryDelay: 0,
  childEntryScale: 0.95,
  exitDuration: 150, // 0.15s
  exitScale: 0.95,
  skipLeafAnimation: false,
  selectedLeafVariant: 'primary',
  peekOffset: 8,
  anchoredOpacity: 1,
  gap: 'md',
  showNumbers: false,
  showDebug: false,
  // Level All Button - off by default
  showLevelAll: false,
  levelAllLabel: 'All',
  levelAllActiveVariant: 'tab',
  levelAllInactiveVariant: 'tertiary',
}

/** Spring preset - physics-based spring animation */
const PRESET_SPRING: Omit<PlaygroundConfig, 'configPreset' | 'demoType'> = {
  animationType: 'spring',
  springStiffness: 500,
  springDamping: 30,
  springPreset: 'smooth',
  tweenDuration: 300,
  tweenEase: 'easeOut',
  promotionDuration: 400,
  promotionScale: 1,
  childStagger: 25, // 0.025s
  entryDirection: 'up',
  entryOffsetX: 0,
  entryOffsetY: 12,
  childEntryDelay: 50, // 0.05s
  childEntryScale: 0.95,
  exitDuration: 150,
  exitScale: 0.95,
  skipLeafAnimation: false,
  selectedLeafVariant: 'primary',
  peekOffset: 8,
  anchoredOpacity: 0.6,
  gap: 'md',
  showNumbers: false,
  showDebug: false,
  // Level All Button - off by default
  showLevelAll: false,
  levelAllLabel: 'All',
  levelAllActiveVariant: 'tab',
  levelAllInactiveVariant: 'tertiary',
}

const CONFIG_PRESETS: Record<ConfigPreset, Omit<PlaygroundConfig, 'configPreset' | 'demoType'> | null> = {
  default: PRESET_DEFAULT,
  spring: PRESET_SPRING,
  custom: null, // Custom means user has modified settings
}

const DEFAULT_PLAYGROUND_CONFIG: PlaygroundConfig = {
  configPreset: 'default',
  ...PRESET_DEFAULT,
  demoType: 'navigation',
}

// =============================================================================
// PANEL CONFIG
// =============================================================================

function createPanelConfig(config: PlaygroundConfig): UnifiedControlPanelConfig {
  // Build spring or tween groups based on animation type
  const animationGroups = config.animationType === 'spring' 
    ? [
        {
          title: 'Spring Preset',
          controls: [
            {
              id: 'springPreset',
              type: 'select' as const,
              label: 'Preset',
              value: config.springPreset,
              options: [
                { value: 'smooth', label: 'Smooth' },
                { value: 'snappy', label: 'Snappy' },
                { value: 'soft', label: 'Soft' },
                { value: 'bouncy', label: 'Bouncy' },
                { value: 'custom', label: 'Custom' },
              ],
            },
          ],
        },
        {
          title: 'Spring Settings',
          controls: [
            {
              id: 'springStiffness',
              type: 'slider' as const,
              label: 'Stiffness',
              value: config.springStiffness,
              min: 100,
              max: 1000,
              step: 25,
              formatLabel: (v: number) => `${v}`,
            },
            {
              id: 'springDamping',
              type: 'slider' as const,
              label: 'Damping',
              value: config.springDamping,
              min: 5,
              max: 60,
              step: 1,
              formatLabel: (v: number) => `${v}`,
            },
          ],
        },
      ]
    : [
        {
          title: 'Easing',
          controls: [
            {
              id: 'tweenEase',
              type: 'select' as const,
              label: 'Easing',
              value: config.tweenEase,
              options: EASING_OPTIONS,
            },
          ],
        },
        {
          title: 'Timing',
          controls: [
            {
              id: 'tweenDuration',
              type: 'slider' as const,
              label: 'Duration',
              value: config.tweenDuration,
              min: 100,
              max: 800,
              step: 25,
              formatLabel: (v: number) => `${v}ms`,
            },
          ],
        },
      ]
  
  return {
    sections: [
      {
        id: 'animation',
        title: 'Animation',
        tabLabel: config.animationType === 'spring' ? 'Spring' : 'Easing',
        groups: [
          {
            title: 'Config Preset',
            controls: [
              {
                id: 'configPreset',
                type: 'select',
                label: 'Preset',
                value: config.configPreset,
                options: [
                  { value: 'default', label: 'Default (Easing)' },
                  { value: 'spring', label: 'Spring (Physics)' },
                  { value: 'custom', label: 'Custom' },
                ],
              },
            ],
          },
          {
            title: 'Animation Type',
            controls: [
              {
                id: 'animationType',
                type: 'select',
                label: 'Type',
                value: config.animationType,
                options: [
                  { value: 'spring', label: 'Spring (Physics)' },
                  { value: 'tween', label: 'Easing (Duration)' },
                ],
              },
            ],
          },
          ...animationGroups,
          {
            title: 'Promotion Effect',
            controls: [
              {
                id: 'promotionScale',
                type: 'slider',
                label: 'Scale',
                value: config.promotionScale,
                min: 1.0,
                max: 1.2,
                step: 0.01,
                formatLabel: (v: number) => v === 1 ? 'Off' : `${v.toFixed(2)}`,
              },
              {
                id: 'promotionDuration',
                type: 'slider',
                label: 'Duration',
                value: config.promotionDuration,
                min: 100,
                max: 800,
                step: 25,
                formatLabel: (v: number) => `${v}ms`,
              },
            ],
          },
        ],
      },
      {
        id: 'children',
        title: 'Children',
        tabLabel: 'Entry',
        groups: [
          {
            title: 'Direction Presets',
            controls: [
              {
                id: 'entryDirection',
                type: 'select',
                label: 'Preset',
                value: config.entryDirection,
                options: ENTRY_DIRECTION_OPTIONS,
              },
            ],
          },
          {
            title: 'Position Offset',
            controls: [
              {
                id: 'entryOffsetX',
                type: 'slider',
                label: 'X Offset',
                value: config.entryOffsetX,
                min: -40,
                max: 40,
                step: 2,
                formatLabel: (v: number) => v === 0 ? '0' : `${v}px`,
              },
              {
                id: 'entryOffsetY',
                type: 'slider',
                label: 'Y Offset',
                value: config.entryOffsetY,
                min: -40,
                max: 40,
                step: 2,
                formatLabel: (v: number) => v === 0 ? '0' : `${v}px`,
              },
            ],
          },
          {
            title: 'Entry Timing',
            controls: [
              {
                id: 'childEntryDelay',
                type: 'slider',
                label: 'Delay',
                value: config.childEntryDelay,
                min: 0,
                max: 300,
                step: 10,
                formatLabel: (v: number) => `${v}ms`,
              },
              {
                id: 'childStagger',
                type: 'slider',
                label: 'Stagger',
                value: config.childStagger,
                min: 0,
                max: 150,
                step: 5,
                formatLabel: (v: number) => `${v}ms`,
              },
              {
                id: 'childEntryScale',
                type: 'slider',
                label: 'Entry Scale',
                value: config.childEntryScale,
                min: 0.8,
                max: 1.0,
                step: 0.01,
                formatLabel: (v: number) => `${v.toFixed(2)}`,
              },
            ],
          },
          {
            title: 'Exit Animation',
            controls: [
              {
                id: 'exitDuration',
                type: 'slider',
                label: 'Duration',
                value: config.exitDuration,
                min: 50,
                max: 400,
                step: 25,
                formatLabel: (v: number) => `${v}ms`,
              },
              {
                id: 'exitScale',
                type: 'slider',
                label: 'Exit Scale',
                value: config.exitScale,
                min: 0.8,
                max: 1.0,
                step: 0.01,
                formatLabel: (v: number) => `${v.toFixed(2)}`,
              },
            ],
          },
          {
            title: 'Leaf Nodes',
            controls: [
              {
                id: 'skipLeafAnimation',
                type: 'toggle',
                label: 'Skip Animation',
                value: config.skipLeafAnimation,
              },
              {
                id: 'selectedLeafVariant',
                type: 'select',
                label: 'Selected Variant',
                value: config.selectedLeafVariant,
                options: BUTTON_VARIANT_OPTIONS,
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
                step: 0.05,
                formatLabel: (v: number) => `${(v * 100).toFixed(0)}%`,
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
              {
                id: 'demoType',
                type: 'select',
                label: 'Demo Type',
                value: config.demoType,
                options: [
                  { value: 'navigation', label: 'Navigation' },
                  { value: 'filters', label: 'Filters' },
                ],
              },
            ],
          },
          {
            title: 'Level All Button',
            controls: [
              {
                id: 'showLevelAll',
                type: 'toggle',
                label: 'Show Level All',
                value: config.showLevelAll,
              },
              {
                id: 'levelAllLabel',
                type: 'text',
                label: 'Label',
                value: config.levelAllLabel,
              },
              {
                id: 'levelAllActiveVariant',
                type: 'select',
                label: 'Active Variant',
                value: config.levelAllActiveVariant,
                options: BUTTON_VARIANT_OPTIONS,
              },
              {
                id: 'levelAllInactiveVariant',
                type: 'select',
                label: 'Inactive Variant',
                value: config.levelAllInactiveVariant,
                options: BUTTON_VARIANT_OPTIONS,
              },
            ],
          },
          {
            title: 'Debug',
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

export default function StackingNavPlayground() {
  const [config, setConfig] = useState<PlaygroundConfig>(DEFAULT_PLAYGROUND_CONFIG)
  const [resetKey, setResetKey] = useState(0)
  const [currentPath, setCurrentPath] = useState<ActivePath>([])

  // Transform config for component
  const animationConfig: Partial<AnimationConfig> = useMemo(
    () => ({
      type: config.animationType,
      stiffness: config.springStiffness,
      damping: config.springDamping,
      duration: config.tweenDuration / 1000,
      ease: config.tweenEase,
      promotionDuration: config.promotionDuration / 1000,
      promotionScale: config.promotionScale,
      stagger: config.childStagger / 1000,
      entryOffsetX: config.entryOffsetX,
      entryOffsetY: config.entryOffsetY,
      childEntryDelay: config.childEntryDelay / 1000,
      entryScale: config.childEntryScale,
      exitDuration: config.exitDuration / 1000,
      exitScale: config.exitScale,
      skipLeafAnimation: config.skipLeafAnimation,
    }),
    [config]
  )

  const styleConfig: Partial<StyleConfig> = useMemo(
    () => ({
      peekOffset: config.peekOffset,
      anchoredOpacity: config.anchoredOpacity,
      gap: config.gap,
      selectedLeafVariant: config.selectedLeafVariant,
      // Level All Button
      showLevelAll: config.showLevelAll,
      levelAllLabel: config.levelAllLabel,
      levelAllActiveVariant: config.levelAllActiveVariant,
      levelAllInactiveVariant: config.levelAllInactiveVariant,
    }),
    [config]
  )

  // Get demo items based on type
  const demoItems = config.demoType === 'filters' ? FILTER_ITEMS : DEMO_ITEMS

  // Panel config
  const panelConfig = useMemo(() => createPanelConfig(config), [config])

  // Handlers
  const handleControlChange = useCallback((event: ControlChangeEvent) => {
    const { controlId, value } = event
    
    // Handle config preset selection - apply full preset
    if (controlId === 'configPreset' && value !== 'custom') {
      const preset = CONFIG_PRESETS[value as ConfigPreset]
      if (preset) {
        setConfig((prev) => ({
          ...prev,
          ...preset,
          configPreset: value as ConfigPreset,
          demoType: prev.demoType, // Keep demo type
        }))
        return
      }
    }
    
    // Handle spring preset selection (within spring animation type)
    if (controlId === 'springPreset' && value !== 'custom') {
      const preset = SPRING_PRESETS[value as keyof typeof SPRING_PRESETS]
      if (preset) {
        setConfig((prev) => ({
          ...prev,
          springPreset: value as PlaygroundConfig['springPreset'],
          springStiffness: preset.stiffness,
          springDamping: preset.damping,
          configPreset: 'custom', // Mark as custom when tuning
        }))
        return
      }
    }
    
    // Handle manual spring adjustment - switch to custom presets
    if (controlId === 'springStiffness' || controlId === 'springDamping') {
      setConfig((prev) => ({
        ...prev,
        [controlId]: value,
        springPreset: 'custom',
        configPreset: 'custom',
      }))
      return
    }
    
    // Handle entry direction preset selection
    if (controlId === 'entryDirection' && value !== 'custom') {
      const directionPreset = ENTRY_DIRECTION_PRESETS[value as Exclude<EntryDirection, 'custom'>]
      if (directionPreset) {
        setConfig((prev) => ({
          ...prev,
          entryDirection: value as EntryDirection,
          entryOffsetX: directionPreset.x,
          entryOffsetY: directionPreset.y,
          configPreset: 'custom',
        }))
        return
      }
    }
    
    // Handle manual entry offset adjustment - detect matching preset or switch to custom
    if (controlId === 'entryOffsetX' || controlId === 'entryOffsetY') {
      setConfig((prev) => {
        const newX = controlId === 'entryOffsetX' ? value as number : prev.entryOffsetX
        const newY = controlId === 'entryOffsetY' ? value as number : prev.entryOffsetY
        
        // Check if values match any preset
        let matchedPreset: EntryDirection = 'custom'
        for (const [presetName, presetValues] of Object.entries(ENTRY_DIRECTION_PRESETS)) {
          if (presetValues.x === newX && presetValues.y === newY) {
            matchedPreset = presetName as EntryDirection
            break
          }
        }
        
        return {
          ...prev,
          [controlId]: value,
          entryDirection: matchedPreset,
          configPreset: 'custom',
        }
      })
      return
    }
    
    // Any other change marks config as custom
    // Level-all options and display options don't affect the preset status
    const nonPresetFields = [
      'demoType', 
      'showNumbers', 
      'showDebug',
      'showLevelAll',
      'levelAllLabel',
      'levelAllActiveVariant',
      'levelAllInactiveVariant',
    ]
    if (!nonPresetFields.includes(controlId)) {
      setConfig((prev) => ({ ...prev, [controlId]: value, configPreset: 'custom' }))
    } else {
      setConfig((prev) => ({ ...prev, [controlId]: value }))
    }
  }, [])

  const handleReset = useCallback(() => {
    setConfig(DEFAULT_PLAYGROUND_CONFIG)
    setResetKey((k) => k + 1)
    setCurrentPath([])
  }, [])

  const handleComponentReset = useCallback(() => {
    setResetKey((k) => k + 1)
    setCurrentPath([])
  }, [])

  const handleSelectionChange = useCallback((path: ActivePath) => {
    setCurrentPath(path)
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
      {/* Centered Demo - fixed width container prevents shift */}
      <div className="pr-[352px] min-h-screen flex items-center justify-center">
        <div className="w-[800px] flex justify-start pl-24">
          <StackingNav
            key={resetKey}
            items={demoItems}
            animationConfig={animationConfig}
            styleConfig={styleConfig}
            showNumbers={config.showNumbers}
            showDebug={config.showDebug}
            onReset={handleComponentReset}
            onSelectionChange={handleSelectionChange}
          />
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

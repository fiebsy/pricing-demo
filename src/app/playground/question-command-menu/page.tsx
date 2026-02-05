/**
 * Question Command Menu Playground
 *
 * Exploration playground for experimenting with top stack and bottom stack variations.
 * Focus areas:
 * - Different content type combinations in top/bottom slots
 * - Slot appearance and behavior configurations
 * - Potential universal slot component patterns
 *
 * @status incubating
 */

'use client'

import * as React from 'react'
import { useState, useCallback, useMemo } from 'react'
import {
  UnifiedControlPanel,
  type ControlChangeEvent,
  type PanelConfig,
  type Section,
  type Preset,
} from '@/components/ui/patterns/control-panel'

import {
  Preview,
  PRESETS,
  DEFAULT_STATE,
  type QuestionCommandMenuV4Config,
  type PlaygroundState,
  type ContentTypeId,
  type SlotPosition,
  type ContentInstance,
  type ChatMessage,
  type QuestionGroup,
  type SuggestionItem,
} from '@/components/ui/features/question-command-menu'

// =============================================================================
// TYPES
// =============================================================================

interface StackVariant {
  id: string
  name: string
  description: string
  topContent: ContentTypeId | 'none'
  bottomContent: ContentTypeId | 'none'
}

// =============================================================================
// STACK VARIANTS - The different top/bottom combinations to explore
// =============================================================================

const STACK_VARIANTS: StackVariant[] = [
  {
    id: 'questions-buttons',
    name: 'Questions + Buttons',
    description: 'Questions in top, action buttons in bottom',
    topContent: 'questions',
    bottomContent: 'buttons',
  },
  {
    id: 'chat-buttons',
    name: 'Chat + Buttons',
    description: 'AI chat in top, action buttons in bottom',
    topContent: 'chat',
    bottomContent: 'buttons',
  },
  {
    id: 'chat-suggestions',
    name: 'Chat + Suggestions',
    description: 'AI chat in top, suggestions in bottom',
    topContent: 'chat',
    bottomContent: 'suggestions',
  },
  {
    id: 'suggestions-buttons',
    name: 'Suggestions + Buttons',
    description: 'Suggestions in top, action buttons in bottom',
    topContent: 'suggestions',
    bottomContent: 'buttons',
  },
  {
    id: 'questions-suggestions',
    name: 'Questions + Suggestions',
    description: 'Questions in top, suggestions in bottom',
    topContent: 'questions',
    bottomContent: 'suggestions',
  },
  {
    id: 'filters-questions',
    name: 'Filters + Questions',
    description: 'Filter tabs in top, questions in bottom',
    topContent: 'filters',
    bottomContent: 'questions',
  },
  {
    id: 'chat-only',
    name: 'Chat Only (Top)',
    description: 'AI chat in top slot, bottom disabled',
    topContent: 'chat',
    bottomContent: 'none',
  },
  {
    id: 'buttons-chat',
    name: 'Buttons + Chat (Inverted)',
    description: 'Buttons in top, AI chat in bottom',
    topContent: 'buttons',
    bottomContent: 'chat',
  },
]

// =============================================================================
// SAMPLE DATA
// =============================================================================

const SAMPLE_QUESTIONS: QuestionGroup[] = [
  {
    id: 'group-1',
    label: 'Sample Questions',
    items: [
      { id: 'q1', text: 'What is your refund policy?' },
      { id: 'q2', text: 'How do I track my order?' },
      { id: 'q3', text: 'What payment methods do you accept?' },
      { id: 'q4', text: 'Do you offer international shipping?' },
    ],
  },
]

const SAMPLE_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    role: 'user',
    content: 'What is the best approach for handling refunds?',
  },
  {
    id: 'msg-2',
    role: 'assistant',
    content: 'Based on our analysis, the recommended approach is to process refunds within 5-7 business days. This balances customer satisfaction with operational efficiency.',
    confidence: 0.92,
  },
]

const SAMPLE_SUGGESTIONS: SuggestionItem[] = [
  { id: 's1', text: 'What are your business hours?', confidence: 0.95 },
  { id: 's2', text: 'Do you offer free shipping?', confidence: 0.88 },
  { id: 's3', text: 'How can I contact support?', confidence: 0.82 },
  { id: 's4', text: 'What is your return policy?', confidence: 0.78 },
]

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

function buildContentArray(
  topContent: ContentTypeId | 'none',
  bottomContent: ContentTypeId | 'none'
): ContentInstance[] {
  const content: ContentInstance[] = []

  if (topContent !== 'none') {
    content.push({
      id: `top-${topContent}`,
      type: topContent,
      slot: 'top',
    })
  }

  if (bottomContent !== 'none') {
    content.push({
      id: `bottom-${bottomContent}`,
      type: bottomContent,
      slot: 'bottom',
    })
  }

  return content
}

function applyStackVariant(
  config: QuestionCommandMenuV4Config,
  variant: StackVariant
): QuestionCommandMenuV4Config {
  return {
    ...config,
    content: buildContentArray(variant.topContent, variant.bottomContent),
    slots: {
      ...config.slots,
      top: {
        ...config.slots.top,
        enabled: variant.topContent !== 'none',
      },
      bottom: {
        ...config.slots.bottom,
        enabled: variant.bottomContent !== 'none',
      },
    },
  }
}

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

// =============================================================================
// PANEL CONFIGURATION
// =============================================================================

function buildPanelConfig(
  state: PlaygroundState,
  activeStackVariant: string | null
): PanelConfig {
  const config = state.config

  return {
    sections: [
      // Stack Variants Section
      {
        id: 'stack',
        label: 'Stack',
        title: 'Stack Variants',
        sectionType: 'layout',
        groups: [
          {
            title: 'Content Assignment',
            description: 'Which content type renders in each slot',
            controls: [
              {
                id: 'stackVariant',
                type: 'select',
                label: 'Stack Variant',
                value: activeStackVariant ?? 'custom',
                options: [
                  ...STACK_VARIANTS.map((v) => ({
                    label: v.name,
                    value: v.id,
                    description: v.description,
                  })),
                  { label: 'Custom', value: 'custom', description: 'Manual configuration' },
                ],
              },
            ],
          },
          {
            title: 'Manual Content Assignment',
            description: 'Override stack variant with manual selection',
            controls: [
              {
                id: 'topContent',
                type: 'select',
                label: 'Top Slot Content',
                value: config.content.find((c) => c.slot === 'top')?.type ?? 'none',
                options: [
                  { label: 'None (Disabled)', value: 'none' },
                  { label: 'Questions', value: 'questions' },
                  { label: 'Chat', value: 'chat' },
                  { label: 'Suggestions', value: 'suggestions' },
                  { label: 'Buttons', value: 'buttons' },
                  { label: 'Filters', value: 'filters' },
                ],
              },
              {
                id: 'bottomContent',
                type: 'select',
                label: 'Bottom Slot Content',
                value: config.content.find((c) => c.slot === 'bottom')?.type ?? 'none',
                options: [
                  { label: 'None (Disabled)', value: 'none' },
                  { label: 'Questions', value: 'questions' },
                  { label: 'Chat', value: 'chat' },
                  { label: 'Suggestions', value: 'suggestions' },
                  { label: 'Buttons', value: 'buttons' },
                  { label: 'Filters', value: 'filters' },
                ],
              },
            ],
          },
        ],
      },

      // Top Slot Section
      {
        id: 'top-slot',
        label: 'Top',
        title: 'Top Slot Configuration',
        sectionType: 'layout',
        groups: [
          {
            title: 'Visibility',
            controls: [
              {
                id: 'slots.top.enabled',
                type: 'toggle',
                label: 'Enabled',
                value: config.slots.top.enabled,
              },
            ],
          },
          {
            title: 'Height Mode',
            controls: [
              {
                id: 'slots.top.heightMode',
                type: 'select',
                label: 'Mode',
                value: config.slots.top.heightMode,
                options: [
                  { label: 'Fixed', value: 'fixed', description: 'Fixed height' },
                  { label: 'Dynamic', value: 'dynamic', description: 'Content-based with min/max' },
                  { label: 'Auto', value: 'auto', description: 'Hug content' },
                ],
              },
              {
                id: 'slots.top.fixedHeight',
                type: 'slider',
                label: 'Fixed Height',
                value: config.slots.top.fixedHeight ?? 48,
                min: 32,
                max: 200,
                step: 4,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'slots.top.minHeight',
                type: 'slider',
                label: 'Min Height',
                value: config.slots.top.minHeight ?? 48,
                min: 32,
                max: 200,
                step: 4,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'slots.top.maxHeight',
                type: 'slider',
                label: 'Max Height',
                value: config.slots.top.maxHeight ?? 300,
                min: 100,
                max: 600,
                step: 20,
                formatLabel: (v: number) => `${v}px`,
              },
            ],
          },
          {
            title: 'Appearance',
            controls: [
              {
                id: 'slots.top.appearance.background',
                type: 'select',
                label: 'Background',
                value: config.slots.top.appearance.background,
                options: [
                  { label: 'None', value: 'none' },
                  { label: 'Primary', value: 'primary' },
                  { label: 'Secondary', value: 'secondary' },
                  { label: 'Tertiary', value: 'tertiary' },
                  { label: 'Quaternary', value: 'quaternary' },
                ],
              },
              {
                id: 'slots.top.appearance.borderRadius',
                type: 'slider',
                label: 'Border Radius',
                value: config.slots.top.appearance.borderRadius,
                min: 0,
                max: 32,
                step: 2,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'slots.top.appearance.inset',
                type: 'slider',
                label: 'Inset',
                value: config.slots.top.appearance.inset,
                min: 0,
                max: 16,
                step: 2,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'slots.top.appearance.borderWidth',
                type: 'slider',
                label: 'Border Width',
                value: config.slots.top.appearance.borderWidth,
                min: 0,
                max: 4,
                step: 1,
                formatLabel: (v: number) => `${v}px`,
              },
            ],
          },
          {
            title: 'Animation',
            controls: [
              {
                id: 'slots.top.animation.expandOrigin',
                type: 'select',
                label: 'Expand Origin',
                value: config.slots.top.animation.expandOrigin,
                options: [
                  { label: 'Top', value: 'top' },
                  { label: 'Center', value: 'center' },
                  { label: 'Bottom', value: 'bottom' },
                ],
              },
              {
                id: 'slots.top.animation.durationOffset',
                type: 'slider',
                label: 'Duration Offset',
                value: config.slots.top.animation.durationOffset,
                min: -200,
                max: 200,
                step: 25,
                formatLabel: (v: number) => `${v}ms`,
              },
            ],
          },
        ],
      },

      // Bottom Slot Section
      {
        id: 'bottom-slot',
        label: 'Bottom',
        title: 'Bottom Slot Configuration',
        sectionType: 'layout',
        groups: [
          {
            title: 'Visibility',
            controls: [
              {
                id: 'slots.bottom.enabled',
                type: 'toggle',
                label: 'Enabled',
                value: config.slots.bottom.enabled,
              },
            ],
          },
          {
            title: 'Height Mode',
            controls: [
              {
                id: 'slots.bottom.heightMode',
                type: 'select',
                label: 'Mode',
                value: config.slots.bottom.heightMode,
                options: [
                  { label: 'Fixed', value: 'fixed', description: 'Fixed height' },
                  { label: 'Dynamic', value: 'dynamic', description: 'Content-based with min/max' },
                  { label: 'Auto', value: 'auto', description: 'Hug content' },
                ],
              },
              {
                id: 'slots.bottom.fixedHeight',
                type: 'slider',
                label: 'Fixed Height',
                value: config.slots.bottom.fixedHeight ?? 48,
                min: 32,
                max: 200,
                step: 4,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'slots.bottom.minHeight',
                type: 'slider',
                label: 'Min Height',
                value: config.slots.bottom.minHeight ?? 32,
                min: 0,
                max: 200,
                step: 4,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'slots.bottom.maxHeight',
                type: 'slider',
                label: 'Max Height',
                value: config.slots.bottom.maxHeight ?? 100,
                min: 50,
                max: 400,
                step: 10,
                formatLabel: (v: number) => `${v}px`,
              },
            ],
          },
          {
            title: 'Appearance',
            controls: [
              {
                id: 'slots.bottom.appearance.background',
                type: 'select',
                label: 'Background',
                value: config.slots.bottom.appearance.background,
                options: [
                  { label: 'None', value: 'none' },
                  { label: 'Primary', value: 'primary' },
                  { label: 'Secondary', value: 'secondary' },
                  { label: 'Tertiary', value: 'tertiary' },
                  { label: 'Quaternary', value: 'quaternary' },
                ],
              },
              {
                id: 'slots.bottom.appearance.borderRadius',
                type: 'slider',
                label: 'Border Radius',
                value: config.slots.bottom.appearance.borderRadius,
                min: 0,
                max: 32,
                step: 2,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'slots.bottom.appearance.inset',
                type: 'slider',
                label: 'Inset',
                value: config.slots.bottom.appearance.inset,
                min: 0,
                max: 16,
                step: 2,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'slots.bottom.appearance.borderWidth',
                type: 'slider',
                label: 'Border Width',
                value: config.slots.bottom.appearance.borderWidth,
                min: 0,
                max: 4,
                step: 1,
                formatLabel: (v: number) => `${v}px`,
              },
            ],
          },
          {
            title: 'Animation',
            controls: [
              {
                id: 'slots.bottom.animation.expandOrigin',
                type: 'select',
                label: 'Expand Origin',
                value: config.slots.bottom.animation.expandOrigin,
                options: [
                  { label: 'Top', value: 'top' },
                  { label: 'Center', value: 'center' },
                  { label: 'Bottom', value: 'bottom' },
                ],
              },
              {
                id: 'slots.bottom.animation.durationOffset',
                type: 'slider',
                label: 'Duration Offset',
                value: config.slots.bottom.animation.durationOffset,
                min: -200,
                max: 200,
                step: 25,
                formatLabel: (v: number) => `${v}ms`,
              },
            ],
          },
        ],
      },

      // Layout Section
      {
        id: 'layout',
        label: 'Layout',
        title: 'Layout Configuration',
        sectionType: 'spacing',
        groups: [
          {
            title: 'Dimensions',
            controls: [
              {
                id: 'layout.triggerWidth',
                type: 'slider',
                label: 'Trigger Width',
                value: config.layout.triggerWidth,
                min: 200,
                max: 500,
                step: 20,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'layout.triggerHeight',
                type: 'slider',
                label: 'Trigger Height',
                value: config.layout.triggerHeight,
                min: 36,
                max: 64,
                step: 4,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'layout.panelWidth',
                type: 'slider',
                label: 'Panel Width',
                value: config.layout.panelWidth,
                min: 300,
                max: 600,
                step: 20,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'layout.fillWidth',
                type: 'toggle',
                label: 'Fill Width (Panel = Trigger)',
                value: config.layout.fillWidth,
              },
            ],
          },
          {
            title: 'Gaps',
            controls: [
              {
                id: 'layout.topGap',
                type: 'slider',
                label: 'Top Gap',
                value: config.layout.topGap,
                min: 0,
                max: 32,
                step: 2,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'layout.bottomGap',
                type: 'slider',
                label: 'Bottom Gap',
                value: config.layout.bottomGap,
                min: 0,
                max: 32,
                step: 2,
                formatLabel: (v: number) => `${v}px`,
              },
            ],
          },
          {
            title: 'Shape',
            controls: [
              {
                id: 'layout.borderRadius',
                type: 'slider',
                label: 'Border Radius',
                value: config.layout.borderRadius,
                min: 8,
                max: 32,
                step: 2,
                formatLabel: (v: number) => `${v}px`,
              },
            ],
          },
        ],
      },

      // Appearance Section
      {
        id: 'appearance',
        label: 'Style',
        title: 'Appearance',
        sectionType: 'colors',
        groups: [
          {
            title: 'Background',
            controls: [
              {
                id: 'appearance.background',
                type: 'select',
                label: 'Background',
                value: config.appearance.background,
                options: [
                  { label: 'Primary', value: 'primary' },
                  { label: 'Secondary', value: 'secondary' },
                  { label: 'Tertiary', value: 'tertiary' },
                  { label: 'Quaternary', value: 'quaternary' },
                ],
              },
              {
                id: 'appearance.gradient',
                type: 'select',
                label: 'Gradient',
                value: config.appearance.gradient,
                options: [
                  { label: 'None', value: 'none' },
                  { label: 'Subtle SM', value: 'subtle-depth-sm' },
                  { label: 'Subtle MD', value: 'subtle-depth-md' },
                  { label: 'Subtle LG', value: 'subtle-depth-lg' },
                  { label: 'Subtle XL', value: 'subtle-depth-xl' },
                ],
              },
            ],
          },
          {
            title: 'Effects',
            controls: [
              {
                id: 'appearance.shadow',
                type: 'select',
                label: 'Shadow',
                value: config.appearance.shadow,
                options: [
                  { label: 'None', value: 'none' },
                  { label: 'SM', value: 'sm' },
                  { label: 'MD', value: 'md' },
                  { label: 'LG', value: 'lg' },
                  { label: 'XL', value: 'xl' },
                  { label: '2XL', value: '2xl' },
                ],
              },
              {
                id: 'appearance.shine',
                type: 'select',
                label: 'Shine',
                value: config.appearance.shine,
                options: [
                  { label: 'None', value: 'none' },
                  { label: 'Shine 1', value: 'shine-1' },
                  { label: 'Shine 1 Subtle', value: 'shine-1-subtle' },
                  { label: 'Shine 2', value: 'shine-2' },
                  { label: 'Shine 2 Subtle', value: 'shine-2-subtle' },
                  { label: 'Shine 3', value: 'shine-3' },
                  { label: 'Shine Brand', value: 'shine-brand' },
                ],
              },
              {
                id: 'appearance.squircle',
                type: 'toggle',
                label: 'Squircle Corners',
                value: config.appearance.squircle,
              },
            ],
          },
        ],
      },
    ],
    presetConfig: {
      presets: PRESETS,
      activePresetId: null,
      showCopyButton: true,
    },
    showReset: true,
  }
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function QuestionCommandMenuPlayground() {
  const [state, setState] = useState<PlaygroundState>(DEFAULT_STATE)
  const [activePresetId, setActivePresetId] = useState<string | null>('default')
  const [activeStackVariant, setActiveStackVariant] = useState<string | null>('questions-buttons')
  const [isLocked, setIsLocked] = useState(true)

  // Handle control changes
  const handleChange = useCallback(
    (event: ControlChangeEvent) => {
      const { controlId, value } = event

      // Handle stack variant changes
      if (controlId === 'stackVariant') {
        const variant = STACK_VARIANTS.find((v) => v.id === value)
        if (variant) {
          setActiveStackVariant(variant.id)
          setState((prev) => ({
            config: applyStackVariant(prev.config, variant),
          }))
        } else {
          setActiveStackVariant(null)
        }
        setActivePresetId(null)
        return
      }

      // Handle manual content assignment
      if (controlId === 'topContent' || controlId === 'bottomContent') {
        setActiveStackVariant('custom')
        setState((prev) => {
          const topContent =
            controlId === 'topContent'
              ? (value as ContentTypeId | 'none')
              : (prev.config.content.find((c) => c.slot === 'top')?.type ?? 'none')
          const bottomContent =
            controlId === 'bottomContent'
              ? (value as ContentTypeId | 'none')
              : (prev.config.content.find((c) => c.slot === 'bottom')?.type ?? 'none')

          return {
            config: {
              ...prev.config,
              content: buildContentArray(topContent, bottomContent),
              slots: {
                ...prev.config.slots,
                top: {
                  ...prev.config.slots.top,
                  enabled: topContent !== 'none',
                },
                bottom: {
                  ...prev.config.slots.bottom,
                  enabled: bottomContent !== 'none',
                },
              },
            },
          }
        })
        setActivePresetId(null)
        return
      }

      // Handle other control changes
      setState((prev) => ({
        config: setNestedValue(prev.config, controlId, value),
      }))
      setActivePresetId(null)
      setActiveStackVariant(null)
    },
    []
  )

  // Handle preset changes
  const handlePresetChange = useCallback((presetId: string) => {
    const preset = PRESETS.find((p) => p.id === presetId)
    if (preset) {
      setState(preset.data)
      setActivePresetId(presetId)
      // Detect which stack variant the preset uses
      const topContent = preset.data.config.content.find((c) => c.slot === 'top')?.type ?? 'none'
      const bottomContent = preset.data.config.content.find((c) => c.slot === 'bottom')?.type ?? 'none'
      const matchingVariant = STACK_VARIANTS.find(
        (v) => v.topContent === topContent && v.bottomContent === bottomContent
      )
      setActiveStackVariant(matchingVariant?.id ?? 'custom')
    }
  }, [])

  // Handle reset
  const handleReset = useCallback(() => {
    setState(DEFAULT_STATE)
    setActivePresetId('default')
    setActiveStackVariant('questions-buttons')
  }, [])

  // Build panel config
  const panelConfig = useMemo(
    () => ({
      ...buildPanelConfig(state, activeStackVariant),
      presetConfig: {
        presets: PRESETS,
        activePresetId,
        showCopyButton: true,
      },
    }),
    [state, activePresetId, activeStackVariant]
  )

  return (
    <div className="relative h-screen overflow-hidden bg-primary">
      {/* Control Panel */}
      <UnifiedControlPanel
        config={panelConfig}
        onChange={handleChange}
        onPresetChange={handlePresetChange}
        onReset={handleReset}
        getConfigForCopy={() => state}
      />

      {/* Preview Area */}
      <div className="flex h-full flex-col items-center justify-center px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-xl font-semibold text-primary">
            Question Command Menu
          </h1>
          <p className="text-sm text-tertiary mt-1">
            Stack Variant: <span className="text-secondary font-medium">
              {activeStackVariant
                ? STACK_VARIANTS.find((v) => v.id === activeStackVariant)?.name ?? 'Custom'
                : 'Custom'}
            </span>
          </p>
        </div>

        {/* Lock Toggle */}
        <div className="mb-6 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsLocked(!isLocked)}
            className={`
              px-3 py-1.5 rounded-lg text-xs font-medium transition-colors
              ${isLocked
                ? 'bg-brand-solid text-white'
                : 'bg-tertiary text-secondary hover:bg-quaternary'
              }
            `}
          >
            {isLocked ? 'Locked Open' : 'Click Outside to Close'}
          </button>
        </div>

        {/* Component Preview */}
        <Preview
          config={state.config}
          questionGroups={SAMPLE_QUESTIONS}
          chatMessages={SAMPLE_CHAT_MESSAGES}
          suggestions={SAMPLE_SUGGESTIONS}
          isLocked={isLocked}
          onLockedChange={setIsLocked}
        />

        {/* Current Stack Info */}
        <div className="mt-8 p-4 rounded-xl bg-secondary border border-primary max-w-md">
          <h3 className="text-sm font-medium text-primary mb-2">Current Configuration</h3>
          <div className="space-y-1 text-xs">
            <p className="text-tertiary">
              <span className="text-secondary">Top Slot:</span>{' '}
              {state.config.content.find((c) => c.slot === 'top')?.type ?? 'disabled'}
              {' '}({state.config.slots.top.heightMode})
            </p>
            <p className="text-tertiary">
              <span className="text-secondary">Bottom Slot:</span>{' '}
              {state.config.content.find((c) => c.slot === 'bottom')?.type ?? 'disabled'}
              {' '}({state.config.slots.bottom.heightMode})
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

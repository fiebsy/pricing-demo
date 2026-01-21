/**
 * ButtonAnimation Playground
 *
 * Interactive testing environment for the expandable navigation component.
 * Allows real-time configuration of animation, styling, and behavior.
 *
 * @module playground/button-animation
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
  ButtonAnimation,
  type ParentAnimationConfig,
  type ChildAnimationConfig,
  type StyleConfig,
} from '@/components/ui/prod/base/button-animation'

import type { PlaygroundConfig } from './types'
import { DEFAULT_PLAYGROUND_CONFIG, getPresetConfig } from './constants'
import {
  createParentPanel,
  createChildPanel,
  createStylePanel,
  createOptionsPanel,
} from './panels'

type UnifiedControlPanelConfig = UnifiedControlPanelProps['config']

// =============================================================================
// HELPERS
// =============================================================================

/**
 * Convert ms to seconds.
 */
function msToSec(ms: number): number {
  return ms / 1000
}

/**
 * Transform flat playground config to component props.
 */
function transformConfig(config: PlaygroundConfig): {
  parentConfig: Partial<ParentAnimationConfig>
  childConfig: Partial<ChildAnimationConfig>
  styleConfig: Partial<StyleConfig>
} {
  return {
    parentConfig: {
      duration: msToSec(config.parentDuration),
      ease: config.parentEase,
      stiffness: config.parentStiffness,
      damping: config.parentDamping,
      exitDuration: msToSec(config.parentExitDuration),
      when: config.parentWhen,
    },
    childConfig: {
      delay: msToSec(config.childDelay),
      stagger: msToSec(config.childStagger),
      duration: msToSec(config.childDuration),
      ease: config.childEase,
      stiffness: config.childStiffness,
      damping: config.childDamping,
      entryDirection: config.childEntryDirection,
      entryDistance: config.childEntryDistance,
      entryOrder: config.childEntryOrder,
      staggerDirection: config.childStaggerDirection,
      exitDuration: msToSec(config.childExitDuration),
    },
    styleConfig: {
      parentVariant: config.parentVariant,
      parentExpandedVariant: config.parentExpandedVariant,
      childVariant: config.childVariant,
      childSelectedVariant: config.childSelectedVariant,
      allButtonVariant: config.allButtonVariant,
      allButtonOffset: config.allButtonOffset,
      size: config.size,
      roundness: config.roundness,
      gap: config.gap,
      asLink: config.asLink,
    },
  }
}

// =============================================================================
// MAIN PAGE
// =============================================================================

export default function ButtonAnimationPlayground() {
  const [config, setConfig] = useState<PlaygroundConfig>(DEFAULT_PLAYGROUND_CONFIG)
  const [activePresetId, setActivePresetId] = useState<string | null>('default')
  const [resetKey, setResetKey] = useState(0)

  // Transform config for component props
  const { parentConfig, childConfig, styleConfig } = useMemo(
    () => transformConfig(config),
    [config]
  )

  // Panel configuration
  const panelConfig = useMemo<UnifiedControlPanelConfig>(
    () => ({
      sections: [
        createParentPanel(config),
        createChildPanel(config),
        createStylePanel(config),
        createOptionsPanel(config, activePresetId),
      ],
      defaultActiveTab: 'parent',
      position: {
        top: '16px',
        bottom: '16px',
        right: '16px',
        width: '320px',
      },
      showReset: true,
      resetLabel: 'Reset All',
    }),
    [config, activePresetId]
  )

  // Handle control changes
  const handleControlChange = useCallback((event: ControlChangeEvent) => {
    const { controlId, value } = event

    // Handle preset selection specially
    if (controlId === 'preset') {
      const presetId = value as string
      setActivePresetId(presetId)
      const presetConfig = getPresetConfig(presetId)
      setConfig(presetConfig as PlaygroundConfig)
      return
    }

    // Clear preset when manually changing values
    setActivePresetId(null)
    setConfig((prev) => ({ ...prev, [controlId]: value }))
  }, [])

  // Handle reset
  const handleReset = useCallback(() => {
    setConfig(DEFAULT_PLAYGROUND_CONFIG)
    setActivePresetId('default')
    setResetKey((k) => k + 1)
  }, [])

  // Handle component reset
  const handleComponentReset = useCallback(() => {
    setResetKey((k) => k + 1)
  }, [])

  // Get config for copy button
  const getConfigForCopy = useCallback(() => {
    return {
      parentConfig,
      childConfig,
      styleConfig,
      showNumbers: config.showNumbers,
      showInlineReset: config.showInlineReset,
    }
  }, [parentConfig, childConfig, styleConfig, config.showNumbers, config.showInlineReset])

  return (
    <div className="min-h-screen bg-primary">
      {/* Breadcrumbs */}
      <div className="nav-clearance px-6">
        <div className="flex items-center justify-between">
          <Breadcrumbs
            items={[
              { label: 'Playground', href: '/playground' },
              { label: 'Button Animation' },
            ]}
          />
          <div className="text-xs text-tertiary">
            {activePresetId ? `Preset: ${activePresetId}` : 'Custom config'}
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <div className="pr-[352px] pb-24 md:pb-0">
        <div className="flex flex-col min-h-[calc(100vh-120px)] p-8">
          {/* Description */}
          <div className="mb-8 max-w-2xl">
            <h1 className="text-2xl font-semibold text-primary mb-2">
              Button Animation
            </h1>
            <p className="text-tertiary">
              Expandable navigation with cascading animations. Click a parent chip
              to reveal child options with configurable stagger, spring physics,
              and entry direction.
            </p>
          </div>

          {/* Instructions */}
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-sm text-tertiary">
              Click <strong>Design</strong>, <strong>Develop</strong>,{' '}
              <strong>Deploy</strong>, or <strong>Monitor</strong> to expand.
              Click a child to select. Click the X to collapse.
            </span>
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

            <ButtonAnimation
              key={resetKey}
              parentConfig={parentConfig}
              childConfig={childConfig}
              styleConfig={styleConfig}
              showNumbers={config.showNumbers}
              showInlineReset={config.showInlineReset}
              onReset={handleComponentReset}
            />
          </div>

          {/* Current Config Display */}
          <div className="bg-tertiary rounded-xl p-4">
            <div className="text-xs font-mono text-tertiary">
              <div className="mb-2 text-secondary font-medium">
                Current Config (for copy):
              </div>
              <pre className="text-xs overflow-auto max-h-48">
                {JSON.stringify(getConfigForCopy(), null, 2)}
              </pre>
            </div>
          </div>

          {/* Animation Phase Indicator */}
          <div className="mt-6 text-xs text-quaternary">
            <p>
              <strong>Animation phases:</strong> idle → settling → entering-children
            </p>
            <p className="mt-1">
              <strong>S-tier optimizations:</strong> layout=&quot;position&quot;, GPU-only
              properties (opacity, x, y), high damping springs
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

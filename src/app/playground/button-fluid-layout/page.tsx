/**
 * Button Fluid Layout Playground
 *
 * Uses the production FluidButtonGroup component.
 *
 * Features:
 * - Two buttons fill a configurable container width
 * - Toggling visibility causes remaining button to expand fluidly
 * - Timing presets (default, snappy, smooth) or custom timing
 * - Optional exit blur effect
 */

'use client'

import { useCallback, useMemo, useState } from 'react'
import {
  UnifiedControlPanel,
  PlaygroundLayout,
  type ControlChangeEvent,
} from '@/components/ui/patterns/control-panel'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import { Button } from '@/components/ui/core/primitives/button'
import { FluidButtonGroup } from '@/components/ui/core/primitives/fluid-button-group'
import ViewIcon from '@hugeicons-pro/core-stroke-rounded/ViewIcon'
import ViewOffIcon from '@hugeicons-pro/core-stroke-rounded/ViewOffIcon'

import type { ButtonFluidLayoutConfig, FluidBlurConfig } from './config/types'
import { AnimatedRightButton } from './core/animated-right-button'
import {
  DEFAULT_BUTTON_FLUID_LAYOUT_CONFIG,
  BUTTON_FLUID_LAYOUT_PRESETS,
} from './config/presets'
import { buildButtonFluidLayoutPanelConfig } from './panels/panel-config'

// ============================================================================
// Utility: Deep set nested value
// ============================================================================

function setNestedValue<T>(obj: T, path: string, value: unknown): T {
  const keys = path.split('.')
  const result = structuredClone(obj) as Record<string, unknown>
  let current = result

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    if (typeof current[key] !== 'object' || current[key] === null) {
      current[key] = {}
    } else {
      current[key] = { ...(current[key] as Record<string, unknown>) }
    }
    current = current[key] as Record<string, unknown>
  }

  current[keys[keys.length - 1]] = value
  return result as T
}

// ============================================================================
// Toggle Controls
// ============================================================================

interface ToggleControlsProps {
  showBothButtons: boolean
  onShowBoth: () => void
  onShowSingle: () => void
}

function ToggleControls({
  showBothButtons,
  onShowBoth,
  onShowSingle,
}: ToggleControlsProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onShowBoth}
        className={`flex size-10 items-center justify-center rounded-lg transition-colors ${
          showBothButtons
            ? 'bg-tertiary text-primary'
            : 'bg-secondary text-secondary hover:bg-tertiary hover:text-primary'
        }`}
        aria-label="Show both buttons"
        aria-pressed={showBothButtons}
      >
        <HugeIcon icon={ViewIcon} size={20} strokeWidth={1.5} />
      </button>
      <span className="text-xs text-tertiary">Toggle</span>
      <button
        type="button"
        onClick={onShowSingle}
        className={`flex size-10 items-center justify-center rounded-lg transition-colors ${
          !showBothButtons
            ? 'bg-tertiary text-primary'
            : 'bg-secondary text-secondary hover:bg-tertiary hover:text-primary'
        }`}
        aria-label="Show right button only"
        aria-pressed={!showBothButtons}
      >
        <HugeIcon icon={ViewOffIcon} size={20} strokeWidth={1.5} />
      </button>
    </div>
  )
}

// ============================================================================
// State Selector
// ============================================================================

interface StateSelectorProps {
  activeState: 1 | 2 | 3 | 4
  onStateChange: (state: 1 | 2 | 3 | 4) => void
}

function StateSelector({ activeState, onStateChange }: StateSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      {([1, 2, 3, 4] as const).map((state) => (
        <button
          key={state}
          type="button"
          onClick={() => onStateChange(state)}
          className={`flex size-10 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
            activeState === state
              ? 'bg-tertiary text-primary'
              : 'bg-secondary text-secondary hover:bg-tertiary hover:text-primary'
          }`}
          aria-pressed={activeState === state}
        >
          {state}
        </button>
      ))}
    </div>
  )
}

// ============================================================================
// Demo Content
// ============================================================================

interface DemoContentProps {
  config: ButtonFluidLayoutConfig
  showBothButtons: boolean
  onShowBoth: () => void
  onShowSingle: () => void
  onStateChange: (state: 1 | 2 | 3 | 4) => void
}

function DemoContent({
  config,
  showBothButtons,
  onShowBoth,
  onShowSingle,
  onStateChange,
}: DemoContentProps) {
  const { timing, blur, layout, demo, buttonStates, stateTransition } = config

  // Resolve timing: use preset or custom
  const resolvedTiming = timing.preset === 'custom' ? timing.custom : timing.preset

  // Resolve blur config
  const blurConfig: FluidBlurConfig = blur.enabled
    ? { enabled: true, amount: blur.amount, duration: blur.duration }
    : { enabled: false }

  // Get current button state
  const stateKey = `state${buttonStates.activeState}` as const
  const currentState = buttonStates.states[stateKey]

  return (
    <div className="flex flex-col items-center gap-8">
      <div
        className="rounded-lg bg-secondary p-4"
        style={{ width: layout.containerWidth }}
      >
        <FluidButtonGroup
          visible={showBothButtons ? 'both' : 'primary'}
          timing={resolvedTiming}
          gap={layout.gap}
          syncToExpand={timing.syncToExpand}
          exitBlur={blurConfig}
          slowMo={demo.slowMo}
          secondaryButton={
            <Button variant={layout.buttonVariant} className="w-full">
              Back
            </Button>
          }
          primaryButton={
            <AnimatedRightButton
              state={currentState}
              transition={stateTransition}
              variant={layout.buttonVariant}
              slowMo={demo.slowMo}
            />
          }
        />
      </div>
      <ToggleControls
        showBothButtons={showBothButtons}
        onShowBoth={onShowBoth}
        onShowSingle={onShowSingle}
      />
      <StateSelector
        activeState={buttonStates.activeState}
        onStateChange={onStateChange}
      />
    </div>
  )
}

// ============================================================================
// Page Component
// ============================================================================

export default function ButtonFluidLayoutPlayground() {
  const [config, setConfig] = useState<ButtonFluidLayoutConfig>(
    DEFAULT_BUTTON_FLUID_LAYOUT_CONFIG
  )
  const [activePresetId, setActivePresetId] = useState<string | null>('default')
  const [showBothButtons, setShowBothButtons] = useState(true)

  // Toggle handlers
  const handleShowBoth = useCallback(() => {
    setShowBothButtons(true)
  }, [])

  const handleShowSingle = useCallback(() => {
    setShowBothButtons(false)
  }, [])

  // State change handler - syncs toggle to state's showLeftButton config
  const handleStateChange = useCallback((state: 1 | 2 | 3 | 4) => {
    const stateKey = `state${state}` as const
    setConfig((prev) => {
      const newState = prev.buttonStates.states[stateKey]
      // Sync toggle to state's showLeftButton config
      setShowBothButtons(newState.showLeftButton)
      return {
        ...prev,
        buttonStates: { ...prev.buttonStates, activeState: state },
      }
    })
    setActivePresetId(null)
  }, [])

  // Handle control changes
  const handleChange = useCallback((event: ControlChangeEvent) => {
    let { value } = event
    // Convert activeState from string to number
    if (event.controlId === 'buttonStates.activeState') {
      value = Number(value) as 1 | 2 | 3 | 4
    }
    setConfig((prev) => {
      const newConfig = setNestedValue(prev, event.controlId, value)
      // If showLeftButton for the current state changed, sync the toggle
      const currentStateKey = `state${newConfig.buttonStates.activeState}` as const
      const showLeftButtonPath = `buttonStates.states.${currentStateKey}.showLeftButton`
      if (event.controlId === showLeftButtonPath) {
        setShowBothButtons(value as boolean)
      }
      return newConfig
    })
    setActivePresetId(null)
  }, [])

  // Handle preset selection
  const handlePresetChange = useCallback((presetId: string) => {
    const preset = BUTTON_FLUID_LAYOUT_PRESETS.find((p) => p.id === presetId)
    if (preset) {
      setConfig(preset.data)
      setActivePresetId(presetId)
    }
  }, [])

  // Handle reset
  const handleReset = useCallback(() => {
    setConfig(DEFAULT_BUTTON_FLUID_LAYOUT_CONFIG)
    setActivePresetId('default')
    setShowBothButtons(true)
  }, [])

  // Debug control handlers
  const handleSlowMoChange = useCallback((enabled: boolean) => {
    setConfig((prev) => ({
      ...prev,
      demo: { ...prev.demo, slowMo: enabled },
    }))
  }, [])

  const handleShowDebugChange = useCallback((enabled: boolean) => {
    setConfig((prev) => ({
      ...prev,
      demo: { ...prev.demo, showDebug: enabled },
    }))
  }, [])

  // Build panel configuration
  const panelConfig = useMemo(
    () =>
      buildButtonFluidLayoutPanelConfig(config, BUTTON_FLUID_LAYOUT_PRESETS, activePresetId),
    [config, activePresetId]
  )

  return (
    <PlaygroundLayout
      className="bg-primary"
      debugControls={{
        slowMo: config.demo.slowMo,
        onSlowMoChange: handleSlowMoChange,
        showDebug: config.demo.showDebug,
        onShowDebugChange: handleShowDebugChange,
      }}
      controlPanel={
        <UnifiedControlPanel
          config={panelConfig}
          onChange={handleChange}
          onPresetChange={handlePresetChange}
          onReset={handleReset}
          getConfigForCopy={() => config}
        />
      }
    >
      <DemoContent
        config={config}
        showBothButtons={showBothButtons}
        onShowBoth={handleShowBoth}
        onShowSingle={handleShowSingle}
        onStateChange={handleStateChange}
      />
    </PlaygroundLayout>
  )
}

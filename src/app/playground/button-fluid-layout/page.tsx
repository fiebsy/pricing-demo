/**
 * Button Fluid Layout Playground
 *
 * Uses the production FluidButtonGroup component with the new
 * useButtonStateMachine hook for automatic state management.
 *
 * Features:
 * - Two buttons fill a configurable container width
 * - Toggling visibility causes remaining button to expand fluidly
 * - State machine eliminates manual showBothButtons sync
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
import { Button } from '@/components/ui/core/primitives/button'
import { FluidButtonGroup } from '@/components/ui/core/primitives/fluid-button-group'
import {
  useButtonStateMachine,
  useAllStateIds,
  AnimatedRightButton,
  type ButtonStateId,
} from '@/components/ui/core/primitives/fluid-button-layout'

import type { ButtonFluidLayoutConfig, FluidBlurConfig } from './config/types'
import {
  DEFAULT_BUTTON_FLUID_LAYOUT_CONFIG,
  BUTTON_FLUID_LAYOUT_PRESETS,
} from './config/presets'
import { buildButtonFluidLayoutPanelConfig } from './panels/panel-config'
import { useAutoTransitions } from './hooks/use-auto-transitions'

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
// State Selector
// ============================================================================

interface StateSelectorProps {
  activeState: ButtonStateId
  onStateChange: (state: ButtonStateId) => void
}

function StateSelector({ activeState, onStateChange }: StateSelectorProps) {
  const stateIds = useAllStateIds()

  return (
    <div className="flex items-center gap-2">
      {stateIds.map((state) => (
        <button
          key={state}
          type="button"
          onClick={() => onStateChange(state)}
          className={`flex h-10 min-w-10 items-center justify-center rounded-lg px-3 text-sm font-medium transition-colors ${
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
  currentStateId: ButtonStateId
  showSecondary: boolean
  onStateChange: (state: ButtonStateId) => void
  onButtonClick: () => void
}

function DemoContent({
  config,
  currentStateId,
  showSecondary,
  onStateChange,
  onButtonClick,
}: DemoContentProps) {
  const { timing, blur, layout, demo, buttonStates, stateTransition } = config

  // Resolve timing: use preset or custom
  const resolvedTiming = timing.preset === 'custom' ? timing.custom : timing.preset

  // Resolve blur config
  const blurConfig: FluidBlurConfig = blur.enabled
    ? { enabled: true, amount: blur.amount, duration: blur.duration }
    : { enabled: false }

  // Get current button state config (for AnimatedRightButton)
  const stateKey = `state${currentStateId}` as keyof typeof buttonStates.states
  const currentStateConfig = buttonStates.states[stateKey]

  // Determine if button is clickable (only in states A, B1, C2)
  const isClickable = currentStateId === 'A' || currentStateId === 'B1' || currentStateId === 'C2'

  return (
    <div className="flex flex-col items-center gap-8">
      <div
        className="rounded-lg bg-secondary p-4"
        style={{ width: layout.containerWidth }}
      >
        <FluidButtonGroup
          visible={showSecondary ? 'both' : 'primary'}
          timing={resolvedTiming}
          gap={layout.gap}
          syncToExpand={timing.syncToExpand}
          exitBlur={blurConfig}
          slowMo={demo.slowMo}
          secondaryButton={
            <Button variant={layout.leftButtonVariant} className="w-full">
              Back
            </Button>
          }
          primaryButton={
            <button
              type="button"
              onClick={onButtonClick}
              className="w-full"
              style={{ cursor: isClickable ? 'pointer' : 'default' }}
            >
              <AnimatedRightButton
                state={currentStateConfig}
                transition={stateTransition}
                variant={layout.rightButtonVariant}
                slowMo={demo.slowMo}
              />
            </button>
          }
        />
      </div>
      <StateSelector
        activeState={currentStateId}
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

  // Use the state machine hook - showSecondary is now DERIVED automatically
  const { stateId, transitionTo, showSecondary } = useButtonStateMachine({
    initialState: config.buttonStates.activeState,
  })

  // Auto transitions hook for B2 → C1 → C2 flow
  const { cancelPendingTransitions } = useAutoTransitions({
    stateId,
    config: config.autoTransition,
    transitionTo,
    slowMo: config.demo.slowMo,
  })

  // Button click handler for interactive state flow
  const handleButtonClick = useCallback(() => {
    cancelPendingTransitions()
    switch (stateId) {
      case 'A':
        transitionTo('B1')
        break
      case 'B1':
        transitionTo('B2')
        break
      case 'C2':
        transitionTo('A') // Restart
        break
      // B2 and C1 are auto-transition states, no click action
    }
  }, [stateId, transitionTo, cancelPendingTransitions])

  // State change handler (from StateSelector) - no more manual sync needed!
  const handleStateChange = useCallback((newStateId: ButtonStateId) => {
    // Cancel any pending auto transitions
    cancelPendingTransitions()
    // Transition the state machine
    transitionTo(newStateId)

    // Update config to track active state (for presets/persistence)
    setConfig((prev) => ({
      ...prev,
      buttonStates: { ...prev.buttonStates, activeState: newStateId },
    }))
    setActivePresetId(null)
  }, [transitionTo, cancelPendingTransitions])

  // Handle control changes
  const handleChange = useCallback((event: ControlChangeEvent) => {
    const { value } = event
    setConfig((prev) => {
      const newConfig = setNestedValue(prev, event.controlId, value)
      return newConfig
    })
    setActivePresetId(null)
  }, [])

  // Handle preset selection
  const handlePresetChange = useCallback((presetId: string) => {
    const preset = BUTTON_FLUID_LAYOUT_PRESETS.find((p) => p.id === presetId)
    if (preset) {
      cancelPendingTransitions()
      setConfig(preset.data)
      setActivePresetId(presetId)
      // Sync state machine to preset's active state
      transitionTo(preset.data.buttonStates.activeState)
    }
  }, [transitionTo, cancelPendingTransitions])

  // Handle reset
  const handleReset = useCallback(() => {
    cancelPendingTransitions()
    setConfig(DEFAULT_BUTTON_FLUID_LAYOUT_CONFIG)
    setActivePresetId('default')
    // Reset state machine to default state
    transitionTo(DEFAULT_BUTTON_FLUID_LAYOUT_CONFIG.buttonStates.activeState)
  }, [transitionTo, cancelPendingTransitions])

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
        currentStateId={stateId}
        showSecondary={showSecondary}
        onStateChange={handleStateChange}
        onButtonClick={handleButtonClick}
      />
    </PlaygroundLayout>
  )
}

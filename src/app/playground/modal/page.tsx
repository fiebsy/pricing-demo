/**
 * Modal Playground
 *
 * Core component: ./core/modal.tsx
 * Migration target: src/components/ui/core/primitives/modal
 *
 * Features:
 * - Base UI Dialog with Motion animations
 * - Non-modal mode (control panel stays accessible)
 * - Wireframe placeholder sections
 * - Configurable shine, depth, corners, shadows
 * - Multiple animation presets
 */

'use client'

import { useCallback, useEffect, useState, useMemo } from 'react'
import {
  UnifiedControlPanel,
  PlaygroundLayout,
  type ControlChangeEvent,
} from '@/components/ui/patterns/control-panel'
import { Button } from '@/components/ui/core/primitives/button'
import { cn } from '@/lib/utils'

import { PlaygroundModal } from './core/modal'
import type { ModalPlaygroundConfig, StageId } from './config/types'
import { DEFAULT_MODAL_CONFIG, MODAL_PRESETS } from './config/presets'
import { buildModalPanelConfig } from './panels/panel-config'
import { StageControls } from './components/stage-controls'

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
// Demo Content
// ============================================================================

interface DemoContentProps {
  config: ModalPlaygroundConfig
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  activeStage: StageId
  onStageChange: (stageId: StageId) => void
}

function DemoContent({ config, isOpen, onOpenChange, activeStage, onStageChange }: DemoContentProps) {
  // Page background class
  const bgClass =
    config.demo.pageBackground === 'primary'
      ? 'bg-primary'
      : config.demo.pageBackground === 'secondary'
        ? 'bg-secondary'
        : 'bg-tertiary'

  return (
    <div className={cn('flex h-full w-full items-center justify-center', bgClass)}>
      {/* Trigger Button */}
      {!isOpen && (
        <Button
          variant="primary"
          size="lg"
          onClick={() => onOpenChange(true)}
        >
          Open Modal
        </Button>
      )}

      {/* Modal */}
      <PlaygroundModal
        config={config}
        open={isOpen}
        onOpenChange={onOpenChange}
        activeStage={activeStage}
      />

      {/* Stage Controls - pinned to bottom */}
      {isOpen && (
        <StageControls
          activeStage={activeStage}
          onStageChange={onStageChange}
        />
      )}
    </div>
  )
}

// ============================================================================
// Page Component
// ============================================================================

export default function ModalPlayground() {
  const [config, setConfig] = useState<ModalPlaygroundConfig>(DEFAULT_MODAL_CONFIG)
  const [activePresetId, setActivePresetId] = useState<string | null>('default')
  const [isOpen, setIsOpen] = useState(false)
  const [activeStage, setActiveStage] = useState<StageId>(1)

  // Auto-open: open when enabled, close when disabled
  useEffect(() => {
    if (config.demo.autoOpen) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }, [config.demo.autoOpen])

  // Wrap onOpenChange to prevent closing in autoOpen mode
  const handleOpenChange = useCallback(
    (open: boolean) => {
      // In auto-open mode, prevent closing
      if (config.demo.autoOpen && !open) return
      setIsOpen(open)
    },
    [config.demo.autoOpen]
  )

  // Handle control changes
  const handleChange = useCallback((event: ControlChangeEvent) => {
    // Convert button count from string to number
    if (event.controlId === 'buttons.buttonCount') {
      setConfig((prev) =>
        setNestedValue(prev, event.controlId, parseInt(event.value as string, 10) as 1 | 2)
      )
      setActivePresetId(null)
      return
    }

    // Convert icon stroke width from string to number
    if (event.controlId === 'closeButton.iconStrokeWidth') {
      setConfig((prev) =>
        setNestedValue(prev, event.controlId, parseFloat(event.value as string))
      )
      setActivePresetId(null)
      return
    }

    // Convert coin stack stateId from string to number (1 | 2)
    if (
      event.controlId.includes('coinStackStateId') ||
      event.controlId === 'header.asset.coinStack.stateId'
    ) {
      setConfig((prev) =>
        setNestedValue(prev, event.controlId, parseInt(event.value as string, 10) as 1 | 2)
      )
      setActivePresetId(null)
      return
    }

    setConfig((prev) => setNestedValue(prev, event.controlId, event.value))
    setActivePresetId(null)
  }, [])

  // Handle preset selection
  const handlePresetChange = useCallback((presetId: string) => {
    const preset = MODAL_PRESETS.find((p) => p.id === presetId)
    if (preset) {
      setConfig(preset.data)
      setActivePresetId(presetId)
      // Re-open modal when preset changes
      setIsOpen(true)
    }
  }, [])

  // Handle reset
  const handleReset = useCallback(() => {
    setConfig(DEFAULT_MODAL_CONFIG)
    setActivePresetId('default')
    setActiveStage(1)
    setIsOpen(true)
  }, [])

  // Handle stage change
  const handleStageChange = useCallback((stageId: StageId) => {
    setActiveStage(stageId)
  }, [])

  // Build panel configuration
  const panelConfig = useMemo(
    () => buildModalPanelConfig(config, MODAL_PRESETS, activePresetId),
    [config, activePresetId]
  )

  return (
    <PlaygroundLayout
      className="bg-primary"
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
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
        activeStage={activeStage}
        onStageChange={handleStageChange}
      />
    </PlaygroundLayout>
  )
}

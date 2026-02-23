/**
 * Modal V2 Playground
 *
 * Clean refactored modal with simplified configuration.
 *
 * Features:
 * - 5-phase flow (pricing → success)
 * - Flat stage definitions
 * - Centralized defaults
 * - Reduced prop drilling
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
import type { PricingTier } from '@/components/ui/features/pricing-select-menu'

import { ModalV2 } from './core/modal-v2'
import type { ModalV2Config, StageId } from './config/types'
import { DEFAULT_CONFIG } from './config/defaults'
import { MODAL_V2_PRESETS } from './config/presets'
import { getStageById, STAGES } from './config/stages'
import { buildModalV2PanelConfig } from './panels/panel-config'
import { StageControls } from './components/stage-controls'
import { PRICING_TIERS } from './core/pricing-tiers'

// ============================================================================
// Utility: Deep set nested value
// ============================================================================

function setNestedValue<T>(obj: T, path: string, value: unknown): T {
  const keys = path.split('.')
  const result = structuredClone(obj) as Record<string, unknown>
  let current = result

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    const nextKey = keys[i + 1]
    const nextIsArrayIndex = /^\d+$/.test(nextKey)

    if (typeof current[key] !== 'object' || current[key] === null) {
      current[key] = nextIsArrayIndex ? [] : {}
    } else if (Array.isArray(current[key])) {
      current[key] = [...(current[key] as unknown[])]
    } else {
      current[key] = { ...(current[key] as Record<string, unknown>) }
    }
    current = current[key] as Record<string, unknown>
  }

  current[keys[keys.length - 1]] = value
  return result as T
}

// ============================================================================
// Background Classes
// ============================================================================

const BG_CLASSES = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  tertiary: 'bg-tertiary',
} as const

// ============================================================================
// Demo Content
// ============================================================================

interface DemoContentProps {
  config: ModalV2Config
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  activeStage: StageId
  onStageChange: (stageId: StageId) => void
  selectedTier: PricingTier
  onTierSelect: (tier: PricingTier) => void
}

function DemoContent({
  config,
  isOpen,
  onOpenChange,
  activeStage,
  onStageChange,
  selectedTier,
  onTierSelect,
}: DemoContentProps) {
  const bgClass = BG_CLASSES[config.demo.pageBackground]
  const stage = getStageById(activeStage)

  return (
    <div className={cn('flex h-full w-full items-center justify-center', bgClass)}>
      {/* Trigger Button */}
      {!isOpen && (
        <Button variant="primary" size="lg" onClick={() => onOpenChange(true)}>
          Open Modal
        </Button>
      )}

      {/* Modal */}
      <ModalV2
        stage={stage}
        config={config}
        open={isOpen}
        onOpenChange={onOpenChange}
        selectedTier={selectedTier}
        onTierSelect={onTierSelect}
        onStageChange={onStageChange}
      />

      {/* Stage Controls */}
      {isOpen && (
        <StageControls activeStage={activeStage} onStageChange={onStageChange} />
      )}
    </div>
  )
}

// ============================================================================
// Page Component
// ============================================================================

export default function ModalV2Playground() {
  const [config, setConfig] = useState<ModalV2Config>(DEFAULT_CONFIG)
  const [activePresetId, setActivePresetId] = useState<string | null>('default')
  const [isOpen, setIsOpen] = useState(false)
  const [activeStage, setActiveStage] = useState<StageId>(1)
  const [selectedTier, setSelectedTier] = useState<PricingTier>(PRICING_TIERS[1])

  // Auto-open handling
  useEffect(() => {
    if (config.demo.autoOpen) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }, [config.demo.autoOpen])

  // Prevent closing in auto-open mode
  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (config.demo.autoOpen && !open) return
      setIsOpen(open)
    },
    [config.demo.autoOpen]
  )

  // Handle control changes
  const handleChange = useCallback((event: ControlChangeEvent) => {
    setConfig((prev) => setNestedValue(prev, event.controlId, event.value))
    setActivePresetId(null)
  }, [])

  // Handle preset selection
  const handlePresetChange = useCallback((presetId: string) => {
    const preset = MODAL_V2_PRESETS.find((p) => p.id === presetId)
    if (preset) {
      setConfig(preset.data)
      setActivePresetId(presetId)
      setIsOpen(true)
    }
  }, [])

  // Handle reset
  const handleReset = useCallback(() => {
    setConfig(DEFAULT_CONFIG)
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
    () => buildModalV2PanelConfig(config, MODAL_V2_PRESETS, activePresetId),
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
        selectedTier={selectedTier}
        onTierSelect={setSelectedTier}
      />
    </PlaygroundLayout>
  )
}

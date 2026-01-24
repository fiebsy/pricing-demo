/**
 * Quick Fix Modal Playground
 *
 * Test the modal flow framework with configurable settings.
 *
 * Core components: ./core/
 * Flow sheets: ./flows/
 * Migration target: src/components/ui/prod/features/quick-fix-modal
 */

'use client'

import { useCallback, useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import { Breadcrumbs } from '@/components/ui/deprecated/nav'
import { Button } from '@/components/ui/prod/base/button'
import {
  UnifiedControlPanel,
  type ControlChangeEvent,
} from '@/components/ui/prod/base/control-panel'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import ArrowRight01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowRight01Icon'

import type { QuickFixModalConfig } from './config/types'
import { DEFAULT_QUICK_FIX_MODAL_CONFIG } from './config/defaults'
import {
  QUICK_FIX_MODAL_PRESETS,
  MODAL_SOLUTION_PRESETS,
  getModalSolutionPresetById,
} from './config/presets'
import { buildQuickFixModalPanelConfig } from './config/panel-config'

// Core components
import { QuickFixModal, ClipPathContainer } from './core'
import { ToastPortal, useToast } from './integration'

// Flow sheets (for previews)
import { StandaloneFlowSelector } from './flows'

// Reuse components from quick-fix-interactions
import { StatusIsland, Toast } from '../quick-fix-interactions/core'
import type { Notification } from '../quick-fix-interactions/core/StatusIsland'

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

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

// Transform certain slider values back to original scale
function transformValue(controlId: string, value: unknown): unknown {
  // Depth scale: slider is 90-100, actual is 0.90-1.00
  if (controlId === 'stack.depthScale') {
    return (value as number) / 100
  }
  // Depth offset: slider is positive, actual is negative
  if (controlId === 'stack.depthOffset') {
    return -(value as number)
  }
  // Depth opacity: slider is 30-100, actual is 0.30-1.00
  if (controlId === 'stack.depthOpacity') {
    return (value as number) / 100
  }
  // Stack scale: slider is 0-10, actual is 0-0.10
  if (controlId === 'card.stackScale') {
    return (value as number) / 100
  }
  // Velocity threshold: slider is 0-100, actual is 0-1
  if (controlId === 'swipe.velocityThreshold') {
    return (value as number) / 100
  }
  // Rotation factor: slider is 10-100, actual is 0.01-0.1
  if (controlId === 'swipe.rotationFactor') {
    return (value as number) / 1000
  }
  // Scale values
  if (
    controlId === 'swipe.scaleOnDrag' ||
    controlId === 'actionButtons.hoverScale' ||
    controlId === 'actionButtons.pressScale'
  ) {
    return (value as number) / 100
  }
  // Wheel stroke width
  if (controlId === 'island.wheelStrokeWidth') {
    return (value as number) / 10
  }
  return value
}

// =============================================================================
// PREVIEW COMPONENTS
// =============================================================================

function FullFlowPreview({ config, onOpenModal }: { config: QuickFixModalConfig; onOpenModal: () => void }) {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="text-center max-w-md">
        <h2 className="text-xl font-semibold text-primary mb-3">Full Flow Preview</h2>
        <p className="text-sm text-tertiary mb-6">
          Click the button below to open the modal and test the full flow.
        </p>
      </div>

      <Button
        variant="primary"
        size="lg"
        roundness="squircle"
        iconLeading={ArrowRight01Icon}
        onClick={onOpenModal}
      >
        Open Quick Fix Modal
      </Button>

      {/* Preview card showing current config */}
      <div className="mt-8 p-6 rounded-xl bg-secondary border border-primary max-w-md w-full">
        <h3 className="text-sm font-medium text-primary mb-4">Current Configuration</h3>
        <dl className="space-y-2 text-xs">
          <div className="flex justify-between">
            <dt className="text-tertiary">Modal Width</dt>
            <dd className="text-secondary">{config.modal.maxWidth}px</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-tertiary">Gold Border</dt>
            <dd className="text-secondary">{config.modal.goldBorder ? 'Yes' : 'No'}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-tertiary">Shine</dt>
            <dd className="text-secondary">{config.modal.shine}{config.modal.shineIntensity}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-tertiary">Stack Depth</dt>
            <dd className="text-secondary">{Math.round(config.stack.depthScale * 100)}%</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-tertiary">Animation</dt>
            <dd className="text-secondary">{config.animation.sheetTransition}ms</dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

function FlowSelectorPreview({ config }: { config: QuickFixModalConfig }) {
  // Build modal style classes
  const bgClass = `bg-${config.modal.background}`
  const shineClass = config.modal.shine !== 'none'
    ? `${config.modal.shine}${config.modal.shineIntensity}`
    : ''
  const cornerClass = config.modal.cornerShape === 'squircle' ? 'corner-squircle' : ''
  const goldBorderClass = config.modal.goldBorder ? 'ring-1 ring-yellow-500/30' : ''

  return (
    <div className="flex flex-col items-center">
      <div
        className={cn(
          'w-full overflow-hidden shadow-2xl p-6',
          bgClass,
          shineClass,
          cornerClass,
          goldBorderClass
        )}
        style={{
          maxWidth: config.modal.maxWidth,
          borderRadius: config.modal.borderRadius,
        }}
      >
        <StandaloneFlowSelector
          config={config.flowOptions}
          onSelect={(flow) => console.log('Selected:', flow)}
        />
      </div>
    </div>
  )
}

function ClipPathPreview({ config }: { config: QuickFixModalConfig }) {
  const [isRevealed, setIsRevealed] = useState(true)

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex gap-4">
        <Button
          variant={isRevealed ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setIsRevealed(true)}
        >
          Revealed
        </Button>
        <Button
          variant={!isRevealed ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setIsRevealed(false)}
        >
          Collapsed
        </Button>
      </div>

      <div className="relative w-full max-w-md">
        <ClipPathContainer
          isRevealed={isRevealed}
          borderRadius={config.modal.borderRadius}
          duration={config.animation.clipRevealDuration}
          delay={config.animation.clipRevealDelay}
          easing={config.animation.easing}
        >
          <div
            className={cn(
              'p-8 bg-secondary border border-primary',
              config.modal.cornerShape === 'squircle' && 'corner-squircle'
            )}
            style={{ borderRadius: config.modal.borderRadius }}
          >
            <h3 className="text-lg font-semibold text-primary mb-2">Clip-Path Animation</h3>
            <p className="text-sm text-tertiary mb-4">
              This content is revealed using a clip-path transition.
              No layout thrashing - pure compositor performance.
            </p>
            <div className="flex gap-4 text-xs text-tertiary">
              <span>Duration: {config.animation.clipRevealDuration}ms</span>
              <span>Delay: {config.animation.clipRevealDelay}ms</span>
            </div>
          </div>
        </ClipPathContainer>
      </div>
    </div>
  )
}

function IslandPreview({ config }: { config: QuickFixModalConfig }) {
  const [score, setScore] = useState(12100)
  const [confidence, setConfidence] = useState(65)

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-wrap gap-4 justify-center">
        <button
          type="button"
          onClick={() => setScore((s) => s + Math.floor(Math.random() * 500) + 100)}
          className="px-4 py-2 rounded-lg bg-secondary text-sm text-primary hover:bg-tertiary motion-safe:transition-colors"
        >
          Increase Score
        </button>
        <button
          type="button"
          onClick={() => setConfidence((c) => Math.min(100, c + 5))}
          className="px-4 py-2 rounded-lg bg-secondary text-sm text-primary hover:bg-tertiary motion-safe:transition-colors"
        >
          Increase Confidence
        </button>
        <button
          type="button"
          onClick={() => {
            setScore(12100)
            setConfidence(65)
          }}
          className="px-4 py-2 rounded-lg bg-tertiary text-sm text-tertiary hover:text-secondary motion-safe:transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="h-32" />

      <StatusIsland
        config={config.island}
        uploadProgress={0}
        filesUploaded={3}
        compositeScore={score}
        confidenceValue={confidence}
        confidenceLevel={confidence >= 70 ? 'high' : confidence >= 40 ? 'medium' : 'low'}
        notifications={[]}
      />
    </div>
  )
}

function ToastPreview({ config }: { config: QuickFixModalConfig }) {
  const [visible, setVisible] = useState(true)
  const [key, setKey] = useState(0)

  const handleReanimate = () => {
    setVisible(false)
    setTimeout(() => {
      setKey((k) => k + 1)
      setVisible(true)
    }, 100)
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-lg">
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          className="px-4 py-2 rounded-lg bg-secondary text-sm text-primary hover:bg-tertiary motion-safe:transition-colors"
        >
          {visible ? 'Hide Toast' : 'Show Toast'}
        </button>
        <button
          type="button"
          onClick={handleReanimate}
          className="px-4 py-2 rounded-lg bg-secondary text-sm text-primary hover:bg-tertiary motion-safe:transition-colors"
        >
          Reanimate
        </button>
      </div>

      <div className="relative w-full min-h-[200px] flex items-center justify-center">
        <Toast
          key={key}
          title="Answer updated successfully"
          subtitle="Your work preferences have been saved"
          visible={visible}
          config={config.toast}
        />
      </div>
    </div>
  )
}

// =============================================================================
// MAIN PAGE
// =============================================================================

export default function QuickFixModalPlayground() {
  const [config, setConfig] = useState<QuickFixModalConfig>(DEFAULT_QUICK_FIX_MODAL_CONFIG)
  const [activePresetId, setActivePresetId] = useState<string | null>('default')
  const [activeSolutionId, setActiveSolutionId] = useState<string | null>('standalone')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { show: showToast, toast, visible: toastVisible } = useToast()

  // Handle control panel changes
  const handleChange = useCallback((event: ControlChangeEvent) => {
    const { controlId, value } = event

    // Handle solution preset change
    if (controlId === 'solutionPreset') {
      const solution = getModalSolutionPresetById(value as string)
      if (solution) {
        setConfig(solution.config)
        setActiveSolutionId(solution.id)
        setActivePresetId(null)
        return
      }
    }

    // Transform value if needed
    const transformedValue = transformValue(controlId, value)

    setConfig((prev) => setNestedValue(prev, controlId, transformedValue))
    setActivePresetId(null)
  }, [])

  // Handle preset change
  const handlePresetChange = useCallback((presetId: string) => {
    const preset = QUICK_FIX_MODAL_PRESETS.find((p) => p.id === presetId)
    if (preset) {
      setConfig(preset.data)
      setActivePresetId(presetId)
    }
  }, [])

  // Handle reset
  const handleReset = useCallback(() => {
    setConfig(DEFAULT_QUICK_FIX_MODAL_CONFIG)
    setActivePresetId('default')
    setActiveSolutionId('standalone')
  }, [])

  // Build panel config
  const panelConfig = useMemo(
    () => buildQuickFixModalPanelConfig(config, QUICK_FIX_MODAL_PRESETS, activePresetId, activeSolutionId),
    [config, activePresetId, activeSolutionId]
  )

  // Handle modal complete
  const handleComplete = useCallback(() => {
    // Find active solution to determine completion action
    const solution = getModalSolutionPresetById(activeSolutionId || 'standalone')
    if (solution?.integration.onCompleteAction === 'toast') {
      showToast('Answer updated successfully', 'Your preferences have been saved')
    }
    setIsModalOpen(false)
  }, [activeSolutionId, showToast])


  // Get integration config
  const integration = useMemo(() => {
    const solution = getModalSolutionPresetById(activeSolutionId || 'standalone')
    return solution?.integration
  }, [activeSolutionId])

  // Render preview based on mode
  const renderPreview = () => {
    switch (config.modalPreviewMode) {
      case 'full-flow':
        return <FullFlowPreview config={config} onOpenModal={() => setIsModalOpen(true)} />
      case 'sheet-stack':
        return <FlowSelectorPreview config={config} />
      case 'clip-path':
        return <ClipPathPreview config={config} />
      case 'island':
        return <IslandPreview config={config} />
      case 'toast':
        return <ToastPreview config={config} />
      default:
        return <FullFlowPreview config={config} onOpenModal={() => setIsModalOpen(true)} />
    }
  }

  return (
    <div className="min-h-screen bg-primary">
      {/* Breadcrumbs */}
      <div className="nav-clearance px-6">
        <div className="flex items-center justify-between">
          <Breadcrumbs
            items={[
              { label: 'Playground', href: '/playground' },
              { label: 'Quick Fix Modal' },
            ]}
          />
          <div className="text-xs text-tertiary">
            {activeSolutionId !== 'standalone' ? `Solution: ${activeSolutionId}` : activePresetId ? `Preset: ${activePresetId}` : 'Custom config'}
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <div className="pr-[352px] pb-24 md:pb-0">
        <div className="flex flex-col min-h-[calc(100vh-120px)] p-8">
          {/* Description */}
          <div className="mb-8 max-w-2xl">
            <h1 className="text-2xl font-semibold text-primary mb-2">
              Quick Fix Modal
            </h1>
            <p className="text-tertiary">
              Modal flow framework with clip-path transitions, sheet stack navigation,
              and island/toast integration. Configure all aspects of the modal.
            </p>
          </div>

          {/* Mode indicator */}
          <div className="mb-8 flex items-center gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border border-primary">
              <span className="text-xs text-tertiary">Viewing:</span>
              <span className="text-xs font-medium text-primary capitalize">
                {config.modalPreviewMode.replace('-', ' ')}
              </span>
            </div>
          </div>

          {/* Preview container */}
          <div className={cn(
            'flex-1 flex items-center justify-center',
            config.modalPreviewMode === 'island' && 'items-start pt-16'
          )}>
            {renderPreview()}
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <UnifiedControlPanel
        config={panelConfig}
        onChange={handleChange}
        onPresetChange={handlePresetChange}
        onReset={handleReset}
        getConfigForCopy={() => config}
      />

      {/* Modal */}
      <QuickFixModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        config={config}
        integration={integration}
        onComplete={handleComplete}
      />

      {/* Toast portal */}
      {toast && (
        <ToastPortal
          title={toast.title}
          subtitle={toast.subtitle}
          visible={toastVisible}
          config={config.toast}
        />
      )}
    </div>
  )
}

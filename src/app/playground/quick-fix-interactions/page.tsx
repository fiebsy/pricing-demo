/**
 * Quick Fix Interactions Playground
 *
 * Refine the Tinder-style swiping, option selection, and island interactions.
 *
 * Core components: ./core/
 * Migration target: src/components/ui/prod/features/quick-fix
 */

'use client'

import { useCallback, useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import { Breadcrumbs } from '@/components/ui/deprecated/nav'
import {
  UnifiedControlPanel,
  type ControlChangeEvent,
} from '@/components/ui/prod/base/control-panel'

import type { QuickFixInteractionsConfig } from './config/types'
import { DEFAULT_QUICK_FIX_CONFIG, QUICK_FIX_PRESETS } from './config/presets'
import { buildQuickFixPanelConfig } from './panels/panel-config'
import {
  SwipeableCard,
  ActionButtons,
  ProgressBar,
  CompletionState,
  FlowSelector,
  StatusIsland,
  Toast,
} from './core'
import type { Notification } from './core/StatusIsland'
import { SAMPLE_STATEMENTS, MEMORY_BULLETS, SAMPLE_NOTIFICATIONS } from './constants/mock-data'

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
  // Scale values: slider is 85-120, actual is 0.85-1.20
  if (controlId === 'swipe.scaleOnDrag' || controlId === 'actionButtons.hoverScale' || controlId === 'actionButtons.pressScale') {
    return (value as number) / 100
  }
  // Wheel stroke width: slider is 15-40, actual is 1.5-4.0
  if (controlId === 'island.wheelStrokeWidth') {
    return (value as number) / 10
  }
  return value
}

// =============================================================================
// PREVIEW COMPONENTS
// =============================================================================

interface CardStackPreviewProps {
  config: QuickFixInteractionsConfig
}

function CardStackPreview({ config }: CardStackPreviewProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [triggerDirection, setTriggerDirection] = useState<'left' | 'right' | null>(null)

  const handleSwipe = useCallback((isTrue: boolean) => {
    // Clear the trigger direction after animation completes
    setTriggerDirection(null)

    // Simulate answer
    console.log(`Answered: ${isTrue ? 'True' : 'False'}`)

    if (currentIndex + 1 >= SAMPLE_STATEMENTS.length) {
      setIsComplete(true)
    } else {
      setCurrentIndex((prev) => prev + 1)
    }
  }, [currentIndex])

  const handleButtonSwipe = useCallback((direction: 'left' | 'right') => {
    // Trigger the animation - the actual swipe callback will be called after animation
    setTriggerDirection(direction)
  }, [])

  const handleReset = useCallback(() => {
    setCurrentIndex(0)
    setIsComplete(false)
    setTriggerDirection(null)
  }, [])

  const handleContinue = useCallback(() => {
    // Reset for demo
    handleReset()
  }, [handleReset])

  if (isComplete) {
    return (
      <CompletionState
        onContinue={handleContinue}
        bullets={MEMORY_BULLETS}
        config={config.completion}
      />
    )
  }

  return (
    <div className="flex flex-col items-center">
      {/* Progress */}
      <div className="mb-8 w-full flex justify-center">
        <ProgressBar
          current={currentIndex}
          total={SAMPLE_STATEMENTS.length}
          config={config.progress}
        />
      </div>

      {/* Instructions */}
      <p className="text-sm text-tertiary mb-6 text-center">
        Swipe right if true, left if false
      </p>

      {/* Card stack */}
      <div
        className="relative mb-8"
        style={{
          width: config.card.width,
          height: config.card.height,
        }}
      >
        {SAMPLE_STATEMENTS.map((statement, index) => {
          const position = index - currentIndex
          if (position < 0) return null

          return (
            <SwipeableCard
              key={statement.id}
              text={statement.text}
              isActive={position === 0}
              position={position}
              onSwipe={handleSwipe}
              cardConfig={config.card}
              swipeConfig={config.swipe}
              triggerDirection={position === 0 ? triggerDirection : null}
            />
          )
        })}
      </div>

      {/* Action buttons */}
      <ActionButtons
        onSwipe={handleButtonSwipe}
        config={config.actionButtons}
      />

      {/* Reset button */}
      <button
        type="button"
        onClick={handleReset}
        className="mt-6 text-xs text-tertiary hover:text-secondary motion-safe:transition-colors"
      >
        Reset demo
      </button>
    </div>
  )
}

function FlowSelectorPreview({ config }: { config: QuickFixInteractionsConfig }) {
  const [selectedFlow, setSelectedFlow] = useState<'quick-fix' | 'add-to-mind' | 'manual-fix' | null>(null)

  return (
    <div className="w-full max-w-md mx-auto">
      <FlowSelector
        onSelect={(flow) => setSelectedFlow(flow)}
        config={config.flowOptions}
        selectedFlow={selectedFlow}
      />

      {selectedFlow && (
        <div className="mt-6 text-center">
          <p className="text-sm text-secondary mb-3">
            Selected: <span className="font-medium text-primary">{selectedFlow}</span>
          </p>
          <button
            type="button"
            onClick={() => setSelectedFlow(null)}
            className="text-xs text-tertiary hover:text-secondary motion-safe:transition-colors"
          >
            Reset selection
          </button>
        </div>
      )}
    </div>
  )
}

function CompletionPreview({ config }: { config: QuickFixInteractionsConfig }) {
  return (
    <div className="w-full max-w-md mx-auto">
      <CompletionState
        onContinue={() => console.log('Continue clicked')}
        bullets={MEMORY_BULLETS}
        config={config.completion}
      />
    </div>
  )
}

function IslandPreview({ config }: { config: QuickFixInteractionsConfig }) {
  const [score, setScore] = useState(12100)
  const [confidence, setConfidence] = useState(65)
  const [notifications, setNotifications] = useState<Notification[]>(SAMPLE_NOTIFICATIONS.slice(0, 2))

  const handleAddNotification = () => {
    const types: Notification['type'][] = ['upload_complete', 'confidence_change', 'regeneration', 'info']
    const titles = ['New file uploaded', 'Confidence updated', 'Response regenerated', 'Process complete']
    const subtitles = ['Added to your profile', '+3% improvement', 'Based on new data', 'Ready for review']
    const typeIdx = Math.floor(Math.random() * types.length)

    const newNotification: Notification = {
      id: `n-${Date.now()}`,
      type: types[typeIdx],
      title: titles[typeIdx],
      subtitle: subtitles[typeIdx],
      timestamp: new Date(),
    }
    setNotifications((prev) => [newNotification, ...prev])
  }

  const handleDismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Controls for demo */}
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
          onClick={handleAddNotification}
          className="px-4 py-2 rounded-lg bg-secondary text-sm text-primary hover:bg-tertiary motion-safe:transition-colors"
        >
          Add Notification
        </button>
        <button
          type="button"
          onClick={() => {
            setScore(12100)
            setConfidence(65)
            setNotifications(SAMPLE_NOTIFICATIONS.slice(0, 2))
          }}
          className="px-4 py-2 rounded-lg bg-tertiary text-sm text-tertiary hover:text-secondary motion-safe:transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Spacer for island */}
      <div className="h-32" />

      {/* Island (fixed to bottom) */}
      <StatusIsland
        config={config.island}
        uploadProgress={0}
        filesUploaded={3}
        compositeScore={score}
        confidenceValue={confidence}
        confidenceLevel={confidence >= 70 ? 'high' : confidence >= 40 ? 'medium' : 'low'}
        notifications={notifications}
        onDismissNotification={handleDismissNotification}
      />
    </div>
  )
}

function ToastPreview({ config }: { config: QuickFixInteractionsConfig }) {
  const [visible, setVisible] = useState(true)
  const [key, setKey] = useState(0)

  const handleToggle = () => {
    setVisible(!visible)
  }

  const handleReanimate = () => {
    setVisible(false)
    // Force remount with new key
    setTimeout(() => {
      setKey((k) => k + 1)
      setVisible(true)
    }, 100)
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-lg">
      {/* Controls */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={handleToggle}
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

      {/* Toast preview area */}
      <div className="relative w-full min-h-[200px] flex items-center justify-center">
        <Toast
          key={key}
          title="Answer updated successfully"
          subtitle="Your work preferences have been saved"
          visible={visible}
          config={config.toast}
        />
      </div>

      {/* Current config display */}
      <div className="text-center">
        <p className="text-xs text-tertiary">
          Animation: <span className="text-secondary">{config.toast.animationDirection}</span>
          {' • '}
          Shine: <span className="text-secondary">{config.toast.shine}{config.toast.shineIntensity}</span>
          {' • '}
          Corner: <span className="text-secondary">{config.toast.cornerShape}</span>
        </p>
      </div>
    </div>
  )
}

// =============================================================================
// MAIN PAGE
// =============================================================================

export default function QuickFixInteractionsPlayground() {
  const [config, setConfig] = useState<QuickFixInteractionsConfig>(DEFAULT_QUICK_FIX_CONFIG)
  const [activePresetId, setActivePresetId] = useState<string | null>('default')

  const handleChange = useCallback((event: ControlChangeEvent) => {
    const { controlId, value } = event

    // Transform value if needed
    const transformedValue = transformValue(controlId, value)

    setConfig((prev) => setNestedValue(prev, controlId, transformedValue))
    setActivePresetId(null)
  }, [])

  const handlePresetChange = useCallback((presetId: string) => {
    const preset = QUICK_FIX_PRESETS.find((p) => p.id === presetId)
    if (preset) {
      setConfig(preset.data)
      setActivePresetId(presetId)
    }
  }, [])

  const handleReset = useCallback(() => {
    setConfig(DEFAULT_QUICK_FIX_CONFIG)
    setActivePresetId('default')
  }, [])

  const panelConfig = useMemo(
    () => buildQuickFixPanelConfig(config, QUICK_FIX_PRESETS, activePresetId),
    [config, activePresetId]
  )

  // Render preview based on mode
  const renderPreview = () => {
    switch (config.previewMode) {
      case 'card-stack':
        return <CardStackPreview config={config} />
      case 'flow-selector':
        return <FlowSelectorPreview config={config} />
      case 'completion':
        return <CompletionPreview config={config} />
      case 'island':
        return <IslandPreview config={config} />
      case 'toast':
        return <ToastPreview config={config} />
      default:
        return <CardStackPreview config={config} />
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
              { label: 'Quick Fix Interactions' },
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
              Quick Fix Interactions
            </h1>
            <p className="text-tertiary">
              Refine the Tinder-style swiping cards, flow method options, completion state,
              and status island. Configure all aspects of these interactions.
            </p>
          </div>

          {/* Mode indicator */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border border-primary">
              <span className="text-xs text-tertiary">Viewing:</span>
              <span className="text-xs font-medium text-primary capitalize">
                {config.previewMode.replace('-', ' ')}
              </span>
            </div>
          </div>

          {/* Preview container */}
          <div className={cn(
            'flex-1 flex items-center justify-center',
            config.previewMode === 'island' && 'items-start pt-16'
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
    </div>
  )
}

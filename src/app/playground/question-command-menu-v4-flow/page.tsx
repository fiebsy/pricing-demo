/**
 * Question Command Menu V4 - Flow Testing Playground
 *
 * Clean, focused playground for testing the multi-state flow system.
 * Includes UnifiedControlPanel for config modification + flow state controls.
 */

'use client'

import { useCallback, useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import {
  UnifiedControlPanel,
  type ControlChangeEvent,
} from '@/components/ui/prod/base/control-panel'

// V4 imports
import type { ChatMessage, FlowConfigs, PlaygroundState } from '../question-command-menu-v4/types'
import { V4Provider, useV4Context } from '../question-command-menu-v4/state'
import { useFlowConfig } from '../question-command-menu-v4/hooks'
import { Preview } from '../question-command-menu-v4/components'
import { buildPanelConfig, updateNestedValue } from '../question-command-menu-v4/panels'
import {
  DEFAULT_FLOW_CONFIGS,
  FLOW_CONFIGS_WITH_EMPTY_CHAT,
  MINIMAL_FLOW_CONFIGS,
  SINGLE_BUTTON_FLOW_CONFIGS,
  DEFAULT_CONFIG,
} from '../question-command-menu-v4/presets'

// ============================================================================
// FLOW STATE INDICATOR (Floating)
// ============================================================================

const FLOW_STATES = ['idle', 'adding', 'processing', 'response', 'editing'] as const

function FlowStateIndicator() {
  const { flowStateId, storedQuestion, storedResponse } = useV4Context()
  const { effectiveTopEnabled, effectiveBottomEnabled, effectiveButtons } = useFlowConfig()

  return (
    <div className="space-y-3">
      {/* State pills */}
      <div className="flex flex-wrap gap-1.5">
        {FLOW_STATES.map((state) => (
          <div
            key={state}
            className={cn(
              'px-2.5 py-1 text-[11px] font-medium rounded-full transition-all duration-200',
              flowStateId === state
                ? 'bg-brand-solid text-on-brand shadow-sm'
                : 'bg-quaternary/30 text-quaternary'
            )}
          >
            {state}
          </div>
        ))}
      </div>

      {/* Effective config summary */}
      <div className="flex gap-2 text-[10px]">
        <span className={cn(
          'px-2 py-0.5 rounded',
          effectiveTopEnabled ? 'bg-success-secondary text-success-primary' : 'bg-tertiary text-quaternary'
        )}>
          top: {effectiveTopEnabled ? 'on' : 'off'}
        </span>
        <span className={cn(
          'px-2 py-0.5 rounded',
          effectiveBottomEnabled ? 'bg-success-secondary text-success-primary' : 'bg-tertiary text-quaternary'
        )}>
          btm: {effectiveBottomEnabled ? 'on' : 'off'}
        </span>
      </div>

      {/* Button labels */}
      <div className="flex flex-wrap gap-1">
        {effectiveButtons.map((btn) => (
          <span
            key={btn.id}
            className={cn(
              'px-2 py-0.5 text-[10px] rounded',
              btn.enabled ? 'bg-secondary text-secondary' : 'bg-tertiary/50 text-quaternary line-through'
            )}
          >
            {btn.label}
            {btn.isLoading && ' ⏳'}
          </span>
        ))}
      </div>

      {/* Stored data */}
      {storedQuestion && (
        <div className="text-[10px] text-tertiary truncate">
          Q: {storedQuestion}
        </div>
      )}
    </div>
  )
}

// ============================================================================
// FLOW CONTROLS (Floating)
// ============================================================================

interface FlowControlsProps {
  onSimulateResponse: () => void
}

function FlowControls({ onSimulateResponse }: FlowControlsProps) {
  const {
    flowStateId,
    startAdding,
    submitQuestion,
    startEditing,
    cancelEditing,
    deleteQuestion,
    state,
  } = useV4Context()

  const canStartAdding = flowStateId === 'idle'
  const canSubmit = flowStateId === 'adding' && state.inputValue.trim().length > 0
  const canSimulateResponse = flowStateId === 'processing'
  const canEdit = flowStateId === 'response'
  const canCancel = flowStateId === 'editing'
  const canDelete = flowStateId === 'response' || flowStateId === 'editing'

  const btn = 'px-3 py-1.5 text-xs font-medium rounded-lg transition-all'
  const btnEnabled = 'hover:opacity-90 active:scale-95'
  const btnDisabled = 'opacity-30 cursor-not-allowed'

  return (
    <div className="flex flex-wrap gap-1.5">
      <button
        onClick={startAdding}
        disabled={!canStartAdding}
        className={cn(btn, canStartAdding ? cn('bg-brand-solid text-on-brand', btnEnabled) : btnDisabled)}
      >
        Start
      </button>
      <button
        onClick={submitQuestion}
        disabled={!canSubmit}
        className={cn(btn, canSubmit ? cn('bg-brand-secondary text-brand-primary', btnEnabled) : btnDisabled)}
      >
        Submit
      </button>
      <button
        onClick={onSimulateResponse}
        disabled={!canSimulateResponse}
        className={cn(btn, canSimulateResponse ? cn('bg-success-solid text-on-brand', btnEnabled) : btnDisabled)}
      >
        AI Response
      </button>
      <button
        onClick={startEditing}
        disabled={!canEdit}
        className={cn(btn, canEdit ? cn('bg-secondary text-primary border border-primary', btnEnabled) : btnDisabled)}
      >
        Edit
      </button>
      <button
        onClick={cancelEditing}
        disabled={!canCancel}
        className={cn(btn, canCancel ? cn('bg-secondary text-primary border border-primary', btnEnabled) : btnDisabled)}
      >
        Cancel
      </button>
      <button
        onClick={deleteQuestion}
        disabled={!canDelete}
        className={cn(btn, canDelete ? cn('bg-error-secondary text-error-primary', btnEnabled) : btnDisabled)}
      >
        Delete
      </button>
    </div>
  )
}

// ============================================================================
// FLOW CONFIG SELECTOR
// ============================================================================

interface FlowConfigSelectorProps {
  value: string
  onChange: (id: string) => void
}

const FLOW_CONFIG_OPTIONS = [
  { id: 'default', label: 'Default', config: DEFAULT_FLOW_CONFIGS },
  { id: 'single', label: 'Single Btn', config: SINGLE_BUTTON_FLOW_CONFIGS },
  { id: 'empty-chat', label: 'Empty Chat', config: FLOW_CONFIGS_WITH_EMPTY_CHAT },
  { id: 'minimal', label: 'Minimal', config: MINIMAL_FLOW_CONFIGS },
  { id: 'none', label: 'No Flow', config: undefined },
] as const

function FlowConfigSelector({ value, onChange }: FlowConfigSelectorProps) {
  return (
    <div className="flex gap-1">
      {FLOW_CONFIG_OPTIONS.map((option) => (
        <button
          key={option.id}
          onClick={() => onChange(option.id)}
          className={cn(
            'px-2.5 py-1 text-[11px] font-medium rounded-md transition-all',
            value === option.id
              ? 'bg-brand-solid text-on-brand'
              : 'bg-tertiary/50 text-tertiary hover:bg-tertiary'
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

// ============================================================================
// FLOATING PANEL (Left side)
// ============================================================================

interface FloatingPanelProps {
  selectedFlowConfig: string
  onFlowConfigChange: (id: string) => void
  onSimulateResponse: () => void
}

function FloatingPanel({ selectedFlowConfig, onFlowConfigChange, onSimulateResponse }: FloatingPanelProps) {
  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50 w-64 bg-primary border border-primary rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-secondary/50 border-b border-primary">
        <div className="text-xs font-semibold text-primary">Flow State Testing</div>
        <div className="text-[10px] text-tertiary mt-0.5">V4 Multi-state System</div>
      </div>

      {/* Flow Config */}
      <div className="px-4 py-3 border-b border-primary">
        <div className="text-[10px] uppercase tracking-wider text-quaternary font-medium mb-2">
          Flow Config
        </div>
        <FlowConfigSelector value={selectedFlowConfig} onChange={onFlowConfigChange} />
      </div>

      {/* Current State */}
      <div className="px-4 py-3 border-b border-primary">
        <div className="text-[10px] uppercase tracking-wider text-quaternary font-medium mb-2">
          Current State
        </div>
        <FlowStateIndicator />
      </div>

      {/* Controls */}
      <div className="px-4 py-3">
        <div className="text-[10px] uppercase tracking-wider text-quaternary font-medium mb-2">
          Flow Actions
        </div>
        <FlowControls onSimulateResponse={onSimulateResponse} />
      </div>
    </div>
  )
}

// ============================================================================
// MAIN CONTENT (inside provider)
// ============================================================================

interface MainContentProps {
  state: PlaygroundState
  chatMessages: ChatMessage[]
  isChatTyping: boolean
  selectedFlowConfig: string
  onFlowConfigChange: (id: string) => void
  onSimulateResponse: () => void
  onChatSend?: (message: string) => void
}

function MainContent({
  state,
  chatMessages,
  isChatTyping,
  selectedFlowConfig,
  onFlowConfigChange,
  onSimulateResponse,
  onChatSend,
}: MainContentProps) {
  return (
    <>
      {/* Floating Flow Panel */}
      <FloatingPanel
        selectedFlowConfig={selectedFlowConfig}
        onFlowConfigChange={onFlowConfigChange}
        onSimulateResponse={onSimulateResponse}
      />

      {/* Preview Canvas */}
      <div className="flex h-full flex-col items-center justify-center overflow-visible pl-72 pr-[352px]">
        <Preview
          config={state.config}
          questionGroups={[]}
          chatMessages={chatMessages}
          isChatTyping={isChatTyping}
          onChatSend={onChatSend}
          skipProvider
        />

        {/* Info */}
        <div className="mt-8 text-center">
          <h1 className="text-lg font-semibold text-primary">V4 Flow Testing</h1>
          <p className="text-sm text-tertiary mt-1">
            Use left panel for flow controls, right panel for config
          </p>
        </div>
      </div>
    </>
  )
}

// ============================================================================
// CONTENT WITH WIRED ACTIONS
// ============================================================================

interface ContentWithActionsProps {
  state: PlaygroundState
  chatMessages: ChatMessage[]
  isChatTyping: boolean
  selectedFlowConfig: string
  onFlowConfigChange: (id: string) => void
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>
  setIsChatTyping: React.Dispatch<React.SetStateAction<boolean>>
}

function ContentWithActions({
  state,
  chatMessages,
  isChatTyping,
  selectedFlowConfig,
  onFlowConfigChange,
  setChatMessages,
  setIsChatTyping,
}: ContentWithActionsProps) {
  const { storedQuestion, receiveResponse, submitQuestion, startAdding, flowStateId } = useV4Context()

  // Handle manual "Simulate AI Response" button
  const handleSimulateResponse = useCallback(() => {
    setIsChatTyping(true)

    setTimeout(() => {
      const mockResponse =
        "This is a simulated AI response demonstrating the flow state transition from 'processing' to 'response'."

      setChatMessages([
        {
          id: 'user-1',
          role: 'user',
          content: storedQuestion || 'Sample question',
        },
        {
          id: 'assistant-1',
          role: 'assistant',
          content: mockResponse,
          confidence: 0.85,
        },
      ])

      receiveResponse(mockResponse)
      setIsChatTyping(false)
    }, 1500)
  }, [storedQuestion, receiveResponse, setChatMessages, setIsChatTyping])

  // Handle chat send from the actual component
  const handleChatSend = useCallback((message: string) => {
    console.log('[FlowPlayground] Chat send:', message, 'Current state:', flowStateId)

    // If in idle, transition through adding first
    if (flowStateId === 'idle') {
      startAdding()
    }

    // Transition to processing state (stores the question)
    submitQuestion()

    // Show user message immediately
    const timestamp = Date.now()
    setChatMessages([
      {
        id: `user-${timestamp}`,
        role: 'user',
        content: message,
      },
      {
        id: `assistant-${timestamp}`,
        role: 'assistant',
        content: '',
        isStreaming: true,
      },
    ])
    setIsChatTyping(true)

    // Simulate AI response after delay
    setTimeout(() => {
      const mockResponse =
        "This is a simulated AI response. The flow state has transitioned from 'processing' to 'response'. You can now use the Edit or Delete buttons in the bottom slot."

      setChatMessages([
        {
          id: `user-${timestamp}`,
          role: 'user',
          content: message,
        },
        {
          id: `assistant-${timestamp}`,
          role: 'assistant',
          content: mockResponse,
          confidence: 0.87,
        },
      ])

      receiveResponse(mockResponse)
      setIsChatTyping(false)
    }, 2000)
  }, [flowStateId, startAdding, submitQuestion, receiveResponse, setChatMessages, setIsChatTyping])

  return (
    <MainContent
      state={state}
      chatMessages={chatMessages}
      isChatTyping={isChatTyping}
      selectedFlowConfig={selectedFlowConfig}
      onFlowConfigChange={onFlowConfigChange}
      onSimulateResponse={handleSimulateResponse}
      onChatSend={handleChatSend}
    />
  )
}

// ============================================================================
// PLAYGROUND PAGE
// ============================================================================

export default function FlowTestingPlayground() {
  // Config state (for UnifiedControlPanel)
  const [state, setState] = useState<PlaygroundState>({ config: DEFAULT_CONFIG })
  const [activePresetId, setActivePresetId] = useState<string | null>('default')

  // Flow config selection
  const [selectedFlowConfig, setSelectedFlowConfig] = useState<string>('default')

  // Chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [isChatTyping, setIsChatTyping] = useState(false)

  // Get the selected flow config and merge into state
  const flowConfigs: FlowConfigs | undefined =
    FLOW_CONFIG_OPTIONS.find((o) => o.id === selectedFlowConfig)?.config

  const configWithFlow = useMemo(() => ({
    ...state.config,
    flowConfigs,
  }), [state.config, flowConfigs])

  const stateWithFlow = useMemo(() => ({
    config: configWithFlow,
  }), [configWithFlow])

  // Panel config
  const panelConfig = useMemo(
    () => buildPanelConfig(state, activePresetId),
    [state, activePresetId]
  )

  // Handlers
  const handleChange = useCallback((event: ControlChangeEvent) => {
    setState((prev) => updateNestedValue(prev, event.controlId, event.value))
    setActivePresetId(null)
  }, [])

  const handleReset = useCallback(() => {
    setState({ config: DEFAULT_CONFIG })
    setActivePresetId('default')
    setChatMessages([])
  }, [])

  const handlePresetChange = useCallback((presetId: string) => {
    // Import presets dynamically to avoid circular deps
    import('../question-command-menu-v4/presets').then(({ PRESETS }) => {
      const preset = PRESETS.find((p) => p.id === presetId)
      if (preset) {
        setState(preset.data)
        setActivePresetId(presetId)
        setChatMessages([])
      }
    })
  }, [])

  const handleFlowConfigChange = useCallback((id: string) => {
    setSelectedFlowConfig(id)
    setChatMessages([])
  }, [])

  return (
    <div className="relative min-h-screen bg-primary" style={{ height: '100vh' }}>
      {/* Control Panel (Right) */}
      <UnifiedControlPanel
        config={panelConfig}
        onChange={handleChange}
        onReset={handleReset}
        onPresetChange={handlePresetChange}
        getConfigForCopy={() => state.config}
      />

      {/* Main Content */}
      <V4Provider config={configWithFlow} key={`${activePresetId}-${selectedFlowConfig}`}>
        <ContentWithActions
          state={stateWithFlow}
          chatMessages={chatMessages}
          isChatTyping={isChatTyping}
          selectedFlowConfig={selectedFlowConfig}
          onFlowConfigChange={handleFlowConfigChange}
          setChatMessages={setChatMessages}
          setIsChatTyping={setIsChatTyping}
        />
      </V4Provider>
    </div>
  )
}

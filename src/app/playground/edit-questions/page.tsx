/**
 * Edit Questions Playground
 *
 * Interactive testing environment for the Q/A Editor modal interface.
 * Prototypes the preview → improve → verify loop for editing questions and answers.
 *
 * @module playground/edit-questions
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

import type { PlaygroundConfig, Question } from './types'
import { DEFAULT_PLAYGROUND_CONFIG, getPresetConfig, INITIAL_QUESTIONS } from './constants'
import {
  createModalPanel,
  createAnswerPanel,
  createFlowPanel,
  createLayoutPanel,
  createOptionsPanel,
} from './panels'
import { EditQuestionsModal, StatCard, StatusBar } from './components'
import { useStatusBarState } from './hooks'

type UnifiedControlPanelConfig = UnifiedControlPanelProps['config']

// =============================================================================
// MAIN PAGE
// =============================================================================

export default function EditQuestionsPlayground() {
  const [config, setConfig] = useState<PlaygroundConfig>(DEFAULT_PLAYGROUND_CONFIG)
  const [activePresetId, setActivePresetId] = useState<string | null>('default')
  const [modalOpen, setModalOpen] = useState(false)
  const [questions, setQuestions] = useState<Question[]>(INITIAL_QUESTIONS)

  // StatusBar state management
  const statusBar = useStatusBarState({
    uploadDuration: 10000, // 10 second upload simulation
    notificationTimeout: 0, // No auto-dismiss - user must click to dismiss
  })

  // Panel configuration
  const panelConfig = useMemo<UnifiedControlPanelConfig>(
    () => ({
      sections: [
        createModalPanel(config),
        createAnswerPanel(config),
        createFlowPanel(config),
        createLayoutPanel(config),
        createOptionsPanel(activePresetId),
      ],
      defaultActiveTab: 'modal',
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
    setQuestions(INITIAL_QUESTIONS)
  }, [])

  // Get config for copy button
  const getConfigForCopy = useCallback(() => {
    return config
  }, [config])

  // Stats for display
  const stats = useMemo(() => {
    const answered = questions.filter((q) => q.status === 'answered').length
    const orphaned = questions.filter((q) => q.status === 'orphaned').length
    const pending = questions.filter((q) => q.status === 'pending').length
    return { answered, orphaned, pending, total: questions.length }
  }, [questions])

  // Handle revision flow completion - trigger StatusBar updates
  const handleRevisionComplete = useCallback(() => {
    // Start the upload simulation in StatusBar
    statusBar.startUpload()

    // Increment composite score (simulated)
    statusBar.incrementScore(Math.floor(Math.random() * 200) + 100)

    // Add upload notification after a short delay
    setTimeout(() => {
      statusBar.incrementFilesUploaded(1)
      statusBar.addNotification('upload_complete', 'Added new content to memory')
    }, 10500) // After 10s upload completes

    // Update confidence and add notification after upload
    setTimeout(() => {
      const improved = Math.floor(Math.random() * 3) + 1
      const total = stats.total
      const newConfidence = Math.min(95, statusBar.state.confidence.value + Math.floor(Math.random() * 15) + 5)

      statusBar.updateConfidence(newConfidence, improved, total)
      statusBar.addNotification(
        'confidence_change',
        `${improved} of ${total} questions improved confidence`,
        { questionsImproved: improved, totalQuestions: total }
      )
    }, 11000)

    // Add regeneration notification
    setTimeout(() => {
      statusBar.addNotification('regeneration', 'Answers regenerated with new context')
    }, 11500)
  }, [statusBar, stats.total])

  return (
    <div className="min-h-screen bg-primary">
      {/* Breadcrumbs */}
      <div className="nav-clearance px-6">
        <div className="flex items-center justify-between">
          <Breadcrumbs
            items={[
              { label: 'Playground', href: '/playground' },
              { label: 'Edit Questions' },
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
              Edit Questions
            </h1>
            <p className="text-tertiary">
              Q/A Editor modal for the Delphi design challenge. Prototype the preview →
              improve → verify loop for editing questions and answers.
            </p>
          </div>

          {/* Stats */}
          <div className="mb-8 flex flex-wrap gap-4">
            <StatCard label="Total" value={stats.total} />
            <StatCard label="Answered" value={stats.answered} variant="success" />
            <StatCard label="Orphaned" value={stats.orphaned} variant="warning" />
            <StatCard label="Pending" value={stats.pending} variant="neutral" />
          </div>

          {/* Trigger button */}
          <div className="mb-8">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-brand-solid text-white font-medium hover:bg-brand-solid-hover motion-safe:transition-colors motion-safe:duration-150"
            >
              Open Edit Questions Modal
            </button>
          </div>

          {/* Instructions */}
          <div className="bg-secondary rounded-2xl p-6 max-w-xl">
            <h3 className="text-sm font-semibold text-primary mb-3">How to test</h3>
            <ol className="space-y-2 text-sm text-secondary">
              <li>1. Click the button above to open the modal</li>
              <li>2. Select a question from the left rail to see its answer</li>
              <li>3. Add new questions using the autocomplete input</li>
              <li>4. Try different response types in the control panel:</li>
              <ul className="ml-4 mt-1 space-y-1 text-tertiary">
                <li>• <strong>Good</strong> - Shows high-confidence answer</li>
                <li>• <strong>Lousy</strong> - Shows low-confidence answer</li>
                <li>• <strong>Unsure</strong> - Triggers orphaned state with fix options</li>
              </ul>
              <li>5. Click &quot;Revise&quot; or select a fix method to test revision flows</li>
            </ol>
          </div>

          {/* Current Config Display */}
          <div className="mt-8 bg-tertiary rounded-xl p-4 max-w-xl">
            <div className="text-xs font-mono text-tertiary">
              <div className="mb-2 text-secondary font-medium">
                Current Config:
              </div>
              <pre className="text-xs overflow-auto max-h-48">
                {JSON.stringify(config, null, 2)}
              </pre>
            </div>
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

      {/* Edit Questions Modal */}
      <EditQuestionsModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        questions={questions}
        onQuestionsChange={setQuestions}
        config={config}
        onRevisionComplete={handleRevisionComplete}
      />

      {/* Fixed Status Bar */}
      <StatusBar
        state={statusBar.state}
        onDismissNotification={statusBar.dismissNotification}
        onClearNotifications={statusBar.clearNotifications}
      />
    </div>
  )
}

/**
 * Question Command Menu Playground
 *
 * Each question is rendered as its own command menu item.
 * - Top: "Add question" input with suggestions dropdown
 * - Below: List of questions as individual styled items
 * - Click a question to expand and see its answer
 *
 * @module playground/question-command-menu
 */

'use client'

import * as React from 'react'
import { useCallback, useMemo, useState } from 'react'
import { cn } from '@/lib/utils'

import {
  UnifiedControlPanel,
  type ControlChangeEvent,
} from '@/components/ui/prod/base/control-panel'

import {
  BiaxialExpandV4,
  type BiaxialExpandConfig,
} from '@/components/ui/prod/base/biaxial-command-menu-v4'

// Local imports
import type { PlaygroundConfig, Question, AnswerState } from './types'
import { DEFAULT_CONFIG, PRESETS, SAMPLE_QUESTIONS, SIMULATED_RESPONSES, QUESTION_SUGGESTIONS } from './constants'
import { buildPanelConfig, updateConfigValue } from './panels'
import {
  QuestionTrigger,
  SuggestedQuestions,
  ExpandableQuestionItem,
} from './components'
import { calculateSuggestionsHeight } from './_utils/layout'

// =============================================================================
// HELPERS
// =============================================================================

function buildAddInputConfig(config: PlaygroundConfig, suggestionsHeight: number): Partial<BiaxialExpandConfig> {
  return {
    layout: {
      triggerWidth: config.triggerWidth,
      triggerHeight: config.triggerHeight,
      panelWidth: config.panelWidth,
      maxBottomHeight: suggestionsHeight,
      borderRadius: config.borderRadius,
      topGap: 0,
      bottomGap: config.bottomGap,
      backdropTopOffset: 0,
    },
    animation: {
      duration: config.expandDuration,
      collapseDuration: config.collapseDuration,
      contentFadeDuration: 0,
      contentFadeDelay: 0,
      backdropMode: 'size',
      backdropDelay: 0,
      backdropDurationOffset: 0,
      animateSlotContainers: config.animateSlots,
      slotContainerDelay: 0,
      slotContainerDurationOffset: 100,
      expandOrigin: 'top',
    },
    appearance: {
      borderRadius: '2xl',
      shadow: '2xl',
      shine: 'shine-2-subtle',
      background: 'tertiary',
      gradient: 'subtle-depth-md',
      gradientColor: 'tertiary',
      squircle: true,
    },
    topSlot: {
      enabled: false,
      height: 0,
      background: 'none',
      borderRadius: 0,
      inset: 0,
      borderWidth: 0,
      durationOffset: 0,
    },
    bottomSlot: {
      enabled: true,
      background: 'none',
      borderRadius: 0,
      inset: 0,
      borderWidth: 0,
    },
  }
}

// =============================================================================
// MAIN PLAYGROUND
// =============================================================================

export default function QuestionCommandMenuPlayground() {
  // ---------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------
  const [config, setConfig] = useState<PlaygroundConfig>(DEFAULT_CONFIG)
  const [activePresetId, setActivePresetId] = useState<string | null>('default')

  // Question state
  const [questions, setQuestions] = useState<Question[]>(SAMPLE_QUESTIONS)
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null)
  const [inputValue, setInputValue] = useState('')
  const [answerState, setAnswerState] = useState<AnswerState>('idle')

  // Menu state
  const [addInputExpanded, setAddInputExpanded] = useState(false)
  const [lockExpanded, setLockExpanded] = useState(false)

  // ---------------------------------------------------------------------------
  // Derived state
  // ---------------------------------------------------------------------------

  // Sort questions: orphaned first, then pending, then answered
  const sortedQuestions = useMemo(() => {
    const statusOrder = ['orphaned', 'pending', 'answered'] as const
    return [...questions].sort(
      (a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
    )
  }, [questions])

  // Filter suggestions based on input
  const filteredSuggestions = useMemo(() => {
    if (!config.showSuggestions) return []
    const maxSuggestions = config.maxSuggestions ?? 5
    return QUESTION_SUGGESTIONS.slice(0, maxSuggestions)
  }, [config.showSuggestions, config.maxSuggestions])

  // Calculate suggestions height
  const suggestionsHeight = useMemo(() => {
    return calculateSuggestionsHeight(
      filteredSuggestions.length + (inputValue ? 1 : 0),
      config.maxBottomHeight
    )
  }, [filteredSuggestions.length, inputValue, config.maxBottomHeight])

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------
  const handleControlChange = useCallback((event: ControlChangeEvent) => {
    const { controlId, value } = event

    if (controlId === 'preset') {
      const preset = PRESETS.find((p) => p.id === value)
      if (preset) {
        setConfig(preset.data)
        setActivePresetId(preset.id)
      }
      return
    }

    setActivePresetId(null)
    setConfig((prev) => updateConfigValue(prev, controlId, value))
  }, [])

  const handleReset = useCallback(() => {
    setConfig(DEFAULT_CONFIG)
    setActivePresetId('default')
    setQuestions(SAMPLE_QUESTIONS)
    setExpandedQuestionId(null)
    setInputValue('')
    setAnswerState('idle')
    setAddInputExpanded(false)
    setLockExpanded(false)
  }, [])

  const handleAddInputExpandedChange = useCallback(
    (newExpanded: boolean) => {
      if (lockExpanded && !newExpanded) return
      setAddInputExpanded(newExpanded)
    },
    [lockExpanded]
  )

  const handleQuestionExpandedChange = useCallback(
    (questionId: string, expanded: boolean) => {
      if (lockExpanded && !expanded) return

      if (expanded) {
        // Collapse add input when expanding a question
        setAddInputExpanded(false)
        setExpandedQuestionId(questionId)

        const question = questions.find((q) => q.id === questionId)
        if (question) {
          // Set answer state based on question status
          if (question.answer) {
            setAnswerState(question.status === 'orphaned' ? 'orphaned' : 'success')
          } else {
            // Simulate loading
            setAnswerState('loading')
            setTimeout(() => {
              const response = SIMULATED_RESPONSES[config.responseType]
              setQuestions((prev) =>
                prev.map((q) =>
                  q.id === questionId
                    ? {
                        ...q,
                        status: response.isOrphaned ? 'orphaned' : 'answered',
                        answer: {
                          id: `a-${Date.now()}`,
                          text: response.text,
                          confidence: response.confidence,
                          generatedAt: new Date(),
                        },
                      }
                    : q
                )
              )
              setAnswerState(response.isOrphaned ? 'orphaned' : 'success')
            }, config.responseDelay)
          }
        }
      } else {
        setExpandedQuestionId(null)
        setAnswerState('idle')
      }
    },
    [lockExpanded, questions, config.responseType, config.responseDelay]
  )

  const handleAddQuestion = useCallback((text?: string) => {
    const questionText = text || inputValue.trim()
    if (!questionText || questions.length >= config.maxQuestions) return

    const newQuestion: Question = {
      id: `q-${Date.now()}`,
      text: questionText,
      status: 'pending',
    }

    setQuestions((prev) => [...prev, newQuestion])
    setInputValue('')
    setAddInputExpanded(false)

    // Auto-expand the new question
    setTimeout(() => {
      handleQuestionExpandedChange(newQuestion.id, true)
    }, 100)
  }, [inputValue, questions.length, config.maxQuestions, handleQuestionExpandedChange])

  const handleSelectSuggestion = useCallback(
    (suggestion: { id: string; text: string }) => {
      handleAddQuestion(suggestion.text)
    },
    [handleAddQuestion]
  )

  const handleDeleteQuestion = useCallback((questionId: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== questionId))
    if (expandedQuestionId === questionId) {
      setExpandedQuestionId(null)
      setAnswerState('idle')
    }
  }, [expandedQuestionId])

  const handleRegenerate = useCallback((questionId: string) => {
    setAnswerState('loading')
    setTimeout(() => {
      const response = SIMULATED_RESPONSES[config.responseType]
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === questionId
            ? {
                ...q,
                status: response.isOrphaned ? 'orphaned' : 'answered',
                answer: {
                  id: `a-${Date.now()}`,
                  text: response.text,
                  confidence: response.confidence,
                  generatedAt: new Date(),
                },
              }
            : q
        )
      )
      setAnswerState(response.isOrphaned ? 'orphaned' : 'success')
    }, config.responseDelay)
  }, [config.responseType, config.responseDelay])

  const handleImprove = useCallback((questionId: string) => {
    console.log('Improve clicked for:', questionId)
    // Would open revision flow modal
  }, [])

  const handleSaveQuestion = useCallback((questionId: string, newText: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId ? { ...q, text: newText } : q
      )
    )
  }, [])

  // ---------------------------------------------------------------------------
  // Build configs
  // ---------------------------------------------------------------------------
  const panelConfig = useMemo(
    () => buildPanelConfig(config, activePresetId),
    [config, activePresetId]
  )

  const addInputV4Config = useMemo(
    () => buildAddInputConfig(config, suggestionsHeight),
    [config, suggestionsHeight]
  )

  // Stats for footer
  const answeredCount = questions.filter((q) => q.status === 'answered').length
  const orphanedCount = questions.filter((q) => q.status === 'orphaned').length

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <div className="relative min-h-screen" style={{ height: '100vh' }}>
      <UnifiedControlPanel
        config={panelConfig}
        onChange={handleControlChange}
        onReset={handleReset}
        getConfigForCopy={() => config}
      />

      {/* Floating Controls - Left Center */}
      <div className="fixed left-4 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-2">
        <button
          type="button"
          onClick={() => setLockExpanded((prev) => !prev)}
          className={cn(
            'px-3 py-1.5 text-xs font-medium rounded-lg transition-colors shadow-md',
            lockExpanded
              ? 'bg-brand-solid text-on-brand'
              : 'bg-primary text-tertiary hover:bg-secondary hover:text-secondary border border-primary'
          )}
        >
          {lockExpanded ? 'Unlock' : 'Lock'}
        </button>

        {/* Question Count */}
        <div className="px-3 py-1.5 rounded-lg bg-primary border border-primary shadow-md">
          <span className="text-xs font-medium text-tertiary">
            {questions.length}/{config.maxQuestions}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-full flex-col items-center justify-center overflow-visible px-4">
        <div
          className="flex flex-col gap-4"
          style={{ width: config.panelWidth }}
        >
          {/* Add Question Input - Always visible, but don't expand when a question is open */}
          <BiaxialExpandV4.Root
            config={addInputV4Config}
            expanded={addInputExpanded && !expandedQuestionId}
            onExpandedChange={handleAddInputExpandedChange}
          >
            <BiaxialExpandV4.Backdrop />

            <BiaxialExpandV4.Trigger>
              <QuestionTrigger
                mode="list"
                value={inputValue}
                onValueChange={setInputValue}
                onSubmit={() => handleAddQuestion()}
                placeholder="Add question..."
                showAddButton={true}
                submitDisabled={
                  !inputValue.trim() || questions.length >= config.maxQuestions
                }
              />
            </BiaxialExpandV4.Trigger>

            <BiaxialExpandV4.Content>
              <BiaxialExpandV4.ContentWrapper>
                <BiaxialExpandV4.BottomSlot>
                  <SuggestedQuestions
                    query={inputValue}
                    suggestions={filteredSuggestions}
                    onSelect={handleSelectSuggestion}
                    onAddCustom={inputValue.trim() ? () => handleAddQuestion() : undefined}
                  />
                </BiaxialExpandV4.BottomSlot>
              </BiaxialExpandV4.ContentWrapper>
            </BiaxialExpandV4.Content>
          </BiaxialExpandV4.Root>

          {/* Questions List - Each as its own expandable command menu */}
          {sortedQuestions.length > 0 && (
            <div className="flex flex-col gap-3">
              {sortedQuestions.map((question) => (
                <ExpandableQuestionItem
                  key={question.id}
                  question={question}
                  expanded={expandedQuestionId === question.id}
                  onExpandedChange={(expanded) =>
                    handleQuestionExpandedChange(question.id, expanded)
                  }
                  config={config}
                  answerState={
                    expandedQuestionId === question.id ? answerState : 'idle'
                  }
                  onDelete={() => handleDeleteQuestion(question.id)}
                  onRegenerate={() => handleRegenerate(question.id)}
                  onImprove={() => handleImprove(question.id)}
                  onSave={(newText) => handleSaveQuestion(question.id, newText)}
                />
              ))}

              {/* Stats Footer */}
              {questions.length > 0 && !expandedQuestionId && (
                <div className="flex items-center justify-end gap-3 px-2 text-xs">
                  {orphanedCount > 0 && (
                    <span className="flex items-center gap-1 text-warning-primary">
                      <span className="inline-block w-2 h-2 rounded-full bg-warning-primary" />
                      {orphanedCount}
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-success-primary">
                    <span className="inline-block w-2 h-2 rounded-full bg-success-primary" />
                    {answeredCount}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

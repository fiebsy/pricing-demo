/**
 * Question Command Menu V4 - Flow Playground
 *
 * Demonstrates:
 * - Single question flow (QuestionFlowCard)
 * - Multiple stacked questions (QuestionsList)
 */

'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

import { QuestionFlowCard, QuestionsList } from './components'
import type { Question } from './types'

// ============================================================================
// VIEW MODES
// ============================================================================

type ViewMode = 'single' | 'list'

const VIEW_OPTIONS: { id: ViewMode; label: string; description: string }[] = [
  {
    id: 'single',
    label: 'Single Question',
    description: 'One question at a time',
  },
  {
    id: 'list',
    label: 'Question List',
    description: 'Multiple stacked questions',
  },
]

// ============================================================================
// PAGE
// ============================================================================

export default function QuestionFlowPlayground() {
  const [viewMode, setViewMode] = useState<ViewMode>('single')
  const [questions, setQuestions] = useState<Question[]>([])

  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <header className="border-b border-primary bg-secondary/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <h1 className="text-lg font-semibold text-primary">Question Flow</h1>
          <p className="text-sm text-tertiary mt-0.5">
            Single button flow with confidence indicators
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar - View Mode Selector */}
          <aside className="w-48 flex-shrink-0">
            <div className="sticky top-24 space-y-2">
              <div className="text-[10px] uppercase tracking-wider text-quaternary font-medium mb-3">
                View Mode
              </div>
              {VIEW_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setViewMode(option.id)}
                  className={cn(
                    'w-full text-left px-3 py-2.5 rounded-lg transition-all',
                    viewMode === option.id
                      ? 'bg-brand-secondary text-brand-primary'
                      : 'bg-transparent text-secondary hover:bg-tertiary'
                  )}
                >
                  <div className="text-sm font-medium">{option.label}</div>
                  <div className="text-xs text-tertiary mt-0.5">{option.description}</div>
                </button>
              ))}

              {/* Question Count (list mode) */}
              {viewMode === 'list' && questions.length > 0 && (
                <div className="mt-6 pt-4 border-t border-primary">
                  <div className="text-[10px] uppercase tracking-wider text-quaternary font-medium mb-2">
                    Questions
                  </div>
                  <div className="space-y-1">
                    {questions.map((q, i) => (
                      <div
                        key={q.id}
                        className={cn(
                          'text-xs px-2 py-1.5 rounded-md flex items-center gap-2',
                          q.status === 'response' && q.confidence !== null && q.confidence <= 0.1
                            ? 'bg-error-secondary text-error-primary'
                            : q.status === 'response'
                              ? 'bg-success-secondary text-success-primary'
                              : 'bg-tertiary text-secondary'
                        )}
                      >
                        <span className="w-4 text-center">{i + 1}</span>
                        <span className="truncate flex-1">{q.text || 'Empty'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tips */}
              <div className="mt-6 pt-4 border-t border-primary">
                <div className="text-[10px] uppercase tracking-wider text-quaternary font-medium mb-2">
                  Tips
                </div>
                <ul className="text-xs text-tertiary space-y-1.5">
                  <li>• Type a question and press Enter</li>
                  <li>• Type "test low" for low confidence</li>
                  <li>• Click Edit to modify your question</li>
                </ul>
              </div>
            </div>
          </aside>

          {/* Preview Area */}
          <div className="flex-1 min-w-0">
            <div
              className={cn(
                'bg-secondary/30 rounded-2xl p-8',
                viewMode === 'list' && 'pl-12'
              )}
            >
              {viewMode === 'single' ? (
                <div className="flex flex-col items-center">
                  <QuestionFlowCard />
                  <p className="text-sm text-tertiary mt-6 text-center">
                    Type a question and press Enter or click Add
                  </p>
                </div>
              ) : (
                <QuestionsList
                  maxQuestions={5}
                  onChange={setQuestions}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

/**
 * StackingNav V2 - Phase Indicator Component
 *
 * Debug overlay showing current phase, progress, and transition history.
 *
 * @module features/stacking-nav-v2/components
 */

'use client'

import { useState, useEffect } from 'react'
import { NavigationPhase, PHASE_COLORS, PHASE_LABELS } from '../state/navigation-phase'
import type { PhaseTransitionRecord } from '../types'

interface PhaseIndicatorProps {
  phase: NavigationPhase
  phaseStartTime: number
  transitionHistory: PhaseTransitionRecord[]
  promotingId?: string | null
  demotingId?: string | null
}

/**
 * Debug overlay for visualizing phase state.
 * Fixed position in bottom-left corner.
 */
export function PhaseIndicator({
  phase,
  phaseStartTime,
  transitionHistory,
  promotingId,
  demotingId,
}: PhaseIndicatorProps) {
  const [elapsed, setElapsed] = useState(0)

  // Update elapsed time
  useEffect(() => {
    const interval = setInterval(() => {
      const now = typeof performance !== 'undefined' ? performance.now() : Date.now()
      setElapsed(now - phaseStartTime)
    }, 50)

    return () => clearInterval(interval)
  }, [phaseStartTime])

  const color = PHASE_COLORS[phase]
  const label = PHASE_LABELS[phase]

  return (
    <div
      className="fixed bottom-4 left-4 z-50 rounded-lg bg-black/90 p-3 font-mono text-xs text-white shadow-lg"
      style={{ minWidth: '200px' }}
    >
      {/* Current Phase */}
      <div className="mb-2 flex items-center gap-2">
        <div
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: color }}
        />
        <span className="font-bold" style={{ color }}>
          {label}
        </span>
        <span className="ml-auto text-gray-400">{elapsed.toFixed(0)}ms</span>
      </div>

      {/* Active IDs */}
      {(promotingId || demotingId) && (
        <div className="mb-2 space-y-1 text-[10px]">
          {promotingId && (
            <div className="flex items-center gap-2">
              <span className="text-purple-400">promoting:</span>
              <span className="text-white">{promotingId}</span>
            </div>
          )}
          {demotingId && (
            <div className="flex items-center gap-2">
              <span className="text-pink-400">demoting:</span>
              <span className="text-white">{demotingId}</span>
            </div>
          )}
        </div>
      )}

      {/* Progress Bar */}
      <div className="mb-3 h-1.5 w-full overflow-hidden rounded-full bg-gray-700">
        <div
          className="h-full transition-all duration-100"
          style={{
            backgroundColor: color,
            width:
              phase === NavigationPhase.IDLE || phase === NavigationPhase.EXPANDED
                ? '100%'
                : `${Math.min(100, (elapsed / 500) * 100)}%`,
          }}
        />
      </div>

      {/* Transition History */}
      {transitionHistory.length > 0 && (
        <div className="border-t border-gray-700 pt-2">
          <div className="mb-1 text-[10px] uppercase text-gray-500">History</div>
          <div className="space-y-1">
            {transitionHistory.slice(-3).map((record, i) => (
              <div
                key={`${record.timestamp}-${i}`}
                className="flex items-center gap-1 text-[10px]"
              >
                <span style={{ color: PHASE_COLORS[record.from] }}>
                  {PHASE_LABELS[record.from]}
                </span>
                <span className="text-gray-500">→</span>
                <span style={{ color: PHASE_COLORS[record.to] }}>
                  {PHASE_LABELS[record.to]}
                </span>
                <span className="ml-auto text-gray-500">
                  {record.duration.toFixed(0)}ms
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

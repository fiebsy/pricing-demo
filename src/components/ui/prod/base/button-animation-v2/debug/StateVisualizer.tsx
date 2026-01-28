/**
 * ButtonAnimation V2 - State Visualizer
 *
 * Debug component for visualizing button states and animations.
 * Provides real-time inspection of state transitions and phases.
 *
 * @module prod/base/button-animation-v2/debug
 */

'use client'

import * as React from 'react'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import Bug01Icon from '@hugeicons-pro/core-stroke-rounded/Bug01Icon'
import CheckmarkCircle01Icon from '@hugeicons-pro/core-stroke-rounded/CheckmarkCircle01Icon'
import Loading01Icon from '@hugeicons-pro/core-stroke-rounded/Loading01Icon'
import ArrowRight01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowRight01Icon'

import { ButtonState, STATE_METADATA } from '../core/state-machine'
import { AnimationPhaseManager, type AnimationPhase } from '../core/animation-phases'
import { usePositionCalculator } from '../core/position-calculator'

// ============================================================================
// PROPS
// ============================================================================

export interface StateVisualizerProps {
  /** Whether to show the visualizer */
  enabled?: boolean
  /** Position of the visualizer */
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  /** Whether to show in compact mode */
  compact?: boolean
  /** Custom class name */
  className?: string
}

// ============================================================================
// STATE COLORS
// ============================================================================

const STATE_COLORS: Record<ButtonState, string> = {
  [ButtonState.COLLAPSED]: 'bg-gray-500',
  [ButtonState.COLLAPSED_IDLE]: 'bg-gray-400',
  [ButtonState.ROOT_ANCHOR]: 'bg-blue-500',
  [ButtonState.PARENT_EXPANDING]: 'bg-green-400',
  [ButtonState.PARENT_ACTIVE]: 'bg-green-500',
  [ButtonState.PARENT_ANCHORING]: 'bg-yellow-400',
  [ButtonState.PARENT_ANCHORED]: 'bg-yellow-500',
  [ButtonState.PARENT_UNANCHORING]: 'bg-yellow-600',
  [ButtonState.PARENT_COLLAPSING]: 'bg-orange-400',
  [ButtonState.CHILD_ENTERING]: 'bg-purple-400',
  [ButtonState.CHILD_IDLE]: 'bg-purple-500',
  [ButtonState.CHILD_ACTIVATING]: 'bg-pink-400',
  [ButtonState.CHILD_ACTIVE]: 'bg-pink-500',
  [ButtonState.CHILD_EXITING]: 'bg-red-400',
}

// ============================================================================
// STATE VISUALIZER COMPONENT
// ============================================================================

/**
 * Debug visualizer for button states and animations.
 * Shows real-time state transitions and animation phases.
 */
export function StateVisualizer({
  enabled = true,
  position = 'bottom-right',
  compact = false,
  className,
}: StateVisualizerProps) {
  if (!enabled) return null
  
  const phaseManager = AnimationPhaseManager.getInstance()
  const positionCalculator = usePositionCalculator()
  
  // State
  const [isExpanded, setIsExpanded] = useState(!compact)
  const [activePhases, setActivePhases] = useState<AnimationPhase[]>([])
  const [phaseHistory, setPhaseHistory] = useState<AnimationPhase[]>([])
  const [globalPhase, setGlobalPhase] = useState(phaseManager.getGlobalPhase())
  const [debugSnapshot, setDebugSnapshot] = useState(phaseManager.getDebugSnapshot())
  
  // Subscribe to phase changes
  useEffect(() => {
    const unsubscribe = phaseManager.subscribe((phase) => {
      setGlobalPhase(phase)
      setDebugSnapshot(phaseManager.getDebugSnapshot())
    })
    
    // Update at regular intervals for progress tracking
    const interval = setInterval(() => {
      const snapshot = phaseManager.getDebugSnapshot()
      setDebugSnapshot(snapshot)
      setActivePhases(snapshot.activePhases)
      setPhaseHistory(snapshot.history)
    }, 100)
    
    return () => {
      unsubscribe()
      clearInterval(interval)
    }
  }, [])
  
  // Position classes
  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
  }
  
  // ============================================================================
  // RENDER HELPERS
  // ============================================================================
  
  /**
   * Renders a state badge with color.
   */
  const renderStateBadge = (state: ButtonState, label?: string) => {
    const color = STATE_COLORS[state]
    const metadata = STATE_METADATA[state]
    
    return (
      <div className="flex items-center gap-1">
        <div className={cn('w-2 h-2 rounded-full', color)} />
        <span className="text-xs font-mono">
          {label || state.toLowerCase().replace('_', '-')}
        </span>
        {metadata.transitional && (
          <HugeIcon icon={Loading01Icon} className="w-3 h-3 animate-spin opacity-50" />
        )}
      </div>
    )
  }
  
  /**
   * Renders a transition arrow.
   */
  const renderTransition = (from: ButtonState, to: ButtonState) => {
    return (
      <div className="flex items-center gap-1 text-xs">
        {renderStateBadge(from)}
        <HugeIcon icon={ArrowRight01Icon} className="w-3 h-3 opacity-50" />
        {renderStateBadge(to)}
      </div>
    )
  }
  
  /**
   * Renders phase progress bar.
   */
  const renderProgressBar = (progress: number) => {
    return (
      <div className="w-full h-1 bg-tertiary rounded-full overflow-hidden">
        <div 
          className="h-full bg-brand-solid transition-all duration-100"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    )
  }
  
  // ============================================================================
  // RENDER
  // ============================================================================
  
  return (
    <div
      className={cn(
        'fixed z-[9999] p-4 bg-primary border border-secondary rounded-xl shadow-xl',
        'max-w-sm backdrop-blur-sm',
        positionClasses[position],
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <HugeIcon icon={Bug01Icon} size={16} className="text-brand-solid" />
          <span className="text-sm font-semibold text-primary">State Debug</span>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs text-tertiary hover:text-primary transition-colors"
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </button>
      </div>
      
      {/* Global Phase */}
      <div className="mb-3 p-2 bg-secondary rounded-lg">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-secondary">Global Phase</span>
          {globalPhase.isComplete ? (
            <HugeIcon icon={CheckmarkCircle01Icon} className="w-3 h-3 text-green-500" />
          ) : (
            <HugeIcon icon={Loading01Icon} className="w-3 h-3 animate-spin text-brand-solid" />
          )}
        </div>
        <div className="text-sm font-mono text-primary">
          {globalPhase.name}
        </div>
        {!globalPhase.isComplete && (
          <div className="mt-1 text-xs text-tertiary">
            {globalPhase.activePhases.size} active phases
          </div>
        )}
      </div>
      
      {isExpanded && (
        <>
          {/* Active Phases */}
          {activePhases.length > 0 && (
            <div className="mb-3">
              <div className="text-xs font-medium text-secondary mb-2">
                Active Transitions
              </div>
              <div className="space-y-2">
                {activePhases.map((phase) => (
                  <div 
                    key={phase.id}
                    className="p-2 bg-tertiary rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-mono text-primary">
                        {phase.elementId}
                      </span>
                      <span className="text-xs text-tertiary">
                        {Math.round(phase.progress * 100)}%
                      </span>
                    </div>
                    {renderTransition(phase.fromState, phase.toState)}
                    <div className="mt-2">
                      {renderProgressBar(phase.progress)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Phase History */}
          {phaseHistory.length > 0 && (
            <div>
              <div className="text-xs font-medium text-secondary mb-2">
                Recent History
              </div>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {phaseHistory.slice(-5).reverse().map((phase, index) => (
                  <div 
                    key={`${phase.id}-${index}`}
                    className="flex items-center justify-between p-1 bg-tertiary rounded text-xs"
                  >
                    <span className="font-mono text-quaternary">
                      {phase.elementId}
                    </span>
                    <div className="flex items-center gap-1">
                      {renderStateBadge(phase.toState)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Position Cache Info */}
          <div className="mt-3 pt-3 border-t border-secondary">
            <div className="text-xs text-quaternary">
              Position Cache: {positionCalculator.getDebugInfo().cachedPositions} items
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// ============================================================================
// MINI VISUALIZER
// ============================================================================

/**
 * Compact version for minimal debugging.
 */
export function MiniStateVisualizer() {
  const phaseManager = AnimationPhaseManager.getInstance()
  const [globalPhase, setGlobalPhase] = useState(phaseManager.getGlobalPhase())
  const [activeCount, setActiveCount] = useState(0)
  
  useEffect(() => {
    const unsubscribe = phaseManager.subscribe((phase) => {
      setGlobalPhase(phase)
      setActiveCount(phase.activePhases.size)
    })
    
    return unsubscribe
  }, [])
  
  return (
    <div className="fixed bottom-4 left-4 z-[9999] flex items-center gap-2 px-3 py-1.5 bg-primary border border-secondary rounded-full shadow-lg">
      {globalPhase.isComplete ? (
        <HugeIcon icon={CheckmarkCircle01Icon} className="w-4 h-4 text-green-500" />
      ) : (
        <HugeIcon icon={Loading01Icon} className="w-4 h-4 animate-spin text-brand-solid" />
      )}
      <span className="text-xs font-mono text-primary">
        {globalPhase.name}
      </span>
      {activeCount > 0 && (
        <span className="text-xs text-tertiary">
          ({activeCount})
        </span>
      )}
    </div>
  )
}
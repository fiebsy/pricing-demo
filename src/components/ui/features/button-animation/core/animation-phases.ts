/**
 * ButtonAnimation V2 - Animation Phase Manager
 *
 * Tracks and orchestrates animation phases across the component tree.
 * Provides debugging capabilities and ensures proper transition sequencing.
 *
 * @module prod/base/button-animation-v2/core
 */

import { ButtonState, getTransitionConfig } from './state-machine'

// ============================================================================
// PHASE TYPES
// ============================================================================

/**
 * Represents a single animation phase for a button.
 */
export interface AnimationPhase {
  /** Unique identifier for this phase */
  id: string
  /** The button element ID */
  elementId: string
  /** Starting state */
  fromState: ButtonState
  /** Target state */
  toState: ButtonState
  /** Animation start timestamp */
  startTime: number
  /** Expected duration in milliseconds */
  duration: number
  /** Current progress (0-1) */
  progress: number
  /** Whether the phase is complete */
  complete: boolean
  /** Optional metadata for debugging */
  metadata?: Record<string, any>
}

/**
 * Global animation phase for coordinating multiple buttons.
 */
export interface GlobalPhase {
  /** Phase name */
  name: 'expanding' | 'collapsing' | 'promoting' | 'idle'
  /** Active animation phases */
  activePhases: Map<string, AnimationPhase>
  /** Completed phases (for history) */
  completedPhases: AnimationPhase[]
  /** Phase start time */
  startTime: number
  /** Whether all phases are complete */
  isComplete: boolean
}

/**
 * Animation sequence for complex multi-step transitions.
 */
export interface AnimationSequence {
  /** Sequence identifier */
  id: string
  /** Sequence steps */
  steps: AnimationStep[]
  /** Current step index */
  currentStep: number
  /** Whether sequence is complete */
  complete: boolean
}

/**
 * Single step in an animation sequence.
 */
export interface AnimationStep {
  /** Step name */
  name: string
  /** Button states to transition */
  transitions: Array<{
    elementId: string
    fromState: ButtonState
    toState: ButtonState
  }>
  /** Step duration override */
  duration?: number
  /** Delay before starting */
  delay?: number
}

// ============================================================================
// PHASE MANAGER CLASS
// ============================================================================

/**
 * Manages animation phases across the button stack.
 * Singleton pattern for global state management.
 */
export class AnimationPhaseManager {
  private static instance: AnimationPhaseManager | null = null
  
  private phases: Map<string, AnimationPhase> = new Map()
  private sequences: Map<string, AnimationSequence> = new Map()
  private globalPhase: GlobalPhase = {
    name: 'idle',
    activePhases: new Map(),
    completedPhases: [],
    startTime: Date.now(),
    isComplete: true,
  }
  
  private listeners: Set<(phase: GlobalPhase) => void> = new Set()
  private debugMode: boolean = false
  private phaseHistory: AnimationPhase[] = []
  private maxHistorySize: number = 50
  
  // Private constructor for singleton
  private constructor() {}
  
  /**
   * Get singleton instance.
   */
  static getInstance(): AnimationPhaseManager {
    if (!AnimationPhaseManager.instance) {
      AnimationPhaseManager.instance = new AnimationPhaseManager()
    }
    return AnimationPhaseManager.instance
  }
  
  // ============================================================================
  // PHASE CREATION
  // ============================================================================
  
  /**
   * Creates a new animation phase for a button transition.
   */
  createPhase(
    elementId: string,
    fromState: ButtonState,
    toState: ButtonState,
    metadata?: Record<string, any>
  ): AnimationPhase {
    const transition = getTransitionConfig(fromState, toState)
    const duration = transition?.duration ?? 300
    
    const phase: AnimationPhase = {
      id: `${elementId}-${Date.now()}`,
      elementId,
      fromState,
      toState,
      startTime: Date.now(),
      duration,
      progress: 0,
      complete: false,
      metadata,
    }
    
    this.phases.set(phase.id, phase)
    this.globalPhase.activePhases.set(phase.id, phase)
    
    if (this.debugMode) {
      console.log(`[AnimationPhase] Created:`, phase)
    }
    
    // Start progress tracking
    this.trackPhaseProgress(phase.id)
    
    return phase
  }
  
  /**
   * Creates a coordinated phase for multiple buttons.
   */
  createCoordinatedPhase(
    phaseName: GlobalPhase['name'],
    transitions: Array<{
      elementId: string
      fromState: ButtonState
      toState: ButtonState
    }>
  ): void {
    // Clear previous active phases
    this.globalPhase.completedPhases.push(...this.globalPhase.activePhases.values())
    this.globalPhase.activePhases.clear()
    
    // Create new global phase
    this.globalPhase = {
      name: phaseName,
      activePhases: new Map(),
      completedPhases: this.globalPhase.completedPhases.slice(-20), // Keep last 20
      startTime: Date.now(),
      isComplete: false,
    }
    
    // Create individual phases
    transitions.forEach(({ elementId, fromState, toState }) => {
      this.createPhase(elementId, fromState, toState, { globalPhase: phaseName })
    })
    
    this.notifyListeners()
  }
  
  // ============================================================================
  // CHILD TO PARENT PROMOTION
  // ============================================================================
  
  /**
   * Special handling for child-to-parent promotion animation.
   * This is the key fix for the animation issue.
   */
  createPromotionSequence(
    childElementId: string,
    parentElementId: string | null,
    siblingIds: string[]
  ): AnimationSequence {
    const sequence: AnimationSequence = {
      id: `promotion-${Date.now()}`,
      steps: [
        // Step 1: Mark child as activating, fade out siblings
        {
          name: 'prepare-promotion',
          transitions: [
            {
              elementId: childElementId,
              fromState: ButtonState.CHILD_IDLE,
              toState: ButtonState.CHILD_ACTIVATING,
            },
            ...siblingIds.map(id => ({
              elementId: id,
              fromState: ButtonState.CHILD_IDLE,
              toState: ButtonState.CHILD_EXITING,
            })),
          ],
          duration: 150,
        },
        // Step 2: Move child to parent position
        {
          name: 'execute-promotion',
          transitions: [
            {
              elementId: childElementId,
              fromState: ButtonState.CHILD_ACTIVATING,
              toState: ButtonState.PARENT_ACTIVE,
            },
          ],
          duration: 300,
          delay: 50,
        },
        // Step 3: Anchor previous parent if exists
        ...(parentElementId ? [{
          name: 'anchor-parent',
          transitions: [{
            elementId: parentElementId,
            fromState: ButtonState.PARENT_ACTIVE,
            toState: ButtonState.PARENT_ANCHORED,
          }],
          duration: 200,
          delay: 100,
        }] : []),
      ],
      currentStep: 0,
      complete: false,
    }
    
    this.sequences.set(sequence.id, sequence)
    this.executeSequence(sequence.id)
    
    return sequence
  }
  
  // ============================================================================
  // SEQUENCE EXECUTION
  // ============================================================================
  
  /**
   * Executes an animation sequence step by step.
   */
  private async executeSequence(sequenceId: string): Promise<void> {
    const sequence = this.sequences.get(sequenceId)
    if (!sequence) return
    
    while (sequence.currentStep < sequence.steps.length) {
      const step = sequence.steps[sequence.currentStep]
      
      if (this.debugMode) {
        console.log(`[Sequence] Executing step: ${step.name}`)
      }
      
      // Wait for delay if specified
      if (step.delay) {
        await this.delay(step.delay)
      }
      
      // Create phases for all transitions in this step
      const phases = step.transitions.map(({ elementId, fromState, toState }) =>
        this.createPhase(elementId, fromState, toState, {
          sequence: sequenceId,
          step: step.name,
        })
      )
      
      // Wait for all phases to complete
      await Promise.all(phases.map(phase => this.waitForPhase(phase.id)))
      
      sequence.currentStep++
    }
    
    sequence.complete = true
    
    if (this.debugMode) {
      console.log(`[Sequence] Complete: ${sequenceId}`)
    }
  }
  
  // ============================================================================
  // PHASE TRACKING
  // ============================================================================
  
  /**
   * Tracks progress of an animation phase.
   */
  private trackPhaseProgress(phaseId: string): void {
    const phase = this.phases.get(phaseId)
    if (!phase) return
    
    const startTime = phase.startTime
    const duration = phase.duration
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      phase.progress = progress
      
      if (progress >= 1) {
        phase.complete = true
        this.globalPhase.activePhases.delete(phaseId)
        this.globalPhase.completedPhases.push(phase)
        
        // Add to history
        this.phaseHistory.push(phase)
        if (this.phaseHistory.length > this.maxHistorySize) {
          this.phaseHistory.shift()
        }
        
        // Check if global phase is complete
        if (this.globalPhase.activePhases.size === 0) {
          this.globalPhase.isComplete = true
          this.notifyListeners()
        }
        
        if (this.debugMode) {
          console.log(`[AnimationPhase] Complete:`, phaseId)
        }
      } else {
        requestAnimationFrame(updateProgress)
      }
    }
    
    requestAnimationFrame(updateProgress)
  }
  
  /**
   * Waits for a phase to complete.
   */
  private waitForPhase(phaseId: string): Promise<void> {
    return new Promise(resolve => {
      const checkComplete = () => {
        const phase = this.phases.get(phaseId)
        if (!phase || phase.complete) {
          resolve()
        } else {
          requestAnimationFrame(checkComplete)
        }
      }
      checkComplete()
    })
  }
  
  // ============================================================================
  // UTILITIES
  // ============================================================================
  
  /**
   * Utility delay function.
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  
  /**
   * Gets current phase for an element.
   */
  getElementPhase(elementId: string): AnimationPhase | undefined {
    for (const phase of this.phases.values()) {
      if (phase.elementId === elementId && !phase.complete) {
        return phase
      }
    }
    return undefined
  }
  
  /**
   * Gets the current global phase.
   */
  getGlobalPhase(): GlobalPhase {
    return this.globalPhase
  }
  
  /**
   * Gets phase history for debugging.
   */
  getPhaseHistory(): AnimationPhase[] {
    return [...this.phaseHistory]
  }
  
  /**
   * Clears all phases and resets state.
   */
  reset(): void {
    this.phases.clear()
    this.sequences.clear()
    this.globalPhase = {
      name: 'idle',
      activePhases: new Map(),
      completedPhases: [],
      startTime: Date.now(),
      isComplete: true,
    }
    this.phaseHistory = []
    this.notifyListeners()
  }
  
  // ============================================================================
  // DEBUG & MONITORING
  // ============================================================================
  
  /**
   * Enables debug mode for console logging.
   */
  setDebugMode(enabled: boolean): void {
    this.debugMode = enabled
  }
  
  /**
   * Subscribes to phase changes.
   */
  subscribe(listener: (phase: GlobalPhase) => void): () => void {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }
  
  /**
   * Notifies all listeners of phase changes.
   */
  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.globalPhase))
  }
  
  /**
   * Gets a snapshot of current animation state for debugging.
   */
  getDebugSnapshot(): {
    globalPhase: GlobalPhase
    activePhases: AnimationPhase[]
    sequences: AnimationSequence[]
    history: AnimationPhase[]
  } {
    return {
      globalPhase: this.globalPhase,
      activePhases: Array.from(this.phases.values()).filter(p => !p.complete),
      sequences: Array.from(this.sequences.values()),
      history: this.phaseHistory.slice(-10),
    }
  }
}

// ============================================================================
// REACT HOOK
// ============================================================================

/**
 * React hook for accessing the animation phase manager.
 */
export function useAnimationPhases() {
  const manager = AnimationPhaseManager.getInstance()
  return manager
}
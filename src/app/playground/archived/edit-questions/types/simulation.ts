/**
 * Edit Questions Playground - Simulation Types
 *
 * Types for simulated LLM responses.
 *
 * @module playground/edit-questions/types/simulation
 */

/** Configurable answer response types for simulation */
export type SimulatedResponseType = 'good' | 'lousy' | 'unsure'

/** Structure for a simulated response */
export interface SimulatedResponse {
  type: SimulatedResponseType
  confidence: number
  text: string
  isOrphaned: boolean
}

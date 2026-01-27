/**
 * Edit Questions Playground - Question Types
 *
 * Core types for questions and answers in the Q/A Editor.
 *
 * @module playground/edit-questions/types/question
 */

/** Status of a question in the list */
export type QuestionStatus = 'pending' | 'answered' | 'orphaned'

/** An answer generated for a question */
export interface Answer {
  id: string
  text: string
  confidence: number // 0-1 scale
  generatedAt: Date
}

/** A question in the Q/A system */
export interface Question {
  id: string
  text: string
  status: QuestionStatus
  answer?: Answer
}

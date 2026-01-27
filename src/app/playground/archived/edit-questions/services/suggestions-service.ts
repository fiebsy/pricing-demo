/**
 * Edit Questions Playground - Suggestions Service
 *
 * Handles question suggestions and search functionality:
 * - Search/filter suggested questions
 * - Deduplicate against existing questions
 * - Fuzzy matching support
 *
 * @module playground/edit-questions/services
 */

import type { Question } from '../types'
import { SUGGESTED_QUESTIONS } from '../constants'

// =============================================================================
// TYPES
// =============================================================================

export interface SuggestionMatch {
  text: string
  score: number
  matchType: 'exact' | 'prefix' | 'contains' | 'fuzzy'
}

export interface SearchOptions {
  /** Maximum number of results to return */
  limit?: number
  /** Minimum score threshold (0-1) for fuzzy matches */
  minScore?: number
  /** Existing questions to exclude from suggestions */
  existingQuestions?: Question[]
  /** Whether to include fuzzy matches */
  enableFuzzy?: boolean
}

const DEFAULT_OPTIONS: Required<SearchOptions> = {
  limit: 8,
  minScore: 0.3,
  existingQuestions: [],
  enableFuzzy: true,
}

// =============================================================================
// FUZZY MATCHING
// =============================================================================

/**
 * Simple Levenshtein distance calculation for fuzzy matching.
 */
function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = []

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i]
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j] + 1 // deletion
        )
      }
    }
  }

  return matrix[b.length][a.length]
}

/**
 * Calculate fuzzy match score (0-1) between query and text.
 */
function fuzzyScore(query: string, text: string): number {
  const q = query.toLowerCase()
  const t = text.toLowerCase()

  // Exact match
  if (t === q) return 1

  // Contains match (slightly lower score)
  if (t.includes(q)) return 0.9

  // Starts with (good score)
  if (t.startsWith(q)) return 0.95

  // Word match (check if any word starts with query)
  const words = t.split(/\s+/)
  if (words.some((word) => word.startsWith(q))) return 0.85

  // Fuzzy match using Levenshtein
  const distance = levenshteinDistance(q, t.slice(0, q.length + 5))
  const maxLen = Math.max(q.length, t.length)
  const score = 1 - distance / maxLen

  return Math.max(0, score)
}

/**
 * Determine match type for display purposes.
 */
function getMatchType(query: string, text: string): SuggestionMatch['matchType'] {
  const q = query.toLowerCase()
  const t = text.toLowerCase()

  if (t === q) return 'exact'
  if (t.startsWith(q)) return 'prefix'
  if (t.includes(q)) return 'contains'
  return 'fuzzy'
}

// =============================================================================
// SEARCH SERVICE
// =============================================================================

/**
 * Search suggestions based on query.
 *
 * Returns matched suggestions sorted by relevance score.
 *
 * Usage:
 * ```tsx
 * const matches = searchSuggestions('leadership', {
 *   limit: 5,
 *   existingQuestions: questions,
 * })
 * // Returns: [{ text: 'What is your leadership style?', score: 0.9, matchType: 'contains' }, ...]
 * ```
 */
export function searchSuggestions(
  query: string,
  options: SearchOptions = {}
): SuggestionMatch[] {
  const opts = { ...DEFAULT_OPTIONS, ...options }
  const { limit, minScore, existingQuestions, enableFuzzy } = opts

  // Empty query returns no suggestions
  if (!query.trim()) {
    return []
  }

  const normalizedQuery = query.toLowerCase().trim()

  // Get set of existing question texts for deduplication
  const existingTexts = new Set(
    existingQuestions.map((q) => q.text.toLowerCase())
  )

  // Score and filter suggestions
  const matches: SuggestionMatch[] = SUGGESTED_QUESTIONS
    .filter((text) => !existingTexts.has(text.toLowerCase()))
    .map((text) => {
      const score = fuzzyScore(normalizedQuery, text)
      const matchType = getMatchType(normalizedQuery, text)
      return { text, score, matchType }
    })
    .filter((match) => {
      // For non-fuzzy mode, only include contains/prefix/exact matches
      if (!enableFuzzy && match.matchType === 'fuzzy') {
        return false
      }
      return match.score >= minScore
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)

  return matches
}

/**
 * Get all suggestions (unfiltered).
 *
 * Useful for showing a default list or dropdown.
 */
export function getAllSuggestions(options: Pick<SearchOptions, 'existingQuestions' | 'limit'> = {}): string[] {
  const { existingQuestions = [], limit = 15 } = options

  const existingTexts = new Set(
    existingQuestions.map((q) => q.text.toLowerCase())
  )

  return SUGGESTED_QUESTIONS
    .filter((text) => !existingTexts.has(text.toLowerCase()))
    .slice(0, limit)
}

/**
 * Check if a question text already exists.
 */
export function isDuplicateQuestion(text: string, existingQuestions: Question[]): boolean {
  const normalizedText = text.toLowerCase().trim()
  return existingQuestions.some((q) => q.text.toLowerCase().trim() === normalizedText)
}

/**
 * Get suggestion count for UI display.
 */
export function getSuggestionCount(query: string, options: SearchOptions = {}): number {
  return searchSuggestions(query, { ...options, limit: 100 }).length
}

// =============================================================================
// HOOK FOR CONVENIENCE
// =============================================================================

import { useMemo, useState, useCallback } from 'react'

export interface UseSuggestionsOptions {
  existingQuestions: Question[]
  limit?: number
  enableFuzzy?: boolean
}

export interface UseSuggestionsReturn {
  /** Current search query */
  query: string
  /** Set the search query */
  setQuery: (query: string) => void
  /** Filtered suggestions based on query */
  suggestions: SuggestionMatch[]
  /** All suggestions (when no query) */
  allSuggestions: string[]
  /** Whether query is empty */
  isEmpty: boolean
  /** Clear the query */
  clear: () => void
}

/**
 * Hook for managing suggestion search state.
 *
 * Usage:
 * ```tsx
 * const { query, setQuery, suggestions, clear } = useSuggestions({
 *   existingQuestions: questions,
 *   limit: 8,
 * })
 *
 * return (
 *   <input value={query} onChange={(e) => setQuery(e.target.value)} />
 *   {suggestions.map(s => <div key={s.text}>{s.text}</div>)}
 * )
 * ```
 */
export function useSuggestions(options: UseSuggestionsOptions): UseSuggestionsReturn {
  const { existingQuestions, limit = 8, enableFuzzy = true } = options
  const [query, setQuery] = useState('')

  const suggestions = useMemo(
    () =>
      searchSuggestions(query, {
        existingQuestions,
        limit,
        enableFuzzy,
      }),
    [query, existingQuestions, limit, enableFuzzy]
  )

  const allSuggestions = useMemo(
    () => getAllSuggestions({ existingQuestions, limit }),
    [existingQuestions, limit]
  )

  const isEmpty = query.trim() === ''

  const clear = useCallback(() => {
    setQuery('')
  }, [])

  return {
    query,
    setQuery,
    suggestions,
    allSuggestions,
    isEmpty,
    clear,
  }
}

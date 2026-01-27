/**
 * Question Command Menu V3 - Validation Utilities
 *
 * Word count and question length validation.
 */

/**
 * Count words in a text string.
 * Words are separated by whitespace.
 */
export function countWords(text: string): number {
  if (!text || !text.trim()) return 0
  return text.trim().split(/\s+/).length
}

/**
 * Validate question length against max word count.
 */
export interface ValidationResult {
  valid: boolean
  wordCount: number
  message?: string
}

export function validateQuestionLength(
  text: string,
  maxWords: number
): ValidationResult {
  const wordCount = countWords(text)

  if (wordCount === 0) {
    return {
      valid: false,
      wordCount,
      message: 'Question cannot be empty',
    }
  }

  if (wordCount > maxWords) {
    return {
      valid: false,
      wordCount,
      message: `Question exceeds ${maxWords} word limit (${wordCount} words)`,
    }
  }

  return {
    valid: true,
    wordCount,
  }
}

/**
 * Get a preview of the text truncated to max words.
 */
export function truncateToMaxWords(text: string, maxWords: number): string {
  const words = text.trim().split(/\s+/)
  if (words.length <= maxWords) return text.trim()
  return words.slice(0, maxWords).join(' ') + '...'
}

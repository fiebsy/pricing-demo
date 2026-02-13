// =============================================================================
// Color Token Validation Utilities
// =============================================================================
// Validates that CSS variables in token definitions actually exist in the theme.
// Use in development or tests to catch mismatches early.
// =============================================================================

import {
  SEMANTIC_TEXT_COLORS,
  SEMANTIC_BG_COLORS,
  SEMANTIC_BORDER_COLORS,
  type SemanticColorOption,
} from './colors'

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface ValidationResult {
  valid: boolean
  token: SemanticColorOption
  resolvedValue: string | null
  error?: string
}

export interface ValidationSummary {
  total: number
  valid: number
  invalid: number
  results: ValidationResult[]
}

// -----------------------------------------------------------------------------
// Validation Functions
// -----------------------------------------------------------------------------

/**
 * Validate a single CSS variable resolves to a value
 * Must be called in browser context (needs document)
 */
export function validateCssVariable(cssVar: string): string | null {
  if (typeof document === 'undefined') {
    return null
  }
  const value = getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim()
  return value || null
}

/**
 * Validate a single color token
 */
export function validateToken(token: SemanticColorOption): ValidationResult {
  const resolvedValue = validateCssVariable(token.cssVar)

  if (resolvedValue) {
    return { valid: true, token, resolvedValue }
  }

  return {
    valid: false,
    token,
    resolvedValue: null,
    error: `CSS variable "${token.cssVar}" did not resolve. Check theme.css.`,
  }
}

/**
 * Validate all tokens in an array
 */
export function validateTokens(tokens: SemanticColorOption[]): ValidationSummary {
  const results = tokens.map(validateToken)
  const valid = results.filter((r) => r.valid).length
  const invalid = results.filter((r) => !r.valid).length

  return {
    total: tokens.length,
    valid,
    invalid,
    results,
  }
}

/**
 * Validate all semantic color tokens
 * Returns a summary of validation results for text, background, and border colors
 */
export function validateAllColorTokens(): {
  text: ValidationSummary
  background: ValidationSummary
  border: ValidationSummary
  allValid: boolean
} {
  const text = validateTokens(SEMANTIC_TEXT_COLORS)
  const background = validateTokens(SEMANTIC_BG_COLORS)
  const border = validateTokens(SEMANTIC_BORDER_COLORS)

  return {
    text,
    background,
    border,
    allValid: text.invalid === 0 && background.invalid === 0 && border.invalid === 0,
  }
}

// -----------------------------------------------------------------------------
// Console Reporters
// -----------------------------------------------------------------------------

/**
 * Log validation results to console with formatting
 * Useful for debugging in browser dev tools
 */
export function logValidationResults(summary: ValidationSummary, label: string): void {
  const icon = summary.invalid === 0 ? '✅' : '❌'
  console.group(`${icon} ${label}: ${summary.valid}/${summary.total} valid`)

  if (summary.invalid > 0) {
    console.warn('Invalid tokens:')
    summary.results
      .filter((r) => !r.valid)
      .forEach((r) => {
        console.warn(`  - ${r.token.label} (${r.token.value}): ${r.error}`)
      })
  }

  console.groupEnd()
}

/**
 * Run full validation and log results
 * Call from browser console: import { runValidation } from '...' then runValidation()
 */
export function runValidation(): void {
  console.log('🔍 Validating color tokens...\n')

  const results = validateAllColorTokens()

  logValidationResults(results.text, 'Text Colors')
  logValidationResults(results.background, 'Background Colors')
  logValidationResults(results.border, 'Border Colors')

  console.log('')
  if (results.allValid) {
    console.log('✅ All color tokens are valid!')
  } else {
    console.error('❌ Some color tokens failed validation. See warnings above.')
  }
}

// -----------------------------------------------------------------------------
// Tailwind Class Validation
// -----------------------------------------------------------------------------

/**
 * Check if a token's value would produce a valid Tailwind class
 * This is a static check - it doesn't verify the class exists in CSS
 */
export function getExpectedTailwindClass(
  token: SemanticColorOption,
  prefix: 'text' | 'bg' | 'border'
): string {
  return `${prefix}-${token.value}`
}

/**
 * Generate a report of expected Tailwind classes for all tokens
 * Useful for cross-referencing with colors.css utilities
 */
export function generateTailwindClassReport(): {
  text: Array<{ token: string; class: string; cssVar: string }>
  background: Array<{ token: string; class: string; cssVar: string }>
  border: Array<{ token: string; class: string; cssVar: string }>
} {
  return {
    text: SEMANTIC_TEXT_COLORS.map((t) => ({
      token: t.label,
      class: getExpectedTailwindClass(t, 'text'),
      cssVar: t.cssVar,
    })),
    background: SEMANTIC_BG_COLORS.map((t) => ({
      token: t.label,
      class: getExpectedTailwindClass(t, 'bg'),
      cssVar: t.cssVar,
    })),
    border: SEMANTIC_BORDER_COLORS.map((t) => ({
      token: t.label,
      class: getExpectedTailwindClass(t, 'border'),
      cssVar: t.cssVar,
    })),
  }
}

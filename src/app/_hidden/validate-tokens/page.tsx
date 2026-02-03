'use client'

/**
 * Token Validation Page
 *
 * Dev tool for validating that all color tokens resolve correctly.
 * Access at: /validate-tokens (in _hidden folder)
 */

import { useEffect, useState } from 'react'
import {
  validateAllColorTokens,
  generateTailwindClassReport,
  type ValidationSummary,
} from '@/components/ui/patterns/control-panel/tokens'

interface ValidationState {
  text: ValidationSummary | null
  background: ValidationSummary | null
  border: ValidationSummary | null
  allValid: boolean | null
}

export default function ValidateTokensPage() {
  const [results, setResults] = useState<ValidationState>({
    text: null,
    background: null,
    border: null,
    allValid: null,
  })
  const [showClasses, setShowClasses] = useState(false)

  useEffect(() => {
    // Run validation after mount (needs DOM)
    const validation = validateAllColorTokens()
    setResults(validation)
  }, [])

  const classReport = generateTailwindClassReport()

  return (
    <div className="bg-primary text-primary min-h-screen p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-2xl font-semibold">Color Token Validation</h1>
        <p className="text-secondary mb-8">
          Validates that all CSS variables in token definitions resolve correctly.
        </p>

        {results.allValid === null ? (
          <div className="text-secondary">Running validation...</div>
        ) : (
          <>
            {/* Summary */}
            <div
              className={`mb-8 rounded-lg p-4 ${
                results.allValid
                  ? 'bg-success-primary text-primary'
                  : 'bg-error-primary text-white'
              }`}
            >
              {results.allValid
                ? '✅ All color tokens are valid!'
                : '❌ Some color tokens failed validation'}
            </div>

            {/* Results */}
            <div className="space-y-6">
              <ValidationSection title="Text Colors" summary={results.text} />
              <ValidationSection title="Background Colors" summary={results.background} />
              <ValidationSection title="Border Colors" summary={results.border} />
            </div>

            {/* Tailwind Class Report */}
            <div className="mt-12">
              <button
                onClick={() => setShowClasses(!showClasses)}
                className="bg-secondary hover:bg-tertiary rounded px-4 py-2 text-sm transition-colors"
              >
                {showClasses ? 'Hide' : 'Show'} Expected Tailwind Classes
              </button>

              {showClasses && (
                <div className="bg-secondary mt-4 rounded-lg p-4">
                  <h3 className="mb-4 font-medium">Expected Tailwind Classes</h3>
                  <div className="grid gap-6 md:grid-cols-3">
                    <ClassList title="Text" items={classReport.text} />
                    <ClassList title="Background" items={classReport.background} />
                    <ClassList title="Border" items={classReport.border} />
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function ValidationSection({
  title,
  summary,
}: {
  title: string
  summary: ValidationSummary | null
}) {
  if (!summary) return null

  const hasInvalid = summary.invalid > 0

  return (
    <div className="bg-secondary rounded-lg p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-medium">{title}</h2>
        <span
          className={`rounded px-2 py-0.5 text-sm ${
            hasInvalid ? 'bg-error-primary text-white' : 'bg-success-primary'
          }`}
        >
          {summary.valid}/{summary.total} valid
        </span>
      </div>

      {hasInvalid && (
        <div className="space-y-2">
          {summary.results
            .filter((r) => !r.valid)
            .map((r) => (
              <div
                key={r.token.value}
                className="bg-error-secondary rounded p-2 text-sm"
              >
                <div className="font-medium">{r.token.label}</div>
                <code className="text-tertiary text-xs">{r.token.cssVar}</code>
                <div className="text-error-primary mt-1 text-xs">{r.error}</div>
              </div>
            ))}
        </div>
      )}

      {!hasInvalid && (
        <div className="text-tertiary text-sm">All tokens resolved successfully</div>
      )}
    </div>
  )
}

function ClassList({
  title,
  items,
}: {
  title: string
  items: Array<{ token: string; class: string; cssVar: string }>
}) {
  return (
    <div>
      <h4 className="text-secondary mb-2 text-sm font-medium">{title}</h4>
      <div className="space-y-1">
        {items.map((item) => (
          <div key={item.class} className="text-xs">
            <code className="text-brand-primary">{item.class}</code>
            <span className="text-quaternary ml-2">→ {item.cssVar}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

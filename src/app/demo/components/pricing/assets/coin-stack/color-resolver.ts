/**
 * Color Resolution Utility
 *
 * Maps semantic color tokens to CSS values.
 */

// Color mapping from semantic tokens to CSS values
const COLOR_MAP: Record<string, string> = {
  white: '#ffffff',
  black: '#000000',
  'gray-50': '#fafafa',
  'gray-100': '#f4f4f5',
  'gray-200': '#e4e4e7',
  'gray-300': '#d4d4d8',
  'gray-400': '#a1a1aa',
  'gray-500': '#71717a',
  'gray-600': '#52525b',
  'gray-700': '#3f3f46',
  'gray-800': '#27272a',
  'gray-900': '#18181b',
  'gold-300': '#fcd34d',
  'gold-400': '#fbbf24',
  'gold-500': '#f59e0b',
  'gold-600': '#d97706',
  'amber-300': '#fcd34d',
  'amber-400': '#fbbf24',
  'amber-500': '#f59e0b',
  'blue-300': '#93c5fd',
  'blue-400': '#60a5fa',
  'blue-500': '#3b82f6',
  'blue-600': '#2563eb',
  'sky-300': '#7dd3fc',
  'sky-400': '#38bdf8',
  'sky-500': '#0ea5e9',
  'cyan-300': '#67e8f9',
  'cyan-400': '#22d3ee',
  'indigo-400': '#818cf8',
  'indigo-500': '#6366f1',
  'violet-400': '#a78bfa',
  'violet-500': '#8b5cf6',
  'brand-primary': 'var(--color-brand-primary, #6366f1)',
  'brand-secondary': 'var(--color-brand-secondary, #8b5cf6)',
  transparent: 'transparent',
}

/**
 * Resolve semantic color to CSS value
 */
export function resolveColor(token: string): string {
  return COLOR_MAP[token] ?? token
}

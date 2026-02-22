import type { SelectOption } from '@/components/ui/patterns/control-panel'

// Slider configuration type (local definition)
interface SliderConfig {
  min: number
  max: number
  step: number
}

// Semantic color options for fills
export const SEMANTIC_COLOR_OPTIONS: SelectOption[] = [
  { value: 'white', label: 'White' },
  { value: 'black', label: 'Black' },
  { value: 'gray-50', label: 'Gray 50' },
  { value: 'gray-100', label: 'Gray 100' },
  { value: 'gray-200', label: 'Gray 200' },
  { value: 'gray-300', label: 'Gray 300' },
  { value: 'gray-400', label: 'Gray 400' },
  { value: 'gray-500', label: 'Gray 500' },
  { value: 'gray-600', label: 'Gray 600' },
  { value: 'gray-700', label: 'Gray 700' },
  { value: 'gray-800', label: 'Gray 800' },
  { value: 'gray-900', label: 'Gray 900' },
  { value: 'gold-300', label: 'Gold 300' },
  { value: 'gold-400', label: 'Gold 400' },
  { value: 'gold-500', label: 'Gold 500' },
  { value: 'gold-600', label: 'Gold 600' },
  { value: 'amber-300', label: 'Amber 300' },
  { value: 'amber-400', label: 'Amber 400' },
  { value: 'amber-500', label: 'Amber 500' },
  { value: 'blue-300', label: 'Blue 300' },
  { value: 'blue-400', label: 'Blue 400' },
  { value: 'blue-500', label: 'Blue 500' },
  { value: 'blue-600', label: 'Blue 600' },
  { value: 'sky-300', label: 'Sky 300' },
  { value: 'sky-400', label: 'Sky 400' },
  { value: 'sky-500', label: 'Sky 500' },
  { value: 'cyan-300', label: 'Cyan 300' },
  { value: 'cyan-400', label: 'Cyan 400' },
  { value: 'indigo-400', label: 'Indigo 400' },
  { value: 'indigo-500', label: 'Indigo 500' },
  { value: 'violet-400', label: 'Violet 400' },
  { value: 'violet-500', label: 'Violet 500' },
  { value: 'brand-primary', label: 'Brand Primary' },
  { value: 'brand-secondary', label: 'Brand Secondary' },
  { value: 'transparent', label: 'Transparent' },
]

// Gradient type options
export const GRADIENT_TYPE_OPTIONS: SelectOption[] = [
  { value: 'linear', label: 'Linear' },
  { value: 'radial', label: 'Radial' },
]

// Gradient direction options
export const GRADIENT_DIRECTION_OPTIONS: SelectOption[] = [
  { value: 'to-bottom', label: 'To Bottom' },
  { value: 'to-top', label: 'To Top' },
  { value: 'to-right', label: 'To Right' },
  { value: 'to-left', label: 'To Left' },
  { value: 'to-bottom-right', label: 'To Bottom Right' },
  { value: 'to-bottom-left', label: 'To Bottom Left' },
  { value: 'to-top-right', label: 'To Top Right' },
  { value: 'to-top-left', label: 'To Top Left' },
]

// Drop shadow options
export const DROP_SHADOW_OPTIONS: SelectOption[] = [
  { value: 'none', label: 'None' },
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
  { value: 'xl', label: 'Extra Large' },
]

// Inner glow options
export const INNER_GLOW_OPTIONS: SelectOption[] = [
  { value: 'none', label: 'None' },
  { value: 'subtle', label: 'Subtle' },
  { value: 'medium', label: 'Medium' },
  { value: 'strong', label: 'Strong' },
]

// Shine overlay options
export const SHINE_OVERLAY_OPTIONS: SelectOption[] = [
  { value: 'none', label: 'None' },
  { value: 'subtle', label: 'Subtle' },
  { value: 'medium', label: 'Medium' },
  { value: 'strong', label: 'Strong' },
]

// Page background options
export const PAGE_BACKGROUND_OPTIONS: SelectOption[] = [
  { value: 'primary', label: 'Primary' },
  { value: 'secondary', label: 'Secondary' },
  { value: 'tertiary', label: 'Tertiary' },
]

// Slider configurations
export const SLIDER_CONFIGS: Record<string, SliderConfig> = {
  width: { min: 50, max: 400, step: 10 },
  strokeWidth: { min: 0, max: 6, step: 0.5 },
  opacity: { min: 0, max: 100, step: 5 },
}

// Color mapping from semantic tokens to CSS values
export const COLOR_MAP: Record<string, string> = {
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

// Resolve semantic color to CSS value
export function resolveColor(token: string): string {
  return COLOR_MAP[token] ?? token
}

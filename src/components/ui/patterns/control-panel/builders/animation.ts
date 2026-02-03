// =============================================================================
// Animation Section Builder
// =============================================================================
// Creates an animation controls section with duration, easing, delay.
// =============================================================================

import type { Section, Control } from '../types'
import {
  EASING_OPTIONS,
  COMMON_EASING_OPTIONS,
  DURATION_OPTIONS,
  DELAY_OPTIONS,
  SPRING_OPTIONS,
} from '../tokens/animation'
import { createSection, type BuilderOptions, type GroupDefinition } from './utils'

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface AnimationValues {
  duration?: string
  easing?: string
  delay?: string
  spring?: string
  stagger?: number
}

export interface AnimationOptions extends BuilderOptions {
  /** Use common easing subset (default: true) */
  useCommonEasings?: boolean
  /** Include spring controls (default: false) */
  includeSpring?: boolean
  /** Include stagger control (default: false) */
  includeStagger?: boolean
  /** Max stagger value in ms (default: 200) */
  maxStagger?: number
}

// -----------------------------------------------------------------------------
// Builder
// -----------------------------------------------------------------------------

/**
 * Create an animation controls section
 *
 * @example
 * ```ts
 * createAnimationSection({
 *   values: { duration: '200', easing: 'ease-out' },
 *   options: { includeSpring: true, exclude: ['delay'] }
 * })
 * ```
 */
export function createAnimationSection(config: {
  values: AnimationValues
  options?: AnimationOptions
}): Section {
  const { values, options = {} } = config
  const easingOptions = options.useCommonEasings !== false ? COMMON_EASING_OPTIONS : EASING_OPTIONS
  const maxStagger = options.maxStagger ?? 200

  const groups: GroupDefinition[] = [
    {
      key: 'duration',
      title: 'Duration',
      controls: [
        {
          type: 'select',
          id: 'duration',
          label: 'Duration',
          value: values.duration ?? '200',
          options: DURATION_OPTIONS.map((o) => ({
            label: o.label,
            value: o.value,
          })),
        } as Control,
      ],
    },
    {
      key: 'easing',
      title: 'Easing',
      controls: [
        {
          type: 'select',
          id: 'easing',
          label: 'Easing',
          value: values.easing ?? 'ease-out',
          options: easingOptions.map((o) => ({
            label: o.label,
            value: o.value,
          })),
        } as Control,
      ],
    },
    {
      key: 'delay',
      title: 'Delay',
      controls: [
        {
          type: 'select',
          id: 'delay',
          label: 'Delay',
          value: values.delay ?? '0',
          options: DELAY_OPTIONS.map((o) => ({
            label: o.label,
            value: o.value,
          })),
        } as Control,
      ],
    },
  ]

  // Add spring controls if enabled
  if (options.includeSpring) {
    groups.push({
      key: 'spring',
      title: 'Spring',
      controls: [
        {
          type: 'select',
          id: 'spring',
          label: 'Spring Preset',
          value: values.spring ?? 'gentle',
          options: SPRING_OPTIONS.map((o) => ({
            label: o.label,
            value: o.value,
          })),
        } as Control,
      ],
    })
  }

  // Add stagger control if enabled
  if (options.includeStagger) {
    groups.push({
      key: 'stagger',
      title: 'Stagger',
      controls: [
        {
          type: 'slider',
          id: 'stagger',
          label: 'Stagger',
          value: values.stagger ?? 0,
          min: 0,
          max: maxStagger,
          step: 10,
          formatLabel: (v) => `${v}ms`,
        } as Control,
      ],
    })
  }

  return createSection(
    {
      id: 'animation',
      title: 'Animation',
      sectionType: 'animation',
    },
    groups,
    options
  )
}

/**
 * Get animation groups without section wrapper
 */
export function getAnimationGroups(config: {
  values: AnimationValues
  options?: AnimationOptions
}) {
  const section = createAnimationSection(config)
  return section.groups ?? []
}

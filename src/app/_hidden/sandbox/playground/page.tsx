/**
 * Profile Playground
 *
 * Interactive testing environment for the Delphi-inspired profile components.
 * Demonstrates semantic design token usage and view/edit mode switching.
 *
 * @module a/playground
 */

'use client'

import { useCallback, useMemo, useState } from 'react'
import { Breadcrumbs } from '@/components/ui/deprecated/nav'
import {
  UnifiedControlPanel,
  type ControlChangeEvent,
  type Section as ControlSection,
  type UnifiedControlPanelProps,
} from '@/components/ui/prod/base/control-panel'
import type { ProfileMode, ProfileFormData } from './types'
import { EditProfileForm } from './components/edit-profile-form'
import { ViewProfileContent } from './components/view-profile-content'

type UnifiedControlPanelConfig = UnifiedControlPanelProps['config']

// =============================================================================
// TYPES
// =============================================================================

type SemanticColor = 'primary' | 'secondary' | 'tertiary' | 'quaternary'
type TextColor = 'primary' | 'secondary' | 'tertiary'

// Surface colors - BG tokens for the gradient base
type GradientSurfaceColor =
  | 'bg-primary'
  | 'bg-secondary'
  | 'bg-tertiary'
  | 'bg-quaternary'
  | 'bg-brand-primary'
  | 'bg-brand-secondary'
  | 'bg-brand-solid'
  | 'bg-inverted-primary'
  | 'bg-inverted-secondary'

// Shadow colors - FG/Border tokens for depth (darker tones)
type GradientShadowColor =
  | 'alpha-black'
  | 'fg-primary'
  | 'fg-secondary'
  | 'fg-tertiary'
  | 'fg-brand-primary'
  | 'border-primary'
  | 'border-secondary'
  | 'border-brand'

// Highlight colors - Light tones for glare/shine effects
type GradientHighlightColor =
  | 'alpha-white'
  | 'bg-inverted-primary'
  | 'bg-inverted-secondary'
  | 'fg-primary'
  | 'fg-brand-secondary'
  | 'border-brand'

type ShinePreset = 'none' | '0' | '1' | '2' | '3' | 'brand'
type ShineIntensity = 'subtle' | 'normal' | 'intense'
type ShineShadow = 'none' | 'xs' | 'sm' | 'md' | 'lg'
type GradientPreset = 'custom' | 'subtle-glass' | 'frosted-card' | 'brand-glow' | 'dark-depth' | 'minimal'

interface PlaygroundConfig {
  // Display
  mode: ProfileMode
  // Layout
  topPadding: number
  contentMaxWidth: number
  // Page Background
  pageBackground: SemanticColor
  // Gradient
  gradientEnabled: boolean
  gradientOpacity: number
  // Gradient - Colors (semantic)
  gradientSurfaceColor: GradientSurfaceColor
  gradientShadowColor: GradientShadowColor
  gradientHighlightColor: GradientHighlightColor
  // Gradient - Potency (master intensity)
  gradientPotency: number
  // Gradient - Shadow
  gradientShadowBlur: number
  gradientShadowSpread: number
  gradientShadowOpacity: number
  // Gradient - Highlight (inset shadow)
  gradientHighlightSize: number
  gradientHighlightOpacity: number
  // Gradient - Top Edge Glow
  gradientEdgeGlowEnabled: boolean
  gradientEdgeGlowHeight: number
  gradientEdgeGlowOpacity: number
  // Gradient - Shape
  gradientFadeDistance: number
  gradientBorderRadius: number
  gradientHeight: number
  // Shine Border
  shineEnabled: boolean
  shinePreset: ShinePreset
  shineIntensity: ShineIntensity
  shineShadow: ShineShadow
  // Content Area
  contentTextColor: TextColor
  contentBackground: SemanticColor
  contentBackgroundOpacity: number
  // Questions Card
  questionsTextColor: TextColor
  questionsBackground: SemanticColor
  questionsBackgroundOpacity: number
  // Questions Card - Padding
  questionsSectionPaddingX: number
  questionsSectionPaddingY: number
  questionsHeaderPaddingX: number
  questionsHeaderPaddingY: number
  questionsItemsInset: number
  questionsItemsPaddingX: number
  questionsItemsPaddingY: number
  questionsItemsBorderRadius: number
}

// =============================================================================
// MOCK DATA
// =============================================================================

const INITIAL_PROFILE_DATA: ProfileFormData = {
  name: 'Order 12345',
  organization: {
    name: 'Payva',
    logo: '/org-logo.png',
    role: '',
  },
  headline: '1 on 1 Mentorship',
  bio: "Welcome to my mentorship profile where I help professionals accelerate their career growth through personalized guidance and strategic advice. Each session is tailored to your unique goals, whether you are navigating a career transition, building leadership skills, or seeking industry insights. I bring years of hands-on experience across multiple domains and a genuine passion for helping others succeed. Together we will identify your strengths, address challenges, and create actionable plans that drive real results in your professional journey.",
  questions: [
    'How has your experience co-founding Pickaxe.it shaped your approach to design?',
    'What types of projects do you focus on as a design engineer at Payva?',
    'How old are you?',
    'What inspired you to transition from product management to design engineering?',
    'Hello',
  ],
  socialLinks: ['linkedin.com/in/derickfiebiger', 'fiebsy.medium.com/'],
}

// =============================================================================
// CONSTANTS
// =============================================================================

const DEFAULT_CONFIG: PlaygroundConfig = {
  // Display
  mode: 'view',
  // Layout
  topPadding: 112,
  contentMaxWidth: 640,
  // Page Background
  pageBackground: 'secondary',
  // Gradient
  gradientEnabled: true,
  gradientOpacity: 100,
  // Gradient - Colors (semantic)
  gradientSurfaceColor: 'bg-primary',
  gradientShadowColor: 'fg-secondary',
  gradientHighlightColor: 'bg-inverted-primary',
  // Gradient - Potency (master intensity)
  gradientPotency: 20,
  // Gradient - Shadow
  gradientShadowBlur: 90,
  gradientShadowSpread: 40,
  gradientShadowOpacity: 23,
  // Gradient - Highlight (inset shadow)
  gradientHighlightSize: 4,
  gradientHighlightOpacity: 25,
  // Gradient - Top Edge Glow
  gradientEdgeGlowEnabled: true,
  gradientEdgeGlowHeight: 170,
  gradientEdgeGlowOpacity: 20,
  // Gradient - Shape
  gradientFadeDistance: 390,
  gradientBorderRadius: 72,
  gradientHeight: 340,
  // Shine Border
  shineEnabled: false,
  shinePreset: '3',
  shineIntensity: 'normal',
  shineShadow: 'none',
  // Content Area
  contentTextColor: 'tertiary',
  contentBackground: 'primary',
  contentBackgroundOpacity: 0,
  // Questions Card
  questionsTextColor: 'secondary',
  questionsBackground: 'quaternary',
  questionsBackgroundOpacity: 10,
  // Questions Card - Padding
  questionsSectionPaddingX: 8,
  questionsSectionPaddingY: 24,
  questionsHeaderPaddingX: 16,
  questionsHeaderPaddingY: 12,
  questionsItemsInset: 0,
  questionsItemsPaddingX: 16,
  questionsItemsPaddingY: 12,
  questionsItemsBorderRadius: 20,
}

// Gradient-specific config (subset of PlaygroundConfig)
type GradientConfig = Pick<
  PlaygroundConfig,
  | 'gradientSurfaceColor'
  | 'gradientShadowColor'
  | 'gradientHighlightColor'
  | 'gradientPotency'
  | 'gradientShadowBlur'
  | 'gradientShadowSpread'
  | 'gradientShadowOpacity'
  | 'gradientHighlightSize'
  | 'gradientHighlightOpacity'
  | 'gradientEdgeGlowEnabled'
  | 'gradientEdgeGlowHeight'
  | 'gradientEdgeGlowOpacity'
  | 'gradientFadeDistance'
  | 'gradientBorderRadius'
  | 'gradientHeight'
  | 'shineEnabled'
  | 'shinePreset'
  | 'shineIntensity'
  | 'shineShadow'
>

// Gradient presets - reusable configurations
const GRADIENT_PRESETS: Record<Exclude<GradientPreset, 'custom'>, GradientConfig> = {
  'subtle-glass': {
    gradientSurfaceColor: 'bg-primary',
    gradientShadowColor: 'fg-secondary',
    gradientHighlightColor: 'bg-inverted-primary',
    gradientPotency: 20,
    gradientShadowBlur: 90,
    gradientShadowSpread: 40,
    gradientShadowOpacity: 23,
    gradientHighlightSize: 4,
    gradientHighlightOpacity: 25,
    gradientEdgeGlowEnabled: true,
    gradientEdgeGlowHeight: 170,
    gradientEdgeGlowOpacity: 20,
    gradientFadeDistance: 390,
    gradientBorderRadius: 72,
    gradientHeight: 340,
    shineEnabled: false,
    shinePreset: '3',
    shineIntensity: 'normal',
    shineShadow: 'none',
  },
  'frosted-card': {
    gradientSurfaceColor: 'bg-tertiary',
    gradientShadowColor: 'alpha-black',
    gradientHighlightColor: 'alpha-white',
    gradientPotency: 80,
    gradientShadowBlur: 200,
    gradientShadowSpread: 0,
    gradientShadowOpacity: 25,
    gradientHighlightSize: 4,
    gradientHighlightOpacity: 100,
    gradientEdgeGlowEnabled: true,
    gradientEdgeGlowHeight: 80,
    gradientEdgeGlowOpacity: 60,
    gradientFadeDistance: 300,
    gradientBorderRadius: 72,
    gradientHeight: 400,
    shineEnabled: true,
    shinePreset: '1',
    shineIntensity: 'subtle',
    shineShadow: 'sm',
  },
  'brand-glow': {
    gradientSurfaceColor: 'bg-brand-primary',
    gradientShadowColor: 'fg-brand-primary',
    gradientHighlightColor: 'fg-brand-secondary',
    gradientPotency: 60,
    gradientShadowBlur: 180,
    gradientShadowSpread: 20,
    gradientShadowOpacity: 30,
    gradientHighlightSize: 2,
    gradientHighlightOpacity: 80,
    gradientEdgeGlowEnabled: true,
    gradientEdgeGlowHeight: 100,
    gradientEdgeGlowOpacity: 40,
    gradientFadeDistance: 350,
    gradientBorderRadius: 64,
    gradientHeight: 380,
    shineEnabled: true,
    shinePreset: 'brand',
    shineIntensity: 'normal',
    shineShadow: 'md',
  },
  'dark-depth': {
    gradientSurfaceColor: 'bg-quaternary',
    gradientShadowColor: 'fg-primary',
    gradientHighlightColor: 'bg-inverted-secondary',
    gradientPotency: 50,
    gradientShadowBlur: 120,
    gradientShadowSpread: 10,
    gradientShadowOpacity: 40,
    gradientHighlightSize: 2,
    gradientHighlightOpacity: 60,
    gradientEdgeGlowEnabled: false,
    gradientEdgeGlowHeight: 60,
    gradientEdgeGlowOpacity: 20,
    gradientFadeDistance: 280,
    gradientBorderRadius: 48,
    gradientHeight: 320,
    shineEnabled: true,
    shinePreset: '2',
    shineIntensity: 'intense',
    shineShadow: 'lg',
  },
  'minimal': {
    gradientSurfaceColor: 'bg-secondary',
    gradientShadowColor: 'border-secondary',
    gradientHighlightColor: 'alpha-white',
    gradientPotency: 20,
    gradientShadowBlur: 80,
    gradientShadowSpread: 0,
    gradientShadowOpacity: 15,
    gradientHighlightSize: 1,
    gradientHighlightOpacity: 40,
    gradientEdgeGlowEnabled: false,
    gradientEdgeGlowHeight: 40,
    gradientEdgeGlowOpacity: 15,
    gradientFadeDistance: 250,
    gradientBorderRadius: 32,
    gradientHeight: 280,
    shineEnabled: false,
    shinePreset: 'none',
    shineIntensity: 'subtle',
    shineShadow: 'none',
  },
}

const GRADIENT_PRESET_OPTIONS = [
  { value: 'custom', label: 'Custom' },
  { value: 'subtle-glass', label: 'Subtle Glass' },
  { value: 'frosted-card', label: 'Frosted Card' },
  { value: 'brand-glow', label: 'Brand Glow' },
  { value: 'dark-depth', label: 'Dark Depth' },
  { value: 'minimal', label: 'Minimal' },
]

// Reusable options
const SEMANTIC_BG_OPTIONS = [
  { value: 'primary', label: 'Primary' },
  { value: 'secondary', label: 'Secondary' },
  { value: 'tertiary', label: 'Tertiary' },
  { value: 'quaternary', label: 'Quaternary' },
]

const TEXT_COLOR_OPTIONS = [
  { value: 'primary', label: 'Primary' },
  { value: 'secondary', label: 'Secondary' },
  { value: 'tertiary', label: 'Tertiary' },
]

// Surface options - BG tokens (theme-aware backgrounds)
const GRADIENT_SURFACE_OPTIONS = [
  // Standard BG tokens
  { value: 'bg-primary', label: 'BG Primary' },
  { value: 'bg-secondary', label: 'BG Secondary' },
  { value: 'bg-tertiary', label: 'BG Tertiary' },
  { value: 'bg-quaternary', label: 'BG Quaternary' },
  // Brand BG tokens
  { value: 'bg-brand-primary', label: 'BG Brand Primary' },
  { value: 'bg-brand-secondary', label: 'BG Brand Secondary' },
  { value: 'bg-brand-solid', label: 'BG Brand Solid' },
  // Inverted (always contrasts with current theme)
  { value: 'bg-inverted-primary', label: 'BG Inverted Primary' },
  { value: 'bg-inverted-secondary', label: 'BG Inverted Secondary' },
]

// Shadow options - FG/Border tokens (darker, for depth)
const GRADIENT_SHADOW_OPTIONS = [
  // Alpha (theme-aware swap)
  { value: 'alpha-black', label: 'Alpha Black (swaps)' },
  // FG tokens (visible foreground colors)
  { value: 'fg-primary', label: 'FG Primary' },
  { value: 'fg-secondary', label: 'FG Secondary' },
  { value: 'fg-tertiary', label: 'FG Tertiary' },
  { value: 'fg-brand-primary', label: 'FG Brand Primary' },
  // Border tokens (subtle)
  { value: 'border-primary', label: 'Border Primary' },
  { value: 'border-secondary', label: 'Border Secondary' },
  { value: 'border-brand', label: 'Border Brand' },
]

// Highlight options - Light tones for glare/shine
const GRADIENT_HIGHLIGHT_OPTIONS = [
  // Alpha (theme-aware swap)
  { value: 'alpha-white', label: 'Alpha White (swaps)' },
  // Inverted BG (always light/contrasting)
  { value: 'bg-inverted-primary', label: 'BG Inverted Primary' },
  { value: 'bg-inverted-secondary', label: 'BG Inverted Secondary' },
  // FG tokens (visible accents)
  { value: 'fg-primary', label: 'FG Primary' },
  { value: 'fg-brand-secondary', label: 'FG Brand Secondary' },
  // Border brand for subtle accent
  { value: 'border-brand', label: 'Border Brand' },
]

const SHINE_PRESET_OPTIONS = [
  { value: 'none', label: 'None' },
  { value: '0', label: 'Shine 0 (195°)' },
  { value: '1', label: 'Shine 1 (180°)' },
  { value: '2', label: 'Shine 2 (Theme-aware)' },
  { value: '3', label: 'Shine 3 (Enhanced)' },
  { value: 'brand', label: 'Shine Brand' },
]

const SHINE_INTENSITY_OPTIONS = [
  { value: 'subtle', label: 'Subtle (60%)' },
  { value: 'normal', label: 'Normal (100%)' },
  { value: 'intense', label: 'Intense (150%)' },
]

const SHINE_SHADOW_OPTIONS = [
  { value: 'none', label: 'None' },
  { value: 'xs', label: 'Extra Small' },
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
]

// =============================================================================
// PANEL CONFIGURATION
// =============================================================================

const createLayoutSection = (config: PlaygroundConfig): ControlSection => ({
  id: 'layout',
  title: 'Layout',
  tabLabel: 'Layout',
  subsections: [
    {
      title: 'Spacing',
      controls: [
        {
          id: 'topPadding',
          label: 'Top Padding',
          type: 'slider',
          value: config.topPadding,
          min: 0,
          max: 200,
          step: 8,
          formatLabel: (v: number) => `${v}px`,
        },
        {
          id: 'contentMaxWidth',
          label: 'Content Width',
          type: 'slider',
          value: config.contentMaxWidth,
          min: 400,
          max: 1200,
          step: 16,
          formatLabel: (v: number) => `${v}px`,
        },
      ],
    },
    {
      title: 'Mode',
      controls: [
        {
          id: 'mode',
          label: 'Profile Mode',
          type: 'select',
          value: config.mode,
          options: [
            { value: 'view', label: 'View' },
            { value: 'edit', label: 'Edit' },
          ],
        },
      ],
    },
  ],
})

const createBackgroundSection = (
  config: PlaygroundConfig,
  currentPreset: GradientPreset
): ControlSection => ({
  id: 'background',
  title: 'Background',
  tabLabel: 'Bg',
  subsections: [
    {
      title: 'Page',
      controls: [
        {
          id: 'pageBackground',
          label: 'Background',
          type: 'select',
          value: config.pageBackground,
          options: SEMANTIC_BG_OPTIONS,
        },
      ],
    },
    {
      title: 'Gradient',
      controls: [
        {
          id: 'gradientEnabled',
          label: 'Enable Gradient',
          type: 'toggle',
          value: config.gradientEnabled,
        },
        {
          id: 'gradientPreset',
          label: 'Preset',
          type: 'select',
          value: currentPreset,
          options: GRADIENT_PRESET_OPTIONS,
          disabled: !config.gradientEnabled,
        },
        {
          id: 'gradientOpacity',
          label: 'Overall Opacity',
          type: 'slider',
          value: config.gradientOpacity,
          min: 0,
          max: 100,
          step: 5,
          formatLabel: (v: number) => `${v}%`,
          disabled: !config.gradientEnabled,
        },
      ],
    },
  ],
})

const createGradientSection = (config: PlaygroundConfig): ControlSection => ({
  id: 'gradient',
  title: 'Gradient Style',
  tabLabel: 'Gradient',
  subsections: [
    {
      title: 'Colors',
      controls: [
        {
          id: 'gradientSurfaceColor',
          label: 'Surface',
          type: 'select',
          value: config.gradientSurfaceColor,
          options: GRADIENT_SURFACE_OPTIONS,
          disabled: !config.gradientEnabled,
        },
        {
          id: 'gradientShadowColor',
          label: 'Shadow Color',
          type: 'select',
          value: config.gradientShadowColor,
          options: GRADIENT_SHADOW_OPTIONS,
          disabled: !config.gradientEnabled,
        },
        {
          id: 'gradientHighlightColor',
          label: 'Highlight Color',
          type: 'select',
          value: config.gradientHighlightColor,
          options: GRADIENT_HIGHLIGHT_OPTIONS,
          disabled: !config.gradientEnabled,
        },
        {
          id: 'gradientPotency',
          label: 'Potency',
          type: 'slider',
          value: config.gradientPotency,
          min: 0,
          max: 200,
          step: 10,
          formatLabel: (v: number) => `${v}%`,
          disabled: !config.gradientEnabled,
        },
      ],
    },
    {
      title: 'Shadow',
      controls: [
        {
          id: 'gradientShadowBlur',
          label: 'Blur',
          type: 'slider',
          value: config.gradientShadowBlur,
          min: 0,
          max: 300,
          step: 10,
          formatLabel: (v: number) => `${v}px`,
          disabled: !config.gradientEnabled,
        },
        {
          id: 'gradientShadowSpread',
          label: 'Spread',
          type: 'slider',
          value: config.gradientShadowSpread,
          min: 0,
          max: 100,
          step: 5,
          formatLabel: (v: number) => `${v}px`,
          disabled: !config.gradientEnabled,
        },
        {
          id: 'gradientShadowOpacity',
          label: 'Opacity',
          type: 'slider',
          value: config.gradientShadowOpacity,
          min: 0,
          max: 50,
          step: 1,
          formatLabel: (v: number) => `${v}%`,
          disabled: !config.gradientEnabled,
        },
      ],
    },
    {
      title: 'Inset Highlight',
      controls: [
        {
          id: 'gradientHighlightSize',
          label: 'Size',
          type: 'slider',
          value: config.gradientHighlightSize,
          min: 0,
          max: 20,
          step: 1,
          formatLabel: (v: number) => `${v}px`,
          disabled: !config.gradientEnabled,
        },
        {
          id: 'gradientHighlightOpacity',
          label: 'Opacity',
          type: 'slider',
          value: config.gradientHighlightOpacity,
          min: 0,
          max: 100,
          step: 5,
          formatLabel: (v: number) => `${v}%`,
          disabled: !config.gradientEnabled,
        },
      ],
    },
    {
      title: 'Top Edge Glow',
      controls: [
        {
          id: 'gradientEdgeGlowEnabled',
          label: 'Enable',
          type: 'toggle',
          value: config.gradientEdgeGlowEnabled,
          disabled: !config.gradientEnabled,
        },
        {
          id: 'gradientEdgeGlowHeight',
          label: 'Height',
          type: 'slider',
          value: config.gradientEdgeGlowHeight,
          min: 20,
          max: 200,
          step: 10,
          formatLabel: (v: number) => `${v}px`,
          disabled: !config.gradientEnabled || !config.gradientEdgeGlowEnabled,
        },
        {
          id: 'gradientEdgeGlowOpacity',
          label: 'Opacity',
          type: 'slider',
          value: config.gradientEdgeGlowOpacity,
          min: 0,
          max: 100,
          step: 5,
          formatLabel: (v: number) => `${v}%`,
          disabled: !config.gradientEnabled || !config.gradientEdgeGlowEnabled,
        },
      ],
    },
    {
      title: 'Shape',
      controls: [
        {
          id: 'gradientHeight',
          label: 'Height',
          type: 'slider',
          value: config.gradientHeight,
          min: 200,
          max: 600,
          step: 20,
          formatLabel: (v: number) => `${v}px`,
          disabled: !config.gradientEnabled,
        },
        {
          id: 'gradientBorderRadius',
          label: 'Border Radius',
          type: 'slider',
          value: config.gradientBorderRadius,
          min: 0,
          max: 120,
          step: 4,
          formatLabel: (v: number) => `${v}px`,
          disabled: !config.gradientEnabled,
        },
        {
          id: 'gradientFadeDistance',
          label: 'Fade Distance',
          type: 'slider',
          value: config.gradientFadeDistance,
          min: 100,
          max: 500,
          step: 10,
          formatLabel: (v: number) => `${v}px`,
          disabled: !config.gradientEnabled,
        },
      ],
    },
  ],
})

const createShineSection = (config: PlaygroundConfig): ControlSection => ({
  id: 'shine',
  title: 'Shine Border',
  tabLabel: 'Shine',
  subsections: [
    {
      title: 'Shine Effect',
      controls: [
        {
          id: 'shineEnabled',
          label: 'Enable Shine',
          type: 'toggle',
          value: config.shineEnabled,
          disabled: !config.gradientEnabled,
        },
        {
          id: 'shinePreset',
          label: 'Preset',
          type: 'select',
          value: config.shinePreset,
          options: SHINE_PRESET_OPTIONS,
          disabled: !config.gradientEnabled || !config.shineEnabled,
        },
        {
          id: 'shineIntensity',
          label: 'Intensity',
          type: 'select',
          value: config.shineIntensity,
          options: SHINE_INTENSITY_OPTIONS,
          disabled: !config.gradientEnabled || !config.shineEnabled,
        },
        {
          id: 'shineShadow',
          label: 'Shadow',
          type: 'select',
          value: config.shineShadow,
          options: SHINE_SHADOW_OPTIONS,
          disabled: !config.gradientEnabled || !config.shineEnabled,
        },
      ],
    },
  ],
})

const createContentSection = (config: PlaygroundConfig): ControlSection => ({
  id: 'content',
  title: 'Content',
  tabLabel: 'Content',
  subsections: [
    {
      title: 'Content Area',
      controls: [
        {
          id: 'contentTextColor',
          label: 'Text Color',
          type: 'select',
          value: config.contentTextColor,
          options: TEXT_COLOR_OPTIONS,
        },
        {
          id: 'contentBackground',
          label: 'Background',
          type: 'select',
          value: config.contentBackground,
          options: SEMANTIC_BG_OPTIONS,
        },
        {
          id: 'contentBackgroundOpacity',
          label: 'Background Opacity',
          type: 'slider',
          value: config.contentBackgroundOpacity,
          min: 0,
          max: 100,
          step: 5,
          formatLabel: (v: number) => `${v}%`,
        },
      ],
    },
    {
      title: 'Questions Card',
      controls: [
        {
          id: 'questionsTextColor',
          label: 'Text Color',
          type: 'select',
          value: config.questionsTextColor,
          options: TEXT_COLOR_OPTIONS,
        },
        {
          id: 'questionsBackground',
          label: 'Background',
          type: 'select',
          value: config.questionsBackground,
          options: SEMANTIC_BG_OPTIONS,
        },
        {
          id: 'questionsBackgroundOpacity',
          label: 'Background Opacity',
          type: 'slider',
          value: config.questionsBackgroundOpacity,
          min: 0,
          max: 100,
          step: 5,
          formatLabel: (v: number) => `${v}%`,
        },
      ],
    },
    {
      title: 'Questions Padding',
      controls: [
        {
          id: 'questionsSectionPaddingX',
          label: 'Section Padding X',
          type: 'slider',
          value: config.questionsSectionPaddingX,
          min: 0,
          max: 48,
          step: 2,
          formatLabel: (v: number) => `${v}px`,
        },
        {
          id: 'questionsSectionPaddingY',
          label: 'Section Padding Y',
          type: 'slider',
          value: config.questionsSectionPaddingY,
          min: 0,
          max: 48,
          step: 2,
          formatLabel: (v: number) => `${v}px`,
        },
        {
          id: 'questionsHeaderPaddingX',
          label: 'Header Padding X',
          type: 'slider',
          value: config.questionsHeaderPaddingX,
          min: 0,
          max: 32,
          step: 2,
          formatLabel: (v: number) => `${v}px`,
        },
        {
          id: 'questionsHeaderPaddingY',
          label: 'Header Padding Y',
          type: 'slider',
          value: config.questionsHeaderPaddingY,
          min: 0,
          max: 32,
          step: 2,
          formatLabel: (v: number) => `${v}px`,
        },
        {
          id: 'questionsItemsInset',
          label: 'Items Inset',
          description: 'Offset items to align with header icon',
          type: 'slider',
          value: config.questionsItemsInset,
          min: 0,
          max: 32,
          step: 2,
          formatLabel: (v: number) => `${v}px`,
        },
        {
          id: 'questionsItemsPaddingX',
          label: 'Item Padding X',
          type: 'slider',
          value: config.questionsItemsPaddingX,
          min: 0,
          max: 32,
          step: 2,
          formatLabel: (v: number) => `${v}px`,
        },
        {
          id: 'questionsItemsPaddingY',
          label: 'Item Padding Y',
          type: 'slider',
          value: config.questionsItemsPaddingY,
          min: 0,
          max: 24,
          step: 2,
          formatLabel: (v: number) => `${v}px`,
        },
        {
          id: 'questionsItemsBorderRadius',
          label: 'Item Border Radius',
          type: 'slider',
          value: config.questionsItemsBorderRadius,
          min: 0,
          max: 32,
          step: 2,
          formatLabel: (v: number) => `${v}px`,
        },
      ],
    },
  ],
})

// =============================================================================
// STYLE HELPERS
// =============================================================================

const bgColorVars: Record<SemanticColor, string> = {
  primary: 'var(--color-bg-primary)',
  secondary: 'var(--color-bg-secondary)',
  tertiary: 'var(--color-bg-tertiary)',
  quaternary: 'var(--color-bg-quaternary)',
}

const bgClasses: Record<SemanticColor, string> = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  tertiary: 'bg-tertiary',
  quaternary: 'bg-quaternary',
}

const textClasses: Record<TextColor, string> = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  tertiary: 'text-tertiary',
}

// Gradient color mappings - semantic tokens that adapt to light/dark mode
// Surface colors - BG tokens for gradient base
const gradientSurfaceColorVars: Record<GradientSurfaceColor, string> = {
  // Standard BG tokens (adapt to theme)
  'bg-primary': 'var(--color-bg-primary)',
  'bg-secondary': 'var(--color-bg-secondary)',
  'bg-tertiary': 'var(--color-bg-tertiary)',
  'bg-quaternary': 'var(--color-bg-quaternary)',
  // Brand BG tokens
  'bg-brand-primary': 'var(--color-bg-brand-primary)',
  'bg-brand-secondary': 'var(--color-bg-brand-secondary)',
  'bg-brand-solid': 'var(--color-bg-brand-solid)',
  // Inverted (always contrasts - light in dark mode, dark in light mode)
  'bg-inverted-primary': 'var(--color-bg-inverted-primary)',
  'bg-inverted-secondary': 'var(--color-bg-inverted-secondary)',
}

// Shadow colors - FG/Border tokens for depth effects
const gradientShadowColorVars: Record<GradientShadowColor, string> = {
  // Alpha (theme-aware: black in light mode, white in dark mode)
  'alpha-black': 'var(--color-alpha-black)',
  // FG tokens (prominent foreground colors)
  'fg-primary': 'var(--color-fg-primary)',
  'fg-secondary': 'var(--color-fg-secondary)',
  'fg-tertiary': 'var(--color-fg-tertiary)',
  'fg-brand-primary': 'var(--color-fg-brand-primary)',
  // Border tokens (subtle depth)
  'border-primary': 'var(--color-border-primary)',
  'border-secondary': 'var(--color-border-secondary)',
  'border-brand': 'var(--color-border-brand)',
}

// Highlight colors - Light tones for glare/shine effects
const gradientHighlightColorVars: Record<GradientHighlightColor, string> = {
  // Alpha (theme-aware: white in light mode, dark in dark mode)
  'alpha-white': 'var(--color-alpha-white)',
  // Inverted BG (always contrasts with current theme surface)
  'bg-inverted-primary': 'var(--color-bg-inverted-primary)',
  'bg-inverted-secondary': 'var(--color-bg-inverted-secondary)',
  // FG tokens (visible accent colors)
  'fg-primary': 'var(--color-fg-primary)',
  'fg-brand-secondary': 'var(--color-fg-brand-secondary)',
  // Border brand for subtle accent highlights
  'border-brand': 'var(--color-border-brand)',
}

// Shine class builder - generates utility class from config
const buildShineClassName = (
  enabled: boolean,
  preset: ShinePreset,
  intensity: ShineIntensity,
  shadow: ShineShadow
): string => {
  if (!enabled || preset === 'none') return ''

  const presetPart = preset === 'brand' ? 'brand' : preset
  const intensityPart = intensity === 'normal' ? '' : `-${intensity}`
  const shadowPart = shadow !== 'none' ? `-shadow-${shadow}` : ''

  // Builds: shine-1, shine-1-subtle, shine-1-shadow-md, shine-1-subtle-shadow-sm
  return `shine-${presetPart}${intensityPart}${shadowPart}`
}

// =============================================================================
// MAIN PAGE
// =============================================================================

export default function ProfilePlayground() {
  const [config, setConfig] = useState<PlaygroundConfig>(DEFAULT_CONFIG)
  const [profileData, setProfileData] = useState<ProfileFormData>(INITIAL_PROFILE_DATA)
  const [gradientPreset, setGradientPreset] = useState<GradientPreset>('subtle-glass')

  // Panel configuration
  const panelConfig = useMemo<UnifiedControlPanelConfig>(
    () => ({
      sections: [
        createLayoutSection(config),
        createBackgroundSection(config, gradientPreset),
        createGradientSection(config),
        createShineSection(config),
        createContentSection(config),
      ],
      defaultActiveTab: 'layout',
      position: {
        top: '16px',
        bottom: '16px',
        right: '16px',
        width: '320px',
      },
      showReset: true,
      resetLabel: 'Reset',
    }),
    [config, gradientPreset]
  )

  // Handle control changes
  const handleControlChange = useCallback((event: ControlChangeEvent) => {
    const { controlId, value } = event

    // Handle gradient preset selection
    if (controlId === 'gradientPreset') {
      const presetName = value as GradientPreset
      setGradientPreset(presetName)

      // Apply preset values if not custom
      if (presetName !== 'custom') {
        const presetConfig = GRADIENT_PRESETS[presetName]
        setConfig((prev) => ({ ...prev, ...presetConfig }))
      }
      return
    }

    // When any gradient setting is manually changed, switch to custom preset
    const gradientControlIds = [
      'gradientSurfaceColor',
      'gradientShadowColor',
      'gradientHighlightColor',
      'gradientPotency',
      'gradientShadowBlur',
      'gradientShadowSpread',
      'gradientShadowOpacity',
      'gradientHighlightSize',
      'gradientHighlightOpacity',
      'gradientEdgeGlowEnabled',
      'gradientEdgeGlowHeight',
      'gradientEdgeGlowOpacity',
      'gradientFadeDistance',
      'gradientBorderRadius',
      'gradientHeight',
      'shineEnabled',
      'shinePreset',
      'shineIntensity',
      'shineShadow',
    ]

    if (gradientControlIds.includes(controlId)) {
      setGradientPreset('custom')
    }

    setConfig((prev) => ({ ...prev, [controlId]: value }))
  }, [])

  // Handle reset
  const handleReset = useCallback(() => {
    setConfig(DEFAULT_CONFIG)
    setGradientPreset('subtle-glass')
  }, [])

  // Get config for copy
  const getConfigForCopy = useCallback(() => config, [config])

  // Gradient style configurations - uses theme-aware CSS variables
  // Now with semantic color control and potency multiplier
  const getGradientStyle = (): React.CSSProperties | null => {
    if (!config.gradientEnabled) return null

    const {
      gradientOpacity,
      gradientSurfaceColor,
      gradientShadowColor,
      gradientHighlightColor,
      gradientPotency,
      gradientShadowBlur,
      gradientShadowSpread,
      gradientShadowOpacity,
      gradientHighlightSize,
      gradientHighlightOpacity,
      gradientFadeDistance,
      gradientBorderRadius,
      gradientHeight,
    } = config

    // Apply potency multiplier to opacity values (capped at 100%)
    const potencyMultiplier = gradientPotency / 100
    const effectiveShadowOpacity = Math.min(gradientShadowOpacity * potencyMultiplier, 100)
    const effectiveHighlightOpacity = Math.min(gradientHighlightOpacity * potencyMultiplier, 100)

    // Get semantic color values
    const surfaceColor = gradientSurfaceColorVars[gradientSurfaceColor]
    const shadowColor = gradientShadowColorVars[gradientShadowColor]
    const highlightColor = gradientHighlightColorVars[gradientHighlightColor]

    // Build shadow string using semantic colors
    const outerShadow = `0 4px ${gradientShadowBlur}px ${gradientShadowSpread}px color-mix(in srgb, ${shadowColor} ${effectiveShadowOpacity}%, transparent)`
    const insetHighlight = gradientHighlightSize > 0
      ? `inset 0 ${gradientHighlightSize}px ${gradientHighlightSize}px 0 color-mix(in srgb, ${highlightColor} ${effectiveHighlightOpacity}%, transparent)`
      : ''

    const boxShadow = [outerShadow, insetHighlight].filter(Boolean).join(', ')

    return {
      opacity: gradientOpacity / 100,
      backgroundColor: surfaceColor,
      boxShadow,
      maskImage: `linear-gradient(black 0%, transparent ${gradientFadeDistance}px)`,
      height: gradientHeight,
      borderRadius: gradientBorderRadius,
    }
  }

  // Top edge glow style - creates a lighter gradient at the top edge
  const getEdgeGlowStyle = (): React.CSSProperties | null => {
    if (!config.gradientEnabled || !config.gradientEdgeGlowEnabled) return null

    const {
      gradientEdgeGlowHeight,
      gradientEdgeGlowOpacity,
      gradientBorderRadius,
      gradientHighlightColor,
      gradientPotency,
    } = config

    // Apply potency to edge glow opacity
    const potencyMultiplier = gradientPotency / 100
    const effectiveEdgeGlowOpacity = Math.min(gradientEdgeGlowOpacity * potencyMultiplier, 100)
    const highlightColor = gradientHighlightColorVars[gradientHighlightColor]

    return {
      background: `linear-gradient(180deg,
        color-mix(in srgb, ${highlightColor} ${effectiveEdgeGlowOpacity}%, transparent) 0%,
        transparent 100%
      )`,
      height: gradientEdgeGlowHeight,
      borderRadius: `${gradientBorderRadius}px ${gradientBorderRadius}px 0 0`,
    }
  }

  // Build shine class name from config
  const shineClassName = buildShineClassName(
    config.shineEnabled,
    config.shinePreset,
    config.shineIntensity,
    config.shineShadow
  )

  // Content area background style
  const getContentBackgroundStyle = (): React.CSSProperties => {
    if (config.contentBackgroundOpacity === 0) return {}
    const opacity = config.contentBackgroundOpacity / 100
    return {
      backgroundColor: `color-mix(in srgb, ${bgColorVars[config.contentBackground]} ${opacity * 100}%, transparent)`,
    }
  }

  // Questions card background style
  const getQuestionsBackgroundStyle = (): React.CSSProperties => {
    const opacity = config.questionsBackgroundOpacity / 100
    if (opacity === 0) return { backgroundColor: 'transparent' }
    if (opacity === 1) return {} // Use class instead
    return {
      backgroundColor: `color-mix(in srgb, ${bgColorVars[config.questionsBackground]} ${opacity * 100}%, transparent)`,
    }
  }

  const gradientStyle = getGradientStyle()
  const edgeGlowStyle = getEdgeGlowStyle()

  return (
    <div className={`min-h-screen ${bgClasses[config.pageBackground]}`}>
      {/* Breadcrumbs */}
      <div className="nav-clearance px-6">
        <div className="flex items-center justify-between">
          <Breadcrumbs
            items={[
              { label: 'Playground', href: '/playground' },
              { label: 'Profile' },
            ]}
          />
          <div className="text-xs text-tertiary">
            Mode: {config.mode === 'view' ? 'View' : 'Edit'}
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <div className="pr-[352px] pb-24 md:pb-0">
        <div
          className="flex-1 p-6 pb-32 pt-0 tracking-[-0.015em]"
          style={{ marginTop: config.topPadding }}
        >
          <div
            className="relative mx-auto"
            style={{ maxWidth: config.contentMaxWidth }}
          >
            {/* Decorative gradient background - theme-aware frosted glass effect */}
            {gradientStyle && (
              <div className="max-w-full overflow-hidden">
                <div
                  className={`pointer-events-none absolute inset-x-0 -left-10 -right-10 -top-10 z-0 ${shineClassName}`}
                  style={gradientStyle}
                >
                  {/* Top edge glow overlay */}
                  {edgeGlowStyle && (
                    <div
                      className="pointer-events-none absolute inset-x-0 top-0"
                      style={edgeGlowStyle}
                    />
                  )}
                </div>
              </div>
            )}

            {/* Content wrapper with optional background */}
            <div
              className={`relative z-10 ${textClasses[config.contentTextColor]}`}
              style={getContentBackgroundStyle()}
            >
              {/* Content - View or Edit mode */}
              <div key={config.mode}>
                {config.mode === 'view' ? (
                  <ViewProfileContent
                    data={profileData}
                    onEdit={() => setConfig((prev) => ({ ...prev, mode: 'edit' }))}
                    questionsClassName={
                      config.questionsBackgroundOpacity === 100
                        ? bgClasses[config.questionsBackground]
                        : ''
                    }
                    questionsStyle={getQuestionsBackgroundStyle()}
                    questionsTextClassName={textClasses[config.questionsTextColor]}
                    questionsConfig={{
                      sectionPaddingX: config.questionsSectionPaddingX,
                      sectionPaddingY: config.questionsSectionPaddingY,
                      headerPaddingX: config.questionsHeaderPaddingX,
                      headerPaddingY: config.questionsHeaderPaddingY,
                      itemsInset: config.questionsItemsInset,
                      itemsPaddingX: config.questionsItemsPaddingX,
                      itemsPaddingY: config.questionsItemsPaddingY,
                      itemsBorderRadius: config.questionsItemsBorderRadius,
                    }}
                  />
                ) : (
                  <EditProfileForm
                    initialData={profileData}
                    onSave={(data) => {
                      setProfileData(data)
                      setConfig((prev) => ({ ...prev, mode: 'view' }))
                    }}
                    onCancel={() => setConfig((prev) => ({ ...prev, mode: 'view' }))}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <UnifiedControlPanel
        config={panelConfig}
        onChange={handleControlChange}
        onReset={handleReset}
        getConfigForCopy={getConfigForCopy}
      />
    </div>
  )
}

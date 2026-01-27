/**
 * Layout definitions for the slide system.
 * Each layout defines structure, spacing, and component arrangement.
 */

import type { SlideLayout } from './types'

/**
 * Layout configuration interface
 */
export interface LayoutConfig {
  name: SlideLayout
  description: string
  structure: 'single-zone' | 'two-column' | 'stacked' | 'grid'
  alignment: 'center' | 'left' | 'top-center'
  contentWidth: 'narrow' | 'medium' | 'wide' | 'full'
  hasHeader: boolean
  hasFooter: boolean
}

/**
 * Standard layout definitions
 */
export const LAYOUTS: Record<SlideLayout, LayoutConfig> = {
  hero: {
    name: 'hero',
    description: 'Centered large text for high-impact slides',
    structure: 'single-zone',
    alignment: 'center',
    contentWidth: 'narrow',
    hasHeader: false,
    hasFooter: false,
  },
  
  'two-column': {
    name: 'two-column',
    description: 'Title on left, content on right',
    structure: 'two-column',
    alignment: 'left',
    contentWidth: 'wide',
    hasHeader: true,
    hasFooter: true,
  },
  
  'two-column-stats': {
    name: 'two-column-stats',
    description: 'Title on left, stat cards on right',
    structure: 'two-column',
    alignment: 'left',
    contentWidth: 'wide',
    hasHeader: true,
    hasFooter: false,
  },
  
  'centered-stat': {
    name: 'centered-stat',
    description: 'Title with single prominent stat below',
    structure: 'stacked',
    alignment: 'top-center',
    contentWidth: 'medium',
    hasHeader: true,
    hasFooter: false,
  },
  
  chart: {
    name: 'chart',
    description: 'Title with chart visualization',
    structure: 'stacked',
    alignment: 'top-center',
    contentWidth: 'medium',
    hasHeader: true,
    hasFooter: false,
  },
  
  grid: {
    name: 'grid',
    description: 'Grid of cards (team members, logos, etc)',
    structure: 'grid',
    alignment: 'top-center',
    contentWidth: 'wide',
    hasHeader: true,
    hasFooter: false,
  },
  
  custom: {
    name: 'custom',
    description: 'Custom layout for unique slides',
    structure: 'single-zone',
    alignment: 'center',
    contentWidth: 'full',
    hasHeader: false,
    hasFooter: false,
  },
}

/**
 * Layout-specific CSS classes
 */
export const LAYOUT_CLASSES = {
  // Container classes based on structure
  container: {
    'single-zone': 'flex items-center justify-center min-h-[60vh]',
    'two-column': 'flex items-start gap-16 max-w-5xl mx-auto',
    'stacked': 'flex flex-col items-center gap-8 max-w-4xl mx-auto',
    'grid': 'flex flex-col items-center gap-8 max-w-5xl mx-auto',
  },
  
  // Content width constraints
  width: {
    narrow: 'max-w-2xl',
    medium: 'max-w-4xl',
    wide: 'max-w-5xl',
    full: 'w-full',
  },
  
  // Alignment utilities
  alignment: {
    center: 'text-center items-center',
    left: 'text-left items-start',
    'top-center': 'text-center items-center',
  },
  
  // Two-column specific
  twoColumn: {
    left: 'flex-shrink-0',
    right: 'flex-1',
    gap: 'gap-16',
  },
  
  // Grid specific
  grid: {
    2: 'grid grid-cols-2 gap-6',
    3: 'grid grid-cols-3 gap-6',
    4: 'grid grid-cols-4 gap-4',
  },
}

/**
 * Get CSS classes for a layout
 */
export function getLayoutClasses(layout: SlideLayout): string {
  const config = LAYOUTS[layout]
  const classes: string[] = []
  
  // Add container class
  classes.push(LAYOUT_CLASSES.container[config.structure])
  
  // Add width constraint
  classes.push(LAYOUT_CLASSES.width[config.contentWidth])
  
  // Add alignment
  if (config.structure !== 'two-column') {
    classes.push(LAYOUT_CLASSES.alignment[config.alignment])
  }
  
  return classes.join(' ')
}

/**
 * Check if layout supports a specific content type
 */
export function layoutSupports(layout: SlideLayout, feature: string): boolean {
  const features: Record<string, SlideLayout[]> = {
    bullets: ['two-column'],
    stats: ['two-column-stats', 'centered-stat'],
    chart: ['chart'],
    team: ['grid'],
    logos: ['grid'],
    cta: ['hero'],
  }
  
  return features[feature]?.includes(layout) ?? false
}

/**
 * Get recommended layout for content type
 */
export function getRecommendedLayout(content: {
  bullets?: any[]
  stats?: any[]
  chart?: any
  team?: any[]
  logos?: any[]
}): SlideLayout {
  if (content.bullets?.length) return 'two-column'
  if (content.chart) return 'chart'
  if (content.team?.length) return 'grid'
  if (content.logos?.length) return 'grid'
  if (content.stats?.length === 1) return 'centered-stat'
  if (content.stats && content.stats.length > 1) return 'two-column-stats'
  
  return 'hero'
}
/**
 * StackingNav Playground
 *
 * Test page for the migrated stacking navigation component.
 * This should behave exactly like button-animation-v3.
 *
 * @module playground/stacking-nav
 */

'use client'

import * as React from 'react'
import { useCallback, useMemo, useState } from 'react'
import {
  UnifiedControlPanel,
  type ControlChangeEvent,
  type UnifiedControlPanelProps,
} from '@/components/ui/prod/base/control-panel'
import {
  StackingNav,
  type AnimationConfig,
  type StyleConfig,
  type StackItem,
  type ActivePath,
  type AnimationType,
  type EasingType,
  type ButtonVariant,
  DEFAULT_ANIMATION_CONFIG,
  DEFAULT_STYLE_CONFIG,
} from '@/components/ui/features/stacking-nav'

type UnifiedControlPanelConfig = UnifiedControlPanelProps['config']

// =============================================================================
// DEMO DATA - THREE NAVIGATION VARIANTS
// =============================================================================

/**
 * NAMING CONVENTION FOR STACKING NAV LEVELS:
 * 
 * L0 (Root):     "All" button - resets to show everything
 * L1 (Primary):  Core category (6-10 chars) - broad filter type
 * L2 (Secondary): State/Type filter (6-10 chars) - narrows down L1
 * L3 (Tertiary): Specific detail (6-10 chars) - final drill-down
 * 
 * All button labels (except "All") should be 6-10 characters for proper stacking.
 */

/**
 * VARIANT 1: Orders - Progressive order filtering
 * Use case: Filtering orders by type → status → sub-status
 * 
 * L0: All
 * L1: Order Type (Invoice, Refund, Payment, etc.)
 * L2: Order Status (Pending, Active, Complete, etc.)
 * L3: Sub-status details (specific states within status)
 */
const ORDERS_ITEMS: StackItem[] = [
  { id: 'all', label: 'All' },
  {
    id: 'invoices',
    label: 'Invoices', // 8 chars
    children: [
      {
        id: 'inv-pending',
        label: 'Pending', // 7 chars
        children: [
          { id: 'inv-draft', label: 'Draft' },      // 5 chars (short, but okay for L3)
          { id: 'inv-review', label: 'Review' },    // 6 chars
          { id: 'inv-awaiting', label: 'Awaiting' }, // 8 chars
        ],
      },
      {
        id: 'inv-active',
        label: 'Active', // 6 chars
        children: [
          { id: 'inv-sent', label: 'Sent' },        // 4 chars
          { id: 'inv-viewed', label: 'Viewed' },    // 6 chars
          { id: 'inv-partial', label: 'Partial' },  // 7 chars
        ],
      },
      { id: 'inv-paid', label: 'Paid' },            // 4 chars (leaf)
      { id: 'inv-overdue', label: 'Overdue' },      // 7 chars (leaf)
    ],
  },
  {
    id: 'payments',
    label: 'Payments', // 8 chars
    children: [
      {
        id: 'pay-process',
        label: 'Process', // 7 chars
        children: [
          { id: 'pay-init', label: 'Started' },     // 7 chars
          { id: 'pay-verify', label: 'Verify' },    // 6 chars
          { id: 'pay-confirm', label: 'Confirm' },  // 7 chars
        ],
      },
      {
        id: 'pay-complete',
        label: 'Complete', // 8 chars
        children: [
          { id: 'pay-cleared', label: 'Cleared' },  // 7 chars
          { id: 'pay-settled', label: 'Settled' },  // 7 chars
        ],
      },
      { id: 'pay-failed', label: 'Failed' },        // 6 chars (leaf)
    ],
  },
  {
    id: 'refunds',
    label: 'Refunds', // 7 chars
    children: [
      { id: 'ref-request', label: 'Request' },      // 7 chars
      { id: 'ref-approved', label: 'Approved' },    // 8 chars
      { id: 'ref-issued', label: 'Issued' },        // 6 chars
    ],
  },
]

/**
 * VARIANT 2: Products - E-commerce product filtering
 * Use case: Shopping/catalog filtering by category → brand → type
 * 
 * L0: All
 * L1: Product Category (Apparel, Footwear, etc.)
 * L2: Brand/Collection (specific brands)
 * L3: Product Type (specific items)
 */
const PRODUCTS_ITEMS: StackItem[] = [
  { id: 'all', label: 'All' },
  {
    id: 'apparel',
    label: 'Apparel', // 7 chars
    children: [
      {
        id: 'tops',
        label: 'Tops', // 4 chars (short but acceptable)
        children: [
          { id: 't-shirts', label: 'T-Shirts' },    // 8 chars
          { id: 'blouses', label: 'Blouses' },      // 7 chars
          { id: 'sweaters', label: 'Sweaters' },    // 8 chars
        ],
      },
      {
        id: 'bottoms',
        label: 'Bottoms', // 7 chars
        children: [
          { id: 'jeans', label: 'Jeans' },          // 5 chars
          { id: 'trousers', label: 'Trousers' },    // 8 chars
          { id: 'shorts', label: 'Shorts' },        // 6 chars
        ],
      },
      { id: 'dresses', label: 'Dresses' },          // 7 chars (leaf)
      { id: 'jackets', label: 'Jackets' },          // 7 chars (leaf)
    ],
  },
  {
    id: 'footwear',
    label: 'Footwear', // 8 chars
    children: [
      {
        id: 'sneakers',
        label: 'Sneakers', // 8 chars
        children: [
          { id: 'running', label: 'Running' },      // 7 chars
          { id: 'casual', label: 'Casual' },        // 6 chars
          { id: 'training', label: 'Training' },    // 8 chars
        ],
      },
      {
        id: 'boots',
        label: 'Boots', // 5 chars
        children: [
          { id: 'ankle', label: 'Ankle' },          // 5 chars
          { id: 'chelsea', label: 'Chelsea' },      // 7 chars
          { id: 'combat', label: 'Combat' },        // 6 chars
        ],
      },
      { id: 'sandals', label: 'Sandals' },          // 7 chars (leaf)
    ],
  },
  {
    id: 'accessor',
    label: 'Accessor', // 8 chars (truncated "Accessories" for length)
    children: [
      { id: 'bags', label: 'Bags' },                // 4 chars
      { id: 'watches', label: 'Watches' },          // 7 chars
      { id: 'jewelry', label: 'Jewelry' },          // 7 chars
    ],
  },
]

/**
 * VARIANT 3: Content - Content management navigation
 * Use case: CMS/documentation filtering by section → format → status
 * 
 * L0: All
 * L1: Content Section (Guides, Media, Pages, etc.)
 * L2: Content Format (specific types within section)
 * L3: Content Status (publication states)
 */
const CONTENT_ITEMS: StackItem[] = [
  { id: 'all', label: 'All' },
  {
    id: 'articles',
    label: 'Articles', // 8 chars
    children: [
      {
        id: 'guides',
        label: 'Guides', // 6 chars
        children: [
          { id: 'getting', label: 'Getting' },      // 7 chars (getting started)
          { id: 'advanced', label: 'Advanced' },    // 8 chars
          { id: 'reference', label: 'Ref' },        // 3 chars (reference - shortened)
        ],
      },
      {
        id: 'tutorials',
        label: 'Tutorial', // 8 chars (truncated)
        children: [
          { id: 'beginner', label: 'Beginner' },    // 8 chars
          { id: 'intermed', label: 'Intermed' },    // 8 chars (intermediate)
          { id: 'expert', label: 'Expert' },        // 6 chars
        ],
      },
      { id: 'updates', label: 'Updates' },          // 7 chars (leaf)
    ],
  },
  {
    id: 'media',
    label: 'Media', // 5 chars
    children: [
      {
        id: 'images',
        label: 'Images', // 6 chars
        children: [
          { id: 'photos', label: 'Photos' },        // 6 chars
          { id: 'graphics', label: 'Graphics' },    // 8 chars
          { id: 'icons', label: 'Icons' },          // 5 chars
        ],
      },
      {
        id: 'videos',
        label: 'Videos', // 6 chars
        children: [
          { id: 'demos', label: 'Demos' },          // 5 chars
          { id: 'webinars', label: 'Webinars' },    // 8 chars
          { id: 'shorts', label: 'Shorts' },        // 6 chars
        ],
      },
      { id: 'audio', label: 'Audio' },              // 5 chars (leaf)
    ],
  },
  {
    id: 'pages',
    label: 'Pages', // 5 chars
    children: [
      { id: 'landing', label: 'Landing' },          // 7 chars
      { id: 'product', label: 'Product' },          // 7 chars
      { id: 'support', label: 'Support' },          // 7 chars
    ],
  },
]

/**
 * Map of all navigation variants
 */
type NavVariant = 'orders' | 'products' | 'content'

const NAV_VARIANTS: Record<NavVariant, { items: StackItem[]; description: string }> = {
  orders: {
    items: ORDERS_ITEMS,
    description: 'Order filtering: Type → Status → Sub-status',
  },
  products: {
    items: PRODUCTS_ITEMS,
    description: 'Product catalog: Category → Type → Style',
  },
  content: {
    items: CONTENT_ITEMS,
    description: 'Content management: Section → Format → Status',
  },
}

// =============================================================================
// CONFIG INTERFACE
// =============================================================================

type ConfigPreset = 'default' | 'spring' | 'custom'

type EntryDirection = 'up' | 'down' | 'left' | 'right' | 'up-left' | 'up-right' | 'down-left' | 'down-right' | 'none' | 'custom'

type PageBackground = 'primary' | 'secondary' | 'tertiary' | 'brand' | 'black' | 'white'

interface PlaygroundConfig {
  // Config Preset
  configPreset: ConfigPreset
  
  // Animation Type
  animationType: AnimationType
  
  // Spring Animation
  springStiffness: number
  springDamping: number
  springPreset: 'custom' | 'smooth' | 'snappy' | 'soft' | 'bouncy'
  
  // Tween/Easing Animation
  tweenDuration: number
  tweenEase: EasingType
  
  // Promotion Animation
  promotionDuration: number
  promotionScale: number
  
  // Child Animation
  childStagger: number
  entryDirection: EntryDirection
  entryOffsetX: number
  entryOffsetY: number
  childEntryDelay: number
  childEntryScale: number
  
  // Exit Animation
  exitDuration: number
  exitScale: number
  
  // Leaf Node Behavior
  skipLeafAnimation: boolean
  selectedLeafVariant: ButtonVariant
  
  // Stacking
  peekOffset: number
  anchoredOpacity: number
  
  // Layout
  gap: 'sm' | 'md' | 'lg'
  
  // Display
  showNumbers: boolean
  showDebug: boolean
  
  // Navigation Variant (replaces demoType)
  navVariant: NavVariant
  
  // Page Layout
  pageBackground: PageBackground
  
  // Level All Button
  showLevelAll: boolean
  levelAllLabel: string
  levelAllActiveVariant: ButtonVariant
  levelAllInactiveVariant: ButtonVariant
}

// Spring presets (for spring animation tuning)
const SPRING_PRESETS = {
  smooth: { stiffness: 500, damping: 30 },
  snappy: { stiffness: 700, damping: 35 },
  soft: { stiffness: 300, damping: 25 },
  bouncy: { stiffness: 400, damping: 15 },
}

// Easing presets for quick selection
const EASING_OPTIONS: { value: EasingType; label: string }[] = [
  { value: 'linear', label: 'Linear' },
  { value: 'easeIn', label: 'Ease In' },
  { value: 'easeOut', label: 'Ease Out' },
  { value: 'easeInOut', label: 'Ease In-Out' },
  { value: 'circIn', label: 'Circ In' },
  { value: 'circOut', label: 'Circ Out' },
  { value: 'circInOut', label: 'Circ In-Out' },
  { value: 'expoIn', label: 'Expo In' },
  { value: 'expoOut', label: 'Expo Out' },
  { value: 'expoInOut', label: 'Expo In-Out' },
  { value: 'backIn', label: 'Back In' },
  { value: 'backOut', label: 'Back Out' },
  { value: 'backInOut', label: 'Back In-Out' },
  { value: 'anticipate', label: 'Anticipate' },
]

// Entry direction presets
const ENTRY_DIRECTION_PRESETS: Record<Exclude<EntryDirection, 'custom'>, { x: number; y: number }> = {
  // Cardinal directions
  up: { x: 0, y: 12 },           // Slides up from below
  down: { x: 0, y: -12 },        // Slides down from above
  left: { x: 12, y: 0 },         // Slides left from right
  right: { x: -12, y: 0 },       // Slides right from left
  // Diagonal directions
  'up-left': { x: 10, y: 10 },   // Slides up-left from bottom-right
  'up-right': { x: -10, y: 10 }, // Slides up-right from bottom-left
  'down-left': { x: 10, y: -10 },// Slides down-left from top-right
  'down-right': { x: -10, y: -10 }, // Slides down-right from top-left
  // No movement
  none: { x: 0, y: 0 },          // No slide, just fade/scale
}

const ENTRY_DIRECTION_OPTIONS: { value: EntryDirection; label: string }[] = [
  { value: 'none', label: 'None (Scale Only)' },
  { value: 'up', label: '↑ Slide Up' },
  { value: 'down', label: '↓ Slide Down' },
  { value: 'left', label: '← Slide Left' },
  { value: 'right', label: '→ Slide Right' },
  { value: 'up-left', label: '↖ Up-Left' },
  { value: 'up-right', label: '↗ Up-Right' },
  { value: 'down-left', label: '↙ Down-Left' },
  { value: 'down-right', label: '↘ Down-Right' },
  { value: 'custom', label: 'Custom' },
]

// Button variant options for styling
const BUTTON_VARIANT_OPTIONS: { value: ButtonVariant; label: string }[] = [
  { value: 'primary', label: 'Primary' },
  { value: 'secondary', label: 'Secondary' },
  { value: 'tertiary', label: 'Tertiary' },
  { value: 'shine', label: 'Shine' },
  { value: 'tab', label: 'Tab' },
  { value: 'link-gray', label: 'Link Gray' },
  { value: 'link-color', label: 'Link Color' },
]

// =============================================================================
// FULL CONFIG PRESETS
// =============================================================================

/** Default preset - optimized tween animation */
const PRESET_DEFAULT: Omit<PlaygroundConfig, 'configPreset' | 'navVariant'> = {
  animationType: 'tween',
  springStiffness: 500,
  springDamping: 30,
  springPreset: 'smooth',
  tweenDuration: 200, // 0.2s
  tweenEase: 'expoOut',
  promotionDuration: 100, // 0.1s
  promotionScale: 1,
  childStagger: 45, // 0.045s
  entryDirection: 'custom',
  entryOffsetX: 6,
  entryOffsetY: 10,
  childEntryDelay: 0,
  childEntryScale: 0.95,
  exitDuration: 75, // 0.075s
  exitScale: 0.95,
  skipLeafAnimation: true,
  selectedLeafVariant: 'tab',
  peekOffset: 8,
  anchoredOpacity: 1,
  gap: 'md',
  showNumbers: false,
  showDebug: false,
  // Page Layout
  pageBackground: 'primary',
  // Level All Button
  showLevelAll: true,
  levelAllLabel: 'All',
  levelAllActiveVariant: 'tab',
  levelAllInactiveVariant: 'tab',
}

/** Spring preset - physics-based spring animation */
const PRESET_SPRING: Omit<PlaygroundConfig, 'configPreset' | 'navVariant'> = {
  animationType: 'spring',
  springStiffness: 500,
  springDamping: 30,
  springPreset: 'smooth',
  tweenDuration: 300,
  tweenEase: 'easeOut',
  promotionDuration: 400,
  promotionScale: 1,
  childStagger: 25, // 0.025s
  entryDirection: 'up',
  entryOffsetX: 0,
  entryOffsetY: 12,
  childEntryDelay: 50, // 0.05s
  childEntryScale: 0.95,
  exitDuration: 150,
  exitScale: 0.95,
  skipLeafAnimation: false,
  selectedLeafVariant: 'primary',
  peekOffset: 8,
  anchoredOpacity: 0.6,
  gap: 'md',
  showNumbers: false,
  showDebug: false,
  // Page Layout
  pageBackground: 'primary',
  // Level All Button - off by default
  showLevelAll: false,
  levelAllLabel: 'All',
  levelAllActiveVariant: 'tab',
  levelAllInactiveVariant: 'tertiary',
}

const CONFIG_PRESETS: Record<ConfigPreset, Omit<PlaygroundConfig, 'configPreset' | 'navVariant'> | null> = {
  default: PRESET_DEFAULT,
  spring: PRESET_SPRING,
  custom: null, // Custom means user has modified settings
}

const DEFAULT_PLAYGROUND_CONFIG: PlaygroundConfig = {
  configPreset: 'default',
  ...PRESET_DEFAULT,
  navVariant: 'orders', // Default to orders variant
}

// =============================================================================
// PANEL CONFIG
// =============================================================================

function createPanelConfig(config: PlaygroundConfig): UnifiedControlPanelConfig {
  // Build spring or tween groups based on animation type
  const animationGroups = config.animationType === 'spring' 
    ? [
        {
          title: 'Spring Preset',
          controls: [
            {
              id: 'springPreset',
              type: 'select' as const,
              label: 'Preset',
              value: config.springPreset,
              options: [
                { value: 'smooth', label: 'Smooth' },
                { value: 'snappy', label: 'Snappy' },
                { value: 'soft', label: 'Soft' },
                { value: 'bouncy', label: 'Bouncy' },
                { value: 'custom', label: 'Custom' },
              ],
            },
          ],
        },
        {
          title: 'Spring Settings',
          controls: [
            {
              id: 'springStiffness',
              type: 'slider' as const,
              label: 'Stiffness',
              value: config.springStiffness,
              min: 100,
              max: 1000,
              step: 25,
              formatLabel: (v: number) => `${v}`,
            },
            {
              id: 'springDamping',
              type: 'slider' as const,
              label: 'Damping',
              value: config.springDamping,
              min: 5,
              max: 60,
              step: 1,
              formatLabel: (v: number) => `${v}`,
            },
          ],
        },
      ]
    : [
        {
          title: 'Easing',
          controls: [
            {
              id: 'tweenEase',
              type: 'select' as const,
              label: 'Easing',
              value: config.tweenEase,
              options: EASING_OPTIONS,
            },
          ],
        },
        {
          title: 'Timing',
          controls: [
            {
              id: 'tweenDuration',
              type: 'slider' as const,
              label: 'Duration',
              value: config.tweenDuration,
              min: 100,
              max: 800,
              step: 25,
              formatLabel: (v: number) => `${v}ms`,
            },
          ],
        },
      ]
  
  return {
    sections: [
      {
        id: 'animation',
        title: 'Animation',
        tabLabel: config.animationType === 'spring' ? 'Spring' : 'Easing',
        groups: [
          {
            title: 'Config Preset',
            controls: [
              {
                id: 'configPreset',
                type: 'select',
                label: 'Preset',
                value: config.configPreset,
                options: [
                  { value: 'default', label: 'Default (Easing)' },
                  { value: 'spring', label: 'Spring (Physics)' },
                  { value: 'custom', label: 'Custom' },
                ],
              },
            ],
          },
          {
            title: 'Animation Type',
            controls: [
              {
                id: 'animationType',
                type: 'select',
                label: 'Type',
                value: config.animationType,
                options: [
                  { value: 'spring', label: 'Spring (Physics)' },
                  { value: 'tween', label: 'Easing (Duration)' },
                ],
              },
            ],
          },
          ...animationGroups,
          {
            title: 'Promotion Effect',
            controls: [
              {
                id: 'promotionScale',
                type: 'slider',
                label: 'Scale',
                value: config.promotionScale,
                min: 1.0,
                max: 1.2,
                step: 0.01,
                formatLabel: (v: number) => v === 1 ? 'Off' : `${v.toFixed(2)}`,
              },
              {
                id: 'promotionDuration',
                type: 'slider',
                label: 'Duration',
                value: config.promotionDuration,
                min: 100,
                max: 800,
                step: 25,
                formatLabel: (v: number) => `${v}ms`,
              },
            ],
          },
        ],
      },
      {
        id: 'children',
        title: 'Children',
        tabLabel: 'Entry',
        groups: [
          {
            title: 'Direction Presets',
            controls: [
              {
                id: 'entryDirection',
                type: 'select',
                label: 'Preset',
                value: config.entryDirection,
                options: ENTRY_DIRECTION_OPTIONS,
              },
            ],
          },
          {
            title: 'Position Offset',
            controls: [
              {
                id: 'entryOffsetX',
                type: 'slider',
                label: 'X Offset',
                value: config.entryOffsetX,
                min: -40,
                max: 40,
                step: 2,
                formatLabel: (v: number) => v === 0 ? '0' : `${v}px`,
              },
              {
                id: 'entryOffsetY',
                type: 'slider',
                label: 'Y Offset',
                value: config.entryOffsetY,
                min: -40,
                max: 40,
                step: 2,
                formatLabel: (v: number) => v === 0 ? '0' : `${v}px`,
              },
            ],
          },
          {
            title: 'Entry Timing',
            controls: [
              {
                id: 'childEntryDelay',
                type: 'slider',
                label: 'Delay',
                value: config.childEntryDelay,
                min: 0,
                max: 300,
                step: 10,
                formatLabel: (v: number) => `${v}ms`,
              },
              {
                id: 'childStagger',
                type: 'slider',
                label: 'Stagger',
                value: config.childStagger,
                min: 0,
                max: 150,
                step: 5,
                formatLabel: (v: number) => `${v}ms`,
              },
              {
                id: 'childEntryScale',
                type: 'slider',
                label: 'Entry Scale',
                value: config.childEntryScale,
                min: 0.8,
                max: 1.0,
                step: 0.01,
                formatLabel: (v: number) => `${v.toFixed(2)}`,
              },
            ],
          },
          {
            title: 'Exit Animation',
            controls: [
              {
                id: 'exitDuration',
                type: 'slider',
                label: 'Duration',
                value: config.exitDuration,
                min: 50,
                max: 400,
                step: 25,
                formatLabel: (v: number) => `${v}ms`,
              },
              {
                id: 'exitScale',
                type: 'slider',
                label: 'Exit Scale',
                value: config.exitScale,
                min: 0.8,
                max: 1.0,
                step: 0.01,
                formatLabel: (v: number) => `${v.toFixed(2)}`,
              },
            ],
          },
          {
            title: 'Leaf Nodes',
            controls: [
              {
                id: 'skipLeafAnimation',
                type: 'toggle',
                label: 'Skip Animation',
                value: config.skipLeafAnimation,
              },
              {
                id: 'selectedLeafVariant',
                type: 'select',
                label: 'Selected Variant',
                value: config.selectedLeafVariant,
                options: BUTTON_VARIANT_OPTIONS,
              },
            ],
          },
        ],
      },
      {
        id: 'stacking',
        title: 'Stacking',
        tabLabel: 'Stack',
        groups: [
          {
            title: 'Peek Behavior',
            controls: [
              {
                id: 'peekOffset',
                type: 'slider',
                label: 'Peek Offset',
                value: config.peekOffset,
                min: -40,
                max: 40,
                step: 2,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'anchoredOpacity',
                type: 'slider',
                label: 'Anchored Opacity',
                value: config.anchoredOpacity,
                min: 0.2,
                max: 1,
                step: 0.05,
                formatLabel: (v: number) => `${(v * 100).toFixed(0)}%`,
              },
            ],
          },
        ],
      },
      {
        id: 'display',
        title: 'Display',
        tabLabel: 'Display',
        groups: [
          {
            title: 'Navigation Variant',
            controls: [
              {
                id: 'navVariant',
                type: 'select',
                label: 'Variant',
                value: config.navVariant,
                options: [
                  { value: 'orders', label: 'Orders (Filter)' },
                  { value: 'products', label: 'Products (Shop)' },
                  { value: 'content', label: 'Content (CMS)' },
                ],
              },
            ],
          },
          {
            title: 'Layout',
            controls: [
              {
                id: 'gap',
                type: 'select',
                label: 'Gap',
                value: config.gap,
                options: [
                  { value: 'sm', label: 'Small' },
                  { value: 'md', label: 'Medium' },
                  { value: 'lg', label: 'Large' },
                ],
              },
              {
                id: 'pageBackground',
                type: 'select',
                label: 'Background',
                value: config.pageBackground,
                options: [
                  { value: 'primary', label: 'Primary' },
                  { value: 'secondary', label: 'Secondary' },
                  { value: 'tertiary', label: 'Tertiary' },
                  { value: 'brand', label: 'Brand' },
                  { value: 'black', label: 'Black' },
                  { value: 'white', label: 'White' },
                ],
              },
            ],
          },
          {
            title: 'Level All Button',
            controls: [
              {
                id: 'showLevelAll',
                type: 'toggle',
                label: 'Show Level All',
                value: config.showLevelAll,
              },
              {
                id: 'levelAllLabel',
                type: 'text',
                label: 'Label',
                value: config.levelAllLabel,
              },
              {
                id: 'levelAllActiveVariant',
                type: 'select',
                label: 'Active Variant',
                value: config.levelAllActiveVariant,
                options: BUTTON_VARIANT_OPTIONS,
              },
              {
                id: 'levelAllInactiveVariant',
                type: 'select',
                label: 'Inactive Variant',
                value: config.levelAllInactiveVariant,
                options: BUTTON_VARIANT_OPTIONS,
              },
            ],
          },
          {
            title: 'Debug',
            controls: [
              {
                id: 'showNumbers',
                type: 'toggle',
                label: 'Show Numbers',
                value: config.showNumbers,
              },
              {
                id: 'showDebug',
                type: 'toggle',
                label: 'Show Debug',
                value: config.showDebug,
              },
            ],
          },
        ],
      },
    ],
    defaultActiveTab: 'animation',
    position: {
      top: '16px',
      bottom: '16px',
      right: '16px',
      width: '320px',
    },
    showReset: true,
    resetLabel: 'Reset All',
  }
}

// =============================================================================
// MAIN PAGE
// =============================================================================

export default function StackingNavPlayground() {
  const [config, setConfig] = useState<PlaygroundConfig>(DEFAULT_PLAYGROUND_CONFIG)
  const [resetKey, setResetKey] = useState(0)
  const [currentPath, setCurrentPath] = useState<ActivePath>([])

  // Transform config for component
  const animationConfig: Partial<AnimationConfig> = useMemo(
    () => ({
      type: config.animationType,
      stiffness: config.springStiffness,
      damping: config.springDamping,
      duration: config.tweenDuration / 1000,
      ease: config.tweenEase,
      promotionDuration: config.promotionDuration / 1000,
      promotionScale: config.promotionScale,
      stagger: config.childStagger / 1000,
      entryOffsetX: config.entryOffsetX,
      entryOffsetY: config.entryOffsetY,
      childEntryDelay: config.childEntryDelay / 1000,
      entryScale: config.childEntryScale,
      exitDuration: config.exitDuration / 1000,
      exitScale: config.exitScale,
      skipLeafAnimation: config.skipLeafAnimation,
    }),
    [config]
  )

  const styleConfig: Partial<StyleConfig> = useMemo(
    () => ({
      peekOffset: config.peekOffset,
      anchoredOpacity: config.anchoredOpacity,
      gap: config.gap,
      selectedLeafVariant: config.selectedLeafVariant,
      // Level All Button
      showLevelAll: config.showLevelAll,
      levelAllLabel: config.levelAllLabel,
      levelAllActiveVariant: config.levelAllActiveVariant,
      levelAllInactiveVariant: config.levelAllInactiveVariant,
    }),
    [config]
  )

  // Get demo items based on variant
  const demoItems = NAV_VARIANTS[config.navVariant].items

  // Panel config
  const panelConfig = useMemo(() => createPanelConfig(config), [config])

  // Handlers
  const handleControlChange = useCallback((event: ControlChangeEvent) => {
    const { controlId, value } = event
    
    // Handle config preset selection - apply full preset
    if (controlId === 'configPreset' && value !== 'custom') {
      const preset = CONFIG_PRESETS[value as ConfigPreset]
      if (preset) {
        setConfig((prev) => ({
          ...prev,
          ...preset,
          configPreset: value as ConfigPreset,
          navVariant: prev.navVariant, // Keep nav variant
        }))
        return
      }
    }
    
    // Handle spring preset selection (within spring animation type)
    if (controlId === 'springPreset' && value !== 'custom') {
      const preset = SPRING_PRESETS[value as keyof typeof SPRING_PRESETS]
      if (preset) {
        setConfig((prev) => ({
          ...prev,
          springPreset: value as PlaygroundConfig['springPreset'],
          springStiffness: preset.stiffness,
          springDamping: preset.damping,
          configPreset: 'custom', // Mark as custom when tuning
        }))
        return
      }
    }
    
    // Handle manual spring adjustment - switch to custom presets
    if (controlId === 'springStiffness' || controlId === 'springDamping') {
      setConfig((prev) => ({
        ...prev,
        [controlId]: value,
        springPreset: 'custom',
        configPreset: 'custom',
      }))
      return
    }
    
    // Handle entry direction preset selection
    if (controlId === 'entryDirection' && value !== 'custom') {
      const directionPreset = ENTRY_DIRECTION_PRESETS[value as Exclude<EntryDirection, 'custom'>]
      if (directionPreset) {
        setConfig((prev) => ({
          ...prev,
          entryDirection: value as EntryDirection,
          entryOffsetX: directionPreset.x,
          entryOffsetY: directionPreset.y,
          configPreset: 'custom',
        }))
        return
      }
    }
    
    // Handle manual entry offset adjustment - detect matching preset or switch to custom
    if (controlId === 'entryOffsetX' || controlId === 'entryOffsetY') {
      setConfig((prev) => {
        const newX = controlId === 'entryOffsetX' ? value as number : prev.entryOffsetX
        const newY = controlId === 'entryOffsetY' ? value as number : prev.entryOffsetY
        
        // Check if values match any preset
        let matchedPreset: EntryDirection = 'custom'
        for (const [presetName, presetValues] of Object.entries(ENTRY_DIRECTION_PRESETS)) {
          if (presetValues.x === newX && presetValues.y === newY) {
            matchedPreset = presetName as EntryDirection
            break
          }
        }
        
        return {
          ...prev,
          [controlId]: value,
          entryDirection: matchedPreset,
          configPreset: 'custom',
        }
      })
      return
    }
    
    // Any other change marks config as custom
    // Level-all options and display options don't affect the preset status
    const nonPresetFields = [
      'navVariant', 
      'showNumbers', 
      'showDebug',
      'pageBackground',
      'showLevelAll',
      'levelAllLabel',
      'levelAllActiveVariant',
      'levelAllInactiveVariant',
    ]
    if (!nonPresetFields.includes(controlId)) {
      setConfig((prev) => ({ ...prev, [controlId]: value, configPreset: 'custom' }))
    } else {
      setConfig((prev) => ({ ...prev, [controlId]: value }))
    }
  }, [])

  const handleReset = useCallback(() => {
    setConfig(DEFAULT_PLAYGROUND_CONFIG)
    setResetKey((k) => k + 1)
    setCurrentPath([])
  }, [])

  const handleComponentReset = useCallback(() => {
    setResetKey((k) => k + 1)
    setCurrentPath([])
  }, [])

  const handleSelectionChange = useCallback((path: ActivePath) => {
    setCurrentPath(path)
  }, [])

  const getConfigForCopy = useCallback(() => {
    return {
      animationConfig,
      styleConfig,
      showNumbers: config.showNumbers,
      showDebug: config.showDebug,
    }
  }, [animationConfig, styleConfig, config.showNumbers, config.showDebug])

  // Background class mapping
  const bgClasses: Record<PageBackground, string> = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    tertiary: 'bg-tertiary',
    brand: 'bg-brand-solid',
    black: 'bg-black',
    white: 'bg-white',
  }

  return (
    <div className={`min-h-screen ${bgClasses[config.pageBackground]}`}>
      {/* Centered Demo - fixed width container prevents shift */}
      <div className="pr-[352px] min-h-screen flex items-center justify-center">
        <div className="w-[800px] flex justify-start pl-24">
          <StackingNav
            key={resetKey}
            items={demoItems}
            animationConfig={animationConfig}
            styleConfig={styleConfig}
            showNumbers={config.showNumbers}
            showDebug={config.showDebug}
            onReset={handleComponentReset}
            onSelectionChange={handleSelectionChange}
          />
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

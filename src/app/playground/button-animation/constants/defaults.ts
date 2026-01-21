/**
 * ButtonAnimation Playground - Default Values
 *
 * Default configuration values matching the component defaults.
 * Values are in ms for duration controls (converted to seconds for component).
 *
 * @module playground/button-animation/constants
 */

import type { PlaygroundConfig } from '../types'

/**
 * Default playground configuration.
 * Matches DEFAULT_PARENT_CONFIG, DEFAULT_CHILD_CONFIG, and DEFAULT_STYLE_CONFIG.
 */
export const DEFAULT_PLAYGROUND_CONFIG: PlaygroundConfig = {
  // Parent Animation
  parentDuration: 150,
  parentEase: 'spring',
  parentStiffness: 500,
  parentDamping: 35,
  parentExitDuration: 100,
  parentWhen: 'sync',

  // Child Animation
  childDelay: 0,
  childStagger: 30,
  childDuration: 150,
  childEase: 'spring',
  childStiffness: 600,
  childDamping: 35,
  childEntryDirection: 'down',
  childEntryDistance: 8,
  childEntryOrder: 'sequential',
  childStaggerDirection: 'forward',
  childExitDuration: 80,

  // Style
  parentVariant: 'tertiary',
  parentExpandedVariant: 'shine',
  childVariant: 'link-gray',
  childSelectedVariant: 'link-color',
  allButtonVariant: 'secondary',
  allButtonOffset: -8,
  size: 'md',
  roundness: 'default',
  gap: 'md',
  asLink: false,

  // Options
  showNumbers: false,
  showInlineReset: false,
}

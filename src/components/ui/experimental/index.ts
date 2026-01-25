/**
 * Experimental Components
 * ========================
 * Work-in-progress components under active development.
 *
 * IMPORTANT: These components may have breaking changes.
 * Use the latest version (highest number) for new implementations.
 *
 * Versioning Convention:
 * - v1, v2, v3, v4 - Iterative versions
 * - Highest number = latest iteration
 * - Check README in each version for status and migration notes
 */

// Command Menu (Biaxial) - Multi-axis navigation menu
// Latest: v4
export * as CommandMenuV1 from './command-menu/v1'
export * as CommandMenuV2 from './command-menu/v2'
export * as CommandMenuV3 from './command-menu/v3'
export * as CommandMenuV4 from './command-menu/v4'
export { BiaxialExpandV4 as CommandMenu } from './command-menu/v4' // Default to latest

// Button Animation - Animated button variants
// Latest: v2
export * as ButtonAnimationV1 from './button-animation/v1'
export * as ButtonAnimationV2 from './button-animation/v2'
export { ButtonAnimationV2 as ButtonAnimation } from './button-animation/v2' // Default to latest

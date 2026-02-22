/**
 * Fluid Button Group
 *
 * A component for fluid button layout animations where two buttons
 * share a container and one can collapse while the other expands.
 *
 * @example
 * ```tsx
 * import { FluidButtonGroup } from '@/components/ui/core/primitives/fluid-button-group'
 *
 * <FluidButtonGroup
 *   visible={isConfirming ? 'primary' : 'both'}
 *   timing="default"
 *   gap={8}
 *   primaryButton={<Button variant="primary">Confirm</Button>}
 *   secondaryButton={<Button variant="secondary">Cancel</Button>}
 *   onTransitionEnd={() => setOpen(false)}
 * />
 * ```
 */

export { FluidButtonGroup } from './fluid-button-group'

export type {
  FluidButtonGroupProps,
  FluidTiming,
  FluidTimingPreset,
  FluidBlurConfig,
} from './types'

export { TIMING_PRESETS, DEFAULT_GAP, DEFAULT_BLUR_CONFIG } from './constants'

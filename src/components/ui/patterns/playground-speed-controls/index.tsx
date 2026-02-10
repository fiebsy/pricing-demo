/**
 * Playground Speed Controls - Backward Compatibility Export
 *
 * This module re-exports from the control-panel for backward compatibility.
 * New code should import from '@/components/ui/patterns/control-panel' instead.
 *
 * @deprecated Import from '@/components/ui/patterns/control-panel' instead
 */

export {
  PlaygroundDebugControls,
  type PlaygroundDebugControlsProps,
} from '../control-panel/playground-layout/debug-controls'

// Keep old export name for backwards compatibility
export { PlaygroundDebugControls as PlaygroundSpeedControls } from '../control-panel/playground-layout/debug-controls'

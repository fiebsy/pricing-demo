/**
 * Slider configuration and style constants
 */

export const sliderConfig = {
  /** Default min value */
  defaultMin: 0,
  /** Default max value */
  defaultMax: 100,
  /** Default step */
  defaultStep: 1,
} as const

export const inlineSliderStyles = {
  /** Container styles */
  container: 'bg-tertiary/50 relative flex h-7 items-center rounded-md',
  /** Fill wrapper styles - min-w-2 ensures drag handle visible at 0% */
  fillWrapper: 'group absolute inset-y-0 left-0 flex min-w-3 items-center transition-[width] duration-75',
  /** Fill wrapper active (dragging) state - shorter transition for snappier tracking */
  fillWrapperActive: 'duration-[45ms]',
  /** Fill background styles */
  fillBackground: 'bg-quaternary absolute inset-0 rounded-md transition-shadow duration-150',
  /** Fill background active (dragging) state - shine effect */
  fillBackgroundActive: 'shine-2',
  /** Drag handle container styles */
  dragHandle: 'absolute -right-2.5 top-0 bottom-0 z-30 flex w-8 cursor-grab items-center justify-center active:cursor-grabbing',
  /** Drag handle indicator styles */
  dragIndicator: 'h-4.5 w-0.5 rounded-full bg-fg-tertiary/80 group-hover:bg-fg-secondary transition-all duration-150',
  /** Drag handle indicator active (dragging) state - shrinks and fades */
  dragIndicatorActive: 'scale-y-0 opacity-0',
  /** Label container styles */
  labelContainer: 'relative z-10 flex items-center gap-1.5 px-2.5 pointer-events-none transition-opacity duration-150',
  /** Label container active (dragging) state - dims label */
  labelContainerActive: 'opacity-30',
  /** Icon styles */
  icon: 'text-tertiary',
  /** Label text styles */
  label: 'text-secondary text-[11px] font-medium whitespace-nowrap',
  /** Input styles - w-16 accommodates values like "1000ms" */
  input: 'text-secondary relative z-10 w-16 shrink-0 bg-transparent px-2 text-right text-xs tabular-nums outline-none focus:text-primary',
  /** Disabled state */
  disabled: 'pointer-events-none opacity-50',
} as const

export const tickSliderStyles = {
  /** Outer clip region - inset to avoid label and value areas */
  tickClip: 'absolute inset-y-0 left-14 right-16 z-10 pointer-events-none overflow-hidden',
  /** Clip region during drag - expand to full width since label is dimmed */
  tickClipActive: 'right-0',
  /** Inner container - spans full slider width so tick percentages align with fill */
  tickContainer: 'absolute inset-y-0 -left-14 -right-16',
  /** Inner container during drag - no offset needed when clip is full width */
  tickContainerActive: 'right-0',
  /** Individual tick mark */
  tick: 'absolute top-1/2 -translate-x-1/2 -translate-y-1/2 h-[5px] w-px bg-fg-tertiary/30',
  /** Fill wrapper during drag - slightly slower transition for snap feel */
  fillWrapperSnap: 'duration-[65ms]',
} as const

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
  container: 'bg-tertiary/50 relative flex h-7 items-center overflow-hidden rounded-md',
  /** Fill wrapper styles - min-w-2 ensures drag handle visible at 0% */
  fillWrapper: 'group absolute inset-y-0 left-0 flex min-w-2 items-center transition-[width] duration-75',
  /** Fill background styles */
  fillBackground: 'bg-quaternary absolute inset-0',
  /** Drag handle container styles */
  dragHandle: 'absolute -right-3 top-0 bottom-0 z-30 flex w-8 cursor-grab items-center justify-center active:cursor-grabbing',
  /** Drag handle indicator styles */
  dragIndicator: 'h-5 w-0.5 rounded-full bg-fg-tertiary/80 group-hover:bg-fg-secondary transition-colors',
  /** Label container styles */
  labelContainer: 'relative z-10 flex items-center gap-1.5 px-2.5 pointer-events-none',
  /** Icon styles */
  icon: 'text-tertiary',
  /** Label text styles */
  label: 'text-secondary text-[11px] font-medium whitespace-nowrap',
  /** Input styles - w-16 accommodates values like "1000ms" */
  input: 'text-secondary relative z-10 w-16 shrink-0 bg-transparent px-2 text-right text-xs tabular-nums outline-none focus:text-primary',
  /** Disabled state */
  disabled: 'pointer-events-none opacity-50',
} as const

/**
 * InlineSelect configuration and style constants
 * Mirrors inlineSliderStyles for visual continuity
 */

export const inlineSelectStyles = {
  /** Container — matches InlineSlider container */
  container: [
    'bg-tertiary/50 relative flex h-7 w-full items-center rounded-md',
    'cursor-pointer outline-none',
    'focus-visible:ring-brand focus-visible:ring-1',
    'data-[popup-open]:bg-tertiary/70',
  ].join(' '),
  /** Label container — matches slider labelContainer */
  labelContainer: 'relative flex items-center gap-1.5 px-2.5',
  /** Label text — matches slider label */
  label: 'text-secondary text-[11px] font-medium whitespace-nowrap',
  /** Selected value on the right — matches slider input style */
  value: 'text-secondary shrink-0 text-right text-xs tabular-nums',
  /** Chevron icon wrapper */
  chevron: 'text-tertiary shrink-0 px-1.5 transition-transform duration-150 data-[popup-open]:rotate-180',
  /** Disabled state — matches slider disabled */
  disabled: 'pointer-events-none opacity-50',
  /** Popup dropdown — matches filter chip popup pattern */
  popup: [
    'bg-primary border border-primary rounded-xl shadow-lg',
    'p-1 min-w-[var(--anchor-width)] max-w-[var(--available-width)]',
    'outline-none',
  ].join(' '),
  /** Popup label header */
  popupLabel: 'flex items-center text-quaternary opacity-60 px-2 min-h-7 text-xs font-normal',
  /** Popup item — matches filter chip option-item pattern */
  popupItem: [
    'flex items-center justify-between gap-2',
    'px-2 py-1.5 min-h-7 rounded-lg',
    'text-xs font-medium text-primary',
    'outline-none cursor-pointer',
    'data-[highlighted]:bg-tertiary',
    'transition-colors duration-100',
    'motion-reduce:transition-none',
  ].join(' '),
  /** Item indicator (checkmark) — right-aligned like filter chip */
  itemIndicator: 'text-brand-primary',
} as const

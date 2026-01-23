/**
 * Question Command Menu V3 - Content Options
 *
 * Options for content type and slot position.
 */

export const CONTENT_TYPE_OPTIONS = [
  { label: 'Questions (Scrollable)', value: 'questions' },
  { label: 'Buttons', value: 'buttons' },
  { label: 'Filters/Tabs', value: 'filters' },
  { label: 'Tabs', value: 'tabs' },
  { label: 'Chat (AI Response)', value: 'chat' },
] as const

export const SLOT_POSITION_OPTIONS = [
  { label: 'Top Slot', value: 'top' },
  { label: 'Bottom Slot', value: 'bottom' },
] as const

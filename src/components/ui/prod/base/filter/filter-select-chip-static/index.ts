/**
 * FilterSelectChipStatic
 *
 * Static filter chip system using Base UI Select.
 *
 * @module prod/base/filter/filter-select-chip-static
 */

export { FilterSelectChipStatic } from './filter-select-chip-static'

export {
  DEFAULT_STYLE_CONFIG,
  SIZE_MAP,
  GAP_MAP,
  ROUNDNESS_MAP,
  mergeStyleConfig,
  getSizeConfig,
  getGapClass,
  getRoundnessClass,
  SIZE_OPTIONS,
  GAP_OPTIONS,
  ROUNDNESS_OPTIONS,
} from './config'

export type {
  FilterSelectChipStaticProps,
  FilterChipData,
  FilterOption,
  StyleConfig,
  SizeConfig,
  ChipGap,
  ChipRoundness,
  ChipSize,
  IconComponent,
  FilterChipProps,
  ChipTriggerProps,
  ChipPopupProps,
  OptionItemProps,
  RemoveButtonProps,
} from './types'

export {
  FilterChip,
  ChipTrigger,
  ChipPopup,
  OptionItem,
  RemoveButton,
} from './components'

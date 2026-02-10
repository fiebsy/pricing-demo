/**
 * Navigation Configuration Presets
 */

import type { NavPreset, NavConfig } from './types'
import { DEFAULT_NAV_CONFIG, DEFAULT_TAB_BAR_CONFIG, DEFAULT_PAGE_HEADER_CONFIG } from './defaults'

// Uniswap Classic - Clean with underline tabs
const uniswapClassic: NavConfig = {
  ...DEFAULT_NAV_CONFIG,
  navLayout: 'inline',
  showBorder: false,
  navHeight: 72,
  pageTopGap: 48,
  searchPosition: 'center',
  navMode: 'grouped',
  showDropdownIcon: false,
  tabBar: {
    ...DEFAULT_TAB_BAR_CONFIG,
    show: true,
    indicatorStyle: 'underline',
    gap: 'lg',
  },
  pageHeader: {
    ...DEFAULT_PAGE_HEADER_CONFIG,
    titleSize: '2xl',
    bottomSpacing: 24,
  },
}

// Minimal - Compact with pill tabs
const minimal: NavConfig = {
  ...DEFAULT_NAV_CONFIG,
  navLayout: 'inline',
  showBorder: true,
  navHeight: 56,
  pageTopGap: 32,
  searchPosition: 'right',
  navMode: 'grouped',
  showDropdownIcon: true,
  dropdownIconSize: 'sm',
  logoImageSize: 'xs',
  navItemSize: 'sm',
  navItemWeight: 'medium',
  navItemColor: 'tertiary',
  navItemOpacity: 100,
  navItemActiveColor: 'primary',
  navItemActiveOpacity: 100,
  tabBar: {
    show: true,
    indicatorStyle: 'pill',
    gap: 'sm',
    textSize: 'xs',
    textWeight: 'medium',
    textColor: 'tertiary',
    textOpacity: 100,
    activeColor: 'primary',
    activeOpacity: 100,
    showContainerBorder: true,
    showHoverBackground: true,
    showActiveBackground: true,
  },
  pageHeader: {
    topSpacing: 0,
    bottomSpacing: 16,
    titleSize: 'xl',
    showTitle: true,
    showDescription: false,
    tabBarPosition: 'above-metrics',
  },
}

// Compact - Very tight spacing, no tabs visible by default
const compact: NavConfig = {
  ...DEFAULT_NAV_CONFIG,
  navLayout: 'inline',
  showBorder: true,
  navHeight: 48,
  pageTopGap: 24,
  searchPosition: 'hidden',
  navMode: 'grouped',
  showDropdownIcon: true,
  dropdownIconSize: 'sm',
  logoImageSize: 'xs',
  logoText: {
    size: 'sm',
    weight: 'medium',
    color: 'brand',
    opacity: 100,
  },
  navItemSize: 'sm',
  navItemWeight: 'medium',
  navItemColor: 'tertiary',
  navItemOpacity: 100,
  navItemActiveColor: 'primary',
  navItemActiveOpacity: 100,
  tabBar: {
    show: true,
    indicatorStyle: 'none',
    gap: 'md',
    textSize: 'sm',
    textWeight: 'medium',
    textColor: 'tertiary',
    textOpacity: 100,
    activeColor: 'brand',
    activeOpacity: 100,
    showContainerBorder: true,
    showHoverBackground: true,
    showActiveBackground: true,
  },
  pageHeader: {
    topSpacing: 0,
    bottomSpacing: 16,
    titleSize: 'lg',
    showTitle: true,
    showDescription: false,
    tabBarPosition: 'above-metrics',
  },
}

export const NAV_PRESETS: NavPreset[] = [
  {
    id: 'uniswap-classic',
    name: 'Uniswap Classic',
    data: uniswapClassic,
  },
  {
    id: 'minimal',
    name: 'Minimal',
    data: minimal,
  },
  {
    id: 'compact',
    name: 'Compact',
    data: compact,
  },
]

export function getPresetById(id: string): NavConfig | undefined {
  return NAV_PRESETS.find((p) => p.id === id)?.data
}

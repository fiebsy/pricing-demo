/**
 * Navigation Configuration Presets
 */

import type { NavPreset, NavConfig } from './types'
import { DEFAULT_NAV_CONFIG, DEFAULT_TAB_BAR_CONFIG, DEFAULT_PAGE_HEADER_CONFIG } from './defaults'

// Default nav item order
const DEFAULT_NAV_ORDER = [
  'overview',
  'sales',
  'orders',
  'products',
  'payouts',
  'payments',
  'collections',
  'risk',
  'documents',
  'team',
  'agreements',
  'webhooks',
]

// Default - Uses DEFAULT_NAV_CONFIG as-is
const defaultPreset: NavConfig = {
  ...DEFAULT_NAV_CONFIG,
}

// Narrow - Stacked layout with narrow content width
const narrow: NavConfig = {
  ...DEFAULT_NAV_CONFIG,
  navLayout: 'stacked',
  showBorder: false,
  navHeight: 68,
  logoNavGap: 0,
  pageTopGap: 80,
  searchPosition: 'center',
  navMode: 'grouped',
  subNavStyle: 'dropdown',
  activeSection: 'home',
  logoText: {
    size: 'sm',
    weight: 'normal',
    color: 'quaternary',
    opacity: 100,
  },
  navItemSize: 'base',
  navItemWeight: 'medium',
  navItemColor: 'tertiary',
  navItemOpacity: 100,
  navItemActiveColor: 'primary',
  navItemActiveOpacity: 100,
  showNavItemHoverBackground: true,
  showNavItemActiveBackground: false,
  // Nav items - preset defines which are visible
  showOverviewNav: false,
  showOrders: true,
  showPayouts: true,
  showRisk: true,
  showProducts: true,
  showSales: false,
  showPayments: false,
  showCollections: false,
  showDocuments: false,
  showTeam: false,
  showAgreements: false,
  showWebhooks: false,
  customNavItems: [],
  navItemsPreset: 'default',
  navItemOrder: DEFAULT_NAV_ORDER,
  showDropdownIcon: false,
  dropdownIconSize: 'sm',
  showLogoImage: true,
  logoImageSize: 'xs',
  logoImageRadius: 'lg',
  logoImageSquircle: true,
  tabBar: {
    ...DEFAULT_TAB_BAR_CONFIG,
    show: false,
    indicatorStyle: 'none',
    gap: 'md',
    textSize: 'lg',
    textWeight: 'medium',
    textColor: 'tertiary',
    textOpacity: 100,
    activeColor: 'primary',
    activeOpacity: 100,
    showContainerBorder: true,
    showHoverBackground: false,
    showActiveBackground: true,
  },
  pageHeader: {
    ...DEFAULT_PAGE_HEADER_CONFIG,
    topSpacing: 0,
    bottomSpacing: 24,
    titleSize: '2xl',
    showTitle: false,
    showDescription: false,
    tabBarPosition: 'below-metrics',
  },
  contentMaxWidth: 800,
  navMatchContent: true,
}

// Uniswap - Stacked layout with tabs visible
const uniswap: NavConfig = {
  ...DEFAULT_NAV_CONFIG,
  navLayout: 'stacked',
  showBorder: false,
  navHeight: 68,
  logoNavGap: 0,
  pageTopGap: 48,
  searchPosition: 'center',
  navMode: 'grouped',
  subNavStyle: 'dropdown',
  activeSection: 'home',
  logoText: {
    size: 'sm',
    weight: 'normal',
    color: 'quaternary',
    opacity: 100,
  },
  navItemSize: 'base',
  navItemWeight: 'medium',
  navItemColor: 'tertiary',
  navItemOpacity: 100,
  navItemActiveColor: 'primary',
  navItemActiveOpacity: 100,
  showNavItemHoverBackground: true,
  showNavItemActiveBackground: false,
  // Nav items - preset defines which are visible
  showOverviewNav: false,
  showOrders: true,
  showPayouts: true,
  showRisk: true,
  showProducts: true,
  showSales: false,
  showPayments: false,
  showCollections: false,
  showDocuments: false,
  showTeam: false,
  showAgreements: false,
  showWebhooks: false,
  customNavItems: [],
  navItemsPreset: 'default',
  navItemOrder: DEFAULT_NAV_ORDER,
  showDropdownIcon: false,
  dropdownIconSize: 'sm',
  showLogoImage: true,
  logoImageSize: 'xs',
  logoImageRadius: 'lg',
  logoImageSquircle: true,
  tabBar: {
    ...DEFAULT_TAB_BAR_CONFIG,
    show: true,
    indicatorStyle: 'none',
    gap: 'lg',
    textSize: 'lg',
    textWeight: 'medium',
    textColor: 'tertiary',
    textOpacity: 100,
    activeColor: 'primary',
    activeOpacity: 100,
    showContainerBorder: true,
    showHoverBackground: false,
    showActiveBackground: true,
  },
  pageHeader: {
    ...DEFAULT_PAGE_HEADER_CONFIG,
    topSpacing: 0,
    bottomSpacing: 24,
    titleSize: '2xl',
    showTitle: false,
    showDescription: false,
    tabBarPosition: 'above-metrics',
  },
  contentMaxWidth: 800,
  navMatchContent: false,
}

export const NAV_PRESETS: NavPreset[] = [
  {
    id: 'default',
    name: 'Default',
    data: defaultPreset,
  },
  {
    id: 'narrow',
    name: 'Narrow',
    data: narrow,
  },
  {
    id: 'uniswap',
    name: 'Uniswap',
    data: uniswap,
  },
]

export function getPresetById(id: string): NavConfig | undefined {
  return NAV_PRESETS.find((p) => p.id === id)?.data
}

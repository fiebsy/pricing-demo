/**
 * Navigation Configuration Defaults
 */

import type { NavConfig, TabBarConfig, PageHeaderConfig } from './types'

// Nav item visibility presets
type NavItemVisibility = Pick<
  NavConfig,
  | 'showOverviewNav'
  | 'showOrders'
  | 'showPayouts'
  | 'showRisk'
  | 'showProducts'
  | 'showSales'
  | 'showPayments'
  | 'showCollections'
  | 'showDocuments'
  | 'showTeam'
  | 'showAgreements'
  | 'showWebhooks'
>

export const NAV_ITEMS_PRESETS: Record<string, NavItemVisibility> = {
  default: {
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
  },
  minimal: {
    showOverviewNav: true,
    showOrders: true,
    showPayouts: false,
    showRisk: false,
    showProducts: true,
    showSales: false,
    showPayments: false,
    showCollections: false,
    showDocuments: false,
    showTeam: false,
    showAgreements: false,
    showWebhooks: false,
  },
  expanded: {
    showOverviewNav: true,
    showOrders: true,
    showPayouts: true,
    showRisk: true,
    showProducts: true,
    showSales: true,
    showPayments: true,
    showCollections: true,
    showDocuments: true,
    showTeam: true,
    showAgreements: true,
    showWebhooks: true,
  },
  // Custom uses whatever the user has configured
}

export const DEFAULT_TAB_BAR_CONFIG: TabBarConfig = {
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
}

export const DEFAULT_PAGE_HEADER_CONFIG: PageHeaderConfig = {
  topSpacing: 0,
  bottomSpacing: 24,
  titleSize: '2xl',
  showTitle: false,
  showDescription: false,
  tabBarPosition: 'below-metrics',
}

export const DEFAULT_NAV_CONFIG: NavConfig = {
  navLayout: 'stacked',
  showBorder: true,
  navHeight: 68,
  logoNavGap: 0,
  pageTopGap: 80,
  searchPosition: 'center',
  navMode: 'flat',
  subNavStyle: 'dropdown',
  activeSection: 'home',

  // Text styling
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

  // Navigation items visibility
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

  // Custom navigation items
  customNavItems: [],

  // Nav item configuration
  navItemsPreset: 'default',
  navItemOrder: [
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
  ],

  // Dropdown styling
  showDropdownIcon: false,
  dropdownIconSize: 'sm',

  // Logo image styling
  showLogoImage: true,
  logoImageSize: 'xs',
  logoImageRadius: 'lg',
  logoImageSquircle: true,

  // Tab Bar styling
  tabBar: DEFAULT_TAB_BAR_CONFIG,

  // Page Header styling
  pageHeader: DEFAULT_PAGE_HEADER_CONFIG,

  // Content width controls
  contentMaxWidth: 1200,
  navMatchContent: false,
}

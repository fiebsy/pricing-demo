/**
 * Navigation Configuration Defaults
 */

import type { NavConfig, TabBarConfig, PageHeaderConfig } from './types'

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

  // Navigation items
  showOverviewNav: false,

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

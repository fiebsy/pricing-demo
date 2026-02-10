/**
 * Navigation Configuration Types
 *
 * Defines the shape of the experimental navigation configuration.
 */

export type NavLayout = 'inline' | 'stacked'
export type SearchPosition = 'center' | 'right' | 'hidden'
export type NavMode = 'flat' | 'grouped'
export type SubNavStyle = 'dropdown' | 'tabs' | 'none'
export type ActiveSection = 'home' | 'money' | 'products'

// Text styling options
export type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl'
export type FontWeight = 'normal' | 'medium' | 'semibold' | 'bold'
export type TextColor = 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'brand'

export interface NavTextStyle {
  size: TextSize
  weight: FontWeight
  color: TextColor
  /** Opacity from 0-100 */
  opacity: number
}

// Tab Bar styling
export type TabIndicatorStyle = 'underline' | 'pill' | 'none'
export type TabGap = 'sm' | 'md' | 'lg'

export interface TabBarConfig {
  /** Show/hide the tab bar */
  show: boolean
  /** Tab indicator style */
  indicatorStyle: TabIndicatorStyle
  /** Gap between tabs */
  gap: TabGap
  /** Shared text size for all tab states */
  textSize: TextSize
  /** Shared font weight for all tab states */
  textWeight: FontWeight
  /** Default tab text color */
  textColor: TextColor
  /** Default tab text opacity */
  textOpacity: number
  /** Active tab text color */
  activeColor: TextColor
  /** Active tab text opacity */
  activeOpacity: number
  /** Show horizontal spanning border under tabs (underline mode only) */
  showContainerBorder: boolean
  /** Show background on hover for inactive tabs */
  showHoverBackground: boolean
  /** Show background on active tab */
  showActiveBackground: boolean
}

// Page Header styling
export type TitleSize = 'lg' | 'xl' | '2xl' | '3xl'
export type TabBarPosition = 'above-metrics' | 'below-metrics'

export interface PageHeaderConfig {
  /** Top spacing in pixels */
  topSpacing: number
  /** Bottom spacing in pixels */
  bottomSpacing: number
  /** Title size */
  titleSize: TitleSize
  /** Show page title (when false, tabs act as header) */
  showTitle: boolean
  /** Show description text */
  showDescription: boolean
  /** Position of tab bar relative to metrics */
  tabBarPosition: TabBarPosition
}

// Navigation Structure Types
export interface NavItem {
  id: string
  label: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
  description?: string
}

export interface NavSection {
  id: string
  label: string
  /** Default href when clicking section (first item's href) */
  defaultHref: string
  /** Items within this section */
  items: NavItem[]
}

export interface NavigationStructure {
  /** Standalone nav items (e.g., Overview) */
  standaloneItems: NavItem[]
  /** Grouped sections with sub-items (e.g., Money, Products) */
  sections: NavSection[]
}

export interface NavConfig {
  /** Layout mode - inline places nav beside logo, stacked places below */
  navLayout: NavLayout
  /** Show bottom border on header */
  showBorder: boolean
  /** Nav height in pixels */
  navHeight: number
  /** Gap between logo row and nav row (stacked layout only) */
  logoNavGap: number
  /** Top gap below nav in pixels */
  pageTopGap: number
  /** Search bar position in the header */
  searchPosition: SearchPosition
  /** Navigation mode - flat shows all items, grouped uses Money/Products dropdowns */
  navMode: NavMode
  /** How sub-navigation is displayed when grouped */
  subNavStyle: SubNavStyle
  /** Currently active section (used when grouped) */
  activeSection: ActiveSection

  // Text styling
  /** Logo text styling */
  logoText: NavTextStyle
  /** Shared nav item text size */
  navItemSize: TextSize
  /** Shared nav item font weight */
  navItemWeight: FontWeight
  /** Default nav item text color */
  navItemColor: TextColor
  /** Default nav item text opacity */
  navItemOpacity: number
  /** Active nav item text color */
  navItemActiveColor: TextColor
  /** Active nav item text opacity */
  navItemActiveOpacity: number
  /** Show background on hover for inactive nav items */
  showNavItemHoverBackground: boolean
  /** Show background on active nav item */
  showNavItemActiveBackground: boolean

  // Navigation items
  /** Show Overview in navigation (hidden by default) */
  showOverviewNav: boolean

  // Dropdown styling
  /** Show dropdown arrow icon */
  showDropdownIcon: boolean
  /** Dropdown icon size */
  dropdownIconSize: 'sm' | 'md' | 'lg'

  // Logo image styling
  /** Show logo image */
  showLogoImage: boolean
  /** Logo image size */
  logoImageSize: 'xs' | 'sm' | 'md' | 'lg'
  /** Logo image border radius */
  logoImageRadius: 'none' | 'sm' | 'md' | 'lg' | 'full'
  /** Logo image squircle effect */
  logoImageSquircle: boolean

  // Tab Bar styling
  /** Tab bar configuration */
  tabBar: TabBarConfig

  // Page Header styling
  /** Page header configuration */
  pageHeader: PageHeaderConfig
}

export interface NavPreset {
  id: string
  name: string
  data: NavConfig
}

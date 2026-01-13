"use strict";
/**
 * Filter Component Configuration
 *
 * Default configurations and presets for filter components.
 * These can be customized per-use or extended with new presets.
 *
 * @module base-ui/filter/config
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.stylingToAppearance = exports.getFilterPreset = exports.getChipStylePreset = exports.getFilterTriggerStylePreset = exports.FILTER_TRIGGER_STYLE_PRESETS = exports.DEFAULT_FILTER_TRIGGER_STYLE = exports.CHIP_STYLE_PRESETS = exports.DEFAULT_CHIP_STYLE = exports.FILTER_MENU_PRESETS = exports.DEFAULT_FILTER_APPEARANCE = exports.DEFAULT_FILTER_STYLING_CONFIG = void 0;
// ============================================================================
// Default Styling Configuration
// ============================================================================
exports.DEFAULT_FILTER_STYLING_CONFIG = {
    // Container 1 Styling
    borderRadius: '2xl',
    shadow: '2xl',
    borderStyle: 'shine',
    shineOption: 'shine-1',
    cornerSquircle: true,
    menuWidth: 240,
    // Position
    side: 'bottom',
    align: 'start',
    sideOffset: 8,
    alignOffset: 0,
    // Separator Styling
    separatorOpacity: 50,
    separatorColor: 'primary',
    // Item Styling
    itemRadius: 'xl',
    itemSquircle: true,
    iconOpacity: 50,
    itemHoverColor: 'tertiary',
    // Background & Effects
    backgroundColor: 'primary',
    backgroundGradient: 'subtle-depth-sm',
    gradientColor: 'secondary',
    // Panel Navigation Animation (1A ↔ 1B) - Expo Out
    panelTransitionDuration: 250,
    panelTransitionEasing: 'cubic-bezier(0.16, 1, 0.3, 1)',
    heightAnimationEnabled: true,
    opacityCrossfadeEnabled: true,
    opacityDurationRatio: 0.8,
    // Legacy
    slideTransitionDuration: 300,
    slideTransitionEasing: 'cubic-bezier(0.25, 1.2, 0.01, 1)',
    heightTransitionDuration: 300,
    heightTransitionEasing: 'cubic-bezier(0.25, 1.2, 0.01, 1)',
};
// ============================================================================
// Default Appearance Config (derived from styling config)
// ============================================================================
exports.DEFAULT_FILTER_APPEARANCE = {
    borderRadius: '2xl',
    shadow: '2xl',
    border: 'shine-1',
    cornerSquircle: true,
    backgroundColor: 'primary',
    gradient: 'subtle-depth-sm',
    gradientColor: 'secondary',
};
// ============================================================================
// Presets
// ============================================================================
exports.FILTER_MENU_PRESETS = [
    {
        id: 'default',
        name: 'Default',
        config: exports.DEFAULT_FILTER_STYLING_CONFIG,
        appearance: exports.DEFAULT_FILTER_APPEARANCE,
    },
    {
        id: 'compact',
        name: 'Compact',
        config: {
            ...exports.DEFAULT_FILTER_STYLING_CONFIG,
            menuWidth: 200,
            borderRadius: 'xl',
            itemRadius: 'lg',
        },
        appearance: {
            ...exports.DEFAULT_FILTER_APPEARANCE,
            borderRadius: 'xl',
        },
    },
    {
        id: 'wide',
        name: 'Wide',
        config: {
            ...exports.DEFAULT_FILTER_STYLING_CONFIG,
            menuWidth: 280,
        },
        appearance: exports.DEFAULT_FILTER_APPEARANCE,
    },
    {
        id: 'minimal',
        name: 'Minimal',
        config: {
            ...exports.DEFAULT_FILTER_STYLING_CONFIG,
            borderStyle: 'border',
            shadow: 'lg',
            backgroundGradient: 'none',
        },
        appearance: {
            ...exports.DEFAULT_FILTER_APPEARANCE,
            border: 'default',
            shadow: 'lg',
            gradient: 'none',
        },
    },
];
// ============================================================================
// Chip Style Presets
// ============================================================================
/**
 * GAN2 Configuration - Updated 2026-01-02
 */
exports.DEFAULT_CHIP_STYLE = {
    size: 'sm',
    rounded: 'full',
    gap: 'sm',
    shine: '1',
    shineIntensity: 'subtle',
    shadow: 'none',
    background: 'secondary',
    border: false,
    depthIntensity: 'none',
    depthColor: 'primary',
    depthDirection: 'bottom',
    paddingLeft: 8,
    paddingRight: 4,
    iconValueGap: 4,
    itemGap: 10,
    iconSize: 14,
    closeIconSize: 16,
    closeIconType: 'cancel-solid',
    leftIconOpacity: 55,
    useIcon: true,
    noScaleAnimation: false,
    duration: 150,
    revealMode: 'fade',
    opacityFadeRatio: 1,
};
exports.CHIP_STYLE_PRESETS = [
    {
        id: 'default',
        name: 'Default',
        config: exports.DEFAULT_CHIP_STYLE,
    },
    {
        id: 'small',
        name: 'Small',
        config: {
            size: 'sm',
            rounded: 'full',
            gap: 'sm',
            shine: '3',
            shineIntensity: 'subtle',
            shadow: 'none',
            background: 'secondary',
            border: false,
            depthIntensity: '10',
            depthColor: 'primary',
            depthDirection: 'bottom',
            paddingLeft: 8,
            paddingRight: 2,
            iconValueGap: 4,
            itemGap: 8,
            iconSize: 14,
            closeIconSize: 16,
            closeIconType: 'cancel-solid',
            leftIconOpacity: 50,
            useIcon: true,
            noScaleAnimation: false,
            duration: 200,
            revealMode: 'fade',
            opacityFadeRatio: 1,
        },
    },
];
// ============================================================================
// Filter Trigger Button Style Configuration
// ============================================================================
/**
 * GAN2 Configuration - Updated 2026-01-02
 * Default styling for the "Add a filter" trigger button
 */
exports.DEFAULT_FILTER_TRIGGER_STYLE = {
    shine: '0',
    shineIntensity: 'intense',
    background: 'primary',
    backgroundHover: 'tertiary',
    border: false,
    height: 40,
    rounded: 'full',
    paddingX: 12,
    textColor: 'secondary',
    textColorHover: 'primary',
    fontWeight: 'semibold',
    iconSize: 20,
    iconStrokeWidth: 1.5,
    iconColor: 'quaternary',
};
exports.FILTER_TRIGGER_STYLE_PRESETS = [
    {
        id: 'default',
        name: 'Default (GAN2)',
        config: exports.DEFAULT_FILTER_TRIGGER_STYLE,
    },
];
// ============================================================================
// Helper Functions
// ============================================================================
/**
 * Get a filter trigger style preset by ID
 */
const getFilterTriggerStylePreset = (presetId) => {
    return exports.FILTER_TRIGGER_STYLE_PRESETS.find((p) => p.id === presetId);
};
exports.getFilterTriggerStylePreset = getFilterTriggerStylePreset;
/**
 * Get a chip style preset by ID
 */
const getChipStylePreset = (presetId) => {
    return exports.CHIP_STYLE_PRESETS.find((p) => p.id === presetId);
};
exports.getChipStylePreset = getChipStylePreset;
/**
 * Get a filter menu preset by ID
 */
const getFilterPreset = (presetId) => {
    return exports.FILTER_MENU_PRESETS.find((p) => p.id === presetId);
};
exports.getFilterPreset = getFilterPreset;
/**
 * Convert FilterMenuStylingConfig to MenuAppearanceConfig
 * Maps the styling config properties to the appearance config subset
 */
const stylingToAppearance = (config) => ({
    borderRadius: config.borderRadius,
    shadow: config.shadow,
    border: config.borderStyle === 'shine' ? config.shineOption : config.borderStyle === 'border' ? 'default' : 'none',
    cornerSquircle: config.cornerSquircle,
    backgroundColor: config.backgroundColor,
    gradient: config.backgroundGradient,
    gradientColor: config.gradientColor,
});
exports.stylingToAppearance = stylingToAppearance;
//# sourceMappingURL=config.js.map
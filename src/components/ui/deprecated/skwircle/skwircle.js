"use strict";
/**
 * Skwircle Component
 *
 * Unified squircle component with variant-first API and smart FOUC prevention.
 * Combines best of legacy Squircle (power) and SquircleV2 (simplicity).
 *
 * @example Basic Usage
 * ```tsx
 * <Skwircle variant="card" intent="default">
 *   Card content
 * </Skwircle>
 * ```
 *
 * @example Button with Intent
 * ```tsx
 * <Skwircle variant="button" intent="primary" onClick={handleClick}>
 *   <span className="px-4 py-2">Click me</span>
 * </Skwircle>
 * ```
 *
 * @example Compound Components
 * ```tsx
 * <Skwircle.Card elevation="sm">Card content</Skwircle.Card>
 * <Skwircle.Button intent="primary">Button text</Skwircle.Button>
 * ```
 */
'use client';
/**
 * Skwircle Component
 *
 * Unified squircle component with variant-first API and smart FOUC prevention.
 * Combines best of legacy Squircle (power) and SquircleV2 (simplicity).
 *
 * @example Basic Usage
 * ```tsx
 * <Skwircle variant="card" intent="default">
 *   Card content
 * </Skwircle>
 * ```
 *
 * @example Button with Intent
 * ```tsx
 * <Skwircle variant="button" intent="primary" onClick={handleClick}>
 *   <span className="px-4 py-2">Click me</span>
 * </Skwircle>
 * ```
 *
 * @example Compound Components
 * ```tsx
 * <Skwircle.Card elevation="sm">Card content</Skwircle.Card>
 * <Skwircle.Button intent="primary">Button text</Skwircle.Button>
 * ```
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Skwircle = void 0;
const React = require("react");
const react_1 = require("react");
const core_1 = require("./core");
const rendering_1 = require("./rendering");
const config_1 = require("./config");
const components_1 = require("./components");
/**
 * Base Skwircle component.
 */
const SkwircleBase = ({ 
// Variant system
variant = 'base', intent = 'default', size, state, 
// Shape
roundness, elevation, borderWidth, 
// Ring (outer border)
ring, ringColor, ringWidth, ringOpacity, 
// Colors (escape hatches)
backgroundColor, backgroundColorHover, borderColor, borderColorHover, 
// Gradients
borderGradient, backgroundGradient, 
// Mount strategy (FOUC prevention)
mountStrategy = 'auto', initialDimensions, 
// Layout
fillMode = false, overflow = 'hidden', 
// Content wrapper
contentWrapperClassName, contentWrapperStyle, 
// Accessibility & HTML attributes
disabled = false, tabIndex, role, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledby, 'aria-describedby': ariaDescribedby, 'aria-disabled': ariaDisabled, 'aria-pressed': ariaPressed, 'aria-expanded': ariaExpanded, 'data-testid': dataTestId, 
// Events
onClick, onMouseEnter, onMouseLeave, onKeyDown, onFocus, onBlur, 
// Standard
children, className = '', style = {}, }) => {
    const containerRef = (0, react_1.useRef)(null);
    const contentRef = (0, react_1.useRef)(null);
    // Get variant defaults - ensure variant is always defined
    const effectiveVariant = variant ?? 'base';
    const effectiveIntent = intent ?? 'default';
    const variantConfig = config_1.VARIANT_CONFIGS[effectiveVariant];
    const intentColors = (0, config_1.getIntentConfig)(effectiveVariant, effectiveIntent);
    // Resolve values with fallback chain: prop > intent > variant > default
    const resolvedRoundness = roundness ?? variantConfig.roundness;
    const resolvedElevation = elevation ?? intentColors.elevation ?? variantConfig.elevation;
    const resolvedBorderWidth = borderWidth ?? variantConfig.borderWidth;
    const resolvedRing = ring ?? variantConfig.ring ?? false;
    const resolvedRingWidth = ringWidth ?? variantConfig.ringWidth ?? 2;
    const resolvedRingOpacity = ringOpacity ?? 100;
    // Get roundness config from preset
    const roundnessConfig = config_1.ROUNDNESS_CONFIGS[resolvedRoundness];
    // Get shadow config from elevation preset
    const shadowConfig = config_1.ELEVATION_CONFIGS[resolvedElevation];
    // Check if this variant should have hover effects
    const isInteractive = variantConfig.interactive;
    // Resolve colors
    const resolvedBgColor = backgroundColor ?? intentColors.backgroundColor;
    // Only use hover colors if variant is interactive
    const resolvedBgColorHover = isInteractive
        ? (backgroundColorHover ?? intentColors.backgroundColorHover)
        : resolvedBgColor;
    const resolvedBorderColor = borderColor ?? intentColors.borderColor;
    const resolvedBorderColorHover = isInteractive
        ? (borderColorHover ?? intentColors.borderColorHover)
        : resolvedBorderColor;
    const resolvedRingColor = ringColor ?? 'outline-color-brand';
    // Hover state (only track if interactive)
    const { isHovered, handleMouseEnter, handleMouseLeave } = (0, core_1.useHoverState)(onMouseEnter, onMouseLeave);
    // Calculate total border offset (for positioning)
    const outerBorderWidth = resolvedRing ? resolvedRingWidth : 0;
    const totalBorderOffset = resolvedBorderWidth + outerBorderWidth;
    // Dimension tracking
    // When fillMode is true, measure the container (for full-width expansion)
    // Otherwise measure the content (for content-based sizing)
    const measureRef = fillMode ? containerRef : contentRef;
    const { dimensions: rawDimensions, hasMeasured } = (0, core_1.useDimensions)(measureRef, { initialDimensions });
    // When fillMode is true, we measure the container but the border needs to fit INSIDE it.
    // Subtract the border offset from measured dimensions so paths are generated correctly:
    // - Border path will match container size
    // - Background path will match content area (container minus border on each side)
    const dimensions = fillMode && rawDimensions.width > 0 && rawDimensions.height > 0
        ? {
            width: Math.max(0, rawDimensions.width - totalBorderOffset * 2),
            height: Math.max(0, rawDimensions.height - totalBorderOffset * 2),
        }
        : rawDimensions;
    // Mount strategy (FOUC prevention)
    const { shouldShow, opacity, transition } = (0, core_1.useSkwircleMount)({
        mountStrategy,
        hasMeasured,
        initialDimensions,
        className,
        style,
        fillMode,
    });
    // Color resolution with hover
    const colors = (0, core_1.useSkwircleColors)({
        backgroundColor: resolvedBgColor,
        backgroundColorHover: resolvedBgColorHover,
        borderColor: resolvedBorderColor,
        borderColorHover: resolvedBorderColorHover,
        outerBorderColor: resolvedRing ? resolvedRingColor : undefined,
        shadowColor: shadowConfig.color,
    }, isHovered);
    // Generate SVG paths
    const paths = (0, core_1.useSkwircleShape)(dimensions, resolvedBorderWidth, outerBorderWidth, roundnessConfig);
    // Resolve gradient configs
    const borderGradientConfig = borderGradient && borderGradient !== 'none'
        ? config_1.GRADIENT_BORDER_PRESETS[borderGradient] ?? null
        : null;
    const backgroundGradientConfig = backgroundGradient && backgroundGradient !== 'none'
        ? config_1.BACKGROUND_GRADIENT_PRESETS[backgroundGradient] ?? null
        : null;
    // Check if shadow is enabled
    const hasShadow = shadowConfig.opacity > 0 && dimensions.width > 0 && dimensions.height > 0;
    // Determine if this should behave as a button
    const isButtonVariant = effectiveVariant === 'button';
    const effectiveRole = role ?? (isButtonVariant ? 'button' : undefined);
    const effectiveTabIndex = tabIndex ?? (isButtonVariant && !disabled ? 0 : undefined);
    // Keyboard handler for button behavior (Enter/Space triggers onClick)
    const handleKeyDown = (e) => {
        onKeyDown?.(e);
        if (disabled)
            return;
        if (isButtonVariant && onClick && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick(e);
        }
    };
    // Click handler that respects disabled state
    const handleClick = (e) => {
        if (disabled) {
            e.preventDefault();
            return;
        }
        onClick?.(e);
    };
    return (<div ref={containerRef} className={`group relative ${disabled ? 'cursor-not-allowed opacity-50' : ''} ${className}`} style={{
            ...style,
            display: style?.display ||
                (fillMode || style?.flex || style?.flexGrow || style?.flexShrink || style?.flexBasis
                    ? 'flex'
                    : 'inline-flex'),
            // When fillMode is true, use column direction so content wrapper can expand vertically
            ...(fillMode && !style?.flexDirection && { flexDirection: 'column' }),
            isolation: 'isolate',
            opacity: disabled ? 0.5 : opacity,
            transition: transition
                ? style?.transition
                    ? `${transition}, ${style.transition}`
                    : transition
                : style?.transition,
            pointerEvents: disabled ? 'none' : undefined,
        }} onClick={handleClick} onMouseEnter={disabled ? undefined : handleMouseEnter} onMouseLeave={disabled ? undefined : handleMouseLeave} onKeyDown={handleKeyDown} onFocus={onFocus} onBlur={onBlur} role={effectiveRole} tabIndex={effectiveTabIndex} aria-label={ariaLabel} aria-labelledby={ariaLabelledby} aria-describedby={ariaDescribedby} aria-disabled={ariaDisabled ?? disabled} aria-pressed={ariaPressed} aria-expanded={ariaExpanded} data-testid={dataTestId} data-skwircle="true" data-variant={effectiveVariant} data-intent={effectiveIntent} data-disabled={disabled || undefined}>
      {/* Shadow Layer */}
      {hasShadow && (<rendering_1.SkwircleShadow dimensions={dimensions} borderWidth={resolvedBorderWidth} shadowConfig={shadowConfig} path={paths.border}/>)}

      {/* SVG Shape Layer */}
      <rendering_1.SkwircleSvg dimensions={dimensions} borderWidth={resolvedBorderWidth} outerBorderWidth={outerBorderWidth} outerBorderOpacity={resolvedRingOpacity / 100} paths={paths} bgColor={colors.bgColor} borderColor={colors.borderColor} outerBorderColor={colors.outerBorderColor} borderGradient={borderGradientConfig} backgroundGradient={backgroundGradientConfig} overflow={overflow}/>

      {/* Content */}
      <div ref={contentRef} className={contentWrapperClassName ?? variantConfig.contentWrapperClassName} style={{
            position: 'relative',
            zIndex: 1,
            margin: totalBorderOffset,
            // When fillMode is true, expand to fill container
            ...(fillMode && {
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
            }),
            ...(overflow !== 'visible' && {
                overflow: 'hidden',
                // Force GPU layer for Safari clip-path fix
                transform: 'translateZ(0)',
            }),
            ...contentWrapperStyle,
        }}>
        {children}
      </div>
    </div>);
};
// =============================================================================
// COMPOUND COMPONENTS
// =============================================================================
// Components are defined in ./components/ and created via factory functions.
// This keeps the base component clean and allows config co-location.
/**
 * Skwircle - Unified squircle component
 *
 * Features:
 * - Variant-first API (card, button, badge, input, avatar)
 * - Intent system (default, primary, secondary, ghost, error, success, warning)
 * - Smart FOUC prevention (mountStrategy='auto')
 * - Compound components (Skwircle.Card, Skwircle.Button, etc.)
 */
exports.Skwircle = SkwircleBase;
// Attach compound components from ./components/
exports.Skwircle.Button = (0, components_1.createSkwircleButton)(SkwircleBase);
exports.Skwircle.Badge = (0, components_1.createSkwircleBadge)(SkwircleBase);
exports.Skwircle.Card = (0, components_1.createSkwircleCard)(SkwircleBase);
exports.Skwircle.Input = (0, components_1.createSkwircleInput)(SkwircleBase);
exports.Skwircle.Avatar = (0, components_1.createSkwircleAvatar)(SkwircleBase);
//# sourceMappingURL=skwircle.js.map
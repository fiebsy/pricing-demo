"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDisplayCardContext = exports.DisplayCard = void 0;
const React = require("react");
const react_1 = require("react");
const utils_1 = require("@/lib/utils");
const config_1 = require("./config");
const DisplayCardContext = (0, react_1.createContext)(null);
const useDisplayCardContext = () => {
    const context = (0, react_1.useContext)(DisplayCardContext);
    if (!context) {
        throw new Error('DisplayCard compound components must be used within DisplayCard');
    }
    return context;
};
exports.useDisplayCardContext = useDisplayCardContext;
// =============================================================================
// STYLE UTILITIES
// =============================================================================
const getBackgroundClass = (value) => {
    return config_1.backgroundStyles[value] ?? 'bg-primary';
};
const buildShineClass = (type, intensity, shadow) => {
    if (type === 'none')
        return '';
    let className = `shine-${type}`;
    if (intensity !== 'normal')
        className += `-${intensity}`;
    if (shadow !== 'none')
        className += `-shadow-${shadow}`;
    return className;
};
const buildDepthClass = (intensity, color, direction) => {
    if (intensity === 'none')
        return '';
    let className = `subtle-depth-${intensity}-${color}`;
    if (direction !== 'bottom')
        className += `-${direction}`;
    return className;
};
const buildLayerClasses = (style, borderRadius) => {
    const shineClass = buildShineClass(style.shine, style.shineIntensity, style.shineShadow);
    const depthClass = buildDepthClass(style.depth, style.depthColor, style.depthDirection);
    const cornerClass = borderRadius > 0 ? 'corner-squircle' : '';
    return (0, utils_1.cn)(getBackgroundClass(style.background), depthClass, cornerClass, shineClass);
};
// =============================================================================
// MAIN COMPONENT
// =============================================================================
const DisplayCardRoot = (0, react_1.forwardRef)(({ variant = 'default', width = 'auto', outerStyle, innerStyle, padding, className, children, }, ref) => {
    const variantConfig = (0, config_1.getVariant)(variant);
    // Merge variant with overrides
    const resolvedOuter = { ...variantConfig.outer, ...outerStyle };
    const resolvedInner = { ...variantConfig.inner, ...innerStyle };
    const resolvedPadding = padding ?? variantConfig.padding;
    const innerBorderRadius = (0, config_1.getInnerBorderRadius)(resolvedPadding);
    const outerClasses = buildLayerClasses(resolvedOuter, config_1.BORDER_RADIUS_OUTER);
    // Width style
    const widthStyle = (0, react_1.useMemo)(() => {
        if (width === 'auto')
            return {};
        if (width === 'full')
            return { width: '100%' };
        return { width: `${width}px`, maxWidth: '100%' };
    }, [width]);
    const contextValue = (0, react_1.useMemo)(() => ({
        innerStyle: resolvedInner,
        innerBorderRadius,
        innerPadding: config_1.INNER_CONTENT_PADDING,
    }), [resolvedInner, innerBorderRadius]);
    return (<DisplayCardContext.Provider value={contextValue}>
        <div ref={ref} className={(0, utils_1.cn)(outerClasses, className)} style={{
            padding: `${resolvedPadding}px`,
            borderRadius: `${config_1.BORDER_RADIUS_OUTER}px`,
            ...widthStyle,
        }}>
          {children}
        </div>
      </DisplayCardContext.Provider>);
});
DisplayCardRoot.displayName = 'DisplayCard';
// =============================================================================
// HEADER COMPONENT
// =============================================================================
const DisplayCardHeader = (0, react_1.forwardRef)(({ className, children }, ref) => {
    const { innerPadding } = useDisplayCardContext();
    return (<div ref={ref} className={(0, utils_1.cn)('text-primary font-medium text-sm', className)} style={{
            paddingTop: 12,
            paddingBottom: 12,
            paddingLeft: innerPadding,
            paddingRight: innerPadding,
        }}>
        {children}
      </div>);
});
DisplayCardHeader.displayName = 'DisplayCard.Header';
// =============================================================================
// CONTENT COMPONENT
// =============================================================================
const DisplayCardContent = (0, react_1.forwardRef)(({ className, padding, children }, ref) => {
    const { innerStyle, innerBorderRadius, innerPadding } = useDisplayCardContext();
    const innerClasses = buildLayerClasses(innerStyle, innerBorderRadius);
    const resolvedPadding = padding ?? innerPadding;
    return (<div ref={ref} className={(0, utils_1.cn)(innerClasses, className)} style={{
            padding: `${resolvedPadding}px`,
            borderRadius: `${innerBorderRadius}px`,
        }}>
        {children}
      </div>);
});
DisplayCardContent.displayName = 'DisplayCard.Content';
// =============================================================================
// COMPOUND EXPORT
// =============================================================================
exports.DisplayCard = Object.assign(DisplayCardRoot, {
    Header: DisplayCardHeader,
    Content: DisplayCardContent,
});
//# sourceMappingURL=display-card.js.map
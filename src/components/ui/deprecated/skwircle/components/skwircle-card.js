"use strict";
/**
 * Skwircle Card Component
 *
 * A pre-configured card variant of Skwircle for content containers.
 * Cards use neutral backgrounds and subtle borders - they are NOT interactive.
 *
 * @example Basic
 * ```tsx
 * <SkwircleCard elevation="sm">
 *   <div className="p-5">
 *     <h3>Card Title</h3>
 *     <p>Card content...</p>
 *   </div>
 * </SkwircleCard>
 * ```
 *
 * @example With depth gradient
 * ```tsx
 * <SkwircleCard
 *   elevation="sm"
 *   backgroundGradient="depth-10-bottom-right"
 * >
 *   <div className="p-5">Content with inner shadow effect</div>
 * </SkwircleCard>
 * ```
 *
 * @example Full width
 * ```tsx
 * <SkwircleCard fillMode className="w-full">
 *   <div className="p-6">Responsive card</div>
 * </SkwircleCard>
 * ```
 */
'use client';
/**
 * Skwircle Card Component
 *
 * A pre-configured card variant of Skwircle for content containers.
 * Cards use neutral backgrounds and subtle borders - they are NOT interactive.
 *
 * @example Basic
 * ```tsx
 * <SkwircleCard elevation="sm">
 *   <div className="p-5">
 *     <h3>Card Title</h3>
 *     <p>Card content...</p>
 *   </div>
 * </SkwircleCard>
 * ```
 *
 * @example With depth gradient
 * ```tsx
 * <SkwircleCard
 *   elevation="sm"
 *   backgroundGradient="depth-10-bottom-right"
 * >
 *   <div className="p-5">Content with inner shadow effect</div>
 * </SkwircleCard>
 * ```
 *
 * @example Full width
 * ```tsx
 * <SkwircleCard fillMode className="w-full">
 *   <div className="p-6">Responsive card</div>
 * </SkwircleCard>
 * ```
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSkwircleCard = void 0;
const React = require("react");
/**
 * Internal component - gets the base Skwircle injected
 */
const createSkwircleCard = (SkwircleBase) => {
    const SkwircleCard = (props) => {
        return <SkwircleBase variant="card" {...props}/>;
    };
    SkwircleCard.displayName = 'Skwircle.Card';
    return SkwircleCard;
};
exports.createSkwircleCard = createSkwircleCard;
//# sourceMappingURL=skwircle-card.js.map
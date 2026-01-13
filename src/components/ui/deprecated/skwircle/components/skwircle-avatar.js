"use strict";
/**
 * Skwircle Avatar Component
 *
 * A pre-configured avatar variant of Skwircle for profile images.
 *
 * @example Basic
 * ```tsx
 * <SkwircleAvatar style={{ width: 40, height: 40 }}>
 *   <img src="/avatar.jpg" alt="User" />
 * </SkwircleAvatar>
 * ```
 *
 * @example With ring
 * ```tsx
 * <SkwircleAvatar ring ringColor="border-brand" style={{ width: 48, height: 48 }}>
 *   <img src="/avatar.jpg" alt="User" className="w-full h-full object-cover" />
 * </SkwircleAvatar>
 * ```
 */
'use client';
/**
 * Skwircle Avatar Component
 *
 * A pre-configured avatar variant of Skwircle for profile images.
 *
 * @example Basic
 * ```tsx
 * <SkwircleAvatar style={{ width: 40, height: 40 }}>
 *   <img src="/avatar.jpg" alt="User" />
 * </SkwircleAvatar>
 * ```
 *
 * @example With ring
 * ```tsx
 * <SkwircleAvatar ring ringColor="border-brand" style={{ width: 48, height: 48 }}>
 *   <img src="/avatar.jpg" alt="User" className="w-full h-full object-cover" />
 * </SkwircleAvatar>
 * ```
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSkwircleAvatar = void 0;
const React = require("react");
/**
 * Internal component - gets the base Skwircle injected
 */
const createSkwircleAvatar = (SkwircleBase) => {
    const SkwircleAvatar = (props) => {
        return <SkwircleBase variant="avatar" {...props}/>;
    };
    SkwircleAvatar.displayName = 'Skwircle.Avatar';
    return SkwircleAvatar;
};
exports.createSkwircleAvatar = createSkwircleAvatar;
//# sourceMappingURL=skwircle-avatar.js.map
"use strict";
/**
 * Skwircle Input Component
 *
 * A pre-configured input variant of Skwircle for form fields.
 * Supports ring states for focus and error indication.
 *
 * @example Basic
 * ```tsx
 * <SkwircleInput style={{ width: 300 }}>
 *   <input
 *     type="text"
 *     placeholder="Enter text..."
 *     className="w-full bg-transparent px-3 py-2.5 text-sm outline-none"
 *   />
 * </SkwircleInput>
 * ```
 *
 * @example Focused state
 * ```tsx
 * <SkwircleInput ring ringColor="outline-color-brand">
 *   <input ... />
 * </SkwircleInput>
 * ```
 *
 * @example Error state
 * ```tsx
 * <SkwircleInput
 *   borderColor="border-error"
 *   ring
 *   ringColor="outline-color-error"
 * >
 *   <input ... />
 * </SkwircleInput>
 * ```
 */
'use client';
/**
 * Skwircle Input Component
 *
 * A pre-configured input variant of Skwircle for form fields.
 * Supports ring states for focus and error indication.
 *
 * @example Basic
 * ```tsx
 * <SkwircleInput style={{ width: 300 }}>
 *   <input
 *     type="text"
 *     placeholder="Enter text..."
 *     className="w-full bg-transparent px-3 py-2.5 text-sm outline-none"
 *   />
 * </SkwircleInput>
 * ```
 *
 * @example Focused state
 * ```tsx
 * <SkwircleInput ring ringColor="outline-color-brand">
 *   <input ... />
 * </SkwircleInput>
 * ```
 *
 * @example Error state
 * ```tsx
 * <SkwircleInput
 *   borderColor="border-error"
 *   ring
 *   ringColor="outline-color-error"
 * >
 *   <input ... />
 * </SkwircleInput>
 * ```
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSkwircleInput = void 0;
const React = require("react");
/**
 * Internal component - gets the base Skwircle injected
 */
const createSkwircleInput = (SkwircleBase) => {
    const SkwircleInput = (props) => {
        return <SkwircleBase variant="input" {...props}/>;
    };
    SkwircleInput.displayName = 'Skwircle.Input';
    return SkwircleInput;
};
exports.createSkwircleInput = createSkwircleInput;
//# sourceMappingURL=skwircle-input.js.map
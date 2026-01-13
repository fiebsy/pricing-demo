"use strict";
/**
 * StickyDataTable - Deep Merge Utility
 *
 * Generic deep merge for configuration objects.
 *
 * @module config/calculators/deep-merge
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepMerge = void 0;
// ============================================================================
// DEEP MERGE
// ============================================================================
/**
 * Deep merge utility for configuration objects
 */
function deepMerge(target, source) {
    const result = { ...target };
    for (const key in source) {
        const sourceValue = source[key];
        const targetValue = target[key];
        if (sourceValue !== undefined &&
            typeof sourceValue === 'object' &&
            sourceValue !== null &&
            !Array.isArray(sourceValue) &&
            typeof targetValue === 'object' &&
            targetValue !== null &&
            !Array.isArray(targetValue)) {
            result[key] = deepMerge(targetValue, sourceValue);
        }
        else if (sourceValue !== undefined) {
            result[key] = sourceValue;
        }
    }
    return result;
}
exports.deepMerge = deepMerge;
//# sourceMappingURL=deep-merge.js.map
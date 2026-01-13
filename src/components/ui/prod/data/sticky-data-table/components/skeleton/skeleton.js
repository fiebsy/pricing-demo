"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Skeleton = void 0;
const utils_1 = require("@/lib/utils");
/**
 * Skeleton Component
 *
 * A simple skeleton loading placeholder for the sticky-data-table.
 * Uses semantic tokens and squircle corners for PAYVA design consistency.
 */
function Skeleton({ className, ...props }) {
    return <div className={(0, utils_1.cn)('bg-tertiary animate-pulse rounded-lg corner-squircle', className)} {...props}/>;
}
exports.Skeleton = Skeleton;
//# sourceMappingURL=skeleton.js.map
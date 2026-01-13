"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cx = void 0;
const clsx_1 = require("clsx");
const tailwind_merge_1 = require("tailwind-merge");
/**
 * Combines class names using clsx and tailwind-merge
 * Used throughout v2 components for conditional className merging
 */
function cx(...inputs) {
    return (0, tailwind_merge_1.twMerge)((0, clsx_1.clsx)(inputs));
}
exports.cx = cx;
//# sourceMappingURL=cx.js.map
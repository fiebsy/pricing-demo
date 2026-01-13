"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cn = void 0;
const clsx_1 = require("clsx");
const tailwind_merge_1 = require("tailwind-merge");
/**
 * Combines class names using clsx and tailwind-merge
 * Useful for conditionally applying Tailwind classes while avoiding conflicts
 */
function cn(...inputs) {
    return (0, tailwind_merge_1.twMerge)((0, clsx_1.clsx)(inputs));
}
exports.cn = cn;
//# sourceMappingURL=utils.js.map
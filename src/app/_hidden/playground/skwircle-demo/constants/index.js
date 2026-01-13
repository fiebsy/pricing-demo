"use strict";
/**
 * Constants Index
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ELEVATION_OPTIONS = exports.ROUNDNESS_OPTIONS = void 0;
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./button-config"), exports);
tslib_1.__exportStar(require("./input-config"), exports);
tslib_1.__exportStar(require("./badge-config"), exports);
tslib_1.__exportStar(require("./card-config"), exports);
tslib_1.__exportStar(require("./dashboard-config"), exports);
// Shared constants
exports.ROUNDNESS_OPTIONS = [
    { label: 'None', value: 'none' },
    { label: 'Subtle', value: 'subtle' },
    { label: 'Moderate', value: 'moderate' },
    { label: 'Rounded', value: 'rounded' },
    { label: 'Pill', value: 'pill' },
];
exports.ELEVATION_OPTIONS = [
    { label: 'None', value: 'none' },
    { label: 'XS', value: 'xs' },
    { label: 'SM', value: 'sm' },
];
//# sourceMappingURL=index.js.map
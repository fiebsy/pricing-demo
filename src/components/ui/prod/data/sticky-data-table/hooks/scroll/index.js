"use strict";
/**
 * Scroll - Scroll and viewport hooks
 *
 * Handles scroll synchronization, wheel events, and infinite scroll.
 *
 * @module hooks/scroll
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.useInfiniteScroll = exports.useWheelRedirect = exports.useScrollSync = void 0;
var use_scroll_sync_1 = require("./use-scroll-sync");
Object.defineProperty(exports, "useScrollSync", { enumerable: true, get: function () { return use_scroll_sync_1.useScrollSync; } });
var use_wheel_redirect_1 = require("./use-wheel-redirect");
Object.defineProperty(exports, "useWheelRedirect", { enumerable: true, get: function () { return use_wheel_redirect_1.useWheelRedirect; } });
var use_infinite_scroll_1 = require("./use-infinite-scroll");
Object.defineProperty(exports, "useInfiniteScroll", { enumerable: true, get: function () { return use_infinite_scroll_1.useInfiniteScroll; } });
//# sourceMappingURL=index.js.map
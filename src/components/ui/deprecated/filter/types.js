"use strict";
/**
 * Filter Component Type Definitions
 *
 * Animation Architecture Reference:
 * ─────────────────────────────────
 * Container 1:  Menu.Popup (outer wrapper with border, shadow)
 * Container 1A: Root menu panel (home/parent menu)
 * Container 1B: Submenu panel (1B1 = Notifications, 1B2 = Invite Users, etc.)
 *
 * Panel Navigation (1A ↔ 1B) involves three synchronized animations:
 * 1. Slide (translateX) - S-Tier, GPU-accelerated
 * 2. Height (Container 1 grows/shrinks) - B-Tier, layout recalc
 * 3. Opacity crossfade (1A fades out, 1B fades in) - S-Tier
 *
 * @module base-ui/filter/types
 */
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=types.js.map
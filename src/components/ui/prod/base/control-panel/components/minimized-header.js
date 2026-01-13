"use strict";
// =============================================================================
// Minimized Header
// =============================================================================
// Compact header shown when the panel is minimized.
// Shows title and expand button.
// =============================================================================
'use client';
// =============================================================================
// Minimized Header
// =============================================================================
// Compact header shown when the panel is minimized.
// Shows title and expand button.
// =============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinimizedHeader = void 0;
const Add01Icon_1 = require("@hugeicons-pro/core-stroke-rounded/Add01Icon");
const cx_1 = require("@/components/utils/cx");
const icon_1 = require("@/components/ui/prod/base/icon");
const context_1 = require("../context");
function MinimizedHeader({ title, className }) {
    const { toggleMinimized } = (0, context_1.usePanelContext)();
    return (<button type="button" onClick={toggleMinimized} className={(0, cx_1.cx)('bg-primary border-primary flex items-center justify-center rounded-lg border p-2 shadow-lg', 'hover:bg-secondary transition-colors duration-150', 'focus:ring-brand focus:ring-2 focus:outline-none', 'motion-reduce:transition-none', className)} title={title}>
      <icon_1.HugeIcon icon={Add01Icon_1.default} size={16} strokeWidth={2} className="text-secondary"/>
    </button>);
}
exports.MinimizedHeader = MinimizedHeader;
//# sourceMappingURL=minimized-header.js.map
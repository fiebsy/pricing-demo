"use strict";
/**
 * ChipPopup - Select dropdown popup
 *
 * The dropdown menu that appears when a chip is clicked.
 * Contains header with filter label and list of options.
 *
 * @module prod/base/filter/filter-select-chip-motion/components/chip-popup
 */
'use client';
/**
 * ChipPopup - Select dropdown popup
 *
 * The dropdown menu that appears when a chip is clicked.
 * Contains header with filter label and list of options.
 *
 * @module prod/base/filter/filter-select-chip-motion/components/chip-popup
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChipPopup = void 0;
const select_1 = require("@base-ui/react/select");
const react_1 = require("motion/react");
const utils_1 = require("@/lib/utils");
const option_item_1 = require("./option-item");
// ============================================================================
// Component
// ============================================================================
function ChipPopup({ label, options, isOpen }) {
    return (<select_1.Select.Portal>
      <select_1.Select.Positioner sideOffset={0} alignItemWithTrigger className="z-50">
        <select_1.Select.Popup render={<react_1.motion.div initial={false} animate={{ opacity: isOpen ? 1 : 0 }} transition={{ duration: 0.1 }}/>} className={(0, utils_1.cn)('bg-primary border border-primary rounded-xl shadow-lg', 'p-1 min-w-[160px]', 'outline-none')}>
          {/* Header - filter label */}
          <div className="flex items-center text-quaternary opacity-60 px-2 min-h-7 text-xs font-normal mb-1">
            {label}
          </div>

          {/* Options */}
          {options.map((option) => (<option_item_1.OptionItem key={option.id} option={option}/>))}
        </select_1.Select.Popup>
      </select_1.Select.Positioner>
    </select_1.Select.Portal>);
}
exports.ChipPopup = ChipPopup;
ChipPopup.displayName = 'ChipPopup';
//# sourceMappingURL=chip-popup.js.map
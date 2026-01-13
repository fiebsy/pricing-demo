"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableEmptyState = void 0;
const icon_1 = require("@/components/ui/prod/base/icon");
const Search01Icon_1 = require("@hugeicons-pro/core-stroke-rounded/Search01Icon");
const Folder01Icon_1 = require("@hugeicons-pro/core-stroke-rounded/Folder01Icon");
const button_1 = require("@/components/ui/base/primitives/button");
const cx_1 = require("@/components/utils/cx");
const defaultContent = {
    'no-results': {
        title: 'No results found',
        description: 'Try adjusting your search or filters to find what you\'re looking for.',
    },
    empty: {
        title: 'No results',
        description: 'There\'s nothing to display yet.',
    },
};
function TableEmptyState({ variant, title, description, searchTerm, action, secondaryAction, className, }) {
    const content = defaultContent[variant];
    const displayTitle = title ?? content.title;
    const displayDescription = searchTerm
        ? `No results found for "${searchTerm}". Try a different search term.`
        : (description ?? content.description);
    return (<div className={(0, cx_1.cx)('flex flex-col items-center justify-center py-16 px-6', className)}>
      {/* Icon */}
      <div className="mb-4 flex items-center justify-center size-12 rounded-full bg-secondary">
        <icon_1.HugeIcon icon={variant === 'no-results' ? Search01Icon_1.default : Folder01Icon_1.default} size={24} className="text-tertiary"/>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center text-center max-w-xs">
        <h3 className="text-primary text-sm font-semibold mb-1">
          {displayTitle}
        </h3>
        <p className="text-tertiary text-sm leading-relaxed">
          {displayDescription}
        </p>
      </div>

      {/* Actions - Only show if provided */}
      {(action || secondaryAction) && (<div className="flex items-center gap-3 mt-6">
          {secondaryAction && (<button_1.Button size="md" color="secondary" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </button_1.Button>)}
          {action && (<button_1.Button size="md" color="primary" onClick={action.onClick}>
              {action.label}
            </button_1.Button>)}
        </div>)}
    </div>);
}
exports.TableEmptyState = TableEmptyState;
//# sourceMappingURL=table-empty-state.js.map
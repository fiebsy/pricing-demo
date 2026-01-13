"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableEmptyState = void 0;
const Search01Icon_1 = require("@hugeicons-pro/core-stroke-rounded/Search01Icon");
const InboxIcon_1 = require("@hugeicons-pro/core-stroke-rounded/InboxIcon");
const utils_1 = require("@/lib/utils");
const featured_icon_1 = require("@/components/ui/prod/features/featured-icon");
const button_1 = require("@/components/ui/prod/base/button");
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
    // Select the appropriate HugeIcon based on variant
    const IconComponent = variant === 'no-results' ? Search01Icon_1.default : InboxIcon_1.default;
    return (<div className={(0, utils_1.cn)('flex flex-col items-center justify-center py-16 px-6', className)}>
      {/* Icon */}
      <div className="mb-4">
        <featured_icon_1.FeaturedIcon icon={IconComponent} color="gray" theme="modern" size="lg"/>
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
          {secondaryAction && (<button_1.Button size="md" variant="secondary" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </button_1.Button>)}
          {action && (<button_1.Button size="md" variant="primary" onClick={action.onClick}>
              {action.label}
            </button_1.Button>)}
        </div>)}
    </div>);
}
exports.TableEmptyState = TableEmptyState;
//# sourceMappingURL=table-empty-state.js.map
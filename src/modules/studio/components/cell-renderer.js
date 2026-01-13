"use strict";
/**
 * Studio Dashboard - Cell Renderer
 *
 * Handles the audience column set: Name, Messages, Tags, Last Interacted, Access Group
 */
'use client';
/**
 * Studio Dashboard - Cell Renderer
 *
 * Handles the audience column set: Name, Messages, Tags, Last Interacted, Access Group
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderCell = void 0;
const react_1 = require("react");
const utils_1 = require("@/lib/utils");
const badge_1 = require("@/components/ui/prod/base/badge");
const tooltip_1 = require("@/components/ui/prod/base/tooltip");
// =============================================================================
// RELATIVE TIME FORMATTER
// =============================================================================
/**
 * Format a date to relative time (e.g., "2 hours ago", "Yesterday", "Jan 10")
 */
const formatRelativeTime = (date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffMins < 60) {
        return diffMins <= 1 ? 'Just now' : `${diffMins} minutes ago`;
    }
    if (diffHours < 24) {
        return diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`;
    }
    if (diffDays === 1) {
        return 'Yesterday';
    }
    if (diffDays < 7) {
        return `${diffDays} days ago`;
    }
    // Format as "Jan 10" for older dates
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};
/**
 * Format date for tooltip (full date and time)
 */
const formatFullDate = (date) => {
    return date.toLocaleString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    });
};
// =============================================================================
// ACCESS GROUP BADGE COLORS
// =============================================================================
const ACCESS_GROUP_COLORS = {
    Public: 'success',
    Insiders: 'info',
    Invited: 'gray',
    Revoked: 'error',
};
// =============================================================================
// CELL RENDERER
// =============================================================================
/**
 * Render cell content based on column key
 */
const renderCell = (columnKey, item, _index) => {
    switch (columnKey) {
        case 'name': {
            // Show name as primary, with email indicator if name looks like an email
            const isEmailName = item.name.includes('@');
            return (<div className="flex flex-col gap-0.5">
          <span className={(0, utils_1.cn)('text-sm text-primary truncate max-w-[180px]', 'cursor-pointer hover:underline')} title={item.name}>
            {item.name}
          </span>
          {!isEmailName && (<span className="text-xs text-tertiary truncate max-w-[180px]" title={item.email}>
              {item.email}
            </span>)}
        </div>);
        }
        case 'messages':
            return (<span className="text-sm text-primary tabular-nums">
          {item.messageCount.toLocaleString()}
        </span>);
        case 'tags': {
            if (item.tags.length === 0) {
                return <span className="text-quaternary">—</span>;
            }
            const visibleTags = item.tags.slice(0, 2);
            const remainingCount = item.tags.length - 2;
            return (<div className="flex flex-wrap items-center gap-1">
          {visibleTags.map((tag) => (<badge_1.Badge key={tag} size="xs" shape="pill" color="gray">
              {tag}
            </badge_1.Badge>))}
          {remainingCount > 0 && (<tooltip_1.Tooltip title={`${remainingCount} more tags`} description={item.tags.slice(2).join(', ')} side="top" delay={200}>
              <badge_1.Badge size="xs" shape="pill" color="gray">
                +{remainingCount}
              </badge_1.Badge>
            </tooltip_1.Tooltip>)}
        </div>);
        }
        case 'lastInteracted': {
            const relativeTime = formatRelativeTime(item.lastInteracted);
            const fullTime = formatFullDate(item.lastInteracted);
            return (<tooltip_1.Tooltip title={fullTime} side="top" delay={200}>
          <span className="text-sm text-tertiary cursor-default">
            {relativeTime}
          </span>
        </tooltip_1.Tooltip>);
        }
        case 'accessGroup':
            return (<badge_1.Badge size="xs" shape="pill" color={ACCESS_GROUP_COLORS[item.accessGroup]}>
          {item.accessGroup}
        </badge_1.Badge>);
        default:
            return null;
    }
};
exports.renderCell = renderCell;
//# sourceMappingURL=cell-renderer.js.map
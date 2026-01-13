"use strict";
/**
 * Collections Module - Formatters
 *
 * Utility functions for formatting data in the collections table.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatAmount = exports.formatCurrencyCompact = exports.formatCurrency = exports.formatStatusContext = exports.toDateString = exports.formatShortDate = exports.formatRelativeTime = exports.formatPlanType = void 0;
const date_fns_1 = require("date-fns");
// =============================================================================
// PLAN TYPE FORMATTER
// =============================================================================
/**
 * Format plan type for display
 */
const formatPlanType = (planType) => {
    if (!planType)
        return 'Unknown';
    const planTypeStr = String(planType);
    if (planTypeStr === 'PAC' || planTypeStr === 'servicing' || planTypeStr === 'SERVICING') {
        return 'PAC';
    }
    if (planTypeStr === 'upfront' || planTypeStr === 'funding' || planTypeStr === 'UPFRONT' || planTypeStr === 'FUNDING') {
        return 'Upfront';
    }
    return planTypeStr;
};
exports.formatPlanType = formatPlanType;
// =============================================================================
// DATE/TIME FORMATTERS
// =============================================================================
/**
 * Format to relative time (e.g., "2h", "3d", "1w")
 */
const formatRelativeTime = (date) => {
    if (!date)
        return null;
    try {
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        if (!(0, date_fns_1.isValid)(dateObj))
            return null;
        const now = new Date();
        const diffMs = now.getTime() - dateObj.getTime();
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        if (diffMinutes < 60)
            return `${diffMinutes}mn`;
        if (diffHours < 24)
            return `${diffHours}h`;
        if (diffDays < 7)
            return `${diffDays}d`;
        if (diffDays < 30)
            return `${Math.floor(diffDays / 7)}w`;
        return `${Math.floor(diffDays / 30)}mo`;
    }
    catch {
        return null;
    }
};
exports.formatRelativeTime = formatRelativeTime;
/**
 * Format to short date (e.g., "Nov 7", "Dec 1")
 */
const formatShortDate = (date) => {
    if (!date)
        return null;
    try {
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        if (!(0, date_fns_1.isValid)(dateObj))
            return null;
        return (0, date_fns_1.format)(dateObj, 'MMM d');
    }
    catch {
        return null;
    }
};
exports.formatShortDate = formatShortDate;
/**
 * Convert Date to string for FormattedDate component
 */
const toDateString = (date) => {
    if (!date)
        return '';
    if (typeof date === 'string')
        return date;
    try {
        return date.toISOString();
    }
    catch {
        return '';
    }
};
exports.toDateString = toDateString;
/**
 * Format status context transition for display
 *
 * Takes previous and current status and returns a human-readable description
 */
const formatStatusContext = (previousStatus, currentStatus, category) => {
    if (!previousStatus)
        return null;
    // Build condensed description based on transition
    let condensed = 'Status changed';
    let tooltip = '';
    // Common transitions
    const from = previousStatus.toLowerCase().replace(/_/g, ' ');
    const to = currentStatus.toLowerCase().replace(/_/g, ' ');
    // Detect specific transitions
    if (currentStatus === 'COLLECTIONS') {
        condensed = 'Entered Collections';
        tooltip = 'Contract moved to collections status';
    }
    else if (currentStatus === 'CLAWBACK_IN_PROGRESS') {
        condensed = 'Clawback Started';
        tooltip = 'Clawback process has been initiated';
    }
    else if (currentStatus === 'PAID' || currentStatus === 'COMPLETED') {
        condensed = 'Payment Received';
        tooltip = 'Contract has been paid';
    }
    else if (currentStatus === 'CANCELLED') {
        condensed = 'Cancelled';
        tooltip = 'Contract has been cancelled';
    }
    else if (previousStatus === 'COLLECTIONS' && currentStatus !== 'COLLECTIONS') {
        condensed = 'Left Collections';
        tooltip = `Moved from collections to ${to}`;
    }
    else {
        // Generic transition
        condensed = `${from} → ${to}`;
        tooltip = `Status changed from ${from} to ${to}`;
    }
    // Add category info if available
    if (category) {
        tooltip += ` (${category})`;
    }
    return {
        condensed,
        tooltip,
        raw: { from: previousStatus, to: currentStatus },
    };
};
exports.formatStatusContext = formatStatusContext;
// =============================================================================
// CURRENCY FORMATTER
// =============================================================================
/**
 * Format currency for display (full format with decimals)
 */
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};
exports.formatCurrency = formatCurrency;
/**
 * Format currency for compact display (e.g., "$12.5k", "$1.2M")
 */
const formatCurrencyCompact = (amount) => {
    if (amount >= 1000000) {
        return `$${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
        return `$${(amount / 1000).toFixed(1)}k`;
    }
    return `$${amount.toFixed(0)}`;
};
exports.formatCurrencyCompact = formatCurrencyCompact;
/**
 * Format amount for table display
 */
const formatAmount = (amount) => {
    if (amount == null)
        return '$0';
    return (0, exports.formatCurrency)(amount);
};
exports.formatAmount = formatAmount;
//# sourceMappingURL=formatters.js.map
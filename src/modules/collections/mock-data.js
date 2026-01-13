"use strict";
/**
 * Collections Module - Mock Data
 *
 * Generates deterministic mock data for the collections dashboard.
 * Uses seeded random for reproducible data generation.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MOCK_METRICS = exports.MOCK_DATA = exports.calculateMockMetrics = exports.generateMockData = void 0;
const types_1 = require("./types");
// =============================================================================
// SEEDED RANDOM GENERATOR
// =============================================================================
/**
 * Seeded pseudo-random for deterministic data generation
 */
const seededRandom = (seed) => {
    const x = Math.sin(seed * 9999) * 10000;
    return x - Math.floor(x);
};
/**
 * Get random item from array using seed
 */
const randomFromArray = (arr, seed) => {
    const index = Math.floor(seededRandom(seed) * arr.length);
    return arr[index];
};
/**
 * Get random number in range using seed
 */
const randomInRange = (min, max, seed) => {
    return min + seededRandom(seed) * (max - min);
};
/**
 * Get random integer in range using seed
 */
const randomIntInRange = (min, max, seed) => {
    return Math.floor(randomInRange(min, max, seed));
};
// =============================================================================
// DATA CONSTANTS
// =============================================================================
const FIRST_NAMES = [
    'James', 'Mary', 'Robert', 'Patricia', 'John', 'Jennifer', 'Michael', 'Linda',
    'David', 'Elizabeth', 'William', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica',
    'Thomas', 'Sarah', 'Charles', 'Karen', 'Christopher', 'Lisa', 'Daniel', 'Nancy',
    'Matthew', 'Betty', 'Anthony', 'Margaret', 'Mark', 'Sandra', 'Donald', 'Ashley',
    'Steven', 'Kimberly', 'Paul', 'Emily', 'Andrew', 'Donna', 'Joshua', 'Michelle',
];
const LAST_NAMES = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
    'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
    'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson',
    'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker',
    'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
];
const EMAIL_DOMAINS = [
    'gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com',
    'proton.me', 'aol.com', 'live.com',
];
const COLLECTIONS_STATUSES = [
    types_1.ContractStatus.FailedPayment,
    types_1.ContractStatus.NsfReturned,
    types_1.ContractStatus.PaymentPending,
];
const CLAWBACK_STATUSES_DEFAULTED = [
    types_1.ContractStatus.DefaultedPendingClawback,
    types_1.ContractStatus.DefaultedSettled,
];
const CLAWBACK_STATUSES_CANCELED = [
    types_1.ContractStatus.CanceledPendingClawback,
    types_1.ContractStatus.CanceledSettled,
];
const CLAWBACK_STATUSES_CHARGEBACK = [
    types_1.ContractStatus.ChargebackPendingClawback,
    types_1.ContractStatus.ChargebackSettled,
];
const STATUS_DESCRIPTIONS = {
    [types_1.ContractStatus.FailedPayment]: {
        description: 'Payment failed',
        tooltip: 'Last payment attempt was declined',
    },
    [types_1.ContractStatus.NsfReturned]: {
        description: 'NSF returned',
        tooltip: 'Payment returned due to insufficient funds',
    },
    [types_1.ContractStatus.PaymentPending]: {
        description: 'Payment pending',
        tooltip: 'Waiting for payment to clear',
    },
    [types_1.ContractStatus.DefaultedPendingClawback]: {
        description: 'Defaulted - pending clawback',
        tooltip: 'Contract defaulted, clawback in progress',
    },
    [types_1.ContractStatus.DefaultedSettled]: {
        description: 'Defaulted - settled',
        tooltip: 'Contract defaulted, clawback completed',
    },
    [types_1.ContractStatus.CanceledPendingClawback]: {
        description: 'Canceled - pending clawback',
        tooltip: 'Contract canceled, clawback in progress',
    },
    [types_1.ContractStatus.CanceledSettled]: {
        description: 'Canceled - settled',
        tooltip: 'Contract canceled, clawback completed',
    },
    [types_1.ContractStatus.ChargebackPendingClawback]: {
        description: 'Chargeback - pending',
        tooltip: 'Chargeback received, clawback in progress',
    },
    [types_1.ContractStatus.ChargebackSettled]: {
        description: 'Chargeback - settled',
        tooltip: 'Chargeback completed, clawback settled',
    },
    [types_1.ContractStatus.ClawbackInProgress]: {
        description: 'Clawback in progress',
        tooltip: 'Actively processing clawback',
    },
    [types_1.ContractStatus.ClawbackComplete]: {
        description: 'Clawback complete',
        tooltip: 'Clawback has been fully processed',
    },
};
// =============================================================================
// DATA GENERATORS
// =============================================================================
/**
 * Generate a random customer name
 */
const generateCustomerName = (seed) => {
    const firstName = randomFromArray(FIRST_NAMES, seed);
    const lastName = randomFromArray(LAST_NAMES, seed + 1);
    return `${firstName} ${lastName}`;
};
/**
 * Generate a random email from customer name
 */
const generateEmail = (name, seed) => {
    const domain = randomFromArray(EMAIL_DOMAINS, seed);
    const nameParts = name.toLowerCase().split(' ');
    const emailStyle = Math.floor(seededRandom(seed + 10) * 3);
    switch (emailStyle) {
        case 0:
            return `${nameParts[0]}.${nameParts[1]}@${domain}`;
        case 1:
            return `${nameParts[0]}${nameParts[1]}${randomIntInRange(1, 99, seed + 20)}@${domain}`;
        default:
            return `${nameParts[0][0]}${nameParts[1]}@${domain}`;
    }
};
/**
 * Generate a relative time string
 */
const generateRelativeTime = (date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
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
};
/**
 * Generate status changed date based on days in collections
 */
const generateStatusChangedAt = (daysInCollections) => {
    const now = new Date();
    return new Date(now.getTime() - daysInCollections * 24 * 60 * 60 * 1000);
};
// =============================================================================
// MOCK ITEM GENERATORS
// =============================================================================
/**
 * Generate a COLLECTIONS item
 */
const generateCollectionsItem = (index, seed) => {
    const customerName = generateCustomerName(seed);
    const planTotal = randomInRange(500, 5000, seed + 2);
    const paymentsMade = randomIntInRange(1, 8, seed + 3);
    const paymentsTotal = randomIntInRange(paymentsMade + 2, 12, seed + 4);
    const remainingBalance = planTotal * ((paymentsTotal - paymentsMade) / paymentsTotal);
    const atRiskFundedAmount = randomInRange(remainingBalance * 0.6, remainingBalance, seed + 5);
    const daysInCollections = randomIntInRange(1, 14, seed + 6);
    const daysUntilClawback = Math.max(0, 15 - daysInCollections);
    const status = randomFromArray(COLLECTIONS_STATUSES, seed + 7);
    const statusChangedAt = generateStatusChangedAt(daysInCollections);
    const planType = seededRandom(seed + 8) > 0.5 ? types_1.PaymentPlanType.Servicing : types_1.PaymentPlanType.Funding;
    const contractDate = new Date(Date.now() - randomIntInRange(30, 180, seed + 9) * 24 * 60 * 60 * 1000);
    const lastPaymentClearedDate = new Date(statusChangedAt.getTime() - randomIntInRange(1, 10, seed + 10) * 24 * 60 * 60 * 1000);
    // Determine risk tier based on days in collections
    let riskTier;
    if (daysUntilClawback <= 3) {
        riskTier = types_1.RiskTier.High;
    }
    else if (daysUntilClawback <= 7) {
        riskTier = types_1.RiskTier.Medium;
    }
    else {
        riskTier = types_1.RiskTier.Low;
    }
    const statusInfo = STATUS_DESCRIPTIONS[status] || { description: 'Status changed', tooltip: 'Status updated' };
    return {
        id: 1000 + index,
        contractId: 100000 + index,
        customerName,
        customerEmail: generateEmail(customerName, seed + 11),
        planType,
        planTotal,
        remainingBalance,
        atRiskFundedAmount,
        clawbackAmount: null,
        shortfallAmount: null,
        riskCategory: types_1.RiskCategory.Collections,
        riskTier,
        status,
        previousStatus: types_1.ContractStatus.Active,
        statusChangedAt,
        statusTransitionDescription: statusInfo.description,
        statusTransitionTooltip: statusInfo.tooltip,
        statusChangedRelative: generateRelativeTime(statusChangedAt),
        daysUntilClawback,
        daysInCollections,
        contractDate,
        lastPaymentClearedDate,
        isInClawback: false,
        outcomeType: null,
        paymentsMade,
        paymentsTotal,
    };
};
/**
 * Generate an ACTIVE_CLAWBACK item
 */
const generateActiveClawbackItem = (index, seed) => {
    const customerName = generateCustomerName(seed);
    const planTotal = randomInRange(800, 6000, seed + 2);
    const paymentsMade = randomIntInRange(0, 6, seed + 3);
    const paymentsTotal = randomIntInRange(paymentsMade + 4, 12, seed + 4);
    const remainingBalance = planTotal * ((paymentsTotal - paymentsMade) / paymentsTotal);
    const atRiskFundedAmount = randomInRange(remainingBalance * 0.7, remainingBalance, seed + 5);
    const daysInCollections = randomIntInRange(15, 30, seed + 6);
    const planType = seededRandom(seed + 8) > 0.5 ? types_1.PaymentPlanType.Servicing : types_1.PaymentPlanType.Funding;
    const contractDate = new Date(Date.now() - randomIntInRange(60, 200, seed + 9) * 24 * 60 * 60 * 1000);
    const statusChangedAt = generateStatusChangedAt(randomIntInRange(1, 14, seed + 12));
    const lastPaymentClearedDate = new Date(contractDate.getTime() + randomIntInRange(30, 60, seed + 10) * 24 * 60 * 60 * 1000);
    // Randomly select outcome type
    const outcomeRoll = seededRandom(seed + 13);
    let status;
    let outcomeType;
    if (outcomeRoll < 0.6) {
        status = randomFromArray(CLAWBACK_STATUSES_DEFAULTED.filter(s => s.includes('Pending')), seed + 14) || types_1.ContractStatus.DefaultedPendingClawback;
        outcomeType = 'Default';
    }
    else if (outcomeRoll < 0.85) {
        status = randomFromArray(CLAWBACK_STATUSES_CANCELED.filter(s => s.includes('Pending')), seed + 14) || types_1.ContractStatus.CanceledPendingClawback;
        outcomeType = 'Canceled';
    }
    else {
        status = randomFromArray(CLAWBACK_STATUSES_CHARGEBACK.filter(s => s.includes('Pending')), seed + 14) || types_1.ContractStatus.ChargebackPendingClawback;
        outcomeType = 'Chargeback';
    }
    const statusInfo = STATUS_DESCRIPTIONS[status] || { description: 'In clawback', tooltip: 'Clawback in progress' };
    return {
        id: 2000 + index,
        contractId: 200000 + index,
        customerName,
        customerEmail: generateEmail(customerName, seed + 11),
        planType,
        planTotal,
        remainingBalance,
        atRiskFundedAmount,
        clawbackAmount: null,
        shortfallAmount: null,
        riskCategory: types_1.RiskCategory.ActiveClawback,
        riskTier: null,
        status,
        previousStatus: types_1.ContractStatus.FailedPayment,
        statusChangedAt,
        statusTransitionDescription: statusInfo.description,
        statusTransitionTooltip: statusInfo.tooltip,
        statusChangedRelative: generateRelativeTime(statusChangedAt),
        daysUntilClawback: null,
        daysInCollections,
        contractDate,
        lastPaymentClearedDate,
        isInClawback: true,
        outcomeType,
        paymentsMade,
        paymentsTotal,
    };
};
/**
 * Generate a SETTLED_CLAWBACK item
 */
const generateSettledClawbackItem = (index, seed) => {
    const customerName = generateCustomerName(seed);
    const planTotal = randomInRange(600, 5500, seed + 2);
    const paymentsMade = randomIntInRange(0, 5, seed + 3);
    const paymentsTotal = randomIntInRange(paymentsMade + 3, 12, seed + 4);
    const clawbackAmount = randomInRange(200, planTotal * 0.8, seed + 5);
    const shortfallAmount = randomInRange(0, clawbackAmount * 0.3, seed + 6);
    const daysInCollections = randomIntInRange(20, 45, seed + 7);
    const planType = seededRandom(seed + 8) > 0.5 ? types_1.PaymentPlanType.Servicing : types_1.PaymentPlanType.Funding;
    const contractDate = new Date(Date.now() - randomIntInRange(90, 250, seed + 9) * 24 * 60 * 60 * 1000);
    const statusChangedAt = generateStatusChangedAt(randomIntInRange(1, 30, seed + 12));
    const lastPaymentClearedDate = new Date(contractDate.getTime() + randomIntInRange(20, 50, seed + 10) * 24 * 60 * 60 * 1000);
    // Randomly select outcome type for settled clawbacks
    const outcomeRoll = seededRandom(seed + 13);
    let status;
    let outcomeType;
    if (outcomeRoll < 0.55) {
        status = types_1.ContractStatus.DefaultedSettled;
        outcomeType = 'Default';
    }
    else if (outcomeRoll < 0.85) {
        status = types_1.ContractStatus.CanceledSettled;
        outcomeType = 'Canceled';
    }
    else {
        status = types_1.ContractStatus.ChargebackSettled;
        outcomeType = 'Chargeback';
    }
    const statusInfo = STATUS_DESCRIPTIONS[status] || { description: 'Clawback settled', tooltip: 'Clawback completed' };
    return {
        id: 3000 + index,
        contractId: 300000 + index,
        customerName,
        customerEmail: generateEmail(customerName, seed + 11),
        planType,
        planTotal,
        remainingBalance: 0,
        atRiskFundedAmount: null,
        clawbackAmount,
        shortfallAmount,
        riskCategory: types_1.RiskCategory.SettledClawback,
        riskTier: null,
        status,
        previousStatus: types_1.ContractStatus.ClawbackInProgress,
        statusChangedAt,
        statusTransitionDescription: statusInfo.description,
        statusTransitionTooltip: statusInfo.tooltip,
        statusChangedRelative: generateRelativeTime(statusChangedAt),
        daysUntilClawback: null,
        daysInCollections,
        contractDate,
        lastPaymentClearedDate,
        isInClawback: false,
        outcomeType,
        paymentsMade,
        paymentsTotal,
    };
};
// =============================================================================
// MAIN DATA GENERATOR
// =============================================================================
/**
 * Generate all mock data
 *
 * Distribution (30 total - optimized for demo performance):
 * - 12 COLLECTIONS items
 * - 10 ACTIVE_CLAWBACK items
 * - 8 SETTLED_CLAWBACK items
 */
const generateMockData = () => {
    const items = [];
    // Generate COLLECTIONS items (12)
    for (let i = 0; i < 12; i++) {
        items.push(generateCollectionsItem(i, i * 100 + 1));
    }
    // Generate ACTIVE_CLAWBACK items (10)
    for (let i = 0; i < 10; i++) {
        items.push(generateActiveClawbackItem(i, i * 100 + 5001));
    }
    // Generate SETTLED_CLAWBACK items (8)
    for (let i = 0; i < 8; i++) {
        items.push(generateSettledClawbackItem(i, i * 100 + 10001));
    }
    return items;
};
exports.generateMockData = generateMockData;
/**
 * Calculate metrics from mock data
 */
const calculateMockMetrics = (items) => {
    const collectionsItems = items.filter(i => i.riskCategory === types_1.RiskCategory.Collections);
    const activeClawbackItems = items.filter(i => i.riskCategory === types_1.RiskCategory.ActiveClawback);
    const settledClawbackItems = items.filter(i => i.riskCategory === types_1.RiskCategory.SettledClawback);
    const collectionsAmount = collectionsItems.reduce((sum, i) => sum + (i.atRiskFundedAmount ?? 0), 0);
    const activeClawbackAmount = activeClawbackItems.reduce((sum, i) => sum + (i.atRiskFundedAmount ?? 0), 0);
    const settledClawbackAmount = settledClawbackItems.reduce((sum, i) => sum + (i.clawbackAmount ?? 0), 0);
    // Count defaulted orders (both pending and settled)
    const defaultedOrdersCount = items.filter(i => i.status === types_1.ContractStatus.DefaultedPendingClawback ||
        i.status === types_1.ContractStatus.DefaultedSettled).length;
    return {
        totalCount: items.length,
        defaultRateAllTime: 8.5, // Mock: 8.5% all-time default rate
        defaultRateLast30Days: 6.2, // Mock: 6.2% 30-day default rate
        defaultedOrdersCount,
        collectionsCount: collectionsItems.length,
        collectionsAmount,
        activeClawbackCount: activeClawbackItems.length,
        activeClawbackAmount,
        settledClawbackCount: settledClawbackItems.length,
        settledClawbackAmount,
    };
};
exports.calculateMockMetrics = calculateMockMetrics;
// =============================================================================
// LAZY INITIALIZATION (Performance optimization)
// =============================================================================
let _mockData = null;
let _mockMetrics = null;
/**
 * Lazily generated mock data - only computed on first access
 */
exports.MOCK_DATA = new Proxy([], {
    get(target, prop) {
        if (_mockData === null) {
            _mockData = (0, exports.generateMockData)();
        }
        return Reflect.get(_mockData, prop);
    },
    set(target, prop, value) {
        if (_mockData === null) {
            _mockData = (0, exports.generateMockData)();
        }
        return Reflect.set(_mockData, prop, value);
    },
});
/**
 * Lazily calculated metrics - only computed on first access
 */
exports.MOCK_METRICS = new Proxy({}, {
    get(target, prop) {
        if (_mockMetrics === null) {
            if (_mockData === null) {
                _mockData = (0, exports.generateMockData)();
            }
            _mockMetrics = (0, exports.calculateMockMetrics)(_mockData);
        }
        return Reflect.get(_mockMetrics, prop);
    },
});
//# sourceMappingURL=mock-data.js.map
"use strict";
/**
 * Mock Audience Data
 *
 * Sample users for the Delphi AI Studio Audience Tab dashboard.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateMetrics = exports.MOCK_USERS = void 0;
// Helper to create dates relative to now
const daysAgo = (days) => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date;
};
const hoursAgo = (hours) => {
    const date = new Date();
    date.setHours(date.getHours() - hours);
    return date;
};
/**
 * 60 sample audience users with realistic data distribution
 */
exports.MOCK_USERS = [
    // High engagement users (VIP/Client)
    { id: 1, name: 'Sarah Chen', email: 'sarah.chen@techcorp.io', messageCount: 247, tags: ['VIP', 'Client'], lastInteracted: hoursAgo(2), accessGroup: 'Public', status: 'Active' },
    { id: 2, name: 'Emily Rodriguez', email: 'emily.r@startup.io', messageCount: 156, tags: ['VIP', 'Client', 'Lead-Coaching'], lastInteracted: hoursAgo(1), accessGroup: 'Public', status: 'Active' },
    { id: 3, name: 'Michael Thompson', email: 'mthompson@enterprise.com', messageCount: 189, tags: ['VIP', 'Cohort-Jan-2025'], lastInteracted: hoursAgo(4), accessGroup: 'Public', status: 'Active' },
    { id: 4, name: 'Alexandra Kim', email: 'alex.kim@innovate.co', messageCount: 134, tags: ['VIP', 'Client'], lastInteracted: daysAgo(1), accessGroup: 'Insiders', status: 'Active' },
    { id: 5, name: 'James Wilson', email: 'jwilson@bigco.com', messageCount: 98, tags: ['Client', 'Lead-Coaching'], lastInteracted: hoursAgo(6), accessGroup: 'Public', status: 'Active' },
    // Medium engagement users
    { id: 6, name: 'john.marcus@email.com', email: 'john.marcus@email.com', messageCount: 47, tags: ['Lead-Coaching'], lastInteracted: daysAgo(1), accessGroup: 'Insiders', status: 'Active' },
    { id: 7, name: 'Priya Patel', email: 'priya.p@consulting.co', messageCount: 52, tags: ['Client'], lastInteracted: daysAgo(2), accessGroup: 'Public', status: 'Active' },
    { id: 8, name: 'David Martinez', email: 'dmartinez@agency.io', messageCount: 38, tags: ['Lead-Coaching', 'Cohort-Jan-2025'], lastInteracted: daysAgo(3), accessGroup: 'Insiders', status: 'Active' },
    { id: 9, name: 'Rachel Green', email: 'rachel.g@media.com', messageCount: 61, tags: ['VIP'], lastInteracted: hoursAgo(8), accessGroup: 'Public', status: 'Active' },
    { id: 10, name: 'Chris Anderson', email: 'canderson@tech.io', messageCount: 44, tags: ['Client', 'Cohort-Jan-2025'], lastInteracted: daysAgo(1), accessGroup: 'Insiders', status: 'Active' },
    // Lower engagement users
    { id: 11, name: 'Marcus Webb', email: 'marcus.webb@company.com', messageCount: 12, tags: ['Lead-Coaching'], lastInteracted: daysAgo(4), accessGroup: 'Invited', status: 'Invited' },
    { id: 12, name: 'Lisa Chang', email: 'lchang@startup.co', messageCount: 8, tags: [], lastInteracted: daysAgo(7), accessGroup: 'Public', status: 'Active' },
    { id: 13, name: 'david.kim@company.co', email: 'david.kim@company.co', messageCount: 15, tags: [], lastInteracted: daysAgo(5), accessGroup: 'Insiders', status: 'Active' },
    { id: 14, name: 'Jennifer Lee', email: 'jlee@agency.com', messageCount: 3, tags: ['Inactive'], lastInteracted: daysAgo(45), accessGroup: 'Revoked', status: 'Revoked' },
    { id: 15, name: 'Robert Taylor', email: 'rtaylor@corp.io', messageCount: 6, tags: [], lastInteracted: daysAgo(12), accessGroup: 'Public', status: 'Active' },
    // More high engagement
    { id: 16, name: 'Amanda Foster', email: 'afoster@venture.co', messageCount: 112, tags: ['VIP', 'Lead-Coaching'], lastInteracted: hoursAgo(3), accessGroup: 'Public', status: 'Active' },
    { id: 17, name: 'Daniel Brown', email: 'dbrown@enterprise.io', messageCount: 87, tags: ['Client', 'VIP'], lastInteracted: daysAgo(1), accessGroup: 'Insiders', status: 'Active' },
    { id: 18, name: 'Sophia Garcia', email: 'sgarcia@creative.com', messageCount: 145, tags: ['VIP', 'Cohort-Jan-2025'], lastInteracted: hoursAgo(5), accessGroup: 'Public', status: 'Active' },
    { id: 19, name: 'William Johnson', email: 'wjohnson@finance.co', messageCount: 78, tags: ['Client'], lastInteracted: daysAgo(2), accessGroup: 'Public', status: 'Active' },
    { id: 20, name: 'Olivia White', email: 'owhite@marketing.io', messageCount: 92, tags: ['VIP', 'Lead-Coaching', 'Client'], lastInteracted: hoursAgo(1), accessGroup: 'Insiders', status: 'Active' },
    // Medium engagement continued
    { id: 21, name: 'Kevin Liu', email: 'kliu@tech.co', messageCount: 34, tags: ['Cohort-Jan-2025'], lastInteracted: daysAgo(3), accessGroup: 'Public', status: 'Active' },
    { id: 22, name: 'Michelle Adams', email: 'madams@design.io', messageCount: 29, tags: ['Lead-Coaching'], lastInteracted: daysAgo(4), accessGroup: 'Insiders', status: 'Active' },
    { id: 23, name: 'Thomas Clark', email: 'tclark@consulting.com', messageCount: 56, tags: ['Client'], lastInteracted: daysAgo(1), accessGroup: 'Public', status: 'Active' },
    { id: 24, name: 'Jessica Miller', email: 'jmiller@agency.co', messageCount: 41, tags: ['VIP'], lastInteracted: daysAgo(2), accessGroup: 'Insiders', status: 'Active' },
    { id: 25, name: 'Andrew Davis', email: 'adavis@startup.io', messageCount: 67, tags: ['Client', 'Lead-Coaching'], lastInteracted: hoursAgo(12), accessGroup: 'Public', status: 'Active' },
    // Low engagement / Invited / Revoked
    { id: 26, name: 'natalie.wong@corp.com', email: 'natalie.wong@corp.com', messageCount: 2, tags: [], lastInteracted: daysAgo(30), accessGroup: 'Invited', status: 'Invited' },
    { id: 27, name: 'Brian Harris', email: 'bharris@media.io', messageCount: 0, tags: [], lastInteracted: daysAgo(60), accessGroup: 'Revoked', status: 'Revoked' },
    { id: 28, name: 'Laura Scott', email: 'lscott@venture.com', messageCount: 5, tags: ['Inactive'], lastInteracted: daysAgo(90), accessGroup: 'Revoked', status: 'Revoked' },
    { id: 29, name: 'steven.young@email.co', email: 'steven.young@email.co', messageCount: 1, tags: [], lastInteracted: daysAgo(14), accessGroup: 'Invited', status: 'Invited' },
    { id: 30, name: 'Nicole Turner', email: 'nturner@creative.io', messageCount: 9, tags: [], lastInteracted: daysAgo(8), accessGroup: 'Public', status: 'Active' },
    // More varied engagement
    { id: 31, name: 'Ryan Mitchell', email: 'rmitchell@tech.com', messageCount: 73, tags: ['Client', 'Cohort-Jan-2025'], lastInteracted: daysAgo(1), accessGroup: 'Insiders', status: 'Active' },
    { id: 32, name: 'Ashley Robinson', email: 'arobinson@marketing.co', messageCount: 88, tags: ['VIP', 'Client'], lastInteracted: hoursAgo(7), accessGroup: 'Public', status: 'Active' },
    { id: 33, name: 'Jason Lee', email: 'jasonlee@agency.io', messageCount: 21, tags: ['Lead-Coaching'], lastInteracted: daysAgo(5), accessGroup: 'Insiders', status: 'Active' },
    { id: 34, name: 'Stephanie Moore', email: 'smoore@enterprise.com', messageCount: 104, tags: ['VIP', 'Lead-Coaching'], lastInteracted: hoursAgo(2), accessGroup: 'Public', status: 'Active' },
    { id: 35, name: 'Brandon Walker', email: 'bwalker@startup.co', messageCount: 16, tags: [], lastInteracted: daysAgo(6), accessGroup: 'Public', status: 'Active' },
    // High engagement batch
    { id: 36, name: 'Victoria Hall', email: 'vhall@consulting.io', messageCount: 167, tags: ['VIP', 'Client', 'Cohort-Jan-2025'], lastInteracted: hoursAgo(1), accessGroup: 'Public', status: 'Active' },
    { id: 37, name: 'Christopher Allen', email: 'callen@finance.co', messageCount: 132, tags: ['VIP', 'Client'], lastInteracted: daysAgo(1), accessGroup: 'Insiders', status: 'Active' },
    { id: 38, name: 'Samantha Wright', email: 'swright@design.com', messageCount: 94, tags: ['Client', 'Lead-Coaching'], lastInteracted: hoursAgo(4), accessGroup: 'Public', status: 'Active' },
    { id: 39, name: 'Matthew King', email: 'mking@tech.io', messageCount: 118, tags: ['VIP'], lastInteracted: hoursAgo(3), accessGroup: 'Insiders', status: 'Active' },
    { id: 40, name: 'Lauren Baker', email: 'lbaker@media.co', messageCount: 76, tags: ['Client', 'Cohort-Jan-2025'], lastInteracted: daysAgo(2), accessGroup: 'Public', status: 'Active' },
    // Medium-low engagement
    { id: 41, name: 'Tyler Nelson', email: 'tnelson@agency.com', messageCount: 23, tags: ['Lead-Coaching'], lastInteracted: daysAgo(4), accessGroup: 'Insiders', status: 'Active' },
    { id: 42, name: 'Megan Carter', email: 'mcarter@startup.io', messageCount: 31, tags: [], lastInteracted: daysAgo(3), accessGroup: 'Public', status: 'Active' },
    { id: 43, name: 'Justin Perez', email: 'jperez@enterprise.co', messageCount: 45, tags: ['Client'], lastInteracted: daysAgo(1), accessGroup: 'Insiders', status: 'Active' },
    { id: 44, name: 'Heather Cooper', email: 'hcooper@venture.io', messageCount: 19, tags: [], lastInteracted: daysAgo(7), accessGroup: 'Public', status: 'Active' },
    { id: 45, name: 'Aaron Richardson', email: 'arichardson@consulting.com', messageCount: 58, tags: ['VIP', 'Lead-Coaching'], lastInteracted: daysAgo(2), accessGroup: 'Public', status: 'Active' },
    // Invited users
    { id: 46, name: 'kelly.morgan@corp.io', email: 'kelly.morgan@corp.io', messageCount: 0, tags: [], lastInteracted: daysAgo(21), accessGroup: 'Invited', status: 'Invited' },
    { id: 47, name: 'Derek Phillips', email: 'dphillips@tech.com', messageCount: 4, tags: [], lastInteracted: daysAgo(10), accessGroup: 'Invited', status: 'Invited' },
    { id: 48, name: 'Christina Evans', email: 'cevans@design.co', messageCount: 7, tags: [], lastInteracted: daysAgo(15), accessGroup: 'Invited', status: 'Invited' },
    // Revoked users
    { id: 49, name: 'Gregory Howard', email: 'ghoward@marketing.io', messageCount: 11, tags: ['Inactive'], lastInteracted: daysAgo(120), accessGroup: 'Revoked', status: 'Revoked' },
    { id: 50, name: 'Diana Collins', email: 'dcollins@agency.co', messageCount: 2, tags: ['Inactive'], lastInteracted: daysAgo(180), accessGroup: 'Revoked', status: 'Revoked' },
    // Final batch - mixed engagement
    { id: 51, name: 'Patrick Stewart', email: 'pstewart@enterprise.io', messageCount: 83, tags: ['Client', 'VIP'], lastInteracted: hoursAgo(5), accessGroup: 'Insiders', status: 'Active' },
    { id: 52, name: 'Rebecca Sanders', email: 'rsanders@creative.com', messageCount: 62, tags: ['Lead-Coaching', 'Cohort-Jan-2025'], lastInteracted: daysAgo(1), accessGroup: 'Public', status: 'Active' },
    { id: 53, name: 'Nathan Price', email: 'nprice@startup.co', messageCount: 27, tags: [], lastInteracted: daysAgo(4), accessGroup: 'Insiders', status: 'Active' },
    { id: 54, name: 'Angela Russell', email: 'arussell@finance.io', messageCount: 139, tags: ['VIP', 'Client', 'Lead-Coaching'], lastInteracted: hoursAgo(2), accessGroup: 'Public', status: 'Active' },
    { id: 55, name: 'Eric Bell', email: 'ebell@consulting.co', messageCount: 48, tags: ['Client'], lastInteracted: daysAgo(2), accessGroup: 'Public', status: 'Active' },
    { id: 56, name: 'Shannon Murphy', email: 'smurphy@media.io', messageCount: 71, tags: ['VIP', 'Cohort-Jan-2025'], lastInteracted: hoursAgo(6), accessGroup: 'Insiders', status: 'Active' },
    { id: 57, name: 'Kenneth Butler', email: 'kbutler@tech.co', messageCount: 14, tags: [], lastInteracted: daysAgo(9), accessGroup: 'Public', status: 'Active' },
    { id: 58, name: 'Tiffany Hayes', email: 'thayes@agency.io', messageCount: 95, tags: ['Client', 'Lead-Coaching'], lastInteracted: daysAgo(1), accessGroup: 'Insiders', status: 'Active' },
    { id: 59, name: 'Charles Powell', email: 'cpowell@venture.com', messageCount: 36, tags: ['Cohort-Jan-2025'], lastInteracted: daysAgo(3), accessGroup: 'Public', status: 'Active' },
    { id: 60, name: 'Melissa Barnes', email: 'mbarnes@design.io', messageCount: 108, tags: ['VIP', 'Client'], lastInteracted: hoursAgo(1), accessGroup: 'Public', status: 'Active' },
];
/**
 * Calculate aggregate metrics from user data
 */
const calculateMetrics = (users) => {
    const activeUsers = users.filter((u) => u.status === 'Active');
    const totalMessages = users.reduce((sum, u) => sum + u.messageCount, 0);
    const mostEngaged = users.filter((u) => u.messageCount > 50).length;
    return {
        totalActiveUsers: activeUsers.length,
        totalMessages,
        avgMessagesPerUser: activeUsers.length > 0 ? totalMessages / activeUsers.length : 0,
        mostEngagedUsers: mostEngaged,
        // Mock 30-day change values (in production these would be calculated from historical data)
        activeUsersChange: 12,
        messagesChange: 8,
        avgMessagesChange: -2,
        engagedUsersChange: 5,
    };
};
exports.calculateMetrics = calculateMetrics;
//# sourceMappingURL=mock-users.js.map
"use strict";
/**
 * Collections Module - Type Definitions
 *
 * Types for the demo-repo collections dashboard.
 * Mirrors front-end types without GraphQL dependencies.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractStatus = exports.PaymentPlanType = exports.RiskTier = exports.RiskCategory = void 0;
// =============================================================================
// ENUMS (Mirroring GraphQL enums)
// =============================================================================
var RiskCategory;
(function (RiskCategory) {
    RiskCategory["ActiveClawback"] = "ACTIVE_CLAWBACK";
    RiskCategory["ClawbackRisk"] = "CLAWBACK_RISK";
    RiskCategory["Collections"] = "COLLECTIONS";
    RiskCategory["SettledClawback"] = "SETTLED_CLAWBACK";
})(RiskCategory || (exports.RiskCategory = RiskCategory = {}));
var RiskTier;
(function (RiskTier) {
    RiskTier["High"] = "HIGH";
    RiskTier["Low"] = "LOW";
    RiskTier["Medium"] = "MEDIUM";
})(RiskTier || (exports.RiskTier = RiskTier = {}));
var PaymentPlanType;
(function (PaymentPlanType) {
    PaymentPlanType["Funding"] = "FUNDING";
    PaymentPlanType["Pending"] = "PENDING";
    PaymentPlanType["Servicing"] = "SERVICING";
})(PaymentPlanType || (exports.PaymentPlanType = PaymentPlanType = {}));
var ContractStatus;
(function (ContractStatus) {
    // Collections statuses
    ContractStatus["FailedPayment"] = "FailedPayment";
    ContractStatus["NsfReturned"] = "NsfReturned";
    ContractStatus["PaymentPending"] = "PaymentPending";
    // Clawback statuses
    ContractStatus["DefaultedPendingClawback"] = "DefaultedPendingClawback";
    ContractStatus["DefaultedSettled"] = "DefaultedSettled";
    ContractStatus["CanceledPendingClawback"] = "CanceledPendingClawback";
    ContractStatus["CanceledSettled"] = "CanceledSettled";
    ContractStatus["ChargebackPendingClawback"] = "ChargebackPendingClawback";
    ContractStatus["ChargebackSettled"] = "ChargebackSettled";
    ContractStatus["ClawbackInProgress"] = "ClawbackInProgress";
    ContractStatus["ClawbackComplete"] = "ClawbackComplete";
    // Active statuses
    ContractStatus["Active"] = "Active";
    ContractStatus["PaidOff"] = "PaidOff";
})(ContractStatus || (exports.ContractStatus = ContractStatus = {}));
//# sourceMappingURL=types.js.map
"use strict";
/**
 * DisplayCard Component
 *
 * A double-layer card with shine effects and subtle depth gradients.
 * Perfect for dashboard metrics, stats, and feature displays.
 *
 * @example
 * import { DisplayCard } from '@/components/ui/prod/features/display-card'
 *
 * <DisplayCard>
 *   <DisplayCard.Content>
 *     <p className="text-primary font-medium">Title</p>
 *     <p className="text-tertiary">Description</p>
 *   </DisplayCard.Content>
 * </DisplayCard>
 *
 * @example
 * // With header and metric
 * <DisplayCard variant="metric" width={300}>
 *   <DisplayCard.Header>Daily Revenue</DisplayCard.Header>
 *   <DisplayCard.Content>
 *     <DisplayCard.Metric
 *       value={12450}
 *       format="currency"
 *       trend={{ value: 12, direction: 'up' }}
 *     />
 *   </DisplayCard.Content>
 * </DisplayCard>
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.trendStyles = exports.metricSizeStyles = exports.backgroundStyles = exports.INNER_CONTENT_PADDING = exports.getInnerBorderRadius = exports.BORDER_RADIUS_OUTER = exports.VARIANT_IDS = exports.getVariant = exports.DISPLAY_CARD_VARIANTS = exports.DisplayCard = void 0;
const display_card_1 = require("./display-card");
const display_card_metric_1 = require("./display-card-metric");
// Attach metric components to DisplayCard
exports.DisplayCard = Object.assign(display_card_1.DisplayCard, {
    Metric: display_card_metric_1.DisplayCardMetric,
    Stat: display_card_metric_1.DisplayCardStat,
});
// Re-export config for customization
var config_1 = require("./config");
Object.defineProperty(exports, "DISPLAY_CARD_VARIANTS", { enumerable: true, get: function () { return config_1.DISPLAY_CARD_VARIANTS; } });
Object.defineProperty(exports, "getVariant", { enumerable: true, get: function () { return config_1.getVariant; } });
Object.defineProperty(exports, "VARIANT_IDS", { enumerable: true, get: function () { return config_1.VARIANT_IDS; } });
Object.defineProperty(exports, "BORDER_RADIUS_OUTER", { enumerable: true, get: function () { return config_1.BORDER_RADIUS_OUTER; } });
Object.defineProperty(exports, "getInnerBorderRadius", { enumerable: true, get: function () { return config_1.getInnerBorderRadius; } });
Object.defineProperty(exports, "INNER_CONTENT_PADDING", { enumerable: true, get: function () { return config_1.INNER_CONTENT_PADDING; } });
Object.defineProperty(exports, "backgroundStyles", { enumerable: true, get: function () { return config_1.backgroundStyles; } });
Object.defineProperty(exports, "metricSizeStyles", { enumerable: true, get: function () { return config_1.metricSizeStyles; } });
Object.defineProperty(exports, "trendStyles", { enumerable: true, get: function () { return config_1.trendStyles; } });
//# sourceMappingURL=index.js.map
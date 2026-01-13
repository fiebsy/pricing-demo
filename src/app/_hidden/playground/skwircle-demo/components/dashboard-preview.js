"use strict";
/**
 * Dashboard Preview Component
 *
 * Renders a 2x2 grid of metric tiles.
 */
'use client';
/**
 * Dashboard Preview Component
 *
 * Renders a 2x2 grid of metric tiles.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardPreview = void 0;
const react_1 = require("react");
const skwircle_1 = require("@/components/ui/deprecated/skwircle/skwircle");
const icon_1 = require("@/components/ui/prod/base/icon");
const ArrowUp01Icon_1 = require("@hugeicons-pro/core-stroke-rounded/ArrowUp01Icon");
const ArrowDown01Icon_1 = require("@hugeicons-pro/core-stroke-rounded/ArrowDown01Icon");
// Sample metric data
const METRIC_TILES = [
    {
        id: 'revenue',
        label: 'Total revenue',
        value: '$45,231',
        change: '+12.5%',
        positive: true,
        period: 'vs last month',
    },
    {
        id: 'orders',
        label: 'Active orders',
        value: '1,284',
        change: '+8.2%',
        positive: true,
        period: 'vs last week',
    },
    {
        id: 'contracts',
        label: 'Open contracts',
        value: '342',
        change: '-2.4%',
        positive: false,
        period: 'vs last month',
    },
    {
        id: 'conversion',
        label: 'Conversion rate',
        value: '24.8%',
        change: '+1.2%',
        positive: true,
        period: 'vs last quarter',
    },
];
const getDepthPreset = (intensity, direction) => {
    if (intensity === 'none')
        return undefined;
    return `depth-${intensity}-${direction}`;
};
const DashboardPreview = ({ config }) => {
    const depthPreset = getDepthPreset(config.depthIntensity, config.depthDirection);
    return (<div className="p-8">
      <div className="grid grid-cols-2 gap-4">
        {METRIC_TILES.map((tile) => (<skwircle_1.Skwircle.Card key={tile.id} intent={config.intent} elevation={config.elevation} roundness={config.roundness} fillMode={config.fillMode} backgroundGradient={depthPreset} borderColor={config.borderColor ?? undefined} borderWidth={config.borderWidth} ring={config.ring} ringColor={config.ringColor} ringWidth={config.ringWidth} ringOpacity={config.ringOpacity}>
            <div className="p-4">
              <p className="text-xs text-tertiary">{tile.label}</p>
              <p className="mt-1 text-xl font-semibold text-primary">{tile.value}</p>
              <div className="mt-2 flex items-center gap-1">
                <span className={tile.positive ? 'text-success-primary' : 'text-error-primary'}>
                  <icon_1.HugeIcon icon={tile.positive ? ArrowUp01Icon_1.default : ArrowDown01Icon_1.default} size={12} strokeWidth={2}/>
                </span>
                <span className={`text-xs font-medium ${tile.positive ? 'text-success-primary' : 'text-error-primary'}`}>
                  {tile.change}
                </span>
                <span className="text-xs text-quaternary">{tile.period}</span>
              </div>
            </div>
          </skwircle_1.Skwircle.Card>))}
      </div>
    </div>);
};
exports.DashboardPreview = DashboardPreview;
//# sourceMappingURL=dashboard-preview.js.map
"use strict";
/**
 * Card Panel Configuration
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCardPanelConfig = void 0;
const constants_1 = require("../constants");
const createCardPanelConfig = (config) => ({
    id: 'card',
    title: 'Card',
    tabLabel: 'Card',
    subsections: [
        {
            title: 'Base',
            controls: [
                {
                    id: 'intent',
                    label: 'Intent',
                    type: 'select',
                    value: config.intent,
                    options: constants_1.CARD_INTENT_OPTIONS,
                },
                {
                    id: 'elevation',
                    label: 'Elevation',
                    type: 'select',
                    value: config.elevation,
                    options: constants_1.ELEVATION_OPTIONS,
                },
                {
                    id: 'roundness',
                    label: 'Roundness',
                    type: 'select',
                    value: config.roundness,
                    options: constants_1.ROUNDNESS_OPTIONS,
                },
                {
                    id: 'fillMode',
                    label: 'Fill Mode',
                    type: 'inline-toggle',
                    value: config.fillMode,
                },
            ],
        },
        {
            title: 'Depth Gradient',
            controls: [
                {
                    id: 'depthIntensity',
                    label: 'Intensity',
                    type: 'select',
                    value: config.depthIntensity,
                    options: constants_1.DEPTH_INTENSITY_OPTIONS,
                },
                {
                    id: 'depthDirection',
                    label: 'Direction',
                    type: 'select',
                    value: config.depthDirection,
                    options: constants_1.DEPTH_DIRECTION_OPTIONS,
                    disabled: config.depthIntensity === 'none',
                },
            ],
        },
        {
            title: 'Border',
            controls: [
                {
                    id: 'borderWidth',
                    label: 'Border Width',
                    type: 'slider',
                    value: config.borderWidth,
                    min: 0,
                    max: 4,
                    step: 1,
                    formatLabel: (v) => `${v}px`,
                },
            ],
        },
        {
            title: 'Ring',
            controls: [
                {
                    id: 'ring',
                    label: 'Enable Ring',
                    type: 'inline-toggle',
                    value: config.ring,
                },
                {
                    id: 'ringWidth',
                    label: 'Ring Width',
                    type: 'slider',
                    value: config.ringWidth,
                    min: 1,
                    max: 4,
                    step: 1,
                    formatLabel: (v) => `${v}px`,
                    disabled: !config.ring,
                },
                {
                    id: 'ringOpacity',
                    label: 'Ring Opacity',
                    type: 'slider',
                    value: config.ringOpacity,
                    min: 0,
                    max: 100,
                    step: 10,
                    formatLabel: (v) => `${v}%`,
                    disabled: !config.ring,
                },
            ],
        },
    ],
});
exports.createCardPanelConfig = createCardPanelConfig;
//# sourceMappingURL=card-panel-config.js.map
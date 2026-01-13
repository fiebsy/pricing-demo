"use strict";
/**
 * Badge Panel Configuration
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBadgePanelConfig = void 0;
const constants_1 = require("../constants");
const createBadgePanelConfig = (config) => ({
    id: 'badge',
    title: 'Badge',
    tabLabel: 'Badge',
    subsections: [
        {
            title: 'Appearance',
            controls: [
                {
                    id: 'type',
                    label: 'Type',
                    type: 'select',
                    value: config.type,
                    options: constants_1.BADGE_TYPE_OPTIONS,
                },
                {
                    id: 'size',
                    label: 'Size',
                    type: 'select',
                    value: config.size,
                    options: constants_1.BADGE_SIZE_OPTIONS,
                },
                {
                    id: 'color',
                    label: 'Color',
                    type: 'color-select',
                    value: config.color,
                    options: constants_1.BADGE_COLOR_OPTIONS,
                },
                {
                    id: 'roundness',
                    label: 'Roundness',
                    type: 'select',
                    value: config.roundness,
                    options: constants_1.ROUNDNESS_OPTIONS,
                    disabled: config.type === 'pill',
                },
            ],
        },
        {
            title: 'Content',
            controls: [
                {
                    id: 'label',
                    label: 'Label',
                    type: 'text',
                    value: config.label,
                    placeholder: 'Badge text...',
                },
                {
                    id: 'showIcon',
                    label: 'Show Icon',
                    type: 'inline-toggle',
                    value: config.showIcon,
                },
            ],
        },
    ],
});
exports.createBadgePanelConfig = createBadgePanelConfig;
//# sourceMappingURL=badge-panel-config.js.map
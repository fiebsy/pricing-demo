"use strict";
/**
 * Button Panel Configuration
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createButtonPanelConfig = void 0;
const constants_1 = require("../constants");
const createButtonPanelConfig = (config) => ({
    id: 'button',
    title: 'Button',
    tabLabel: 'Button',
    subsections: [
        {
            title: 'Appearance',
            controls: [
                {
                    id: 'intent',
                    label: 'Intent',
                    type: 'select',
                    value: config.intent,
                    options: constants_1.BUTTON_INTENT_OPTIONS,
                },
                {
                    id: 'size',
                    label: 'Size',
                    type: 'select',
                    value: config.size,
                    options: constants_1.BUTTON_SIZE_OPTIONS,
                },
                {
                    id: 'roundness',
                    label: 'Roundness',
                    type: 'select',
                    value: config.roundness,
                    options: constants_1.ROUNDNESS_OPTIONS,
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
                    placeholder: 'Button text...',
                },
                {
                    id: 'showIcon',
                    label: 'Show Icon',
                    type: 'inline-toggle',
                    value: config.showIcon,
                },
                {
                    id: 'iconOnly',
                    label: 'Icon Only',
                    type: 'inline-toggle',
                    value: config.iconOnly,
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
exports.createButtonPanelConfig = createButtonPanelConfig;
//# sourceMappingURL=button-panel-config.js.map
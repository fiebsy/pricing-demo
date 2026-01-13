"use strict";
/**
 * Input Panel Configuration
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInputPanelConfig = void 0;
const constants_1 = require("../constants");
const createInputPanelConfig = (config) => ({
    id: 'input',
    title: 'Input',
    tabLabel: 'Input',
    subsections: [
        {
            title: 'Appearance',
            controls: [
                {
                    id: 'roundness',
                    label: 'Roundness',
                    type: 'select',
                    value: config.roundness,
                    options: constants_1.ROUNDNESS_OPTIONS,
                },
                {
                    id: 'state',
                    label: 'State',
                    type: 'select',
                    value: config.state,
                    options: constants_1.INPUT_STATE_OPTIONS,
                },
            ],
        },
        {
            title: 'Content',
            controls: [
                {
                    id: 'placeholder',
                    label: 'Placeholder',
                    type: 'text',
                    value: config.placeholder,
                    placeholder: 'Enter placeholder...',
                },
                {
                    id: 'showIcon',
                    label: 'Show Icon',
                    type: 'inline-toggle',
                    value: config.showIcon,
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
                    id: 'ringColor',
                    label: 'Ring Color',
                    type: 'color-select',
                    value: config.ringColor,
                    options: constants_1.RING_COLOR_OPTIONS,
                    disabled: !config.ring,
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
            ],
        },
    ],
});
exports.createInputPanelConfig = createInputPanelConfig;
//# sourceMappingURL=input-panel-config.js.map
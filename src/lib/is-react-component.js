"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isReactComponent = exports.isForwardRefComponent = exports.isClassComponent = exports.isFunctionComponent = void 0;
/**
 * Checks if a given value is a function component.
 */
const isFunctionComponent = (component) => {
    return typeof component === 'function';
};
exports.isFunctionComponent = isFunctionComponent;
/**
 * Checks if a given value is a class component.
 */
const isClassComponent = (component) => {
    return (typeof component === 'function' &&
        component.prototype &&
        (!!component.prototype.isReactComponent || !!component.prototype.render));
};
exports.isClassComponent = isClassComponent;
/**
 * Checks if a given value is a forward ref component.
 */
const isForwardRefComponent = (component) => {
    return (typeof component === 'object' &&
        component !== null &&
        component.$$typeof &&
        component.$$typeof.toString() === 'Symbol(react.forward_ref)');
};
exports.isForwardRefComponent = isForwardRefComponent;
/**
 * Checks if a given value is a valid React component.
 */
const isReactComponent = (component) => {
    return (0, exports.isFunctionComponent)(component) || (0, exports.isForwardRefComponent)(component) || (0, exports.isClassComponent)(component);
};
exports.isReactComponent = isReactComponent;
//# sourceMappingURL=is-react-component.js.map
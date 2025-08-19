"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET-Core/blob/master/LICENSE.md
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isESM = exports.isNodeJS = exports.isRequireJS = exports.isCommonJS = void 0;
let r;
try {
    r = typeof require !== 'undefined' ? require : undefined;
}
catch (ex) {
    r = undefined;
}
let isESMEnvironment = false;
try {
    isESMEnvironment = typeof require === 'undefined' && typeof module === 'undefined';
}
catch (ex) {
    isESMEnvironment = true;
}
exports.isCommonJS = !!(r && r.resolve) && !isESMEnvironment;
exports.isRequireJS = !!(r && r.toUrl && r.defined) && !isESMEnvironment;
exports.isNodeJS = typeof process == 'object'
    && process.toString() === '[object process]'
    && process.nextTick != void 0;
exports.isESM = isESMEnvironment;
try {
    Object.freeze(exports);
}
catch (ex) { }
//# sourceMappingURL=environment.js.map
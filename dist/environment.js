"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET-Core/blob/master/LICENSE.md
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNodeJS = exports.isRequireJS = exports.isCommonJS = void 0;
// Need to spoof this so WebPack doesn't panic (warnings).
let r;
try {
    r = eval('require');
}
catch (ex) { }
exports.isCommonJS = !!(r && r.resolve);
exports.isRequireJS = !!(r && r.toUrl && r.defined);
/*
 * Ensure is in a real Node environment, with a `process.nextTick`.
 * To see through fake Node environments:
 * Mocha test runner - exposes a `process` global without a `nextTick`
 * Browserify - exposes a `process.nexTick` function that uses
 * `setTimeout`. In this case `setImmediate` is preferred because
 * it is faster. Browserify's `process.toString()` yields
 * "[object Object]", while in a real Node environment
 * `process.nextTick()` yields "[object process]".
 */
exports.isNodeJS = typeof process == 'object'
    && process.toString() === '[object process]'
    && process.nextTick != void 0;
//noinspection JSUnusedAssignment
try {
    Object.freeze(exports);
}
catch (ex) { }
//# sourceMappingURL=environment.js.map
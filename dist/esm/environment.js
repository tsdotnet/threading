/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET-Core/blob/master/LICENSE.md
 */
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
const isCommonJS = !!(r && r.resolve) && !isESMEnvironment;
const isRequireJS = !!(r && r.toUrl && r.defined) && !isESMEnvironment;
const isNodeJS = typeof process == 'object'
    && process.toString() === '[object process]'
    && process.nextTick != void 0;
const isESM = isESMEnvironment;
try {
    Object.freeze(exports);
}
catch (ex) { }

export { isCommonJS, isESM, isNodeJS, isRequireJS };
//# sourceMappingURL=environment.js.map

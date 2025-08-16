/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./environment"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Worker = void 0;
    const environment_1 = require("./environment");
    /**
     * Default worker constructor for the current environment.
     */
    exports.Worker = getNodeWorker();
    exports.default = exports.Worker;
    function getNodeWorker() {
        try {
            return eval('Worker');
        }
        catch (ex) {
            return environment_1.isNodeJS
                ? require('./LegacyNodeWorker').default
                : self.Worker;
        }
    }
});
//# sourceMappingURL=Worker.js.map
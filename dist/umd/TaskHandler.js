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
        define(["require", "exports", "tslib", "@tsdotnet/exceptions", "./TaskHandlerBase"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const tslib_1 = require("tslib");
    const exceptions_1 = require("@tsdotnet/exceptions");
    const TaskHandlerBase_1 = tslib_1.__importDefault(require("./TaskHandlerBase"));
    class TaskHandler extends TaskHandlerBase_1.default {
        _action;
        constructor(_action) {
            super();
            this._action = _action;
            if (!_action)
                throw new exceptions_1.ArgumentNullException('action');
        }
        _onExecute() {
            this._action();
        }
        _onDispose() {
            super._onDispose();
            this._action = null;
        }
    }
    exports.default = TaskHandler;
});
//# sourceMappingURL=TaskHandler.js.map
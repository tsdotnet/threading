"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ArgumentNullException_1 = tslib_1.__importDefault(require("@tsdotnet/exceptions/dist/ArgumentNullException"));
const TaskHandlerBase_1 = tslib_1.__importDefault(require("./TaskHandlerBase"));
class TaskHandler extends TaskHandlerBase_1.default {
    constructor(_action) {
        super();
        this._action = _action;
        if (!_action)
            throw new ArgumentNullException_1.default('action');
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
//# sourceMappingURL=TaskHandler.js.map
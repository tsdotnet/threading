"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const tslib_1 = require("tslib");
const exceptions_1 = require("@tsdotnet/exceptions");
const lazy_1 = require("@tsdotnet/lazy");
const TaskHandlerBase_1 = tslib_1.__importDefault(require("./TaskHandlerBase"));
class Task extends TaskHandlerBase_1.default {
    constructor(valueFactory) {
        super();
        if (!valueFactory)
            throw new exceptions_1.ArgumentNullException('valueFactory');
        this._result = new lazy_1.Lazy(valueFactory);
    }
    get state() {
        return this.getState();
    }
    get result() {
        this.throwIfDisposed();
        this.runSynchronously();
        return this.getResult();
    }
    get error() {
        this.throwIfDisposed();
        return this._result.error;
    }
    start(defer) {
        if (this.getStatus() == 0) {
            super.start(defer);
        }
    }
    runSynchronously() {
        if (this.getStatus() == 0) {
            super.runSynchronously();
        }
    }
    _onExecute() {
        this._result.getValue();
    }
    getResult() {
        return this._result.value;
    }
    getState() {
        const r = this._result;
        return r && {
            status: this.getStatus(),
            result: r.isValueCreated ? r.value : void 0,
            error: r.error
        };
    }
    _onDispose() {
        super._onDispose();
        const r = this._result;
        if (r) {
            this._result = null;
            r.dispose();
        }
    }
}
exports.Task = Task;
exports.default = Task;
//# sourceMappingURL=Task.js.map
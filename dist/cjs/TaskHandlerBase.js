"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const disposable_1 = require("@tsdotnet/disposable");
class TaskHandlerBase extends disposable_1.DisposableBase {
    constructor() {
        super();
        this._timeoutId = null;
        this._status = 0;
    }
    get status() {
        return this.getStatus();
    }
    get isScheduled() {
        return !!this._timeoutId;
    }
    static _handler(d) {
        d.cancel();
        d._status = 2;
        try {
            d._onExecute();
            d._status = 3;
        }
        catch (_a) {
            d._status = 5;
        }
    }
    start(defer = 0) {
        this.assertIsAlive(true);
        this.cancel();
        this._status = 1;
        if (!(defer > 0))
            defer = 0;
        if (isFinite(defer))
            this._timeoutId = setTimeout(TaskHandlerBase._handler, defer, this);
    }
    runSynchronously() {
        this.assertIsAlive(true);
        TaskHandlerBase._handler(this);
    }
    cancel() {
        const id = this._timeoutId;
        if (id) {
            clearTimeout(id);
            this._timeoutId = null;
            this._status = 4;
            return true;
        }
        return false;
    }
    getStatus() {
        return this._status;
    }
    _onDispose() {
        this.cancel();
        this._status = null;
    }
}
exports.default = TaskHandlerBase;
//# sourceMappingURL=TaskHandlerBase.js.map
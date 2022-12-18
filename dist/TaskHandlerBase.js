"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const DisposableBase_1 = tslib_1.__importDefault(require("@tsdotnet/disposable/dist/DisposableBase"));
const NAME = 'TaskHandlerBase';
/**
 * A simple class for handling potentially repeated executions either deferred or immediate.
 */
class TaskHandlerBase extends DisposableBase_1.default {
    constructor() {
        super(NAME);
        this._timeoutId = null;
        this._status = 0 /* TaskStatus.Created */;
    }
    get status() {
        return this.getStatus();
    }
    get isScheduled() {
        return !!this._timeoutId;
    }
    // Use a static function here to avoid recreating a new function every time.
    static _handler(d) {
        d.cancel();
        d._status = 2 /* TaskStatus.Running */;
        try {
            d._onExecute();
            d._status = 3 /* TaskStatus.RanToCompletion */;
        }
        catch (ex) {
            d._status = 5 /* TaskStatus.Faulted */;
        }
    }
    /**
     * Schedules/Reschedules triggering the task.
     * @param defer Optional time to wait until triggering.
     */
    start(defer = 0) {
        this.throwIfDisposed();
        this.cancel();
        this._status = 1 /* TaskStatus.WaitingToRun */;
        if (!(defer > 0))
            defer = 0; // A negation is used to catch edge cases.
        if (isFinite(defer))
            this._timeoutId = setTimeout(TaskHandlerBase._handler, defer, this);
    }
    runSynchronously() {
        this.throwIfDisposed();
        TaskHandlerBase._handler(this);
    }
    cancel() {
        const id = this._timeoutId;
        if (id) {
            clearTimeout(id);
            this._timeoutId = null;
            this._status = 4 /* TaskStatus.Cancelled */;
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
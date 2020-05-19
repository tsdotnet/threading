/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
/**
 * @packageDocumentation
 * @module threading
 */
import DisposableBase from '@tsdotnet/disposable/dist/DisposableBase';
const NAME = 'TaskHandlerBase';
/**
 * A simple class for handling potentially repeated executions either deferred or immediate.
 */
export default class TaskHandlerBase extends DisposableBase {
    constructor() {
        super(NAME);
        this._timeoutId = null;
        this._status = 0 /* Created */;
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
        d._status = 2 /* Running */;
        try {
            d._onExecute();
            d._status = 3 /* RanToCompletion */;
        }
        catch (ex) {
            d._status = 5 /* Faulted */;
        }
    }
    /**
     * Schedules/Reschedules triggering the task.
     * @param defer Optional time to wait until triggering.
     */
    start(defer = 0) {
        this.throwIfDisposed();
        this.cancel();
        this._status = 1 /* WaitingToRun */;
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
            this._status = 4 /* Cancelled */;
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
//# sourceMappingURL=TaskHandlerBase.js.map
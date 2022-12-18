/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
import ArgumentNullException from '@tsdotnet/exceptions/dist/ArgumentNullException';
import { Lazy } from '@tsdotnet/lazy';
import TaskHandlerBase from './TaskHandlerBase';
/**
 * A simplified synchronous (but deferrable) version of Task<T>
 * Asynchronous operations should use Promise<T>.
 */
export class Task extends TaskHandlerBase {
    constructor(valueFactory) {
        super();
        if (!valueFactory)
            throw new ArgumentNullException('valueFactory');
        this._result = new Lazy(valueFactory);
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
        if (this.getStatus() == 0 /* TaskStatus.Created */) {
            super.start(defer);
        }
    }
    runSynchronously() {
        if (this.getStatus() == 0 /* TaskStatus.Created */) {
            super.runSynchronously();
        }
    }
    _onExecute() {
        this._result.getValue();
    }
    getResult() {
        return this._result.value; // This will detect any potential recursion.
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
export default Task;
//# sourceMappingURL=Task.js.map
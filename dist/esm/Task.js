import { ArgumentNullException } from '@tsdotnet/exceptions';
import { Lazy } from '@tsdotnet/lazy';
import TaskHandlerBase from './TaskHandlerBase.js';

/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
class Task extends TaskHandlerBase {
    _result;
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

export { Task, Task as default };
//# sourceMappingURL=Task.js.map

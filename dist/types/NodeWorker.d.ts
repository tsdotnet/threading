/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 * Based upon Parallel.js: https://github.com/adambom/parallel.js/blob/master/lib/Worker.js
 */
import type { Action } from '@tsdotnet/common-interfaces';
import { ObservableBase } from '@tsdotnet/observable-base';
import type { WorkerLike } from './WorkerLike';
export default class NodeWorker extends ObservableBase<any> implements WorkerLike {
    onmessage?: Action<{
        data: any;
    }> | null;
    onerror?: Action<any> | null;
    private _process;
    constructor(childProcess: any);
    postMessage(obj: unknown): void;
    terminate(): void;
    protected _onNext(data: unknown): void;
    protected _onError(error: unknown): void;
    protected _onDispose(): void;
}

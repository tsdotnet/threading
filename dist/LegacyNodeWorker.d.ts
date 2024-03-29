/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 * Based upon Parallel.js: https://github.com/adambom/parallel.js/blob/master/lib/Worker.js
 */
import { Action } from '@tsdotnet/common-interfaces';
import ObservableBase from '@tsdotnet/observable-base/dist/ObservableBase';
import { WorkerLike } from './WorkerLike';
/**
 * This class takes the place of a WebWorker
 */
export default class LegacyNodeWorker extends ObservableBase<any> implements WorkerLike {
    onmessage?: Action<{
        data: any;
    }> | null;
    onerror?: Action<any> | null;
    private _process;
    constructor(url: string);
    postMessage(obj: unknown): void;
    terminate(): void;
    protected _onNext(data: unknown): void;
    protected _onError(error: unknown): void;
    protected _onDispose(): void;
}

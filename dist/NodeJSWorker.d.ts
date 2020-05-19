/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 * Based upon Parallel.js: https://github.com/adambom/parallel.js/blob/master/lib/Worker.js
 */
/**
 * @packageDocumentation
 * @module threading
 */
import { Action } from '@tsdotnet/common-interfaces';
import ObservableBase from '@tsdotnet/observable-base/dist/ObservableBase';
import { WorkerLike } from './WorkerLike';
/**
 * This class takes the place of a WebWorker
 */
export default class NodeJSWorker extends ObservableBase<any> implements WorkerLike {
    onmessage?: Action<{
        data: any;
    }> | null;
    onerror?: Action<any> | null;
    private _process;
    constructor(url: string);
    postMessage(obj: any): void;
    terminate(): void;
    protected _onNext(data: any): void;
    protected _onError(error: any): void;
    protected _onDispose(): void;
}

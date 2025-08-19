/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
import { DisposableBase } from '@tsdotnet/disposable';
import type Cancellable from './Cancellable';
import TaskStatus from './TaskStatus';
export default abstract class TaskHandlerBase extends DisposableBase implements Cancellable {
    private _timeoutId;
    protected constructor();
    private _status;
    get status(): TaskStatus;
    get isScheduled(): boolean;
    private static _handler;
    start(defer?: number): void;
    runSynchronously(): void;
    cancel(): boolean;
    protected getStatus(): TaskStatus;
    protected abstract _onExecute(): void;
    protected _onDispose(): void;
}

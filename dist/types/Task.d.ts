/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
import type { Func } from '@tsdotnet/common-interfaces';
import TaskHandlerBase from './TaskHandlerBase';
import type TaskState from './TaskState';
export declare class Task<T> extends TaskHandlerBase {
    private readonly _result;
    constructor(valueFactory: Func<T>);
    get state(): TaskState<T>;
    get result(): T;
    get error(): any;
    start(defer?: number): void;
    runSynchronously(): void;
    protected _onExecute(): void;
    protected getResult(): T;
    protected getState(): TaskState<T>;
    protected _onDispose(): void;
}
export default Task;

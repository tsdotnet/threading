/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
import { type Closure } from '@tsdotnet/common-interfaces';
import TaskHandlerBase from './TaskHandlerBase';
export default class TaskHandler extends TaskHandlerBase {
    private readonly _action;
    constructor(_action: Closure);
    protected _onExecute(): void;
    protected _onDispose(): void;
}

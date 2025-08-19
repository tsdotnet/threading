/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 * Based on code from: https://github.com/kriskowal/q
 */
import { type Closure } from '@tsdotnet/common-interfaces';
import type Cancellable from './Cancellable';
export declare function deferImmediate(task: Function, context?: unknown, args?: unknown[]): Cancellable;
export declare function runAfterDeferred(task: Closure): void;
export default deferImmediate;

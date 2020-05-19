/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 * Based on code from: https://github.com/kriskowal/q
 */
/**
 * @packageDocumentation
 * @module threading
 */
import { Closure } from '@tsdotnet/common-interfaces';
import Cancellable from './Cancellable';
/**
 * Defers a delegate till the next tick or zero timeout.
 * @param task
 * @param context
 * @param args
 * @returns Cancellable
 */
export declare function deferImmediate(task: Function, context?: any, args?: any[]): Cancellable;
/**
 * Runs a task after all other tasks have been run
 * this is useful for unhandled rejection tracking that needs to happen
 * after all `then`d tasks have been run.
 * @param {Closure} task
 */
export declare function runAfterDeferred(task: Closure): void;
export default deferImmediate;

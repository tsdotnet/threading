/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
/**
 * @packageDocumentation
 * @module threading
 */
import { Closure, Func } from '@tsdotnet/common-interfaces';
import Cancellable from './Cancellable';
export declare function defer(task: Closure, delay?: number): Cancellable;
export declare function defer<T>(task: Func<T>, delay?: number, payload?: T): Cancellable;
export declare function interval(task: Function, interval: number, count?: number): Cancellable;
export default defer;

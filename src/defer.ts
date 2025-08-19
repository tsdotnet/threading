/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */

import type {Closure, Func} from '@tsdotnet/common-interfaces';
import type Cancellable from './Cancellable';

abstract class DeferBase
implements Cancellable
{
	// It may be a Timer in node, should not be restricted to number.
	protected _id: any;

	abstract cancel (): boolean;

	dispose (): void
	{
		this.cancel();
	}
}

class Defer
	extends DeferBase
{


	constructor (task: Function, delay: number = 0, payload?: any)
	{
		super();
		if(!(delay>0)) delay = 0; // covers undefined and null.
		this._id = setTimeout(Defer.handler, delay, task, this, payload);
	}

	// Use a static function here to avoid recreating a new function every time.
	private static handler (task: Function, d: Defer, payload?: any): void
	{
		d.cancel();
		task(payload);
	}

	cancel (): boolean
	{
		const id = this._id;
		if(id)
		{
			clearTimeout(id);
			this._id = null;
			return true;
		}
		return false;
	}

}

class DeferInterval
	extends DeferBase
{


	constructor (
		task: Function,
		interval: number,
		private _remaining: number = Infinity)
	{
		super();
		if(interval==null)
			throw '\'interval\' must be a valid number.';
		if(interval<0)
			throw '\'interval\' cannot be negative.';

		this._id = setInterval(DeferInterval.handler, interval, task, this);
	}

	private static handler (task: Function, d: DeferInterval): void
	{
		if(!(--d._remaining)) d.cancel();
		task();
	}

	cancel (): boolean
	{
		const id = this._id;
		if(id)
		{
			clearInterval(id);
			this._id = null;
			return true;
		}
		return false;
	}

}


export function defer (
	task: Closure,
	delay?: number): Cancellable;

export function defer<T> (
	task: Func<T>,
	delay?: number,
	payload?: T): Cancellable;

export function defer<T> (
	task: Function,
	delay?: number,
	payload?: T): Cancellable
{
	return new Defer(task, delay, payload);
}

export function interval (
	task: Function,
	interval: number,
	count: number = Infinity): Cancellable
{
	return new DeferInterval(task, interval, count);
}

export default defer;

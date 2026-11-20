/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */

import { DisposableBase } from '@tsdotnet/disposable';
import type Cancellable from './Cancellable.js';
import type TaskStatus from './TaskStatus.js';
import { TaskStatusValue } from './TaskStatus.js';

/**
 * A simple class for handling potentially repeated executions either deferred or immediate.
 */
export default abstract class TaskHandlerBase
	extends DisposableBase
	implements Cancellable
{
	private _timeoutId: any;

	protected constructor ()
	{
		super();
		this._timeoutId = null;
		this._status = TaskStatusValue.Created;
	}

	private _status: TaskStatusValue;

	get status (): TaskStatus
	{
		return this.getStatus();
	}

	get isScheduled (): boolean
	{
		return !!this._timeoutId;
	}

	// Use a static function here to avoid recreating a new function every time.
	private static _handler (d: TaskHandlerBase): void
	{
		d.cancel();
		d._status = TaskStatusValue.Running;
		try
		{
			d._onExecute();
			d._status = TaskStatusValue.RanToCompletion;
		}
		catch
		{
			d._status = TaskStatusValue.Faulted;
		}
	}

	/**
	 * Schedules/Reschedules triggering the task.
	 * @param defer Optional time to wait until triggering.
	 */
	start (defer: number = 0): void
	{
		this.assertIsAlive(true);

		this.cancel();
		this._status = TaskStatusValue.WaitingToRun;
		if(!(defer>0)) defer = 0;  // A negation is used to catch edge cases.
		if(isFinite(defer))
			this._timeoutId = setTimeout(TaskHandlerBase._handler, defer, this);
	}

	runSynchronously (): void
	{
		this.assertIsAlive(true);
		TaskHandlerBase._handler(this);
	}

	cancel (): boolean
	{
		const id = this._timeoutId;
		if(id)
		{
			clearTimeout(id);
			this._timeoutId = null;
			this._status = TaskStatusValue.Cancelled;
			return true;
		}
		return false;
	}

	protected getStatus (): TaskStatus
	{
		return this._status as number as TaskStatus;
	}

	protected abstract _onExecute (): void;

	protected _onDispose (): void
	{
		this.cancel();
		(this as any)._status = null;
	}


}

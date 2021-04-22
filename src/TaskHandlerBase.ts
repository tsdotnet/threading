/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */

import DisposableBase from '@tsdotnet/disposable/dist/DisposableBase';
import Cancellable from './Cancellable';
import TaskStatus from './TaskStatus';


const NAME = 'TaskHandlerBase';
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
		super(NAME);
		this._timeoutId = null;
		this._status = TaskStatus.Created;
	}

	private _status: TaskStatus;

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
		d._status = TaskStatus.Running;
		try
		{
			d._onExecute();
			d._status = TaskStatus.RanToCompletion;
		}
		catch(ex)
		{
			d._status = TaskStatus.Faulted;
		}
	}

	/**
	 * Schedules/Reschedules triggering the task.
	 * @param defer Optional time to wait until triggering.
	 */
	start (defer: number = 0): void
	{
		this.throwIfDisposed();

		this.cancel();
		this._status = TaskStatus.WaitingToRun;
		if(!(defer>0)) defer = 0;  // A negation is used to catch edge cases.
		if(isFinite(defer))
			this._timeoutId = setTimeout(TaskHandlerBase._handler, defer, this);
	}

	runSynchronously (): void
	{
		this.throwIfDisposed();
		TaskHandlerBase._handler(this);
	}

	cancel (): boolean
	{
		const id = this._timeoutId;
		if(id)
		{
			clearTimeout(id);
			this._timeoutId = null;
			this._status = TaskStatus.Cancelled;
			return true;
		}
		return false;
	}

	protected getStatus (): TaskStatus
	{
		return this._status;
	}

	protected abstract _onExecute (): void;

	protected _onDispose (): void
	{
		this.cancel();
		(this as any)._status = null;
	}


}

/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 * Based upon Parallel.js: https://github.com/adambom/parallel.js/blob/master/lib/Worker.js
 */

import type {Action} from '@tsdotnet/common-interfaces';
import {ObservableBase} from '@tsdotnet/observable-base';
import type {WorkerLike} from './WorkerLike';

/**
 * Generic NodeWorker class that works with any child process implementation.
 * This class is agnostic to how the child process is created.
 */
export default class NodeWorker
	extends ObservableBase<any>
	implements WorkerLike
{
	onmessage?: Action<{ data: any }> | null;
	onerror?: Action<any> | null;
	private _process: any;

	constructor (childProcess: any)
	{
		super();
		this._process = childProcess;
		this._process.on('message', (msg: string) => this._onNext(JSON.parse(msg)));
		this._process.on('error', (err: any) => this._onError(err));
	}

	postMessage (obj: unknown): void
	{
		this.throwIfDisposed();
		this._process.send(JSON.stringify({data: obj}));
	}

	terminate (): void
	{
		this.dispose();
	}

	protected _onNext (data: unknown): void
	{
		super._onNext(data);
		if(this.onmessage)
			this.onmessage({data: data});

	}

	protected _onError (error: unknown): void
	{
		super._onError(error);
		if(this.onerror)
			this.onerror(error);
	}

	protected _onDispose (): void
	{
		super._onDispose();
		this._process.removeAllListeners(); // just to satisfy paranoia.
		this._process.kill();
		this._process = null;
	}

}

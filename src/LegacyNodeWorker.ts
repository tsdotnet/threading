/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 * Based upon Parallel.js: https://github.com/adambom/parallel.js/blob/master/lib/Worker.js
 */
/**
 * @packageDocumentation
 * @module threading
 */


import {Action} from '@tsdotnet/common-interfaces';
import ObservableBase from '@tsdotnet/observable-base/dist/ObservableBase';
import {WorkerLike} from './WorkerLike';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ps = require('child_process');
//import {ChildProcess} from "child_process";

/**
 * This class takes the place of a WebWorker
 */
export default class LegacyNodeWorker
	extends ObservableBase<any>
	implements WorkerLike
{
	onmessage?: Action<{ data: any }> | null;
	onerror?: Action<any> | null;
	private _process: any;

	constructor (url: string)
	{
		super();
		const process = this._process = ps.fork(url);
		process.on('message', (msg: string) => this._onNext(JSON.parse(msg)));
		process.on('error', (err: any) => this._onError(err));
	}

	postMessage (obj: any): void
	{
		this.throwIfDisposed();
		this._process.send(JSON.stringify({data: obj}));
	}

	terminate ()
	{
		this.dispose();
	}

	protected _onNext (data: any): void
	{
		super._onNext(data);
		if(this.onmessage)
			this.onmessage({data: data});

	}

	protected _onError (error: any): void
	{
		super._onError(error);
		if(this.onerror)
			this.onerror(error);
	}

	protected _onDispose ()
	{
		super._onDispose();
		this._process.removeAllListeners(); // just to satisfy paranoia.
		this._process.kill();
		this._process = null;
	}

}

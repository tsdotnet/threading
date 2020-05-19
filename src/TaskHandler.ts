/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
/**
 * @packageDocumentation
 * @module threading
 */

import {Closure} from '@tsdotnet/common-interfaces';
import ArgumentNullException from '@tsdotnet/exceptions/dist/ArgumentNullException';
import TaskHandlerBase from './TaskHandlerBase';

export default class TaskHandler
	extends TaskHandlerBase
{

	constructor (private readonly _action: Closure)
	{
		super();
		if(!_action) throw new ArgumentNullException('action');
	}

	protected _onExecute (): void
	{
		this._action();
	}

	protected _onDispose (): void
	{
		super._onDispose();
		(this as any)._action = null;
	}
}

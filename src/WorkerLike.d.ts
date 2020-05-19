/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
/**
 * @packageDocumentation
 * @module threading
 */

import {Action} from '@tsdotnet/common-interfaces';

export declare interface WorkerLike
{
	onmessage?: Action<{ data: any }> | null;
	onerror?: Action<any> | null;

	postMessage (obj: any): void;

	terminate (): void;
}

export declare interface WorkerConstructor
{
	new (url: string): WorkerLike;
}

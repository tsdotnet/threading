/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */

import type {Disposable} from '@tsdotnet/disposable';

export default interface Cancellable
	extends Disposable
{

	/**
	 * Returns true if cancelled.
	 * Returns false if already run or already cancelled or unable to cancel.
	 */
	cancel (): boolean;
// eslint-disable-next-line semi
}

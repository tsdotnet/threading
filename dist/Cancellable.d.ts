/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
/**
 * @packageDocumentation
 * @module threading
 */

import Disposable from '@tsdotnet/disposable/dist/Disposable';

export default interface Cancellable
	extends Disposable
{

	/**
	 * Returns true if cancelled.
	 * Returns false if already run or already cancelled or unable to cancel.
	 */
	cancel (): boolean;
}

/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
/**
 * @packageDocumentation
 * @module threading
 */

import {isNodeJS} from './environment';
import {WorkerConstructor} from './WorkerLike';

/**
 * Default worker constructor for the current environment.
 */
export const Worker: WorkerConstructor = getNodeWorker();
export default Worker;

function getNodeWorker (): WorkerConstructor
{
	try
	{
		return eval('Worker');
	}
	catch(ex)
	{
		return isNodeJS
			? (require as any)('./LegacyNodeWorker').default
			: (self as any).Worker;
	}
}

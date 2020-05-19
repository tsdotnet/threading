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
export const Worker: WorkerConstructor = isNodeJS
	? (require as any)('./NodeJSWorker').default
	: (self as any).Worker;

export default Worker;

/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */

import NodeWorker from './NodeWorker';
// Node.js built-in module - will be external in browser bundles
import {fork} from 'node:child_process';

/**
 * Factory for creating NodeWorker instances (ESM version)
 */
export class NodeWorkerFactory {
	/**
	 * Create a NodeWorker instance
	 */
	static create(url: string): NodeWorker {
		const process = fork(url);
		return new NodeWorker(process);
	}
}

export default NodeWorkerFactory;

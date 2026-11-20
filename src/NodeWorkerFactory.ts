/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */

import NodeWorker from './NodeWorker.js';

/**
 * Factory for creating NodeWorker instances.
 * `node:child_process` is loaded on first use (process.getBuiltinModule), not imported,
 * so browser bundlers never see a Node built-in when they bundle this package.
 */
export class NodeWorkerFactory {
	/**
	 * Create a NodeWorker instance
	 */
	static create(url: string): NodeWorker {
		const child = process.getBuiltinModule('node:child_process').fork(url);
		return new NodeWorker(child);
	}
}

export default NodeWorkerFactory;

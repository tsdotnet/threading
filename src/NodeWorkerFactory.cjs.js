/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */

// Pure CommonJS factory - this file can be copied over NodeWorkerFactory.ts during CJS builds
const NodeWorker = require('./NodeWorker').default;
const childProcess = require('child_process');

/**
 * Factory for creating NodeWorker instances (CommonJS version)
 */
class NodeWorkerFactory {
	/**
	 * Create a NodeWorker instance
	 */
	static create(url) {
		const process = childProcess.fork(url);
		return new NodeWorker(process);
	}
}

module.exports = { NodeWorkerFactory };
module.exports.default = NodeWorkerFactory;

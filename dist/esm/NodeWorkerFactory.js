import NodeWorker from './NodeWorker.js';

/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
class NodeWorkerFactory {
    static create(url) {
        const child = process.getBuiltinModule('node:child_process').fork(url);
        return new NodeWorker(child);
    }
}

export { NodeWorkerFactory, NodeWorkerFactory as default };
//# sourceMappingURL=NodeWorkerFactory.js.map

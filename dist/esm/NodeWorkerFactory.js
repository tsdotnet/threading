import NodeWorker from './NodeWorker.js';
import { fork } from 'node:child_process';

/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
class NodeWorkerFactory {
    static create(url) {
        const process = fork(url);
        return new NodeWorker(process);
    }
}

export { NodeWorkerFactory, NodeWorkerFactory as default };
//# sourceMappingURL=NodeWorkerFactory.js.map

"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeWorkerFactory = void 0;
const tslib_1 = require("tslib");
const NodeWorker_1 = tslib_1.__importDefault(require("./NodeWorker"));
const node_child_process_1 = require("node:child_process");
class NodeWorkerFactory {
    static create(url) {
        const process = (0, node_child_process_1.fork)(url);
        return new NodeWorker_1.default(process);
    }
}
exports.NodeWorkerFactory = NodeWorkerFactory;
exports.default = NodeWorkerFactory;
//# sourceMappingURL=NodeWorkerFactory.js.map
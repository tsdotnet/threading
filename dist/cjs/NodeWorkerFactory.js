"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeWorkerFactory = void 0;
const tslib_1 = require("tslib");
const NodeWorker_js_1 = tslib_1.__importDefault(require("./NodeWorker.js"));
class NodeWorkerFactory {
    static create(url) {
        const child = process.getBuiltinModule('node:child_process').fork(url);
        return new NodeWorker_js_1.default(child);
    }
}
exports.NodeWorkerFactory = NodeWorkerFactory;
exports.default = NodeWorkerFactory;
//# sourceMappingURL=NodeWorkerFactory.js.map
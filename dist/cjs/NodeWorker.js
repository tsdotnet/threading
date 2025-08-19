"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 * Based upon Parallel.js: https://github.com/adambom/parallel.js/blob/master/lib/Worker.js
 */
Object.defineProperty(exports, "__esModule", { value: true });
const observable_base_1 = require("@tsdotnet/observable-base");
class NodeWorker extends observable_base_1.ObservableBase {
    constructor(childProcess) {
        super();
        this._process = childProcess;
        this._process.on('message', (msg) => this._onNext(JSON.parse(msg)));
        this._process.on('error', (err) => this._onError(err));
    }
    postMessage(obj) {
        this.throwIfDisposed();
        this._process.send(JSON.stringify({ data: obj }));
    }
    terminate() {
        this.dispose();
    }
    _onNext(data) {
        super._onNext(data);
        if (this.onmessage)
            this.onmessage({ data: data });
    }
    _onError(error) {
        super._onError(error);
        if (this.onerror)
            this.onerror(error);
    }
    _onDispose() {
        super._onDispose();
        this._process.removeAllListeners();
        this._process.kill();
        this._process = null;
    }
}
exports.default = NodeWorker;
//# sourceMappingURL=NodeWorker.js.map
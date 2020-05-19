"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 * Based upon Parallel.js: https://github.com/adambom/parallel.js/blob/master/lib/Worker.js
 */
/**
 * @packageDocumentation
 * @module threading
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ObservableBase_1 = tslib_1.__importDefault(require("@tsdotnet/observable-base/dist/ObservableBase"));
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ps = require('child_process');
//import {ChildProcess} from "child_process";
/**
 * This class takes the place of a WebWorker
 */
class NodeJSWorker extends ObservableBase_1.default {
    constructor(url) {
        super();
        const process = this._process = ps.fork(url);
        process.on('message', (msg) => this._onNext(JSON.parse(msg)));
        process.on('error', (err) => this._onError(err));
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
        this._process.removeAllListeners(); // just to satisfy paranoia.
        this._process.kill();
        this._process = null;
    }
}
exports.default = NodeJSWorker;
//# sourceMappingURL=NodeJSWorker.js.map
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 * Based upon Parallel.js: https://github.com/adambom/parallel.js/blob/master/lib/Worker.js
 */
import { ObservableBase } from '@tsdotnet/observable-base';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const ps = require('child_process');
//import {ChildProcess} from "child_process";
/**
 * This class takes the place of a WebWorker
 */
export default class LegacyNodeWorker extends ObservableBase {
    onmessage;
    onerror;
    _process;
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
//# sourceMappingURL=LegacyNodeWorker.js.map
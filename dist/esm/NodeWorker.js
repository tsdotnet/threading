import { ObservableBase } from '@tsdotnet/observable-base';

/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 * Based upon Parallel.js: https://github.com/adambom/parallel.js/blob/master/lib/Worker.js
 */
class NodeWorker extends ObservableBase {
    onmessage;
    onerror;
    _process;
    constructor(childProcess) {
        super();
        this._process = childProcess;
        this._process.on('message', (msg) => this._onNext(JSON.parse(msg)));
        this._process.on('error', (err) => this._onError(err));
    }
    postMessage(obj) {
        this.assertIsAlive(true);
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

export { NodeWorker as default };
//# sourceMappingURL=NodeWorker.js.map

import { NodeWorkerFactory } from './NodeWorkerFactory.js';

/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
const Worker = getNodeWorker();
function getNodeWorker() {
    if (typeof globalThis !== 'undefined' && globalThis.Worker) {
        return globalThis.Worker;
    }
    if (typeof self !== 'undefined' && self.Worker) {
        return self.Worker;
    }
    if (typeof window !== 'undefined' && window.Worker) {
        return window.Worker;
    }
    return class FactoryWorker {
        _worker;
        constructor(url) {
            const urlString = typeof url === 'string' ? url : url.href;
            this._worker = NodeWorkerFactory.create(urlString);
        }
        postMessage(message, transfer) {
            this._worker.postMessage(message);
        }
        terminate() {
            this._worker.terminate();
        }
        addEventListener(type, listener, options) {
            if (this._worker.addEventListener) {
                this._worker.addEventListener(type, listener, options);
            }
        }
        removeEventListener(type, listener, options) {
            if (this._worker.removeEventListener) {
                this._worker.removeEventListener(type, listener, options);
            }
        }
        dispatchEvent(event) {
            return this._worker.dispatchEvent ? this._worker.dispatchEvent(event) : true;
        }
        get onmessage() { return this._worker.onmessage; }
        set onmessage(value) { this._worker.onmessage = value; }
        get onmessageerror() { return this._worker.onmessageerror; }
        set onmessageerror(value) { this._worker.onmessageerror = value; }
        get onerror() { return this._worker.onerror; }
        set onerror(value) { this._worker.onerror = value; }
    };
}

export { Worker, Worker as default };
//# sourceMappingURL=Worker.js.map

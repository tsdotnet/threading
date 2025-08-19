"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Worker = void 0;
const tslib_1 = require("tslib");
const NodeWorkerFactory_1 = tslib_1.__importDefault(require("./NodeWorkerFactory"));
exports.Worker = getNodeWorker();
exports.default = exports.Worker;
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
        constructor(url) {
            const urlString = typeof url === 'string' ? url : url.href;
            this._worker = NodeWorkerFactory_1.default.create(urlString);
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
//# sourceMappingURL=Worker.js.map
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */

import NodeWorkerFactory from './NodeWorkerFactory';
import { WorkerConstructor } from './WorkerLike';

/**
 * Default worker constructor for the current environment.
 */
export const Worker: WorkerConstructor = getNodeWorker();
export default Worker;

function getNodeWorker(): WorkerConstructor {
	// Check if we're in a browser environment with Worker support
	if (typeof globalThis !== 'undefined' && globalThis.Worker) {
		return globalThis.Worker as WorkerConstructor;
	}

	// Check legacy browser global locations
	if (typeof self !== 'undefined' && (self as any).Worker) {
		return (self as any).Worker;
	}

	if (typeof window !== 'undefined' && (window as any).Worker) {
		return (window as any).Worker;
	}

	// No browser Worker available, use Node.js factory
	return class FactoryWorker {
		private _worker: any;

		constructor(url: string | URL) {
			const urlString = typeof url === 'string' ? url : url.href;
			this._worker = NodeWorkerFactory.create(urlString);
		}

		postMessage(message: any, transfer?: Transferable[]): void {
			this._worker.postMessage(message);
		}

		terminate(): void {
			this._worker.terminate();
		}

		addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void {
			// Delegate to underlying worker if it supports it
			if (this._worker.addEventListener) {
				this._worker.addEventListener(type, listener, options);
			}
		}

		removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void {
			// Delegate to underlying worker if it supports it
			if (this._worker.removeEventListener) {
				this._worker.removeEventListener(type, listener, options);
			}
		}

		dispatchEvent(event: Event): boolean {
			// Delegate to underlying worker if it supports it
			return this._worker.dispatchEvent ? this._worker.dispatchEvent(event) : true;
		}

		get onmessage() { return this._worker.onmessage; }
		set onmessage(value) { this._worker.onmessage = value; }

		get onmessageerror() { return this._worker.onmessageerror; }
		set onmessageerror(value) { this._worker.onmessageerror = value; }

		get onerror() { return this._worker.onerror; }
		set onerror(value) { this._worker.onerror = value; }
	} as any;
}
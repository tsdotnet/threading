import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import TaskHandler from '../src/TaskHandler';
import Worker from '../src/Worker';

describe('Worker', () => {
	it('have valid constructor', () => {
		expect(Worker).not.toBeNull();
	});

	describe('Worker instance creation and manipulation', () => {
		let worker: InstanceType<typeof Worker>;
		
		afterEach(() => {
			// Clean up worker after each test
			if (worker) {
				worker.terminate();
			}
		});

		it('should create a worker instance successfully', () => {
			// In Node.js test environment, this will create our NodeWorker
			// We'll use a simple test script path
			expect(() => {
				worker = new Worker('./test-script.js');
			}).not.toThrow();
			
			expect(worker).toBeDefined();
			expect(typeof worker.postMessage).toBe('function');
			expect(typeof worker.terminate).toBe('function');
		});

		it('should have proper WorkerLike interface methods', () => {
			worker = new Worker('./test-script.js');
			
			// Test that all required WorkerLike methods exist
			expect(typeof worker.postMessage).toBe('function');
			expect(typeof worker.terminate).toBe('function');
		});

		it('should have proper WorkerLike interface properties', () => {
			worker = new Worker('./test-script.js');
			
			// Test that WorkerLike properties can be accessed
			expect(worker.onmessage).toBeUndefined(); // Initially undefined
			expect(worker.onerror).toBeUndefined(); // Initially undefined
		});

		it('should have additional DOM Worker methods (when available)', () => {
			worker = new Worker('./test-script.js');
			const workerAny = worker as any;
			
			// These methods are available in our implementation but not in WorkerLike interface
			expect(typeof workerAny.addEventListener).toBe('function');
			expect(typeof workerAny.removeEventListener).toBe('function');
			expect(typeof workerAny.dispatchEvent).toBe('function');
			expect(workerAny.onmessageerror).toBeUndefined(); // Initially undefined
		});

		it('should allow setting event handlers', () => {
			worker = new Worker('./test-script.js');
			
			const messageHandler = vi.fn();
			const errorHandler = vi.fn();
			
			// Test setting event handlers
			worker.onmessage = messageHandler;
			worker.onerror = errorHandler;
			
			expect(worker.onmessage).toBe(messageHandler);
			expect(worker.onerror).toBe(errorHandler);
		});

		it('should call postMessage without throwing', () => {
			worker = new Worker('./test-script.js');
			
			expect(() => {
				worker.postMessage({ test: 'data' });
			}).not.toThrow();
			
			expect(() => {
				worker.postMessage('simple string');
			}).not.toThrow();
			
			expect(() => {
				worker.postMessage(42);
			}).not.toThrow();
		});

		it('should call terminate without throwing', () => {
			worker = new Worker('./test-script.js');
			
			expect(() => {
				worker.terminate();
			}).not.toThrow();
			
			// After termination, worker should still exist but be disposed
			expect(worker).toBeDefined();
		});

		it('should handle addEventListener and removeEventListener', () => {
			worker = new Worker('./test-script.js');
			const workerAny = worker as any;
			
			const listener = vi.fn();
			
			expect(() => {
				workerAny.addEventListener('message', listener);
			}).not.toThrow();
			
			expect(() => {
				workerAny.removeEventListener('message', listener);
			}).not.toThrow();
		});

		it('should handle dispatchEvent', () => {
			worker = new Worker('./test-script.js');
			const workerAny = worker as any;
			
			const event = new Event('test');
			
			expect(() => {
				const result = workerAny.dispatchEvent(event);
				expect(typeof result).toBe('boolean');
			}).not.toThrow();
		});
	});
});

describe('new TaskHandler()', () => {
	it('should throw', () => {
		expect(() => {
			new TaskHandler(null as any);
		}).toThrow();
		expect(() => {
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			(new TaskHandler(() => {})).dispose();
		}).not.toThrow();

	});
});

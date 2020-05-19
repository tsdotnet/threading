import {assert} from 'chai';
import TaskHandler from '../src/TaskHandler';
import Worker from '../src/Worker';

describe('Worker', () => {
	it('have valid constructor', () => {
		assert.isNotNull(Worker);
	});
});

describe('new TaskHandler()', () => {
	it('should throw', () => {
		assert.throws(() => {
			new TaskHandler(null as any);
		});
		assert.doesNotThrow(() => {
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			(new TaskHandler(() => {})).dispose();
		});

	});
});

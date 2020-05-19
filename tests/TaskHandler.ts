import {assert} from 'chai';
import TaskHandler from '../src/TaskHandler';


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

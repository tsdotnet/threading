/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
/**
 * @packageDocumentation
 * @module threading
 */

import TaskStatus from './TaskStatus';

export default interface TaskState<T>
{
	status: TaskStatus;
	result?: T;
	error?: any;
}

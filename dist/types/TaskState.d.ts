/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */

import type TaskStatus from './TaskStatus.js';

export default interface TaskState<T>
{
	status: TaskStatus;
	result?: T | undefined;
	error?: any;
// eslint-disable-next-line semi
}

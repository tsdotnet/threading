/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */

import type TaskStatus from './TaskStatus';

export default interface TaskState<T>
{
	status: TaskStatus;
	result?: T;
	error?: any;
// eslint-disable-next-line semi
}

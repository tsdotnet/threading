/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
/**
 * @packageDocumentation
 * @module threading
 */
import { isNodeJS } from './environment';
/**
 * Default worker constructor for the current environment.
 */
export const Worker = isNodeJS
    ? require('./NodeJSWorker').default
    : self.Worker;
export default Worker;
//# sourceMappingURL=Worker.js.map
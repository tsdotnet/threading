/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
import { isNodeJS } from './environment';
/**
 * Default worker constructor for the current environment.
 */
export const Worker = getNodeWorker();
export default Worker;
function getNodeWorker() {
    try {
        return eval('Worker');
    }
    catch (ex) {
        return isNodeJS
            ? require('./LegacyNodeWorker').default
            : self.Worker;
    }
}
//# sourceMappingURL=Worker.js.map
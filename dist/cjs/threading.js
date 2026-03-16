"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskHandlerBase = exports.TaskHandler = exports.Task = exports.Worker = exports.environment = exports.deferImmediate = exports.defer = void 0;
const tslib_1 = require("tslib");
const defer_js_1 = tslib_1.__importDefault(require("./defer.js"));
exports.defer = defer_js_1.default;
const deferImmediate_js_1 = tslib_1.__importDefault(require("./deferImmediate.js"));
exports.deferImmediate = deferImmediate_js_1.default;
const environment = tslib_1.__importStar(require("./environment.js"));
exports.environment = environment;
const Task_js_1 = tslib_1.__importDefault(require("./Task.js"));
exports.Task = Task_js_1.default;
const TaskHandler_js_1 = tslib_1.__importDefault(require("./TaskHandler.js"));
exports.TaskHandler = TaskHandler_js_1.default;
const TaskHandlerBase_js_1 = tslib_1.__importDefault(require("./TaskHandlerBase.js"));
exports.TaskHandlerBase = TaskHandlerBase_js_1.default;
const Worker_js_1 = tslib_1.__importDefault(require("./Worker.js"));
exports.Worker = Worker_js_1.default;
//# sourceMappingURL=threading.js.map
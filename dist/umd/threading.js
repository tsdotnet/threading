/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "./defer", "./deferImmediate", "./environment", "./Task", "./TaskHandler", "./TaskHandlerBase", "./Worker"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TaskHandlerBase = exports.TaskHandler = exports.Task = exports.Worker = exports.environment = exports.deferImmediate = exports.defer = void 0;
    const tslib_1 = require("tslib");
    const defer_1 = tslib_1.__importDefault(require("./defer"));
    exports.defer = defer_1.default;
    const deferImmediate_1 = tslib_1.__importDefault(require("./deferImmediate"));
    exports.deferImmediate = deferImmediate_1.default;
    const environment = tslib_1.__importStar(require("./environment"));
    exports.environment = environment;
    const Task_1 = tslib_1.__importDefault(require("./Task"));
    exports.Task = Task_1.default;
    const TaskHandler_1 = tslib_1.__importDefault(require("./TaskHandler"));
    exports.TaskHandler = TaskHandler_1.default;
    const TaskHandlerBase_1 = tslib_1.__importDefault(require("./TaskHandlerBase"));
    exports.TaskHandlerBase = TaskHandlerBase_1.default;
    const Worker_1 = tslib_1.__importDefault(require("./Worker"));
    exports.Worker = Worker_1.default;
});
//# sourceMappingURL=threading.js.map
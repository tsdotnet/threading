"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TaskStatus;
(function (TaskStatus) {
    TaskStatus[TaskStatus["Created"] = 0] = "Created";
    TaskStatus[TaskStatus["WaitingToRun"] = 1] = "WaitingToRun";
    TaskStatus[TaskStatus["Running"] = 2] = "Running";
    TaskStatus[TaskStatus["RanToCompletion"] = 3] = "RanToCompletion";
    TaskStatus[TaskStatus["Cancelled"] = 4] = "Cancelled";
    TaskStatus[TaskStatus["Faulted"] = 5] = "Faulted";
})(TaskStatus || (TaskStatus = {}));
exports.default = TaskStatus;
//# sourceMappingURL=TaskStatus.js.map
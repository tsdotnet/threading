"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
/**
 * @packageDocumentation
 * @module threading
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Worker = void 0;
const environment_1 = require("./environment");
/**
 * Default worker constructor for the current environment.
 */
exports.Worker = environment_1.isNodeJS
    ? require('./NodeJSWorker').default
    : self.Worker;
exports.default = exports.Worker;
//# sourceMappingURL=Worker.js.map
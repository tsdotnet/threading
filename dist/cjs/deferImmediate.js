"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 * Based on code from: https://github.com/kriskowal/q
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.deferImmediate = deferImmediate;
exports.runAfterDeferred = runAfterDeferred;
const tslib_1 = require("tslib");
const linked_node_list_1 = require("@tsdotnet/linked-node-list");
const object_pool_1 = tslib_1.__importDefault(require("@tsdotnet/object-pool"));
const queue_1 = tslib_1.__importDefault(require("@tsdotnet/queue"));
const environment_1 = require("./environment");
let requestTick;
let flushing = false;
function flush() {
    let entry;
    while ((entry = immediateQueue.first)) {
        const { task, domain, context, args } = entry;
        entry.canceller();
        if (domain)
            domain.enter();
        runSingle(task, domain, context, args);
    }
    while (laterQueue.tryDequeue(task => {
        runSingle(task);
    })) { }
    flushing = false;
}
const immediateQueue = new linked_node_list_1.LinkedNodeList();
const laterQueue = new queue_1.default();
const entryPool = new object_pool_1.default(() => ({}), (o) => {
    o.task = null;
    o.domain = null;
    o.context = null;
    if (o.args)
        o.args.length = 0;
    o.args = null;
    o.canceller = null;
}, 40);
function runSingle(task, domain, context, params) {
    try {
        task.apply(context, params);
    }
    catch (e) {
        if (environment_1.isNodeJS) {
            if (domain) {
                domain.exit();
            }
            setTimeout(flush, 0);
            if (domain) {
                domain.enter();
            }
            throw e;
        }
        else {
            setTimeout(() => {
                throw e;
            }, 0);
        }
    }
    if (domain) {
        domain.exit();
    }
}
function requestFlush() {
    if (!flushing) {
        flushing = true;
        requestTick();
    }
}
function deferImmediate(task, context, args) {
    const entry = entryPool.take();
    entry.task = task;
    entry.domain = environment_1.isNodeJS && process['domain'];
    entry.context = context;
    entry.args = args && args.slice();
    entry.canceller = () => {
        if (!entry)
            return false;
        const r = Boolean(immediateQueue.removeNode(entry));
        entryPool.give(entry);
        return r;
    };
    immediateQueue.addNode(entry);
    requestFlush();
    return {
        cancel: entry.canceller,
        dispose: () => { if (entry)
            entry.canceller(); }
    };
}
function runAfterDeferred(task) {
    laterQueue.enqueue(task);
    requestFlush();
}
if (environment_1.isNodeJS) {
    requestTick = () => {
        process.nextTick(flush);
    };
}
else if (typeof setImmediate === 'function') {
    if (typeof window !== 'undefined') {
        requestTick = setImmediate.bind(window, flush);
    }
    else {
        requestTick = () => {
            setImmediate(flush);
        };
    }
}
else if (typeof MessageChannel !== 'undefined') {
    const channel = new MessageChannel();
    channel.port1.onmessage = function () {
        requestTick = requestPortTick;
        channel.port1.onmessage = flush;
        flush();
    };
    const requestPortTick = () => {
        channel.port2.postMessage(0);
    };
    requestTick = () => {
        setTimeout(flush, 0);
        requestPortTick();
    };
}
else {
    requestTick = () => {
        setTimeout(flush, 0);
    };
}
exports.default = deferImmediate;
//# sourceMappingURL=deferImmediate.js.map
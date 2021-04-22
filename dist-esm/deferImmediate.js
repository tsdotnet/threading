/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 * Based on code from: https://github.com/kriskowal/q
 */
import { LinkedNodeList } from '@tsdotnet/linked-node-list/dist/LinkedNodeList';
import ObjectPool from '@tsdotnet/object-pool';
import Queue from '@tsdotnet/queue';
import { isNodeJS } from './environment';
let requestTick;
let flushing = false;
// Use the fastest possible means to execute a task in a future turn
// of the event loop.
function flush() {
    /* jshint loopfunc: true */
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
    })) 
    // eslint-disable-next-line no-empty
    { }
    flushing = false;
}
// linked list of tasks.  Using a real linked list to allow for removal.
const immediateQueue = new LinkedNodeList();
// queue for late tasks, used by unhandled rejection tracking
const laterQueue = new Queue();
const entryPool = new ObjectPool(() => ({}), (o) => {
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
        if (isNodeJS) {
            // In node, uncaught exceptions are considered fatal errors.
            // Re-throw them synchronously to interrupt flushing!
            // Ensure continuation if the uncaught exception is suppressed
            // listening "uncaughtException" events (as domains does).
            // Continue in next event to avoid tick recursion.
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
            // In browsers, uncaught exceptions are not fatal.
            // Re-throw them asynchronously to avoid slow-downs.
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
/**
 * Defers a delegate till the next tick or zero timeout.
 * @param task
 * @param context
 * @param args
 * @returns Cancellable
 */
export function deferImmediate(task, context, args) {
    const entry = entryPool.take();
    entry.task = task;
    entry.domain = isNodeJS && process['domain'];
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
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        dispose: () => { entry && entry.canceller(); }
    };
}
/**
 * Runs a task after all other tasks have been run
 * this is useful for unhandled rejection tracking that needs to happen
 * after all `then`d tasks have been run.
 * @param {Closure} task
 */
export function runAfterDeferred(task) {
    laterQueue.enqueue(task);
    requestFlush();
}
if (isNodeJS) {
    requestTick = () => {
        process.nextTick(flush);
    };
}
else if (typeof setImmediate === 'function') {
    // In IE10, Node.js 0.9+, or https://github.com/NobleJS/setImmediate
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
    // modern browsers
    // http://www.nonblocking.io/2011/06/windownexttick.html
    const channel = new MessageChannel();
    // At least Safari Version 6.0.5 (8536.30.1) intermittently cannot create
    // working message ports the first time a page loads.
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    channel.port1.onmessage = function () {
        requestTick = requestPortTick;
        channel.port1.onmessage = flush;
        flush();
    };
    const requestPortTick = () => {
        // Opera requires us to provide a message payload, regardless of
        // whether we use it.
        channel.port2.postMessage(0);
    };
    requestTick = () => {
        setTimeout(flush, 0);
        requestPortTick();
    };
}
else {
    // old browsers
    requestTick = () => {
        setTimeout(flush, 0);
    };
}
export default deferImmediate;
//# sourceMappingURL=deferImmediate.js.map
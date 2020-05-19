/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
/**
 * @packageDocumentation
 * @module threading
 */
class DeferBase {
    dispose() {
        this.cancel();
    }
}
class Defer extends DeferBase {
    constructor(task, delay = 0, payload) {
        super();
        if (!(delay > 0))
            delay = 0; // covers undefined and null.
        this._id = setTimeout(Defer.handler, delay, task, this, payload);
    }
    // Use a static function here to avoid recreating a new function every time.
    static handler(task, d, payload) {
        d.cancel();
        task(payload);
    }
    cancel() {
        const id = this._id;
        if (id) {
            clearTimeout(id);
            this._id = null;
            return true;
        }
        return false;
    }
}
class DeferInterval extends DeferBase {
    constructor(task, interval, _remaining = Infinity) {
        super();
        this._remaining = _remaining;
        if (interval == null)
            throw '\'interval\' must be a valid number.';
        if (interval < 0)
            throw '\'interval\' cannot be negative.';
        this._id = setInterval(DeferInterval.handler, interval, task, this);
    }
    static handler(task, d) {
        if (!(--d._remaining))
            d.cancel();
        task();
    }
    cancel() {
        const id = this._id;
        if (id) {
            clearInterval(id);
            this._id = null;
            return true;
        }
        return false;
    }
}
export function defer(task, delay, payload) {
    return new Defer(task, delay, payload);
}
export function interval(task, interval, count = Infinity) {
    return new DeferInterval(task, interval, count);
}
export default defer;
//# sourceMappingURL=defer.js.map
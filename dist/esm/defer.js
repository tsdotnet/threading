/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
class DeferBase {
    _id;
    dispose() {
        this.cancel();
    }
}
class Defer extends DeferBase {
    constructor(task, delay = 0, payload) {
        super();
        if (!(delay > 0))
            delay = 0;
        this._id = setTimeout(Defer.handler, delay, task, this, payload);
    }
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
function defer(task, delay, payload) {
    return new Defer(task, delay, payload);
}

export { defer as default, defer };
//# sourceMappingURL=defer.js.map

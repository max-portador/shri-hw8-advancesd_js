module.exports = class MySet {

    _values = []

    constructor(items = []) {
        for (let value of items) {
            this.add(value)
        }
    }

    add(value) {
        if (!this._values.includes(value)) {
            this._values.push(value)
        }
        return this
    }

    get size() {
        return this._values.length
    }

    clear() {
        this._values = []
    }


    delete(value) {
        let index = this._values.indexOf(value)
        if (index === -1) {
            return false
        }
        this._values.splice(index, 1)
        return true
    }

    has(value) {
        return this._values.includes(value)
    }

    keys() {
        return this._values.values()
    }

    [Symbol.iterator] = this.keys

    values = this.keys;

    *entries() {
        for (let value of this._values) {
            yield [value, value];
        }
    }

    forEach(callback, thisArg = this) {
        for (let value of this) {
            callback.call(thisArg, value, value, this);
        }
    }

    [Symbol.toStringTag] = '^_^';
};
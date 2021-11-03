class MySet {
    constructor(values, hasFunction = JSON.stringify) {
        this._hashFunction = hasFunction
        this._values = {};
        this._size = 0;
        if (values.length) {
            Array.from(values).forEach( val => this.add(val))
        }
    }

    has (value) {
        if (typeof value === 'object'
            && Object.keys(value).length === 0) {
            return false
        }
        return typeof this._values[this._hashFunction(value)] !== "undefined";
    }


    add (value) {
        if (!this.has(value)) {
            this._values[this._hashFunction(value)] = value;
            this._size++;
        }
        return this
    }

    get [Symbol.toStringTag]() {
        return "^_^"
    }

    // делаем объект итерируемым
    [Symbol.iterator](){
        let i = -1
        let data = Object.values(this._values)

        return {
            next: () => ({
                value: data[++i],
                done: !(i in data)
            })
        }
    }

    entries(){
        return Object.entries(this._values).map( pair => [Number(pair[0]), pair[1]])
    }

    keys(){
        return Object.keys(this._values).map( key => Number(key))
    }

    values(){
        return Object.values(this._values)
    }

    get size() {
        return this._size;
    }

    clear(){
        this._values = {}
        this._size = 0
    }

    delete(value) {
        if (this.has(value)) {
            delete this._values[this._hashFunction(value)];
            this._size--;
        }
    }

    forEach(callback, thisArg) {
        if (this == null) { throw new TypeError('MySet.prototype.forEach called on null or undefined'); }

        let args, k;
        let self = Object.values(this._values)

        let len = self.length >>> 0;

        if (typeof callback !== "function") { throw new TypeError(callback + ' is not a function'); }

        if (arguments.length > 1) { args = thisArg; }

        k = 0;

        while (k < len) {
            let kValue;
            if (k in self) {
                kValue = self[k];
                callback.call(args, kValue, k, self);
            }
            k++;
        }
    };
}

module.exports = MySet


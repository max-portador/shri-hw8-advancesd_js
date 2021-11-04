


class MySet {
    constructor(values, hasFunction = JSON.stringify) {
        this._hashFunction = hasFunction
        this._values = {};
        this._size = 0;
        if (values && values.length) {
            Array.from(values).forEach( val => this.add(val))
        }
    }


    has (value) {
        switch (typeof value){
            case "function": {
                return this.hasFunction(value)
            }
            case "object": {
                return this.hasObject(value)
            }

            default: {
                return this.hasPrimitve(value)
            }
        }
    }

    hasFunction(value){
        const funcName = value.name || "(anonymous)"

        if (funcName === "(anonymous)"){
            return false
        }
        return typeof this._values[this._hashFunction(funcName)] !== "undefined"
    }

    hasFunctionInObj(key) {
        return typeof this._values[key] !== "undefined"
    }

    hasObject(value) {
        const key = Object.keys(value)[0]

        if (typeof value[key] === 'function') {
            return this.hasFunctionInObj(key)
        } else {
            return typeof this._values[this._hashFunction(value)] !== "undefined";
        }
    }

    hasPrimitve(value) {
        return typeof this._values[this._hashFunction(value)] !== "undefined";
    }

    add (value) {
        if (!this.has(value)) {
            switch (typeof value){
                case "function":{
                    this.addFunction(value)
                    break
                }
                case "object":{
                    this.addObject(value)
                    break
                }
                default: {
                this.addPrimitive(value)
                    break
                }
            }
            this._size++;
        }
        return this
    }

    addFunction(value){
        const funcName = value.name || "(anonymous)"

        if (funcName === "(anonymous)"){
            this._values[Date.now().toString()] = value
        } else {
            this._values[this._hashFunction(funcName)] = value
        }
    }

    addObject(value){
        const key = Object.keys(value)[0]
        if (typeof value[key] === 'function') {
            this.addFunctionInObj(key, value)
        } else {
            this._values[this._hashFunction(value)] = value;
        }
    }

    addFunctionInObj(key, value){
        this._values[key] = value
    }

    addPrimitive(value) {
        this._values[this._hashFunction(value)] = value;
    }

    get [Symbol.toStringTag]() {
        return "^_^"
    };

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
    };


    *values(){
        for (let k in this._values){
            yield this._values[k]
        }
    };

    keys = this.values;

    *entries(){
        for (let key in this._values){
           let val = this._values[key]
            yield [val, val]
        }
    }

    get size() {
        return this._size;
    }

    clear(){
        this._values = {}
        this._size = 0
    };

    delete(value) {
        if (typeof value === 'object' && Object.keys(value).length === 0){
            return
        }

        if (this.has(value)) {
            delete this._values[this._hashFunction(value)];
            this._size--;
        }
    };

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


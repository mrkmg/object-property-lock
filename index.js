"use strict";
exports.__esModule = true;
function Lockable(opts) {
    return function (target) {
        return function () {
            target.call(this, arguments);
            if (opts && opts.all) {
                lock(this, opts.silent);
            }
            else {
                if (target.prototype.hasOwnProperty("___silentLock")) {
                    lock(this, target.prototype.___silentLock, true);
                }
                if (target.prototype.hasOwnProperty("___lock")) {
                    lock(this, target.prototype.___lock, false);
                }
                if (opts && opts.properties) {
                    lock(this, opts.properties, opts.silent);
                }
            }
            return this;
        };
    };
}
exports.Lockable = Lockable;
function Lock(opts) {
    return function (target, propertyKey) {
        if (opts && opts.silent) {
            if (!target.hasOwnProperty("___silentLock"))
                target.___silentLock = [];
            target.___silentLock.push(propertyKey);
        }
        else {
            if (!target.hasOwnProperty("___lock"))
                target.___lock = [];
            target.___lock.push(propertyKey);
        }
    };
}
exports.Lock = Lock;
function lock(obj, optsOrPropOrPropsOrThrowError, silent) {
    var props;
    if (typeof optsOrPropOrPropsOrThrowError === "undefined") {
        props = Object.getOwnPropertyNames(obj);
    }
    else if (typeof optsOrPropOrPropsOrThrowError === "boolean") {
        silent = optsOrPropOrPropsOrThrowError;
        props = Object.getOwnPropertyNames(obj);
    }
    else if (Array.isArray(optsOrPropOrPropsOrThrowError)) {
        props = optsOrPropOrPropsOrThrowError;
    }
    else if (typeof optsOrPropOrPropsOrThrowError === "object") {
        var opts = optsOrPropOrPropsOrThrowError;
        silent = opts.hasOwnProperty("silent") ? opts.silent : false;
        props = opts.hasOwnProperty("properties") ? opts.properties : Object.getOwnPropertyNames(obj);
    }
    else {
        props = [optsOrPropOrPropsOrThrowError];
    }
    if (typeof silent === "undefined") {
        silent = false;
    }
    if (silent) {
        applySilentLockToProps(obj, props);
    }
    else {
        applyThrowLockToProps(obj, props);
    }
}
exports.lock = lock;
function applyThrowLockToProps(obj, props) {
    for (var _i = 0, props_1 = props; _i < props_1.length; _i++) {
        var prop = props_1[_i];
        var value = obj[prop];
        Object.defineProperty(obj, prop, {
            value: value,
            configurable: false,
            writable: false,
            enumerable: true
        });
    }
}
function applySilentLockToProps(obj, props) {
    var _loop_1 = function (prop) {
        var value = obj[prop];
        Object.defineProperty(obj, prop, {
            get: function () { return value; },
            set: function () { }
        });
    };
    for (var _i = 0, props_2 = props; _i < props_2.length; _i++) {
        var prop = props_2[_i];
        _loop_1(prop);
    }
}
//# sourceMappingURL=index.js.map
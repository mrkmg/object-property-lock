"use strict";
exports.__esModule = true;
function lock(obj, propOrPropsOrThrowError, slient) {
    var props;
    if (typeof propOrPropsOrThrowError === "undefined") {
        props = Object.getOwnPropertyNames(obj);
    }
    else if (typeof propOrPropsOrThrowError === "boolean") {
        slient = propOrPropsOrThrowError;
        props = Object.getOwnPropertyNames(obj);
    }
    else if (!Array.isArray(propOrPropsOrThrowError)) {
        props = [propOrPropsOrThrowError];
    }
    else {
        props = propOrPropsOrThrowError;
    }
    if (typeof slient === "undefined") {
        slient = false;
    }
    if (slient) {
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
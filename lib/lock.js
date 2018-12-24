"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function lock(obj, optsOrPropOrPropsOrSilent, silent) {
    var props;
    if (typeof optsOrPropOrPropsOrSilent === "undefined") {
        props = Object.getOwnPropertyNames(obj);
    }
    else if (typeof optsOrPropOrPropsOrSilent === "boolean") {
        silent = optsOrPropOrPropsOrSilent;
        props = Object.getOwnPropertyNames(obj);
    }
    else if (Array.isArray(optsOrPropOrPropsOrSilent)) {
        props = optsOrPropOrPropsOrSilent;
    }
    else if (typeof optsOrPropOrPropsOrSilent === "object") {
        var opts = optsOrPropOrPropsOrSilent;
        silent = opts.hasOwnProperty("silent") ? opts.silent : false;
        props = opts.hasOwnProperty("properties") ? opts.properties : Object.getOwnPropertyNames(obj);
    }
    else {
        props = [optsOrPropOrPropsOrSilent];
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
            enumerable: true,
        });
    }
}
function applySilentLockToProps(obj, props) {
    var _loop_1 = function (prop) {
        var value = obj[prop];
        Object.defineProperty(obj, prop, {
            get: function () { return value; },
            set: function () { },
        });
    };
    for (var _i = 0, props_2 = props; _i < props_2.length; _i++) {
        var prop = props_2[_i];
        _loop_1(prop);
    }
}
//# sourceMappingURL=lock.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lock_1 = require("./lock");
var THROW_KEY = "___locked_throw";
var SILENT_KEY = "___locked_silent";
function getArrayFromTargetProp(prop, target) {
    return target.hasOwnProperty(prop) ? target[prop] : [];
}
function addRemArr(target, rem, add) {
    return target
        .splice(0)
        .filter(function (v) { return rem.indexOf(v) === -1; })
        .concat(add.filter(function (v) { return target.indexOf(v) === -1; }));
}
function Lockable(opts) {
    if (opts === void 0) { opts = {}; }
    return function (target) {
        return function () {
            target.call(this, arguments);
            var classDecoratorProps = opts.all ? Object.getOwnPropertyNames(this) : opts.properties ? opts.properties : [];
            var initSilentProps = opts.silent ? classDecoratorProps : [];
            var initThrowProps = !opts.silent ? classDecoratorProps : [];
            var silentPropDecoratorProps = getArrayFromTargetProp(SILENT_KEY, target.prototype);
            var throwPropDecoratorProps = getArrayFromTargetProp(THROW_KEY, target.prototype);
            var silentLocks = addRemArr(initSilentProps, throwPropDecoratorProps, silentPropDecoratorProps);
            var throwLocks = addRemArr(initThrowProps, silentPropDecoratorProps, throwPropDecoratorProps);
            if (silentLocks.length) {
                lock_1.lock(this, { silent: true, properties: silentLocks });
            }
            if (throwLocks.length) {
                lock_1.lock(this, { silent: false, properties: throwLocks });
            }
            return this;
        };
    };
}
exports.Lockable = Lockable;
function Locked(opts) {
    return function (target, propertyKey) {
        if (opts && opts.silent) {
            if (!target.hasOwnProperty(SILENT_KEY))
                target[SILENT_KEY] = [];
            target[SILENT_KEY].push(propertyKey);
        }
        else {
            if (!target.hasOwnProperty(THROW_KEY))
                target[THROW_KEY] = [];
            target[THROW_KEY].push(propertyKey);
        }
    };
}
exports.Locked = Locked;
//# sourceMappingURL=decorators.js.map
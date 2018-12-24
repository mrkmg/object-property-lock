"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lock_1 = require("./lock");
function Lockable(opts) {
    // @ts-ignore
    return function (target) {
        return function () {
            // Original Constructor
            target.call(this, arguments);
            if (opts && opts.all) {
                lock_1.lock(this, opts.silent);
            }
            else {
                if (target.prototype.hasOwnProperty("___locked_silent")) {
                    lock_1.lock(this, target.prototype.___locked_silent, true);
                }
                if (target.prototype.hasOwnProperty("___locked_throw")) {
                    lock_1.lock(this, target.prototype.___locked_throw, false);
                }
                if (opts && opts.properties) {
                    lock_1.lock(this, opts.properties, opts.silent);
                }
            }
            return this;
        };
    };
}
exports.Lockable = Lockable;
function Locked(opts) {
    return function (target, propertyKey) {
        if (opts && opts.silent) {
            if (!target.hasOwnProperty("___locked_silent"))
                target.___locked_silent = [];
            target.___locked_silent.push(propertyKey);
        }
        else {
            if (!target.hasOwnProperty("___locked_throw"))
                target.___locked_throw = [];
            target.___locked_throw.push(propertyKey);
        }
    };
}
exports.Locked = Locked;
//# sourceMappingURL=decorators.js.map
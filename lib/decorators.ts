/**
 * Kevin Gravier <kevin@mrkmg.com>
 *
 * MIT License 2018
 */
import {ILockableOptions, ILockedOptions} from "./opts";
import {lock} from "./lock";

export function Lockable<T extends any>(opts?: ILockableOptions<T>): ClassDecorator {
    // @ts-ignore
    return function(target: T) {
        return function() {
            // Original Constructor
            target.call(this, arguments);

            if (opts && opts.all) {
                lock(this, opts.silent);
            } else {
                if (target.prototype.hasOwnProperty("___locked_silent")) {
                    lock(this, (target.prototype as any).___locked_silent, true);
                }

                if (target.prototype.hasOwnProperty("___locked_throw")) {
                    lock(this, (target.prototype as any).___locked_throw, false);
                }

                if (opts && opts.properties) {
                    lock(this, opts.properties, opts.silent);
                }
            }

            return this;
        };
    };
}

export function Locked(opts?: ILockedOptions): PropertyDecorator {
    return (target: any, propertyKey: string | symbol) => {
        if (opts && opts.silent) {
            if (!target.hasOwnProperty("___locked_silent")) target.___locked_silent = [];
            target.___locked_silent.push(propertyKey);
        } else {
            if (!target.hasOwnProperty("___locked_throw")) target.___locked_throw = [];
            target.___locked_throw.push(propertyKey);
        }
    };
}
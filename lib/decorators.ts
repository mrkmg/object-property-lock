/**
 * Kevin Gravier <kevin@mrkmg.com>
 *
 * MIT License 2018
 */
import {ILockableOptions, ILockedOptions} from "./opts";
import {lock} from "./lock";

const THROW_KEY = "___locked_throw";
const SILENT_KEY = "___locked_silent";

function getArrayFromTargetProp(prop: string, target: any): string[] {
    return target.hasOwnProperty(prop) ? target[prop] : [];
}

function addRemArr<T>(target: T[], rem: T[], add: T[]): T[] {
    return target
        .splice(0)
        .filter(v => rem.indexOf(v) === -1)
        .concat(add.filter(v => target.indexOf(v) === -1));
}

export function Lockable<T extends any>(opts: ILockableOptions<T> = {}): ClassDecorator {
    // @ts-ignore
    return function(target: T) {
        return function() {
            // Original Constructor
            target.call(this, arguments);

            const classDecoratorProps = opts.all ? Object.getOwnPropertyNames(this) : opts.properties ? opts.properties : [];
            const initSilentProps = opts.silent ? classDecoratorProps : [];
            const initThrowProps = !opts.silent ? classDecoratorProps : [];
            const silentPropDecoratorProps = getArrayFromTargetProp(SILENT_KEY, target.prototype);
            const throwPropDecoratorProps = getArrayFromTargetProp(THROW_KEY, target.prototype);
            const silentLocks = addRemArr(initSilentProps, throwPropDecoratorProps, silentPropDecoratorProps);
            const throwLocks = addRemArr(initThrowProps, silentPropDecoratorProps, throwPropDecoratorProps);

            if (silentLocks.length) {
                lock(this, {silent: true, properties: silentLocks});
            }

            if (throwLocks.length) {
                lock(this, {silent: false, properties: throwLocks});
            }

            return this;
        };
    };
}

export function Locked(opts?: ILockedOptions): PropertyDecorator {
    return (target: any, propertyKey: string | symbol) => {
        if (opts && opts.silent) {
            if (!target.hasOwnProperty(SILENT_KEY)) target[SILENT_KEY] = [];
            target[SILENT_KEY].push(propertyKey);
        } else {
            if (!target.hasOwnProperty(THROW_KEY)) target[THROW_KEY] = [];
            target[THROW_KEY].push(propertyKey);
        }
    };
}
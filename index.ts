/**
 * Kevin Gravier <kevin@mrkmg.com>
 *
 * MIT License 2018
 */

export interface ILockableOptions<T> {
    all?: boolean;
    properties?: Array<keyof T>;
    silent?: boolean;
}

export interface ILockOptions {
    silent?: boolean;
}

export function Lockable<T extends Function>(opts?: ILockableOptions<T>): ClassDecorator {
    // @ts-ignore
    return function(target: T) {
        return function() {
            // Original Constructor
            target.call(this, arguments);

            if (opts && opts.all) {
                lock(this, opts.silent);
            } else {
                if (target.prototype.hasOwnProperty("___silentLock")) {
                    lock(this, (target.prototype as any).___silentLock, true);
                }

                if (target.prototype.hasOwnProperty("___lock")) {
                    lock(this, (target.prototype as any).___lock, false);
                }

                if (opts && opts.properties) {
                    lock(this, opts.properties, opts.silent);
                }
            }

            return this;
        };
    };
}

export function Lock(opts?: ILockOptions): PropertyDecorator {
    return (target: any, propertyKey: string | symbol) => {
        if (opts && opts.silent) {
            if (!target.hasOwnProperty("___silentLock")) target.___silentLock = [];
            target.___silentLock.push(propertyKey);
        } else {
            if (!target.hasOwnProperty("___lock")) target.___lock = [];
            target.___lock.push(propertyKey);
        }
    };
}


export interface ILockFuncOptions<T> {
    properties?: Array<keyof T>;
    silent?: boolean;
}

export function lock<T>(obj: T, opts?: ILockableOptions<T>): void;
export function lock<T>(obj: T, silent?: boolean): void;
export function lock<T, K extends keyof T>(obj: T, prop?: K, silent?: boolean): void;
export function lock<T, K extends keyof T>(obj: T, props?: K[], silent?: boolean): void;
export function lock<T, K extends keyof T>(obj: T, optsOrPropOrPropsOrThrowError?: ILockFuncOptions<T> | K | K[] | boolean, silent?: boolean): void {
    let props: K[];

    if (typeof optsOrPropOrPropsOrThrowError === "undefined") {
        props = (Object.getOwnPropertyNames(obj) as K[]);
    }
    else if (typeof optsOrPropOrPropsOrThrowError === "boolean") {
        silent = optsOrPropOrPropsOrThrowError;
        props = (Object.getOwnPropertyNames(obj) as K[]);
    }
    else if (Array.isArray(optsOrPropOrPropsOrThrowError)) {
        props = optsOrPropOrPropsOrThrowError;
    }
    else if (typeof optsOrPropOrPropsOrThrowError === "object") {
        const opts = optsOrPropOrPropsOrThrowError as ILockableOptions<T>;
        silent = opts.hasOwnProperty("silent") ? opts.silent : false;
        props = opts.hasOwnProperty("properties") ? opts.properties as K[] : (Object.getOwnPropertyNames(obj) as K[]);
    }
    else {
        props = [optsOrPropOrPropsOrThrowError];
    }

    if (typeof silent === "undefined") {
        silent = false;
    }

    if (silent) {
        applySilentLockToProps(obj, props);
    } else {
        applyThrowLockToProps(obj, props);
    }
}

function applyThrowLockToProps<T, K extends keyof T>(obj: T, props: K[]) {
    for (const prop of props) {
        const value = obj[prop];
        Object.defineProperty(obj, prop, {
            value,
            configurable: false,
            writable: false,
            enumerable: true,
        });
    }
}

function applySilentLockToProps<T, K extends keyof T>(obj: T, props: K[]) {
    for (const prop of props) {
        const value = obj[prop];
        Object.defineProperty(obj, prop, {
            get: () => value,
            set: () => {},
        });
    }
}
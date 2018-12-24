/**
 * Kevin Gravier <kevin@mrkmg.com>
 *
 * MIT License 2018
 */
import {ILockFuncOptions} from "./opts";

export function lock<T>(obj: T, opts?: ILockFuncOptions<T>): void;
export function lock<T>(obj: T, silent?: boolean): void;
export function lock<T, K extends keyof T>(obj: T, prop?: K, silent?: boolean): void;
export function lock<T, K extends keyof T>(obj: T, props?: K[], silent?: boolean): void;
export function lock<T, K extends keyof T>(obj: T, optsOrPropOrPropsOrSilent?: ILockFuncOptions<T> | K | K[] | boolean, silent?: boolean): void {
    let props: K[];

    if (typeof optsOrPropOrPropsOrSilent === "undefined") {
        props = (Object.getOwnPropertyNames(obj) as K[]);
    }
    else if (typeof optsOrPropOrPropsOrSilent === "boolean") {
        silent = optsOrPropOrPropsOrSilent;
        props = (Object.getOwnPropertyNames(obj) as K[]);
    }
    else if (Array.isArray(optsOrPropOrPropsOrSilent)) {
        props = optsOrPropOrPropsOrSilent;
    }
    else if (typeof optsOrPropOrPropsOrSilent === "object") {
        const opts = optsOrPropOrPropsOrSilent as ILockFuncOptions<T>;
        silent = opts.hasOwnProperty("silent") ? opts.silent : false;
        props = opts.hasOwnProperty("properties") ? opts.properties as K[] : (Object.getOwnPropertyNames(obj) as K[]);
    }
    else {
        props = [optsOrPropOrPropsOrSilent];
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
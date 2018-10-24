/**
 * Kevin Gravier <kevin@mrkmg.com>
 *
 * MIT License 2018
 */

export function lock<T>(obj: T, slient?: boolean): void;
export function lock<T, K extends keyof T>(obj: T, prop?: K, slient?: boolean): void;
export function lock<T, K extends keyof T>(obj: T, props?: K[], slient?: boolean): void;
export function lock<T, K extends keyof T>(obj: T, propOrPropsOrThrowError?: K | K[] | boolean, slient?: boolean): void {
    let props: K[];

    if (typeof propOrPropsOrThrowError === "undefined") {
        props = (Object.getOwnPropertyNames(obj) as K[]);
    }
    else if (typeof propOrPropsOrThrowError === "boolean") {
        slient = propOrPropsOrThrowError;
        props = (Object.getOwnPropertyNames(obj) as K[]);
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
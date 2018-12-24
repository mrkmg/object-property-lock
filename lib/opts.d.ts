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
export interface ILockedOptions {
    silent?: boolean;
}
export interface ILockFuncOptions<T> {
    all?: boolean;
    properties?: Array<keyof T>;
    silent?: boolean;
}

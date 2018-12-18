export interface ILockableOptions<T> {
    all?: boolean;
    properties?: Array<keyof T>;
    silent?: boolean;
}
export interface ILockOptions {
    silent?: boolean;
}
export declare function Lockable<T extends Function>(opts?: ILockableOptions<T>): ClassDecorator;
export declare function Lock(opts?: ILockOptions): PropertyDecorator;
export interface ILockFuncOptions<T> {
    properties?: Array<keyof T>;
    silent?: boolean;
}
export declare function lock<T>(obj: T, opts?: ILockableOptions<T>): void;
export declare function lock<T>(obj: T, silent?: boolean): void;
export declare function lock<T, K extends keyof T>(obj: T, prop?: K, silent?: boolean): void;
export declare function lock<T, K extends keyof T>(obj: T, props?: K[], silent?: boolean): void;

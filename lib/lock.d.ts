import { ILockFuncOptions } from "./opts";
export declare function lock<T>(obj: T, opts?: ILockFuncOptions<T>): void;
export declare function lock<T>(obj: T, silent?: boolean): void;
export declare function lock<T, K extends keyof T>(obj: T, prop?: K, silent?: boolean): void;
export declare function lock<T, K extends keyof T>(obj: T, props?: K[], silent?: boolean): void;

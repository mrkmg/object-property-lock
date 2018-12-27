import { ILockableOptions, ILockedOptions } from "./opts";
export declare function Lockable<T extends any>(opts?: ILockableOptions<T>): ClassDecorator;
export declare function Locked(opts?: ILockedOptions): PropertyDecorator;

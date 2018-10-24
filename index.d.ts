export declare function lock<T>(obj: T, slient?: boolean): void;
export declare function lock<T, K extends keyof T>(obj: T, prop?: K, slient?: boolean): void;
export declare function lock<T, K extends keyof T>(obj: T, props?: K[], slient?: boolean): void;

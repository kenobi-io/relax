export type Identity<T> = (model: T) => T;

export interface OveIdentity<T> extends Identity<T> {
    (model: T, ...overrides: Array<Identity<T>>): T;
}

export type IdentityOverrides<T> = Array<Identity<T>>;

export const lapi = <T>(...fns: Array<Identity<T>>): Identity<T> => lapiFromArray(fns);

/** @internal */
const lapiFromArray = <T>(fns: Array<Identity<T>>): Identity<T> => {
    if (fns.length === 0) {
        return identityLapi;
    }

    if (fns.length === 1) {
        return (input: T): T => fns[0](input);
    }

    return (input: T): T => fns.reduce((prev: T, fn: Identity<T>) => fn(prev), input);
};

export const identityLapi = <T>(x: T): T => x;

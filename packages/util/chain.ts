import { Chainable } from '../chainable/chainable';

export type UnaryChain<T> = (this: Chainable<T>) => Chainable<T>;

export type Chaining<T> = (source: T) => Chainable<T>;
export type ChainOverrides<T> = Array<UnaryChain<T>>;

export const chain = <T>(...fns: Array<UnaryChain<T>>): Chaining<T> => fromArrayChain(fns);

/** @internal */
const fromArrayChain = <T>(fns: Array<UnaryChain<T>>): Chaining<T> => {
    if (fns.length === 0) {
        return identityChain;
    }

    if (fns.length === 1) {
        return (input: T): Chainable<T> => {
            const ch = new Chainable(input);
            return fns[0].call(ch);
        };
    }

    return (input: T): Chainable<T> => {
        const ch = new Chainable(input);
        return fns.reduce((prev: Chainable<T>, fn: UnaryChain<T>) => fn.call(prev), ch);
    };
};

export const identityChain = <T>(x: T): Chainable<T> => new Chainable(x);

import { Valuable } from './valuable';

/**
 * @internal
 */
export class Chainable<T> implements Valuable<T> {
    constructor(private source: T) {}
    value(): T {
        const { source } = this;
        // TODO: add hasError logic;
        // if (hasError) {
        //   throw thrownError;
        // }
        // this._throwIfClosed();
        return source;
    }
}

export type Identity<T> = (model: T) => T;
export const identityLapi = <T>(x: T): T => x;

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

/**
 * Pipeable utility for help DCI-ed call roles \
 * for passing additional parameters for roles  \
 * need to wrap the role-method in (data: T) => role(data, params)
 *
 * @param fns
 * @returns Identity<T>
 * @example // use additional params in role-methods
 * lapi(
                otherRoles,
                (use: Use) =>
                    request<Use, Result>(
                        use,
                        map((res) => res),
                        filter((res) => res.name == '')
                        )
                    )(use);
 */
export const lapi = <T>(...fns: Array<Identity<T>>): Identity<T> => lapiFromArray(fns);

export type IdentityThis<T> = (this: T) => T;
export type Result<T> = (model: T) => T;

export function identityLapiThis<T>(this: T): T {
    return this;
}

/** @internal */
export const lapiFromArrayThis = <T>(fns: Array<IdentityThis<T>>): Result<T> => {
    if (fns.length === 0) {
        return identityLapiThis;
    }

    if (fns.length === 1) {
        return (input: T): T => fns[0].call(input);
    }

    return (input: T): T => fns.reduce((prev: T, fn: IdentityThis<T>) => fn.call(prev), input);
};

/**
 * Pipeable utility for help DCI-ed call roles \
 * for passing additional parameters for roles  \
 * need to wrap the role-method in function(this: T) => role.call(this, params)
 *
 * @param fns 
 * @returns Identity<T>
 * @example // use additional params in role-methods 
 * lapi(
                otherRoles, 
                function(this: Use) =>
                    request.call<Use, Result>(
                        this,
                        map((res) => res),
                        filter((res) => res.name == '')
                        )
                    )({...});
 */
export const lapiThis = <T>(...fns: Array<IdentityThis<T>>): Result<T> => lapiFromArrayThis(fns);

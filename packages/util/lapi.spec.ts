import { lapi } from './lapi';

describe('lapi', () => {
    it('should exist', () => {
        expect(typeof lapi).toBe('function');
    });

    it('should lapi two functions together', () => {
        const a = (x: number) => x + x;
        const b = (x: number) => x - 1;

        const c = lapi(a, b);

        expect(typeof c).toBe('function');
        expect(c(1)).toEqual(1);
        expect(c(10)).toEqual(19);
    });

    it('should return the same function if only one is passed', () => {
        const a = {};
        const c = lapi(<T>(x: T) => x)(a);

        expect(c).toMatchObject(a);
    });

    it('should return the identity if not passed any functions', () => {
        const c = lapi();

        expect(c('whatever')).toEqual('whatever');
        const someObj = {};
        expect(c(someObj)).toEqual(someObj);
    });
});

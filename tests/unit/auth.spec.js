import {check, currentAuth} from '../../src/utils/auth';

describe("auth test", () =>{

    it('empty auth', () => {
        currentAuth.splice(0, currentAuth.length);
        expect(check(['user'])).toEqual(false);
        expect(check(["admin"])).toEqual(false);
    });

    it('user auth', () => {
        currentAuth.splice(0, currentAuth.length);
        currentAuth.push('user');
        expect(check(['user'])).toEqual(true);
        expect(check(["admin"])).toEqual(false);
    });

    it('admin auth', () => {
        // currentAuth.splice(0, currentAuth.length);
        currentAuth.push('admin');
        expect(check(['user'])).toEqual(true);
        expect(check(["admin"])).toEqual(true);
        expect(check(["admin","user"])).toEqual(true);
    });
});
import { encryptPassword } from '../../src/utils/encryptPassword';

it('should be able to encrypt the password', () => {
    const password = '123_123_123';
    const hashPassword = encryptPassword(password);

    expect(hashPassword).not.toEqual(password);
    expect(hashPassword.length).toBeGreaterThan(password.length);
    expect(typeof hashPassword).toBe('string');
});

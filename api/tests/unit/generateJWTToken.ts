import { generateToken } from '../../src/utils/generateJWTToken';

it('should be able to generate a JWT Token', () => {
    const userId = Math.round(Math.random() * 100000);

    const token = generateToken(userId);

    expect(token).not.toEqual(userId);
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(userId);
});

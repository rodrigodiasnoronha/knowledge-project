import bcrypt from 'bcryptjs';

export default function (password: string, passwordHash: string): boolean {
    return bcrypt.compareSync(password, passwordHash);
}

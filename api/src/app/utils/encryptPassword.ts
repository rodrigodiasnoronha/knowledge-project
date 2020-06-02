import bcrypt from 'bcryptjs';

export default function (password: string) {
    return bcrypt.hashSync(password, 8);
}

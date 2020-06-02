import jwt from 'jsonwebtoken';

export default function (userId: number): string {
    const secret = process.env.JWT_SECRET_APP || '';

    const token = jwt.sign({ id: userId }, secret, {
        expiresIn: '10d',
    });

    return token;
}

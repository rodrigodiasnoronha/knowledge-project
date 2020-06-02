import { Response, Request } from 'express';
import prisma from '../../services/prisma';
import { comparePasswords, generateJsonWebToken } from '../utils';

class AuthController {
    static store = async (request: Request, response: Response) => {
        const { email = '', password = '' } = request.body;

        const user = await prisma.user.findOne({ where: { email } });

        if (!user) {
            return response.status(404).json({
                code: 'error/user-not-found',
                message: 'User not found',
            });
        }

        const isCorrectPassword = comparePasswords(password, user.password);

        if (!isCorrectPassword) {
            return response.status(400).json({
                code: 'error/wrong-password',
                message: 'Wrong password ',
            });
        }

        const token = generateJsonWebToken(user.id);

        return response.json({ user, token });
    };
}

export default AuthController;

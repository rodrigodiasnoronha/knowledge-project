import { getRepository } from 'typeorm';
import { User } from '../database/entities/User';
import { AppError } from '../errors/AppError';
import { compareSync } from 'bcryptjs';
import { generateToken } from '../utils/generateJWTToken';

interface Data {
    email: string;
    password: string;
}

export class LoginService {
    async execute({ email, password }: Data) {
        const userRepository = getRepository(User);
        const user = await userRepository.findOne({ where: { email } });

        if (!user) {
            throw new AppError('User not found', 'error/not-found', 404);
        }

        const isCorrectPassword = compareSync(password, user.password);

        if (!isCorrectPassword) {
            throw new AppError(
                'Incorrect password',
                'error/wrong-password',
                400
            );
        }

        const token = generateToken(user.id);

        delete user.password;

        return { token, user };
    }
}

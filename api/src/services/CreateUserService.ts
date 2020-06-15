import { getRepository } from 'typeorm';
import { User } from '../database/entities/User';
import { AppError } from '../errors/AppError';
import { encryptPassword } from '../utils/encryptPassword';

interface Data {
    name: string;
    email: string;
    password: string;
    admin?: boolean;
}

export class CreateUserService {
    async execute({ admin = false, email, name, password }: Data) {
        const userRepository = getRepository(User);

        const isEmailInUse = await userRepository.findOne({ where: { email } });

        if (isEmailInUse) {
            throw new AppError(
                'Email already in use',
                'error/email-in-use',
                400
            );
        }

        const hashPassword = encryptPassword(password);
        const user = userRepository.create({
            admin,
            email,
            name,
            password: hashPassword,
        });
        await userRepository.save(user);

        return user;
    }
}

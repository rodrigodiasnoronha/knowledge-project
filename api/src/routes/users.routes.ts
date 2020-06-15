import { Router } from 'express';
import { CreateUserService } from '../services/CreateUserService';
import { AppError } from '../errors/AppError';
import { createUserValidator } from '../validators';
import { getRepository } from 'typeorm';
import { User } from '../database/entities/User';

const routes = Router();

routes.post('/', createUserValidator, async (request, response) => {
    try {
        const createUserService = new CreateUserService();
        const user = await createUserService.execute(request.body);

        return response.status(201).json(user);
    } catch (err) {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json(err);
        }

        console.log(err);
        return response.status(500).json({ message: 'internal server error' });
    }
});

routes.get('/', async (request, response) => {
    try {
        const page = Number(request.query.page || 1);
        const limit = Number(request.query.limit || 1);
        const offset = page * limit - limit;

        const userRepository = getRepository(User);

        const [data, total] = await userRepository.findAndCount({
            take: limit,
            skip: offset,
        });

        return response.json({ data, total, offset, page, limit });
    } catch (err) {
        console.log(err);
        return response.status(500).json({ message: 'internal server error' });
    }
});

export default routes;

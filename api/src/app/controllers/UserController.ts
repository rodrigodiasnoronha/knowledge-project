import { Request, Response } from 'express';
import prisma from '../../services/prisma';
import { generateJsonWebToken, encryptPassword } from '../utils';

class UserController {
    static store = async (request: Request, response: Response) => {
        const data = request.body;

        try {
            const userExists = await prisma.user.findOne({
                where: { email: data.email },
            });

            if (userExists) {
                return response.status(400).json({
                    code: 'error/email-already-registered',
                    message: 'This email is already in use',
                });
            }

            const user = await prisma.user.create({
                data: {
                    ...data,
                    password: encryptPassword(data.password),
                },
            });

            const token = generateJsonWebToken(user.id);

            return response.status(401).json({ user, token });
        } catch (error) {
            return response.status(500).json({
                code: 'error/server',
                message: 'There was an error while creating user',
                error,
            });
        }
    };

    static index = async (request: Request, response: Response) => {
        const { page = 1, limit = 25 } = request.query;
        const offset = Number(page) * Number(limit) - Number(limit);

        const users = await prisma.user.findMany({
            take: Number(limit),
            skip: Number(offset),
        });

        const total = await prisma.user.count();

        return response.json({ data: users, total, page, limit });
    };

    static show = async (request: Request, response: Response) => {};

    static destroy = async (request: Request, response: Response) => {};

    static update = async (request: Request, response: Response) => {};
}

export default UserController;

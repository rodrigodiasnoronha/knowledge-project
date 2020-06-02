import 'dotenv/config';
import express, { json, urlencoded } from 'express';
import routes from './routes';
import { errors } from 'celebrate';
import prisma from './services/prisma';

class Api {
    public server = express();

    constructor() {
        this.database();
        this.middlewares();
        this.routes();
    }

    middlewares(): void {
        this.server.use(json());
        this.server.use(urlencoded({ extended: true }));
    }

    routes(): void {
        this.server.use(routes);
        this.server.use(errors());
    }

    async database(): Promise<void> {
        await prisma.connect();
    }
}

export default Api;

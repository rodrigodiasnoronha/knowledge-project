import 'dotenv/config';
import express from 'express';
import routes from './routes';
import cors from 'cors';
import databaseOptions from '../ormconfig.json';
import { createConnection, ConnectionOptions } from 'typeorm';

export class App {
    public server = express();

    constructor() {
        this.database();
        this.middlewares();
        this.routes();
    }

    public middlewares() {
        this.server.use(cors());
        this.server.use(express.json());
    }

    public routes() {
        this.server.use(routes);
    }

    public async database() {
        try {
            // const dbConfig =
            //     process.env.NODE_ENV === 'production'
            //         ? databaseOptions[0]
            //         : databaseOptions[1];

            const dbconfig = databaseOptions[0];
            await createConnection(dbconfig as ConnectionOptions);
        } catch (err) {
            console.log(err);
        }
    }
}

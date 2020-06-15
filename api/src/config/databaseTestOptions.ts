import { ConnectionOptions } from 'typeorm';

export const databaseTestOptions: ConnectionOptions = {
    type: 'sqlite',
    name: 'database_tests',
    database: 'src/database/database.sqlite',
    synchronize: true,
    logging: false,
    entities: ['src/database/entities/**/*.ts'],
    migrations: ['src/database/migrations/**/*.ts'],
    subscribers: ['src/database/subscribers/**/*.ts'],
    cli: {
        entitiesDir: 'src/database/entities',
        migrationsDir: 'src/database/migrations',
        subscribersDir: 'src/database/subscribers',
    },
};

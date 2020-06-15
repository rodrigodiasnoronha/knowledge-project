import request from 'supertest';
import { App } from '../../src/app';
import faker from 'faker';
import { createConnection, getConnection } from 'typeorm';
import { databaseTestOptions } from '../../src/config/databaseTestOptions';

const { server } = new App();

// cria conexão com o db
beforeAll(async () => {
    await createConnection(databaseTestOptions);
});

// fecha conexão com o db
afterAll(async () => {
    const connection = await getConnection('database_tests');
    await connection.close();
});

// apaga dados dos testes no db
afterEach(async () => {
    const connection = await getConnection('database_tests');
    await connection.query(`DELETE FROM users`);
});

// testes
describe('auth integration tests', () => {
    it('should be able to login an user', async () => {
        const userData = {
            name: faker.name.findName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            admin: true,
        };

        await request(server).post('/users').send(userData);

        const loginResponse = await request(server).post('/auth/login').send({
            email: userData.email,
            password: userData.password,
        });

        expect(loginResponse.status).toEqual(200);
        expect(loginResponse.body).toHaveProperty('token');
        expect(loginResponse.body).toHaveProperty('user');
        expect(loginResponse.body.user.name).toEqual(userData.name);
    });
});

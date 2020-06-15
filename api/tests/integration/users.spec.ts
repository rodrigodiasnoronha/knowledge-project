import request from 'supertest';
import { App } from '../../src/app';
import { createConnection, getConnection } from 'typeorm';
import { databaseTestOptions } from '../../src/config/databaseTestOptions';
import * as faker from 'faker';

// obs: a api precisa ser chamada como global aqui, ou seja, não coloque ela dentro do describe ou do it (dos testes e tal)
const { server } = new App();

// cria um conexão com o db
beforeAll(async function () {
    await createConnection(databaseTestOptions);
});

// encerra a conexão com o db depois dos testes
afterAll(async () => {
    const connection = getConnection('database_tests');
    await connection.close();
});

// Deleta tudo da tabela usuários após cada teste
afterEach(async () => {
    const connection = getConnection('database_tests');
    await connection.query(`DELETE FROM users`);
});

// testes
describe('Users integration tests', () => {
    it('should be able to return all users', async () => {
        const response = await request(server).get('/users');

        expect(response.status).toEqual(200);
    });

    it('should be able to create an user', async () => {
        const data = {
            name: faker.name.findName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            admin: true,
        };

        const response = await request(server).post('/users').send(data);

        expect(response.status).toEqual(201);
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('email');
    });
});

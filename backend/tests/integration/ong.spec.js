const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    //Antes de criar os testes com bd é obrigatório criar a migration
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to create a new ONG', async() => {
        const response = await request(app)
        .post('/ongs')
        .send({
            nome: "Making Developers",
            email: "ong.makingdevelopers@gmail.com",
            whatsapp: "11 922674532",
            city: "Santo André",
            uf: "SP"
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});
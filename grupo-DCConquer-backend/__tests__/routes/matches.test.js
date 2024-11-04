const supertest = require('supertest');
const app = require('../../src/app');

const request = supertest(app.callback());

beforeAll(async () => {
  await app.context.orm.sequelize.authenticate();
});

afterAll(async () => {
  await app.context.orm.sequelize.close();
});

describe('Matches routes', () => {
  describe('POST /matches/:id', () => {
    const postMatch = async (matchId, body, cookie, token) => request
      .post(`/matches/${matchId}`)
      .send(body)
      .set('Cookie', cookie)
      .set('Authorization', `bearer ${token}`);
    let cookie;
    let token;

    beforeAll(async () => {
      const loginResponse = await request.post('/auth/login').send({
        email: 'user1@uc.cl',
        password: 'A12345678@',
      });
      cookie = loginResponse.headers['set-cookie'];
      token = loginResponse.body.token;
    });

    describe('Valid creation', () => {
      const body = 'hola';
      it('should return a 201 response', async () => {
        const response = await postMatch(1, body, cookie, token);
        expect(response.status).toBe(201);
      });
    });
  });
});

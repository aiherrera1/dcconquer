const supertest = require('supertest');
const app = require('../../src/app');

const request = supertest(app.callback());

beforeAll(async () => {
  await app.context.orm.sequelize.authenticate();
});

afterAll(async () => {
  await app.context.orm.sequelize.close();
});

describe('PlayersMatch routes', () => {
  describe('POST /playersmatch/:id', () => {
    const postPlayersMatch = async (playerId, body, cookie, token) => request
      .post(`/playersmatch/${playerId}`)
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

    describe('Valid request acceptance', () => {
      const body = {
        match_id: 1,
        player_id: 3,
      };
      it('should return a 201 response', async () => {
        const response = await postPlayersMatch(1, body, cookie, token);
        expect(response.status).toBe(201);
      });
    });
  });
});

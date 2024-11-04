const supertest = require('supertest');
const app = require('../../src/app');

const request = supertest(app.callback());

beforeAll(async () => {
  await app.context.orm.sequelize.authenticate();
});

afterAll(async () => {
  await app.context.orm.sequelize.close();
});

describe('Games routes', () => {
  describe('POST /games', () => {
    const postGame = async (body, cookie, token) => request
      .post('/games')
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
      const body = {
        host_id: 1,
        name: 'Game4',
        min_players: 2,
        max_players: 6,
        starting_cards: 3,
        active: false,
        winner_id: -1,
      };
      it('should return a 201 response', async () => {
        const response = await postGame(body, cookie, token);
        expect(response.status).toBe(201);
      });
    });
    describe('Invalid creation', () => {
      const body = {
        host_id: 1,
        name: 'Game5',
        starting_cards: 3,
        active: false,
        winner_id: -1,
      };
      it('should not create a game', async () => {
        await postGame(body, cookie, token);
        expect(await app.context.orm.Game.count()).toBe(4);
      });
    });
  });

  describe('GET /games', () => {
    const getGames = async (cookie, token) => request
      .get('/games')
      .set('Cookie', cookie)
      .set('Authorization', `bearer ${token}`);
    let response;
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

    describe('Get games correctly', () => {
      it('should return a 201 response', async () => {
        response = await getGames(cookie, token);
        expect(response.status).toBe(201);
      });
    });
  });
});

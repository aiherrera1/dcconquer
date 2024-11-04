const supertest = require('supertest');
const app = require('../../src/app');

const request = supertest(app.callback());

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

beforeAll(async () => {
  await delay(4000);
  await app.context.orm.sequelize.authenticate();
});

afterAll(async () => {
  await app.context.orm.sequelize.close();
});

describe('Turns routes', () => {
  describe('POST /turn/:id', () => {
    const postTurn = async (matchId, body, cookie, token) => request
      .post(`/turn/${matchId}`)
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

    describe('Pick a card correctly', () => {
      const body = {
        warriors: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        owners: [
          0, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
          -1,
        ],
        card: 1,
        threw_first: false,
        threw_second: false,
        used_dice: false,
        dices: ['default', 'default', 'default', 'default', 'default'],
        // from: ,
        // to: ,
        // from_warriors: ,
        attacked: false,
      };
      it('should return a 201 response', async () => {
        const response = await postTurn(1, body, cookie, token);
        expect(response.status).toBe(201);
      });
    });

    describe('Throw first dice correctly', () => {
      const body = {
        warriors: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        owners: [
          0, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
          -1,
        ],
        card: 0,
        threw_first: true,
        threw_second: false,
        used_dice: false,
        dices: ['dice4', 'dice2', 'dice2', 'dice6', 'dice2'],
        // from: ,
        // to: ,
        // from_warriors: ,
        attacked: false,
      };
      it('should return a 201 response', async () => {
        const response = await postTurn(1, body, cookie, token);
        expect(response.status).toBe(201);
      });
    });

    describe('Attack other territory correctly', () => {
      const body = {
        warriors: [50, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        owners: [
          0, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1,
          -1,
        ],
        card: 0,
        threw_first: true,
        threw_second: true,
        used_dice: true,
        dices: ['dice4', 'dice2', 'dice2', 'dice6', 'dice2'],
        from: 1,
        to: 13,
        from_warriors: 20,
        attacked: false,
      };
      it('should return a 201 response', async () => {
        const response = await postTurn(1, body, cookie, token);
        expect(response.status).toBe(201);
      });
    });

    describe('Send warriors correctly', () => {
      const body = {
        warriors: [30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0],
        owners: [
          0, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1,
          -1,
        ],
        card: 0,
        threw_first: true,
        threw_second: true,
        used_dice: true,
        dices: ['dice4', 'dice2', 'dice2', 'dice6', 'dice2'],
        attacked: true,
      };
      it('should return a 201 response', async () => {
        const response = await postTurn(1, body, cookie, token);
        expect(response.status).toBe(201);
      });
    });
  });

  describe('PUT /matches/:id', () => {
    const postTurn = async (matchId, body, cookie, token) => request
      .post(`/turn/${matchId}`)
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

    describe('End turn correctly', () => {
      const body = {
        match_id: 1,
        player_id: 1,
        warriors: [30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0],
        owners: [
          0, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1,
          -1,
        ],
        dices: ['dice4', 'dice2', 'dice2', 'dice6', 'dice2'],
        diceCards: 1,
        wallCards: 1,
        shipCards: 1,
        score: 50,
      };
      it('should return a 201 response', async () => {
        const response = await postTurn(1, body, cookie, token);
        expect(response.status).toBe(201);
      });
    });
  });
});

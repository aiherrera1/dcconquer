const supertest = require('supertest');
const app = require('../../src/app');

const request = supertest(app.callback());

beforeAll(async () => {
  await app.context.orm.sequelize.authenticate();
});

afterAll(async () => {
  await app.context.orm.sequelize.close();
});

describe('Requests routes', () => {
  describe('POST /requests', () => {
    const postRequest = async (body, cookie, token) => request
      .post('/requests')
      .send(body)
      .set('Cookie', cookie)
      .set('Authorization', `bearer ${token}`);
    let cookie;
    let token;

    beforeAll(async () => {
      const loginResponse = await request.post('/auth/login').send({
        email: 'user3@uc.cl',
        password: 'C12345678@',
      });
      cookie = loginResponse.headers['set-cookie'];
      token = loginResponse.body.token;
    });

    describe('Valid request', () => {
      const body = {
        match_id: 1,
      };
      it('should return a 201 response', async () => {
        const response = await postRequest(body, cookie, token);
        expect(response.status).toBe(201);
      });
    });
  });

  describe('GET /requests/:id', () => {
    const getRequests = async (matchId, cookie, token) => request
      .get(`/requests/${matchId}`)
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

    describe('Get requests correctly', () => {
      it('should return the correct way', async () => {
        response = await getRequests(1, cookie, token);
        console.log(response.status);
        expect(response.body).toEqual({
          player: expect.any(Object),
          match: expect.any(Object),
          requests: expect.any(Object),
        });
      });

      describe('Get the request for an invalid matchID', () => {
        it('should return a 404 response if the match does not exists', async () => {
          response = await getRequests(-1, cookie, token);
          expect(response.status).toBe(404);
        });
      });
    });
  });
});

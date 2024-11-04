const supertest = require('supertest');
const app = require('../../src/app');

const request = supertest(app.callback());

beforeAll(async () => {
  await app.context.orm.sequelize.authenticate();
});

afterAll(async () => {
  await app.context.orm.sequelize.close();
});

describe('Auth routes', () => {
  describe('POST auth/login', () => {
    const postSignup = async (body) => request
      .post('/auth/login')
      .send(body);

    describe('Valid login', () => {
      const body = {
        email: 'user1@uc.cl',
        password: 'A12345678@',
      };
      it('should return a 201 response', async () => {
        const response = await postSignup(body);
        expect(response.status).toBe(201);
      });
    });

    describe('Wrong credentials', () => {
      const body = {
        email: 'user1@uc.cl',
        password: 'aiherrera1',
      };

      it('should not let you login', async () => {
        const response = await postSignup(body);
        expect(response.status).toBe(401);
      });
    });

    describe('Wrong credentials', () => {
      const body = {
        email: 'user53@uc.cl',
        password: 'aloooooo',
      };

      it('', async () => {
        const response = await postSignup(body);
        expect(response.status).toBe(404);
      });
    });
  });
});

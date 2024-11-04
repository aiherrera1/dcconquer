const supertest = require('supertest');
const app = require('../../src/app');

const request = supertest(app.callback());

// async function getPlayers() {
//   const originalCount = await app.context.orm.Player.count();
//   return originalCount;
// };

beforeAll(async () => {
  await app.context.orm.sequelize.authenticate();
});

afterAll(async () => {
  await app.context.orm.sequelize.close();
});

describe('Auth routes', () => {
  describe('POST auth/signup', () => {
    const postSignup = async (body) => request.post('/auth/signup').send(body);

    describe('Valid signup', () => {
      const body = {
        username: 'aiherrera1',
        email: 'iic2513@uc.cl',
        password: 'A12345678.',
        avatar: 'vikings.png',
      };
      it('should return a 201 response', async () => {
        const response = await postSignup(body);
        expect(response.status).toBe(201);
      });

      it('should create a player', async () => {
        // const originalCount = await app.context.orm.Player.count();
        // await postSignup(body);
        expect(await app.context.orm.Player.count()).toBe(4);
      });
    });

    describe('Invalid Signup', () => {
      const body = {
        email: 'iic2513@uc.cl',
        username: 'aiherrera1',
      };

      it('should not create a player', async () => {
        const originalCount = await app.context.orm.Player.count();
        await postSignup(body);
        expect(await app.context.orm.Player.count()).toBe(originalCount);
      });
    });
  });
});

const Router = require('koa-router');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const JWT = require('jsonwebtoken');

const router = new Router();
const saltRounds = 5;

router.post('registration.create', '/signup', async (ctx) => {
  try {
    // todo check if user already exists
    // todo Validacion 2do nivel (Backend)
    // todo Validacion 3er nivel (BDD)
    const player = await ctx.orm.Player.findOne({
      where: {
        [Op.or]: [
          { email: ctx.request.body.email },
          { username: ctx.request.body.username },
        ],
      },
    });
    if (!player) {
      const hash = await bcrypt.hash(ctx.request.body.password, saltRounds);
      const registration = await ctx.orm.Player.create({
        username: ctx.request.body.username,
        email: ctx.request.body.email,
        password: hash,
        avatar: ctx.request.body.avatar,
      });
      ctx.status = 201;
      ctx.body = {
        message: `User '${registration.username}' succesfully created`,
      };
    } else {
      // Forbbiden: The request contained valid data and was understood by
      // the server, but the server is refusing action.
      ctx.status = 403;
      ctx.body = {
        message: 'Email or username already exists',
      };
    } // idea
  } catch (error) {
    ctx.throw(error);
  }
});

router.post('/login', async (ctx) => {
  try {
    const player = await ctx.orm.Player.findOne({
      where: { email: ctx.request.body.email },
      include: [{ model: ctx.orm.Admin, as: 'admin' }],
    });
    if (player) {
      if (await bcrypt.compare(ctx.request.body.password, player.password)) {
        // The await is important, because if it does not exist,
        // the user trying to login gets access anyway
        const newSession = await ctx.orm.Session.create({
          userid: player.id,
        });
        const payload = {
          // admin: player.admin.id,
          player,
        };
        const token = JWT.sign(payload, process.env.JWT_SECRET);
        ctx.session.sessionid = newSession.id; // It creates a cookie in koa-session
        ctx.status = 201;
        ctx.response.body = { token };
      } else {
        ctx.status = 401;
        ctx.body = {
          message: 'The Email or Password entered is incorrect',
        };
      }
    } else {
      ctx.status = 404;
      // Is better to not exposed a user with or without an account
      ctx.body = {
        message: 'The Email or Password entered is incorrect',
      };
    }
  } catch (error) {
    ctx.throw(error);
  }
});

router.post('/logout', async (ctx) => {
  try {
    console.log(ctx.session.sessionid);
    await ctx.orm.Session.destroy({
      where: { id: `${ctx.session.sessionid}` },
    });
    ctx.session.sessionid = undefined;
    ctx.status = 200;
  } catch (error) {
    ctx.throw(error);
  }
});

module.exports = router;

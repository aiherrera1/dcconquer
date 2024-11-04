const Router = require('koa-router');

const router = new Router();

router.post('back_up.post', '/', async (ctx) => {
  try {
    const players = ctx.request.body;
    players.forEach(async (player) => {
      const existsPlayer = await ctx.orm.Player.findOne({
        where: { email: player.email },
      });
      if (!existsPlayer) {
        await ctx.orm.Player.create({
          avatar: player.avatar,
          email: player.email,
          password: player.password,
          username: player.username,
        });
      }
    });

    ctx.status = 201;
  } catch (error) {
    ctx.throw(error);
  }
});

router.get('players.show', '/', async (ctx) => {
  try {
    const players = await ctx.orm.Player.findAll();

    ctx.body = players;
  } catch (error) {
    ctx.throw(error);
  }
});
module.exports = router;

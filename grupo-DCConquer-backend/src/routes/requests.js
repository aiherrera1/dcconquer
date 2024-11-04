const Router = require('koa-router');

const router = new Router();

// shows all requests for admin
router.get('requests.show', '/requests', async (ctx) => {
  try {
    const requests = await ctx.orm.Request.findAll();
    ctx.body = requests;
  } catch (error) {
    ctx.throw(error);
  }
});

// shows requests for a certain match
router.get('requests.show', '/requests/:id', async (ctx) => {
  try {
    const player = await ctx.orm.Player.findByPk(ctx.state.tokendata.player.id);
    const match = await ctx.orm.Match.findByPk(ctx.params.id, {
      include: [
        { model: ctx.orm.Game, as: 'game' },
        { model: ctx.orm.Player, as: 'players' },
      ],
    });
    const requests = await ctx.orm.Request.findAll({
      where: { match_id: ctx.params.id },
      include: [{ model: ctx.orm.Player, as: 'player' }],
    });
    if (!match) {
      ctx.throw(404);
    }
    ctx.body = { player, match, requests };
    ctx.status = 201;
  } catch (error) {
    console.log(error);
    ctx.throw(error);
  }
});

// it creates a requests to join a match
router.post('requests.create', '/requests', async (ctx) => {
  try {
    const player = await ctx.orm.Player.findByPk(ctx.state.tokendata.player.id);
    const request = await ctx.orm.Request.create({
      match_id: ctx.request.body.match_id,
      player_id: player.id,
    });

    ctx.throw(request.dataValues, 201);
  } catch (error) {
    ctx.throw(error);
  }
});

// deletes a request
router.delete('requests', '/requests/:id/players/:player_id', async (ctx) => {
  try {
    const request = await ctx.orm.Request.destroy({
      where: {
        match_id: ctx.params.id,
        player_id: ctx.params.player_id,
      },
    });

    ctx.throw(request.dataValues, 201);
  } catch (error) {
    ctx.throw(error);
  }
});

module.exports = router;

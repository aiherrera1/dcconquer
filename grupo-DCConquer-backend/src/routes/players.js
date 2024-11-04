const Router = require('koa-router');

const router = new Router();

// shows user profile
router.get('player.show', '/players/:id', async (ctx) => {
  try {
    const player = await ctx.orm.Player.findByPk(ctx.params.id, {
      include: [
        {
          model: ctx.orm.Match,
          include: [{ model: ctx.orm.Game, as: 'game' }],
          as: 'matches',
        },
      ],
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
    });

    const gamesWon = await ctx.orm.Game.count({
      where: { winner_id: ctx.params.id },
    });
    player.dataValues.gamesWon = gamesWon;
    ctx.body = { player, playerId: ctx.state.tokendata.player.id };
  } catch (error) {
    console.log(error);
    ctx.throw(error);
  }
});

// shows all players for admin
router.get('players.show', '/players', async (ctx) => {
  try {
    const players = await ctx.orm.Player.findAll();

    ctx.body = players;
  } catch (error) {
    ctx.throw(error);
  }
});

// deletes user
// todo, handle matches the player was in
router.delete('player.delete', '/players/:id', async (ctx) => {
  try {
    await ctx.orm.Session.destroy({
      where: { userid: ctx.params.id },
    });
    const player = await ctx.orm.Player.destroy({
      where: {
        id: ctx.params.id,
      },
    });

    ctx.throw(player.dataValues, 201);
  } catch (error) {
    ctx.throw(error);
  }
});

module.exports = router;

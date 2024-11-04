const Router = require('koa-router');

const router = new Router();

// shows all games
router.get('/games', async (ctx) => {
  try {
    const games = await ctx.orm.Game.findAll({
      include: [{ model: ctx.orm.Match, as: 'match' }],
    });
    ctx.body = games;
    ctx.status = 201;
  } catch (error) {
    console.log(error);
    ctx.throw(404);
  }
});

// it creates a game
router.post('/games', async (ctx) => {
  try {
    const { body } = ctx.request;
    const player = await ctx.orm.Player.findByPk(ctx.state.tokendata.player.id);
    const game = await ctx.orm.Game.create({
      host_id: player.id,
      name: body.name,
      min_players: body.min_players,
      max_players: body.max_players,
      starting_cards: body.starting_cards,
      active: false,
      winner_id: -1,
    });
    const match = await ctx.orm.Match.create({
      game_id: game.id,
      n_players: 1,
      current_turn: 0,
    });

    await ctx.orm.PlayersInMatch.create({
      match_id: match.id,
      player_id: player.id,
    });

    ctx.response.body = { id: match.id };

    ctx.status = 201;
  } catch (error) {
    ctx.throw(error);
  }
});

// it deletes a game as well as its match
// todo, destroy players in match as well
router.delete('game.delete', '/games/:id', async (ctx) => {
  try {
    if (ctx.state.tokendata.player.admin) {
      await ctx.orm.Game.destroy({
        where: { id: ctx.params.id },
      });
      const match = await ctx.orm.Match.destroy({
        where: {
          id: ctx.params.id,
        },
      });
      await ctx.orm.PlayersInMatch.destroy({
        where: {
          match_id: ctx.params.id,
        },
      });
      await ctx.orm.Turn.destroy({
        where: {
          match_id: ctx.params.id,
        },
      });
      await ctx.orm.Territory.destroy({
        where: {
          match_id: ctx.params.id,
        },
      });
      await ctx.orm.Request.destroy({
        where: {
          match_id: ctx.params.id,
        },
      });
      await ctx.orm.Wall.destroy({
        where: {
          match_id: ctx.params.id,
        },
      });
      ctx.response.status = 202;
      ctx.response.body = { message: 'game deleted' };
      // ctx.status(202);

      ctx.throw(match.dataValues, 202);
    } else {
      ctx.status(403);
    }
  } catch (error) {
    ctx.throw(error);
  }
});

module.exports = router;

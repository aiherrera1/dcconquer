const Router = require('koa-router');

const router = new Router();

// shows all players for ranking
router.get('ranking.show', '/', async (ctx) => {
  try {
    const arrayPlayers = [];
    const players = await ctx.orm.Player.findAll();
    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      const gamesWon = await ctx.orm.Game.count({
        where: { winner_id: player.id },
      });
      player.dataValues.gamesWon = gamesWon;
      arrayPlayers.push(player);
    }
    arrayPlayers.sort(function(a, b) {return b.dataValues.gamesWon - a.dataValues.gamesWon});
    ctx.body = arrayPlayers;
  } catch (error) {
    ctx.throw(error);
  }
});

module.exports = router;

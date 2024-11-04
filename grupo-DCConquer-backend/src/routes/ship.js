const Router = require('koa-router');

const router = new Router();

router.put('ship.create', '/ship', async (ctx) => {
  try {
    const { body } = ctx.request;
    const territory = await ctx.orm.Territory.findOne({
      where: {
        match_id: body.match_id,
        position_id: body.position_id,
      },
    });
    territory.ship_level += 1;
    const playerInMatch = await ctx.orm.PlayersInMatch.findOne({
      where: {
        turn: territory.player_id,
        match_id: body.match_id,
      },
    });
    playerInMatch.ship_cards -= 1;
    if (playerInMatch.ship_cards >= 0) {
      territory.save();
      playerInMatch.save();
      ctx.status = 201;
    } else {
      ctx.throw('You dont have enough cards', 303);
    }
  } catch (error) {
    ctx.throw(error);
  }
});

module.exports = router;

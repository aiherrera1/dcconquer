const Router = require('koa-router');

const router = new Router();

const wallSide = {
  '1,2': 3,
  '1,13': 4,
  '1,12': 5,

  '2,3': 3,
  '2,14': 4,
  '2,13': 5,
  '2,1': 6,

  '3,4': 4,
  '3,14': 5,
  '3,2': 6,

  '4,3': 2,
  '4,5': 4,
  '4,15': 5,
  '4,14': 6,

  '5,4': 1,
  '5,6': 5,
  '5,15': 6,

  '6,15': 1,
  '6,5': 2,
  '6,7': 5,
  '6,16': 6,

  '7,16': 1,
  '7,6': 2,
  '7,8': 6,

  '8,17': 1,
  '8,16': 2,
  '8,7': 3,
  '8,9': 6,

  '9,10': 1,
  '9,17': 2,
  '9,8': 3,

  '10,11': 1,
  '10,17': 3,
  '10,18': 2,
  '10,9': 4,

  '11,12': 2,
  '11,18': 3,
  '11,10': 4,

  '12,1': 2,
  '12,13': 3,
  '12,18': 4,
  '12,11': 5,

  '13,1': 1,
  '13,2': 2,
  '13,14': 3,
  '13,19': 4,
  '13,18': 5,
  '13,12': 6,

  '14,2': 1,
  '14,3': 2,
  '14,4': 3,
  '14,15': 4,
  '14,19': 5,
  '14,13': 6,

  '15,14': 1,
  '15,4': 2,
  '15,5': 3,
  '15,6': 4,
  '15,16': 5,
  '15,19': 6,

  '16,19': 1,
  '16,15': 2,
  '16,6': 3,
  '16,7': 4,
  '16,8': 5,
  '16,17': 6,

  '17,18': 1,
  '17,19': 2,
  '17,16': 3,
  '17,8': 4,
  '17,9': 5,
  '17,10': 6,

  '18,12': 1,
  '18,13': 2,
  '18,19': 3,
  '18,17': 4,
  '18,10': 5,
  '18,11': 6,

  '19,13': 1,
  '19,14': 2,
  '19,15': 3,
  '19,16': 4,
  '19,17': 5,
  '19,18': 6,
};
router.delete('wall.delete', '/walls/:wall_id', async (ctx) => {
  try {
    const wall = await ctx.orm.Wall.findByPk(ctx.params.wall_id);
    const wall2 = await ctx.orm.Wall.findOne({
      where: {
        match_id: wall.match_id,
        territory_id: wall.territory_side_id,
        territory_side_id: wall.territory_id,
      },
    });
    wall.destroy();
    wall2.destroy();
    ctx.status = 202;
  } catch (error) {
    console.log(error);
  }
});
// Checks if player is admin
router.post('wall.create', '/walls', async (ctx) => {
  try {
    const { body } = ctx.request;
    await ctx.orm.Wall.create({
      match_id: body.match_id,
      player_turn: body.player_turn,
      territory_id: body.first_territory,
      side: wallSide[`${body.first_territory},${body.second_territory}`],
      territory_side_id: body.second_territory,
    });
    await ctx.orm.Wall.create({
      match_id: body.match_id,
      player_turn: body.player_turn,
      territory_id: body.second_territory,
      side: wallSide[`${body.second_territory},${body.first_territory}`],
      territory_side_id: body.first_territory,
    });
    const player = await ctx.orm.PlayersInMatch.findOne({
      where: { match_id: body.match_id, turn: body.player_turn },
    });
    player.wall_cards -= 1;
    player.save();
    ctx.status = 201;
  } catch (error) {
    ctx.throw(error);
  }
});

module.exports = router;

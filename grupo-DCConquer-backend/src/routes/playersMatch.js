const Router = require('koa-router');

const router = new Router();

// get all players in match for admin
router.get('playersmatch.show', '/playersmatch', async (ctx) => {
  try {
    const playersInMatch = await ctx.orm.PlayersInMatch.findAll();
    ctx.body = playersInMatch;
  } catch (error) {
    ctx.throw(error);
  }
});

// shows all players in match parece que no la uso
router.get('playersmatch.show', '/playersmatch/:id', async (ctx) => {
  const players = await ctx.orm.PlayersInMatch.findAll({
    where: { match_id: ctx.params.id },
  });
  ctx.body = players;
});

// creates player in match for a match and user
router.post('playersmatch.create', '/playersmatch/:id', async (ctx) => {
  try {
    const playersInMatch = await ctx.orm.PlayersInMatch.create(
      ctx.request.body,
    );
    const match = await ctx.orm.Match.findByPk(ctx.params.id);
    match.n_players += 1;
    match.save();

    ctx.throw(playersInMatch.dataValues, 201);
  } catch (error) {
    ctx.throw(error);
  }
});

// todo handle leave of player
// deletes player in match
// it kicks out a player from a match
router.delete(
  'playersmatch',
  '/playersmatch/:id/players/:player_id',
  async (ctx) => {
    try {
      console.log(ctx);
      const request = await ctx.orm.PlayersInMatch.destroy({
        where: {
          match_id: ctx.params.id,
          player_id: ctx.params.player_id,
        },
      });
      const match = await ctx.orm.Match.findByPk(ctx.params.id);
      match.n_players -= 1;
      match.save();

      ctx.throw(request.dataValues, 201);
    } catch (error) {
      ctx.throw(error);
    }
  },
);

// deletes a player in match
// deletes eveything related to the player in the match
router.delete(
  'leavematch',
  '/leavematch/:id/players/:player_id',
  async (ctx) => {
    try {
      console.log('#########################');
      console.log('#########################');
      console.log('#########################');
      // console.log(ctx);

      const playerInMatch = await ctx.orm.PlayersInMatch.findOne({
        where: {
          match_id: ctx.params.id,
          player_id: ctx.params.player_id,
        },
      });
      playerInMatch.wall_cards = 0;
      playerInMatch.ship_cards = 0;
      playerInMatch.dice_cards = 0;
      playerInMatch.save()
      console.log(playerInMatch.turn);

      const playerTerritories = await ctx.orm.Territory.findAll({
        where: {
          match_id: ctx.params.id,
          player_id: playerInMatch.turn,
        },
      });
      if (playerTerritories) {
        for (let i = 0; i < playerTerritories.length; i++) {
          console.log(playerTerritories[i]);
          playerTerritories[i].player_id = -1;
          playerTerritories[i].warriors = 0;
          playerTerritories[i].ship_level = 0;
          playerTerritories[i].save();

          await ctx.orm.Wall.destroy({
            where: {
              match_id: ctx.params.id,
              player_turn: playerInMatch.turn,
              territory_id: playerTerritories[i].id,
            },
          });
          await ctx.orm.Wall.destroy({
            where: {
              match_id: ctx.params.id,
              player_turn: playerInMatch.turn,
              territory_side_id: playerTerritories[i].id,
            },
          });
        }
      }

      const territories = await ctx.orm.Territory.findAll({
        where: {
          match_id: ctx.params.id,
          player_id: playerInMatch.turn,
        },
      });

      console.log('#########################');
      console.log('#########################');
      console.log('#########################');

      ctx.body = {
        territories: territories.dataValues,
      };
      ctx.status = 201;
    } catch (error) {
      ctx.throw(error);
    }
  },
);

module.exports = router;

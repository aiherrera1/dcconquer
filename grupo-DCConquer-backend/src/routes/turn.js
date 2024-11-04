const Router = require('koa-router');

const router = new Router();

router.put('dice.edit', '/dice', async (ctx) => {
  const player = await ctx.orm.PlayersInMatch.findOne({
    where: {
      match_id: ctx.request.body.match_id,
      turn: ctx.request.body.player_turn,
    },
  });
  player.dice_cards -= 1;
  player.save();
  ctx.status = 200;
});

router.get('turn.show', '/turn/:id', async (ctx) => {
  const players = await ctx.orm.PlayersInMatch.findAll({
    where: { match_id: ctx.params.id },
  });
  ctx.body = players;
});

router.post('turn.create', '/turn/:id', async (ctx) => {
  try {
    const data = ctx.request.body;
    const player = await ctx.orm.Player.findByPk(ctx.state.tokendata.player.id);
    const match = await ctx.orm.Match.findByPk(ctx.params.id);
    const playerInMatch = await ctx.orm.PlayersInMatch.findOne({
      where: { match_id: match.id, player_id: player.id },
    });
    const turn = await ctx.orm.Turn.findOne({
      where: {
        match_id: ctx.params.id,
        player_turn: playerInMatch.turn,
        current_turn: match.current_turn,
      },
    });
    if (turn) {
      let string = '';
      for (let i = 0; i < data.dices.length; i++) {
        const element = data.dices[i];
        string = `${string}${element},`;
      }

      turn.threw_first = data.threw_first;
      turn.threw_second = data.threw_second;
      turn.dice_card = data.used_dice;
      turn.dices = string;
      turn.from = data.from;
      turn.to = data.to;
      turn.from_warriors = data.from_warriors;
      turn.attacked = data.attacked;
      turn.save();
      // ctx.throw(turn.dataValues, 201);
    } else {
      if (data.card === 1) {
        playerInMatch.ship_cards += 1;
      } else if (data.card === 2) {
        playerInMatch.dice_cards += 1;
      } else if (data.card === 3) {
        playerInMatch.wall_cards += 1;
      }
      playerInMatch.save();
      await ctx.orm.Turn.create({
        match_id: ctx.params.id,
        player_turn: playerInMatch.turn,
        current_turn: match.current_turn,
        card: true,
        dices: 'default,default,default,default,default',
        threw_first: false,
        threw_second: false,
        dice_card: false,
      });
    }
    for (let i = 0; i < 19; i++) {
      const territory = await ctx.orm.Territory.findOne({
        where: { position_id: i + 1, match_id: ctx.params.id },
      });
      territory.warriors = data.warriors[i];
      territory.player_id = data.owners[i];
      territory.save();
    }
    ctx.throw(201);
  } catch (error) {
    ctx.throw(error);
  }
});

module.exports = router;

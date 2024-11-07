const Router = require("koa-router");
// const { Op } = require('sequelize');

const router = new Router();

router.post("match.create", "/matches/:id", async (ctx) => {
  try {
    // update match
    const match = await ctx.orm.Match.findByPk(ctx.params.id);
    const territory = await ctx.orm.Territory.findOne({
      where: { match_id: match.id },
    });
    if (territory) {
      ctx.throw(405);
    }
    const game = await ctx.orm.Game.findByPk(match.game_id);
    game.active = true;
    game.save();

    const players = await ctx.orm.PlayersInMatch.findAll({
      where: { match_id: match.id },
    });

    const turns = [];

    for (let i = 0; i < match.n_players; i++) {
      turns.push(i);
    }
    turns.sort(() => Math.random() - 0.5);

    let j = 0;

    players.forEach((player) => {
      const playerInMatch = player;
      let wallCards = 0;
      let shipCards = 0;
      let diceCards = 0;

      for (let i = 0; i < game.starting_cards; i++) {
        const n = Math.floor(Math.random() * 3) + 1;
        if (n === 1) {
          wallCards += 1;
        } else if (n === 2) {
          shipCards += 1;
        } else {
          diceCards += 1;
        }
      }
      playerInMatch.wall_cards = wallCards;
      playerInMatch.ship_cards = shipCards;
      playerInMatch.dice_cards = diceCards;
      playerInMatch.turn = turns[j];
      playerInMatch.save();
      j += 1;
    });

    const owners = [];
    if (match.n_players === 2) {
      owners.push(1);
      owners.push(7);
    } else if (match.n_players === 3) {
      owners.push(3, 7, 11);
    } else if (match.n_players === 4) {
      owners.push(3, 5, 9, 11);
    } else if (match.n_players === 5) {
      owners.push(3, 5, 7, 9, 11);
    } else if (match.n_players === 6) {
      owners.push(1, 3, 5, 7, 9, 11);
    }
    let turn = 0;
    for (let i = 1; i <= 19; i++) {
      let owner = -1;
      if (owners.includes(i)) {
        owner = turn;
        turn += 1;
      }
      await ctx.orm.Territory.create({
        match_id: match.id,
        position_id: i,
        warriors: 0,
        ship_level: 0,
        player_id: owner,
      });
    }
    ctx.throw(match.dataValues, 201);
  } catch (error) {
    ctx.throw(error);
  }
});

// gets info for match
router.get("match.show", "/matches/:id", async (ctx) => {
  // todo if ctx.params.id not in match players return
  try {
    const player = await ctx.orm.Player.findByPk(ctx.state.tokendata.player.id);
    const match = await ctx.orm.Match.findByPk(ctx.params.id, {
      include: [
        { model: ctx.orm.Game, as: "game" },
        { model: ctx.orm.Player, as: "players" },
      ],
    });
    const playerInMatch = await ctx.orm.PlayersInMatch.findOne({
      where: { player_id: player.id, match_id: ctx.params.id },
    });
    if (!match || !player || !playerInMatch) {
      ctx.throw(404, "Not a game");
    }
    const territories = [];
    for (let i = 1; i < 20; i++) {
      const t = await ctx.orm.Territory.findOne({
        where: { match_id: ctx.params.id, position_id: i },
        as: "territory",
      });
      const wallsList = [];
      const walls = await ctx.orm.Wall.findAll({
        where: { match_id: ctx.params.id, territory_id: i },
      });
      walls.forEach((wall) => {
        wallsList.push([
          wall.side,
          wall.player_turn,
          wall.territory_id,
          wall.territory_side_id,
          wall.id,
        ]);
      });
      const territory = {
        id: t.id,
        match_id: t.match_id,
        player_id: t.player_id,
        position_id: t.position_id,
        warriors: t.warriors,
        ship_level: t.ship_level,
        walls: wallsList,
      };
      territories.push(territory);
    }
    // const territories = await ctx.orm.Territory.findAll({
    //   where: { match_id: ctx.params.id },
    //   order: [['position_id', 'ASC']],
    //   include: [{ model: ctx.orm.Wall.where({}) }],
    // });
    const turn = await ctx.orm.Turn.findOne({
      where: { match_id: match.id, current_turn: match.current_turn },
    });

    ctx.body = {
      player,
      match,
      playerInMatch,
      territories,
      turn,
    };
  } catch (error) {
    console.log(error);
    ctx.throw(404, error);
  }
});

// it updates match status
router.put("matches.edit", "/matches/:id", async (ctx) => {
  try {
    const data = ctx.request.body;

    // update match
    const match = await ctx.orm.Match.findByPk(ctx.params.id);
    const game = await ctx.orm.Game.findByPk(ctx.params.id);
    let currentTurn = match.current_turn + 1;

    // update players
    const player = await ctx.orm.PlayersInMatch.findOne({
      where: { player_id: data.player_id, match_id: ctx.params.id },
    });

    player.dice_cards = data.diceCards;
    player.wall_cards = data.wallCards;
    player.ship_cards = data.shipCards;
    player.save();

    for (let i = 0; i < 19; i++) {
      const territory = await ctx.orm.Territory.findOne({
        where: { position_id: i + 1, match_id: ctx.params.id },
      });
      territory.player_id = data.owners[i]; // todo: change to player turn
      territory.warriors = data.warriors[i];
      territory.save();
    }
    let loosers = 0;
    let inGame = false;
    while (!inGame) {
      const turn = currentTurn % match.n_players;
      for (let i = 0; i < data.owners.length; i++) {
        if (data.owners[i] === turn) {
          inGame = true;
          break;
        }
      }
      if (!inGame) {
        currentTurn += 1;
        loosers += 1;
      }
    }

    if (loosers === match.n_players - 1) {
      game.winner_id = player.player_id;
    }
    game.save();
    match.current_turn = currentTurn;
    match.save();

    ctx.throw(match.dataValues, 201);
  } catch (error) {
    ctx.throw(error);
  }
});

module.exports = router;

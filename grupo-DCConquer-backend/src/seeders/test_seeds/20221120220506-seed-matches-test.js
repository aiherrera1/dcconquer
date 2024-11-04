module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Matches', [
    {
      game_id: 1,
      n_players: 2,
      current_turn: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      game_id: 2,
      n_players: 2,
      current_turn: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      game_id: 3,
      n_players: 2,
      current_turn: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Matches', null, {}),
};
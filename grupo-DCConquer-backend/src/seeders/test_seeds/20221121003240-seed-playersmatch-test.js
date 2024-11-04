module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('PlayersInMatches', [
    {
      match_id: 1,
      player_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      match_id: 1,
      player_id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      match_id: 2,
      player_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      match_id: 2,
      player_id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      match_id: 3,
      player_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      match_id: 3,
      player_id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('PlayersInMatches', null, {}),
};
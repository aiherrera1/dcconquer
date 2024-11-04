module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Games', [
    {
      host_id: 1,
      name: 'game1',
      min_players: 2,
      max_players: 6,
      starting_cards: 2,
      active: false,
      winner_id: -1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      host_id: 2,
      name: 'game2',
      min_players: 2,
      max_players: 6,
      starting_cards: 2,
      active: false,
      winner_id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      host_id: 3,
      name: 'game3',
      min_players: 2,
      max_players: 6,
      starting_cards: 2,
      active: true,
      winner_id: -1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Games', null, {}),
};
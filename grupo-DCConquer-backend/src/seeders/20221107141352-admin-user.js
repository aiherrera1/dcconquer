/* eslint-disable */

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('Admins', [
      {
        player_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Games', null, {}),
};

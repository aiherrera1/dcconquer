/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PlayersInMatches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      match_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        reference: { model: 'Matches', key: 'id' },
      },
      player_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        reference: { model: 'Players', key: 'id' },
      },
      wall_cards: {
        type: Sequelize.INTEGER,
      },
      ship_cards: {
        type: Sequelize.INTEGER,
      },
      dice_cards: {
        type: Sequelize.INTEGER,
      },
      turn: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PlayersInMatches');
  },
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Games', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      host_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        reference: { model: 'Players', key: 'id' },
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      min_players: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      max_players: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      starting_cards: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      active: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      winner_id: {
        type: Sequelize.INTEGER,
        reference: { model: 'Players', key: 'id' },
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
    await queryInterface.dropTable('Games');
  },
};

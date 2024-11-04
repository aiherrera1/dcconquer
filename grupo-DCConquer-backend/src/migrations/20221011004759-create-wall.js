/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Walls', {
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
      player_turn: {
        allowNull: false,
        type: Sequelize.INTEGER,
        reference: { model: 'Players', key: 'id' },
      },
      territory_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      side: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      territory_side_id: {
        allowNull: false, 
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Walls');
  },
};

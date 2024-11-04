'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('PlayersInMatches', [{
      match_id: 1,
      player_id: 2,
      wall_cards: 0,
      ship_cards: 0,
      dice_cards: 1,
      turn: 0,
      createdAt: new Date(),
      updatedAt: new Date()
     }], {});
    await queryInterface.bulkInsert('PlayersInMatches', [{
      match_id: 1,
      player_id: 3,
      wall_cards: 0,
      ship_cards: 0,
      dice_cards: 1,
      turn: 1,
      createdAt: new Date(),
      updatedAt: new Date()
     }], {});
    await queryInterface.bulkInsert('PlayersInMatches', [{
      match_id: 1,
      player_id: 4,
      wall_cards: 0,
      ship_cards: 0,
      dice_cards: 1,
      turn: 2,
      createdAt: new Date(),
      updatedAt: new Date()
     }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('PlayersInMatches', null, {});
  }
};

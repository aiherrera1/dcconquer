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
    await queryInterface.bulkInsert('Walls', [{
      match_id: 1,
      player_turn: 1,
      territory_id: 14,
      side: 2,
      territory_side_id: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('Walls', [{
      match_id: 1,
      player_turn: 1,
      territory_id: 3,
      side: 5,
      territory_side_id: 14,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('Walls', [{
      match_id: 1,
      player_turn: 1,
      territory_id: 7,
      side: 1,
      territory_side_id: 16,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('Walls', [{
      match_id: 1,
      player_turn: 1,
      territory_id: 16,
      side: 4,
      territory_side_id: 7,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('Walls', [{
      match_id: 1,
      player_turn: 1,
      territory_id: 16,
      side: 1,
      territory_side_id: 19,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('Walls', [{
      match_id: 1,
      player_turn: 1,
      territory_id: 19,
      side: 4,
      territory_side_id: 16,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('Walls', [{
      match_id: 1,
      player_turn: 1,
      territory_id: 16,
      side: 6,
      territory_side_id: 17,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('Walls', [{
      match_id: 1,
      player_turn: 1,
      territory_id: 17,
      side: 3,
      territory_side_id: 16,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('Walls', [{
      match_id: 1,
      player_turn: 2,
      territory_id: 18,
      side: 3,
      territory_side_id: 19,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('Walls', [{
      match_id: 1,
      player_turn: 2,
      territory_id: 19,
      side: 6,
      territory_side_id: 18,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('Walls', [{
      match_id: 1,
      player_turn: 0,
      territory_id: 13,
      side: 5,
      territory_side_id: 18,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('Walls', [{
      match_id: 1,
      player_turn: 0,
      territory_id: 18,
      side: 2,
      territory_side_id: 13,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('Walls', [{
      match_id: 1,
      player_turn: 0,
      territory_id: 18,
      side: 3,
      territory_side_id: 19,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('Walls', [{
      match_id: 1,
      player_turn: 0,
      territory_id: 19,
      side: 6,
      territory_side_id: 18,
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
    await queryInterface.bulkDelete('Turns', null, {});
  }
};

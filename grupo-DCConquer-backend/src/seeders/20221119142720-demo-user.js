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
    await queryInterface.bulkInsert('Territories', [{
      match_id: 1,
      player_id: -1,
      position_id: 1,
      warriors: 0,
      ship_level: 0,
      createdAt: new Date(),
      updatedAt: new Date()
     }], {});
    await queryInterface.bulkInsert('Territories', [{
      match_id: 1,
      player_id: 0,
      position_id: 2,
      warriors: 0,
      ship_level: 0,
      createdAt: new Date(),
      updatedAt: new Date()
     }], {});
    await queryInterface.bulkInsert('Territories', [{
      match_id: 1,
      player_id: 0,
      position_id: 3,
      warriors: 0,
      ship_level: 2,
      createdAt: new Date(),
      updatedAt: new Date()
     }], {});
    await queryInterface.bulkInsert('Territories', [{
      match_id: 1,
      player_id: -1,
      position_id: 4,
      warriors: 0,
      ship_level: 0,
      createdAt: new Date(),
      updatedAt: new Date()
     }], {});
    await queryInterface.bulkInsert('Territories', [{
      match_id: 1,
      player_id: -1,
      position_id: 5,
      warriors: 0,
      ship_level: 0,
      createdAt: new Date(),
      updatedAt: new Date()
     }], {});
    await queryInterface.bulkInsert('Territories', [{
      match_id: 1,
      player_id: 1,
      position_id: 6,
      warriors: 1,
      ship_level: 0,
      createdAt: new Date(),
      updatedAt: new Date()
     }], {});
    await queryInterface.bulkInsert('Territories', [{
      match_id: 1,
      player_id: 1,
      position_id: 7,
      warriors: 1,
      ship_level: 1,
      createdAt: new Date(),
      updatedAt: new Date()
     }], {});
    await queryInterface.bulkInsert('Territories', [{
      match_id: 1,
      player_id: 1,
      position_id: 8,
      warriors: 63,
      ship_level: 1,
      createdAt: new Date(),
      updatedAt: new Date()
     }], {});
    await queryInterface.bulkInsert('Territories', [{
      match_id: 1,
      player_id: -1,
      position_id: 9,
      warriors: 0,
      ship_level: 0,
      createdAt: new Date(),
      updatedAt: new Date()
     }], {});
    await queryInterface.bulkInsert('Territories', [{
      match_id: 1,
      player_id: -1,
      position_id: 10,
      warriors: 0,
      ship_level: 0,
      createdAt: new Date(),
      updatedAt: new Date()
     }], {});
    await queryInterface.bulkInsert('Territories', [{
      match_id: 1,
      player_id: 2,
      position_id: 11,
      warriors: 84,
      ship_level: 1,
      createdAt: new Date(),
      updatedAt: new Date()
     }], {});
    await queryInterface.bulkInsert('Territories', [{
      match_id: 1,
      player_id: 0,
      position_id: 12,
      warriors: 1,
      ship_level: 0,
      createdAt: new Date(),
      updatedAt: new Date()
     }], {});
    await queryInterface.bulkInsert('Territories', [{
      match_id: 1,
      player_id: 0,
      position_id: 13,
      warriors: 1,
      ship_level: 0,
      createdAt: new Date(),
      updatedAt: new Date()
     }], {});
    await queryInterface.bulkInsert('Territories', [{
      match_id: 1,
      player_id: 0,
      position_id: 14,
      warriors: 25,
      ship_level: 0,
      createdAt: new Date(),
      updatedAt: new Date()
     }], {});
    await queryInterface.bulkInsert('Territories', [{
      match_id: 1,
      player_id: -1,
      position_id: 15,
      warriors: 0,
      ship_level: 0,
      createdAt: new Date(),
      updatedAt: new Date()
     }], {});
    await queryInterface.bulkInsert('Territories', [{
      match_id: 1,
      player_id: 1,
      position_id: 16,
      warriors: 127,
      ship_level: 0,
      createdAt: new Date(),
      updatedAt: new Date()
     }], {});
    await queryInterface.bulkInsert('Territories', [{
      match_id: 1,
      player_id: -1,
      position_id: 17,
      warriors: 0,
      ship_level: 0,
      createdAt: new Date(),
      updatedAt: new Date()
     }], {});
    await queryInterface.bulkInsert('Territories', [{
      match_id: 1,
      player_id: 0,
      position_id: 18,
      warriors: 117,
      ship_level: 0,
      createdAt: new Date(),
      updatedAt: new Date()
     }], {});
    await queryInterface.bulkInsert('Territories', [{
      match_id: 1,
      player_id: -1,
      position_id: 19,
      warriors: 0,
      ship_level: 0,
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
    await queryInterface.bulkDelete('Territories', null, {});
  }
};

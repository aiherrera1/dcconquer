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
    await queryInterface.bulkInsert('Turns', [{
      match_id: 1,
      player_turn: 0,
      current_turn: 0,
      card: true,
      dices: 'dice3,dice3,dice2,dice2,dice2,,',
      threw_first: true,
      threw_second: true,
      dice_card: true,
      from: 3,
      to: 14,
      from_warriors: 50,
      attacked: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('Turns', [{
      match_id: 1,
      player_turn: 1,
      current_turn: 1,
      card: true,
      dices: 'dice5,dice1,dice1,dice1,dice1,,',
      threw_first: true,
      threw_second: true,
      dice_card: true,
      from: 7,
      to: 16,
      from_warriors: 75,
      attacked: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('Turns', [{
      match_id: 1,
      player_turn: 2,
      current_turn: 2,
      card: true,
      dices: 'default,default,default,default,default',
      threw_first: false,
      threw_second: false,
      dice_card: false,
      from: null,
      to: null,
      from_warriors: null,
      attacked: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('Turns', [{
      match_id: 1,
      player_turn: 0,
      current_turn: 3,
      card: true,
      dices: 'dice2,dice1,dice4,dice1,dice1,,',
      threw_first: true,
      threw_second: true,
      dice_card: true,
      from: 14,
      to: 16,
      from_warriors: 69,
      attacked: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('Turns', [{
      match_id: 1,
      player_turn: 1,
      current_turn: 4,
      card: true,
      dices: 'dice3,dice4,dice5,dice5,dice5,,',
      threw_first: true,
      threw_second: true,
      dice_card: true,
      from: 16,
      to: 8,
      from_warriors: 112,
      attacked: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('Turns', [{
      match_id: 1,
      player_turn: 2,
      current_turn: 5,
      card: true,
      dices: 'dice6,dice2,dice2,dice2,dice2,,',
      threw_first: true,
      threw_second: true,
      dice_card: true,
      from: 11,
      to: 18,
      from_warriors: 75,
      attacked: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('Turns', [{
      match_id: 1,
      player_turn: 0,
      current_turn: 6,
      card: true,
      dices: 'dice3,dice5,dice6,dice5,dice5,,',
      threw_first: true,
      threw_second: true,
      dice_card: true,
      from: 13,
      to: 2,
      from_warriors: 55,
      attacked: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('Turns', [{
      match_id: 1,
      player_turn: 1,
      current_turn: 7,
      card: true,
      dices: 'dice4,dice1,dice3,dice4,dice1,',
      threw_first: true,
      threw_second: true,
      dice_card: false,
      from: null,
      to: null,
      from_warriors: null,
      attacked: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('Turns', [{
      match_id: 1,
      player_turn: 2,
      current_turn: 8,
      card: true,
      dices: 'dice3,dice6,dice3,dice4,dice2,',
      threw_first: true,
      threw_second: true,
      dice_card: false,
      from: null,
      to: null,
      from_warriors: null,
      attacked: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('Turns', [{
      match_id: 1,
      player_turn: 0,
      current_turn: 9,
      card: true,
      dices: 'dice1,dice4,dice6,dice2,dice5,,',
      threw_first: true,
      threw_second: true,
      dice_card: true,
      from: 13,
      to: 18,
      from_warriors: 44,
      attacked: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('Turns', [{
      match_id: 1,
      player_turn: 1,
      current_turn: 10,
      card: true,
      dices: 'dice1,dice6,dice2,dice4,dice5,',
      threw_first: true,
      threw_second: false,
      dice_card: false,
      from: null,
      to: null,
      from_warriors: null,
      attacked: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('Turns', [{
      match_id: 1,
      player_turn: 2,
      current_turn: 11,
      card: true,
      dices: 'dice3,dice2,dice6,dice1,dice4,',
      threw_first: true,
      threw_second: false,
      dice_card: false,
      from: null,
      to: null,
      from_warriors: null,
      attacked: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('Turns', [{
      match_id: 1,
      player_turn: 0,
      current_turn: 12,
      card: true,
      dices: 'dice3,dice6,dice6,dice6,dice6,,',
      threw_first: true,
      threw_second: true,
      dice_card: true,
      from: 18,
      to: 12,
      from_warriors: 118,
      attacked: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('Turns', [{
      match_id: 1,
      player_turn: 1,
      current_turn: 13,
      card: true,
      dices: 'dice1,dice2,dice1,dice4,dice2,,',
      threw_first: true,
      threw_second: true,
      dice_card: true,
      from: 16,
      to: 6,
      from_warriors: 128,
      attacked: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('Turns', [{
      match_id: 1,
      player_turn: 2,
      current_turn: 14,
      card: true,
      dices: 'dice2,dice4,dice2,dice5,dice4,',
      threw_first: true,
      threw_second: true,
      dice_card: false,
      from: null,
      to: null,
      from_warriors: null,
      attacked: false,
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

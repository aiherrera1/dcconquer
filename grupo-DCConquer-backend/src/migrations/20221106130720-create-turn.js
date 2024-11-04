'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Turns', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      match_id: {
        type: Sequelize.INTEGER,
      },
      player_turn: {
        type: Sequelize.INTEGER,
      },
      current_turn: {
        type: Sequelize.INTEGER,
      },
      card: {
        type: Sequelize.BOOLEAN,
      },
      dices: {
        type: Sequelize.STRING,
      },
      threw_first: {
        type: Sequelize.BOOLEAN,
      },
      threw_second: {
        type: Sequelize.BOOLEAN,
      },
      dice_card: {
        type: Sequelize.BOOLEAN,
      },
      from: {
        type: Sequelize.INTEGER,
      },
      to: {
        type: Sequelize.INTEGER,
      },
      from_warriors: {
        type: Sequelize.INTEGER,
      },
      attacked: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable('Turns');
  },
};

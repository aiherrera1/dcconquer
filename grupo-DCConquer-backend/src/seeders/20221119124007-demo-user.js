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
    await queryInterface.bulkInsert('Players', [{
      username: 'administrator',
      email: 'administrator@dcconquer.com',
      password: '$2b$05$2uK2qQRUKukzP7swUOC.W.x9QtMfbzJ7kMtHo/j.8s3a3/drd8hYe',
      avatar: 'aztecs.png',
      createdAt: new Date(),
      updatedAt: new Date()
     }], {});
  await queryInterface.bulkInsert('Players', [{
    username: 'aiherrera1',
    email: 'aiherrera1@uc.cl',
    password: '$2b$05$2uK2qQRUKukzP7swUOC.W.x9QtMfbzJ7kMtHo/j.8s3a3/drd8hYe',
    avatar: 'aztecs.png',
    createdAt: new Date(),
    updatedAt: new Date()
   }], {});
  await queryInterface.bulkInsert('Players', [{
    username: 'vichoaburto',
    email: 'vicenteaburto@gmail.com',
    password: '$2b$05$2uK2qQRUKukzP7swUOC.W.x9QtMfbzJ7kMtHo/j.8s3a3/drd8hYe',
    avatar: 'spanish_conquistadors.png',
    createdAt: new Date(),
    updatedAt: new Date()
   }], {});
  await queryInterface.bulkInsert('Players', [{
    username: 'Agus_Suazo',
    email: 'asuazo@uc.cl',
    password: '$2b$05$2uK2qQRUKukzP7swUOC.W.x9QtMfbzJ7kMtHo/j.8s3a3/drd8hYe',
    avatar: 'barbarians.png',
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
    await queryInterface.bulkDelete('Players', null, {});
  }
};

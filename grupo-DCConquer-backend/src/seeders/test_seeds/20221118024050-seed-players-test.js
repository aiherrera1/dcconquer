const bcrypt = require('bcrypt');
// const { QueryInterface } = require('sequelize');

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Players', [
    {
      username: 'user1',
      email: 'user1@uc.cl',
      password: bcrypt.hashSync('A12345678@', 5),
      avatar: 'vikings.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'user2',
      email: 'user2@uc.cl',
      password: bcrypt.hashSync('B12345678@', 5),
      avatar: 'vikings.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'user3',
      email: 'user3@uc.cl',
      password: bcrypt.hashSync('C12345678@', 5),
      avatar: 'vikings.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Players', null, {}),
};
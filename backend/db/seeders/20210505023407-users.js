'use strict';
const bcrypt = require('bcryptjs');
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        username: 'Demo-lition',
        email: 'demo@user.io',
        hashedPassword: bcrypt.hashSync('password'),
        avatar: null
      },
      {
        username: 'Fire',
        email: faker.internet.email(),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        avatar: null
      },
      {
        username: 'Ice',
        email: faker.internet.email(),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        avatar: null
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'Fire', 'Ice'] }
    }, {});
  }
};
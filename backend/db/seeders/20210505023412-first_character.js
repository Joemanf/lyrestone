'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Characters', [
      { name: 'Eugene', class: 'Explorer', userId: 1, strength: 8, dexterity: 7, constitution: 8, intelligence: 3, wisdom: 5, charisma: 7, avatar: 'https://cdn.discordapp.com/attachments/661999012873764935/839327174892060697/EUGENE_shorter_neck.png' },
      { name: 'Frogmouth', class: 'Pirate', userId: 1, strength: 5, dexterity: 7, constitution: 5, intelligence: 6, wisdom: 6, charisma: 8, avatar: 'https://cdn.discordapp.com/attachments/487051902379622421/839608831528796220/unknown.png' }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Characters', null, {});
  }
};
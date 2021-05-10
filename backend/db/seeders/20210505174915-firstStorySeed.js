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
    return queryInterface.bulkInsert('Stories', [{
      userId: 2,
      title: `Waterville's Dragon Problem`,
      description: `The village of Waterville has a dragon problem that needs to be taken care of.`,
      thumbnail: `https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/02ad3cdc-5c23-4fd6-8901-41a3343277d1/d779dut-981c7400-3ea6-4b87-b447-f9aba0a1b034.png/v1/fill/w_1280,h_679,q_75,strp/medieval_house_1c___png_by_fumar_porros-d779dut.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl0sIm9iaiI6W1t7InBhdGgiOiIvZi8wMmFkM2NkYy01YzIzLTRmZDYtODkwMS00MWEzMzQzMjc3ZDEvZDc3OWR1dC05ODFjNzQwMC0zZWE2LTRiODctYjQ0Ny1mOWFiYTBhMWIwMzQucG5nIiwid2lkdGgiOiI8PTEyODAiLCJoZWlnaHQiOiI8PTY3OSJ9XV19.nJHaD669A3KjG7UobApJ-wdRrhP3dT57jYl2kAmORMw`,
      published: true,
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Stories', null, {});
  }
};

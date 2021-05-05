'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Characters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(30)
      },
      userId: {
        allowNull: false,
        references: { model: 'Users' },
        type: Sequelize.INTEGER
      },
      strength: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      dexterity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      constitution: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      intelligence: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      wisdom: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      charisma: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      avatar: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Characters');
  }
};
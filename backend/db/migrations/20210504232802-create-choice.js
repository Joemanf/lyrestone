'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Choices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      body: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      sceneId: {
        allowNull: false,
        references: { model: 'Scenes' },
        type: Sequelize.INTEGER
      },
      nextSceneId: {
        references: { model: 'Scenes' },
        type: Sequelize.INTEGER
      },
      isWinning: {
        type: Sequelize.BOOLEAN
      },
      killsPlayer: {
        allowNull: false,
        type: Sequelize.BOOLEAN
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
    return queryInterface.dropTable('Choices');
  }
};
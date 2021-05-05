'use strict';
module.exports = (sequelize, DataTypes) => {
  const Choice = sequelize.define('Choice', {
    body: DataTypes.STRING(50),
    sceneId: DataTypes.INTEGER,
    nextSceneId: DataTypes.INTEGER,
    isWinning: DataTypes.BOOLEAN,
    killsPlayer: DataTypes.BOOLEAN
  }, {});
  Choice.associate = function (models) {
    // associations can be defined here
    Choice.belongsTo(models.Scene, { foreignKey: 'sceneId' })
  };
  return Choice;
};
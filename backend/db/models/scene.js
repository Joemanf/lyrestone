'use strict';
module.exports = (sequelize, DataTypes) => {
  const Scene = sequelize.define('Scene', {
    storyId: DataTypes.INTEGER,
    title: DataTypes.STRING(50),
    body: DataTypes.TEXT,
    backgroundImg: DataTypes.TEXT,
    root: DataTypes.BOOLEAN,
  }, {});
  Scene.associate = function (models) {
    // associations can be defined here
    Scene.belongsTo(models.Story, { foreignKey: 'storyId' });
    Scene.hasMany(models.Choice, { foreignKey: 'sceneId' });
    Scene.belongsToMany(models.Scene, { // Come back to this
      through: "Choice",
      otherKey: "nextSceneId",
      foreignKey: "sceneId",
      as: "nextScene",
    });
  };
  return Scene;
};
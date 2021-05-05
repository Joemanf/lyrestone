'use strict';
module.exports = (sequelize, DataTypes) => {
  const Scene = sequelize.define('Scene', {
    storyId: DataTypes.INTEGER,
    title: DataTypes.STRING(50),
    body: DataTypes.TEXT,
    backgroundImg: DataTypes.TEXT
  }, {});
  Scene.associate = function (models) {
    // associations can be defined here
  };
  return Scene;
};
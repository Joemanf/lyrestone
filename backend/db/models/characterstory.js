'use strict';
module.exports = (sequelize, DataTypes) => {
  const CharacterStory = sequelize.define('CharacterStory', {
    characterId: DataTypes.INTEGER,
    storyId: DataTypes.INTEGER,
    startedAt: DataTypes.DATE,
    completedAt: DataTypes.DATE
  }, {});
  CharacterStory.associate = function (models) {
    // associations can be defined here
  };
  return CharacterStory;
};
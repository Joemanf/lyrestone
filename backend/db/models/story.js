'use strict';
module.exports = (sequelize, DataTypes) => {
  const Story = sequelize.define('Story', {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING(50),
    description: DataTypes.STRING(255),
    thumbnail: DataTypes.TEXT,
    published: DataTypes.BOOLEAN,
  }, {});
  Story.associate = function (models) {
    // associations can be defined here
    const columnMapping = {
      through: 'CharacterStory', // This is the model name referencing the join table.
      otherKey: 'characterId',
      foreignKey: 'storyId'
    }
    Story.belongsToMany(models.Character, columnMapping);
    Story.belongsTo(models.User, { foreignKey: 'userId' });
    Story.hasMany(models.Scene, { foreignKey: 'storyId' });
  };
  return Story;
};
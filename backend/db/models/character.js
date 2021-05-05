'use strict';
module.exports = (sequelize, DataTypes) => {
  const Character = sequelize.define('Character', {
    name: DataTypes.STRING(30),
    class: DataTypes.STRING(20),
    userId: DataTypes.INTEGER,
    strength: DataTypes.INTEGER,
    dexterity: DataTypes.INTEGER,
    constitution: DataTypes.INTEGER,
    intelligence: DataTypes.INTEGER,
    wisdom: DataTypes.INTEGER,
    charisma: DataTypes.INTEGER,
    avatar: DataTypes.TEXT
  }, {});
  Character.associate = function (models) {
    // associations can be defined here
    Character.belongsTo(models.User, { foreignKey: 'userId' });

    const columnMapping = {
      through: 'CharacterStory', // This is the model name referencing the join table.
      otherKey: 'storyId',
      foreignKey: 'characterId'
    }
    Character.belongsToMany(models.Story, columnMapping);
  };
  return Character;
};
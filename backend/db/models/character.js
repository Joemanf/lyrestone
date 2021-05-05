'use strict';
module.exports = (sequelize, DataTypes) => {
  const Character = sequelize.define('Character', {
    name: DataTypes.STRING(50),
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
  };
  return Character;
};
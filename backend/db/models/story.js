'use strict';
module.exports = (sequelize, DataTypes) => {
  const Story = sequelize.define('Story', {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING(50),
    description: DataTypes.STRING(255),
    thumbnail: DataTypes.TEXT
  }, {});
  Story.associate = function (models) {
    // associations can be defined here
  };
  return Story;
};
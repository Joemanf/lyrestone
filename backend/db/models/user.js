'use strict';
const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) { // This is checking if the username is an email
            throw new Error('Cannot be an email.');
          }
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256]
      },
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      },
    },
    avatar: {
      type: DataTypes.STRING,
    },
  }, {
    defaultScope: {
      attributes: { // Scope will exclude info for other users by default
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
      },
    },
    scopes: {
      currentUser: { // If the user is themselves then it will only exclude the password
        attributes: { exclude: ['hashedPassword'] },
      },
      loginUser: { //  Don't exclude anything if you're logging in, idiot
        attributes: {},
      },
    },
  });

  // Here's some methods
  // Turn it into a safe object
  User.prototype.toSafeObject = function () { // this cannot be an arrow function
    const { id, username, email } = this; // context is the User instance
    return { id, username, email };
  };

  // Validate the password
  User.prototype.validatePassword = function (password) {
    // Return a boolean:
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  // Find a user by its ID
  User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
  };

  // Log the user in by taking the username or email + the password
  // and returning the user associated with it
  User.login = async function ({ credential, password }) {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential,
        },
      },
    });
    if (user && user.validatePassword(password)) { // Validate that bad boy
      return await User.scope('currentUser').findByPk(user.id);
    }
  };

  // Sign up/Sign in
  User.signup = async function ({ username, email, password }) {
    const hashedPassword = bcrypt.hashSync(password); // https://www.simplyrecipes.com/thmb/-MJYxdPkePqM7Hm6ovywhlHtDrg=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2009__03__corned-beef-hash-vertical-a-1200-4118a5d536764c9585c149e77ebb663c.jpg
    // Do you have any idea how far into google I had to go to not find drugs?
    // I didn't even know hash was a drug
    const user = await User.create({
      username,
      email,
      hashedPassword,
    });
    return await User.scope('currentUser').findByPk(user.id);
  };



  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Character, { foreignKey: 'userId' });
    User.hasMany(models.Story, { foreignKey: 'userId' });
  };
  return User;
};
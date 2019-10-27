'use strict';
module.exports = (sequelize, DataTypes) => {
  const User_ = sequelize.define('User_', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    bloodGroup: DataTypes.STRING,
    lg: DataTypes.STRING,
    document: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User_.associate = function(models) {
    // associations can be defined here
  };
  return User_;
};
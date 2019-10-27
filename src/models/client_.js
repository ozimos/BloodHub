'use strict';
module.exports = (sequelize, DataTypes) => {
  const Client_ = sequelize.define('Client_', {
    email: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    otp: DataTypes.STRING
  }, {});
  Client_.associate = function(models) {
    // associations can be defined here
  };
  return Client_;
};
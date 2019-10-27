'use strict';
module.exports = (sequelize, DataTypes) => {
  const Request = sequelize.define('Request', {
    requesterId: DataTypes.INTEGER,
    responded: DataTypes.BOOLEAN,
    donorId: DataTypes.INTEGER
  }, {});
  Request.associate = function(models) {
    // associations can be defined here
  };
  return Request;
};
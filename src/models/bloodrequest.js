'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bloodrequest = sequelize.define('Bloodrequest', {
    requester: DataTypes.INTEGER,
    blood_group: DataTypes.STRING,
    hospital: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {});
  Bloodrequest.associate = function(models) {
    // associations can be defined here
  };
  return Bloodrequest;
};
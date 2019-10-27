'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bloodrequest = sequelize.define('Bloodrequest', {
    requester: DataTypes.INTEGER,
    blood_group: DataTypes.STRING,
    hospital: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    donor_match: DataTypes.INTEGER
  }, {});
  Bloodrequest.associate = function(models) {
    // associations can be defined here
  };
  return Bloodrequest;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Hospital = sequelize.define('Hospital', {
    name: DataTypes.STRING,
    street: DataTypes.STRING,
    lg: DataTypes.STRING,
    state: DataTypes.STRING,
  }, {});
  Hospital.associate = function(models) {
    // associations can be defined here
    Hospital.hasMany(models.Bloodrequests)
  };
  return Hospital;
};
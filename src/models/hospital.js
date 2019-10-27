'use strict';
module.exports = (sequelize, DataTypes) => {
  const Hospital = sequelize.define('Hospital', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    lg: DataTypes.STRING
  }, {});
  Hospital.associate = function(models) {
    // associations can be defined here
  };
  return Hospital;
};
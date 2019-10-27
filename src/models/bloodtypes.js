'use strict';
module.exports = (sequelize, DataTypes) => {
  const BloodTypes = sequelize.define('BloodTypes', {
    bloodType: DataTypes.STRING
  }, {});
  BloodTypes.associate = function(models) {
    // associations can be defined here
  };
  return BloodTypes;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bloodrequest = sequelize.define('Bloodrequest', {
    requesterId: DataTypes.INTEGER,
    bloodGroup:  DataTypes.ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
    hospitalId: DataTypes.INTEGER,
    status: DataTypes.ENUM('pending', 'matched', 'reprocessing', 'failed', 'success')
  }, {});
  Bloodrequest.associate = function(models) {
    // associations can be defined here
    Bloodrequest.belongsTo(models.Hospital)
    Bloodrequest.belongsTo(models.User)
  };
  return Bloodrequest;
};
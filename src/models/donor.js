"use strict";
module.exports = (sequelize, DataTypes) => {
  const Donor = sequelize.define(
    "Donor",
    {
      userId: DataTypes.INTEGER,
      document: DataTypes.STRING,
      bloodGroup: DataTypes.STRING
    },
    {}
  );
  Donor.associate = function(models) {
    // associations can be defined here
    Donor.belongsTo(models.User, {as: 'user'});
  };
  return Donor;
};

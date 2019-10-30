import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Donor extends Model {
    static associate(models) {
      this.belongsTo(models.User, { as: "user", foreignKey: "userId" });
    }
  }

  Donor.init(
    {
      userId: DataTypes.INTEGER,
      document: DataTypes.STRING,
      bloodGroup: DataTypes.STRING
    },
    { sequelize, modelName: "Donor" }
  );

  return Donor;
};

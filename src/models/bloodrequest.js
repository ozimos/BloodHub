import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Bloodrequest extends Model {
    static associate(models) {
      this.belongsTo(models.Hospital, {
        foreignKey: "hospitalId",
        as: "hospital"
      });
      this.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    }
  }

  Bloodrequest.init(
    {
      requesterId: DataTypes.INTEGER,
      bloodGroup: DataTypes.ENUM(
        "A+",
        "A-",
        "B+",
        "B-",
        "AB+",
        "AB-",
        "O+",
        "O-"
      ),
      hospitalId: DataTypes.INTEGER,
      status: DataTypes.ENUM(
        "pending",
        "matched",
        "reprocessing",
        "failed",
        "success"
      )
    },
    { sequelize, modelName: "Bloodrequest" }
  );

  return Bloodrequest;
};

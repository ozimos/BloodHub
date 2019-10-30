import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Hospital extends Model {
    static associate(models) {
      this.hasMany(models.Bloodrequest);
    }
  }

  Hospital.init(
    {
      name: DataTypes.STRING,
      street: DataTypes.STRING,
      lg: DataTypes.STRING,
      state: DataTypes.STRING
    },
    { sequelize, modelName: "Hospital" }
  );

  return Hospital;
};

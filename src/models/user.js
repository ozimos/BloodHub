import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {

  class User extends Model {
    static associate(models) {
      this.hasMany(models.Bloodrequest, {foreignKey: 'userId', as: 'requests'})
      this.hasOne(models.Donor, {foreignKey: 'userId', as: 'donor', onDelete: 'CASCADE'})
    };
  }

  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    street: DataTypes.STRING,
    lg: DataTypes.STRING,
    state: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {sequelize, modelName: 'User'});

  return User;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Grade, { foreignKey: 'userId' });
      User.belongsToMany(models.Subject, { through: models.User_Subject, foreignKey: 'id' });
      User.belongsToMany(models.Clasroom, { through: models.Classroom_User, foreignKey: 'id' });
      User.hasMany(models.Attendance, { foreignKey: 'userId' });
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    SDT: DataTypes.STRING,
    DoB: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    type: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
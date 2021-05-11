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
      User.belongsToMany(models.Classroom, { through: models.Classroom_User, foreignKey: 'userId' });
      User.belongsToMany(models.Attendance, { through: models.Attendance_User, foreignKey: 'userId' });
      //User.hasOne(models.Account, { foreignKey: 'userId' });
      User.hasMany(models.Grade, { foreignKey: 'userId' });
      User.hasMany(models.Callendar, { foreignKey: 'userId' });
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    SDT: DataTypes.STRING,
    DoB: DataTypes.STRING,
    type: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
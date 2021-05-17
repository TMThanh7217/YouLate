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
      User.belongsToMany(models.Event, { through: models.Event_User, foreignKey: 'userId' });
      User.belongsTo(models.Account, { foreignKey: 'accountId' });
      User.hasMany(models.Grade, { foreignKey: 'userId' });
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    SDT: DataTypes.STRING,
    DoB: DataTypes.STRING,
    accountId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
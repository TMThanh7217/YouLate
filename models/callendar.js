'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Callendar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Callendar.belongsTo(models.User, { foreignKey: 'userId' });
      Callendar.hasMany(models.Event, { foreignKey: 'callendarId' });
    }
  };
  Callendar.init({
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Callendar',
  });
  return Callendar;
};
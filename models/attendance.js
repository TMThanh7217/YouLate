'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Attendance.init({
    type: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    classroomId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Attendance',
  });
  return Attendance;
};
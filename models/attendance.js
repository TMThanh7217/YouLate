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
      Attendance.hasMany(models.Classroom, { foreignKey: 'classroomId' });
      Attendance.belongsToMany(models.User, { through: models.Attendance_User, foreignKey: 'attendanceId' });
    }
  };
  Attendance.init({
    date: DataTypes.STRING,
    classroomId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Attendance',
  });
  return Attendance;
};
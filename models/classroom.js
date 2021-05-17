'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Classroom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Classroom.belongsToMany(models.User, { through: models.Classroom_User, foreignKey: 'classroomId' }, { onDelete: 'CASCADE' });
      Classroom.belongsTo(models.Event, { foreignKey: 'classroomId' }, { onDelete: 'CASCADE' });
      Classroom.hasMany(models.Course, { foreignKey: 'courseId' }, { onDelete: 'CASCADE' });
      Classroom.hasMany(models.Grade, { foreignKey: 'classroomId' }, { onDelete: 'CASCADE' });
    }
  };
  Classroom.init({
    name: DataTypes.STRING,
    startDate: DataTypes.STRING,
    endDate: DataTypes.STRING,
    course: DataTypes.STRING,
    status: DataTypes.STRING,
    hours: DataTypes.INTEGER,
    courseId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Classroom',
  });
  return Classroom;
};
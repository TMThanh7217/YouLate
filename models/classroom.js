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
      Classroom.belongsToMany(models.Subject, { through: models.Classroom_Subject, foreignKey: 'id' });
      Classroom.belongsToMany(models.User, { through: models.Classroom_User, foreignKey: 'id' });
      Classroom.hasMany(models.Attendance, { foreignKey: 'classroomId' });
    }
  };
  Classroom.init({
    name: DataTypes.STRING,
    date: DataTypes.STRING,
    topic: DataTypes.STRING,
    status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Classroom',
  });
  return Classroom;
};
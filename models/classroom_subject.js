'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Classroom_Subject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Classroom_Subject.init({
    classroomId: DataTypes.INTEGER,
    subjectId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Classroom_Subject',
  });
  return Classroom_Subject;
};
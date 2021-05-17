'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.belongsTo(models.Classroom, { foreignKey: 'courseId' }, { onDelete: 'CASCADE' });
    }
  };
  Course.init({
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    description: DataTypes.STRING,
    topic: DataTypes.STRING,
    status: DataTypes.STRING,
    courseLine: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};
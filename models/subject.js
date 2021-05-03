'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Subject.belongsToMany(models.Classroom, { through: models.Classroom_Subject });
      Subject.hasMany(models.Grade, { foreignKey: 'subjectId' });
      Subject.belongsToMany(models.User, { through: models.User_Subject });
    }
  };
  Subject.init({
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Subject',
  });
  return Subject;
};
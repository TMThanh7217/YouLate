'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Grade extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Grade.belongsTo(models.Classroom, { foreignKey: 'classroomId' });
      Grade.belongsTo(models.User, { foreignKey: 'userId' });
    }
  };
  Grade.init({
    userId: DataTypes.INTEGER,
    classroomId: DataTypes.INTEGER,
    total: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Grade',
  });
  return Grade;
};
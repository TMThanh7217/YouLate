'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.belongsTo(models.Classroom, { foreignKey: 'classroomId' }, { onDelete: 'CASCADE' });
      Event.belongsToMany(models.User, { through: models.Event_User, foreignKey: 'eventId' }, { onDelete: 'CASCADE' });
    }
  };
  Event.init({
    date: DataTypes.STRING,
    startTime: DataTypes.STRING,
    endTime: DataTypes.STRING,
    title: DataTypes.STRING,
    classroomId: DataTypes.INTEGER,
    edit: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};
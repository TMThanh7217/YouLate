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
      Event.belongsToMany(models.Classroom, { through: models.Classroom_Event, foreignKey: 'eventId' });
      Event.belongsToMany(models.User, { through: models.Event_User, foreignKey: 'eventId' });
    }
  };
  Event.init({
    date: DataTypes.STRING,
    startTime: DataTypes.STRING,
    endTime: DataTypes.STRING,
    title: DataTypes.STRING,
    callendarId: DataTypes.INTEGER,
    classroomId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};
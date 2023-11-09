const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const Course = require("./course");
const Theme = require("./theme");
const User = require("./user");

const Quiz = sequelize.define("Quiz", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  questions: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

Theme.hasMany(Quiz);
Quiz.belongsTo(Theme);

Course.hasMany(Quiz);
Quiz.belongsTo(Course);

User.hasMany(Quiz);
Quiz.belongsTo(User);

module.exports = Quiz;

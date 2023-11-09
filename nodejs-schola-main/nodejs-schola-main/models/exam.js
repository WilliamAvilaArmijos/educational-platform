const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");
const Course = require("./course");

const User = require("./user");

const Exam = sequelize.define("Exam", {
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

Course.hasMany(Exam);
Exam.belongsTo(Course);

User.hasMany(Exam);
Exam.belongsTo(User);

module.exports = Exam;

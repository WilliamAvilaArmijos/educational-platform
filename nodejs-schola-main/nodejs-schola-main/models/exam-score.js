const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const Exam = require("./exam");
const User = require("./user");

const ExamScore = sequelize.define("ExamScore", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  score: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  responses: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

Exam.hasMany(ExamScore);
ExamScore.belongsTo(Exam);

User.hasMany(ExamScore);
ExamScore.belongsTo(User);

module.exports = ExamScore;

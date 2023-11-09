const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const Quiz = require("./quiz");
const User = require("./user");

const QuizScore = sequelize.define("QuizScore", {
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

Quiz.hasMany(QuizScore);
QuizScore.belongsTo(Quiz);

User.hasMany(QuizScore);
QuizScore.belongsTo(User);

module.exports = QuizScore;

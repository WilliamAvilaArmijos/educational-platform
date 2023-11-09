const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const User = require("../models/user");
const Section = require("../models/section");

const Comment = sequelize.define(
  "Comment",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

User.hasMany(Comment);
Comment.belongsTo(User);

Section.hasMany(Comment);
Comment.belongsTo(Section);

module.exports = Comment;

const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const Theme = require("./theme");

const Section = sequelize.define("Section", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  videoUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

Theme.hasMany(Section);
Section.belongsTo(Theme);

module.exports = Section;

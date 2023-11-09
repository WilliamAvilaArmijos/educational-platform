const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const Course = require("./course");

const Theme = sequelize.define("Theme", {
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
});

Course.hasMany(Theme);
Theme.belongsTo(Course);

module.exports = Theme;

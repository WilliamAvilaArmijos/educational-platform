const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const User = require("./user");
const Course = require("./course");

const Subscription = sequelize.define("Subscription", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  subtotal: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  iva: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasMany(Subscription);
Subscription.belongsTo(User);

Course.hasMany(Subscription);
Subscription.belongsTo(Course);

module.exports = Subscription;

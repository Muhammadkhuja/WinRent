const sequelize = require("../config/db");

const { DataTypes } = require("sequelize");

const Category = sequelize.define(
  "category",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    about: { type: DataTypes.TEXT, allowNull: false },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Category;

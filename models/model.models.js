const sequelize = require("../config/db");

const { DataTypes } = require("sequelize");
const Category = require("./category.models");

const Model = sequelize.define(
  "model",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    brand: { type: DataTypes.STRING, allowNull: false },
    describtion: { type: DataTypes.STRING, allowNull: false }
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Model.belongsTo(Category);
Category.hasMany(Model);

module.exports = Model;

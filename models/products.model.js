const sequelize = require("../config/db");

const { DataTypes } = require("sequelize");
const Owner = require("./owner.models");
const Model = require("./model.models");

const Products = sequelize.define(
  "products",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DECIMAL(8, 2), allowNull: false },
    status: {
      type: DataTypes.ENUM("paid", "unpaid", "process", "canceled"),
      allowNull: true,
    },
    created_at: { type: DataTypes.DATE, allowNull: false },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Products.belongsTo(Owner);
Owner.hasMany(Products);

Products.belongsTo(Model);
Model.hasMany(Products);

module.exports = Products;

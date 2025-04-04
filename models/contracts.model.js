const sequelize = require("../config/db");

const { DataTypes } = require("sequelize");
const User = require("./user.models");
const Products = require("./products.model");
const Status = require("./status.model");

const Contracts = sequelize.define(
  "contracts",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    start_at: { type: DataTypes.DATE, allowNull: false },
    end_at: { type: DataTypes.DATE, allowNull: false },
    created_at: { type: DataTypes.BIGINT, allowNull: false },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
Contracts.belongsTo(User);
User.hasMany(Contracts);

Contracts.belongsTo(Products);
Products.hasMany(Contracts);

Contracts.belongsTo(Status);
Status.hasMany(Contracts);

module.exports = Contracts;

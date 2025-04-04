const sequelize = require("../config/db");

const { DataTypes } = require("sequelize");
const Contracts = require("./contracts.model");

const RentalPeriods = sequelize.define(
  "rentalPeriods",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    start_at: { type: DataTypes.DATE, allowNull: false },
    end_at: { type: DataTypes.DATE, allowNull: false },
    daysum: { type: DataTypes.BIGINT, allowNull: false },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

RentalPeriods.belongsTo(Contracts);
Contracts.hasMany(RentalPeriods);

module.exports = RentalPeriods;

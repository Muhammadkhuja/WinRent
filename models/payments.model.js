const sequelize = require("../config/db");

const { DataTypes } = require("sequelize");
const Contracts = require("./contracts.model");

const Payment = sequelize.define(
  "payment",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    amount: { type: DataTypes.DECIMAL(8, 2), allowNull: false },
    payment: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.ENUM("paid", "unpaid", "process", "canceled"), allowNull: true },
    payment_date: { type: DataTypes.DATE, allowNull: false },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Payment.belongsTo(Contracts);
Contracts.hasMany(Payment);

module.exports = Payment;

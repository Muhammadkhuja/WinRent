const sequelize = require("../config/db");

const { DataTypes } = require("sequelize");

const Status = sequelize.define(
  "status",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    entry_type: {
      type: DataTypes.ENUM("paid", "unpaid", "process", "canceled", "invalid"),
      allowNull: true,
    },
    status: { type: DataTypes.STRING, allowNull: false },
    update_at: { type: DataTypes.BIGINT, allowNull: false },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);


module.exports = Status;

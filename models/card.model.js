const sequelize = require("../config/db");

const { DataTypes } = require("sequelize");
const User = require("./user.models");

const Card = sequelize.define(
  "card",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    number: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    card_holeder: { type: DataTypes.STRING, allowNull: false },
    card_type: { type: DataTypes.STRING, allowNull: false },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Card.belongsTo(User);
User.hasMany(Card);

module.exports = Card;

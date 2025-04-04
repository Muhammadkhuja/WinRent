const { errorHandler } = require("../helpers/error_handler");
const Card = require("../models/card.model");
const User = require("../models/user.models");
const addNewCard = async (req, res) => {
  try {
    const { number, date, card_holeder, card_type, userId } = req.body;
    const newCard = await Card.create({
      number,
      date,
      card_holeder,
      card_type,
      userId,
    });
    res.status(200).send({ message: "New card added", newCard });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findAllCards = async (req, res) => {
  try {
    const cards = await Card.findAll({include: [User]});
    res.status(200).send({ message: "Cards found", cards });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findByIdCard = async (req, res) => {
  try {
    const { id } = req.params;
    const card = await Card.findByPk(id);
    res.status(200).send({ card });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateCard = async (req, res) => {
  try {
    const { id } = req.params;
    const { number, date, card_holeder, card_type, userId } = req.body;
    const updatedCard = await Card.update(
      { number, date, card_holeder, card_type, userId },
      { where: { id }, returning: true }
    );
    res.status(200).send({ updatedCard: updatedCard[1][0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteCard = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCard = await Card.destroy({ where: { id } });
    res.status(200).send({ deletedCard });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewCard,
  findAllCards,
  findByIdCard,
  updateCard,
  deleteCard,
};

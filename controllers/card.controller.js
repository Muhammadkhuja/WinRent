const { errorHandler } = require("../helpers/error_handler");
const Card = require("../models/card.model");
const User = require("../models/user.models");
const { cardValidation } = require("../validation/card.validation");
const addNewCard = async (req, res) => {
  try {
    const { error, value } = cardValidation(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const { number, date, card_holeder, card_type, userId } = value;
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
    const { error, value } = cardValidation(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const { number, date, card_holeder, card_type, userId } = value;
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

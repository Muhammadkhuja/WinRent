const { errorHandler } = require("../helpers/error_handler");
const Contracts = require("../models/contracts.model");
const Products = require("../models/products.model");
const Status = require("../models/status.model");
const User = require("../models/user.models");
const { contractValidation } = require("../validation/contracts.validation");

const addNewContract = async (req, res) => {
  try {
    const { error, value } = contractValidation(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const { userId, productId, statusId, start_at, end_at, created_at } =
      value;
    const newContract = await Contracts.create({
      userId,
      productId,
      statusId,
      start_at,
      end_at,
      created_at,
    });
    res.status(200).send({ message: "New contract added", newContract });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findAllContracts = async (req, res) => {
  try {
    const contracts = await Contracts.findAll({include: [User, Products, Status]});
    res.status(200).send({ message: "Contracts found", contracts });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findByIdContract = async (req, res) => {
  try {
    const { id } = req.params;
    const contract = await Contracts.findByPk(id);
    res.status(200).send({ contract });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateContract = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = contractValidation(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    value = { userId, productId, statusId, start_at, end_at, created_at } =
      req.body;
    const updatedContract = await Contracts.update(
      { userId, productId, statusId, start_at, end_at, created_at },
      { where: { id }, returning: true }
    );
    res.status(200).send({ updatedContract: updatedContract[1][0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteContract = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContract = await Contracts.destroy({ where: { id } });
    res.status(200).send({ deletedContract });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewContract,
  findAllContracts,
  findByIdContract,
  updateContract,
  deleteContract,
};

const { errorHandler } = require("../helpers/error_handler");
const Status = require("../models/status.model");
const { statusValidation } = require("../validation/status.validation");

const addNewStatus = async (req, res) => {
  try {
    const { error, value } = statusValidation(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const { entry_type, entry_id, status, update_at } = value;
    const newStatus = await Status.create({
      entry_type,
      entry_id,
      status,
      update_at,
    });
    res.status(200).send({ message: "New status added", newStatus });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findAllStatus = async (req, res) => {
  try {
    const statuses = await Status.findAll();
    res.status(200).send({ message: "Statuses found", statuses });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findByIdStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const status = await Status.findByPk(id);
    if (!status) {
      return res.status(400).send({ message: "Foydlanuvchi yo'gu qaren e" });
    }
    res.status(200).send({ status });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = statusValidation(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const { entry_type, entry_id, status, update_at } = value;
    const updatedStatus = await Status.update(
      { entry_type, entry_id, status, update_at },
      { where: { id }, returning: true }
    );
    if (!updatedStatus) {
      return res.status(400).send({ message: "Foydlanuvchi yo'gu qaren e" });
    }
    res.status(200).send({ updatedStatus: updatedStatus[1][0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStatus = await Status.destroy({ where: { id } });
    if (!deletedStatus) {
      return res.status(400).send({ message: "Foydlanuvchi yo'gu qaren e" });
    }
    res.status(200).send({ deletedStatus });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewStatus,
  findAllStatus,
  findByIdStatus,
  updateStatus,
  deleteStatus,
};

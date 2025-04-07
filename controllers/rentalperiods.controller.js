const { errorHandler } = require("../helpers/error_handler");
const Contracts = require("../models/contracts.model");
const RentalPeriods = require("../models/rentalPeriods.model");
const { rentalperiodsValidation } = require("../validation/rentalperiods.validation");

const addNewRentalPeriod = async (req, res) => {
  try {
    const { error, value } = rentalperiodsValidation(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const { contractId, start_at, end_at, daysum } = value;
    const newRentalPeriod = await RentalPeriods.create({
      contractId,
      start_at,
      end_at,
      daysum,
    });
    res
      .status(200)
      .send({ message: "New rental period added", newRentalPeriod });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findAllRentalPeriods = async (req, res) => {
  try {
    const rentalPeriods = await RentalPeriods.findAll({include: [Contracts]});
    res.status(200).send({ message: "Rental periods found", rentalPeriods });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findByIdRentalPeriod = async (req, res) => {
  try {
    const { id } = req.params;
    const rentalPeriod = await RentalPeriods.findByPk(id);
    res.status(200).send({ rentalPeriod });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateRentalPeriod = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = rentalperiodsValidation(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const { contractId, start_at, end_at, daysum } = value;
    const updatedRentalPeriod = await RentalPeriods.update(
      { contractId, start_at, end_at, daysum },
      { where: { id }, returning: true }
    );
    res.status(200).send({ updatedRentalPeriod: updatedRentalPeriod[1][0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteRentalPeriod = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRentalPeriod = await RentalPeriods.destroy({ where: { id } });
    res.status(200).send({ deletedRentalPeriod });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewRentalPeriod,
  findAllRentalPeriods,
  findByIdRentalPeriod,
  updateRentalPeriod,
  deleteRentalPeriod,
};

const { errorHandler } = require("../helpers/error_handler");
const Contracts = require("../models/contracts.model");
const Payments = require("../models/payments.model");

const addNewPayment = async (req, res) => {
  try {
    const { contractId, amount, payment, status, payment_date } = req.body;
    const newPayment = await Payments.create({
      contractId,
      amount,
      payment,
      status,
      payment_date,
    });
    res.status(200).send({ message: "New payment added", newPayment });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findAllPayments = async (req, res) => {
  try {
    const payments = await Payments.findAll({include: [Contracts]});
    res.status(200).send({ message: "Payments found", payments });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findByIdPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payments.findByPk(id);
    res.status(200).send({ payment });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { contractId, amount, payment, status, payment_date } = req.body;
    const updatedPayment = await Payments.update(
      { contractId, amount, payment, status, payment_date },
      { where: { id }, returning: true }
    );
    res.status(200).send({ updatedPayment: updatedPayment[1][0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPayment = await Payments.destroy({ where: { id } });
    res.status(200).send({ deletedPayment });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewPayment,
  findAllPayments,
  findByIdPayment,
  updatePayment,
  deletePayment,
};

const { errorHandler } = require("../helpers/error_handler");
const Category = require("../models/category.models");
const Contracts = require("../models/contracts.model");
const Model = require("../models/model.models");
const Owner = require("../models/owner.models");
const Payments = require("../models/payments.model");
const Products = require("../models/products.model");
const User = require("../models/user.models");
const { paymentsValidation } = require("../validation/paymemt.validation");

const addNewPayment = async (req, res) => {
  try {const { error, value } = paymentsValidation(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

    const { contractId, amount, payment, status, payment_date } = value;
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
    const { error, value } = paymentsValidation(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const { contractId, amount, payment, status, payment_date } = value;
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
const getClientPayments = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).send({ message: "userId kiritilmagan" });
    }

    const payments = await Payments.findAll({
      include: [
        {
          model: Contracts,
          where: { userId: userId }, // to‘g‘ri ustun nomi: user_id
          include: [
            {
              model: User,
              attributes: ["full_name", "email"],
            },
            {
              model: Products,
              attributes: ["name"],
              include: [
                {
                  model: Owner,
                  attributes: ["full_name"],
                },
                {
                  model: Model,
                  include: [
                    {
                      model: Category,
                      attributes: ["name"],
                    },
                  ],
                  attributes: [],
                },
              ],
            },
          ],
          attributes: [],
        },
      ],
      attributes: ["amount", "payment_date"],
      raw: true,
    });

    const formatted = payments.map((p) => ({
      client_name: p["contract.user.full_name"],
      category_name: p["contract.product.model.category.name"],
      product_name: p["contract.product.name"],
      owner_name: p["contract.product.owner.full_name"],
      amount: p.amount,
      payment_date: p.payment_date,
    }));

    res.status(200).send({ payments: formatted });
  } catch (error) {
    errorHandler(error, res);
  }
};



module.exports = {
  getClientPayments,
  addNewPayment,
  findAllPayments,
  findByIdPayment,
  updatePayment,
  deletePayment,
};

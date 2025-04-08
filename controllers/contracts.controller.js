const { errorHandler } = require("../helpers/error_handler");
const Category = require("../models/category.models");
const Contracts = require("../models/contracts.model");
const Model = require("../models/model.models");
const Owner = require("../models/owner.models");
const Products = require("../models/products.model");
const Status = require("../models/status.model");
const User = require("../models/user.models");
const { contractValidation } = require("../validation/contracts.validation");
const { Op } = require("sequelize");

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

    const { userId, productId, statusId, start_at, end_at, created_at } =
      value;
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




const getRentedProducts = async (req, res) => {
  try {
    const { start_at, end_at } = req.body;

    const rented = await Contracts.findAll({
      where: {
        start_at: {
          [Op.gte]: start_at,
        },
        end_at: {
          [Op.lte]: end_at,
        },
      },
      include: [
        {
          model: Products,
          attributes: ["id", "name"],
        },
      ],
      attributes: ["start_at", "end_at"],
    });

    res.status(200).send({ rented });
  } catch (error) {
    errorHandler(error, res);
  }
};


const getCancelledClients = async (req, res) => {
  try {
    const { start_at, end_at } = req.body;

    const cancelledClients = await Contracts.findAll({
      where: {
        start_at: {
          [Op.between]: [start_at, end_at],
        },
      },
      include: [
        {
          model: User,
          attributes: ["id", "full_name"],
        },
        {
          model: Products,
          attributes: ["name"],
        },
        {
          model: Status,
          where: { entry_type: "canceled" },
          attributes: ["status"],
        },
      ],
      attributes: ["start_at"],
      distinct: true,
    });

    res.status(200).send({ cancelledClients });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getDamagedClients = async (req, res) => {
  try {
    const { start_at, end_at } = req.body;

    const damagedClients = await Contracts.findAll({
      where: {
        end_at: {
          [Op.between]: [start_at, end_at],
        },
      },
      include: [
        {
          model: User,
          attributes: ["id", "full_name"],
        },
        {
          model: Products,
          attributes: ["name"],
        },
        {
          model: Status,
          where: { entry_type: "invalid" },
          attributes: ["entry_type"],
        },
      ],
      attributes: ["end_at"],
      distinct: true,
    });

    res.status(200).send({ damagedClients });
  } catch (error) {
    errorHandler(error, res);
  }
};



const { fn, col } = require("sequelize");

const getTopOwnersByCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;

    const topOwners = await Contracts.findAll({
      include: [
        {
          model: Products,
          attributes: [],
          include: [
            {
              model: Model,
              attributes: [],
              include: [
                {
                  model: Category,
                  where: { name: categoryName },
                  attributes: [],
                },
              ],
            },
            {
              model: Owner,
              attributes: ["id", "full_name"],
            },
          ],
        },
      ],
      attributes: [
        [col("product.owner.id"), "owner_id"],
        [col("product.owner.full_name"), "full_name"],
        [fn("COUNT", "*"), "rental_count"],
      ],
      group: ["product.owner.id", "product.owner.full_name"],
      order: [[fn("COUNT", "*"), "DESC"]],
      raw: true,
    });

    res.status(200).json({ topOwners });
  } catch (error) {
    errorHandler(error, res);
  }
};




module.exports = {
  getTopOwnersByCategory,
  getDamagedClients,
  getCancelledClients,
  getRentedProducts,
  addNewContract,
  findAllContracts,
  findByIdContract,
  updateContract,
  deleteContract,
};

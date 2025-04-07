const { errorHandler } = require("../helpers/error_handler");
const Model = require("../models/model.models");
const Owner = require("../models/owner.models");
const Products = require("../models/products.model");
const { productsValidation } = require("../validation/product.validation");

const addNewProduct = async (req, res) => {
  try {
    const { error, value } = productsValidation(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const  { ownerId, modelId, name, price, status, created_at } = value;
    const newProduct = await Products.create({
      ownerId,
      modelId,
      name,
      price,
      status,
      created_at,
    });
    res.status(200).send({ message: "New product added", newProduct });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findAllProducts = async (req, res) => {
  try {
    const products = await Products.findAll({include: [Owner, Model]});
    res.status(200).send({ message: "Products found", products });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findByIdProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Products.findByPk(id);
    res.status(200).send({ product });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = productsValidation(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const  { ownerId, modelId, name, price, status, created_at } = value;
    const updatedProduct = await Products.update(
      { ownerId, modelId, name, price, status, created_at },
      { where: { id }, returning: true }
    );
    res.status(200).send({ updatedProduct: updatedProduct[1][0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Products.destroy({ where: { id } });
    res.status(200).send({ deletedProduct });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewProduct,
  findAllProducts,
  findByIdProduct,
  updateProduct,
  deleteProduct,
};

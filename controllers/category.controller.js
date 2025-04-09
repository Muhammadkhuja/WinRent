const { errorHandler } = require("../helpers/error_handler");
const Category = require("../models/category.models");
const { categoryValidation } = require("../validation/category.validation");

const addNewCategory = async (req, res) => {
  try {
    const { error, value } = categoryValidation(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const { name, about } = value;
    const newCategory = await Category.create({
      name,
      about,
    });
    res.status(200).send({ message: "New category added", newCategory });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).send({ message: "Categories found", categories });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findByIdCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(400).send({ message: "Foydlanuvchi yo'gu qaren e" });
    }
    res.status(200).send({ category });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = categoryValidation(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const { name, about } = value;
    const updatedCategory = await Category.update(
      { name, about },
      { where: { id }, returning: true }
    );
    if (!updatedCategory) {
      return res.status(400).send({ message: "Foydlanuvchi yo'gu qaren e" });
    }
    res.status(200).send({ updatedCategory: updatedCategory[1][0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.destroy({ where: { id } });
    if (!deletedCategory) {
      return res.status(400).send({ message: "Foydlanuvchi yo'gu qaren e" });
    }
    res.status(200).send({ deletedCategory });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewCategory,
  findAllCategories,
  findByIdCategory,
  updateCategory,
  deleteCategory,
};

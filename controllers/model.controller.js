const { errorHandler } = require("../helpers/error_handler");
const Category = require("../models/category.models");
const Model = require("../models/model.models");
const { modelValidation } = require("../validation/model.validation");

const addNewModel = async (req, res) => {
  try {
    const { error, value } = modelValidation(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const { categoryId, name, brand, describtion } = value;
    const newModel = await Model.create({
      categoryId,
      name,
      brand,
      describtion,
    });
    res.status(200).send({ message: "New model added", newModel });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findAllModels = async (req, res) => {
  try {
    const models = await Model.findAll({include: [Category]});
    res.status(200).send({ message: "Models found", models });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findByIdModel = async (req, res) => {
  try {
    const { id } = req.params;
    const model = await Model.findByPk(id);
    res.status(200).send({ model });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateModel = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = modelValidation(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const { categoryId, name, brand, describtion } = value;
    const updatedModel = await Model.update(
      { categoryId, name, brand, describtion },
      { where: { id }, returning: true }
    );
    res.status(200).send({ updatedModel: updatedModel[1][0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteModel = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedModel = await Model.destroy({ where: { id } });
    res.status(200).send({ deletedModel });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewModel,
  findAllModels,
  findByIdModel,
  updateModel,
  deleteModel,
};

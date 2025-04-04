const { errorHandler } = require("../helpers/error_handler");
const Category = require("../models/category.models");
const Model = require("../models/model.models");

const addNewModel = async (req, res) => {
  try {
    const { categoryId, name, brand, describtion } = req.body;
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
    const { categoryId, name, brand, describtion } = req.body;
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

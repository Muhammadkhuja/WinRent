const { errorHandler } = require("../helpers/error_handler");
const Owner = require("../models/owner.models");

const addNewOwner = async (req, res) => {
  try {
    const { full_name, phone, email, address, created_at, refresh_token } =
      req.body;
    const newOwner = await Owner.create({
      full_name,
      phone,
      email,
      address,
      created_at,
      refresh_token,
    });
    res.status(200).send({ message: "New owner added", newOwner });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findAllOwners = async (req, res) => {
  try {
    const owners = await Owner.findAll();
    res.status(200).send({ message: "Owners found", owners });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findByIdOwner = async (req, res) => {
  try {
    const { id } = req.params;
    const owner = await Owner.findByPk(id);
    res.status(200).send({ owner });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateOwner = async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name, phone, email, address, created_at, refresh_token } =
      req.body;
    const updatedOwner = await Owner.update(
      {
        full_name,
        phone,
        email,
        address,
        created_at,
        refresh_token,
      },
      { where: { id }, returning: true }
    );
    res.status(200).send({ updatedOwner: updatedOwner[1][0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteOwner = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOwner = await Owner.destroy({ where: { id } });
    res.status(200).send({ deletedOwner });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewOwner,
  findAllOwners,
  findByIdOwner,
  updateOwner,
  deleteOwner,
};

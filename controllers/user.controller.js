const { errorHandler } = require("../helpers/error_handler");
const User = require("../models/user.models");

const addNewUser = async (req, res) => {
  try {
    const {
      full_name,
      passport,
      phone,
      email,
      address,
      registered_ar,
      refresh_token,
    } = req.body;
    const newUser = await User.create({
      full_name,
      passport,
      phone,
      email,
      address,
      registered_ar,
      refresh_token,
    });
    res.status(200).send({ message: "New user added", newUser });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).send({ message: "Users found", users });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findByIdUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    res.status(200).send({ user });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      full_name,
      passport,
      phone,
      email,
      address,
      registered_ar,
      refresh_token,
    } = req.body;
    const updatedUser = await User.update(
      {
        full_name,
        passport,
        phone,
        email,
        address,
        registered_ar,
        refresh_token,
      },
      { where: { id }, returning: true }
    );
    res.status(200).send({ updatedUser: updatedUser[1][0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.destroy({ where: { id } });
    res.status(200).send({ deletedUser });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewUser,
  findAllUsers,
  findByIdUser,
  updateUser,
  deleteUser,
};

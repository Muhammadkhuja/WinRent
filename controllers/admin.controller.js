const { errorHandler } = require("../helpers/error_handler");
const Admin = require("../models/admin.models");
const config = require("config");
const jwtService = require("../services/jwt.service");

const addNewAdmin = async (req, res) => {
  try {
    const {
      full_name,
      email,
      password,
      created_at,
      is_creator,
      is_active,
      refresh_token,
    } = req.body;
    const Newadmin = await Admin.create({
      full_name,
      email,
      password,
      created_at,
      is_creator,
      is_active,
      refresh_token,
    });
    res.status(200).send({ messgae: "New admins added", Newadmin });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findAllAdmin = async (req, res) => {
  try {
    const Newadmin = await Admin.findAll();
    res.status(200).send({ messgae: "New admins added", Newadmin });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findByIdAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const Newadmin = await Admin.findByPk(id);
    res.status(200).send({ Newadmin });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      full_name,
      email,
      password,
      created_at,
      is_creator,
      is_active,
      refresh_token,
    } = req.body;
    const Newadmin = await Admin.update(
      {
        full_name,
        email,
        password,
        created_at,
        is_creator,
        is_active,
        refresh_token,
      },
      { where: { id }, returning: true }
    );
    res.status(200).send({ Newadmin: Newadmin[1][0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const Newadmin = await Admin.destroy({ where: { id } });
    res.status(200).send({ Newadmin });
  } catch (error) {
    errorHandler(error, res);
  }
};

const loginadmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({
      where: { email },
    });

    if (!admin) {
      return res
        .status(400)
        .send({ message: "Phone number yoki password noto'g'ri" });
    }
    if (!password || password != admin.password) {
      return res
        .status(400)
        .send({ message: "Phone number yoki password noto'g'ri" });
    }

    const payload = {
      id: admin.id,
      email: admin.email,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    };

    const tokens = jwtService.generatorTokens(payload);

    await Admin.update(
      { refresh_token: tokens.refreshtoken },
      { where: { email } }
    );

    res.cookie("refreshToken", tokens.refreshtoken, {
      httpOnly: true,
      maxAge: config.get("refresh_cookie_time"),
    });

    res.send({
      message: "Tizimga hush kelibsiz",
      accessToken: tokens.accesstoken,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const logoutadmin = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res
        .status(400)
        .send({ message: "Cookie refresh token topilmadi ?" });
    }

    const admin = await Admin.findOne({
      where: { refresh_token: refreshToken },
    });

    if (!admin) {
      return res
        .status(400)
        .send({ message: "Bunday tokendagi foydalanuvchi topilmadi" });
    }

    await Admin.update({ refresh_token: " " }, { where: { id: admin.id }});

    res.clearCookie("refreshToken");
    res.send({ message: "Successfully logged out" });
  } catch (error) {
    errorHandler(error, res);
  }
};

const refreshTokenadmin = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res
        .status(400)
        .send({ message: "Cookie refresh token topilmadi ?" });
    }
    const admin = await Admin.findOne({
      where: { refresh_token: refreshToken },
    });

    if (!admin) {
      return res
        .status(400)
        .send({ message: "Bunday tokendagi foydalanuvchi topilmadi" });
    }
    const payload = {
      id: admin._id,
      email: admin.email,
      role: admin.role,
    };

    const tokens = jwtService.generatorTokens(payload);
    admin.refresh_token = tokens.refreshtoken;
    await admin.save();

    res.cookie("refreshToken", tokens.refreshtoken, {
      httpOnly: true,
      maxAge: config.get("refresh_cookie_time"),
    });
    res.send({
      message: "Tokenlar yangilandi",
      accessToken: tokens.accesstoken,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  loginadmin,
  logoutadmin,
  refreshTokenadmin,
  addNewAdmin,
  findAllAdmin,
  findByIdAdmin,
  updateAdmin,
  deleteAdmin,
};

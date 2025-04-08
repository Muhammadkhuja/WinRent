const { errorHandler } = require("../helpers/error_handler");
const Admin = require("../models/admin.models");
const config = require("config");
const jwtService = require("../services/jwt.service");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const { adminValidation } = require("../validation/admin.validation");




const addNewAdmin = async (req, res) => {
  try {
    const { error, value } = adminValidation(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const { full_name, email, password, created_at, is_creator, is_active } =
      value;
    const hashedPassword = bcrypt.hashSync(password, 7);

    const Newadmin = await Admin.create({
      full_name,
      email,
      password: hashedPassword,
      created_at,
      is_creator,
      is_active,
    });

    res.status(201).send({
      message: "Yangi foydalanuvchi qo'shildi",
      Newadmin,
    });
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
    const { error, value } = adminValidation(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const { full_name, email, password, created_at, is_creator, is_active } =
      value;
    const Newadmin = await Admin.update(
      {
        full_name,
        email,
        password,
        created_at,
        is_creator,
        is_active,
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
        .send({ message: "Email number yoki password noto'g'ri 1 " });
    }

    const valiPassword = bcrypt.compareSync(password, admin.password);
    if (!valiPassword) {
      return res.status(400).send({ message: "Email yoki password noto'gri " });
    }

    const payload = {
      id: admin.id,
      email: admin.email,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
      role: "admin",
    };

    const tokens = jwtService.generatorTokens(payload);

    await Admin.update(
      { refresh_token: tokens.refreshtoken },
      { where: { email } }
    );

    res.cookie("refreshTokenadmin", tokens.refreshtoken, {
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
    const { refreshTokenadmin } = req.cookies;

    if (!refreshTokenadmin) {
      return res
        .status(400)
        .send({ message: "Cookie refresh token topilmadi ?" });
    }

    const admin = await Admin.findOne({
      where: { refresh_token: refreshTokenadmin },
    });

    if (!admin) {
      return res
        .status(400)
        .send({ message: "Bunday tokendagi foydalanuvchi topilmadi" });
    }

    await Admin.update({ refresh_token: " " }, { where: { id: admin.id } });

    res.clearCookie("refreshTokenadmin");
    res.send({ message: "Successfully logged out" });
  } catch (error) {
    errorHandler(error, res);
  }
};

const refreshTokenadmin = async (req, res) => {
  try {
    const { refreshTokenadmin } = req.cookies;

    if (!refreshTokenadmin) {
      return res
        .status(400)
        .send({ message: "Cookie refresh token topilmadi ?" });
    }
    const admin = await Admin.findOne({
      where: { refresh_token: refreshTokenadmin },
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
      role: "admin",
    };

    const tokens = jwtService.generatorTokens(payload);
    admin.refresh_token = tokens.refreshtoken;
    await admin.save();

    res.cookie("refreshTokenadmin", tokens.refreshtoken, {
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

const activaeAdmin = async (req, res) => {
  try {
    const admin = await Admin.findOne({ activation_link: req.params.link });
    if (!admin) {
      return res
        .status(400)
        .send({ message: "Bunday tokendagi foydalanuvchi topilmadi" });
    }
    admin.is_active = true;
    await admin.save();
    res.send({
      message: "Foydalanuvchi falolashtirlidi",
      status: admin.is_active,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  activaeAdmin,
  loginadmin,
  logoutadmin,
  refreshTokenadmin,
  addNewAdmin,
  findAllAdmin,
  findByIdAdmin,
  updateAdmin,
  deleteAdmin,
};
